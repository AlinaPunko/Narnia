import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserContext } from 'store/context/userContext';
import Header from 'components/Header/header';
import SideMenu from 'components/SideMenu/sideMenu';
import AccountMenu from 'components/AccountMenu/accountMenu';
import Routing from 'components/Routing/Routing';

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.setUserId = (userId) => {
            this.setState(() => ({
                userId
            }));
        };

        this.setFavoriteBooks = (favoriteBooks) => {
            this.setState(() => ({
                favoriteBooks
            }));
        };

        this.setRole = (role) => {
            this.setState(() => ({
                role
            }));
        };

        this.state = {
            showSideMenu: false,
            showAccountMenu: false,
            userId: '',
            role: '',
            favoriteBooks: [],
            setFavoriteBooks: this.setFavoriteBooks,
            setUserId: this.setUserId,
            setRole: this.setRole
        };
    }


    openSideMenu = () => {
        this.setState({ showSideMenu: true });
    }

    closeSideMenu = () => {
        this.setState({ showSideMenu: false });
    }

    toggleAccountMenu = () => {
        this.setState({ showAccountMenu: !this.state.showAccountMenu });
    }

    openAccountMenu = () => {
        this.setState({ showAccountMenu: true });
    }

    closeAccountMenu = () => {
        this.setState({ showAccountMenu: false });
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <Router>
                    <div className="App">
                        <Header openSideMenuFunction={this.openSideMenu} toggleAccountMenuFunction={this.toggleAccountMenu} />
                        <SideMenu showMenu={this.state.showSideMenu} closeFunction={this.closeSideMenu} />
                        <AccountMenu showMenu={this.state.showAccountMenu} closeFunction={this.closeAccountMenu} />
                        <Routing />
                    </div>
                </Router>
            </UserContext.Provider>
        );
    }
}
