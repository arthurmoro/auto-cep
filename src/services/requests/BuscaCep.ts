import axios from "axios";

import { AddressType } from "../AddressType";
import CepHelper from "../helper/CepHelper";


export default class BuscaCep {
  private baseurl = `https://apps.widenet.com.br/busca-cep/api/cep/`;
  private basetype = `.json`;

  constructor(private cep: string) { }

  async search(): Promise<AddressType | null> {
    try {
      const { data } = await axios.get(`${this.baseurl}${CepHelper.cleanCep(this.cep)}${this.basetype}`);
      return CepHelper.getResponseBuscaCep(data);
    } catch (err) {
      console.log(err);
    }
    return null;

  }

}