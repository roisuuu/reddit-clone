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

    initialiseBannerElements();
    createMain();

    const loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = (e) => {
        // e is the button
        e.preventDefault();

        // get username
        // get password
        // convert those to json
        const username = document.getElementById('username').textContent;
        const password = document.getElementById('password').textContent;
        if (username == "" || password == "") {
            alert('please fill in all fields');
            return false;
        };

        let userAndPw = {
            "username": username,
            "password": password
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(userAndPw),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`${apiUrl}/auth/login`, options)
            .then(response => response.json())
            .then(response => alert(response.message))

    }
};

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
}, {});

// creates all banner elements: logo, login, search, sign up
function initialiseBannerElements() {
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

    createSignUpModal();
    signUpBasic();
};

// basic functionality when the log in button is pressed
function loginBasic() {
    const navItems = document.getElementsByClassName("nav-item");
    const loginButton = navItems[1];
    console.log(navItems[1]);

    // function that creates a login modal, with html and css

    loginButton.onclick = function() {
        // summon the modal,
        // exit if login button is clicked again
        const loginModal = document.getElementById('loginModal')

        if (loginModal.style.display === "block") {
            loginModal.style.display = "none";
        } else {
            loginModal.style.display = "block";
        }

        // failed function to close modal when clicking outside it
        /*
        window.onclick = function(event) {
            console.log("im out here");
            if (event.target == loginModal) {
                console.log("tryna make a change");
                loginModal.style.display = "none";
            }
        }; */
        //alert("You pressed the login!");
    };
};

function validateForm() {
    let formData = document.forms["myForm"]["fname"].value;
    if (formData == "") {
        alert("Name must be filled out");
        return false;
    }
};

// a function that creates the login modal
function createLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.classList.add('modal-content');
    loginModal.classList.add('login-form');
    loginModal.id = 'loginModal';
    document.getElementById('root').appendChild(loginModal);

    const title = document.createElement('h1');
    title.classList.add('login-header');
    title.id = 'loginTitle';
    title.textContent = ('Login');
    loginModal.appendChild(title);

    const loginForm = document.createElement('form');
    loginForm.id = 'loginForm';
    loginModal.appendChild(loginForm);
    loginForm.style.textAlign = "center";
    loginForm.classList.add('modal-body');
    //loginForm.onsubmit = validateForm();

    //loginForm.classList.add('modal-content');
    // creates the username form
    const userName = document.createElement('input');
    userName.id = ('username');
    userName.setAttribute('type', "text");
    userName.setAttribute('placeholder', "Username")
    userName.setAttribute('name', "username");
    userName.style.width = "80%";
    // creates the password form
    const password = document.createElement('input');
    password.id = ('password');
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


/*
function checkMatching() {
    if (document.getElementById('password').value ==
        document.getElementById('confirmPassword').value) {
        document.getElementById('pwMSG').style.color = 'green';
        document.getElementById('pwMSG').textContent = ('matching');
    } else {
        document.getElementById('pwMSG').style.color = 'red';
        document.getElementById('pwMSG').textContent = ('not matching');
    }
}; */

function signUpBasic() {
    const navItems = document.getElementsByClassName("nav-item");
    const signUpButton = navItems[2];
    console.log(navItems[2]);


    const signUpModal = document.getElementById('signUpModal');
    console.log(signUpModal);
    signUpButton.onclick = function() {
        //alert("You pressed the signup!");

        if (signUpModal.style.display === "block") {
            signUpModal.style.display = "none";
        } else {
            signUpModal.style.display = "block";
        }
    };
};

