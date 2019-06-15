'use strict';


//traer elementos html
const inputEl = document.querySelector('#show');
const buttonEl = document.querySelector('.button');
const resultList = document.querySelector('.result-list');
const favoriteListUl = document.querySelector('.favorite-list');
//array de favoritos
let seriesList = [];
let favoriteShowsArray = JSON.parse(localStorage.getItem('favoriteShowsArray')) || [];

function paintPrincipalList(){
  if (!seriesList.length) {
    const newMessage = `No hay resultados para ${inputShow} :(`;
    const newMessageEl = document.createElement('li');
    newMessageEl.classList.add('message')
    const newMessageContent = document.createTextNode(newMessage);
    resultList.appendChild(newMessageEl);
    newMessageEl.appendChild(newMessageContent);
  } else {
    for (let i = 0; i < seriesList.length; i++) {
      const showName = seriesList[i].show.name;
      const showId = seriesList[i].show.id;
      const newShow = document.createElement('li');
      newShow.classList.add('show-result');
      for (const favItem of favoriteShowsArray){
        if (showId == favItem.id){
          newShow.classList.add('show-result--favorite');
        }
      }
      const newShowTitle = document.createElement('h3');
      const newShowTitleContent = document.createTextNode(showName);
      const newShowImg = document.createElement('img');
      resultList.appendChild(newShow);
      newShow.appendChild(newShowTitle);
      newShowTitle.appendChild(newShowTitleContent);
      newShow.appendChild(newShowImg);
      newShow.setAttribute('data-id', `${showId}`);
      newShow.addEventListener('click', addToFavoritesList);
      if (!seriesList[i].show.image) {
        newShowImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
      } else {
        const showImgUrl = seriesList[i].show.image.medium;
        newShowImg.src = showImgUrl;
      }
    }
  }
}

function removeFav(id){
  for(let i = 0; i<favoriteShowsArray.length; i++){
    if(favoriteShowsArray[i].id === id){
      favoriteShowsArray.splice(i,1);
      favoriteListUl.innerHTML = '';
      for (let i = 0; i < favoriteShowsArray.length; i++) {
        createList(favoriteShowsArray[i].imgUrl, favoriteShowsArray[i].name, favoriteShowsArray[i].id);
      }
      // saveToLocalStorage();
    }
  }
}

function handleRemoveFavorite(event){
  const { currentTarget } = event;
  const { id } = currentTarget.dataset;
  removeFav(id);
  saveToLocalStorage();
  cleanList();
  paintPrincipalList();
  console.log(favoriteShowsArray);
  
}

function searchHandler(event) {
  event.preventDefault();
  cleanList();
  const inputShow = inputEl.value;
  if (inputShow) {
    fetch(`http://api.tvmaze.com/search/shows?q=${inputShow}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        seriesList = data;
        paintPrincipalList();
      })
  } else {
    const newMessage = 'Introduce el nombre de una serie y pincha en la lupa';
    const newMessageEl = document.createElement('li');
    newMessageEl.classList.add('message')
    const newMessageContent = document.createTextNode(newMessage);
    resultList.appendChild(newMessageEl);
    newMessageEl.appendChild(newMessageContent);
  }

}

function cleanList() {
  if (resultList.innerHTML) {
    resultList.innerHTML = '';
  }
}


function createList(itemUrl, itemName, itemId) {
  const favoriteListLi = document.createElement('li');
  favoriteListLi.classList.add('favorite-item');
  const favoriteListLiTitle = document.createElement('h3');
  favoriteListLiTitle.classList.add('favorite-item__title');
  const favoriteListLiImg = document.createElement('img');
  favoriteListLiImg.classList.add('favorite-item__img');
  const favoriteRemoveBtn = document.createElement('i');
  favoriteRemoveBtn.classList.add('fas');
  favoriteRemoveBtn.classList.add('fa-times-circle');
  favoriteRemoveBtn.classList.add('favorite__remove-btn');
  favoriteRemoveBtn.addEventListener('click', handleRemoveFavorite);
  favoriteRemoveBtn.setAttribute('data-id', `${itemId}`);
  favoriteListUl.appendChild(favoriteListLi);
  favoriteListLi.appendChild(favoriteListLiImg);
  favoriteListLi.appendChild(favoriteListLiTitle);
  favoriteListLi.setAttribute('data-id', `${itemId}`);
  favoriteListLi.appendChild(favoriteRemoveBtn);
  favoriteListLiImg.src = itemUrl;
  favoriteListLiTitle.innerHTML = itemName;
}

function addToFavoritesList(event) {
  const favoriteShow = {};
  favoriteShow.name = event.currentTarget.children[0].innerHTML;
  favoriteShow.imgUrl = event.currentTarget.children[1].src;
  favoriteShow.id = event.currentTarget.getAttribute('data-id');

  event.currentTarget.classList.toggle('show-result--favorite');
  
  const isSelected = event.currentTarget.classList.contains('show-result--favorite');

  if(isSelected){
    createList(favoriteShow.imgUrl, favoriteShow.name, favoriteShow.id);
    console.log(favoriteShowsArray);
    favoriteShowsArray.push(favoriteShow);
  } else {
    removeFav(favoriteShow.id)
    // saveToLocalStorage();
    console.log(favoriteShowsArray);
  }

  
  saveToLocalStorage();
  

}

function saveToLocalStorage() {
  localStorage.setItem('favoriteShowsArray', JSON.stringify(favoriteShowsArray));
}

function init() {

  //listener
  buttonEl.addEventListener('click', searchHandler);

  if (favoriteShowsArray) {
    for (let i = 0; i < favoriteShowsArray.length; i++) {
      createList(favoriteShowsArray[i].imgUrl, favoriteShowsArray[i].name, favoriteShowsArray[i].id);
    }
  }
}

init();



