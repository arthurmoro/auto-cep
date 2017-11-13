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