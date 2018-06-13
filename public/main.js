firebase.auth().onAuthStateChanged(function (user) {

    let when_connected = document.getElementById('when_connected');
    let login_div = document.getElementById('login_div');
    let register_div = document.getElementById('register_div');

    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;

        when_connected.style.display = "initial";

        login_div.style.display = "none";
        register_div.style.display = "none";
        // ...
    } else {
        // User is signed out.
        // ...
        when_connected.style.display = "none";
        
        login_div.style.display = "initial";
        register_div.style.display = "initial";
    }
});

function register() {

    let email = document.getElementById('email_register').value;
    let password = document.getElementById('password_register').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(error.message);
        // ...
    });

}

function login() {
    let email = document.getElementById('email_login').value;
    let password = document.getElementById('password_login').value;


    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function logout() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}