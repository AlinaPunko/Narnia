import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from 'store/context/userContext';
import SideMenuLink from 'components/SideMenuLink/sideMenuLink';
import serviceWrapper from 'helpers/serviceWrapper';
import userService from 'services/userService';
import localStorageHelper from 'helpers/localStorageHelper';

import signIn from 'styles/icons/signin.svg';
import signUp from 'styles/icons/signup.svg';
import signOut from 'styles/icons/signout.svg';
import account from 'styles/icons/account.svg';
import cart from 'styles/icons/cart.svg';

import './accountMenu.scss';

export default class AccountMenu extends React.PureComponent {
    static propTypes = {
        showMenu: PropTypes.bool.isRequired,
        closeFunction: PropTypes.func.isRequired
    };

    signOutClick = () => {
        this.context.setUserId('');
        this.context.setRole('');
        localStorageHelper.deleteToken();
        serviceWrapper.callService(userService.signOut, null, null);
    }

    render() {
        let menuClass = 'account-menu';
        if (this.props.showMenu) {
            menuClass += ' account-menu--opened';
        } else { menuClass += ' account-menu--closed'; }

        return (
            <UserContext.Consumer>
                {({ userId }) => (
                    <div className={menuClass} onClick={this.props.closeFunction}>
                        <ul className="account-menu__links">
                            {userId === ''
                                && (
                                    <>
                                        <li>
                                            <Link to="/login">
                                                <SideMenuLink text="Sign In" icon={signIn} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/join">
                                                <SideMenuLink text="Sign Up" icon={signUp} />
                                            </Link>
                                        </li>
                                    </>
                                )}
                            {userId !== ''
                                && (
                                    <>
                                        <li>
                                            <Link to="/profile">
                                                <SideMenuLink text="My Profile" icon={account} />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/order">
                                                <SideMenuLink text="Shopping cart" icon={cart} />
                                            </Link>
                                        </li>
                                        <li onClick={this.signOutClick}>
                                            <Link to="/">
                                                <SideMenuLink text="Sign Out" icon={signOut} />
                                            </Link>
                                        </li>
                                    </>
                                )}
                        </ul>
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}

AccountMenu.contextType = UserContext;
