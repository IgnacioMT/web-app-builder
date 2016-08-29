(function ($) {
  'use strict';

  var componentID = 0;

  $.fn.component = Component;

  function Component(options) {
    var id = ++componentID;
    var component = this;
    var componentTemplate = component.clone();
    var templateNodes = null;
    var outputNodes = null;
    var watchers = {};

    var settings = $.extend({
      template: '', // WIP
      controller: {}
    }, options);

    settings.controller = new settings.controller();

    function refreshTemplate() {
      templateNodes = componentTemplate.textNodes();
      outputNodes = templateNodes.clone();
      $.each(settings.controller, replaceValues);
    }

    function replaceValues(key, value) {
      if (typeof settings.controller[key] === typeof Function) {
        return;
      }

      var templatePattern = new RegExp('{{\\s*(' + key + ')\\s*}}', 'mg');
      var textNodes = component.textNodes();
      var inputList = component.find($('[data-model]'));

      if (templatePattern.test(componentTemplate.html())) {
        watchProperty(key);
      }

      $.each(textNodes, function(index, textNode) {
        var replacement = outputNodes[index].textContent.replace(templatePattern, value);
        textNode.nodeValue = replacement;
        outputNodes[index].nodeValue = replacement;
      });

      $.each(inputList, function(index, input) {
        var inputValue = settings.controller[$(input).data('model')];
        $(input).val(inputValue);
      })
    }

    function watchProperty(key) {
      if (!watchers[key]) {
        console.log('component[' + id + '].watch[' + key + ']');
        watchers[key] = true;
        settings.controller.watch(key, function(property, oldValue, newValue) {
          console.log('CONTROLLER >> DOM: component[' + id + '].' + key + ' = ' + newValue);
          refreshTemplate();
        });
      }
    }

    function watchGuiChanges() {
      var inputList = component.find($('[data-model]'));
      $.each(inputList, function(index, input) {
        $(input).on('input', changeHandler);

        function changeHandler() {
          settings.controller[$(input).data('model')] = $(input).val();
          console.log('CONTROLLER << DOM: component[' + id + '].' + $(input).data('model') + ' = ' + $(input).val());
          refreshTemplate();
        }
      });
    }

    refreshTemplate();
    watchGuiChanges();

    return component;
  }

}(jQuery));