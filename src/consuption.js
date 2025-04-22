
const myConsuptionList = document.getElementById('consuption_list_id');
let personGetKcal = document.getElementById('person_get_kcal_id');
let personGetProteins = document.getElementById('person_get_proteins_id');
let presonGetFat = document.getElementById('person_get_fat_id');
let personGetCarbohydrates = document.getElementById('person_get_carbohydrates_id');
let personSetKcal = document.getElementById('person_set_kcal_id');
let personSetProteins = document.getElementById('person_set_proteins_id');
let personSetFat = document.getElementById('person_set_fat_id');
let personSetCarbohydrates = document.getElementById('person_set_carbohydrates_id');
let myArrayNew = [];
const genderStatus = localStorage.getItem('genderStatus');
const mealOrder = {
    'brekfastName': "sniadanie.html",
    'secondBrekfastName': "drugie_sniadanie.html",
    'lunchName': "lunch.html",
    'secondLunchName': "obiad.html",
    'snackName': "przekaska.html",
    'dinnerName': "kolacja.html"
};

function getMealsFromLocalStorage() {
    return Object.entries(localStorage)
        .filter(([key, value]) => {
            if (value === "false") {
                localStorage.removeItem(key);
                return false;
            }
            return Object.keys(mealOrder).some(orderKey => key.startsWith(orderKey));
        })
        .sort(([keyA], [keyB]) => {
            const mealA = Object.keys(mealOrder).find(el => keyA.startsWith(el)) || '';
            const mealB = Object.keys(mealOrder).find(el => keyB.startsWith(el)) || '';
            return Object.keys(mealOrder).indexOf(mealA) - Object.keys(mealOrder).indexOf(mealB);
        });
}

function createMealElement(key, value, index) {
    const createSpan = document.createElement('span');
    createSpan.classList.add('consuption-meal-list');
    createSpan.innerHTML = `
        <span class="element-settings-consuption" id="element_setting_consuption_id_${index}">
            ${value} </span>
        <button class="consuption-add-meal-button" data-key="${key}">+</button><p></p>`;

    const storageKeyMap = {
        brekfastName: 'myBrekfastArray',
        secondBrekfastName: 'mySecondBrekfastArray',
        lunchName: 'myLunchArrayArray',
        secondLunchName: 'mySecondLunchArray',
        snackName: 'mySnackArray',
        dinnerName: 'myDinnerArray'
    };

    const arrayKey = storageKeyMap[key];
    if (arrayKey) {
        const contentContainer = createSpan.querySelector(`#element_setting_consuption_id_${index}`);
        const data = JSON.parse(localStorage.getItem(arrayKey) || '[]');

        data.forEach(element => {
            contentContainer.innerHTML += `
                <p class="element_consuption_list_name_product">
                    ${element.name}
                <p class="element_consuption_list2">
                    ${element.kcl} kcal. /
                    ${element.protein} b. /
                    ${element.fat} t. /
                    ${element.carbohydrates} w.
               
                 <button class="close_target_product_button" data-name="${element.name}">Usuń</button>
                 `;
        });
    }
    return createSpan;
}

function mealButtonsClick(event) {
    const button = event.target.closest('.consuption-add-meal-button');
    if (!button) return;

    const mealKey = button.getAttribute("data-key");
    const mealPageKey = Object.keys(mealOrder).find(el => mealKey.startsWith(el));

    if (mealPageKey) {
        window.location.href = mealOrder[mealPageKey];
    }
}

