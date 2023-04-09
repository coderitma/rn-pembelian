import { Searchbar } from "react-native-paper";
import { useState, memo } from "react";

const queryInit = { namaBarang: "" };

const WidgetBarangSearch = ({ callbackWidgetBarangSearch, attr }) => {
  const [query, setQuery] = useState({ ...queryInit });

  const handleInput = (name, value) => {
    setQuery((values) => ({ ...values, [name]: value }));
  };

  return (
    <Searchbar
      placeholder="Cari nama barang"
      onChangeText={(text) => handleInput("namaBarang", text)}
      onSubmitEditing={() => callbackWidgetBarangSearch(query)}
      onClearIconPress={() => {
        setQuery(queryInit);
        callbackWidgetBarangSearch(queryInit);
      }}
      value={query.namaBarang || ""}
      {...attr}
    />
  );
};

export default memo(WidgetBarangSearch);
