function signUpBasic () {
    const navItems = document.getElementsByClassName("nav-item");
    const signUpButton = navItems[2];
    console.log(navItems[2]);
    signUpButton.onclick = function () {
        alert("You pressed the signup!");     
    };
};

signUpBasic();

export default signUpBasic;