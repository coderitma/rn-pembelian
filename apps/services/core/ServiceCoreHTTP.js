import axios from "axios";
import { Alert } from "react-native";

const ServiceCoreHTTP = axios.create({
  timeout: 1000,
});

ServiceCoreHTTP.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ServiceCoreHTTP.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      // window.location.href = "/";
      Alert.alert("Ups!", error.message);
    }

    if (error.response.status === 400 || error.response.status === 404) {
      if (error.response.data.message) {
        Alert.alert("Ups!", error.response.data.message);
      } else if (error.response.data instanceof Blob) {
        Alert.alert("Ups!", error.message);
      } else {
        Alert.alert("Something when wrong! Please contact developer.");
      }
    }
    return Promise.reject(error);
  }
);

export default ServiceCoreHTTP;
