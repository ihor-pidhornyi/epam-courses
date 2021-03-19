const form = document.querySelector('#form'),
    confirmButton = document.querySelector('#confirm'),
    converterButton = document.querySelector('#converter'),
    nameField = document.querySelector('#POST-name'),
    timeField = document.querySelector('#POST-time'),
    placeField = document.querySelector('#POST-place');
let eventName;

const validate = (ev) => {
    ev.preventDefault();

    const timeRegExp = new RegExp(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)
    if (!timeField.value || !nameField.value || !placeField.value) {
        alert('Input all data');
    } else if (!timeField.value.match(timeRegExp)) {
        alert('Enter time in format hh:mm');
    } else {
        console.log(`${nameField.value} has a ${eventName} ` +
        `today at ${timeField.value} somewhere in ${placeField.value}`);
        form.reset()
    }
}

const convert = (ev) => {
    ev.preventDefault();
    const DECIMAL_PLACES = 2;
    const euroCurrency = 33.52,
        dollarCurrency = 27.76;

    let euro = Number(prompt('Type in amount of euro', 0)),
        dollar = Number(prompt('Type in amount of dollar', 0));
    while (isNaN(euro) || isNaN(dollar) || euro < 0 || dollar < 0) {
        alert('Please, enter correct number')
        euro = Number(prompt('Type in amount of euro', 0));
        dollar = Number(prompt('Type in amount of dollar', 0));
    }

    alert(`${euro} euros are equal ${(euro * euroCurrency).toFixed(DECIMAL_PLACES)}hrns, ` +
        `${dollar} dollars are equal ${(dollar * dollarCurrency).toFixed(DECIMAL_PLACES)}hrns`);
}

window.onload = () => {
    eventName = prompt("What's event name?", 'meeting');
    form.style.display = 'block'
}

confirmButton.addEventListener('click', validate);
converterButton.addEventListener('click', convert)