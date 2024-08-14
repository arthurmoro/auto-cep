import axios from "axios";
import FormData from "form-data";
import {
  AddressResponse,
  IAddressService,
} from "../../@domain/Services/IAddress.service";

export interface BuscaCepInterResponse {
  erro: Boolean;
  mensagem: string;
  total: number;
  dados: [
    {
      uf: string;
      localidade: string;
      locNoSem: string;
      locNu: string;
      localidadeSubordinada: string;
      logradouroDNEC: string;
      logradouroTextoAdicional: string;
      logradouroTexto: string;
      bairro: string;
      baiNu: string;
      nomeUnidade: string;
      cep: string;
      tipoCep: string;
      numeroLocalidade: string;
      situacao: string;
    }
  ];
}
export default class BuscaCepInter implements IAddressService {
  async getAddress(cep: string): Promise<AddressResponse> {
    return await this.search(cep);
  }

  private getResponse(data: BuscaCepInterResponse): AddressResponse {
    if (data.erro || !data.dados || !data.dados.length) {
      throw new Error("Endereço vazio.");
    }

    const [address] = data.dados;

    return {
      logradouro: address.logradouroDNEC,
      bairro: address.bairro,
      cidade: address.localidade,
      cep: address.cep,
      estado: address.uf,
      origin: "buscacep_inter",
    };
  }

  private async search(cep: string): Promise<AddressResponse> {
    const formData = new FormData();
    formData.append("endereco", cep);
    formData.append("tipoCEP", "ALL");
    const { data } = await axios.post(
      "https://buscacepinter.correios.com.br/app/endereco/carrega-cep-endereco.php",
      formData
    );
    return this.getResponse(data);
  }
}
