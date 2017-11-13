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
        cep: ''
    },
    cleanCep: (cep) => {
        return cep.replace(/\D/g, '');
    },
    setResponseViaCep: cepObject => {
        this.addressObject = {
            logradouro: cepObject.logradouro,
            bairro: cepObject.bairro,
            cidade: cepObject.localidade,
            cep: cepObject.cep
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

},{"./cepHelper":2,"./error/request_error":3,"./viacep":5}],5:[function(require,module,exports){
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
},{"./error/request_error":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zZXJ2aWNlcy9jZXBIZWxwZXIuanMiLCJzcmMvanMvc2VydmljZXMvZXJyb3IvcmVxdWVzdF9lcnJvci5qcyIsInNyYy9qcy9zZXJ2aWNlcy9pbmRleC5qcyIsInNyYy9qcy9zZXJ2aWNlcy92aWFjZXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LmFwcCA9IHtcbiAgICBhdXRvY2VwOiByZXF1aXJlKCcuL3NlcnZpY2VzL2luZGV4Jylcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWRkcmVzc09iamVjdDoge1xuICAgICAgICBsb2dyYWRvdXJvOiAnJyxcbiAgICAgICAgYmFpcnJvOiAnJyxcbiAgICAgICAgY2lkYWRlOiAnJyxcbiAgICAgICAgY2VwOiAnJ1xuICAgIH0sXG4gICAgY2xlYW5DZXA6IChjZXApID0+IHtcbiAgICAgICAgcmV0dXJuIGNlcC5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgIH0sXG4gICAgc2V0UmVzcG9uc2VWaWFDZXA6IGNlcE9iamVjdCA9PiB7XG4gICAgICAgIHRoaXMuYWRkcmVzc09iamVjdCA9IHtcbiAgICAgICAgICAgIGxvZ3JhZG91cm86IGNlcE9iamVjdC5sb2dyYWRvdXJvLFxuICAgICAgICAgICAgYmFpcnJvOiBjZXBPYmplY3QuYmFpcnJvLFxuICAgICAgICAgICAgY2lkYWRlOiBjZXBPYmplY3QubG9jYWxpZGFkZSxcbiAgICAgICAgICAgIGNlcDogY2VwT2JqZWN0LmNlcFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0UmVzcG9uc2U6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkcmVzc09iamVjdDtcbiAgICB9XG59OyIsImZ1bmN0aW9uIHJlcXVlc3RFcnJvcihlcnJvck9iamVjdCkge1xuICAgIHRoaXMubmFtZSA9ICdSZXF1ZXN0RXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IGVycm9yT2JqZWN0Lm1lc3NhZ2U7XG4gICAgdGhpcy5lcnJvciA9IGVycm9yT2JqZWN0LmVycm9yO1xufVxuXG5yZXF1ZXN0RXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWVzdEVycm9yOyIsIndpbmRvdy5jZXBIZWxwZXIgPSByZXF1aXJlKFwiLi9jZXBIZWxwZXJcIik7XG52YXIgQ2VwRXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yL3JlcXVlc3RfZXJyb3InKTtcbnZhciB2aWFDZXAgPSByZXF1aXJlKFwiLi92aWFjZXBcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gKGNlcCkgPT4ge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNlcClcbiAgLnRoZW4oZ2V0Q2VwVmFsdWUpXG4gIC50aGVuKHZpYUNlcClcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGdldENlcFZhbHVlKGNlcCkge1xuICBfY2VwID0gY2VwSGVscGVyLmNsZWFuQ2VwKGNlcCk7XG4gIGlmIChfY2VwLmxlbmd0aCAhPT0gOCkge1xuICAgIHRocm93IG5ldyBDZXBFcnJvcih7XG4gICAgICBlcnJvcjogXCJpbnZhbGlkX2NlcFwiLFxuICAgICAgbWVzc2FnZTogXCJEaWdpdGUgdW0gQ0VQIGludsOhbGlkb1wiXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIF9jZXA7XG59XG4iLCJ2YXIgQ2VwRXJyb3IgPSByZXF1aXJlKFwiLi9lcnJvci9yZXF1ZXN0X2Vycm9yXCIpO1xyXG5cclxubGV0IGJhc2V1cmwgPSBgaHR0cHM6Ly92aWFjZXAuY29tLmJyL3dzL2A7XHJcbmxldCBiYXNldHlwZSA9IGAvanNvbmA7XHJcbmxldCBvcHRpb25zID0ge1xyXG4gIG1ldGhvZDogXCJHRVRcIixcclxuICBtb2RlOiBcImNvcnNcIixcclxuICBoZWFkZXJzOiB7XHJcbiAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoX2NlcCkge1xyXG4gIHJldHVybiBmZXRjaChgJHtiYXNldXJsfSR7X2NlcH0ke2Jhc2V0eXBlfWApXHJcbiAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgaWYgKHJlc3BvbnNlLm9rICE9PSB0cnVlKSB7XHJcbiAgICAgIHRocm93IG5ldyBDZXBFcnJvcih7XHJcbiAgICAgICAgZXJyb3I6IFwidmlhY2VwX2Vycm9yXCIsXHJcbiAgICAgICAgbWVzc2FnZTogXCJOw6NvIGZvaSBwb3Nzw612ZWwgZmF6ZXIgYSBjb25zdWx0YSBkbyBDRVBcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgfSlcclxuICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICBjZXBIZWxwZXIuc2V0UmVzcG9uc2VWaWFDZXAocmVzcG9uc2UpO1xyXG4gIH0pXHJcbiAgLnRoZW4oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGNlcEhlbHBlci5nZXRSZXNwb25zZSgpO1xyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgdGhyb3cgbmV3IENlcEVycm9yKHtcclxuICAgICAgZXJyb3I6IFwidW5leHBlY3RlZF9lcnJvclwiLFxyXG4gICAgICBtZXNzYWdlOiBcIk9jb3JyZXUgdW0gZXJybyBpbmV4cGVyYWRvIGNvbSBhIGJ1c2NhIGRvIENFUC5cIlxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBpbml0OyJdfQ==
