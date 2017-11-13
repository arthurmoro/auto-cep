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