function removeProduct(event) {
    const deleteButton = event.target.closest('.close_target_product_button');
    if (!deleteButton) return;

    const productName = deleteButton.getAttribute('data-name');
    const spanId = deleteButton.closest('.consuption-meal-list')
        .querySelector('span[id^="element_setting_consuption_id_"]');
    if (!spanId) return;

    const spanIdIndex = spanId.id.split('_').pop();
    const meals = getMealsFromLocalStorage();
    const mealKey = meals[spanIdIndex]?.[0];

    const storageKeyMap = {
        brekfastName: 'myBrekfastArray',
        secondBrekfastName: 'mySecondBrekfastArray',
        lunchName: 'myLunchArrayArray',
        secondLunchName: 'mySecondLunchArray',
        snackName: 'mySnackArray',
        dinnerName: 'myDinnerArray'
    };

    const globalArrays = {
        myKcalArray: 'kcl',
        myProteinArray: 'protein',
        myFatArray: 'fat',
        myCarbohydratesArray: 'carbohydrates'
    };

    const storageKey = storageKeyMap[mealKey];
    if (!storageKey) return;

    let data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const productIndex = data.findIndex(product => product.name === productName);

    if (productIndex === -1) return;
    const productToRemove = data[productIndex];

    data.splice(productIndex, 1);
    localStorage.setItem(storageKey, JSON.stringify(data));

    Object.entries(globalArrays).forEach(([globalKey, prop]) => {
        let array = JSON.parse(localStorage.getItem(globalKey) || '[]');
        const indexToRemove = array.findIndex(value => value === Number(productToRemove[prop]));
        if (indexToRemove !== -1) {
            array.splice(indexToRemove, 1);
            localStorage.setItem(globalKey, JSON.stringify(array));
        }
    });

    displayMealsProduct();
    sumParametersArray();
}

function displayMealsProduct() {
    myConsuptionList.innerHTML = '';
    const meals = getMealsFromLocalStorage();

    meals.forEach(([key, value], index) => {
        const mealElement = createMealElement(key, value, index);
        myConsuptionList.appendChild(mealElement);
    });
}

myConsuptionList.addEventListener('click', function (event) {
    if (event.target.classList.contains('consuption-add-meal-button')) {
        mealButtonsClick(event);
    } else if (event.target.classList.contains('close_target_product_button')) {
        removeProduct(event);
    }
});

function sumParametersArray() {
    let myKcal = JSON.parse(localStorage.getItem('myKcalArray') || '[]');
    let myProteins = JSON.parse(localStorage.getItem('myProteinArray') || '[]');
    let myFat = JSON.parse(localStorage.getItem('myFatArray') || '[]');
    let myCarbohydrates = JSON.parse(localStorage.getItem('myCarbohydratesArray') || '[]');

    let sumKcal = myKcal.reduce((acc, val) => acc + val, 0).toFixed(1);
    let sumProteins = myProteins.reduce((acc, val) => acc + val, 0).toFixed(1);
    let sumFat = myFat.reduce((acc, val) => acc + val, 0).toFixed(1);
    let sumCarbohydrates = myCarbohydrates.reduce((acc, val) => acc + val, 0).toFixed(1);

    localStorage.setItem('myKcal', (sumKcal));
    localStorage.setItem('myProteins', (sumProteins));
    localStorage.setItem('myFat', (sumFat));
    localStorage.setItem('myCarbohydrates', (sumCarbohydrates));

    personGetKcal.innerHTML = JSON.parse(localStorage.getItem('myKcal') || '[]');
    personGetProteins.innerHTML = JSON.parse(localStorage.getItem('myProteins') || '[]');
    presonGetFat.innerHTML = JSON.parse(localStorage.getItem('myFat') || '[]');
    personGetCarbohydrates.innerHTML = JSON.parse(localStorage.getItem('myCarbohydrates') || '[]');

    if ((genderStatus === 'Mężczyzna')) {
        personSetKcal.innerHTML = JSON.parse(localStorage.getItem('daylyCaloriesLimitMen') || '[]');
        personSetProteins.innerHTML = JSON.parse(localStorage.getItem('dailyProtein') || '[]');
        personSetFat.innerHTML = JSON.parse(localStorage.getItem('dailyFat') || '[]');
        personSetCarbohydrates.innerHTML = JSON.parse(localStorage.getItem('dailyCarbs') || '[]');
    }
    else if ((genderStatus === 'Kobieta')) {
        personSetKcal.innerHTML = JSON.parse(localStorage.getItem('daylyCaloriesLimitWomen') || '[]');
        personSetProteins.innerHTML = JSON.parse(localStorage.getItem('dailyProtein') || '[]');
        personSetFat.innerHTML = JSON.parse(localStorage.getItem('dailyFat') || '[]');
        personSetCarbohydrates.innerHTML = JSON.parse(localStorage.getItem('dailyCarbs') || '[]');
    }

}
sumParametersArray()
displayMealsProduct();

