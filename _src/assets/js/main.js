'use strict';

//traer elementos html
const inputEl = document.querySelector('#show');
const buttonEl = document.querySelector('.button');
const resultList = document.querySelector('.result-list');
const favoriteListUl = document.querySelector('.favorite-list');
//array de favoritos
let favoriteShowsArray = [];


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
        newShow.addEventListener('click', addToFavoritesList);
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

function createList(itemUrl,itemName){
  const favoriteListLi = document.createElement('li');
  favoriteListLi.classList.add('favorite-item');
  const favoriteListLiTitle = document.createElement('h3');
  favoriteListLiTitle.classList.add('favorite-item__title');
  const favoriteListLiImg = document.createElement('img');
  favoriteListLiImg.classList.add('favorite-item__img');
  favoriteListUl.appendChild(favoriteListLi);
  favoriteListLi.appendChild(favoriteListLiImg);
  favoriteListLi.appendChild(favoriteListLiTitle);
  favoriteListLiImg.src = itemUrl;
  favoriteListLiTitle.innerHTML = itemName;
}

function addToFavoritesList(event){
  const favoriteShow = {};
  favoriteShow.name = event.currentTarget.children[0].innerHTML;
  favoriteShow.imgUrl = event.currentTarget.children[1].src;
  if(!event.currentTarget.classList.contains('show-result--favorite')){
    event.currentTarget.classList.add('show-result--favorite');
    favoriteShowsArray.push(favoriteShow);
    saveToLocalStorage();
    createList(favoriteShow.imgUrl,favoriteShow.name);
        
  }
}

function saveToLocalStorage(){
  localStorage.setItem('favoriteShowsArray', JSON.stringify(favoriteShowsArray));
}

function reloadFavorites(){
  if(localStorage.length !== 0){
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteShowsArray'));
        
    for(let i=0;i<savedFavorites.length;i++){

      createList(savedFavorites[i].imgUrl,savedFavorites[i].name);
      //añadelo al array
      const favoriteShow = {};
      favoriteShow.name = savedFavorites[i].name;
      favoriteShow.imgUrl = savedFavorites[i].imgUrl;
      favoriteShowsArray.push(favoriteShow);
    }
  }
}

reloadFavorites();

//listener
buttonEl.addEventListener('click', searchHandler);

