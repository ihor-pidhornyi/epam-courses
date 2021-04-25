const MONEY = parseFloat(prompt('Initial amount of money', '')),
    YEARS = parseInt(prompt('Number of years', '')),
    PERCENTAGE = parseFloat(prompt('Percentage of a year', '')),
    MIN_MONEY = 1000,
    MIN_YEARS = 1,
    MAX_PERCENTAGE = 100,
    DECIMAL_PLACES = 2;

if (isNaN(MONEY) || MONEY < MIN_MONEY ||
    isNaN(YEARS) || YEARS < MIN_YEARS ||
    isNaN(PERCENTAGE) || PERCENTAGE > MAX_PERCENTAGE) {
    alert('Invalid input data');
} else {
    let totalAmount = MONEY;
    for (let i = 0; i < YEARS; i++) {
        totalAmount += totalAmount * PERCENTAGE / MAX_PERCENTAGE;
    }
    alert('Initial amount: ' + MONEY +
        '\nNumber of years: ' + YEARS +
        '\nPercentage of year: ' + PERCENTAGE +
        '\n\nTotal profit: ' + (totalAmount - MONEY).toFixed(DECIMAL_PLACES) + '\n' +
        'Total amount: ' + totalAmount.toFixed(DECIMAL_PLACES));
}