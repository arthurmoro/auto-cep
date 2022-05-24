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

export interface BuscaCepInterResponse {
  "erro": Boolean,
  "mensagem": string,
  "total": number,
  "dados": [
    {
      "uf": string,
      "localidade": string,
      "locNoSem": string,
      "locNu": string,
      "localidadeSubordinada": string,
      "logradouroDNEC": string,
      "logradouroTextoAdicional": string,
      "logradouroTexto": string,
      "bairro": string,
      "baiNu": string,
      "nomeUnidade": string,
      "cep": string,
      "tipoCep": string,
      "numeroLocalidade": string,
      "situacao": string
    }
  ]
}

export interface AddressResponse {
  logradouro: string,
  bairro: string,
  cidade: string,
  cep: string,
  estado: string,
  origin: 'viacep' | 'buscacep' | 'buscacep_inter'
}