import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../ServiceConstant";

const ServiceTokenSave = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export default ServiceTokenSave;
