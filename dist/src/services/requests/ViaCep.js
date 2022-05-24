"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ViaCep {
    constructor(cep) {
        this.cep = cep;
        this.baseurl = `https://viacep.com.br/ws/`;
        this.basetype = `/json`;
    }
    getResponse(data) {
        return {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            cep: data.cep,
            estado: data.uf,
            origin: 'viacep'
        };
    }
    async search() {
        const { data } = await axios_1.default.get(`${this.baseurl}${this.cep}${this.basetype}`);
        return this.getResponse(data);
    }
}
exports.default = ViaCep;
