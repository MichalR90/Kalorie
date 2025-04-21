export function createList(product) {
    const createProductDiv = document.createElement('div');
    createProductDiv.className = 'display-create-product'
    const createProductName = document.createElement('span');
    createProductName.innerHTML = `Produkt: ${product.name} <p></p>`;
    const createProductKcl = document.createElement('span');
    createProductKcl.innerHTML = `Kalorie: ${product.kcl}<p></p>`;
    const createProductProtein = document.createElement('span');
    createProductProtein.innerHTML = `Białko: ${product.protein}<p></p>`;
    const createProductFat = document.createElement('span');
    createProductFat.innerHTML = `Tłuszcz: ${product.fat}<p></p>`;
    const createProductCarbohydrates = document.createElement('span');
    createProductCarbohydrates.innerHTML = `Węglowodany: ${product.carbohydrates}<p></p>`;
    const createProductsugar = document.createElement('span');
    createProductsugar.innerHTML = `Cukier: ${product.sugar}<p></p>`;
    const createProductfiber = document.createElement('span');
    createProductfiber.innerHTML = `Błonnik: ${product.fiber}<p></p>`;
}
export function displayInputProduct(myArray, myDiv) {
    myArray.forEach(myProducts => {
        let myList = document.createElement('option')
        myList.classList.add('product-option-list')
        myList.value = myProducts.name
        myDiv.appendChild(myList)
    });
}
export function redirectLocation(locationHref) {
    window.location.href = locationHref
}

export function displayAddProductInConsuption(
    myArray,
    productName,
    productQuantity,
    myBodyDisplayProduct,
    keyMealArray,
    myKcalArray,
    myProteinArray,
    myFatArray,
    myCarbohydratesArray
) {
    let myProductArray = JSON.parse(localStorage.getItem(keyMealArray)) || [];
    let kcalArray = JSON.parse(localStorage.getItem(myKcalArray)) || [];
    let proteinArray = JSON.parse(localStorage.getItem(myProteinArray)) || [];
    let fatArray = JSON.parse(localStorage.getItem(myFatArray)) || [];
    let carbohydratesArray = JSON.parse(localStorage.getItem(myCarbohydratesArray)) || [];
    // let sugarArray = JSON.parse(localStorage.getItem(mySugarArray)) || [];
    // let fiberArray = JSON.parse(localStorage.getItem(myFiberArray)) || [];

    const result = myArray.filter(item => item.name == productName.value.trim());
    result.forEach(element => {
        let myProductElementsWithQuantity = {
            name: element.name,
            kcl: element.kcl * productQuantity.value / 100,
            protein: element.protein * productQuantity.value / 100,
            fat: element.fat * productQuantity.value / 100,
            carbohydrates: element.carbohydrates * productQuantity.value / 100,
            sugar: element.sugar * productQuantity.value / 100,
            fiber: element.fiber * productQuantity.value / 100
        }
        myProductArray.push(myProductElementsWithQuantity);
        kcalArray.push(myProductElementsWithQuantity.kcl);
        proteinArray.push(myProductElementsWithQuantity.protein);
        fatArray.push(myProductElementsWithQuantity.fat);
        carbohydratesArray.push(myProductElementsWithQuantity.carbohydrates);

        createList(element, myBodyDisplayProduct);

    });
    localStorage.setItem(keyMealArray, JSON.stringify(myProductArray)) || [];
    localStorage.setItem(myKcalArray, JSON.stringify(kcalArray)) || [];
    localStorage.setItem(myProteinArray, JSON.stringify(proteinArray)) || [];
    localStorage.setItem(myFatArray, JSON.stringify(fatArray)) || [];
    localStorage.setItem(myCarbohydratesArray, JSON.stringify(carbohydratesArray)) || [];
}

export function buttonAddQuantity(productQuantity, button) {
    productQuantity.value = parseFloat(productQuantity.value) + 100;
    button.disabled = false;
}
export function buttonReduceQuantity(productQuantity, button) {
    if (productQuantity.value > 1) {
        productQuantity.value = parseFloat(productQuantity.value) - 100;
    }
    else {
        button.disabled = true;
    }
}
export async function fetchProduct(url, myArray, mealProduct) {
    const fetchData = await fetch(url)
    const responseResult = await fetchData.json();
    myArray = responseResult.products
    displayInputProduct(myArray, mealProduct);
}


