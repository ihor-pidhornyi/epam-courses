class Tweets {
    constructor(tweets) {
        this.tweets = tweets;
    }

    setTweets(tweetsToSet) {
        this.tweets = tweetsToSet;
    }
    getTweets() {
        return this.tweets;
    }
    getTweetsNames() {
        return this.tweets.map(el => el.name);
    }
    addTweet(tweet) {
        this.tweets.push(tweet);
    }
    editTweet(name, id) {
        console.log(this.tweets);
        this.tweets.forEach(tweet => {
            if (tweet.id === id) {
                tweet.name = name;
                console.log(name, tweet.name);
            }
        })
        console.log(this.tweets);
    }
    removeTweet(id) {
        this.tweets = [...this.tweets.filter(el => el.id !== id).map((el, i) => {
            el.id = i + 1;
            return el;
        })];
    }
    likeTweet(id) {
        this.tweets.forEach(tweet => {
            if (tweet.id === id) {
                tweet.isLiked = !tweet.isLiked;
                if (tweet.isLiked) {
                    successAlert(`Hooray! You liked tweet with id ${id}!`);
                } else {
                    successAlert(`Sorry you no longer like tweet with id ${id}`);
                }
            }
        })
    }
    getLikedTweets() {
        return this.tweets.filter(el => el.isLiked);
    }
    getMaxId() {
        return this.tweets.length;
    }
    getTweetById(id) {
        return this.tweets.filter(el => el.id === id)[0] || null;
    }
}

const root = document.getElementById('root'),
    alertMessage = document.getElementById('alertMessage'),
    tweetItems = document.getElementById('tweetItems'),
    navigationButtons = document.getElementById('navigationButtons'),
    list = document.getElementById('list'),
    modifyItem = document.getElementById('modifyItem'),
    cancelModification = document.getElementById('cancelModification'),
    saveModifiedItem = document.getElementById('saveModifiedItem'),
    modifyItemHeader = document.getElementById('modifyItemHeader'),
    modifyItemInput = document.getElementById('modifyItemInput');

const tweets = new Tweets();

function virtualDOM(tweets, callback) {
    function updateLocalStorage(tweets) {
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }

    function goToLiked(tweets) {
        const likedTweets = tweets.getLikedTweets();

        let likedBtn = document.getElementById('likedTweets');
        if (!likedTweets.length) {
            if (likedBtn) {
                navigationButtons.removeChild(likedBtn);
            }
            mainPage();
            return;
        }
        if (!likedBtn) {
            likedBtn = document.createElement('button');
            likedBtn.textContent = 'Go to liked';
            likedBtn.id = 'likedTweets';
            likedBtn.classList.add('goToLikedTweets');
            likedBtn.onclick = mainToLiked;
            navigationButtons.append(likedBtn);
        }
    }
    return function (...args) {
        callback(...args);
        renderTweets();
        updateLocalStorage(tweets.getTweets());
        goToLiked(tweets);
    }
}

function renderTweets() {
    let tweetsToRender;
    if (location.hash.includes('/liked')) {
        tweetsToRender = tweets.getLikedTweets();
    } else {
        tweetsToRender = tweets.getTweets();
    }
    list.innerHTML = '';
    tweetsToRender.forEach(el => {
        const likeText = el.isLiked ? 'liked' : 'unliked';
        const li = document.createElement('li');
        li.insertAdjacentHTML('afterbegin', `
        <p class="tweet" id="${el.id}" onclick="editTweetPage(${el.id})">${el.name}</p>
        <div class="controlButtons">
            <button class="removeButton" onclick="removeTweet(${el.id})">×</button>
            <button class="likeButton ${likeText}" onclick="likeTweet(${el.id})">❤</button>
        </div>
    `)
        list.append(li);
    });
}

function alertNotification(className) {
    const DELAY = 2000;
    const ACTION_DELAY = 50;
    return function(msg) {
       
        const errorBlock = document.createElement('div'),
            line = document.createElement('div');
        line.classList.add('line');
        errorBlock.classList.add(className);
        errorBlock.textContent = msg
        errorBlock.append(line);
        alertMessage.insertAdjacentElement('beforeend', errorBlock)
        alertMessage.classList.remove('hidden');
        setTimeout(() => {
            line.style.transform = 'translateX(-100%)'
        }, ACTION_DELAY);
        setTimeout(() => {
            alertMessage.removeChild(errorBlock);
            if (alertMessage.children.length === 1) {
                alertMessage.classList.add('hidden');
            }
        }, DELAY);
    }
}

