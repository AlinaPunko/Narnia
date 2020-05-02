import routing from 'constants/routing';

function redirectToHomePage(history) {
    history.push(routing.searchPage.url);
}

function redirectToSignInPage(history) {
    history.push(routing.signInPage.url);
}

export default { redirectToHomePage, redirectToSignInPage };
