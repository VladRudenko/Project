// ----------------------------Переходи між сторінками---------------------------------
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



// -----------------------Відкриття модального вікна кликанням на ("Залишити заяву на дзвінок"/ на іконку button)--------------------------
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
document.querySelector("#my-modal .modal_box").addEventListener("click", event => {
    event._isClickWithInModal = true; // Зупиняє сплив події, щоб вона не досягала батьківського елемента
});

document.getElementById("my-modal").addEventListener("click", event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("open"); // Закриває модальне вікно
});



// ----------------------------Введення/ Перевірка введеного номеру-------------------------------
document.addEventListener("DOMContentLoaded", function() { // вішаємо обробник собитій на DOMContentLoaded, знаходимо поле data-tel-input на яке будемо навішувати маску
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');

    // функція - очищення від всіх елементів, окрім чисел
    let getInputNumbersValue = function(input) {
        return input.value.replace(/\D/g, ""); // input.value - данні, що є введенні в поле ввода; глобальна 'регулярка' шукає -> удаляє по всій строчці всі символи, які не є числами, та змінює на пусті символи
    };

    // Функція для форматування номера телефону
    let formatPhoneNumber = function(inputNumbersValue) {
        let formattedInputValue = ""; // ініціалізована пуста строка, яка містить фінішний результат input.value
        // Перевіряємо перші цифри для українських номерів
        if (inputNumbersValue.startsWith("380") || inputNumbersValue.startsWith("0") || inputNumbersValue.startsWith("8")) { // якщо починається з 380, 0, 8
            formattedInputValue = "+380";
            if (inputNumbersValue.length > 3) {
                formattedInputValue += " (" + inputNumbersValue.substring(3, 5);
            }
            if (inputNumbersValue.length >= 6) {
                formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
            }
            if (inputNumbersValue.length >= 9) {
                formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
            }
            if (inputNumbersValue.length >= 11) {
                formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
            }
        } else {
            formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }
        return formattedInputValue;
    };

    // фукція onPhoneInput - обробка/ форматування входних даних 
    let onPhoneInput = function(e) { // "e" - обєкт event
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input), // у inputNumbersValue зберігаються тільки числа
            selectionStart = input.selectionStart;

        if (!inputNumbersValue) { // якщо вводинні дані не є числами -> не приймаємо
            return input.value = "";
        }

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue; // якщо видаляємо середину строки та вставляємо щось окрім чисел -> зброс форматуваня
            }
            return;
        }

        // Записуємо відформатоване значення у перемінну input.value
        input.value = formatPhoneNumber(inputNumbersValue);
    };

    // Обробка вставки
    let onPhonePaste = function(e) {
        e.preventDefault(); // Зупиняємо стандартну вставку тексту
        let pastedText = (e.clipboardData || window.clipboardData).getData("Text"); // Отримуємо текст із буфера обміну,
        let input = e.target,
            inputNumbersValue = pastedText.replace(/\D/g, ""); // Видаляємо всі символи, окрім чисел;

        if (inputNumbersValue.startsWith("0")) {
            inputNumbersValue = "380" + inputNumbersValue.substring(1);
        } else if (inputNumbersValue.startsWith("8")){
            inputNumbersValue = "380" + inputNumbersValue.substring(2);
        }

        input.value = formatPhoneNumber(inputNumbersValue);
    };

    // Обробка кнопки Backspace
    let onPhoneKeyDown = function(e) {
        let input = e.target; // у зиінну input зберігаємо e.target (текст поле, де клікнули кнопку), якщо код кнопки = '8', та довжина = 3 цифри => очищаємо все
        if (e.keyCode === 8 && getInputNumbersValue(input).length === 3){ // строга умова якщо клацається кнопка Backspace (Код клавіші '8') Функція getInputNumbersValue(input) повертає значення, яке містить тільки числа, видаляючи всі інші символи. length перевіряє кількість чисел у полі вводу. У цьому випадку, умова виконується, коли кількість чисел у полі дорівнює 3
            input.value.length = ""; //відсутність автоматичного видалення 380
            // input.value = ""; // автоматичне видалення +380, якщо стер собою введений номер
        }
    };

    for (i=0; i<phoneInputs.length; i++) {
        let input = phoneInputs[i]; // отримаємо конкретний input
        input.addEventListener("input", onPhoneInput); // до input кріпимо addEventListener на собитіє "input", фукція onPhoneInput
        input.addEventListener("keydown", onPhoneKeyDown); // до input кріпимо addEventListener на собитіє "keydown", фукція onPhoneKeyDown
        input.addEventListener("paste", onPhonePaste); // до input кріпимо addEventListener на собитіє "paste", фукція onPhonePaste
    }
});