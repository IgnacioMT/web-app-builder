(function ($) {
  'use strict';

  var componentID = 0;

  $.fn.component = Component;

  function Component(options) {
    var id = ++componentID;
    var component = this;
    var componentTemplate = component.clone();
    var visibleTextNodes = null;
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
      visibleTextNodes = component.textNodes();
      outputNodes = templateNodes.clone();
      $.each(settings.controller, replaceValues);
      $.each(outputNodes, evalExpressions);
    }

    function replaceValues(key, value) {
      if (typeof settings.controller[key] === typeof Function) {
        return;
      }

      var templatePattern = new RegExp('{{\\s*(' + key + ')\\s*}}', 'mg');
      var inputList = component.find($('[data-model]'));

      if (templatePattern.test(componentTemplate.html())) {
        watchProperty(key);
      }

      $.each(visibleTextNodes, function(index, textNode) {
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

    function evalExpressions(index, textNode) {
      var templatePattern = /{{\s*[\d\-\.+*/\s]*\s*}}/mg;
      var match;

      do {
        match = templatePattern.exec(textNode.nodeValue);
        if (match) {
          var expression = match[0].substr(2, match[0].length - 4);
          var expressionResult = eval(expression).toString();
          var replacement = outputNodes[index].textContent.replace(match[0], expressionResult);
          textNode.nodeValue = replacement;
          visibleTextNodes[index].nodeValue = replacement;
        }
      } while (match);
    }

    refreshTemplate();
    watchGuiChanges();

    return component;
  }

}(jQuery));