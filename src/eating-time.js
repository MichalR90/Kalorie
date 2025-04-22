const brekfastCheckbox = document.getElementById('brekfast_checkbox_id');
const brekfastName = document.getElementById('brekfast_name_id');
const brekfastTime = document.getElementById('brekfast_time_id');
const secondBrekfastcheckbox = document.getElementById('second_brekfast_checkbox_id');
const secondBrekfastName = document.getElementById('second_brekfast_name_id');
const secondBrekfastTime = document.getElementById('second_brekfast_time_id');
const lunchCheckbox = document.getElementById('lunch_checkbox_id');
const lunchName = document.getElementById('lunch_name_id');
const lunchTime = document.getElementById('lunch_time_id');
const secondLunchCheckbox = document.getElementById('seond_lunch_checkbox_id');
const secondLunchName = document.getElementById('second_lunch_name_id');
const secondLunchTime = document.getElementById('second_lunch_time_id');
const snackCheckbox = document.getElementById('snack_checkbox_id');
const snackName = document.getElementById('snack_name_id');
const snackTime = document.getElementById('snack_time_id');
const dinnerCheckbox = document.getElementById('dinner_checkbox_id');
const dinnerName = document.getElementById('diner_name_id');
const dinnerTime = document.getElementById('diner_time_id');
const backButton = document.getElementById('eatingTime_button_back_id');
const saveButton = document.getElementById('eatingTime_save_id');
const rejectButton = document.getElementById('eatingTime_reject_id');

brekfastTime.value = localStorage.getItem('brekfastTime');
secondBrekfastTime.value = localStorage.getItem('secondBrekfastTime');
lunchTime.value = localStorage.getItem('lunchTime');
secondLunchTime.value = localStorage.getItem('secondLunchTime');
snackTime.value = localStorage.getItem('snackTime');
dinnerTime.value = localStorage.getItem('dinnerTime');

brekfastCheckbox.checked = localStorage.getItem('checkboxStatusBrekfast') === "true";
secondBrekfastcheckbox.checked = localStorage.getItem('checkboxStatusSecondBrekfast') === "true";
lunchCheckbox.checked = localStorage.getItem('checkboxStatusLunch') === "true";
secondLunchCheckbox.checked = localStorage.getItem('checkboxStatusSecondLunch') === "true";
snackCheckbox.checked = localStorage.getItem('checkboxStatusSnack') === "true";
dinnerCheckbox.checked = localStorage.getItem('checkboxStatusDinner') === "true";

backButton.addEventListener('click', () => {
    window.history.back();
})
saveButton.addEventListener('click', () => {
    setEatingTimeToLocalStorage();
    window.location.href = 'consuption.html'
})
rejectButton.addEventListener('click', () => {
    window.location.href = 'settings.html'
})

function setEatingTimeToLocalStorage() {

    const mealTimeObject = [
        {
            element: brekfastCheckbox,
            nameKey: 'brekfastName',
            timeKey: 'brekfastTime',
            checkBoxKey: 'checkboxStatusBrekfast',
            nameValue: brekfastName.value,
            timeValue: brekfastTime.value
        },
        {
            element: secondBrekfastcheckbox,
            nameKey: 'secondBrekfastName',
            timeKey: 'secondBrekfastTime',
            checkBoxKey: 'checkboxStatusSecondBrekfast',
            nameValue: secondBrekfastName.value,
            timeValue: secondBrekfastTime.value
        },
        {
            element: lunchCheckbox,
            nameKey: 'lunchName',
            timeKey: 'lunchTime',
            checkBoxKey: 'checkboxStatusLunch',
            nameValue: lunchName.value,
            timeValue: lunchTime.value
        },
        {
            element: secondLunchCheckbox,
            nameKey: 'secondLunchName',
            timeKey: 'secondLunchTime',
            checkBoxKey: 'checkboxStatusSecondLunch',
            nameValue: secondLunchName.value,
            timeValue: secondLunchTime.value
        },
        {
            element: snackCheckbox,
            nameKey: 'snackName',
            timeKey: 'snackTime',
            checkBoxKey: 'checkboxStatusSnack',
            nameValue: snackName.value,
            timeValue: snackTime.value
        },
        {
            element: dinnerCheckbox,
            nameKey: 'dinnerName',
            timeKey: 'dinnerTime',
            checkBoxKey: 'checkboxStatusDinner',
            nameValue: dinnerName.value,
            timeValue: dinnerTime.value
        },
    ];

    mealTimeObject.forEach(({ element, nameKey, timeKey, checkBoxKey, nameValue, timeValue }) => {
        switch (element.checked) {
            case true:
                localStorage.setItem(checkBoxKey, "true");
                localStorage.setItem(nameKey, nameValue);
                localStorage.setItem(timeKey, timeValue);
                break;
            case false:
                localStorage.setItem(checkBoxKey, "false");
                localStorage.removeItem(nameKey);
                localStorage.removeItem(timeKey);
                break;
        }
    });
}