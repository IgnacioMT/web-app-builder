(function ($) {
  'use strict';

  var componentID = 0;

  $.fn.component = Component;

  function Component(options) {
    var id = ++componentID;
    var element = this;
    var componentTemplate = element.clone();
    var watchers = {};

    var settings = $.extend({
      controller: {}
    }, options);

    settings.controller = new settings.controller();

    function refreshFullTemplate() {
      $.each(settings.controller, replaceValues);
    }

    refreshFullTemplate();

    function replaceValues(key, value) {
      var templatePattern = new RegExp('{{\\s*(' + key + ')\\s*}}', 'mg');
      var nodes = element.textNodes();
      var templateNodes = componentTemplate.textNodes();
      var inputList = element.find($('[data-model]'));

      if (templatePattern.test(componentTemplate.html())) {
        watchProperty(key);
      }

      $.each(nodes, function(index, textNode) {
        var isFunction = typeof settings.controller[key] === 'function';
        if (!isFunction) {
          textNode.nodeValue = templateNodes[index].textContent.replace(templatePattern, value);
        }
      });

      $.each(inputList, function(index, input) {
        var isFunction = typeof settings.controller[key] === 'function';
        if (!isFunction) {
          var inputValue = settings.controller[$(input).data('model')];
          $(input).val(inputValue);
        }
      })
    }

    function watchProperty(key) {
      var isFunction = typeof settings.controller[key] === 'function';
      if (!isFunction && !watchers[key]) {
        console.log('component[' + id + '].watch[' + key + ']');
        watchers[key] = true;
        settings.controller.watch(key, function(property, oldValue, newValue) {
          refreshFullTemplate();
        });
      }
    }

    function watchGuiChanges() {
      var inputList = element.find($('[data-model]'));
      $.each(inputList, function(index, input) {
        $(input).on('input', changeHandler);

        function changeHandler() {
          settings.controller[$(input).data('model')] = $(input).val();
          refreshFullTemplate();
        }
      });
    }

    watchGuiChanges();

    return element;
  }

}(jQuery));