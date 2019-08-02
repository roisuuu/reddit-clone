/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.
// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
    // your app initialisation goes here

    // create the header
    const banner = document.createElement('header');
    banner.id = 'nav';
    banner.classList.add('banner');
    document.getElementById('root').appendChild(banner);

    // adds stupid logo
    const sedditLogo = document.createElement('h1');
    sedditLogo.id = 'logo';
    sedditLogo.innerText = ('Reddit');
    sedditLogo.classList.add('flex-center');
    banner.appendChild(sedditLogo);

    // creates user options
    const buttonList = document.createElement('ul');
    buttonList.classList.add('nav');
    banner.appendChild(buttonList);

    // adds login button to banner
    const loginList = document.createElement('li');
    loginList.classList.add('nav-item');
    buttonList.appendChild(loginList);

    const loginButt = document.createElement('button');
    loginButt.id = 'loginButton';
    loginButt.classList.add('button');
    loginButt.classList.add('button-primary');
    loginButt.dataset.idLogin = "";
    loginList.appendChild(loginButt);
    loginButt.textContent = ('Login');

    loginBasic();
    createLoginModal();

    // creates sign up button
    const signUpList = document.createElement('li');
    signUpList.classList.add('nav-item');
    buttonList.appendChild(signUpList);

    const signUpButt = document.createElement('button');
    signUpButt.id = 'signUpButton';
    signUpButt.classList.add('button');
    signUpButt.classList.add('button-secondary');
    signUpButt.dataset.idSignup = "";
    signUpList.appendChild(signUpButt);
    signUpButt.textContent = ('Sign Up');

    signUpBasic();

}

function loginBasic() {
    const navItems = document.getElementsByClassName("nav-item");
    const loginButton = navItems[0];
    console.log(navItems[0]);

    // function that creates a login modal, with html and css

    loginButton.onclick = function() {
        // summon the modal,
        // exit if clicked anywhere else
        /* 
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        */
        const loginModal = document.getElementById('loginModal');
        if (loginModal.style.display === "block") {
            loginModal.style.display = "none";
        } else {
            loginModal.style.display = "block";
        }
        //alert("You pressed the login!");
    };
};

function createLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.classList.add('modal-content');
    loginModal.classList.add('login-form');
    loginModal.id = 'loginModal';
    document.getElementById('root').appendChild(loginModal);

    const loginForm = document.createElement('form');
    loginForm.id = 'loginForm';
    loginModal.appendChild(loginForm);

    //loginForm.classList.add('modal-content');
    const userName = document.createElement('input');
    userName.setAttribute('type', "text");
    userName.setAttribute('name', "username");
    const password = document.createElement('input');
    password.setAttribute('type', "text");
    password.setAttribute('name', "password");
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', "submit");
    submitButton.setAttribute('value', "Submit");
    loginForm.appendChild(userName);
    loginForm.appendChild(password);
    loginForm.appendChild(submitButton);


};

function signUpBasic() {
    const navItems = document.getElementsByClassName("nav-item");
    const signUpButton = navItems[1];
    console.log(navItems[1]);
    signUpButton.onclick = function signUpBasic() {
        alert("You pressed the signup!");
    };
};

export default initApp;
