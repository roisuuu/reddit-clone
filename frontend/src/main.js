/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// ASSIGNMENT 2 BY ROYCE HUANG (z5258844)

// import your own scripts here.
// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
    // your app initialisation goes here
    document.getElementById('root').style.position = 'relative';
    initialiseBannerElements();
    signUpAuth(apiUrl);
    loginAuth(apiUrl);
    logoutFunctionality();
    createMain(apiUrl);
};

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
    sedditLogo.textContent = ('Seddit');
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
    searchBar.dataset.idSearch = "";
    searchBar.setAttribute('type', "search");
    searchBar.setAttribute('placeholder', 'Search Seddit');
    searchBar.style.display = "inline";
    searchBarList.appendChild(searchBar);

    // adds login button to banner
    const loginList = document.createElement('li');
    loginList.id = 'loginList';
    loginList.classList.add('nav-item');
    buttonList.appendChild(loginList);

    const loginButt = document.createElement('button');
    loginButt.id = "loginButton";
    loginButt.classList.add('button');
    loginButt.classList.add('button-primary');
    loginButt.dataset.idLogin = "";
    loginButt.style.display = "inline";
    loginList.appendChild(loginButt);
    loginButt.textContent = ('Login');

    // creates a logout button
    const logoutList = document.createElement('li');
    logoutList.id = 'logoutList';
    logoutList.classList.add('nav-item');
    buttonList.appendChild(logoutList);

    const logoutButt = document.createElement('button');
    logoutButt.id = 'logoutButton';
    logoutButt.classList.add('button');
    logoutButt.classList.add('button-primary');
    logoutList.appendChild(logoutButt);
    logoutButt.textContent = ('Logout');
    logoutButt.style.display = "none";

    // replace login button with logout button if logged in
    let token = sessionStorage.getItem("loginToken");
    //console.log(token);
    if (token !== null) {
        loginButt.style.display = "none";
        logoutButt.style.display = "inline";
    } else {
        loginButt.style.display = "inline";
        logoutButt.style.display = "none";
        console.log("There's no login token yet");
    }

    loginBasic();
    createLoginModal();

    // creates sign up button
    const signUpList = document.createElement('li');
    signUpList.classList.add('nav-item');
    signUpList.id = 'signUpButton';
    buttonList.appendChild(signUpList);

    const signUpButt = document.createElement('button');
    signUpButt.classList.add('button');
    signUpButt.classList.add('button-secondary');
    signUpButt.dataset.idSignup = "";
    signUpButt.style.display = "inline";
    signUpList.appendChild(signUpButt);
    signUpButt.textContent = ('Sign Up');

    createSignUpModal();
    signUpBasic();
};

// logs the user out when the logout button is pressed
function logoutFunctionality() {
    const logoutButt = document.getElementById("logoutButton");
    logoutButt.onclick = function() {
        // remove the login token
        sessionStorage.removeItem("loginToken");
        // refresh the page
        document.location.reload(true);
    };
};

// basic functionality when the log in button is pressed
function loginBasic() {
    const loginButton = document.getElementById('loginButton');
    //console.log("log in button is " + loginButton);

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
    };
};

// a function that creates the login modal
function createLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.style.position = 'absolute';
    loginModal.style.zIndex = '1000';
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

function loginAuth(apiUrl) {
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = (e) => {
        // e is the button
        e.preventDefault();

        // get username
        // get password
        // convert those to json
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if ((username || password) === "") {
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
            .then(response => {
                console.log(response);
                if (response.token != undefined) {
                    console.log('true');
                    alert('Successful Sign-In!')
                    loginForm.reset();
                    loginModal.style.display = 'none';
                    sessionStorage.setItem("loginToken", response.token);
                    console.log("my token is " + sessionStorage.getItem("loginToken"));
                    // change feed state to private
                    sessionStorage.setItem("feedState", "private");
                    document.location.reload(true);
                } else {
                    console.log('false');
                    alert('Sign-In Failed, Error');
                }
            })
    }
};

function signUpBasic() {
    const signUpButton = document.getElementById('signUpButton');
    //console.log("sign up button is " + signUpButton);

    const signUpModal = document.getElementById('signUpModal');
    //console.log(signUpModal);
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
    signUpModal.style.position = 'absolute';
    signUpModal.style.zIndex = '1000';
    signUpModal.style.right = '0px';
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
    userName.id = 'newUser';
    userName.style.width = "80%";
    // creates the name form
    const name = document.createElement('input');
    name.setAttribute('type', "text");
    name.setAttribute('placeholder', "First Name");
    name.setAttribute('name', "name");
    name.id = 'firstName'
    name.style.width = "80%";
    // creates the email form
    const email = document.createElement('input');
    email.setAttribute('type', "text");
    email.setAttribute('placeholder', "Email Address");
    email.setAttribute('name', "email");
    email.id = 'email';
    email.style.width = "80%";
    // creates the password form
    const password = document.createElement('input');
    password.id = 'newPassword';
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
    signUpForm.appendChild(userName);
    signUpForm.appendChild(name);
    signUpForm.appendChild(email);
    signUpForm.appendChild(password);
    signUpForm.appendChild(submitButton);
};

function signUpAuth(apiUrl) {
    const signUpForm = document.getElementById('signUpForm');
    const signUpModal = document.getElementById('signUpModal');
    signUpForm.onsubmit = (e) => {
        e.preventDefault();

        const username = document.getElementById('newUser').value;
        //console.log('username is ' + username + "and this");
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('newPassword').value;
        if ((username || password || email || firstName) === "") {
            alert('please fill in all fields');
            return false;
        };

        let details = {
            "username": username,
            "password": password,
            "email": email,
            "name": firstName
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`${apiUrl}/auth/signup`, options)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log('true');
                    alert('Successful Sign-Up!')
                    signUpForm.reset();
                    signUpModal.style.display = "none";
                } else {
                    console.log('false');
                    alert('Sign-Up Failed, Error Code: ' + response.status);
                }
            })

    }
};

