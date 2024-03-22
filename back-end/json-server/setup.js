const posts = require('./mocks/posts');
const users = require('./mocks/users');
const comments = require('./mocks/comments');

const db = JSON.stringify({
    posts, users, comments
});

console.log(db);