const BirthdayService = require('../src/birthday.service.js');

describe('Birthday service', () => {
    const MILLISECONDS_IN_DAY = 86400000;
    let birthdayService;

    beforeEach(() => {
        birthdayService = new BirthdayService();
    })

    it('shoud be rejected', (done) => {
        const promise = birthdayService.howLongToMyBirthday();

        promise.catch(err => {
            expect(err).toBe('Wrong argument!');
            done();
        })
    })

    it('should be resolved with today\'s birthday', (done) => {
        const promise = birthdayService.howLongToMyBirthday(Date.now());

        promise.then(msg => {
            expect(msg).toBe('Hooray!!! It is today!');
            done();
        });
    })

    it('should be resolved with past birthday', (done) => {
        const DAYS = 10;
        const date = Date.now() - DAYS * MILLISECONDS_IN_DAY;
        const promise = birthdayService.howLongToMyBirthday(date);

        promise.then(msg => {
            expect(msg).toBe(`Oh, you have celebrated it ${DAYS} day/s ago, don't you remember?`);
            done();
        })
    })

    it('should be resolved with future birthday', (done) => {
        const DAYS = 10;
        const date = Date.now() + DAYS * MILLISECONDS_IN_DAY;
        const promise = birthdayService.howLongToMyBirthday(date);

        promise.then(msg => {
            expect(msg).toBe(`Soon...Please, wait just ${DAYS} day/days`);
            done();
        })
    })

    it('should be called notifyWaitingTime and return today birthday', async () => {
        spyOn(birthdayService, 'notifyWaitingTime').and.returnValue(birthdayService.congratulateWithBirthday());

        const result = await birthdayService.howLongToMyBirthday(Date.now());

        expect(birthdayService.notifyWaitingTime).toHaveBeenCalledWith(0);
        expect(result).toBe('Hooray!!! It is today!');
    })

    it('should be called notifyWaitingTime and future today birthday', async () => {
        const DAYS = 1;
        spyOn(birthdayService, 'notifyWaitingTime').and.returnValue(`Soon...Please, wait just ${DAYS} day/days`);

        const result = await birthdayService.howLongToMyBirthday(Date.now() + DAYS * MILLISECONDS_IN_DAY);

        expect(birthdayService.notifyWaitingTime).toHaveBeenCalledWith(-DAYS);
        expect(result).toBe(`Soon...Please, wait just ${DAYS} day/days`);
    })

    it('should be called notifyWaitingTime and past today birthday', async () => {
        const DAYS = 4;
        spyOn(birthdayService, 'notifyWaitingTime').and
            .returnValue(`Oh, you have celebrated it ${DAYS} day/s ago, don't you remember?`);

        const result = await birthdayService.howLongToMyBirthday(Date.now() - DAYS * MILLISECONDS_IN_DAY);

        expect(birthdayService.notifyWaitingTime).toHaveBeenCalledWith(DAYS);
        expect(result).toBe(`Oh, you have celebrated it ${DAYS} day/s ago, don't you remember?`);
    })

})