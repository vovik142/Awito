'use strict';

const modalAdd = document.querySelector('.modal__add'),
      AddAd = document.querySelector('.add__ad'),
      modalBtnSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmit = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'),
      modalItem = document.querySelector('.modal__item');


      AddAd.addEventListener('click', () => {
        modalAdd.classList.remove('hide');
        modalBtnSubmit.disabled = true;
      })

      modalAdd.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('modal__close') || target === modalAdd){
            modalAdd.classList.add('hide');
            modalSubmit.reset();
        }
      })

       catalog.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.catalog')){
          modalItem.classList.remove('hide')
        } 
      })

      document.onkeydown = function (event) {
        if (event.keyCode == 27){
          document.querySelectorAll(".modal__add").forEach(function (element){
            element.classList.add('hide');
          });
        }
      }