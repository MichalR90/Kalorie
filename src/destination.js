import { redirectLocation } from "./myFunctions.js";

const destinationButtonBack = document.getElementById('destination_button_back_id');
const destinationMessageAlert = document.getElementById('destination_message_alert_id');
const destionationSaveButton = document.getElementById('destination_save_id');
const destionationRejectButton = document.getElementById('destination_reject_id');

let inputCurrentWeight = document.getElementById('input_currentWeight_id');
let inputDestinationWeight = document.getElementById('input_destinationWeight_id');
let inputDestinationDays = document.getElementById('input_destinationDays_id');

inputCurrentWeight.value = parseFloat(localStorage.getItem('currentWeight') || 0);
inputDestinationWeight.value = parseFloat(localStorage.getItem('destinationWeight') || 0);
inputDestinationDays.value = parseFloat(localStorage.getItem('destinationDays') || 0);

const noActivityCheckbox = document.getElementById('no_activity_id');
const lowActivityCheckbox = document.getElementById('low_activity_id');
const mediumActivityCheckbox = document.getElementById('medium_activity_id');
const bigActivityCheckbox = document.getElementById('big_activity_id');
const veryBigActivityCheckbox = document.getElementById('very_big_id');

noActivityCheckbox.checked = localStorage.getItem('noActivityCheckbox') === "true";
lowActivityCheckbox.checked = localStorage.getItem('lowActivityCheckbox') === "true";
mediumActivityCheckbox.checked = localStorage.getItem('mediumActivityCheckbox') === "true";
bigActivityCheckbox.checked = localStorage.getItem('bigActivityCheckbox') === "true";
veryBigActivityCheckbox.checked = localStorage.getItem('veryBigActivityCheckbox') === "true";

noActivityCheckbox.value = 1.2;
lowActivityCheckbox.value = 1.375;
mediumActivityCheckbox.value = 1.55;
bigActivityCheckbox.value = 1.725;
veryBigActivityCheckbox.value = 1.9;

const checkboxes = document.querySelectorAll('.activity-checkbox-input');

destinationButtonBack.addEventListener('click', () => {
    redirectLocation("settings.html");
});

destionationSaveButton.addEventListener('click', checkCorrectInputs);

destionationRejectButton.addEventListener('click', () => {
    redirectLocation("settings.html");
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', event => {
        checkboxes.forEach(cb => {
            if (cb !== event.target) cb.checked = false;
        });
    });
});

function checkCorrectInputs() {
    const currentWeight = parseFloat(inputCurrentWeight.value);
    const destinationWeight = parseFloat(inputDestinationWeight.value);
    const destinationDays = parseFloat(inputDestinationDays.value);

    if (currentWeight < 1 || currentWeight > 500) {
        showAlert("Podaj poprawną aktualną wagę !");
    } else if (destinationWeight < 0 || destinationWeight > 500) {
        showAlert("Podaj poprawną docelową wagę !");
    } else if (destinationDays < 1 || destinationDays > 1000) {
        showAlert("Podaj poprawną liczbę dni !");
    } else {
        localStorage.setItem('currentWeight', currentWeight);
        localStorage.setItem('destinationWeight', destinationWeight);
        localStorage.setItem('destinationDays', destinationDays);

        calculateParameters();

        const menLimit = parseFloat(localStorage.getItem('daylyCaloriesLimitMen')) || 0;
        const womenLimit = parseFloat(localStorage.getItem('daylyCaloriesLimitWomen')) || 0;

        if (menLimit < 1 && womenLimit < 1) {
            showAlert("Podaj poprawną liczbę dni lub wagę ponieważ limit kalorii jest ujemny !");
        } else {
            redirectLocation("consuption.html");
        }
    }
}

function showAlert(message) {
    destinationMessageAlert.style.color = 'red';
    destinationMessageAlert.innerHTML = message;
}

function calculateParameters() {
    const genderStatus = localStorage.getItem('genderStatus') || '-';
    const currentWeight = parseFloat(inputCurrentWeight.value);
    const destinationWeight = parseFloat(inputDestinationWeight.value);
    const height = parseFloat(localStorage.getItem('height') || 0);
    const age = parseFloat(localStorage.getItem('age') || 0);
    const destinationDays = Math.max(1, parseFloat(inputDestinationDays.value));
    const differentWeight = ((currentWeight - destinationWeight) * 7700) / destinationDays;

    const bmrForMen = (10 * currentWeight) + (6.25 * height) - (5 * age) + 5;
    const bmrForWomen = (10 * currentWeight) + (6.25 * height) - (5 * age) - 160;

    const activityCheckboxObject = [
        { element: noActivityCheckbox, key: 'noActivityCheckbox' },
        { element: lowActivityCheckbox, key: 'lowActivityCheckbox' },
        { element: mediumActivityCheckbox, key: 'mediumActivityCheckbox' },
        { element: bigActivityCheckbox, key: 'bigActivityCheckbox' },
        { element: veryBigActivityCheckbox, key: 'veryBigActivityCheckbox' },
    ];

    activityCheckboxObject.forEach(({ element, key }) => {

        if (element.checked) {
            localStorage.setItem(key, "true");
        } else {
            localStorage.setItem(key, "false");
        }

        if (element.checked) {
            const multiplier = parseFloat(element.value);

            if (genderStatus === 'Mężczyzna') {
                const tdee = bmrForMen * multiplier;
                const limit = (tdee - differentWeight).toFixed(0);
                localStorage.setItem('daylyCaloriesLimitMen', limit);

                storeMacros(limit);
            } else if (genderStatus === 'Kobieta') {
                const tdee = bmrForWomen * multiplier;
                const limit = (tdee - differentWeight).toFixed(0);
                localStorage.setItem('daylyCaloriesLimitWomen', limit);

                storeMacros(limit);
            }
        }
    });
}

function storeMacros(limit) {
    const cal = parseFloat(limit);
    localStorage.setItem('dailyProtein', ((cal * 0.25) / 4).toFixed(0));
    localStorage.setItem('dailyFat', ((cal * 0.25) / 9).toFixed(0));
    localStorage.setItem('dailyCarbs', ((cal * 0.5) / 4).toFixed(0));
}
