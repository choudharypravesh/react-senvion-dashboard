import React from 'react'
/*var SelectBox = React.createFactory(require('react-select-box'))*/
import "../../../../public/styles/containers/monitor/Monitor.css";
import SelectBox from 'react-select-box'
import axios from 'axios'
import _ from 'underscore'

//import 'react-select-box/example/select-box.css';


/*var div = React.createElement.bind(null,'div')
var option = React.createElement.bind(null,'option')
var h1 = React.createElement.bind(null,'h1')*/



class Example extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            color: null,
            selectedFarms: [],
            farms: []
        }

        this.handleMultiChange = this.handleMultiChange.bind(this)
        this.getFarms = this.getFarms.bind(this);
    }

    componentDidMount() {
        this.getFarms();

    }

    handleMultiChange(farms) {
        console.log(farms);
        this.setState({ selectedFarms: farms })
    }

    getFarms() {
        var self = this;
        axios.get('/api/get/drop_down/farms')
            .then(function(response) {
                var variablesData = _.map(response.data.data, function(item) {
                    item.value = item.wind_farm;
                    item.label = item.wind_farm;
                    return item;
                })

                self.setState({farms: variablesData, selectedFarm: self.state.selectedFarm});

            }).catch(function(err) {
            console.log(err);
            window.alert("Faliure "+err);
        });
    }



    render() {

        let options = [];
        for(let i=0; i<this.state.farms.length; i++) {
            options.push(<option value={this.state.farms[i].value}>{this.state.farms[i].label}</option>)
        }

        return(

            <div className="example1">

                <SelectBox
                    label="Select Farms"
                    onChange={this.handleMultiChange}
                    value={this.state.selectedFarms}
                    multiple= {true}>
                    {options}
                </SelectBox>
            </div>
        )
    }
}


export default Example
