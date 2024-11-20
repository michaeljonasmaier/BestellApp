let isOpened;

function toggleBasket() {
    if (window.innerWidth < 1000) {
        if (!isOpened) {
            document.getElementById("basket_sec").classList.add("d-none");
            document.getElementById("basket_btn-sec").classList.remove("d-none");
        }
    } else {
        isOpened = false;
        document.getElementById("basket_sec").classList.remove("d-none");
        document.getElementById("basket_btn-sec").classList.add("d-none");
    }
};

window.addEventListener('resize', toggleBasket);

function openBasket() {
    console.log("sind drin")
    document.getElementById("basket_sec").classList.remove("d-none");
    isOpened = true;
}

function closeBasket() {
    document.getElementById("basket_sec").classList.add("d-none");
    isOpened = false;
}