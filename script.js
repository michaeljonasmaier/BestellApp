let deliveryCosts = 5;

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
    for(let i=0; i<meals[category].length; i++){
        container.innerHTML += getMealTemplate(meals[category][i], i)
    }
}

function renderCategoryImage(category){
    let container = document.getElementById(category);
    container.innerHTML += /*html*/ `<img src="./img/${category}.jpg" alt="" class="meal-image">`
}

function addToBasket(itemID){
    let mealToAdd = findMealById(itemID);
    let basketDiv = document.getElementById("basket_content");
    basketDiv.innerHTML += getBasketItemTemplate(mealToAdd);
    basket.push(mealToAdd);
    checkIfBasketEmpty();
    console.log(basket)
}

function findMealById(id){
  for (let category in meals) {
    for (let i = 0; i < meals[category].length; i++) {
      if (meals[category][i].id === id) {
        return meals[category][i];
      }
    }
  }
}

function checkIfBasketEmpty(){
    if(basket.length>0){
        document.getElementById("empty_basket_msg").style = "display: none";
        renderPrice();
    } else {
        document.getElementById("empty_basket_msg").style = "display: block";
    }
}

function renderPrice(){
    let container = document.getElementById("price_calculation_div");
    let price = 0;
    for(let i = 0; i < basket.length; i++){
        price += basket[i].price;
    }
    container.innerHTML = getPriceTemplate(price);
}

function calculateDelivery(price){
    if(price > 20){
        deliveryCosts = 0;
        return `kostenlos`
    } else {
        return `5,00 €`
    }
}

function calculatePrice(price){
    let totalPrice = price + deliveryCosts;
    return totalPrice;
}
