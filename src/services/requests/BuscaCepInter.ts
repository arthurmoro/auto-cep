import axios from "axios";
import FormData from "form-data";
import { AddressResponse, BuscaCepInterResponse } from "../../types/Cep";

export default class BuscaCepInter {
  constructor(private cep: string) { }

  private getResponse(data: BuscaCepInterResponse): AddressResponse {
    if (data.erro || !data.dados || !data.dados.length) {
      throw new Error("Endereço vazio.")
    }

    const [address] = data.dados

    return {
      logradouro: address.logradouroDNEC,
      bairro: address.bairro,
      cidade: address.localidade,
      cep: address.cep,
      estado: address.uf,
      origin: 'buscacep_inter'
    };

  }

  async search(): Promise<AddressResponse> {

    const formData = new FormData();
    formData.append("endereco", this.cep);
    formData.append("tipoCEP", "ALL");
    const { data } = await axios.post("https://buscacepinter.correios.com.br/app/endereco/carrega-cep-endereco.php", formData,);
    return this.getResponse(data);

  }
}