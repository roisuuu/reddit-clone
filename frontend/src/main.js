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
    createUpvoteModal();
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
    if (token !== null) {
        loginButt.style.display = "none";
        logoutButt.style.display = "inline";
    } else {
        loginButt.style.display = "inline";
        logoutButt.style.display = "none";
        console.log("There's no login token yet");
    }

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

function showLogin() {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener("click", function() {
        const loginModal = document.getElementById('loginModal');
        loginModal.style.display = "block";
    })
};

function loginModalClose() {
    // When the user clicks anywhere outside of the modal, close it
    const loginModal = document.getElementById('loginModal');
    window.addEventListener("click", function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    });
};

// a function that creates the login modal
function createLoginModal() {
    const loginModal = document.createElement('div');
    loginModal.classList.add('modal');
    loginModal.classList.add('login-form');
    loginModal.id = 'loginModal';
    document.getElementById('root').appendChild(loginModal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    loginModal.appendChild(modalContent);

    const title = document.createElement('h1');
    title.classList.add('login-header');
    title.id = 'loginTitle';
    title.textContent = ('Login');
    modalContent.appendChild(title);

    const loginForm = document.createElement('form');
    loginForm.id = 'loginForm';
    modalContent.appendChild(loginForm);
    loginForm.style.textAlign = "center";
    loginForm.classList.add('modal-body');

    // creates the username form
    const userName = document.createElement('input');
    userName.id = ('username');
    userName.setAttribute('type', "text");
    userName.setAttribute('placeholder', "Username")
    userName.setAttribute('name', "username");
    userName.classList.add('form-field');
    userName.style.width = "80%";
    // creates the password form
    const password = document.createElement('input');
    password.id = ('password');
    password.setAttribute('type', "password");
    password.setAttribute('placeholder', "Password");
    password.setAttribute('name', "password");
    password.classList.add('form-field');
    password.style.width = "80%";
    // creates a submit button
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', "submit");
    submitButton.setAttribute('value', "Submit");
    submitButton.classList.add('form-field');
    submitButton.style.width = "80%";

    // appends all of the forms to the loginForm element
    loginForm.appendChild(userName);
    loginForm.appendChild(password);
    loginForm.appendChild(submitButton);

    // event listener for button click
    showLogin();
    // event listener for modal window to close
    loginModalClose();

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

function showSignUp() {
    const signUpButton = document.getElementById('signUpButton');
    signUpButton.addEventListener("click", function() {
        const signUpModal = document.getElementById('signUpModal');
        signUpModal.style.display = "block";
    })
};

function signUpModalClose() {
    // When the user clicks anywhere outside of the modal, close it
    const signUpModal = document.getElementById('signUpModal');
    window.addEventListener("click", function(event) {
        if (event.target == signUpModal) {
            signUpModal.style.display = "none";
        }
    });
};

function createSignUpModal() {
    const signUpModal = document.createElement('div');
    signUpModal.classList.add('modal');
    signUpModal.classList.add('sign-up-form');
    signUpModal.id = 'signUpModal';
    document.getElementById('root').appendChild(signUpModal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    signUpModal.appendChild(modalContent);

    const title = document.createElement('h1');
    title.classList.add('sign-up-header');
    title.id = 'signUpTitle';
    title.textContent = ('Sign Up');
    modalContent.appendChild(title);

    const signUpForm = document.createElement('form');
    signUpForm.id = 'signUpForm';
    modalContent.appendChild(signUpForm);
    signUpForm.style.textAlign = "center";

    // creates the username form
    const userName = document.createElement('input');
    userName.setAttribute('type', "text");
    userName.setAttribute('placeholder', "Create Username");
    userName.setAttribute('name', "username");
    userName.id = 'newUser';
    userName.style.width = "80%";
    userName.classList.add('form-field');
    // creates the name form
    const name = document.createElement('input');
    name.setAttribute('type', "text");
    name.setAttribute('placeholder', "First Name");
    name.setAttribute('name', "name");
    name.id = 'firstName'
    name.style.width = "80%";
    name.classList.add('form-field');
    // creates the email form
    const email = document.createElement('input');
    email.setAttribute('type', "text");
    email.setAttribute('placeholder', "Email Address");
    email.setAttribute('name', "email");
    email.id = 'email';
    email.style.width = "80%";
    email.classList.add('form-field');
    // creates the password form
    const password = document.createElement('input');
    password.id = 'newPassword';
    password.setAttribute('type', "password");
    password.setAttribute('placeholder', "Password");
    password.setAttribute('name', "password");
    password.style.width = "80%";
    password.classList.add('form-field');
    // creates a submit button
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', "submit");
    submitButton.setAttribute('value', "Submit");
    submitButton.style.width = "80%";
    submitButton.classList.add('form-field');

    // appends all of the forms to the loginForm element
    signUpForm.appendChild(userName);
    signUpForm.appendChild(name);
    signUpForm.appendChild(email);
    signUpForm.appendChild(password);
    signUpForm.appendChild(submitButton);

    // event listener for button click
    showSignUp();
    // event listener for modal window to close
    signUpModalClose();
};

function signUpAuth(apiUrl) {
    const signUpForm = document.getElementById('signUpForm');
    const signUpModal = document.getElementById('signUpModal');
    signUpForm.onsubmit = (e) => {
        e.preventDefault();

        const username = document.getElementById('newUser').value;
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
    switchFeed.addEventListener("click", function() {
        switchFeeds();
    });
    header.appendChild(switchFeed);

    populateFeed(apiUrl);
};


function switchFeeds() {
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
    const postText = document.getElementsByClassName('post-text');
    const commentCount = document.getElementsByClassName('comment-count');

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
                const upvotes = response.posts[i].meta.upvotes.length;
                const time = convertTime(response.posts[i].meta.published);
                const postID = response.posts[i].id;
                createPostHTML(base64Thumbnail, upvotes, apiUrl, response);

                // plugging the API info into the text spaces 
                heading[i].textContent = response.posts[i].title;
                postText[i].textContent = response.posts[i].text;
                author[i].textContent = ('By @' + response.posts[i].meta.author);
                // moreInfo[i].textContent = ('s/' + response.posts[i].meta.subseddit + ', time posted: ' + response.posts[i].meta.published);
                moreInfo[i].textContent = ('s/' + response.posts[i].meta.subseddit + ', time posted: ' + time);
                commentCount[i].textContent = (response.posts[i].comments.length + " comments");
            }
        })
};

// this function will get 10 posts from the user feed
function fetchUserFeed(apiUrl) {

    // grab post html elements
    const heading = document.getElementsByClassName('post-title');
    const author = document.getElementsByClassName('post-author');
    const moreInfo = document.getElementsByClassName('extra-info');
    const postText = document.getElementsByClassName('post-text');
    const commentCount = document.getElementsByClassName('comment-count');
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
            } else {
                for (var i = 0; i < 10; i++) {
                    const base64Thumbnail = response.posts[i].thumbnail;
                    const upvotes = response.posts[i].meta.upvotes.length;
                    const time = convertTime(response.posts[i].meta.published);
                    const postID = response.posts[i].id;
                    console.log(upvotes);
                    createPostHTML(base64Thumbnail, upvotes, apiUrl, response);

                    // taking the text content from the API and pluggin it into the post
                    heading[i].textContent = response.posts[i].title;
                    postText[i].textContent = response.posts[i].text;
                    author[i].textContent = ('By @' + response.posts[i].meta.author);
                    moreInfo[i].textContent = ('s/' + response.posts[i].meta.subseddit + ', time posted: ' + time);
                    commentCount[i].textContent = (response.posts[i].comments.length + " comments");
                }
                console.log(response.posts[0].title);
            }
        })
};

