(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.app = {
    autocep: require('./services/index')
};
},{"./services/index":4}],2:[function(require,module,exports){
module.exports = {
    addressObject: {
        logradouro: '',
        bairro: '',
        cidade: '',
        cep: '',
        estado: '',
        origin: ''
    },
    cleanCep: (cep) => {
        return cep.replace(/\D/g, '');
    },
    setResponseViaCep: cepObject => {
        this.addressObject = {
            logradouro: cepObject.logradouro,
            bairro: cepObject.bairro,
            cidade: cepObject.localidade,
            cep: cepObject.cep,
            estado: cepObject.uf,
            origin: 'viacep'
        };
    },
    setResponseBuscaCep: cepObject => {
        this.addressObject = {
            logradouro: cepObject.address,
            bairro: cepObject.district,
            cidade: cepObject.city,
            cep: cepObject.code,
            estado: cepObject.state,
            origin: 'buscacep'
        };
    },
    getResponse: () => {
        return this.addressObject;
    }
};
},{}],3:[function(require,module,exports){
function requestError(errorObject) {
    this.name = 'RequestError';
    this.message = errorObject.message;
    this.error = errorObject.error;
}

requestError.prototype = new Error();

module.exports = requestError;
},{}],4:[function(require,module,exports){
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

},{"./cepHelper":2,"./error/request_error":3,"./requests/buscaCep":5,"./requests/viacep":6}],5:[function(require,module,exports){
var CepError = require("../error/request_error");

let baseurl = `http://apps.widenet.com.br/busca-cep/api/cep/`;
let basetype = `.json`;
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
          error: "buscacep_error",
          message: "Não foi possível fazer a consulta do CEP"
        });
      }
      return response.json();
    })
    .then(response => {
      cepHelper.setResponseBuscaCep(response);
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

},{"../error/request_error":3}],6:[function(require,module,exports){
var CepError = require("../error/request_error");

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
},{"../error/request_error":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zZXJ2aWNlcy9jZXBIZWxwZXIuanMiLCJzcmMvanMvc2VydmljZXMvZXJyb3IvcmVxdWVzdF9lcnJvci5qcyIsInNyYy9qcy9zZXJ2aWNlcy9pbmRleC5qcyIsInNyYy9qcy9zZXJ2aWNlcy9yZXF1ZXN0cy9idXNjYUNlcC5qcyIsInNyYy9qcy9zZXJ2aWNlcy9yZXF1ZXN0cy92aWFjZXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LmFwcCA9IHtcbiAgICBhdXRvY2VwOiByZXF1aXJlKCcuL3NlcnZpY2VzL2luZGV4Jylcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWRkcmVzc09iamVjdDoge1xuICAgICAgICBsb2dyYWRvdXJvOiAnJyxcbiAgICAgICAgYmFpcnJvOiAnJyxcbiAgICAgICAgY2lkYWRlOiAnJyxcbiAgICAgICAgY2VwOiAnJyxcbiAgICAgICAgZXN0YWRvOiAnJyxcbiAgICAgICAgb3JpZ2luOiAnJ1xuICAgIH0sXG4gICAgY2xlYW5DZXA6IChjZXApID0+IHtcbiAgICAgICAgcmV0dXJuIGNlcC5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgIH0sXG4gICAgc2V0UmVzcG9uc2VWaWFDZXA6IGNlcE9iamVjdCA9PiB7XG4gICAgICAgIHRoaXMuYWRkcmVzc09iamVjdCA9IHtcbiAgICAgICAgICAgIGxvZ3JhZG91cm86IGNlcE9iamVjdC5sb2dyYWRvdXJvLFxuICAgICAgICAgICAgYmFpcnJvOiBjZXBPYmplY3QuYmFpcnJvLFxuICAgICAgICAgICAgY2lkYWRlOiBjZXBPYmplY3QubG9jYWxpZGFkZSxcbiAgICAgICAgICAgIGNlcDogY2VwT2JqZWN0LmNlcCxcbiAgICAgICAgICAgIGVzdGFkbzogY2VwT2JqZWN0LnVmLFxuICAgICAgICAgICAgb3JpZ2luOiAndmlhY2VwJ1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgc2V0UmVzcG9uc2VCdXNjYUNlcDogY2VwT2JqZWN0ID0+IHtcbiAgICAgICAgdGhpcy5hZGRyZXNzT2JqZWN0ID0ge1xuICAgICAgICAgICAgbG9ncmFkb3VybzogY2VwT2JqZWN0LmFkZHJlc3MsXG4gICAgICAgICAgICBiYWlycm86IGNlcE9iamVjdC5kaXN0cmljdCxcbiAgICAgICAgICAgIGNpZGFkZTogY2VwT2JqZWN0LmNpdHksXG4gICAgICAgICAgICBjZXA6IGNlcE9iamVjdC5jb2RlLFxuICAgICAgICAgICAgZXN0YWRvOiBjZXBPYmplY3Quc3RhdGUsXG4gICAgICAgICAgICBvcmlnaW46ICdidXNjYWNlcCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFJlc3BvbnNlOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZHJlc3NPYmplY3Q7XG4gICAgfVxufTsiLCJmdW5jdGlvbiByZXF1ZXN0RXJyb3IoZXJyb3JPYmplY3QpIHtcbiAgICB0aGlzLm5hbWUgPSAnUmVxdWVzdEVycm9yJztcbiAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvck9iamVjdC5tZXNzYWdlO1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvck9iamVjdC5lcnJvcjtcbn1cblxucmVxdWVzdEVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3RFcnJvcjsiLCJ3aW5kb3cuY2VwSGVscGVyID0gcmVxdWlyZShcIi4vY2VwSGVscGVyXCIpO1xudmFyIENlcEVycm9yID0gcmVxdWlyZSgnLi9lcnJvci9yZXF1ZXN0X2Vycm9yJyk7XG52YXIgdmlhQ2VwID0gcmVxdWlyZShcIi4vcmVxdWVzdHMvdmlhY2VwXCIpO1xudmFyIGJ1c2NhQ2VwID0gcmVxdWlyZSgnLi9yZXF1ZXN0cy9idXNjYUNlcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjZXApID0+IHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjZXApXG4gIC50aGVuKGdldENlcFZhbHVlKVxuICAudGhlbihjZXBQcm9taXNlKVxuICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY2VwUHJvbWlzZShjZXApe1xuICByZXR1cm4gUHJvbWlzZS5yYWNlKFtcbiAgICBidXNjYUNlcChjZXApLFxuICAgIHZpYUNlcChjZXApXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBnZXRDZXBWYWx1ZShjZXApIHtcbiAgX2NlcCA9IGNlcEhlbHBlci5jbGVhbkNlcChjZXApO1xuICBpZiAoX2NlcC5sZW5ndGggIT09IDgpIHtcbiAgICB0aHJvdyBuZXcgQ2VwRXJyb3Ioe1xuICAgICAgZXJyb3I6IFwiaW52YWxpZF9jZXBcIixcbiAgICAgIG1lc3NhZ2U6IFwiRGlnaXRlIHVtIENFUCBpbnbDoWxpZG9cIlxuICAgIH0pO1xuICB9XG4gIHJldHVybiBfY2VwO1xufVxuIiwidmFyIENlcEVycm9yID0gcmVxdWlyZShcIi4uL2Vycm9yL3JlcXVlc3RfZXJyb3JcIik7XG5cbmxldCBiYXNldXJsID0gYGh0dHA6Ly9hcHBzLndpZGVuZXQuY29tLmJyL2J1c2NhLWNlcC9hcGkvY2VwL2A7XG5sZXQgYmFzZXR5cGUgPSBgLmpzb25gO1xubGV0IG9wdGlvbnMgPSB7XG4gIG1ldGhvZDogXCJHRVRcIixcbiAgbW9kZTogXCJjb3JzXCIsXG4gIGhlYWRlcnM6IHtcbiAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICB9XG59O1xuXG5mdW5jdGlvbiBpbml0KF9jZXApIHtcbiAgcmV0dXJuIGZldGNoKGAke2Jhc2V1cmx9JHtfY2VwfSR7YmFzZXR5cGV9YClcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uub2sgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IENlcEVycm9yKHtcbiAgICAgICAgICBlcnJvcjogXCJidXNjYWNlcF9lcnJvclwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiTsOjbyBmb2kgcG9zc8OtdmVsIGZhemVyIGEgY29uc3VsdGEgZG8gQ0VQXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgY2VwSGVscGVyLnNldFJlc3BvbnNlQnVzY2FDZXAocmVzcG9uc2UpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIGNlcEhlbHBlci5nZXRSZXNwb25zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgdGhyb3cgbmV3IENlcEVycm9yKHtcbiAgICAgICAgZXJyb3I6IFwidW5leHBlY3RlZF9lcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBcIk9jb3JyZXUgdW0gZXJybyBpbmV4cGVyYWRvIGNvbSBhIGJ1c2NhIGRvIENFUC5cIlxuICAgICAgfSk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdDtcbiIsInZhciBDZXBFcnJvciA9IHJlcXVpcmUoXCIuLi9lcnJvci9yZXF1ZXN0X2Vycm9yXCIpO1xyXG5cclxubGV0IGJhc2V1cmwgPSBgaHR0cHM6Ly92aWFjZXAuY29tLmJyL3dzL2A7XHJcbmxldCBiYXNldHlwZSA9IGAvanNvbmA7XHJcbmxldCBvcHRpb25zID0ge1xyXG4gIG1ldGhvZDogXCJHRVRcIixcclxuICBtb2RlOiBcImNvcnNcIixcclxuICBoZWFkZXJzOiB7XHJcbiAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoX2NlcCkge1xyXG4gIHJldHVybiBmZXRjaChgJHtiYXNldXJsfSR7X2NlcH0ke2Jhc2V0eXBlfWApXHJcbiAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgaWYgKHJlc3BvbnNlLm9rICE9PSB0cnVlKSB7XHJcbiAgICAgIHRocm93IG5ldyBDZXBFcnJvcih7XHJcbiAgICAgICAgZXJyb3I6IFwidmlhY2VwX2Vycm9yXCIsXHJcbiAgICAgICAgbWVzc2FnZTogXCJOw6NvIGZvaSBwb3Nzw612ZWwgZmF6ZXIgYSBjb25zdWx0YSBkbyBDRVBcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgfSlcclxuICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICBjZXBIZWxwZXIuc2V0UmVzcG9uc2VWaWFDZXAocmVzcG9uc2UpO1xyXG4gIH0pXHJcbiAgLnRoZW4oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGNlcEhlbHBlci5nZXRSZXNwb25zZSgpO1xyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgdGhyb3cgbmV3IENlcEVycm9yKHtcclxuICAgICAgZXJyb3I6IFwidW5leHBlY3RlZF9lcnJvclwiLFxyXG4gICAgICBtZXNzYWdlOiBcIk9jb3JyZXUgdW0gZXJybyBpbmV4cGVyYWRvIGNvbSBhIGJ1c2NhIGRvIENFUC5cIlxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBpbml0OyJdfQ==
