"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
class BuscaCepInter {
    async getAddress(cep) {
        return await this.search(cep);
    }
    getResponse(data) {
        if (data.erro || !data.dados || !data.dados.length) {
            throw new Error("Endereço vazio.");
        }
        const [address] = data.dados;
        return {
            logradouro: address.logradouroDNEC,
            bairro: address.bairro,
            cidade: address.localidade,
            cep: address.cep,
            estado: address.uf,
            origin: "buscacep_inter",
        };
    }
    async search(cep) {
        const formData = new form_data_1.default();
        formData.append("endereco", cep);
        formData.append("tipoCEP", "ALL");
        const { data } = await axios_1.default.post("https://buscacepinter.correios.com.br/app/endereco/carrega-cep-endereco.php", formData);
        return this.getResponse(data);
    }
}
exports.default = BuscaCepInter;
