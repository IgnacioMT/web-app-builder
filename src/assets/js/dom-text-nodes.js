(function ($) {
  'use strict';

  $.fn.textNodes = TextNodes;

  var NODE_TYPES = {
    // Ref. https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    TEXT_NODE: 3
  };

  function TextNodes() {
    return this.contents().filter(function (index, node) {
      return node.nodeType === NODE_TYPES.TEXT_NODE;
    });
  }

}(jQuery));