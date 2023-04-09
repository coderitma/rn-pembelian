import { Text } from "react-native";

const ScreenPembelianPay = ({ navigation, route }) => {
  const { pembelian } = route.params;

  return <Text>{JSON.stringify(pembelian)}</Text>;
};

export default ScreenPembelianPay;
