(function() {
  'use strict';

var product_template = document.getElementById('product-template');
var parse = function(text, data) {
    var newText;
    newText = text.replace('{{image}}', data.image)
                .replace('{{brand}}', data.brand)
                .replace('{{alt}}', data.alt)
                .replace('{{title}}', data.title)
                .replace('{{price}}', data.price)
                .replace('{{name}}', data.name);
    return newText;
}

fetch('data.json').then(function(response) {
    return response.json().then(function(json) {
        var catalog = document.getElementById('catalog');
        json.forEach(function(data){
            var htmlText = parse(product_template.text, data);
            catalog.insertAdjacentHTML('beforeend', htmlText);    
        });
    })
}).catch(function(error) { console.log(error);});

if ('serviceWorker' in navigator) {
navigator.serviceWorker
         .register('/javascripts/sw.js')
         .then(function() { console.log('Service Worker Registered') })
         .catch(function(error) { console.log('Registration failed with ' + error)});
}
})();