import moment from 'moment';

function getDate(value) {
    return moment(value).format('YYYY-MM-DD');
}

function getDateTime(value) {
    return moment(value).format('YYYY-MM-DD HH-MM');
}

export default { getDate, getDateTime };
