import ViaCep from "./address/ViaCep";
import BuscaCep from "./address/BuscaCep";
import BuscaCepInter from "./address/BuscaCepInter";
import {
  AddressResponse,
  IAddressService,
} from "../@domain/Services/IAddress.service";

export class RaceCep implements IAddressService {
  getAddress(cep: string): Promise<AddressResponse> {
    const _cep = cep.replace(/\D/g, "");
    const viaCep = new ViaCep();
    const buscaCep = new BuscaCep();
    const buscaCepInter = new BuscaCepInter();

    return Promise.any([
      buscaCepInter.getAddress(_cep),
      buscaCep.getAddress(_cep),
      viaCep.getAddress(_cep),
    ]);
  }
}
