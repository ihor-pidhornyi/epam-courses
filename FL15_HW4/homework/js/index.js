class Deck {

    static createDeck() {
        const deck = new Deck();
        deck.shuffle();
        return deck;
    }

    static getSuits() {
        return ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    }

    static getFaceRanks() {
        return {
            1: 'Ace',
            11: 'Jack',
            12: 'Queen',
            13: 'King'
        }
    }

    constructor() {
        const MAX_RANK = 13;
        const cards = [];
        for (let suit of Deck.getSuits()) {
            for (let i = 0; i < MAX_RANK; i++) {
                cards.push(new Card(suit, i + 1));
            }
        }
        this.cards = cards;
        Object.defineProperties(this, {
            'count': {
                get: () => this.cards.length
            }
        })
    }

    shuffle() {
        for (let i = 0; i < this.count; i++) {
            const randIndex = Math.floor(Math.random() * this.count);
            this.cards[randIndex] = this.cards[i];
            this.cards[i] = this.cards[randIndex];
        }
    }

    draw(n) {
        const picked = [];
        for (let i = 0; i < n; i++) {
            picked.unshift(this.cards.pop());
        }
        return picked;
    }
}

class Card {

    static compare(cardOne, cardTwo) {
        return cardOne.rank - cardTwo.rank;
    }

    constructor(suit, rank) {
        Object.defineProperties(this, {
            'suit': {
                value: suit,
                writable: false
            },
            'rank': {
                value: rank,
                writable: false
            },
            'isFaceCard': {
                value: rank in Deck.getFaceRanks(),
                writable: false
            }
        })
    }
    toString() {
        return this.isFaceCard ? `${Deck.getFaceRanks()[this.rank]} of ${this.suit}` : `${this.rank} of ${this.suit}`;
    }
}
class Player {

    static play(playerOne, playerTwo) {
        playerOne.deck = Deck.createDeck();
        playerTwo.deck = Deck.createDeck();
        const deck = playerOne.deck;

        while (deck.count !== 0) {
            const cardOne = playerOne.deck.draw(1),
                cardTwo = playerTwo.deck.draw(1);
            if (Card.compare(cardOne[cardOne.length - 1], cardTwo[cardTwo.length - 1]) > 0) {
                playerOne.wins++
            } else if (Card.compare(cardOne[cardOne.length - 1], cardTwo[cardTwo.length - 1]) < 0) {
                playerTwo.wins++
            }
        }

        const pointsFirst = playerOne.wins,
            pointsSecond = playerTwo.wins;
        playerOne.wins = 0;
        playerTwo.wins = 0;
        if (pointsFirst > pointsSecond) {
            return `${playerOne.name} wins ${pointsFirst} to ${pointsSecond}`;
        } else if (pointsFirst < pointsSecond) {
            return `${playerTwo.name} wins ${pointsSecond} to ${pointsFirst}`;
        } else {
            return `It's a draw! ${pointsSecond} : ${pointsFirst}`;
        }
    }

    constructor(name) {
        Object.defineProperties(this, {
            'name': {
                value: name,
                writable: false
            },
            'deck': {
                value: [],
                writable: true
            },
            'wins': {
                value: 0,
                writable: true
            }
        })
    }
}

class Employee {
    constructor(obj) {
        const {
            id,
            firstName,
            lastName,
            birthday,
            salary,
            position,
            department
        } = obj;
        Object.defineProperties(this, {
            'id': {
                value: id
            },
            'firstName': {
                value: firstName
            },
            'lastName': {
                value: lastName
            },
            'birthday': {
                value: birthday
            },
            'salary': {
                value: salary,
                enumerable: true,
                writable: true
            },
            'position': {
                value: position,
                enumerable: true,
                writable: true
            },
            'department': {
                value: department,
                enumerable: true,
                writable: true
            },
            'age': {
                get: () => new Date(Date.now() - this.birthday).getFullYear() - new Date(0).getFullYear()
            },
            'fullName': {
                get: () => `${this.firstName} ${this.lastName}`
            }
        });
        Employee.EMPLOYEES.push(this);
    }

    quit() {
        Employee.EMPLOYEES.splice(Employee.EMPLOYEES.indexOf(this), 1);
    }

    retire() {
        this.quit();
        return 'It was such a pleasure to work with you!';
    }

    getFired() {
        this.quit();
        return 'Not a big deal!';
    }
    changeDepartment(newDepartment) {
        this.department = newDepartment;
    }
    changePosition(newPosition) {
        this.position = newPosition;
    }
    changeSalary(newSalary) {
        this.salary = newSalary;
    }
    getPromoted(benefits) {
        for (let key in benefits) {
            if (key === 'salary' || key === 'position' || key === 'department') {
                this[key] = benefits[key];
            }
        }
        return 'Yoohooo!';
    }

    getDemoted(punishment) {
        for (let key in punishment) {
            if (key === 'salary' || key === 'position' || key === 'department') {
                this[key] = punishment[key];
            }
        }
        return 'Damn!';
    }
}
Object.defineProperties(Employee.prototype.constructor, {
    'EMPLOYEES': {
        value: [],
        writable: false
    }
})

class Manager extends Employee {
    constructor(obj) {
        super(obj)
        Object.defineProperties(this, {
            'position': {
                value: 'manager'
            },
            'managedEmployees': {
                get: () => Employee.EMPLOYEES.filter(empl => {
                    return empl.position !== this.position && empl.department === this.department
                })
            }
        })
    }
}

class BlueCollarWorker extends Employee {}

class HRManager extends Manager {
    constructor(obj) {
        super(obj)
        this.department = 'hr'
    }
}

class SalesManager extends Manager {
    constructor(obj) {
        super(obj)
        this.department = 'sales'
    }
}

function managerPro(manager) {
    manager.promote = function (employee, obj) {
        if (manager.managedEmployees.includes(employee)) {
            employee.getPromoted(obj)
        }
    }
    manager.demote = function (employee, obj) {
        if (manager.managedEmployees.includes(employee)) {
            employee.getDemoted(obj)
        }
    }
    manager.fire = function (employee) {
        if (manager.managedEmployees.includes(employee)) {
            employee.getFired();
        }
    }
    manager.hire = function (employee) {
        if (!manager.managedEmployees.includes(employee)) {
            employee.changeDepartment(manager.department);
        }
    }
}