import { BASE_URL } from "../ServiceConstant";
import ServiceCoreHTTP from "../core/ServiceCoreHTTP";
import ServiceTokenGet from "../token/ServiceTokenGet";

const ServicePemasokList = async (query) => {
  let config = {
    headers: {
      "x-access-token": await ServiceTokenGet(),
    },
    params: { ...query },
  };

  return ServiceCoreHTTP.get(`${BASE_URL}/pemasok`, config);
};

export default ServicePemasokList;
