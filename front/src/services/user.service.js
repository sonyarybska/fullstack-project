const getUsers = () => {
    return fetch('http://localhost:5000/users')
        .then(value => value.json())
};

const getUser = (id) => {
    return fetch(`http://localhost:5000/users/${id}`)
        .then(value => value.json())
};

const deleteUser = (id) => {
    return fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
    }).then(value => value.json());
};

const postUser = (user) => {
    return fetch('http://localhost:5000/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
};

const putUser = (user, id) => {
    return fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
}


export {getUsers, deleteUser, postUser, getUser, putUser};