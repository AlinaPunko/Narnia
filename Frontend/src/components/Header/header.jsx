import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';

import './header.scss';
import menu from 'styles/icons/menu.svg';
import more from 'styles/icons/more.svg';

export default class Header extends React.PureComponent {
    static propTypes = {
        openSideMenuFunction: PropTypes.func.isRequired,
        toggleAccountMenuFunction: PropTypes.func.isRequired
    };

    render() {
        const { openSideMenuFunction, toggleAccountMenuFunction } = this.props;
        return (
            <header className="header">
                <button type="button" className="header__button" onClick={openSideMenuFunction}>
                    <Icon icon={menu} iconClassName="header__button-icon" />
                </button>
                <span className="header__title">Book store</span>
                <button type="button" className="header__button" onClick={toggleAccountMenuFunction}>
                    <Icon icon={more} iconClassName="header__button-icon" />
                </button>
            </header>
        );
    }
}