const errorAlert = alertNotification('error-message');
const successAlert = alertNotification('info-message');

const removeTweet = virtualDOM(tweets, id => tweets.removeTweet(id));
const likeTweet = virtualDOM(tweets, id => tweets.likeTweet(id));
const editTweet = virtualDOM(tweets, (name, id) => tweets.editTweet(name, id));
const addTweet = virtualDOM(tweets, tweet => tweets.addTweet(tweet));
const setTweets = virtualDOM(tweets, tweetsToSet => tweets.setTweets(tweetsToSet));

function mainPage() {
    const likedBtn = navigationButtons.children[1];
    if (likedBtn) {
        likedBtn.textContent = 'Go to liked';
    }
    const caption = tweetItems.getElementsByTagName('h1')[0];
    caption.textContent = 'Simple Twitter';
    location.hash = '';
    modifyItemInput.value = '';
    tweetItems.classList.remove('hidden');
    modifyItem.classList.add('hidden');
    navigationButtons.children[0].classList.remove('hidden');
}

function addTweetPage() {
    modifyItemHeader.textContent = 'Add tweet';
    tweetItems.classList.add('hidden');
    modifyItem.classList.remove('hidden');
}

function editTweetPage(id) {
    location.hash = `/editTweet/${id}`;
    modifyItemHeader.textContent = 'Edit tweet';
    modifyItemInput.value = tweets.getTweetById(id).name;
    tweetItems.classList.add('hidden');
    modifyItem.classList.remove('hidden');
}

function likedTweetsPage() {
    const caption = tweetItems.getElementsByTagName('h1')[0],
        likedBtn = navigationButtons.children[1];
    caption.textContent = 'Liked Tweets';
    likedBtn.textContent = 'Back';
    navigationButtons.children[0].classList.add('hidden');
}

function mainToLiked() {
    location.hash = '/liked';

}

function likedToMain() {
    location.hash = '';
    mainPage();
}

function saveAfterAdding() {
    const MAX_LENGTH = 140;
    const tweet = {
        name: modifyItemInput.value,
        id: tweets.getMaxId() + 1,
        isLiked: false
    };
    if (tweets.getTweetsNames().includes(tweet.name)) {
        errorAlert('Error! You can\'t tweet about that');
        return;
    } else if(!tweet.name) {
        errorAlert('Error! You shoud write a tweet!');
        return;
    } else if(tweet.name.length > MAX_LENGTH) {
        errorAlert('Error! Exceeded tweet length!');
        return;
    }
    addTweet(tweet);
    location.hash = '';
}

function saveAfterEdit() {
    const MAX_LENGTH = 140;
    const id = Number(location.hash.match(/\d+/g)[0]);
    if (tweets.getTweetsNames().includes(modifyItemInput.value) &&
        modifyItemInput.value !== tweets.getTweetById(id).name) {
        errorAlert('Error! You can\'t tweet about that');
        return;
    } else if(!modifyItemInput.value) {
        errorAlert('Error! You shoud write a tweet!');
        return;
    } else if(modifyItemInput.value.length > MAX_LENGTH) {
        errorAlert('Error! Exceeded tweet length!');
        return;
    }
    editTweet(modifyItemInput.value, id);
    location.hash = '';
}

window.addEventListener('load', () => {
    location.hash = '';
    const tweetsFromLs = JSON.parse(localStorage.getItem('tweets')) || [];
    setTweets(tweetsFromLs);
});

window.addEventListener('hashchange', () => {
    const likedBtn = navigationButtons.children[1];
    if (location.hash.includes('#/add')) {
        saveModifiedItem.onclick = saveAfterAdding;
        addTweetPage();
    } else if (location.hash.includes('#/editTweet/')) {
        saveModifiedItem.onclick = saveAfterEdit;
    } else if (location.hash.includes('#/liked')) {
        likedTweetsPage();
        likedBtn.onclick = likedToMain;
        renderTweets();
    } else {
        if (likedBtn) {
            likedBtn.onclick = mainToLiked;
        }
        renderTweets();
        mainPage();
    }
});

navigationButtons.children[0].addEventListener('click', () => {
    location.hash = '/add';
});

cancelModification.addEventListener('click', () => {
    location.hash = '';
});