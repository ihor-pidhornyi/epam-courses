let users;
const table = document.getElementById('root'),
    spinner = document.getElementById('spinner'),
    postsWrapper = document.getElementById('posts');
const baseUrl = 'https://jsonplaceholder.typicode.com';

const getUserById = (id) => {
    if (users) {
        return users.find(el => el.id === id);
    }
}

const loadingStarted = () => {
    table.style.display = 'none';
    spinner.style.display = 'block';
}

const loadingCompleted = () => {
    table.style.display = 'table';
    spinner.style.display = 'none';
}

const getCommentsByPostId = (postId) => {
    return fetch(`${baseUrl}/comments?postId=${postId}`);
}

const getPostsByUser = (id, start = 0, limit = '2') => {
    return fetch(`${baseUrl}/users/${id}/posts?_start=${start}&_limit=${limit}?userId=${id}`)
}

function* gettingPostsByPortions(id, start, limit, increment, maxPosts) {
    const MAX_POSTS = maxPosts;
    const INCREMENT = increment;
    while (start < MAX_POSTS) {
        yield getPostsByUser(id, start, limit)
        start += INCREMENT;
    }
}

const getUsers = (limit = '') => {
    return fetch(`${baseUrl}/users${limit}`)
}

const putUser = (data) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    return fetch(`${baseUrl}/users/${data.id}`, options);
}

const deleteUser = (id) => {
    return fetch(`${baseUrl}/users/${id}`, {
        method: 'DELETE'
    })
}

const onEditHandler = (id) => {
    const row = document.getElementById(id);
    const editControlBtn = row.getElementsByClassName('edit')[0];

    if (row.dataset.editable === 'no') {
        const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        const editBtns = [...rows].map(row => row.getElementsByClassName('edit')[0]);

        editBtns.forEach(el => {
            el.textContent = 'Edit'
        });

        [...rows].forEach(row => {
            row.dataset.editable = 'no';
            [...row.children].forEach(child => {
                const input = child.getElementsByTagName('input')[0];
                if (input) {
                    input.setAttribute('disabled', true)
                }
            })
        })

        editControlBtn.textContent = 'Save';
        [...row.children].forEach(child => {
            const input = child.getElementsByTagName('input')[0];
            if (input && input.dataset.key !== 'id') {
                input.removeAttribute('disabled')
            }
        })

        row.dataset.editable = 'yes'
    } else if (row.dataset.editable === 'yes') {
        editControlBtn.textContent = 'Edit';
        const data = getUserById(id);

        [...row.children].forEach(child => {
            const input = child.getElementsByTagName('input')[0];
            if (input) {
                input.setAttribute('disabled', true)
                data[input.dataset.key] = input.value;
            }
        })
        data.id = Number(data.id)

        loadingStarted();
        putUser(data)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                document.writeln('Something went wrong...');
            })
            .then((resultUser) => {
                const tempData = users.map(el => {
                    if (el.id === resultUser.id) {
                        return resultUser
                    }
                    return el;
                })
                renderList(tempData)
                loadingCompleted()
            })
    }
}

const onDeleteHandler = (id) => {
    loadingStarted()
    deleteUser(id)
        .then(res => {
            if (res.ok) {

                return res.json()
            }
            document.writeln('We weren\'nt able to delete this element..');
        })
        .then(() => {
            loadingCompleted();
        })
    users = users.filter(user => user.id !== id)
    renderList(users)
}

const renderPost = (post, comments) => {
    const template = document.createElement('article');
    template.insertAdjacentHTML('beforeend', `
            <hr>
            <h2>Post title: ${post.title}</h2>
            <p>Post text: ${post.body}</p>
        `)
    postsWrapper.append(template);
    renderComments(comments)
}

const renderComments = (comments) => {
    const caption = document.createElement('h2');
    caption.textContent = 'Comments';
    postsWrapper.append(caption);
    for (let comment of comments) {
        const template = document.createElement('article');
        template.insertAdjacentHTML('beforeend', `
            <h3>Comentator: ${comment.name}<small>(${comment.email})</small></h3>
            <p>Comment text: ${comment.body}</p>
        `)
        postsWrapper.append(template);
    }
}

const redirect = (id, userName) => {
    function onGettingPostsHandler() {
        loadingStarted();
        const posts = getPosts.next().value;
        if (posts) {
            posts.then(response => response.json())
                .then(result => {
                    for (let post of result) {
                        getCommentsByPostId(post.id)
                            .then(respone => respone.json())
                            .then(comments => {
                                renderPost(post, comments);
                            })
                    }
                    loadingCompleted()
                    document.body.append(loadMore)
                })
        } else {
            const btn = document.getElementById('loadMore');
            if (btn) {
                document.body.removeChild(loadMore)
            }
            loadingCompleted()
        }
    }
    document.body.removeChild(table);

    const userTitle = document.createElement('h1');
    userTitle.textContent = `${userName}'s posts: `;
    postsWrapper.insertAdjacentElement('beforeBegin', userTitle);

    const START = 0,
        INCREMENT = 2,
        LIMIT = 2,
        MAX_POSTS = 10;
    const getPosts = gettingPostsByPortions(id, START, LIMIT, INCREMENT, MAX_POSTS);

    const loadMore = document.createElement('button');
    loadMore.id = 'loadMore'
    loadMore.textContent = 'Load more posts...'
    loadMore.type = 'button';
    loadMore.onclick = () => {
        onGettingPostsHandler();
    }
    onGettingPostsHandler();
}

const focusInput = (event) => {
    event.stopPropagation();
}

const renderList = (users) => {
    function renderBody(element) {
        for (let user of users) {
            element.insertAdjacentHTML('beforeend', `
                <tr id="${user.id}" data-editable="no">
                    <td>
                        <input type="text" value="${user.id}" data-key="id" disabled>
                    </td>
                    <td>
                        <input type="text" value="${user.name}" data-key="name" disabled>
                    </td>
                    <td onclick="redirect(${user.id}, '${user.name}')">
                        <input 
                            type="text" 
                            value="${user.username}" 
                            onclick="focusInput(event)" 
                            data-key="username" 
                            disabled>
                    </td>
                    <td>
                        <input type="email" value="${user.email}" data-key="email" disabled>
                    </td>
                    <td>
                        <input type="tel" value="${user.phone}" data-key="phone" disabled>
                    </td>
                    <td>
                        <input type="text" value="${user.website}" data-key="website" disabled>
                    </td>
                    <td>
                        <button class="edit" onclick="onEditHandler(${user.id})">Edit</button>
                        <button onclick="onDeleteHandler(${user.id})">Delete</button>
                    </td>
                </tr>
            `)
        }
    }
    if (table) {
        const tbody = table.getElementsByTagName('tbody')[0] || document.createElement('tbody');
        tbody.innerHTML = '';
        renderBody(tbody);
        table.append(tbody);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getUsers()
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            document.writeln('Something went wrong...')
        })
        .then(data => {
            users = data;
            loadingCompleted()
            renderList(users);
        })
})