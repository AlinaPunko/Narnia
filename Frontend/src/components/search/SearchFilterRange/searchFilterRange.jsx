import React from 'react';
import PropTypes from 'prop-types';

import './searchFilterRange.scss';

export default class SearchFilterRange extends React.PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        minValue: PropTypes.number.isRequired,
        maxValue: PropTypes.number.isRequired,
        onInput: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { currentValue: this.props.maxValue };
    }

    changeSliderValue = (e) => {
        const currentValue = e.currentTarget.value;
        this.setState({ currentValue });
        const filter = {
            type: this.props.type,
            value: currentValue
        };
        this.props.onInput(filter);
    }

    render() {
        const {
            title, minValue, maxValue
        } = this.props;
        const { currentValue } = this.state;

        return (
            <div className="search-filter-range">
                <div className="search-filter-range__title">{title}</div>
                <div className="search-filter-range__value">{currentValue}</div>
                <input
                    className="search-filter-range__slider"
                    onChange={this.changeSliderValue}
                    type="range"
                    defaultValue={maxValue}
                    min={minValue}
                    max={maxValue}
                />
            </div>
        );
    }
}
