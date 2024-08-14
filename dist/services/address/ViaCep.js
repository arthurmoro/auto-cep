"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ViaCep {
    constructor() {
        this.baseurl = `https://viacep.com.br/ws/`;
        this.basetype = `/json`;
    }
    async getAddress(cep) {
        return await this.search(cep);
    }
    getResponse(data) {
        return {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            cep: data.cep,
            estado: data.uf,
            origin: "viacep",
        };
    }
    async search(cep) {
        const { data } = await axios_1.default.get(`${this.baseurl}${cep}${this.basetype}`);
        return this.getResponse(data);
    }
}
exports.default = ViaCep;
