export type AddressResponse = {
  logradouro: string;
  bairro: string;
  cidade: string;
  cep: string;
  estado: string;
  origin: string;
};

export interface IAddressService {
  getAddress(cep: string): Promise<AddressResponse>;
}
