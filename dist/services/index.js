"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cepPromise = void 0;
const ViaCep_1 = __importDefault(require("./requests/ViaCep"));
const BuscaCep_1 = __importDefault(require("./requests/BuscaCep"));
const BuscaCepInter_1 = __importDefault(require("./requests/BuscaCepInter"));
async function cepPromise(cep) {
    const _cep = cep.replace(/\D/g, '');
    const viaCep = new ViaCep_1.default(_cep);
    const buscaCep = new BuscaCep_1.default(_cep);
    const buscaCepInter = new BuscaCepInter_1.default(_cep);
    return Promise.any([
        buscaCepInter.search(),
        buscaCep.search(),
        viaCep.search(),
    ]);
}
exports.cepPromise = cepPromise;
