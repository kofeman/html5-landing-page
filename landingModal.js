document.body.addEventListener("click", _modal, false);


/*
функция определяет, есть ли у кнопки класс popup-link или класс modal-form-button.
Если классы есть, то срабатывают соответствующие функции
*/

function _modal(e) {
    var srcElement = e.target;
    if (srcElement.classList.contains('popup-link')) {
        e.preventDefault();
        openPopup(srcElement.getAttribute('data-href'));
    }

    if (srcElement.classList.contains('modal-form-button')) {
        e.preventDefault();
        modalForm( srcElement.getAttribute('data-formId'),
                   srcElement.getAttribute('data-inputName'),
                   srcElement.getAttribute('data-value')
         );
    }
}

/*
функция показывает popup. И когда функция выполняется в первый раз, создается кнопка закрыть и вешается обработчик на кнопку.
также вешается обработчик на фон, который появляется при открытии окна
 */

function openPopup(href) {
    var popup = document.getElementById(href),
        popupBlock = popup.getElementsByTagName('div')[0];
    popup.style.display = 'block';

    if( (popup.getElementsByClassName('close')[0] == null) ) {
        var close = document.createElement('button');
        close.innerHTML = 'X';
        close.className = 'close';
        close.addEventListener("click", function () {  popup.style.display = 'none'; }, false);
        popup.addEventListener("click", function () {  popup.style.display = 'none'; }, false);
        popupBlock.addEventListener("click", function (e) {e.stopPropagation() }, false);
        popupBlock.appendChild(close);
    }
}

/*
функция добавляет скрытое поле в указанную по id форму.
*/

function modalForm (formId, inputName, inputValue) {
    var currentForm = document.forms[formId];

    if (! (currentForm.elements[inputName]) ) {
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', inputName);
        hiddenInput.setAttribute('id', 'hiddenField');
        hiddenInput.value = inputValue;
        currentForm.appendChild(hiddenInput);
    }

    else {
        var currentValue = currentForm.elements[inputName];
        if ( currentValue.value != inputValue ) {
            currentValue.value = inputValue;
        }
    }
}

/*
 функция добавляет обработчики для форм, чтобы после отправки вывести сообщение, удачная ли была отправка или же произошла ошибка.
 */

var myForm = document.forms[0];
var myForm2 = document.forms[1];

myForm2.addEventListener("submit", function(e){
    e.preventDefault();
    showThanks(myForm2);
    console.log();
}, false);

myForm.addEventListener("submit", function(e){
        e.preventDefault();
        showThanks(myForm);
        console.log();
    }, false);

function showThanks(form){
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "send.php");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                formData = xhr.responseText;
                if (formData == "true") {
                    var thanks = document.createElement('p');
                    thanks.innerHTML = 'Спасибо! форма отправлена!';
                    thanks.className = 'thanks';
                    form.appendChild(thanks);
                }
            }
            else {
                var err = document.createElement('p');
                err.innerHTML = 'Ошибка :( обновите страницу и попробуйте еще раз';
                err.className = 'err';
                form.appendChild(err);
            }
        }
    };
    xhr.send(formData);
}
