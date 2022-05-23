import axios from "axios";
import { AddressType } from "../AddressType";
import CepHelper from "../helper/CepHelper";

export default class ViaCep {
  private baseurl = `https://viacep.com.br/ws/`;
  private basetype = `/json`;

  constructor(private cep: string) { }

  async search(): Promise<AddressType | null> {
    try {
      const { data } = await axios.get(`${this.baseurl}${CepHelper.cleanCep(this.cep)}${this.basetype}`)
      return CepHelper.getResponseViaCep(data);
    } catch (err) {
      return null
    }

  }
}