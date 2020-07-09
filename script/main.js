'use strict';

const dateBase = [];

const modalAdd = document.querySelector('.modal__add'),
      AddAd = document.querySelector('.add__ad'),
      modalBtnSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmit = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'),
      modalItem = document.querySelector('.modal__item'),
      modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementModalSubmit = [...modalSubmit.elements]
.filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');
  elementModalSubmit.forEach(console.log);



      const closeModalEscape = event => {
        if (event.code === 'Escape') {
          modalAdd.classList.add('hide');
          modalItem.classList.add('hide');
          document.removeEventListener('keydown', closeModalEscape);
        }
      }

      modalSubmit.addEventListener('input', () => {
      const validForm = elementModalSubmit.every(elem => elem.value);
      console.log(validForm);
      modalBtnSubmit.disabled = !validForm;
      modalBtnWarning.style.display =  validForm ? 'none' : '';
      });

      modalSubmit.addEventListener('submit', event => {
          event.preventDefault()
          const itemObj = {};
          for (const elem of elementModalSubmit) {
            itemObj[elem.name] = elem.value;
          }
      
          dateBase.push(itemObj);
          modalSubmit.reset();
          console.log(dateBase);

        });

const closeModal = function (event) {
      const target = event.target;

      
      if (target.closest('.modal__close') ||
       target === this ||
       target === modalItem){
      this.classList.add('hide');
      if ( this === modalAdd) {
      modalSubmit.reset();
      }
       }
    };


      AddAd.addEventListener('click', () => {
        modalAdd.classList.remove('hide');
        modalBtnSubmit.disabled = true;
        document.addEventListener('keydown', closeModalEscape);
      })

      modalAdd.addEventListener('click', closeModal);
      modalItem.addEventListener('click', closeModal);


       catalog.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.card')){
          modalItem.classList.remove('hide');
          document.addEventListener('keydown', closeModalEscape);
        } 
      });

      
      