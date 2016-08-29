$(function () {
  'use strict';

  $('.one').component({
    controller: MyControllerA
  });

  $('.two').component({
    controller: MyControllerB
  });

  $('custom-tag').component({
    template: '', // WIP
    controller: MyControllerC
  });

  $('.math').component({
    controller: MyControllerD
  });

  function MyControllerA() {
    var vm = this;
    vm.name = 'Ignacio';
  }

  function MyControllerB() { }

  function MyControllerC() {
    var vm = this;
    vm.randomNumber = 0;
    setInterval(function() {
      vm.randomNumber = Math.random();
    }, 3000);
  }

  function MyControllerD() { }

});