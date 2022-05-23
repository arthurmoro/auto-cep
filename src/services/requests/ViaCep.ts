import axios from "axios";
import CepHelper from "../helper/CepHelper";

export default class ViaCep {
  private baseurl = `https://viacep.com.br/ws/`;
  private basetype = `/json`;

  constructor(private cep: string) { }

  async search() {
    try {
      const { data } = await axios.get(`${this.baseurl}${CepHelper.cleanCep(this.cep)}${this.basetype}`)
      return CepHelper.getResponseViaCep(data);
    } catch (err) {
      return null
    }

  }
}