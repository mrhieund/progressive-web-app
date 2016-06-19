var product_template = document.getElementById('product-template');
data = fetch('/data.json').then(function(response){
    console.log(response.json)
    var processed_product_template = parse(product_template.text, response.json);
    var catalog = document.getElementById('catalog');
    catalog.insertAdjacentHTML('beforeend', processed_product_template);
    catalog.insertAdjacentHTML('beforeend', processed_product_template);
}).catch(function(error) { console.log(error);});

parse = function(text, data) {
    var newText;
    newText = text.replace('{{image}}', data.image);
    newText = text.replace('{{brand}}', data.brand);
    newText = text.replace('{{alt}}', data.alt);
    newText = text.replace('{{title}}', data.title);
    newText = text.replace('{{price}}', data.price);
    newText = text.replace('{{name}}', data.name);
    return newText;
}

if ('serviceWorker' in navigator) {
navigator.serviceWorker
         .register('/javascripts/sw.js')
         .then(function() { console.log('Service Worker Registered') })
         .catch(function(error) { console.log('Registration failed with ' + error)});
}