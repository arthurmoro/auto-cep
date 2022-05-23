export interface AddressType {
  logradouro: string,
  bairro: string,
  cidade: string,
  cep: string,
  estado: string,
  origin: 'viacep' | 'buscacep'
}