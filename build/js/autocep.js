var AutoCep = {
    _neighborhood_input: "bairro",
    _zipcode_input: "cep",
    _street_input: "logradouro",
    _state_input: "estado",
    _city_input: "cidade",
    _viacep_result: {},
    _url: "https://viacep.com.br/",
    _data_type: "json",
    _auto_cep: "data-auto-cep",
    _zipcode: undefined,
    get_zipcode: function() {
        var $_cep_input = document.querySelector("[" + this._auto_cep + "=" + this._zipcode_input + "]");
        if ($_cep_input.value === null || $_cep_input === "" || $_cep_input === undefined) {
            return false;
        }
        this._zipcode = $_cep_input.value;
    },
    _clear_zipcode: function() {
        if (this._zipcode === undefined) return false;


    }
};