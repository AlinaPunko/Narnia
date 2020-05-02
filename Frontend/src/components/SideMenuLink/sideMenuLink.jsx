import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';

import './sideMenuLink.scss';

export default class SideMenuLink extends React.PureComponent {
    static propTypes = {
        icon: PropTypes.object.isRequired,
        text: PropTypes.string.isRequired
    };

    render() {
        const { icon, text } = this.props;
        return (
            <div className="side-menu-link">
                <Icon icon={icon} iconClassName="side-menu-link__icon" />
                <div className="side-menu-link__text">{text}</div>
            </div>
        );
    }
}
