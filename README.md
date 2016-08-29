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
    Note. Templates are not going to be replaced until it's initialization!
    <br>
    <input type="text" data-model="first">
    <textarea data-model="second"></textarea>
    2 different data models: {{ first }} {{ second }}
</div>

<custom-tag>
    This number should change dynamically each 3s: {{ randomNumber }}
</custom-tag>

<div class="math">
    1 + 2 = {{ 1 + 2 }} <br>
    2 - 2 = {{ 2 - 2 }} <br>
    3 * 2 = {{ 3 * 2 }} <br>
    4 / 2 = {{ 4 / 2 }}
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
```