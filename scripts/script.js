// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let x = 0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = x + 1;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener("click", function(){
          router.setState(2, newPost);
        });
        x = x + 1;
      });
    });
});

let home = document.querySelector('header').querySelector('h1');
home.addEventListener("click", function(){
  router.setState(1, document.querySelector('body').className);
})

let settings = document.querySelector('header').querySelector('img');
settings.addEventListener("click", function(){
  router.setState(3);
})

window.addEventListener('popstate', (event) => {

  if(event.state.page == 1){
    router.setState(1, document.querySelector('body').className);
  }
  else if(event.state.page == 3){
    router.setState(3);
  }
  else{
    let entry = document.getElementById(event.state.id);
    router.setState(2, entry);
  }
});
