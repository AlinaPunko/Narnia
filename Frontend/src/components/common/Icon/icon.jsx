import React from 'react';
import PropTypes from 'prop-types';

export default class Icon extends React.Component {
    static propTypes={
        icon: PropTypes.shape({
            id: PropTypes.string,
            viewBox: PropTypes.string
        }).isRequired,
        iconClassName: PropTypes.string.isRequired
    }

    render() {
        const { icon, iconClassName } = this.props;
        return (
            <svg className={iconClassName} viewBox={icon.viewBox}>
                <use xlinkHref={`#${icon.id}`} />
            </svg>
        );
    }
}
