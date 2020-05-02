import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';

import './tooltip.scss';
import infoIcon from 'styles/icons/info.svg';

export default class Tooltip extends React.PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = { isTooltipVisible: false };
    }

    toggleTooltipVisibility = () => {
        this.setState({ isTooltipVisible: !this.state.isTooltipVisible });
    }

    render() {
        const { text } = this.props;

        return (
            <div onMouseOver={this.toggleTooltipVisibility} onMouseOut={this.toggleTooltipVisibility} className="tooltip">
                <Icon icon={infoIcon} iconClassName="tooltip__icon" />
                {this.state.isTooltipVisible
                && (
                    <span className="tooltip__text">
                        {text}
                    </span>
                )}
            </div>

        );
    }
}
