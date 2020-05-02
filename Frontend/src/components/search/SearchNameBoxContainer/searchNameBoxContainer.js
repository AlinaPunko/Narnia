import { connect } from 'react-redux';

import { setFilterByName } from 'store/actions';
import SearchNameBox from 'components/search/SearchNameBox/searchNameBox';

const mapStateToProps = (state) => ({
    searchNameQuery: state.searchNameQuery
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (searchNameQuery) => dispatch(setFilterByName(searchNameQuery))
});


export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchNameBox);
