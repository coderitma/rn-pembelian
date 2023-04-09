import { useState, useEffect, memo, useCallback } from "react";
import ServiceBarangList from "../../services/barang/ServiceBarangList";
import {
  Button,
  DataTable,
  List,
  Modal,
  Portal,
  Searchbar,
} from "react-native-paper";

import WidgetBarangSearch from "./WidgetBarangSearch";

const WidgetBarangChoice = ({ callbackWidgetBarangChoice }) => {
  console.log("render widget barang choice");
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [show, setShow] = useState(false);
  const [queryBarang, setQueryBarang] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    if (show) {
      ServiceBarangList(queryBarang)
        .then((response) => {
          console.log("WidgetBarangChoice::useEffect called");
          setDaftarBarang(response.data);
        })
        .catch((error) => {});
    }
  }, [queryBarang, show]);

  const callbackWidgetBarangSearch = useCallback((query) => {
    setQueryBarang((values) => ({ ...values, ...query }));
  }, []);

  return (
    <>
      <Button onPress={() => setShow(true)}>Pilih Barang</Button>
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => setShow(false)}
          style={{ backgroundColor: "white" }}>
          <WidgetBarangSearch
            attr={{ style: { margin: 15 } }}
            callbackWidgetBarangSearch={callbackWidgetBarangSearch}
          />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Kode Barang</DataTable.Title>
              <DataTable.Title>Nama Barang</DataTable.Title>
              <DataTable.Title numeric>Jumlah Barang</DataTable.Title>
            </DataTable.Header>
            {daftarBarang.map((barang, index) => (
              <DataTable.Row
                onPress={() => {
                  setShow(false);
                  callbackWidgetBarangChoice(barang);
                }}
                key={index}>
                <DataTable.Cell>{barang.kodeBarang}</DataTable.Cell>
                <DataTable.Cell>{barang.namaBarang}</DataTable.Cell>
                <DataTable.Cell numeric>{barang.jumlahBarang}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Modal>
      </Portal>
    </>
  );
};

export default memo(WidgetBarangChoice);
