// This simple module utilizes node-fetch to make simple GET request to a github account and utilize its returned JSON object
// To run tests against using tape in test/tests.js

const fetch = require("node-fetch");

module.exports.getGitHubUser = (username) => {
    return fetch("https://api.github.com/users/" + username)
        .then((res) => res.json())
        .then((json) => {
            return json;
        });
};