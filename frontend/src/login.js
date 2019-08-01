function loginBasic () {
    const navItems = document.getElementsByClassName("nav-item");
    const loginButton = navItems[1];
    console.log(navItems[1]);

    // function that creates a login modal, with html and css

    loginButton.onclick = function () {
        // summon the modal,
        // exit if clicked anywhere else
        /* 
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        */
        alert("You pressed the login!");     
    };
};

function createLoginModal() {
    // SUMMON THE HTML!!!!
};

loginBasic();

export default loginBasic;