$(function () {
  'use strict';

  $('.one').component({
    controller: MyControllerA
  });

  $('.two').component({
    controller: MyControllerB
  });

  function MyControllerA() {
    var vm = this;
    vm.name = 'Ignacio';
  }

  function MyControllerB() {
    var vm = this;
    vm.other = 'Hello world!';
  }

});