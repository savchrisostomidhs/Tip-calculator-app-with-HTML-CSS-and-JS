const resetButton = document.querySelector(".js-reset-button");
const bill = document.querySelector(".js-bill");
const customNumber = document.querySelector(".js-custom");
const peopleNumber = document.querySelector(".js-people");
const radios = document.querySelectorAll(".tipinp");
const tips = document.querySelectorAll(".tipchoice");
const tipResult = document.querySelector(".tipresult");
const total = document.querySelector(".totalresult");
const error = document.querySelector(".js-error");

radios.forEach((_, i) => {
    radios[i].addEventListener("click", () => {
        tips[i].style.color = "hsl(183, 100%, 15%)";
        radios.forEach((_, j) => {
            if (i !== j) {
                tips[j].style.color = "hsl(0, 0%, 100%)";
            }
        });
        customNumber.value = "";
    });
});

customNumber.addEventListener("focus", () => {
    radios.forEach((_, i) => {
        radios[i].checked = false;
        tips[i].style.color = "hsl(0, 0%, 100%)";
    });
    checkRadios();
});

function checkRadios() {
    let check = false;
    radios.forEach((_, i) => {
        if (radios[i].checked) { 
            check = true;
        }
    });
    return check;
}

document.body.addEventListener("change", () => {
    const billValue = bill.value;
    const customNumberValue = customNumber.value;
    const peopleNumberValue = peopleNumber.value;
    let tip, people, amount, tipAmount, totalAmount;

    if (billValue !== "" || customNumberValue !== "" || peopleNumberValue !== "" || checkRadios()) {
        resetButton.style.backgroundColor = "hsl(172, 67%, 45%)";
    } else {
        resetButton.style.backgroundColor = "hsla(172, 67%, 45%, 0.2)";
    }

    amount = billValue === "" ? 0 : billValue;

    if (checkRadios()) {
        radios.forEach((_, i) => {
            if (radios[i].checked) {
                tip = radios[i].value;
            }
        });
    } else if (customNumber != 0) {
        tip = customNumberValue;
    } else {
        tip = 0;
    }

    if (peopleNumberValue <= 0 || peopleNumberValue === "") {
        peopleNumber.style.border = "2px solid rgb(255, 110, 110)";
        error.style.display = "block";
    } else {
        people = peopleNumberValue
        peopleNumber.style.border = "none";
        error.style.display = "none";

        tipAmount = Number(amount) / Number(people) * (Number(tip) / 100);
        totalAmount = Math.round((Number(amount) / Number(people) + tipAmount) * 100) / 100;

        tipResult.innerHTML = Math.floor(tipAmount * 100) / 100;
        total.innerHTML = totalAmount;
    }
});

resetButton.addEventListener("click", () => {
    bill.value = "";
    radios.forEach((_, i) => {
        radios[i].checked = false;
        tips[i].style.color = "hsl(0, 0%, 100%)";
    });
    customNumber.value = "";
    peopleNumber.value = "";
    peopleNumber.style.border = "none";
    error.style.display = "none";
    tipResult.innerHTML = "0.00";
    total.innerHTML = "0.00";
});