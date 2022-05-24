# Plugin de cep automático 
Este é um repositório JavaScript para facilitar a implementação do [ViaCep](https://viacep.com.br) e [BuscaCep](http://apps.widenet.com.br/busca-cep/api/cep/)

# Porque ele foi criado?

Este plugin surgiu com o intuito de facilitar a minha vida na hora de implementar qualquer módulo que precise de preenchimento obritório de CEP! 

# Usando

Para utilizar é muito simples:

Basta instalar e importar o pacote em seu projeto.

npm install --save auto_cep


Para realizar a chamada também é bem simples: 

```javascript
const auto_cep = require("auto_cep");
AutoCep("01311-200").then(endereco => { console.log(endereco) });
```

```javascript
import AutoCep from "auto_cep";
AutoCep("01311-200").then(endereco => { console.log(endereco) });
```

Não há restrição de formato. O plugin se encarregara de limpar a string e retornar o endereço de forma maneira pra você.

Independendo da api que retornar primeiro o resultado é sempre o mesmo:
```javascript
{
    logradouro: 'Avenida Paulista',
    bairro: 'Bela Vista',
       cidade: 'São Paulo',
    cep: '01311-200',
    estado: 'SP',
    origin: 'buscacep | viacep'
}
```

### Use e abuse. 

### E não esqueça de me reportar anomalidades!
