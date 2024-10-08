"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class BuscaCep {
    constructor() {
        this.baseurl = `https://apps.widenet.com.br/busca-cep/api/cep/`;
        this.basetype = `.json`;
    }
    async getAddress(cep) {
        return await this.search(cep);
    }
    getResponse(data) {
        return {
            logradouro: data.address,
            bairro: data.district,
            cidade: data.city,
            cep: data.code,
            estado: data.state,
            origin: "buscacep",
        };
    }
    async search(cep) {
        const { data } = await axios_1.default.get(`${this.baseurl}${cep}${this.basetype}`);
        return this.getResponse(data);
    }
}
exports.default = BuscaCep;
