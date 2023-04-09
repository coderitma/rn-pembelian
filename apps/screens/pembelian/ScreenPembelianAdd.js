import {
  Button,
  Card,
  DataTable,
  Divider,
  FAB,
  List,
  SegmentedButtons,
  Text,
  TextInput,
  ToggleButton,
} from "react-native-paper";
import { View, ScrollView, Alert } from "react-native";
import WidgetCoreLayout from "../../widgets/core/WidgetCoreLayout";
import StyleBasicApp from "../../styles/StyleBasicApp";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import WidgetPemasokChoice from "../../widgets/pemasok/WidgetPemasokChoice";
import DateTimePicker from "@react-native-community/datetimepicker";
import ServiceCoreDateInput from "../../services/core/ServiceCoreDateInput";
import ServiceCoreIDGenerator from "../../services/core/ServiceCoreIDGenerator";
import ServiceCoreCurrency from "../../services/core/ServiceCoreCurrency";
import ServicePembelianCreate from "../../services/pembelian/ServicePembelianCreate";

const ScreenPembelianAdd = ({ navigation }) => {
  const initPembelian = {
    faktur: null,
    tanggal: null,
    total: 0,
    pemasok: null,
    dibayar: 0,
    kembali: 0,
    item: [],
  };

  const [pembelian, setPembelian] = useState(initPembelian);
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pemasok, setPemasok] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleInput = (name, value) => {
    if (name === "tanggal") setShowCalendar(false);

    setPembelian((values) => {
      let result = { ...values };
      result[name] = value;
      return result;
    });
  };

  const handleGenerateID = useCallback(() => {
    setPembelian((values) => ({
      ...values,
      faktur: ServiceCoreIDGenerator("BELI"),
    }));
  }, [pembelian]);

  const calculateTotal = useMemo(() => {
    let count = daftarBarang
      .map((barang) => {
        return barang.subtotal;
      })
      .reduce((a, b) => a + b, 0);
    return count;
  }, [daftarBarang]);

  const calculateKembali = useMemo(() => {
    let kembali = pembelian.dibayar - calculateTotal;
    return kembali;
  }, [daftarBarang, pembelian.dibayar]);

  const handleInputDaftarBarang = useCallback((index, name, value) => {
    setDaftarBarang((values) => {
      const results = [...values];
      results[index][name] =
        value === "right" ? results[index][name] + 1 : results[index][name] - 1;

      if (results[index][name] === 0) {
        results.splice(index, 1);
        return results;
      }

      results[index].subtotal = results[index][name] * results[index].hargaBeli;
      return results;
    });
  }, []);

  const callbackWidgetBarangChoice = useCallback((barang) => {
    barang.jumlahBeli = 1;
    barang.subtotal = barang.jumlahBeli * barang.hargaBeli;
    setDaftarBarang((values) => [...values, barang]);
  }, []);

  const callbackWidgetPemasokChoice = useCallback((pemasok) => {
    setPemasok(pemasok);
  }, []);

  const handleServicePembelianCreate = () => {
    setPembelian((values) => ({
      ...values,
      total: calculateTotal,
      kembali: calculateKembali,
      pemasok: { ...pemasok },
      item: [...daftarBarang],
    }));

    ServicePembelianCreate({ ...pembelian })
      .then(() => {
        setPemasok(null);
        setPembelian(initPembelian);
        setDaftarBarang([]);
        navigation.navigate("ScreenPembelianList");
      })
      .catch((error) => {});
  };

  console.log("ScreenPembelianAdd");
  return (
    <>
      <WidgetCoreLayout
        actionBack={"ScreenPembelianList"}
        actionFAB={
          <FAB
            disabled={!isValid}
            icon="content-save"
            style={StyleBasicApp.fab}
            onPress={handleServicePembelianCreate}
          />
        }
        navigation={navigation}
        title={"Buat Pembelian"}>
        <View style={{ height: "100%" }}>
          <ScrollView style={{ marginBottom: 200 }}>
            <View>
              <Text
                style={{ marginHorizontal: 10, marginTop: 10 }}
                variant="labelLarge">
                Pembelian
              </Text>
              <TextInput
                mode="outlined"
                style={{ margin: 10 }}
                label="Nomor Faktur"
                editable={false}
                onChangeText={(text) => handleInput("faktur", text)}
                value={pembelian.faktur || ""}
                right={
                  <TextInput.Icon icon="reload" onPress={handleGenerateID} />
                }
              />
              <TextInput
                mode="outlined"
                label="Tanggal"
                editable={false}
                style={{ margin: 10 }}
                value={ServiceCoreDateInput(pembelian.tanggal)}
                right={
                  <TextInput.Icon
                    onPress={() => setShowCalendar(true)}
                    icon="calendar"
                  />
                }
              />
              {showCalendar && (
                <DateTimePicker
                  value={pembelian.tanggal || new Date()}
                  mode={"date"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  onChange={(e, value) => handleInput("tanggal", value)}
                />
              )}
            </View>

            <View>
              <WidgetPemasokChoice
                callbackWidgetPemasokChoice={callbackWidgetPemasokChoice}
              />
              {pemasok && (
                <List.Item
                  title={pemasok.kodePemasok}
                  description={pemasok.namaPemasok}
                />
              )}
            </View>

            <View>
              <WidgetBarangChoice
                callbackWidgetBarangChoice={callbackWidgetBarangChoice}
              />
              <List.Section>
                {daftarBarang.map((barang, index) => (
                  <List.Item
                    key={index}
                    description={`${barang.jumlahBeli} x ${ServiceCoreCurrency(
                      barang.hargaBeli
                    )} = ${ServiceCoreCurrency(barang.subtotal)}`}
                    title={`${barang.kodeBarang} / ${barang.namaBarang}`}
                    right={() => (
                      <ToggleButton.Row
                        titleEllipsizeMode="clip"
                        onValueChange={(value) =>
                          handleInputDaftarBarang(index, "jumlahBeli", value)
                        }>
                        <ToggleButton icon="minus-thick" value={"left"} />
                        <ToggleButton icon="plus-thick" value={"right"} />
                      </ToggleButton.Row>
                    )}
                  />
                ))}
              </List.Section>
            </View>

            <View>
              <Text
                style={{ marginHorizontal: 10, marginTop: 10 }}
                variant="labelLarge">
                Total {ServiceCoreCurrency(calculateTotal)}
              </Text>
              <Text
                style={{ marginHorizontal: 10, marginTop: 10 }}
                variant="labelLarge">
                Kembali {ServiceCoreCurrency(calculateKembali)}
              </Text>
              <TextInput
                keyboardType="numeric"
                mode="outlined"
                value={pembelian.dibayar ? pembelian.dibayar.toString() : "0"}
                onChangeText={(text) => handleInput("dibayar", parseInt(text))}
                style={{ margin: 10 }}
                label="Dibayar"
              />

              {/* 
              <TextInput
                mode="outlined"
                editable={false}
                value={ServiceCoreCurrency(pembelian.kembali)}
                style={{ margin: 10 }}
                label="Kembali"
              /> */}
            </View>
          </ScrollView>
        </View>
      </WidgetCoreLayout>
    </>
  );
};

export default memo(ScreenPembelianAdd);
