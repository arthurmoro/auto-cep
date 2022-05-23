import { BuscaCepResponse, ViaCepResponse } from "../../types/Cep";
import { AddressType } from "../AddressType";

export default class CepHelper {
    static cleanCep(cep: string) {
        return cep.replace(/\D/g, '');
    }

    static getResponseViaCep(cepObject: ViaCepResponse): AddressType {
        return {
            logradouro: cepObject.logradouro,
            bairro: cepObject.bairro,
            cidade: cepObject.localidade,
            cep: cepObject.cep,
            estado: cepObject.uf,
            origin: 'viacep'
        };
    }

    static getResponseBuscaCep(cepObject: BuscaCepResponse): AddressType {
        return {
            logradouro: cepObject.address,
            bairro: cepObject.district,
            cidade: cepObject.city,
            cep: cepObject.code,
            estado: cepObject.state,
            origin: 'buscacep'
        };
    }
}