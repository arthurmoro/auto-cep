# viacep_plugin
Este é um repositório JavaScript para facilitar a implementação do ViaCep

#Usando

Para começar a utilizar é simples:
Basta adicionar a biblioteca JavaScript no seu código e setar os campos.
Você poderá utiliza-lo das seguintes maneiras:
Assim que o CEP digitado for um CEP válido 
Ou Através da chamada da função.
Todos os campos podem ser editados mas, para autocompletar os campos, recomendo que
use a seguinte estrutura:
Para cara campo de endereço adicione o atributo "data-auto-cep" dessa maneira o plugin conseguirá
procurar e adicionar todos os campos sem problemas.
Os campos são:
    -logradouro
    -cidade
    -bairro
    -estado
Completando esses requisitos, assim que o ViaCep retornar a resposta estes campos serão preenchidos automaticamente.
Caso prefira você pode completar você mesmo, para isso use as funções:
ViaCep.getLogradouro();
ViaCep.getCidade();
ViaCep.getBairro();
ViaCep.getEstado();
