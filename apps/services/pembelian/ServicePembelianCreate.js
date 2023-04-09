import { BASE_URL } from "../ServiceConstant";
import ServiceCoreHTTP from "../core/ServiceCoreHTTP";
import ServiceTokenGet from "../token/ServiceTokenGet";

export default async function ServicePembelianCreate(pembelian) {
  const config = {
    headers: {
      "x-access-token": await ServiceTokenGet(),
    },
  };

  return ServiceCoreHTTP.post(`${BASE_URL}/pembelian`, pembelian, config);
}
