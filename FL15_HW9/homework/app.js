function reverseNumber(num) {
    const MULTIPLICITY = 10;
    const isNegative = num < 0;
    let reversedNumber = 0;
    for (num = Math.abs(num); num !== 0; num = Math.floor(num)) {
        let rest = num % MULTIPLICITY;
        reversedNumber = reversedNumber * MULTIPLICITY + rest;
        num /= MULTIPLICITY;
    }
    return isNegative ? -reversedNumber : reversedNumber;
}

function forEach(arr, func) {
    for (let el of arr) {
        func(el);
    }
}

function map(arr, func) {
    const transformedArray = [];
    forEach(arr, el => transformedArray.push(func(el)));
    return transformedArray;
}

function filter(arr, func) {
    const filteredArray = [];
    forEach(arr, el => {
        if (func(el)) {
            filteredArray.push(el);
        }
    });
    return filteredArray;
}

function getAdultAppleLovers(data) {
    const REQUIRED_AGE = 18;
    const filtered = filter(data, el => el.age > REQUIRED_AGE && el.favoriteFruit === 'apple');
    const result = map(filtered, el => el.name);
    return result;
}

function getKeys(obj) {
    let keys = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
}

function getValues(obj) {
    let values = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            values.push(obj[key]);
        }
    }
    return values;
}

function showFormattedDate(dateObj) {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `It is ${dateObj.getDate()} of ${MONTHS[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
}