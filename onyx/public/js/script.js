// const Bitacora = require("../../models/bitacora");
const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(
            currYear,
            currMonth,
            lastDateofMonth
        ).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday =
            i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
                ? "active"
                : "";
        liTag += `<li class="${isToday}" data-day="${i}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
    // select a day from calendar

    const days = document.querySelectorAll(".days li");
    days.forEach((dayElement) => {
        dayElement.addEventListener("click", (e) => {
            console.log(dayElement.innerText);

            // show bitacora for the selected day
            const day = dayElement.innerText;
            if (dayElement.classList.contains("inactive")) {
                // if clicked day is not from current month then return
                return;
            }
            const month = currMonth + 1;
            const year = currYear;
            const fecha = `${year}-${month}-${day}`;

            window.location.href = `/onyx/bitacora/${fecha}`;
        });
        
    });  
    
};
renderCalendar();

prevNextIcon.forEach((icon) => {
    // getting prev and next icons
    icon.addEventListener("click", () => {
        // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});


// Sign up form validation
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const message = document.getElementById('password-message');

function validatePassword() {
	if (password.value !== confirmPassword.value) {
		message.textContent = 'Las contraseñas no coinciden';
		message.style.color = 'red';
	} else if (password.value.length < 8) {
		message.textContent = 'La contraseña debe tener al menos 8 caracteres';
		message.style.color = 'red';
	} else if (!/[A-Z]/.test(password.value)) {
		message.textContent = 'La contraseña debe tener al menos una letra mayúscula';
		message.style.color = 'red';
	} else if (!/[a-z]/.test(password.value)) {
		message.textContent = 'La contraseña debe tener al menos una letra minúscula';
		message.style.color = 'red';
	} else if (!/[0-9]/.test(password.value)) {
		message.textContent = 'La contraseña debe tener al menos un número';
		message.style.color = 'red';
	} else {
		message.textContent = 'La contraseña es válida';
		message.style.color = 'green';
	}
}

confirmPassword.addEventListener('input', validatePassword);
password.addEventListener('input', validatePassword);