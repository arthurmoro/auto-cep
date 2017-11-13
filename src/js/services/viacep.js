var CepError = require("./error/request_error");

let baseurl = `https://viacep.com.br/ws/`;
let basetype = `/json`;
let options = {
  method: "GET",
  mode: "cors",
  headers: {
    "content-type": "application/json"
  }
};

function init(_cep) {
  return fetch(`${baseurl}${_cep}${basetype}`)
  .then(response => {
    if (response.ok !== true) {
      throw new CepError({
        error: "viacep_error",
        message: "Não foi possível fazer a consulta do CEP"
      });
    }
    return response.json();
  })
  .then(response => {
    cepHelper.setResponseViaCep(response);
  })
  .then(() => {
    return cepHelper.getResponse();
  })
  .catch(err => {
    console.log(err);
    throw new CepError({
      error: "unexpected_error",
      message: "Ocorreu um erro inexperado com a busca do CEP."
    });
  });
}



module.exports = init;