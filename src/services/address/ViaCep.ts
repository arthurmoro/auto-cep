import axios from "axios";
import { ViaCepResponse } from "../../types/Cep";
import {
  AddressResponse,
  IAddressService,
} from "../../@domain/Services/IAddress.service";

export default class ViaCep implements IAddressService {
  async getAddress(cep: string): Promise<AddressResponse> {
    return await this.search(cep);
  }
  private baseurl = `https://viacep.com.br/ws/`;
  private basetype = `/json`;

  private getResponse(data: ViaCepResponse): AddressResponse {
    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      cep: data.cep,
      estado: data.uf,
      origin: "viacep",
    };
  }

  private async search(cep: string): Promise<AddressResponse> {
    const { data } = await axios.get(`${this.baseurl}${cep}${this.basetype}`);
    return this.getResponse(data);
  }
}
