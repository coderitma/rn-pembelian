import { useState, useEffect, memo, useCallback } from "react";
import ServicePemasokList from "../../services/pemasok/ServicePemasokList";
import { Button, DataTable, Modal, Portal } from "react-native-paper";
import WidgetPemasokSearch from "./WidgetPemasokSearch";

const WidgetPemasokChoice = ({ callbackWidgetPemasokChoice }) => {
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [show, setShow] = useState(false);
  const [queryPemasok, setQueryPemasok] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    if (show) {
      ServicePemasokList(queryPemasok)
        .then((response) => {
          setDaftarPemasok(response.data);
        })
        .catch((error) => {});
    }
  }, [queryPemasok, show]);

  const callbackWidgetPemasokSearch = useCallback((query) => {
    setQueryPemasok((values) => ({ ...values, ...query }));
  }, []);

  return (
    <>
      <Button onPress={() => setShow(true)}>Pilih Pemasok</Button>
      <Portal>
        <Modal
          visible={show}
          onDismiss={() => setShow(false)}
          style={{ backgroundColor: "white" }}>
          <WidgetPemasokSearch
            attr={{ style: { margin: 15 } }}
            callbackWidgetPemasokSearch={callbackWidgetPemasokSearch}
          />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Kode Pemasok</DataTable.Title>
              <DataTable.Title>Nama Pemasok</DataTable.Title>
              <DataTable.Title>Telepon Pemasok</DataTable.Title>
            </DataTable.Header>
            {daftarPemasok.map((pemasok, index) => (
              <DataTable.Row
                key={index}
                onPress={() => {
                  callbackWidgetPemasokChoice(pemasok);
                  setShow(false);
                }}>
                <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                <DataTable.Cell>{pemasok.teleponPemasok}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Modal>
      </Portal>
    </>
  );
};

export default memo(WidgetPemasokChoice);
