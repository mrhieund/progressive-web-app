(function() {
  'use strict';

const profile_template = document.getElementById('profile-template');
const reduce = function(arr, initValue, connectStartValue, connectEndValue) {
  return arr.reduce(function(acc, currentValue){return acc + connectStartValue + currentValue + connectEndValue}, initValue)
}
const parse = function(text, data) {
    var newText;
    var exp = reduce(data.experience_exp, "", "<p>", "</p>");
    var skills = reduce(data.skills, "", "<div class='col-xs-6'>", "</div>");
    newText = text.replace(/{{full_name}}/g, data.full_name)
                .replace(/{{avatar}}/g, data.avatar)
                .replace(/{{first_name}}/g, data.first_name)
                .replace(/{{job_title}}/g, data.job_title)
                .replace(/{{github}}/g, data.github)
                .replace(/{{linkedin}}/g, data.linkedin)
                .replace(/{{location}}/g, data.location)
                .replace(/{{hometown}}/g, data.hometown)
                .replace(/{{interests}}/g, data.interests)
                .replace(/{{company}}/g, data.company)
                .replace(/{{goals}}/g, data.goals)
                .replace(/{{experience_year}}/g, data.experience_year)
                .replace(/{{experience_exp}}/g, exp)
                .replace(/{{skills}}/g, skills);
    return newText;
}

fetch('data.json').then(function(response) {
    return response.json().then(function(json) {
        const main = document.getElementById('main');
        json.forEach(function(data){
            const htmlText = parse(profile_template.text, data);
            main.insertAdjacentHTML('beforeend', htmlText);
        });
    })
}).catch(function(error) { console.log(error);});

if ('serviceWorker' in navigator) {
navigator.serviceWorker
         .register('/sw.js')
         .then(function() { console.log('Service Worker Registered') })
         .catch(function(error) { console.log('Registration failed with ' + error)});
}
})();
