window.cepHelper = require("./cepHelper");
var CepError = require('./error/request_error');
var viaCep = require("./requests/viacep");
var buscaCep = require('./requests/buscaCep');

module.exports = (cep) => {
  return Promise.resolve(cep)
  .then(getCepValue)
  .then(cepPromise)
  .catch(err => {
      console.log(err);
  });
};

function cepPromise(cep){
  return Promise.race([
    buscaCep(cep),
    viaCep(cep)
  ]);
}

function getCepValue(cep) {
  _cep = cepHelper.cleanCep(cep);
  if (_cep.length !== 8) {
    throw new CepError({
      error: "invalid_cep",
      message: "Digite um CEP inválido"
    });
  }
  return _cep;
}
