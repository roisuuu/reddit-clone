/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.
import loginBasic from './login.js';
import signUpBasic from './signUp.js';
// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
  loginBasic();
  signUpBasic();
  // your app initialisation goes here
}

export default initApp;
