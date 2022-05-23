"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cepPromise = void 0;
const BuscaCep_1 = __importDefault(require("./requests/BuscaCep"));
const ViaCep_1 = __importDefault(require("./requests/ViaCep"));
function cepPromise(cep) {
    return __awaiter(this, void 0, void 0, function* () {
        const viaCep = new ViaCep_1.default(cep);
        const buscaCep = new BuscaCep_1.default(cep);
        return Promise.race([
            buscaCep.search(),
            viaCep.search()
        ]);
    });
}
exports.cepPromise = cepPromise;
