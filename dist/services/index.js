"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceCep = void 0;
const ViaCep_1 = __importDefault(require("./address/ViaCep"));
const BuscaCep_1 = __importDefault(require("./address/BuscaCep"));
const BuscaCepInter_1 = __importDefault(require("./address/BuscaCepInter"));
class RaceCep {
    getAddress(cep) {
        const _cep = cep.replace(/\D/g, "");
        const viaCep = new ViaCep_1.default();
        const buscaCep = new BuscaCep_1.default();
        const buscaCepInter = new BuscaCepInter_1.default();
        return Promise.any([
            buscaCepInter.getAddress(_cep),
            buscaCep.getAddress(_cep),
            viaCep.getAddress(_cep),
        ]);
    }
}
exports.RaceCep = RaceCep;
