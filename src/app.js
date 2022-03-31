import { render } from '../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs';

//Import catalogPage, loginOage, registerPage, etc
import { logout as apiLogout } from './api/data.js'
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';


// MAIN  and logoutBtn
const main = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

//Place routing 
page('/', decorateContext, homeDashboard);
page('/catalog', decorateContext, catalogPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);


page.start();


// different Home view for Guest and User
function homeDashboard(ctx, next) {
    ctx.page.redirect('/catalog');
    next();
}

//Middleware
function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

// different Navigation for Guest and User
function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email != null) {
        document.querySelector('div#user > span').textContent = `Welcome,
        ${email}`;
        document.querySelector('#user').style.display = '';
        document.querySelector('#guest').style.display = 'none';

    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = ''
    }
}

// Logout 
async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/catalog')
}

