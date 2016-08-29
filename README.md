# web-app-builder (draft)

jQuery-based component-based front-end web application framework

## Get Started

Include jQuery, dom-text-nodes.js, object-property-watch.js, template-engine.js in your index.html

```html
<script src="libs/jquery/jquery-3.1.0.min.js"></script>

<script src="assets/js/dom-text-nodes.js"></script>
<script src="assets/js/object-property-watch.js"></script>
<script src="assets/js/template-engine.js"></script>
```

## Usage

Create some simple templates. You can use **data-model** attribute to bind any change with your controller.

```html
<div class="one">
    <input type="text" data-model="name"> 
    Hello, {{ name }}!
</div>

<div class="two">
    <textarea data-model="other"></textarea>
    Other variable: {{ other }}
</div>
```

Create your components and controllers. Any change in your controller variables will be reflected on your views

```javascript
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
```