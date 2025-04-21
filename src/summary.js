import { redirectLocation } from "./myFunctions.js";

const summaryGender = document.getElementById('summary_gender_id');
const summaryAge = document.getElementById('summary_age_id');
const summaryHeight = document.getElementById('summary_height_id');
const summaryCurrentWeight = document.getElementById('summary_current_weight_id');
const summaryDestinationWeight = document.getElementById('summary_destination_weight_id');
const summaryKcalLimit = document.getElementById('summary_kcal_limit_id');
const summaryProtein = document.getElementById('summary_protein_id');
const summaryFat = document.getElementById('summary_fat_id');
const summaryCarbohydrates = document.getElementById('summary_carbohydrates_id');
const summaryButtonBack = document.getElementById('summary_button_back_id');

summaryButtonBack.addEventListener('click', () => {
    redirectLocation("more.html");
});

function formatValue(current, target) {
    return `<span class="span-set-parameters">${current}</span> / <span class="span-current-parameters">${target}</span>`;
}

function getAllSummaryFromLocalstore() {
    const setKcalMen = localStorage.getItem('daylyCaloriesLimitMen') || '0';
    const setKcalWomen = localStorage.getItem('daylyCaloriesLimitWomen') || '0';
    const currentKcal = localStorage.getItem('myKcal') || "0";
    const setProteins = localStorage.getItem('dailyProtein') || "0";
    const currentProteins = localStorage.getItem('myProteins') || "0";
    const setFat = localStorage.getItem('dailyFat') || "0";
    const currentFat = localStorage.getItem('myFat') || "0";
    const setCarbohydrates = localStorage.getItem('dailyCarbs') || "0";
    const currentCarbohydrates = localStorage.getItem('myCarbohydrates') || "0";
    const genderStatus = localStorage.getItem('genderStatus') || '-';
    const age = localStorage.getItem('age') || "0";
    const height = localStorage.getItem('height') || "0";
    const currentWeight = localStorage.getItem('currentWeight') || "0";
    const destinationWeight = localStorage.getItem('destinationWeight') || "0";

    summaryGender.innerHTML = `<span class="span-set-parameters">${genderStatus}</span>`;
    summaryAge.innerHTML = `<span class="span-set-parameters">${age}</span>`;
    summaryHeight.innerHTML = `<span class="span-set-parameters">${height}</span>`;
    summaryCurrentWeight.innerHTML = `<span class="span-set-parameters">${currentWeight}</span>`;
    summaryDestinationWeight.innerHTML = `<span class="span-set-parameters">${destinationWeight}</span>`;

    summaryProtein.innerHTML = formatValue(setProteins, currentProteins);
    summaryFat.innerHTML = formatValue(setFat, currentFat);
    summaryCarbohydrates.innerHTML = formatValue(setCarbohydrates, currentCarbohydrates);

    if (genderStatus === "Mężczyzna") {
        summaryKcalLimit.innerHTML = formatValue(setKcalMen, currentKcal);
    } else if (genderStatus === "Kobieta") {
        summaryKcalLimit.innerHTML = formatValue(setKcalWomen, currentKcal);
    } else {
        summaryKcalLimit.innerHTML = formatValue(currentKcal, "0");
    }
}

getAllSummaryFromLocalstore();