// Should I append all of them to the root, or to each post?
// What happens to public post modals when I switch to user feed?
// How will I open em? A key? 

// NEW: This function just creates the html, all the backend integration
// is handled in function showUpvotes
function createUpvoteModal() {
    // NEEDS TO SPECIFY A POST TO CHECK.
    const modal = document.createElement('div');
    document.getElementById('root').appendChild(modal);
    modal.id = "upvoteModal";
    modal.classList.add('modal');
    modal.classList.add('upvote-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    const title = document.createElement('h1');
    title.classList.add('login-header');
    title.textContent = ('Upvotes');
    modalContent.appendChild(title);

    // where the users who upvotes a post will appear
    const body = document.createElement('div');
    body.id = "upvoteModalBody";
    modalContent.appendChild(body);
    const userList = document.createElement('ul');
    userList.id = "upvoteList";
    body.appendChild(userList);
    // error message if the user hasn't signed in
    const errorMsg = document.createElement('h2');
    errorMsg.classList.add('error-msg');
    errorMsg.id = "upvoteError";
    errorMsg.textContent = "Uh Oh! Sign-In First to View Users Who Upvoted!";
    body.appendChild(errorMsg);
    // error message if there are no upvotes yet
    const noUpvotesMsg = document.createElement('h2');
    noUpvotesMsg.classList.add('error-msg');
    noUpvotesMsg.id = "noUpvotes";
    noUpvotesMsg.textContent = "Be The First To Upvote This Post!";
    body.appendChild(noUpvotesMsg);


    upvoteModalClose();
};

// TODO: Loading Screen?
function showUpvotes(apiUrl, response, index) {
    const upvoteModal = document.getElementById('upvoteModal');
    const modalList = document.getElementById('upvoteList');

    // edit the modal dynamically while fetching user ids
    // by looping through upvotes array in the post
    // if the user is not logged in, then display a message to log in >:(
    upvoteModal.style.display = "block";

    if (sessionStorage.getItem("loginToken") === null) {
        const errorMsg = document.getElementById('upvoteError');
        errorMsg.style.display = "block";
        return;
    } else if (response.posts[index].meta.upvotes.length === 0) {
        // no one has upvoted yet, so display a message
        const noUpvotesMsg = document.getElementById('noUpvotes');
        noUpvotesMsg.style.display = "block";
        return;
    }

    for (let i = 0; i < response.posts[index].meta.upvotes.length; i++) {
        let userID = response.posts[index].meta.upvotes[i];
        // the following fetches user info based on the userID provided from
        // the response. 
        const token = "Token " + sessionStorage.getItem("loginToken");

        const options = {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        };

        fetch((`${apiUrl}/user?id=` + userID), options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                var username = response.username;
                // adds a list element in the modal content
                let user = document.createElement('li');
                user.textContent = username;
                modalList.appendChild(user);
            })
    }
};

