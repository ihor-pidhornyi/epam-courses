const maxElement = (array) => {
    return Math.max(...array);
}

const copyArray = (array) => {
    return [...array];
}

const addUniqueId = (obj) => {
    const copied = Object.assign({}, obj);
    copied.id = Symbol('uniqueId');
    return copied;
}

const regroupObject = (obj) => {
    const { name, details: { id, age, university } } = obj;
    return {
        university,
        user: {
            age,
            firstName: name,
            id
        }
    }
}

const findUniqueElements = (array) => {
    const set = new Set(array);
    return [...set];
}

const hideNumber = (phoneNumber) => {
    const VISIBLE_NUMBERS = 4;
    const endNumbers = phoneNumber.slice(phoneNumber.length - VISIBLE_NUMBERS, phoneNumber.length);
    return endNumbers.padStart(phoneNumber.length, '*');
}

const required = () => {
    throw new Error('Missing property')
}
const add = (a = required(), b = required()) => {
    return a + b;
}

const logUsersWithPromise = () => {
    const response = new Promise((resolve) => {
        fetch('https://jsonplaceholder.typicode.com/users?_sort=name&_order=asc')
            .then(res => {
                resolve(res.json());
            });
    })
    response.then(users => {
        const userNames = users.map(el => el.name);
        console.log(userNames);
    })
}

const logUsersWithAsyncAwait = async function () {
    const request = await fetch('https://jsonplaceholder.typicode.com/users?_sort=name&_order=asc');
    const response = await request.json();
    const users = await response;
    const userNames = users.map(el => el.name);
    console.log(userNames);
}