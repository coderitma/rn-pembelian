import { useEffect, useState, useCallback, memo } from "react";
import { Appbar, Card, DataTable, FAB } from "react-native-paper";
import ServicePembelianList from "../../services/pembelian/ServicePembelianList";
import WidgetPembelianSearch from "../../widgets/pembelian/WidgetPembelianSearch";
import WidgetCoreLayout from "../../widgets/core/WidgetCoreLayout";
import StyleBasicApp from "../../styles/StyleBasicApp";
import ServiceCoreDateInput from "../../services/core/ServiceCoreDateInput";
import ServiceCoreCurrency from "../../services/core/ServiceCoreCurrency";

const ScreenPembelianList = ({ navigation }) => {
  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [queryPembelian, setQueryPembelian] = useState({
    page: 1,
    limit: 10,
  });
  const [paginatePembelian, setPaginatePembelian] = useState({});

  const handleServicePembelianList = () => {
    ServicePembelianList(queryPembelian)
      .then((response) => {
        if (response.headers.pagination) {
          setPaginatePembelian(JSON.parse(response.headers.pagination));
        }
        setDaftarPembelian(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    handleServicePembelianList();
  }, [queryPembelian]);

  const callbackPaginator = useCallback((page) => {
    if (page > 0) {
      setQueryPembelian((values) => ({ ...values, page }));
    }
  }, []);

  const callbackWidgetPembelianSearch = useCallback((query) => {
    setQueryPembelian((values) => ({ ...values, ...query }));
  }, []);

  return (
    <>
      <WidgetCoreLayout
        actions={
          <>
            <Appbar.Action
              icon="refresh"
              onPress={handleServicePembelianList}
            />
          </>
        }
        navigation={navigation}
        title={"Daftar Pembelian"}
        actionFAB={
          <FAB
            icon="plus"
            style={StyleBasicApp.fab}
            onPress={() => navigation.navigate("ScreenPembelianAdd")}
          />
        }>
        <WidgetPembelianSearch
          callbackWidgetPembelianSearch={callbackWidgetPembelianSearch}
        />

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Faktur</DataTable.Title>
            <DataTable.Title>Tanggal</DataTable.Title>
            <DataTable.Title numeric>Total</DataTable.Title>
          </DataTable.Header>
          {daftarPembelian.map((pembelian, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{pembelian.faktur}</DataTable.Cell>
              <DataTable.Cell>
                {ServiceCoreDateInput(pembelian.tanggal)}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {ServiceCoreCurrency(pembelian.total)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <DataTable.Pagination
          page={paginatePembelian.page}
          numberOfPages={paginatePembelian.numberOfPage + 1}
          onPageChange={(page) => callbackPaginator(page)}
          itemsPerPage={paginatePembelian.limit}
          label={`Page ${paginatePembelian.page} of ${paginatePembelian.numberOfPage}`}
          optionsLabel={"Rows per page"}
        />
      </WidgetCoreLayout>
    </>
  );
};

export default memo(ScreenPembelianList);
