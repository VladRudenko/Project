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



/*Відкриття модального вікна кликанням на "Залишити заяву на дзвінок" button*/
document.getElementById("open-modal-btn").addEventListener("click", function(){
    document.getElementById("my-modal").classList.add("open")
}) // у HTML знаходимо кнопку document.getElementById з ID "open-modal-btn", прикріпляємо дію "click", показуємо модальне вікно по ID "my-modal", додаємо клас "open"

/*Відкриття модального вікна кликанням на "Залишити заяву на дзвінок" button*/
document.getElementById("open-modal-icon").addEventListener("click", function(){
    document.getElementById("my-modal").classList.add("open")
}) // у HTML знаходимо кнопку document.getElementById з ID "open-modal-icon", прикріпляємо дію "click", показуємо модальне вікно по ID "my-modal", додаємо клас "open"

/*Закривання модального вікна кликанням на "X" button*/
document.getElementById("close-my-modal-btn").addEventListener("click", function(){
    document.getElementById("my-modal").classList.remove("open")
}) // у HTML знаходимо кнопку document.getElementById з ID "close-my-modal-btn", прикріпляємо дію "click", показуємо модальне вікно по ID "my-modal", видаляємо клас "open"