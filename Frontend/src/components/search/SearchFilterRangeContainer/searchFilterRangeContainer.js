import { connect } from 'react-redux';
import { setFilter } from 'store/actions';

import SearchFilterRange from 'components/search/SearchFilterRange/searchFilterRange';

const mapStateToProps = (state) => ({
    filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
    onInput: (filter) => dispatch(setFilter(filter))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFilterRange);
