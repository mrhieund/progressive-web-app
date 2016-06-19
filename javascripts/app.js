var product_template = document.getElementById('product-template');
data = fetch('data.json').then(function(response) {
    return response.json().then(function(json) {
        var catalog = document.getElementById('catalog');
        json.forEach(function(data){
            htmlText = parse(product_template.text, data);
            catalog.insertAdjacentHTML('beforeend', htmlText);    
        });
    })
}).catch(function(error) { console.log(error);});

parse = function(text, data) {
    var newText;
    console.log(data);
    newText = text.replace('{{image}}', data.image)
                .replace('{{brand}}', data.brand)
                .replace('{{alt}}', data.alt)
                .replace('{{title}}', data.title)
                .replace('{{price}}', data.price)
                .replace('{{name}}', data.name);
    return newText;
}

if ('serviceWorker' in navigator) {
navigator.serviceWorker
         .register('/javascripts/sw.js')
         .then(function() { console.log('Service Worker Registered') })
         .catch(function(error) { console.log('Registration failed with ' + error)});
}