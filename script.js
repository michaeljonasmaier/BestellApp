let deliveryCosts = 3.49;

function init() {
    renderMeals();
}

function renderMeals() {
    for (let category in meals) {
        createMealContainer(category);
        renderCategoryImage(category);
        renderCategory(category);
    }
}

function renderCategory(category) {
    let container = document.getElementById(category);
    for (let i = 0; i < meals[category].length; i++) {
        container.innerHTML += getMealTemplate(meals[category][i], i)
    }
}

function renderCategoryImage(category) {
    let container = document.getElementById(category);
    container.innerHTML += /*html*/ `<img src="./img/${category}.jpg" alt="" class="meal-image">`
}

function renderBasket() {
    let basketDiv = document.getElementById("basket_content");
    basketDiv.innerHTML = "";
    for (let i = 0; i < basket.length; i++) {
        basketDiv.innerHTML += getBasketItemTemplate(basket[i]);
    }
    renderPrice();
}

function addToBasket(itemID) {
    let mealToAdd = findMealById(itemID);
    let itemInBasket = checkIfAlreadyInBasket(itemID);
    if (itemInBasket == -1) {
        basket.push(mealToAdd);
        renderBasket();
    } else {
        basket[itemInBasket].amount++;
        renderBasket();
    }
    checkIfBasketEmpty();
    updateBasketBtn();
}

function findMealById(id) {
    for (let category in meals) {
        for (let i = 0; i < meals[category].length; i++) {
            if (meals[category][i].id === id) {
                return meals[category][i];
            }
        }
    }
}

function checkIfBasketEmpty() {
    if (basket.length > 0) {
        renderPrice();
    } else {
        console.log("hier")
        document.getElementById("basket_content").innerHTML = `<span id="empty_basket_msg">Füge ein Gericht zum Warenkorb hinzu.</span>`;
        document.getElementById("price_calculation_div").innerHTML = ``;
    }
}

function renderPrice() {
    let container = document.getElementById("price_calculation_div");
    let price = getPrice();
    container.innerHTML = getPriceTemplate(price);
}

function getPrice(){
    let price = 0;
    for (let i = 0; i < basket.length; i++) {
        price += (basket[i].price * basket[i].amount);
    }
    return price
}

function calculateDelivery(price) {
    if (price >= 20) {
        deliveryCosts = 0;
        return `kostenlos`
    } else {
        deliveryCosts = 3.49;
        return `3,49 €`
    }
}

function calculatePrice(price) {
    let totalPrice = price + deliveryCosts;
    return totalPrice;
}

function checkIfAlreadyInBasket(itemID) {
    for (let i = 0; i < basket.length; i++) {
        if (itemID == basket[i].id) {
            return i;
        }
    }
    return -1;
}

function removeItem(itemID) {
    for (let i = 0; i < basket.length; i++) {
        if(basket[i].id == itemID){
            basket[i].amount--;
            if(basket[i].amount==0){
                basket[i].amount = 1;
                basket.splice(i, 1);
            } 
        }
    }
    renderBasket();
    checkIfBasketEmpty();
    updateBasketBtn()
}

function checkButtonImage(amount){
    if(amount>1){
        return "minus"
    } else {
        return "bin"
    }
}

function getActiveNavItem(clickedItem){
    let navItems = document.getElementsByClassName("nav-item");
    for(let i=0; i<navItems.length; i++){
        navItems[i].classList.remove("active-nav-item");
    }
    clickedItem.classList.add("active-nav-item");
}

function updateBasketBtn(){
    let basketButton = document.getElementById("open_basket_btn");
    let price = calculatePrice(getPrice());
    let styledPrice = price.toFixed(2).replace(".", ",")
    if(basket.length>0){
        basketButton.innerHTML = `Warenkorb (${styledPrice} €)`;
    } else {
        basketButton.innerHTML = `Warenkorb`;
    }
}

function openDialog(){
    document.getElementById("confirmation_dialog").showModal();
}

function closeDialog(){
    clearBasket();
    document.getElementById("confirmation_dialog").close();
}

function clearBasket(){
    basket = [];
    for(let i=0; i<meals.Pizza.length; i++){
        meals.Pizza[i].amount = 1;
        meals.Pastagerichte[i].amount = 1;
        meals.Getränke[i].amount = 1;
    }
    checkIfBasketEmpty();
}