// This file uses tape and sinon to test to see if our returned JSON from github.js is the same data we're looking for here.
// In this case we are looking for a user named octokit, with a specific login, name, and id number.
// SinonJS is a npm module that allows us to make requests internally, by slightly modifying github.js, You are able to return the requested JSON object
// to the console, copy it into octokitUserData.js and then make requests using sinon to test that data locally.  This cuts down on latency time when testing
// specific data that we expect to return upon a GET request and we don't need to test it in a live online environment

const test = require("tape");
const sinon = require("sinon");

const github = require("../github.js");
const octokitUserData = require("./octokitUserData.js");

test("Get Github user by username", async(t) => {
    t.plan(3); // tape plan 3...

    sinon.stub(github, "getGitHubUser").returns(octokitUserData); // stubbing is the utilizing of API requests 
    // (GET, POST) locally so you don't have to always test in an online environment.
    // In this case we stub the results from github.js, specifically the getGitHubUser() method, and replaces it with
    // whatever is returned by the octokitUserData.js file (which is just a JSON object of user data).

    const githubUser = await github. // await the results from our github.js getGitHubUser() function on the user "octokit"
    getGitHubUser("octokit");

    t.equal(githubUser.id, 3430433,); // and tape will test if each of these properties in the first parameters are equal to the queried second parameter.
    t.equal(githubUser.login, "octokit");
    t.equal(githubUser.name, "Octokit");
});