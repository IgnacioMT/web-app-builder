$(function () {
  'use strict';

  if (!Object.prototype.watch) {
    Object.prototype.watch = watchHandler;
  }

  if (!Object.prototype.unwatch) {
    Object.prototype.unwatch = unwatchHandler;
  }

  function unwatchHandler(property) {
    var tmp = this[property];
    delete this[property];
    this[property] = tmp;
  }

  function watchHandler(property, handler) {
    var currentValue = this[property];

    function getter() {
      return currentValue;
    }

    function setter(newValue) {
      handler.call(this, property, currentValue, newValue);
      currentValue = newValue;
      return newValue;
    }

    Object.defineProperty(this, property, {
      get: getter,
      set: setter
    });

  }

});