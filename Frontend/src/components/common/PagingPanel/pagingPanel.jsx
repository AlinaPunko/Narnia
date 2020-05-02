import React from 'react';
import PropTypes from 'prop-types';

import './pagingPanel.scss';

export default class PagingPanel extends React.Component {
    static propTypes = {
        selectPage: PropTypes.func.isRequired,
        pageNumbers: PropTypes.array.isRequired,
        collectionLength: PropTypes.number.isRequired
    };

    renderPagingPanel(pageNumbers) {
        return pageNumbers.map((number) => (

            <li
                key={number}
                id={number}
            >
                <button
                    type="button"
                    onClick={this.props.selectPage}
                    className="paging-panel__item"
                    id={number}
                    key={number}
                >
                    {number}
                </button>
            </li>
        ));
    }

    render() {
        const { pageNumbers, selectPage, collectionLength } = this.props;
        return (
            <ul className="paging-panel">
                <li
                    id={1}
                    key={1}
                >
                    <button
                        type="button"
                        onClick={selectPage}
                        className="paging-panel__item"
                        id={1}
                        key={1}
                    >
                        &laquo;
                    </button>
                </li>
                {this.renderPagingPanel(pageNumbers)}
                <li
                    id={Math.ceil(collectionLength / 5)}
                    key={Math.ceil(collectionLength / 5)}
                >
                    <button
                        type="button"
                        onClick={selectPage}
                        className="paging-panel__item"
                        key={Math.ceil(collectionLength / 5)}
                        id={Math.ceil(collectionLength / 5)}
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        );
    }
}
