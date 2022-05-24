import axios from "axios";
import { AddressResponse, BuscaCepResponse } from "../../types/Cep";

export default class BuscaCep {
  private baseurl = `https://apps.widenet.com.br/busca-cep/api/cep/`;
  private basetype = `.json`;

  constructor(private cep: string) { }

  private getResponse(data: BuscaCepResponse): AddressResponse {
    return {
      logradouro: data.address,
      bairro: data.district,
      cidade: data.city,
      cep: data.code,
      estado: data.state,
      origin: 'buscacep'
    };
  }

  async search(): Promise<AddressResponse> {

    const { data } = await axios.get(`${this.baseurl}${this.cep}${this.basetype}`);
    return this.getResponse(data);

  }

}