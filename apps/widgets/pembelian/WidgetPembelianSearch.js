import { Searchbar } from "react-native-paper";
import { useState } from "react";

const queryInit = { faktur: "" };

const WidgetPembelianSearch = ({ callbackWidgetPembelianSearch }) => {
  const [query, setQuery] = useState({ queryInit });

  const handleInput = (name, value) => {
    setQuery((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <Searchbar
        style={{ margin: 15 }}
        placeholder="Search"
        onChangeText={(text) => handleInput("faktur", text)}
        onSubmitEditing={() => callbackWidgetPembelianSearch(query)}
        onClearIconPress={() => {
          setQuery(queryInit);
          callbackWidgetPembelianSearch(queryInit);
        }}
        value={query.faktur || ""}
      />
    </>
  );
};

export default WidgetPembelianSearch;
