import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../ServiceConstant";

const ServiceTokenGet = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export default ServiceTokenGet;