function upvoteModalClose() {
    // When the user clicks anywhere outside of the modal, close it
    // will also delete all children of the upvotes list
    const upvoteModal = document.getElementById('upvoteModal');
    const modalList = document.getElementById('upvoteList');
    window.addEventListener("click", function(event) {
        if (event.target == upvoteModal) {
            while (modalList.firstChild) {
                modalList.removeChild(modalList.firstChild);
            }

            const errorMsg = document.getElementById('upvoteError');
            errorMsg.style.display = "none";

            const noUpvotesMsg = document.getElementById('noUpvotes');
            noUpvotesMsg.style.display = "none";

            upvoteModal.style.display = "none";
        }
    });
};

// this function is called from function showUpvotes.
// It fetches user information based on the userID provided from the
// feed response.
// TODO: Alert the user to log in if fetch fails
// Apparently can't reutrn stuff from fetch so I had to move this into 
// showUpvotes :(
/*
function fetchUpvotes(apiUrl, userID) {
    const token = "Token " + sessionStorage.getItem("loginToken");

    const options = {
        method: 'GET',
        headers: {
            //'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    fetch((`${apiUrl}/user?id=` + userID), options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // console.log(response.username + ' is their username!');
            // storing the username as a reference in sessionStorage
            sessionStorage.setItem("username", response.username);
        })
} */

// function creates the HTML framework for a post.
function createPostHTML(thumbnailData, upvotes, apiUrl, response) {
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
    upvoteButton.style.width = '100%';
    upvoteButton.textContent = ("/\\");
    upvoteButton.style.textAlign = 'center';
    upvoteDiv.appendChild(upvoteButton);

    // Upvote count div
    const upvoteCounter = document.createElement('div');
    upvoteCounter.textContent = upvotes;
    upvoteCounter.classList.add('upvote-count');
    upvoteCounter.id = ""
    upvoteDiv.appendChild(upvoteCounter);
    upvoteCounter.addEventListener("click", function() {
        // scans through all elements with class upvote-count
        // finds the one that corresponds to the right post
        // index will then refer to the index of the post in the response.json
        const countersArray = document.getElementsByClassName('upvote-count');
        for (let i = 0; i < countersArray.length; i++) {
            if (countersArray[i] === upvoteCounter) {
                var index = i;
            };
        };
        showUpvotes(apiUrl, response, index);
    })

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
    // post text content
    const postText = document.createElement('p');
    postText.id = "postText";
    postText.classList.add('alt-text');
    postText.classList.add('post-text');
    postContent.appendChild(postText);
    postText.textContent = "Sometimes it really be like that";
    // author of the post
    const author = document.createElement('p');
    author.classList.add('post-author');
    author.dataset.idAuthor = "";
    postContent.appendChild(author);
    author.textContent = ('By @XxBigWeeb69xX');
    // includes which subseddit and time since posted
    const postInfo = document.createElement('p');
    postInfo.classList.add('extra-info');
    postInfo.textContent = ('s/anime, 2hrs');
    postInfo.style.fontSize = "10px";
    postContent.appendChild(postInfo);
    // includes number of comments, underlined
    const commentCount = document.createElement('p');
    commentCount.classList.add('comment-count');
    commentCount.textContent = ('420 comments');
    commentCount.style.fontSize = "10px";
    postContent.appendChild(commentCount);

    const thumbnailBox = document.createElement('div');
    thumbnailBox.classList.add('post-thumbnail');
    if (thumbnailData === null) {
        thumbnailBox.style.display = "none";
    } else {
        const img = document.createElement('img');
        // took an image from local storage as a placeholder
        // img.src = "../images/1_q.jpg";
        img.src = 'data:image/png;base64,' + thumbnailData;
        thumbnailBox.appendChild(img);
    }

    post.appendChild(thumbnailBox);

    post.appendChild(postContent);
};

// converts the unix timestamp given from fetching post data into normal time
// appropriated from https://makitweb.com/convert-unix-timestamp-to-date-time-with-javascript/ by Yogesh Singh
// on 12-08-2019
function convertTime(unixTime) {
    // Months
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Convert unix time to milliseconds
    const date = new Date(unixTime * 1000);

    const year = date.getFullYear();
    const month = monthsArray[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    // Combines all to display time in dd-mm-yy-hh:mm:ss
    const convertedTime = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return convertedTime;
};

export default initApp;
