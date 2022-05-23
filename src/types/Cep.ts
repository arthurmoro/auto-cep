export interface ViaCepResponse {
  logradouro: string,
  bairro: string,
  localidade: string,
  cep: string,
  uf: string,
}

export interface BuscaCepResponse {
  address: string,
  district: string,
  city: string,
  code: string,
  state: string,
}