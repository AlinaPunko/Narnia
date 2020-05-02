import React from 'react';
import { Route } from 'react-router-dom';

import routeURL from 'constants/routing';

export default class Routing extends React.Component {
    render() {
        return (
            <>
                <Route
                    exact
                    path={routeURL.signUpPage.url}
                    component={routeURL.signUpPage.component}
                />
                <Route
                    exact
                    path={routeURL.signInPage.url}
                    component={routeURL.signInPage.component}
                />
                <Route
                    exact
                    path={routeURL.searchPage.url}
                    component={routeURL.searchPage.component}
                />
                <Route
                    exact
                    path={routeURL.favouritesList.url}
                    component={routeURL.favouritesList.component}
                />
                <Route
                    exact
                    path={routeURL.addBookPage.url}
                    component={routeURL.addBookPage.component}
                />
                <Route
                    exact
                    path={routeURL.bookPage.url}
                    component={routeURL.bookPage.component}
                />
                <Route
                    exact
                    path={routeURL.profilePage.url}
                    component={routeURL.profilePage.component}
                />
                <Route
                    exact
                    path={routeURL.authorsPage.url}
                    component={routeURL.authorsPage.component}
                />
                <Route
                    exact
                    path={routeURL.authorPage.url}
                    component={routeURL.authorPage.component}
                />
                <Route
                    exact
                    path={routeURL.orderPage.url}
                    component={routeURL.orderPage.component}
                />
            </>
        );
    }
}
