import React from 'react';

import SearchFilterCheckBoxContainer from 'components/search/SearchFilterCheckBoxContainer/searchFilterCheckBoxContainer';

import './categoriesPanel.scss';

export default class CategoriesPanel extends React.PureComponent {
    render() {
        return (
            <section className="categories-panel">
                <SearchFilterCheckBoxContainer title="Adventure" />
                <SearchFilterCheckBoxContainer title="Biorgaphy" />
                <SearchFilterCheckBoxContainer title="Classic" />
                <SearchFilterCheckBoxContainer title="Comic" />
                <SearchFilterCheckBoxContainer title="Detective" />
                <SearchFilterCheckBoxContainer title="Drama" />
                <SearchFilterCheckBoxContainer title="Fairy-tale" />
                <SearchFilterCheckBoxContainer title="Fantasy" />
                <SearchFilterCheckBoxContainer title="Horror" />
                <SearchFilterCheckBoxContainer title="Humor" />
                <SearchFilterCheckBoxContainer title="Poetry" />
                <SearchFilterCheckBoxContainer title="Romance" />
                <SearchFilterCheckBoxContainer title="Sci-fi" />
            </section>
        );
    }
}
