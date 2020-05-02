import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';

export default class Input extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    render() {
        const {
            label,
            name,
            type,
            value,
            onChange
        } = this.props;

        return (
            <div className="input">
                <label className="input__label">{label}</label>
                <input
                    name={name}
                    type={type}
                    value={value}
                    className="input__value"
                    onChange={onChange}
                />
            </div>
        );
    }
}
