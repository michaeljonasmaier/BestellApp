function getMealTemplate(meal, index) {
    let template = /*html*/`
    <div id="meal_${meal.id}" class="meal-item" onclick="addToBasket(${meal.id})">
        <div class="meal-information">
            <h3>${meal.title}</h3>
            <span>${meal.description}</span>
            <h4>${stylePrice(meal, index)}</h4>
        </div>
        <img class="add-meal-button" src="./img/add.png" alt=""> 
    </div>`;
    return template;
}

function createMealContainer(category) {
    let container = document.getElementById("meals_div");
    container.innerHTML += 
    `<div id="${category}" class="meal-container">
        <h2 id="category_title">${category}</h2>                  
    </div>`
}

function stylePrice(meal) {
    let price = meal.price * meal.amount
    let styledPrice = price.toFixed(2).replace(".", ",");
    return styledPrice + " €"
}

function getBasketItemTemplate(mealToAdd) {
    let basketTemplate = /*html*/`
    <div class="basket-item">
        <span id="meal_title">${mealToAdd.title}</span>
        <div class="basket-item-informations">
            <div class="amount_div">
                <img class="amount-btn" id="minus_btn" src="./img/${checkButtonImage(mealToAdd.amount)}.png" alt="" onclick="removeItem(${mealToAdd.id})">
                <span id="amount_${mealToAdd.id}">${mealToAdd.amount}</span>
                <img class="amount-btn" src="./img/plus.png" alt="" onclick="addToBasket(${mealToAdd.id})">
            </div>
            <span id="total_price">${stylePrice(mealToAdd)}</span>
        </div>
    </div>`
    return basketTemplate;
}

function getPriceTemplate(price) {
    let priceTemplate = /*html*/`
    <div class="calculation-text">
        <div class="price-div">
            <span>Zwischensumme</span>
            <span id="subtotal">${price.toFixed(2).replace(".", ",")} €</span>
        </div>
        <div class="price-div">
            <span>Lieferkosten</span>
            <span id="delivery">${calculateDelivery(price)}</span>
        </div>
        <div class="price-div">
            <span><b>Gesamt</b></span>
            <span id="total"><b>${calculatePrice(price).toFixed(2).replace(".", ",")} €</b></span>
        </div>
    </div>
    <div class="pay-btn-div price-div">
        <button id="pay_btn" onclick="openDialog()">Bezahlen (${calculatePrice(price).toFixed(2).replace(".", ",")} €)</button>
    </div>`
    return priceTemplate;
}