import BuscaCep from "./requests/BuscaCep"
import ViaCep from "./requests/ViaCep"

export async function cepPromise(cep) {
  const viaCep = new ViaCep(cep);
  const buscaCep = new BuscaCep(cep);

  return Promise.race([
    buscaCep.search(),
    viaCep.search()
  ]);
}