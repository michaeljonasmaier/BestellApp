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
    } else {
        document.getElementById("empty_basket_msg").style = "display: block";
    }
}
