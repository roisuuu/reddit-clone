function loginBasic () {
    const navItems = document.getElementsByClassName("nav-item");
    const loginButton = navItems[1];
    console.log(navItems[1]);
    loginButton.onclick = function () {
        alert("You pressed the login!");     
    };
};

loginBasic();

export default loginBasic;