var map = {"user1": "abc123", "user2": "pass"}; // setting up obj representing data from mongoDB

function CheckCredentials(user, pass, map) {
    var UserPassword = map[pass];

    if (user === "")
    {
        return false;
    }

    if (user in map) {

        if (pass === UserPassword)
        {
            return true;
        }
        return false;
    }
    return false; // false if user is not in db
}

function DupeUsername(user, map) {
    if (user in map)
    {
        return true;
    } else
    {
        return false;
    }
}

function SignUp(user, pass, map) {
    if (SignUp(user, map) === false && pass !== "" && user !== "") {
        map[user] = pass;
    }
}



// Tests for isValPass
expect(CheckCredentials("rexx", "aaa", usersMap)).to.equal(true);
expect(CheckCredentials("bob", "AAA", usersMap)).to.equal(false);
expect(CheckCredentials("sez", "w21", usersMap)).to.equal(false);
expect(CheckCredentials("", "rqw", usersMap)).to.equal(false);
expect(CheckCredentials("rex", "", usersMap)).to.equal(false);



// Tests for isUserTaken
expect(DupeUsername("rex", usersMap)).to.equal(true);
expect(DupeUsername("rex", usersMap)).to.equal(false);
expect(DupeUsername("wq", usersMap)).to.equal(false);



// Tests for addUse
SignUp("rex", "123", usersMap);
expect(usersMap).to.eql({"rex": "333", "bob": "qt"});
SignUp("User1", "asd", usersMap);
expect(usersMap).to.eql({"rex": "333", "bob": "qt", "rex1" : "asd"});
SignUp("user3", "hfdh", usersMap);
expect(usersMap).to.eql({"rex": "333", "bob": "qt", "as" : "asd", "rsa": "hfdh"});


