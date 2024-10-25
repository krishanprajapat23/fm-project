// get all the elm
const ageForm = document.getElementById("age-form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const ageYears = document.getElementById("age-years");
const ageMonths = document.getElementById("age-months");
const ageDays = document.getElementById("age-days");

const submitButton = ageForm.querySelector('[type=submit]');
const errorEl = document.querySelectorAll(".error-txt");


// get the current day, month and year
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();

ageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm();
});

function getInputValue(input) {
    return input.value.trim();
}

function validateForm() {
    let isValid = true;
    resetErrors(); // Reset errors before validation

    const day = getInputValue(dayInput);
    const month = getInputValue(monthInput);
    const year = getInputValue(yearInput);

    // Check for empty fields and show corresponding error messages
    if (!day) {
        isValid = false;
        showErrorText(true, 'This field is required', dayInput);
    }
    if (!month) {
        isValid = false;
        showErrorText(true, 'This field is required', monthInput);
    }
    if (!year) {
        isValid = false;
        showErrorText(true, 'This field is required', yearInput);
    }

    // Check if the date is in the past
    if (+year > todayYear || 
        (+year === todayYear && (+month > todayMonth)) || 
        (+year === todayYear && (+month === todayMonth) && (+day > todayDay))) {
        isValid = false;
        showErrorText(true, 'Must be in the past', yearInput);
    }

    // Validate month
    if (month && (+month < 1 || +month > 12)) {
        isValid = false;
        showErrorText(true, 'Must be a valid month', monthInput);
    }

    // Validate day
    if (day && (+day < 1 || +day > 31)) { 
        isValid = false;
        showErrorText(true, 'Must be a valid day', dayInput);
    }

    // Check for invalid dates
    if (isValid) {
        const maxDaysInMonth = new Date(year, month, 0).getDate();
        if (+day > maxDaysInMonth) {
            isValid = false;
            showErrorText(true, 'Invalid Date', dayInput);
        }
    }

    if (isValid) {
        const age = calculateAge(+year, +month, +day);
        animateAgeDisplay(age.years, age.months, age.days);
    }
}


function showErrorText(show, message, inputElement) {
    const errorEl = inputElement.parentNode.querySelector('.error-txt');
    if (show && errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("show");
        inputElement.parentNode.classList.add('invalid');
    }
}

function resetErrors() {
    const errorEls = document.querySelectorAll('.error-txt'); // Select all error messages
    errorEls.forEach((el) => {
        el.textContent = ''; // Clear text
        el.classList.remove("show");
        el.parentNode.classList.remove('invalid');
    });
}

// 11 11 2022
function calculateAge(year, month, day) {

    let ageYears = todayYear - year;
    let ageMonths = todayMonth - month;
    let ageDays = todayDay - day;

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(year, month - 1, 0).getDate(); // Get last day's date of the previous month
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12; // Adjust months
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
}

// Function to animate age display
function animateAgeDisplay(years, months, days) {
    submitButton.setAttribute('disabled', true);
    ageYears.textContent = 0;
    ageMonths.textContent = 0;
    ageDays.textContent = 0;

    let yearCount = 0;
    let monthCount = 0;
    let dayCount = 0;

    const interval = setInterval(() => {
        if (yearCount < years) yearCount++;
        if (monthCount < months) monthCount++;
        if (dayCount < days) dayCount++;

        ageYears.textContent = yearCount;
        ageMonths.textContent = monthCount;
        ageDays.textContent = dayCount;

        if (yearCount >= years && monthCount >= months && dayCount >= days) {
            clearInterval(interval);
            submitButton.removeAttribute('disabled');
        }
    }, 200);
}
