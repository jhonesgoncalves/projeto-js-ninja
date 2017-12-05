(function($, doc) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app(){
    var image =  $('[data-js="image"]').get();
    var brand =  $('[data-js="brand"]').get();
    var year =  $('[data-js="year"]').get();
    var color =  $('[data-js="color"]').get();
    var plate =  $('[data-js="plate"]').get();


    return{
      init: function init(){
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents(){
        $('[data-js="form-car"]').on('submit', this.handleRegister);
      },

      handleRegister: function handleRegister(event){
        event.preventDefault();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app().createNewCar());
        app().clearForm();
      },

      createNewCar: function createNewCar(){
        var $fragament = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $tdBrand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');

        var $img = doc.createElement('img');
        $img.src = image.value;
        $tdImage.appendChild($img);

        $tdBrand.textContent = brand.value;
        $tdYear.textContent = year.value;
        $tdPlate.textContent = plate.value;
        $tdColor.textContent = color.value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        return $fragament.appendChild($tr);
      },

      clearForm: function clearForm(){
        image.value = '',
        brand.value = '',
        year.value = '',
        plate.value = '',
        color.value = ''
      },

      companyInfo: function companyInfo(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'data/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo(){
        if(!app().isRequestOK.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName =  $('[data-js="company-name"]').get();
        var $companyPhone =  $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isRequestOK: function isRequestOK(){
        return this.readyState === 4 && this.status === 200;
      }
    }

  }

  app().init();

})(window.DOM, document);