function createMain(apiUrl) {
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
    // h3 that tells you whether its user feed or public feed
    const headerText = document.createElement('h3');
    headerText.id = "headerText";
    headerText.classList.add('feed-title');
    headerText.classList.add('alt-text');
    headerText.textContent = ('Popular Posts on Seddit');
    header.appendChild(headerText);
    // post button
    const postButton = document.createElement('button');
    postButton.classList.add('button');
    postButton.classList.add('button-secondary');
    postButton.textContent = ('Post');
    header.appendChild(postButton);
    // switch feed button (for logged in state)
    const switchFeed = document.createElement('button');
    switchFeed.classList.add('button');
    switchFeed.id = "switchFeedButton";
    switchFeed.classList.add('button-primary');
    switchFeed.textContent = ('Switch Feeds');
    //switchFeed.style.display = "none";
    switchFeed.addEventListener("click", function() {
        switchFeeds(apiUrl);
    });
    header.appendChild(switchFeed);

    populateFeed(apiUrl);
};


function switchFeeds(apiUrl) {
    // session storage I'm on the public feed?
    if (sessionStorage.getItem("loginToken") !== null) {
        // session storage whichFeed becomes the opp
        const feedState = sessionStorage.getItem("feedState");
        if (feedState === "public") {
            sessionStorage.setItem("feedState", "private");
        } else {
            sessionStorage.setItem("feedState", "public");
        }

        // refresh the page
        document.location.reload(true);
    } else {
        alert('Please Log In, to see your personal feed!');
    }
};

function populateFeed(apiUrl) {
    let token = sessionStorage.getItem("loginToken");
    const feedState = sessionStorage.getItem("feedState");

    // USER FEED:
    if (token !== null && feedState === "private") {
        headerText.textContent = "Popular Posts From Your Feed";
        // set feed state to private
        sessionStorage.setItem("feedState", "private");
        // refresh posts on front page to get them from /user/feed
        /*
        for (var i = 0; i < 20; i++) {
            tempUserPostHTML();
        }; */
        fetchUserFeed(apiUrl);

    } else { // PUBLIC FEED:
        headerText.textContent = "Popular Posts on Seddit";
        // set feed state to public
        sessionStorage.setItem("feedState", "public");
        // refresh posts on front page to get them from /post/public
        fetchPublicPosts(apiUrl);


    }

    // This should check whether user is logged in or not. 
    // if not, it gets posts from /post/public
    // if so, it should get posts from /user/feed
    // loop - for each post create a framework, then populate it with
    // the data!!
    // fetch post data from json
};

function fetchPublicPosts(apiUrl) {
    const heading = document.getElementsByClassName('post-title');
    const author = document.getElementsByClassName('post-author');
    const moreInfo = document.getElementsByClassName('extra-info');
    //const thumbnail = document.getElementsByClassName('img');

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(`${apiUrl}/post/public`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // TODO: Sort posts by date
            for (var i = 0; i < 20; i++) {
                const base64Thumbnail = response.posts[i].thumbnail;
                createPostHTML(base64Thumbnail);
                //console.log(author[i].textContent);
                //console.log(moreInfo[i].textContent);
                //console.log(thumbnail[i]);
                heading[i].textContent = response.posts[i].title;
                author[i].textContent = ('By @' + response.posts[i].meta.author);
                moreInfo[i].textContent = ('s/' + response.posts[i].meta.subseddit + ', time posted: ' + response.posts[i].meta.published);
                //console.log(i + '|' + base64Thumbnail);
                //thumbnail[i].src = ('data:image/png;base64,' + base64Thumbnail);
                //console.log(thumbnail[i].src);
            }
            console.log(response.posts[0].title);
        })
};

