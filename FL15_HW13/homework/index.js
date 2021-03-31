function getAge(birthDate) {
    const beginYear = new Date(0).getUTCFullYear();
    return new Date(new Date() - new Date(birthDate)).getUTCFullYear() - beginYear;
}

function getWeekDay(date) {
    const formatter = new Intl.DateTimeFormat('en', {
        weekday: 'long'
    });
    return formatter.format(new Date(date));
}

function getAmountDaysToNewYear() {
    const MILISECONDS_IN_DAY = 8.64e+7;
    const newYearDate = new Date(new Date().getUTCFullYear() + 1, 0);
    const difference = new Date(newYearDate - Date.now());
    return Math.floor(difference / MILISECONDS_IN_DAY);
}

function getProgrammersDay(year) {
    const LEAP_DAY = 12,
        DEFAULT_DAY = 13,
        DIVIDE_REST = 4;
    const day = !(year % DIVIDE_REST) ? LEAP_DAY : DEFAULT_DAY;
    const date = new Date(`September ${day}, ${year}`);
    const formattedDate = new Intl.DateTimeFormat('en-MY', {
        day: 'numeric',
        month: 'short'
    }).format(date);
    return `${formattedDate}, ${year} (${getWeekDay(date)})`;
}

function howFarIs(day) {
    const today = new Date();
    let currentDay = getWeekDay(today);
    let specifiedDay = day.toLowerCase();
    if (currentDay.toLowerCase() === specifiedDay) {
        return `Hey, today is ${currentDay} =)`;
    } else {
        let daysLeft = 0;
        while (currentDay.toLowerCase() !== specifiedDay) {
            currentDay = getWeekDay(today.setDate(today.getDate() + 1));
            daysLeft++;
        }
        return `It's ${daysLeft} day(s) left till ${currentDay}`;
    }
}

function isValidIdentifier(str) {
    const regExp = new RegExp(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/);
    return regExp.test(str);
}

function capitalize(str) {
    return str.replace(/\S+/g, match => match[0].toUpperCase() + match.slice(1));
}

function isValidAudioFile(file) {
    const regExp = new RegExp(/^[a-zA-Z]+\.(mp3|flac|alac|aac)$/)
    return regExp.test(file);
}

function getHexadecimalColors(str) {
    const regExp = new RegExp(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b/gi);
    return str.match(regExp) || [];
}

function isValidPassword(password) {
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\d\w]{8,}$/);
    return regExp.test(password);
}

function addThousandsSeparators(number) {
    const THOUSAND_SEPARATOR = 3;
    const str = number.toString();
    const regExp = new RegExp(`(?<=\\d{${str.length % THOUSAND_SEPARATOR}})\\d{3}`, 'g');
    return str.replace(regExp, (match, i) => i ? ',' + match : match);
}

function getAllUrlsFromText(text) {
    if(text === undefined) {
        return '(error)';
    }
    const ptrn = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
    const regExp = new RegExp(ptrn);
    return text.match(regExp) || [];
}

console.log(getAllUrlsFromText());