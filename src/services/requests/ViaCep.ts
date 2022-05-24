import axios from "axios";
import { AddressResponse, ViaCepResponse } from "../../types/Cep";

export default class ViaCep {
  private baseurl = `https://viacep.com.br/ws/`;
  private basetype = `/json`;

  constructor(private cep: string) { }

  private getResponse(data: ViaCepResponse): AddressResponse {
    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      cep: data.cep,
      estado: data.uf,
      origin: 'viacep'
    };

  }

  async search(): Promise<AddressResponse> {

    const { data } = await axios.get(`${this.baseurl}${this.cep}${this.basetype}`)
    return this.getResponse(data);

  }
}