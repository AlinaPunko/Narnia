import React from 'react';
import PropTypes from 'prop-types';

import keyboardKeyCode from 'constants/keyboardKeyCode';
import Icon from 'components/common/Icon/icon';

import searchIcon from 'styles/icons/search.svg';
import './searchNameBox.scss';

export default class SearcNamehBox extends React.Component {
    static propTypes = {
        openFiltersPanel: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    onKeyDown = (e) => {
        if (e.keyCode === keyboardKeyCode.enter) {
            e.preventDefault();
            this.props.openFiltersPanel();
            this.props.onChange(this.inputRef.current.value);
        }
    }

    search = () => {
        this.props.openFiltersPanel();
        this.props.onChange(this.inputRef.current.value);
    }

    render() {
        return (
            <div className="search-name-box">
                <input
                    type="text"
                    ref={this.inputRef}
                    placeholder="Search book by name..."
                    className="search-name-box__field"
                    onKeyDown={this.onKeyDown}
                />
                <button
                    type="button"
                    className="search-name-box__button"
                    onClick={this.search}
                >
                    <Icon icon={searchIcon} iconClassName="search-name-box__icon" />
                </button>
            </div>
        );
    }
}
