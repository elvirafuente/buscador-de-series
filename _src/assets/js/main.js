'use strict';

//traer elementos html
const inputEl = document.querySelector('#show');
const buttonEl = document.querySelector('.button');

function searchHandler(){
  const inputShow = inputEl.value;
  fetch (`http://api.tvmaze.com/search/shows?q=${inputShow}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){ 
      const seriesList = data;
      for (let i = 0; i < seriesList.length; i++){
        console.log(`serie name: ${seriesList[i].show.name}`);
      }
    });

}

//listener
buttonEl.addEventListener('click', searchHandler);