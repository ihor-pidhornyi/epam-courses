const root = document.getElementById('root');
const allEmployees = document.getElementById('allEmployees');
const allUnits = document.getElementById('allUnits');
const warningEmployees = document.getElementById('warningEmployees');
class Strategy {
    execute() {
        throw new Error('Needs to be overriden');
    }
}
class HeadStrategy extends Strategy {
    execute() {
        return true;
    }
}
class DefaultStrategy extends Strategy {
    execute() {
        return false;
    }
}

class Employee {
    constructor(strategy, data) {
        this.parent = null;
        this.strategy = strategy;
        if (strategy.execute()) {
            this.pool_name = data.pool_name;
            this.children = [];
        }
        this.id = data.id;
        this.name = data.name;
        this.performance = data.performance;
        this.salary = data.salary;
        this.lastVacationDate = data.last_vacation_date;
    }
    setParent(parent) {
        this.parent = parent;
    }
    getParent() {
        return this.parent;
    }
    isComposite() {
        return this.strategy.execute();
    }
}

const state = {
    unitsState: new Set(),
    topRM: null,
    allWorkersData: [],
    warningEmployeesState: [],
    numbersAfterComma: 2
}
const performanceMatcher = {
    'low': 1,
    'average': 2,
    'top': 3
}
function getPerformanceByPool(pool) {
    const points = pool.sumPerformancePoints / pool.workers;
    if(points <= performanceMatcher['low']) {
        return 'low';
    }
    if(points < performanceMatcher['average']) {
        return 'average';
    }
    if(points <= performanceMatcher['top']) {
        return 'top';
    }
}

function generateTreeStructure(parent, children) {
    for (const child of children) {
        let childInstance;

        if ('pool_name' in child) {
            childInstance = new Employee(new HeadStrategy(), child);
        } else {
            childInstance = new Employee(new DefaultStrategy(), child);
        }

        if (parent) {
            childInstance.setParent(parent);
            parent.children.push(childInstance);
        }
        if (childInstance.isComposite()) {
            generateTreeStructure(childInstance, state.allWorkersData.filter(el => el.rm_id === childInstance.id));
        }
        if (child.id === 1) {
            state.topRM = childInstance;
        }
    }
}

function renderAllEmployees(parent, parentContainer) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('afterbegin', `
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Performance</td>
            <td>Last Vacation Date</td>
            <td>Salary</td>
        </tr>
    `);
    table.append(thead);
    const tbody = document.createElement('tbody');
    const rowParent = document.createElement('tr');
    rowParent.insertAdjacentHTML('afterbegin', `
                <td>${parent.id}</td>
                <td>${parent.name}</td>
                <td>${parent.performance}</td>
                <td>${parent.lastVacationDate ? parent.lastVacationDate : '—'}</td>
                <td>${parent.salary}</td>
            `)
    tbody.append(rowParent);
    if (parent.isComposite()) {
        rowParent.classList.add('worker_resource-manager');
        parent.children.forEach(child => {
            if (child.isComposite()) {
                const container = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 5;
                container.append(cell);
                renderAllEmployees(child, cell);
                tbody.append(container);
            } else {
                const row = document.createElement('tr');
                row.insertAdjacentHTML('afterbegin', `
                    <td>${child.id}</td>
                    <td>${child.name}</td>
                    <td>${child.performance}</td>
                    <td>${child.lastVacationDate ? child.lastVacationDate : '—'}</td>
                    <td>${child.salary}</td>
                `)
                tbody.append(row);
            }
        })

    }
    table.append(tbody);
    if (parentContainer) {
        parentContainer.append(table);
    } else {
        root.append(table);
    }
}

function setUnit(parent, container, data = {
    pool_name: parent.pool_name,
    sumSalary: parent.salary,
    workers: 1,
    sumPerformancePoints: 0
}) {
    if (parent.isComposite()) {
        parent.children.forEach(child => {
            data.sumSalary += child.salary;
            data.workers++;
            data.sumPerformancePoints += performanceMatcher[child.performance];
            if (child.isComposite()) {
                setUnit(child, container, data);
            }
        })
        container.add(data)
    }
}

function generateAllUnits(parent, units = state.unitsState) {
    setUnit(parent, units);
    if (parent.isComposite()) {
        parent.children.forEach(child => {
            generateAllUnits(child, units)
        })
    }
}

function renderUnits(units) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('afterbegin', `
        <tr>
            <th>Pool name</th>
            <th>Average Salary</th>
            <th>Average Performance</th>
        </tr>
    `)
    const tbody = document.createElement('tbody');
    units.forEach(unit => {
        const pool = document.createElement('tr');
        const averageSalary = (unit.sumSalary / unit.workers).toFixed(state.numbersAfterComma);
        const averagePerformance = getPerformanceByPool(unit);
        pool.insertAdjacentHTML('afterbegin', `
            <td>${unit.pool_name}</td>
            <td>${averageSalary}</td>
            <td>${averagePerformance}</td>
        `);
        tbody.append(pool);
    })
    table.append(thead, tbody)
    root.append(table);
}

function getAverageSalaryByPool(name) {
    const pool = [...state.unitsState].find(unit => unit.pool_name === name);
    return pool ? pool.sumSalary / pool.workers : 0;
}

function generateWarningEmployees(parent) {
    if (parent.performance === 'low' && parent.salary > getAverageSalaryByPool(parent.pool_name)) {
        state.warningEmployeesState.push(parent)
    }
    if (parent.isComposite()) {
        parent.children.forEach(child => {
            if (child.isComposite()) {
                generateWarningEmployees(child);
            } else if (child.performance === 'low' && child.salary > getAverageSalaryByPool(parent.pool_name)) {
                state.warningEmployeesState.push(child);
            }
        })
    }
}

function renderWarningEmployees(employees) {
    const list = document.createElement('ul');
    list.classList.add('warning-employees');
    employees.forEach(employee => {
        const element = document.createElement('li');
        element.textContent = `${employee.name}, salary: ${employee.salary}, performance: ${employee.performance}`;
        element.classList.add('warning');
        list.append(element);
    })
    root.append(list)
}


fetch('mock.json')
    .then(res => res.json())
    .then(data => {
        state.allWorkersData = data;
        generateTreeStructure(null, data);
        generateAllUnits(state.topRM);
        generateWarningEmployees(state.topRM);
    })

function removeChildren() {
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
}
allEmployees.addEventListener('click', () => {
    removeChildren();
    renderAllEmployees(state.topRM);
})
allUnits.addEventListener('click', () => {
    removeChildren();
    renderUnits(state.unitsState);
})
warningEmployees.addEventListener('click', () => {
    removeChildren();
    renderWarningEmployees(state.warningEmployeesState)
})