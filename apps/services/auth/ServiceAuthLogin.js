import { BASE_URL } from "../ServiceConstant";
import ServiceCoreHTTP from "../core/ServiceCoreHTTP";

const ServiceAuthLogin = (user) => {
  return ServiceCoreHTTP.post(`${BASE_URL}/users/login`, { ...user });
};

export default ServiceAuthLogin;
