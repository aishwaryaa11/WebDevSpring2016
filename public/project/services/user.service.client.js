(function() {
    angular
        .module("Travelogue")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"],
                "email": "alice@alice.com", "age": "22", "aboutme": "Senior at Northeastern University",
                "placesbeen": "New York, Philly, London",  "placesfuture": "Take me to Venice!"},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"],
                "email": "bob@bob.com", "age": "25", "aboutme": "I am awesome",
                "placesbeen": "Born and Raised in Waltham, MA. Never been out.",
                "placesfuture": "Literally anywhere besides the place I'm in currently..."},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"],
                "email": "charlie@charlie.como", "age": "52", "aboutme": "Lecturer",
                "placesbeen": "Chicago, San Francisco",  "placesfuture": "Nirvana"},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"],
                "email": "dan@dan.com", "age": "30", "aboutme": "Senior at Northeastern University",
                "placesbeen": "Every state in the country",  "placesfuture": "Venus"},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"],
                "email": "ed@ed.com", "age": "18", "aboutme": "Go Huskies!",
                "placesbeen": "Canada",  "placesfuture": "Not Canada"}
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            createUserAdmin: createUserAdmin,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserAdmin: updateUserAdmin
        };

        return service;

        function findUserByCredentials(username, password, callback) {
            for (var u in users) {
                if (users[u].username == username && users[u].password == password) {
                    return users[u];
                }
            }

            return null;
        }

        function findUserById(userId, callback) {
            for (var u in users){
                if (users[u]._id == userId) {
                    return users[u];
                }
            }

            return null;
        }

        function findUserByUsername(username, callback) {
            for (var u in users){
                if (users[u].username == username) {
                    return users[u];
                }
            }

            return null;
        }

        function findAllUsers(callback) {
            return users;
        }

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                email: user.email,
                age: user.age,
                location: user.location,
                gender: user.gender,
                aboutme: user.aboutme,
                placesbeen: user.placesbeen,
                placesfuture: user.placesfuture
            };

            users.push(newUser);
            return newUser;
        }


        function createUserAdmin(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                username: user.username,
                password: "",
                firstName: "",
                lastName: "",
                roles: "",
                email: "",
                age: "",
                location: "",
                gender: "",
                aboutme: "",
                placesbeen: "",
                placesfuture: ""
            };

            users.push(newUser);
            return newUser;
        }

        function deleteUserById(userId, callback) {
            var user = findUserById(userId);
            if (user != null) {
                users.splice(users.indexOf(user), 1);
            } else {
                return null;
            }
        }

        function updateUser(userId, user, callback) {
            var userTemp = findUserById(userId);
            if (userTemp != null) {
                userTemp.firstName = user.firstName;
                userTemp.lastName = user.lastName;
                userTemp.password = user.password;
                userTemp.username = user.username;
                userTemp.roles = user.roles;
                userTemp.email = user.email;
                userTemp.age = user.age;
                userTemp.location = user.location;
                userTemp.gender = user.gender;
                userTemp.aboutme = user.aboutme;
                userTemp.placesbeen = user.placesbeen;
                userTemp.placesfuture = user.placesfuture;
                return userTemp;
            } else {
                return null;
            }
        }

        function updateUserAdmin(userId, user, callback) {
            var userTemp = findUserById(userId);
            if (userTemp != null) {
                userTemp.username = user.username;
                return userTemp;
            } else {
                return null;
            }
        }
    }
})();