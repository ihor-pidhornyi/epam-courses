class BirthdayService {

    howLongToMyBirthday(date) {
        const DELAY = 100;
        const MILLISECONDS_IN_DAY = 86400000;
        const currentDate = new Date();

        return new Promise((res, rej) => {
            setTimeout(() => {
                if (!(date instanceof Date || typeof date === 'number') || Number.isNaN(date)) {
                    rej('Wrong argument!');
                }

                const givenDate = new Date(date);

                const time = currentDate - givenDate > 0 ?
                    Math.floor((currentDate - givenDate) / MILLISECONDS_IN_DAY) :
                    Math.ceil((currentDate - givenDate) / MILLISECONDS_IN_DAY);

                res(this.notifyWaitingTime(time));
            }, DELAY);
        })
    }

    congratulateWithBirthday() {
        return 'Hooray!!! It is today!';
    }

    notifyWaitingTime(time) {
        if (time === 0) {
            return this.congratulateWithBirthday();
        }
        if (time > 0) {
            return `Oh, you have celebrated it ${time} day/s ago, don't you remember?`;
        }
        return `Soon...Please, wait just ${Math.abs(time)} day/days`;
    }
}

module.exports = BirthdayService;