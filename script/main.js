'use strict';

const dateBase = JSON.parse(localStorage.getItem('awito')) || [];
console.log(dateBase);
const modalAdd = document.querySelector('.modal__add'),
      AddAd = document.querySelector('.add__ad'),
      modalBtnSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmit = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'),
      modalItem = document.querySelector('.modal__item'),
      modalBtnWarning = document.querySelector('.modal__btn-warning'),
      modalFileInput = document.querySelector('.modal__file-input'),
      modalFileBtn = document.querySelector('.modal__file-btn'),
      modalImageAdd = document.querySelector('.modal__image-add');

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;
const elementModalSubmit = [...modalSubmit.elements]
.filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');
  elementModalSubmit.forEach(console.log);

const infoPhoto = {};

const saveDB = () => localStorage.setItem('awito', JSON.stringify(dateBase));

const checkForm = () => {
  const validForm = elementModalSubmit.every(elem => elem.value);
      console.log(validForm);
      modalBtnSubmit.disabled = !validForm;
      modalBtnWarning.style.display =  validForm ? 'none' : '';
}



      const closeModal = event => {
        const target = event.target;

        if (target.closest('.modal__close' ) || 
            target.classList.contains('modal') ||
            event.code === 'Escape'){
              modalAdd.classList.add('hide');
              modalItem.classList.add('hide');
              document.removeEventListener('keydown', closeModal);
              modalSubmit.reset();
              modalImageAdd.src = srcModalImage;
              modalFileBtn.textContent = textFileBtn;
              checkForm();
            }
          
        
      };

      const renderCard = () => {
        catalog.textContent = '';
        dateBase.forEach((item, i) => {
            catalog.insertAdjacentHTML ('beforeend', `
            <li class="card" data-id="${i}">
					      <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
					      <div class="card__description">
					    	    <h3 class="card__header">${item.nameItem}</h3>
						        <div class="card__price">${item.costItem} ₽</div>
				    	  </div>
			    	</li>
            `);
        });
      } 

      modalFileInput.addEventListener('change', event => {
          const target = event.target;

          const reader = new FileReader();

          const file = target.files[0];

          infoPhoto.filename = file.name;
          infoPhoto.size = file.size;

          reader.readAsBinaryString(file);

          reader.addEventListener('load', event => {
            if(infoPhoto.size < 200000) {
              modalFileBtn.textContent = infoPhoto.filename;
              infoPhoto.base64 = btoa(event.target.result);
              modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`
            } else {
              modalFileBtn.textContent = 'файл не должен превышать 200kb';
              modalFileInput.value = '';
              checkForm();
            }
            
          });
      });

      modalSubmit.addEventListener('input', checkForm);

      modalSubmit.addEventListener('submit', event => {
          event.preventDefault()
          const itemObj = {};
          for (const elem of elementModalSubmit) {
            itemObj[elem.name] = elem.value;
          }
          itemObj.image = infoPhoto.base64;
          dateBase.push(itemObj);
          closeModal({target: modalAdd});
          modalSubmit.reset();
         saveDB();
         renderCard();
        });




      AddAd.addEventListener('click', () => {
        modalAdd.classList.remove('hide');
        modalBtnSubmit.disabled = true;
        document.addEventListener('keydown', closeModal);
      })

      modalAdd.addEventListener('click', closeModal);
      modalItem.addEventListener('click', closeModal);


       catalog.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.card')){
          modalItem.classList.remove('hide');
          document.addEventListener('keydown', closeModal);
        } 
      });

      renderCard();

      
      