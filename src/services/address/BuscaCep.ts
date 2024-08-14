import axios from "axios";
import { AddressResponse, BuscaCepResponse } from "../../types/Cep";
import { IAddressService } from "../../@domain/Services/IAddress.service";

export default class BuscaCep implements IAddressService {
  private baseurl = `https://apps.widenet.com.br/busca-cep/api/cep/`;
  private basetype = `.json`;

  async getAddress(cep: string): Promise<AddressResponse> {
    return await this.search(cep);
  }

  private getResponse(data: BuscaCepResponse): AddressResponse {
    return {
      logradouro: data.address,
      bairro: data.district,
      cidade: data.city,
      cep: data.code,
      estado: data.state,
      origin: "buscacep",
    };
  }

  private async search(cep: string): Promise<AddressResponse> {
    const { data } = await axios.get(`${this.baseurl}${cep}${this.basetype}`);
    return this.getResponse(data);
  }
}
