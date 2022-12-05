import moment from 'moment';
import ReactCookie from 'react-cookie';
import AppConstants from '../../../constants/AppConstants';
import {Map} from 'immutable'

let initialState = Map({
  orders: [],
  playImage: require('../../../../public/images/icons/play-circle-hover.svg'),
  crossImage: require('../../../../public/images/icons/cross-red-circular-button.svg'),
  tickImage: require('../../../../public/images/icons/checked.svg'),
  options : {
  /*onSizePerPageList: this.sizePerPageListChange.bind(this),*/
  page: 1,  // which page you want to show as default
  sizePerPage: 20,  // which size per page you want to locate as default
  pageStartIndex: 1, // where to start counting the pages
  paginationSize: 3,  // the pagination bar size.
  prePage: 'Prev', // Previous page button text
  nextPage: 'Next', // Next page button text
  firstPage: 'First', // First page button text
  lastPage: 'Last', // Last page button text
  paginationShowsTotal: false,  // Accept bool or function
  paginationPosition: 'bottom'  // default is bottom, top and both is all available
  // hideSizePerPage: true > You can hide the dropdown for sizePerPage
  // alwaysShowAllBtns: true // Always show next and previous button
  // withFirstAndLast: false > Hide the going to First and Last page button
  }
})

const orderListData = (state = initialState, action) => {
    switch(action.type) {
        case AppConstants.GET_ORDERS:
            return state.set('orders',action.payload.res.orders)
        case AppConstants.UPDATE_ORDERS:
            console.log(action.payload);
            return state.set('orders',action.payload.res.orders)
        default:
            return state;

    }
}
export default orderListData;
