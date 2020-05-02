import React from 'react';

import FiltersPanel from 'components/search/FiltersPanel/filtersPanel';
import CategoriesPanel from 'components/search/CategoriesPanel/categoriesPanel';
import SearchNameBoxContainer from 'components/search/SearchNameBoxContainer/searchNameBoxContainer';
import SearchAuthorBoxContainer from 'components/search/SearchAuthorBoxContainer/searchAuthorBoxContainer';

import './searchSection.scss';

export default class SearchSection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { isFiltersPanelShown: false };
    }


    openFiltersPanel = () => {
        this.setState({ isFiltersPanelShown: true });
    }

    render() {
        return (
            <div className="search-section">
                <SearchNameBoxContainer openFiltersPanel={this.openFiltersPanel} />
                <SearchAuthorBoxContainer openFiltersPanel={this.openFiltersPanel} />
                {this.state.isFiltersPanelShown
                    && (
                        <>
                            <FiltersPanel />
                            <CategoriesPanel />
                        </>
                    )}
            </div>
        );
    }
}
