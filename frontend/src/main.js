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

    // adds search bar to banner
    const searchBarList = document.createElement('li');
    searchBarList.classList.add('nav-item');
    buttonList.appendChild(searchBarList);

    const searchBar = document.createElement('input');
    searchBar.id = 'search';
    searchBar.dataset.search = "";
    searchBar.setAttribute('type', "search");
    searchBar.setAttribute('placeholder', 'Search Seddit');
    searchBarList.appendChild(searchBar);

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
    const loginButton = navItems[1];
    console.log(navItems[1]);

    // function that creates a login modal, with html and css

    loginButton.onclick = function() {
        // summon the modal,
        // exit if clicked anywhere else
        const loginModal = document.getElementById('loginModal')


        if (loginModal.style.display === "block") {
            loginModal.style.display = "none";
        } else {
            loginModal.style.display = "block";
            /*
            window.onclick = function(event) {
                console.log("im out here");
                if (event.target !== loginModal) {
                    console.log("tryna make a change");
                    loginModal.style.display = "none";
                }
            }; */
        }
        //alert("You pressed the login!");
    };
};

// a function that creates the login modal
function createLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.classList.add('modal-content');
    loginModal.classList.add('login-form');
    loginModal.id = 'loginModal';
    document.getElementById('root').appendChild(loginModal);

    const title = document.createElement('h1');
    title.id = 'loginTitle';
    title.textContent = ('Login');
    loginModal.appendChild(title);

    const loginForm = document.createElement('form');
    loginForm.id = 'loginForm';
    loginModal.appendChild(loginForm);
    loginForm.style.textAlign = "center";

    //loginForm.classList.add('modal-content');
    // creates the username form
    const userName = document.createElement('input');
    userName.setAttribute('type', "text");
    userName.setAttribute('placeholder', "Username")
    userName.setAttribute('name', "username");
    userName.style.width = "80%";
    // creates the password form
    const password = document.createElement('input');
    password.setAttribute('type', "password");
    password.setAttribute('placeholder', "Password");
    password.setAttribute('name', "password");
    password.style.width = "80%";
    // creates a submit button
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', "submit");
    submitButton.setAttribute('value', "Submit");
    submitButton.style.width = "80%";

    // appends all of the forms to the loginForm element
    loginForm.appendChild(userName);
    loginForm.appendChild(password);
    loginForm.appendChild(submitButton);


};

function signUpBasic() {
    const navItems = document.getElementsByClassName("nav-item");
    const signUpButton = navItems[2];
    console.log(navItems[2]);
    signUpButton.onclick = function signUpBasic() {
        alert("You pressed the signup!");
    };
};

export default initApp;