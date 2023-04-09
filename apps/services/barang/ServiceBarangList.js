import { BASE_URL } from "../ServiceConstant";
import ServiceCoreHTTP from "../core/ServiceCoreHTTP";
import ServiceTokenGet from "../token/ServiceTokenGet";

const ServiceBarangList = async (query) => {
  let config = {
    headers: {
      "x-access-token": await ServiceTokenGet(),
    },
    params: { ...query },
  };

  return ServiceCoreHTTP.get(`${BASE_URL}/barang`, config);
};

export default ServiceBarangList;