function createSignUpModal() {
    const signUpModal = document.createElement('div');
    signUpModal.classList.add('modal-content');
    signUpModal.classList.add('sign-up-form');
    signUpModal.id = 'signUpModal';
    document.getElementById('root').appendChild(signUpModal);

    const title = document.createElement('h1');
    title.classList.add('sign-up-header');
    title.id = 'signUpTitle';
    title.textContent = ('Sign Up');
    signUpModal.appendChild(title);

    const signUpForm = document.createElement('form');
    signUpForm.id = 'signUpForm';
    signUpModal.appendChild(signUpForm);
    signUpForm.style.textAlign = "center";
    //signUpForm.onsubmit = validateForm();

    // creates the username form
    const userName = document.createElement('input');
    userName.setAttribute('type', "text");
    userName.setAttribute('placeholder', "Create Username");
    userName.setAttribute('name', "username");
    userName.style.width = "80%";
    // creates the email form
    const email = document.createElement('input');
    email.setAttribute('type', "text");
    email.setAttribute('placeholder', "Email Address");
    email.setAttribute('name', "email");
    email.style.width = "80%";
    // creates the password form
    const password = document.createElement('input');
    password.id = 'password';
    password.setAttribute('type', "password");
    password.setAttribute('placeholder', "Password");
    password.setAttribute('name', "password");
    password.style.width = "80%";
    //password.onkeyup = checkMatching();
    // creates the confirm password form
    const confirmPassword = document.createElement('input');
    confirmPassword.setAttribute('type', "password");
    confirmPassword.id = 'confirmPassword';
    confirmPassword.setAttribute('placeholder', "Confirm Password");
    confirmPassword.setAttribute('name', "confirmPassword");
    confirmPassword.style.width = "80%";
    //const matchingMSG = document.createElement('span');
    //matchingMSG.id = 'message';
    //confirmPassword.appendChild(matchingMSG);
    //confirmPassword.onkeyup = checkMatching();
    // creates a submit button
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', "submit");
    submitButton.setAttribute('value', "Submit");
    submitButton.style.width = "80%";

    // appends all of the forms to the loginForm element
    signUpForm.appendChild(userName);
    signUpForm.appendChild(email);
    signUpForm.appendChild(password);
    signUpForm.appendChild(confirmPassword);
    signUpForm.appendChild(submitButton);
};

function createMain() {
    // this is the main section which will house all the posts
    const main = document.createElement('main');
    document.getElementById('root').appendChild(main);
    const postList = document.createElement('ul');
    postList.id = "feed";
    postList.dataset.idFeed = "";
    main.appendChild(postList);

    // creating the feed header
    const header = document.createElement('div');
    header.classList.add('feed-header');
    postList.appendChild(header);
    // h3
    const headerText = document.createElement('h3');
    headerText.classList.add('feed-title');
    headerText.classList.add('alt-text');
    headerText.textContent = ('Popular Posts on Seddit');
    header.appendChild(headerText);
    // button
    const postButton = document.createElement('button');
    postButton.classList.add('button');
    postButton.classList.add('button-secondary');
    postButton.textContent = ('Post');
    header.appendChild(postButton);

    fetchPost();
};

function fetchPost() {
    createPostHTML();
    // loop - for each post create a framework, then populate it with
    // the data!!
    // fetch post data from json
};

//function populateFeed()

// function creates the HTML framework for a post.
function createPostHTML() {
    const post = document.createElement('li');
    post.classList.add('post');
    post.dataset.idPost = "";
    document.getElementById('feed').appendChild(post);

    const voteSection = document.createElement('div');
    voteSection.classList.add('vote');
    voteSection.dataset.idUpvotes = "";
    post.appendChild(voteSection);

    const postContent = document.createElement('div');
    postContent.classList.add('content');
    // heading of the post
    const heading = document.createElement('h4');
    heading.classList.add('post-title');
    heading.classList.add('alt-text');
    heading.dataset.idTitle = "";
    postContent.appendChild(heading);
    heading.textContent = ('Big tiddy goth gf');
    // author of the post
    const author = document.createElement('p');
    author.classList.add('post-author');
    author.dataset.idAuthor = "";
    postContent.appendChild(author);
    author.textContent = ('By @XxBigWeeb69xX');
    // includes which subseddit and time since posted
    const postInfo = document.createElement('p');
    postInfo.classList.add('alt-text');
    postInfo.textContent = ('s/anime, 2hrs');
    author.appendChild(postInfo);

    const thumbnailBox = document.createElement('div');
    thumbnailBox.classList.add('post-thumbnail');
    const img = document.createElement('img');
    img.src = "../images/1_q.jpg";
    thumbnailBox.appendChild(img);
    post.appendChild(thumbnailBox);

    post.appendChild(postContent);
}

export default initApp;