// this function will get 10 posts from the user feed
function fetchUserFeed(apiUrl) {

    // grab post html elements
    const heading = document.getElementsByClassName('post-title');
    const author = document.getElementsByClassName('post-author');
    const moreInfo = document.getElementsByClassName('extra-info')
    const token = "Token " + sessionStorage.getItem("loginToken");

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    fetch(`${apiUrl}/user/feed?p=0&n=10`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if (response.posts.length === 0) {
                alert('Your feed is empty, try following some users first! Or, browse the public feed.');
                //const switchFeeds = document.getElementById('switchFeedButton');
                //switchFeeds.style.display = "inline";
            } else {
                for (var i = 0; i < 10; i++) {
                    const base64Thumbnail = response.posts[i].thumbnail;
                    createPostHTML(base64Thumbnail);
                    //console.log(author[i].textContent);
                    //console.log(moreInfo[i].textContent);
                    //console.log(thumbnail[i]);
                    heading[i].textContent = response.posts[i].title;
                    author[i].textContent = ('By @' + response.posts[i].meta.author);
                    moreInfo[i].textContent = ('s/' + response.posts[i].meta.subseddit + ', time posted: ' + response.posts[i].meta.published);
                    //console.log(i + '|' + base64Thumbnail);
                    //thumbnail[i].src = ('data:image/png;base64,' + base64Thumbnail);
                    //console.log(thumbnail[i].src);
                }
                console.log(response.posts[0].title);
            }
        })
};

// function creates the HTML framework for a post.
function createPostHTML(thumbnailData) {
    const post = document.createElement('li');
    post.classList.add('post');
    post.dataset.idPost = "";
    document.getElementById('feed').appendChild(post);

    const voteSection = document.createElement('div');
    voteSection.classList.add('vote');
    voteSection.dataset.idUpvotes = "";
    post.appendChild(voteSection);

    // upvote button
    const upvoteDiv = document.createElement('div');
    upvoteDiv.id = 'upvoteDiv';
    voteSection.appendChild(upvoteDiv);
    const upvoteButton = document.createElement('button');
    upvoteButton.id = 'upvoteButton';
    upvoteButton.classList.add('button');
    upvoteButton.classList.add('button-primary');
    upvoteButton.style.width = '70%';
    upvoteButton.textContent = ("/\\");
    upvoteButton.style.textAlign = 'center';
    upvoteDiv.appendChild(upvoteButton);

    const postContent = document.createElement('div');
    postContent.classList.add('content');
    // heading of the post
    const heading = document.createElement('h4');
    heading.classList.add('post-title');
    heading.classList.add('alt-text');
    heading.id = "postHeading";
    heading.dataset.idTitle = "";
    postContent.appendChild(heading);
    heading.textContent = ('quality esl big tiddy gf :3');
    // author of the post
    const author = document.createElement('p');
    author.classList.add('post-author');
    author.dataset.idAuthor = "";
    postContent.appendChild(author);
    author.textContent = ('By @XxBigWeeb69xX');
    // includes which subseddit and time since posted
    const postInfo = document.createElement('p');
    //postInfo.classList.add('alt-text');
    postInfo.classList.add('extra-info');
    postInfo.textContent = ('s/anime, 2hrs');
    postInfo.style.fontSize = "10px";
    postContent.appendChild(postInfo);

    const thumbnailBox = document.createElement('div');
    thumbnailBox.classList.add('post-thumbnail');
    if (thumbnailData === null) {
        thumbnailBox.style.display = "none";
    } else {
        const img = document.createElement('img');
        // took an image from local storage as a placeholder
        //img.src = "../images/1_q.jpg";
        img.src = 'data:image/png;base64,' + thumbnailData;
        thumbnailBox.appendChild(img);
    }

    post.appendChild(thumbnailBox);

    post.appendChild(postContent);
}

function tempUserPostHTML() {
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
    heading.textContent = ('This is a post from the user feed!');
    // author of the post
    const author = document.createElement('p');
    author.classList.add('post-author');
    author.dataset.idAuthor = "";
    postContent.appendChild(author);
    author.textContent = ('By @XxBigWeeb69xX');
    // includes which subseddit and time since posted
    const postInfo = document.createElement('p');
    postInfo.classList.add('alt-text');
    postInfo.textContent = ('s/nba, 2hrs');
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
