import { Searchbar } from "react-native-paper";
import { useState, memo } from "react";

const queryInit = { kodePemasok: "" };

const WidgetPemasokSearch = ({ callbackWidgetPemasokSearch, attr }) => {
  const [query, setQuery] = useState({ ...queryInit });

  const handleInput = (name, value) => {
    setQuery((values) => ({ ...values, [name]: value }));
  };

  return (
    <Searchbar
      placeholder="Kode pemasok"
      onChangeText={(text) => handleInput("kodePemasok", text)}
      onSubmitEditing={() => callbackWidgetPemasokSearch(query)}
      onClearIconPress={() => {
        setQuery(queryInit);
        callbackWidgetPemasokSearch(queryInit);
      }}
      value={query.kodePemasok || ""}
      {...attr}
    />
  );
};

export default memo(WidgetPemasokSearch);
