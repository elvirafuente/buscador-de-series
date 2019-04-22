'use strict';

//traer elementos html
const inputEl = document.querySelector('#show');
const buttonEl = document.querySelector('.button');

function searchHandler(){
  const inputShow = inputEl.value;
  console.log(inputShow);
}

//listener
buttonEl.addEventListener('click', searchHandler);