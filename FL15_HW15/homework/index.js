/* START TASK 1: Your code goes here */
function task1() {
    const table = document.getElementById('table');
    const [yellow, blue, green] = ['row__cell_yellow', 'row__cell_blue', 'row__cell_green']
    table.addEventListener('click', ev => {
        const cell = ev.target;
        if (!cell.cellIndex) {
            const cells = [...cell.parentNode.children];
            const classes = cells.map(el => el.className).join('');
            if (!classes.includes(yellow)) {
                cells.forEach(el => el.classList.add(blue));
            }
        } else if (cell.textContent === 'Special Cell') {
            const parent = cell.parentNode;
            [...parent.parentNode.children].forEach(row => {
                [...row.children].forEach(cellEl => {
                    if (cellEl.classList.length === 1) {
                        cellEl.classList.add(green);
                    }
                })
            })
        } else {
            cell.classList.add(yellow);
        }
    })
}
task1();
/* END TASK 1 */

/* START TASK 2: Your code goes here */
function task2() {
    const PHONE_REGEX = new RegExp(/^(\+380)\d{9}/);
    const input = document.getElementById('phone');
    const button = document.getElementById('phoneSubmit');
    const message = document.getElementById('message');

    const INVALID_MESSAGE = 'Type number does not follow format +380*********';
    const SUCCESSFUL_MESSAGE = 'Data was successfully sent'

    input.addEventListener('input', ev => {
        message.classList.remove('message_success');
        const value = ev.target.value;
        if (!PHONE_REGEX.test(value)) {
            ev.target.classList.add('form__input_invalid');
            message.classList.add('message_invalid');
            message.textContent = INVALID_MESSAGE;
            button.setAttribute('disabled', true)
        } else {
            ev.target.classList.remove('form__input_invalid');
            message.classList.remove('message_invalid');
            message.innerHTML = '';
            button.removeAttribute('disabled')
        }
    });

    button.addEventListener('click', ev => {
        ev.preventDefault();
        message.textContent = SUCCESSFUL_MESSAGE;
        message.classList.add('message_success');
    })
}
task2();
/* END TASK 2 */

/* START TASK 3: Your code goes here */
function task3() {
    const HALF_BALL_SIZE = 20,
        START_X = 280,
        START_Y = 145,
        MAX_WIDTH = 600,
        MAX_HEIGHT = 330,
        GOAL_IN_A = {
            x: 45,
            y: 164
        },
        GOAL_IN_B = {
            x: 555,
            y: 164
        },
        DIVIDE_BY = 2;

    function moveTo(x, y) {
        const left = x > HALF_BALL_SIZE,
            right = x < MAX_WIDTH - HALF_BALL_SIZE,
            top = y > HALF_BALL_SIZE,
            bottom = y < MAX_HEIGHT - HALF_BALL_SIZE;

        let prevX = parseFloat(ball.style.left);
        let prevY = parseFloat(ball.style.top);
        if (left && right && top && bottom) {
            const transformProp = `translate3d(${x - prevX - HALF_BALL_SIZE}px, ${y - prevY - HALF_BALL_SIZE}px, 0)`;
            ball.style.transform = transformProp;
        } else {
            let transformX = x - prevX - HALF_BALL_SIZE,
                transformY = y - prevY - HALF_BALL_SIZE
            if (!left) {
                transformX = -MAX_WIDTH / DIVIDE_BY + HALF_BALL_SIZE;
            }
            if (!right) {
                transformX = MAX_WIDTH / DIVIDE_BY - HALF_BALL_SIZE;
            }
            if (!top) {
                transformY = -MAX_HEIGHT / DIVIDE_BY + HALF_BALL_SIZE;
            }
            if (!bottom) {
                transformY = MAX_HEIGHT / DIVIDE_BY - HALF_BALL_SIZE;
            }
            ball.style.transform = `translate3d(${transformX}px, ${transformY}px, 0)`;
        }
    }

    function goal(coords, notificationText, notificationClass) {
        const GOAL_DELAY = 400;
        const NOTIFICATION_DELAY = 3000;
        moveTo(coords.x, coords.y);
        setTimeout(() => {
            clearTimeout(timeout);
            goalNotification.className = 'game__goal-message';
            goalNotification.textContent = '';
            goalNotification.textContent = notificationText;
            goalNotification.classList.add(notificationClass);
            timeout = setTimeout(() => {
                goalNotification.textContent = '';
            }, NOTIFICATION_DELAY);
        }, GOAL_DELAY)
    }
    let timeout;
    const field = document.getElementById('field'),
        ball = document.getElementById('ball'),
        scoreTeamA = document.getElementById('scoreTeamA'),
        scoreTeamB = document.getElementById('scoreTeamB'),
        goalNotification = document.getElementById('goalNotification');
    const hoopA = document.querySelector('.game__hoop_team-a'),
        hoopB = document.querySelector('.game__hoop_team-b');

    const score = new Event('goal');

    ball.style.left = START_X + 'px';
    ball.style.top = START_Y + 'px';

    hoopA.addEventListener('goal', () => {
        goal(GOAL_IN_A, 'Team B score!', 'game__goal-message_red')
    })

    hoopB.addEventListener('goal', () => {
        goal(GOAL_IN_B, 'Team A score!', 'game__goal-message_blue');
    })
    field.addEventListener('click', ev => {
        if (ev.target !== ball && ev.target !== hoopA && ev.target !== hoopB) {
            console.log(ev.offsetX, ev.offsetY);
            moveTo(ev.offsetX, ev.offsetY);
        }
        if (ev.target === hoopA) {
            hoopA.dispatchEvent(score);
            scoreTeamB.textContent = parseInt(scoreTeamB.textContent) + 1;
        } else if (ev.target === hoopB) {
            hoopB.dispatchEvent(score);
            scoreTeamA.textContent = parseInt(scoreTeamA.textContent) + 1;
        }
    })
}
task3();
/* END TASK 3 */