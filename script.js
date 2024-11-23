const refs = {
    navigation: document.querySelector("#tabs-content-1 [data-navigation]"),//єдинийй екземпляр, котрий знаходиться в першу чергу по ID
    content: document.querySelector("#tabs-content-1 [data-main-content]")
}; 

refs.navigation.addEventListener("click", onChangeNavigation);

function onChangeNavigation(event) {
    const {target} = event;

    if (target.nodeName !== "BUTTON") return;

    const currentButton = target; //класс в окремій змінній
    const prevActiveButton = refs.navigation.querySelector(".btnActive"); //шукаэмо конкретно в div тег data-navigation
    const prevActiveContent = refs.content.querySelector(".contentShow");

    // console.log("prevActiveButton", prevActiveButton);

    if (prevActiveButton) {
        prevActiveButton.classList.remove("btnActive");
        prevActiveContent.classList.remove("contentShow");
    }

    const currentTab = currentButton.dataset.tab;

    const currentContent = refs.content.querySelector(`[data-content="${currentTab}"]`);
        
    console.log(currentContent);
    
    currentButton.classList.add("btnActive");
    currentContent.classList.add("contentShow");
}



// Відкриття модального вікна кликанням на ("Залишити заяву на дзвінок"/ на іконку button) 
["open-modal-btn", "open-modal-icon"].forEach(id => {
    document.getElementById(id).addEventListener("click", function () {
        document.getElementById("my-modal").classList.add("open");
    });
});// у HTML знаходимо кнопку document.getElementById з масивом унікальних ID ["open-modal-btn", "open-modal-icon"], прикріпляємо дію "click", показуємо модальне вікно по ID "my-modal", додаємо клас "open"

// Закривання модального вікна кликанням на "X" button*
document.getElementById("close-my-modal-btn").addEventListener("click", function(){
    document.getElementById("my-modal").classList.remove("open")
}) // у HTML знаходимо кнопку document.getElementById з ID "close-my-modal-btn", прикріпляємо дію "click", показуємо модальне вікно по ID "my-modal", видаляємо клас "open"

// Закривання модального вікна кликанням зовні його
// document.querySelector("my-modal .modal_box"),addEventListener("click", event => {
//     event._isClickWithInModal = true;
// });

// document.getElementById("my-modal").addEventListener("click", event => {
//     if (event._isClickWithInModal) return;
//     event.currentTarget.classList.remove("open");
// });


// Введення/ Перевірка введеного номеру
document.addEventListener("DOMContentLoaded", function() { // вішаємо обробник собитій на DOMContentLoaded, знаходимо поле data-tel-input на яке будемо навішувати маску
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');
    // document.querySelector("input").focus();

    // функція - очищення від всіх елементів, окрім чисел
    let getInputNumbersValue = function(input) {
        return input.value.replace(/\D/g, ""); // input.value - данні, що є введенні в поле ввода; глобальна 'регулярка' шукає -> удаляє по всій строчці всі символи, які не є числами, та змінює на пусті символи
    }

    // фукція onPhoneInput - обробка/ форматування входних даних 
    let onPhoneInput = function(e) { // "e" - обєкт event
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input); // у inputNumbersValue зберігаються тільки числа

        if (!inputNumbersValue) { // якщо вводинні дані не є числами -> не приймаємо
            return input.value = "";
        }

        // Початковий символ + для міжнародного формату
        let formattedInputValue = "";

        // Перевіряємо перші цифри для українських номерів
        if (inputNumbersValue.startsWith("380")) {
            // Якщо номер починається з 380
            formattedInputValue = "+380 " + inputNumbersValue.substring(3, 5) + " " + 
                                inputNumbersValue.substring(5, 8) + " " + 
                                inputNumbersValue.substring(8, 10) + " " + 
                                inputNumbersValue.substring(10, 12);
        } else if (inputNumbersValue.startsWith("0")) {
            // Якщо номер починається з 0 (внутрішній формат)
            formattedInputValue = "+380 " + inputNumbersValue.substring(1, 3) + " " + 
                                inputNumbersValue.substring(3, 6) + " " + 
                                inputNumbersValue.substring(6, 8) + " " + 
                                inputNumbersValue.substring(8, 10);
        } else if (inputNumbersValue.startsWith("8")) {
            // Обробляємо старий формат з "8"
            formattedInputValue = "+380 " + inputNumbersValue.substring(1, 3) + " " + 
                                inputNumbersValue.substring(3, 6) + " " + 
                                inputNumbersValue.substring(6, 8) + " " + 
                                inputNumbersValue.substring(8, 10);
        } else {
            // Not Ukrainian Phone-Number :(
            // console.log("NOT UA");
            return input.value = inputNumbersValue;
        }

        input.value = formattedInputValue.trim(); // Записуємо відформатоване значення
    }

    // Додаємо обробник до input
    document.querySelector('input[type="tel"]').addEventListener("input", onPhoneInput);

    for (i=0; i<phoneInputs.length; i++) {
        let input = phoneInputs[i]; // отримаємо конкретний input
        input.addEventListener("input", onPhoneInput); // до input кріпимо addEventListener на собитіє "input", фукція onPhoneInput
    }
});