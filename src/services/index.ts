import ViaCep from "./requests/ViaCep";
import BuscaCep from "./requests/BuscaCep";
import BuscaCepInter from "./requests/BuscaCepInter"
import { AddressResponse } from "../types/Cep";

export async function cepPromise(cep: string): Promise<AddressResponse> {
  const _cep = cep.replace(/\D/g, '');
  const viaCep = new ViaCep(_cep);
  const buscaCep = new BuscaCep(_cep);
  const buscaCepInter = new BuscaCepInter(_cep);

  return Promise.any([
    buscaCepInter.search(),
    buscaCep.search(),
    viaCep.search(),
  ]);
}