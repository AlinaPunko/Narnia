import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from 'store/context/userContext';
import SideMenuLink from 'components/SideMenuLink/sideMenuLink';

import favourite from 'styles/icons/favourite.svg';
import home from 'styles/icons/home.svg';
import upload from 'styles/icons/upload.svg';
import add from 'styles/icons/add.svg';
import authors from 'styles/icons/authors.svg';
import './sideMenu.scss';

export default class SideMenu extends React.PureComponent {
    static propTypes = {
        showMenu: PropTypes.bool.isRequired,
        closeFunction: PropTypes.func.isRequired
    };

    render() {
        let menuClass = 'side-menu';
        if (this.props.showMenu) {
            menuClass += ' side-menu--opened';
        } else menuClass += ' side-menu--closed';

        return (
            <UserContext.Consumer>
                {({ userId, role }) => (
                    <div className={menuClass} onClick={this.props.closeFunction}>
                        <div className="side-menu__header">
                            Book Store
                        </div>
                        <ul className="side-menu__links">
                            <li>
                                <Link to="/">
                                    <SideMenuLink text="Home" icon={home} />
                                </Link>

                            </li>
                            {role === 'admin'
                                && (
                                    <li>
                                        <Link to="/book/0">
                                            <SideMenuLink text="Add book" icon={upload} />
                                        </Link>
                                    </li>
                                )}
                            {role === 'admin'
                                && (
                                    <li>
                                        <Link to="/author/0">
                                            <SideMenuLink text="Add author" icon={add} />
                                        </Link>
                                    </li>
                                )}
                            <li>
                                <Link to="/authors">
                                    <SideMenuLink text="Authors" icon={authors} />
                                </Link>
                            </li>
                            {userId !== ''
                                && (
                                    <li>
                                        <Link to="/favourites">
                                            <SideMenuLink text="Favourite" icon={favourite} />
                                        </Link>
                                    </li>
                                )}
                        </ul>
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}
