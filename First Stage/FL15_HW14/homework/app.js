const appRoot = document.getElementById('app-root');
const { getCountryListByRegion, getCountryListByLanguage, getRegionsList, getLanguagesList } = externalService;

function renderHeader() {
    appRoot.insertAdjacentHTML('afterbegin', `
        <header>
            <h1 class="title">Countries search</h1>
            <form>
                <div class="radio-picker">
                    <p>Please choose type of search:</p>
                    <div>
                        <div>
                            <label class="label" for="region">
                                <input type="radio" name="filter" id="region" value="region">
                                By Region
                            </label>
                        </div>
                        <div>
                            <label class="label" for="language">
                                <input type="radio" name="filter" id="language" value="language">
                                By Language
                            </label>
                        </div>
                    </div>
                </div>
                <div class="select-picker">
                    <p>Please choose search query:</p>
                    <select id="optionSelector" disabled>
                        <option>Select your option</option>
                    </select>
                </div>
            </form>
        </header>
    `);
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
    thead.insertAdjacentHTML('afterbegin', `
        <tr>
            <th>Country Name<span class="arrow" id="CountryNameSort">↕</span></th>
            <th>Capital</th>
            <th>World Region</th>
            <th>Languages</th>
            <th>Area<span class="arrow" id="AreaSort">↕</span></th>
            <th>Flag</th>
        </tr>
    `);

    const tbody = document.createElement('tbody');
    data.forEach(el => {
        const {
            name,
            capital,
            region,
            languages,
            area,
            flagURL
        } = el;
        tbody.insertAdjacentHTML('afterbegin', `
            <tr>
                <td>${name}</td>
                <td>${capital}</td>
                <td>${region}</td>
                <td>${Object.values(languages).join(', ')}</td>
                <td>${area}</td>
                <td>
                    <img src="${flagURL}" alt="country flag">
                </td>
            </tr>
        `)
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
            countryArrow.textContent = '↑';
            countFirst++;
            sortBy(countriesComparator);
        } else {
            countryArrow.textContent = '↓';
            countFirst = 0;
            reverseNodes();
        }
    });
    areaArrow.addEventListener('click', () => {
        countryArrow.textContent = '↕';
        countFirst = 0;
        if (!countSecond) {
            areaArrow.textContent = '↑';
            countSecond++;
            sortBy(areaComparator)
        } else {
            areaArrow.textContent = '↓';
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

function radioFuncHandler(selectData, select) {
    generateSelectOptions(selectData, select);
    renderData(select.value);
}

function removeChildNodes(parent, left = 0) {
    while (parent.children.length > left) {
        parent.removeChild(parent.lastChild);
    }
}

window.addEventListener('load', () => {
    renderHeader();
    const regionRadio = document.getElementById('region'),
        languageRadio = document.getElementById('language'),
        optionSelector = document.getElementById('optionSelector');

    let selectedRadio = '';
    regionRadio.addEventListener('click', (ev) => {
        if (selectedRadio !== 'region') {
            selectedRadio = ev.target.value;
            radioFuncHandler(getRegionsList(), optionSelector);
            optionSelector.removeAttribute('disabled');
        }
    }, );
    languageRadio.addEventListener('click', (ev) => {
        if (selectedRadio !== 'language') {
            selectedRadio = ev.target.value;
            radioFuncHandler(getLanguagesList(), optionSelector);
            optionSelector.removeAttribute('disabled');
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