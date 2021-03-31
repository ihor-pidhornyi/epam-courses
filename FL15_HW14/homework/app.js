const appRoot = document.getElementById('app-root');
const { getCountryListByRegion, getCountryListByLanguage, getRegionsList, getLanguagesList } = externalService;
let regionRadio, languageRadio, optionSelector;

function createComponent(desc = 'Component description', className, children = []) {
    const wrapper = document.createElement('div');
    const description = document.createElement('p');
    description.textContent = desc;
    wrapper.append(description, ...children);
    wrapper.classList.add(className);
    return wrapper;
}

function renderHeader() {
    const wrapper = document.createElement('header');

    const caption = document.createElement('h1');
    caption.textContent = 'Countries search';
    caption.classList.add('title');

    const radioPicker = createComponent('Please choose type of search:', 'radio-picker', radioChooser());
    const selectPicker = createComponent('Please choose search query:', 'select-picker', selectChooser());

    wrapper.append(caption, radioPicker, selectPicker);
    appRoot.append(wrapper);
}

function radioChooser() {
    const radioWrapper = document.createElement('div');
    const region = document.createElement('div'),
        language = document.createElement('div');
    const byRegion = document.createElement('input'),
        byLanguage = document.createElement('input');
    const regionLabel = document.createElement('label'),
        languageLabel = document.createElement('label');

    byRegion.type = 'radio', byLanguage.type = 'radio';
    byRegion.name = 'filter', byLanguage.name = 'filter';
    byRegion.id = 'region', byLanguage.id = 'language';
    byRegion.value = 'region', byLanguage.value = 'language';

    regionLabel.textContent = 'By Region';
    languageLabel.textContent = 'By Language';
    regionLabel.classList.add('label');
    languageLabel.classList.add('label')
    regionLabel.setAttribute('for', 'region');
    languageLabel.setAttribute('for', 'language');

    region.append(byRegion, regionLabel);
    language.append(byLanguage, languageLabel);
    radioWrapper.append(region, language)

    return [radioWrapper];
}

function selectChooser() {
    const select = document.createElement('select');
    select.id = 'optionSelector'

    const defaultValue = document.createElement('option');
    defaultValue.textContent = 'Select your option';

    select.append(defaultValue);

    return [select];
}

function generateSelectOptions(options, parent) {
    const select = parent;

    removeChildNodes(select, 1);

    for (let option of options) {
        const row = document.createElement('option');
        row.textContent = option;
        select.append(row);
    }
}

function renderData(option = '', data = []) {
    let wrapper = document.getElementById('data');

    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.id = 'data';
        wrapper.classList.add('main-data-wrapper');
    } else {
        removeChildNodes(wrapper);
    }

    if (option === 'Select your option') {
        const message = document.createElement('p');
        message.textContent = 'No items, please choose search query';
        message.classList.add('message-no-data')
        wrapper.append(message);
        appRoot.append(wrapper);
    } else {
        wrapper.append(generateTable(data));
        arrowFuncHandler();
    }
}

function generateTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const cells = [];
    const cellsNames = ['Country Name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag']
    cellsNames.forEach(el => {
        const cell = document.createElement('th');
        cell.textContent = el;
        if (el === 'Country Name' || el === 'Area') {
            const arrow = document.createElement('span');
            arrow.classList.add('arrow');
            arrow.id = el.split(' ').join('') + 'Sort';
            arrow.textContent = '↕';
            cell.append(arrow);
        }
        cells.push(cell);
    });
    headerRow.append(...cells);
    thead.append(headerRow);

    const tbody = document.createElement('tbody');
    data.forEach(el => {
        const { name, capital, region, languages, area, flagURL } = el;
        const row = document.createElement('tr');
        const img = document.createElement('img');
        img.src = flagURL;
        img.alt = 'flag';
        const cellsData = [name, capital, region, Object.values(languages).join(', '), area, img];
        cellsData.forEach(element => {
            const cell = document.createElement('td');
            cell.append(element);
            row.append(cell);
        })
        tbody.append(row);
    })
    tbody.id = 'data-table';
    table.append(thead, tbody);
    return table;
}

function arrowFuncHandler() {
    const countryArrow = document.getElementById('CountryNameSort');
    const areaArrow = document.getElementById('AreaSort');

    let countFirst = 0;
    let countSecond = 0;
    countryArrow.addEventListener('click', () => {
        areaArrow.textContent = '↕';
        countSecond = 0;
        if (!countFirst) {
            countryArrow.textContent = '↓';
            countFirst++;
            sortBy(countriesComparator);
        } else {
            countryArrow.textContent = '↑';
            countFirst = 0;
            reverseNodes();
        }
    });
    areaArrow.addEventListener('click', () => {
        countryArrow.textContent = '↕';
        countFirst = 0;
        if (!countSecond) {
            areaArrow.textContent = '↓';
            countSecond++;
            sortBy(areaComparator)
        } else {
            areaArrow.textContent = '↑';
            countSecond = 0;
            reverseNodes()
        }
    })
}

function sortBy(compare) {
    const tbody = document.getElementById('data-table');
    const arr = [...tbody.rows];
    arr.sort(compare);
    removeChildNodes(tbody);
    tbody.append(...arr);
}

function countriesComparator(a, b) {
    const SORT_BY_COLUMN = 0,
        MINUS_ONE = -1;
    const first = a.getElementsByTagName('td')[SORT_BY_COLUMN].textContent;
    const second = b.getElementsByTagName('td')[SORT_BY_COLUMN].textContent;
    if (first > second) {
        return MINUS_ONE;
    } else if (first < second) {
        return 1;
    } else {
        return 0;
    }
}

function areaComparator(a, b) {
    const SORT_BY_COLUMN = 4;
    const first = a.getElementsByTagName('td')[SORT_BY_COLUMN].textContent;
    const second = b.getElementsByTagName('td')[SORT_BY_COLUMN].textContent;
    return first - second;
}

function reverseNodes() {
    const tbody = document.getElementById('data-table');
    const arr = [...tbody.rows].reverse();
    removeChildNodes(tbody);
    tbody.append(...arr);
}

function radioFuncHandler(selectData) {
    generateSelectOptions(selectData, optionSelector);
    renderData(optionSelector.value);
}

function removeChildNodes(parent, left = 0) {
    while (parent.children.length > left) {
        parent.removeChild(parent.lastChild);
    }
}

window.addEventListener('load', () => {
    renderHeader();
    regionRadio = document.getElementById('region');
    languageRadio = document.getElementById('language');
    optionSelector = document.getElementById('optionSelector');

    let selectedRadio = '';
    regionRadio.addEventListener('click', (ev) => {
        if (selectedRadio !== 'region') {
            selectedRadio = ev.target.value;
            radioFuncHandler(getRegionsList());
        }
    }, );
    languageRadio.addEventListener('click', (ev) => {
        if (selectedRadio !== 'language') {
            selectedRadio = ev.target.value;
            radioFuncHandler(getLanguagesList());
        }
    });
    optionSelector.addEventListener('change', (ev) => {
        optionSelector.value = ev.target.value;
        if (selectedRadio === 'region') {
            renderData(optionSelector.value, getCountryListByRegion(optionSelector.value));
        } else if (selectedRadio === 'language') {
            renderData(optionSelector.value, getCountryListByLanguage(optionSelector.value))
        }
    })
});