import { BASE_URL } from "../ServiceConstant";
import ServiceCoreHTTP from "../core/ServiceCoreHTTP";
import ServiceTokenGet from "../token/ServiceTokenGet";

const ServiceAuthCheck = async () => {
  let config = {
    headers: {
      "x-access-token": await ServiceTokenGet(),
    },
  };

  return ServiceCoreHTTP.post(`${BASE_URL}/hello/world`, null, config);
};

export default ServiceAuthCheck;
