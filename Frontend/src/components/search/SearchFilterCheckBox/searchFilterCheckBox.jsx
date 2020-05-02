import React from 'react';
import PropTypes from 'prop-types';

import './searchFilterCheckBox.scss';

export default class SearchFilterCheckBox extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onInput: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            category: this.props.title
        };
    }

    changeValue = () => {
        this.setState({ isChecked: !this.state.isChecked });
        this.props.onInput({
            shouldInclude: !this.state.isChecked,
            category: this.state.category
        });
    }

    render() {
        const {
            title
        } = this.props;

        return (
            <div className="search-filter-checkbox">
                <div className="search-filter-checkbox__title">{title}</div>
                <input
                    className="search-filter-checkbox__checkbox"
                    onChange={this.changeValue}
                    type="checkbox"
                    defaultChecked={this.state.isChecked}
                />
            </div>
        );
    }
}
