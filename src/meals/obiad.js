import { displayAddProductInConsuption, displayInputProduct, redirectLocation, buttonAddQuantity, buttonReduceQuantity } from "../myFunctions.js";

const secondLunchButtonBack = document.getElementById('second_Lunch_button_back_id');
const secondLunchProduct = document.getElementById('second_Lunch_product');
const addButtonPrductToList = document.getElementById('second_Lunch_button_add_product_to_list_id');
const bodyDisplayProduct = document.getElementById('second_Lunch_body_design_settings_id');
const buttonQuantityAdd = document.getElementById('second_lunch_button_add_quantity');
const buttonQuantityReduce = document.getElementById('second_lunch_button_reduce_quantity');
let inputProdutName = document.getElementById('second_Lunch_name_product_id');
let inputProductQuantity = document.getElementById('second_lunch_quantity_product_id');
inputProductQuantity.value = 100;
let arraySecondLunch = [];

secondLunchButtonBack.addEventListener('click', () => {
    redirectLocation('consuption.html')
});
buttonQuantityAdd.addEventListener('click', () => {
    buttonAddQuantity(inputProductQuantity, buttonQuantityReduce)
})
buttonQuantityReduce.addEventListener('click', () => {
    buttonReduceQuantity(inputProductQuantity, buttonQuantityReduce)
})

addButtonPrductToList.addEventListener('click', () => {
    displayAddProductInConsuption(arraySecondLunch, inputProdutName, inputProductQuantity, bodyDisplayProduct, 'mySecondLunchArray', 'myKcalArray', 'myProteinArray', 'myFatArray', 'myCarbohydratesArray');
    redirectLocation('consuption.html');
});


async function fetchProduct(url) {
    const fetchData = await fetch(url)
    const responseResult = await fetchData.json();
    arraySecondLunch = responseResult.products
    displayInputProduct(arraySecondLunch, secondLunchProduct);
}

fetchProduct('products.json')