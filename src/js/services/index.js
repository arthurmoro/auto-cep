window.cepHelper = require("./cepHelper");
var CepError = require('./error/request_error');
var viaCep = require("./viacep");

module.exports = (cep) => {
  return Promise.resolve(cep)
  .then(getCepValue)
  .then(viaCep)
  .catch(err => {
      console.log(err);
  });
};

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
