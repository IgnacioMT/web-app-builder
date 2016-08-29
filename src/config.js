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
    vm.replace = 'Hello world!';
  }

  function MyControllerB() {
    var vm = this;
    vm.otherVar = 'other variable';
  }

});