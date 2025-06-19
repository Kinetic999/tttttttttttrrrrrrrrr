// Маска для ввода номера телефона
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call(document.querySelectorAll('.phone'), function (input) {
        let keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    })
})

const elementsOrder = document.querySelectorAll('.btn-order');
const forms = document.querySelectorAll('form');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal-close');
const modalForm = document.querySelector('.modal-form');
const modalComplete = document.querySelector('.modal-complete');

// Открываем модальное окно
const myEventHandler = () => {
    modal.style.display = "flex";
};

for (let i = 0; i < elementsOrder.length; i++) {
    elementsOrder[i].addEventListener('click', myEventHandler);
}

// Закрываем модальное окно
modalCloseBtn.addEventListener('click', () => {
    if (modalForm.style.getPropertyValue('display') === "none") {
        modalForm.style.setProperty('display', 'flex', 'important');
        modalComplete.style.setProperty('display', 'none', 'important');
    }
    modal.style.display = "none";
});

// Считываем данные из формы
const submitFormData = (event, element) => {
    event.preventDefault();
    const formData = new FormData(element);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    console.log(`${name}: ${email}, ${phone}`); // выводим в консоль
    console.log(event)
    modalForm.style.setProperty('display', 'none', 'important');
    modalComplete.style.setProperty('display', 'flex', 'important');
    if (modal.style.display === "none") modal.style.display = "flex";
}

for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', (event) => submitFormData(event, forms[i]));
}