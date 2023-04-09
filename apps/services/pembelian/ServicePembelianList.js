import { BASE_URL } from "../ServiceConstant";
import ServiceCoreHTTP from "../core/ServiceCoreHTTP";
import ServiceTokenGet from "../token/ServiceTokenGet";

const ServicePembelianList = async (query) => {
  let config = {
    headers: {
      "x-access-token": await ServiceTokenGet(),
    },
    params: { ...query },
  };
  return ServiceCoreHTTP.get(`${BASE_URL}/pembelian`, config);
};

export default ServicePembelianList;
