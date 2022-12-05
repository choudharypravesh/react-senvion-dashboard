import React from 'react'
import BootstrapTableCss from 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from'react-bootstrap-table';
import FaPlus from 'react-icons/lib/fa/plus-circle';
import {Link} from 'react-router'
import {Table, SortDirection, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'
import {List} from 'immutable'
import { connect } from 'react-redux'
import {getDropDownsData, setMode, getContractsOverViewData, setSelectedContractId, setCurrentlyShowing, setSelectedWindPark} from './ContractActions';
import moment from 'moment'
import ContractForm from './CreateContract'
import {postContractDetails} from "../../../actions/AppActions"
import Loader from '../../../components/Loader/Loader';
import FaEdit from 'react-icons/lib/fa/edit';
class Contracts extends React.Component {
    constructor(props) {
        super(props)

        this.state  = {
                           disableHeader: false,
                           headerHeight: 30,
                           height: window.innerHeight < 700 ? 400 : 800,
                           overscanRowCount: 20,
                           rowHeight: 40,
                           rowCount: 1000,
                           scrollToIndex: undefined,
                           sortBy: "index",
                           sortDirection: SortDirection.ASC,
                           useDynamicRowHeight: false
                         };
        this._noRowsRenderer = this._noRowsRenderer.bind(this);
        this._getDatum = this._getDatum.bind(this);
        this._sort = this._sort.bind(this);
        this.getEdit = this.getEdit.bind(this);
        this.showContract = this.showContract.bind(this);
        this.setCurrentlyShowing = this.setCurrentlyShowing.bind(this);
        this.postData=this.postData.bind(this);
    }
    _noRowsRenderer() {
        return <div className={styles.noRows}>No rows</div>;
    }
      _getDatum(list, index) {
        return list.get(index % list.size);
      }
    _sort({ sortBy, sortDirection }) {
        this.setState({ sortBy, sortDirection });
      }
       _isSortEnabled() {
          const  list  = [];
          const { rowCount } = this.state;

          return rowCount <= list.size;
        }
    componentDidMount(){
        let dispatch = this.props.dispatch;
        dispatch(getContractsOverViewData());
        dispatch(getDropDownsData())
    }
    showContract(ev){
        ev.currentTarget.id && this.props.dispatch(setSelectedContractId(ev.currentTarget.id));
        ev.currentTarget.parkId && this.props.dispatch(setSelectedWindPark(ev.currentTarget.parkId))
        this.props.dispatch(setCurrentlyShowing('contractForm'))
        if(ev.currentTarget.id){
            this.props.dispatch(setMode('edit'))
        }else{
            this.props.dispatch(setMode('create'))
        }
    }
    setCurrentlyShowing(show){
        this.props.dispatch(setCurrentlyShowing(show))
    }
    getEdit(row){
        return (<a id={row.rowData.contract} parkId = {row.rowData.windparc} style={{color: '#205081', cursor: 'pointer'}} onClick={this.showContract}><span className="icon" title="Edit"><FaEdit/></span></a>)
    }
    postData(){
        this.props.dispatch(postContractDetails(this.props.contractDetails,this.props.contractYearDetails, this.props.mode));
    }

    render() {
         const selectRow = {
             mode: 'radio' ,
             clickToSelect: true,
            onSelect: this.handleRowSelect
          };
        function priceFormatter(cell, row) {
            return <span title={cell}>{cell}</span>;//'<i class="glyphicon glyphicon-usd"></i> ' + cell;
        }


        const list  = !this.props.loadingOverViewData ? this.props.overviewData : List([{windparc:"GB-BARLOCKHART1",contract:40002639,type:"MM92",commissioning:1383091200000,contract_start:1416355200000,contract_end:2014156800000}]);
        const sortedList = this._isSortEnabled()
              ? list
                  .sortBy(item => item[sortBy])
                  .update(
                    list =>
                      sortDirection === SortDirection.DESC ? list.reverse() : list
                  )
              : list;
         const rowGetter = ({ index }) => this._getDatum(sortedList, index)

         if(this.props.currentlyShowing === 'overview'){
            return(
                        <div className="contracts-container">
                            <div className="text-right">
                                <Link onClick = {this.showContract}
                                      className="btn btn-sm btn-success"><FaPlus style={{fontSize: '15px'}}/>&nbsp;&nbsp;Create Contract</Link>
                            </div>
                            <div className="table-container top-buffer">
                                { this.props.overViewLoader ?
                                    <Loader height = {this.state.height} width={window.innerWidth - 100}/>
                                :
                                    <Table
                                        ref="Table"
                                        disableHeader={this.state.disableHeader}
                                        headerClassName="headerColumn"
                                        headerHeight={this.state.headerHeight}
                                        height={this.state.height}
                                        noRowsRenderer={this._noRowsRenderer}
                                        overscanRowCount={this.state.overscanRowCount}
                                        rowHeight={this.state.useDynamicRowHeight ? this._getRowHeight : this.state.rowHeight}
                                        rowGetter={rowGetter}
                                        rowStyle = {{borderBottom: '1px solid #ddd'}}
                                        rowCount={this.state.rowCount}
                                        scrollToIndex={this.state.scrollToIndex}
                                        sort={this._sort}
                                        sortBy={this.state.sortBy}
                                        sortDirection={this.state.sortDirection}
                                        width={window.innerWidth - 100}
                                      >
                                          <Column
                                            label="Park"
                                            dataKey="windparc"
                                            width={200}
                                            flexGrow = {300}
                                            flexShrink = {200}
                                          />
                                          <Column
                                            label="Type"
                                            dataKey="type"
                                            width={90}
                                            flexGrow = {200}
                                            flexShrink = {100}
                                          />
                                          <Column
                                            label="Contract No."
                                            cellDataGetter={({ rowData }) => rowData.contract}
                                            dataKey="contract"
                                            width={130}
                                            flexGrow = {200}
                                            flexShrink = {100}
                                          />

                                        <Column
                                          width={200}
                                          disableSort
                                          label="Commissioning Date"
                                          dataKey="commissioning"
                                          cellDataGetter={({ rowData }) => moment(new Date(rowData.commissioning)).format('DD MMM YYYY')}
                                          flexGrow = {300}
                                          flexShrink = {200}
                                         />
                                        <Column
                                            width={200}
                                            label="Contract Start"
                                            dataKey="contract_start"
                                            cellDataGetter={({ rowData }) => moment(new Date(rowData.contract_start)).format('DD MMM YYYY')}
                                            flexGrow = {300}
                                            flexShrink = {200}
                                        />
                                        <Column
                                            width={200}
                                            label="Contract End"
                                            dataKey="contract_end"
                                            cellDataGetter={({ rowData }) => moment(new Date(rowData.contract_end)).format('DD MMM YYYY')}
                                            flexGrow = {300}
                                            flexShrink = {200}
                                        />
                                        <Column
                                            width={200}
                                            label="Garanty"
                                            dataKey="garanty"
                                            flexGrow = {300}
                                            flexShrink = {200}
                                        />
                                        <Column
                                            width={200}
                                            label="Contract Type"
                                            dataKey="contract_type"
                                            flexGrow = {300}
                                            flexShrink = {200}
                                        />
                                        <Column
                                            label=""
                                            disableSort
                                            cellRenderer={this.getEdit}
                                            dataKey=""
                                            width={130}
                                            flexGrow = {200}
                                            flexShrink = {100}
                                          />
                                      </Table>
                                  }
                            </div>
                        </div>
                    )
        }else{
            return(<ContractForm selectedContractId = {this.props.selectedContractId} currentlyShowing = {this.props.currentlyShowing} setCurrentlyShowing = {this.setCurrentlyShowing} postData={this.postData}/>)
        }
    }
}

const mapStateToProps = state => {
  const { Contracts } = state
  return {
    contractDetails: Contracts.get('contractDetails'),
    contractYearDetails: Contracts.get('contractYearDetails'),
    mode: Contracts.get('mode'),
    loadingOverViewData: Contracts.get('loadingOverViewData'),
    overviewData: Contracts.get('overviewData'),
    currentlyShowing: Contracts.get('currentlyShowing'),
    selectedContractId: Contracts.get('selectedContractId'),
    overViewLoader: Contracts.get('loadingOverViewData')
  }
}
export default connect(mapStateToProps)(Contracts);
