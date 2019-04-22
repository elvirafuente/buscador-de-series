'use strict';

//traer elementos html
const inputEl = document.querySelector('#show');
const buttonEl = document.querySelector('.button');
const resultList = document.querySelector('.result-list');



function searchHandler(){
  cleanList();
  const inputShow = inputEl.value;  
  fetch (`http://api.tvmaze.com/search/shows?q=${inputShow}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){ 
      const seriesList = data;
      for (let i = 0; i < seriesList.length; i++){
        const showName = seriesList[i].show.name;
        const newShow = document.createElement('li');
        newShow.classList.add('show-result');
        const newShowTitle = document.createElement('h3');
        const newShowTitleContent = document.createTextNode(showName);
        const newShowImg = document.createElement('img');
        resultList.appendChild(newShow);
        newShow.appendChild(newShowTitle);
        newShowTitle.appendChild(newShowTitleContent);
        newShow.appendChild(newShowImg);
        newShow.addEventListener('click', addFavorites);
        if(!seriesList[i].show.image){
          newShowImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
          const showImgUrl = seriesList[i].show.image.medium;
          newShowImg.src = showImgUrl;
        }
      }    
    });
}

function cleanList(){
  if(resultList.innerHTML){
    resultList.innerHTML = '';
  }
}

function addFavorites(event){
  event.currentTarget.classList.toggle('show-result--favorite');
}

//listener
buttonEl.addEventListener('click', searchHandler);
//listener click favoritos
