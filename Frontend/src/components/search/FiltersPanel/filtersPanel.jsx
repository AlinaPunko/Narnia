import React from 'react';

import filterType from 'constants/filterType';
import sliderValue from 'constants/sliderValue';
import SearchFilterRangeContainer from 'components/search/SearchFilterRangeContainer/searchFilterRangeContainer';


export default class FiltersPanel extends React.Component {
    render() {
        return (
            <>
                <SearchFilterRangeContainer
                    type={filterType.pages}
                    minValue={sliderValue.minPages}
                    maxValue={sliderValue.maxPages}
                    title="Pages"
                />
                <SearchFilterRangeContainer
                    type={filterType.price}
                    minValue={sliderValue.minPrice}
                    maxValue={sliderValue.maxPrice}
                    title="Price"
                />
                <SearchFilterRangeContainer
                    type={filterType.publishingYear}
                    minValue={sliderValue.minPublishingYear}
                    maxValue={sliderValue.maxPublishingYear}
                    title="Publushing Year"
                />
            </>
        );
    }
}
