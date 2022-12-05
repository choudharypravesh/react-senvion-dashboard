import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import contractsData from '../../../../client/containers/admin/contracts/ContractsReducers';
import axios from 'axios';
import AppConstants from '../../../../client/constants/AppConstants';
import MockAdapter from 'axios-mock-adapter';
import CreateContract from '../../../../client/containers/admin/contracts/CreateContract';

it('renders without crashing', () => {
    expect(contractsData(undefined,{type:'unexpected'})).toEqual(
        {
            overviewData: [],
            loadingOverViewData: true,
            contractDetails: {
                available_from: "End of year 1",
                commissioning: 1383091200000,
                contract: 40002639,
                contract_end: 2014156800000,
                contract_start: 1416355200000,
                contract_type: "ISP",
                contractduration_in_years: 18.91666667,
                formula_bonus: "Formel 3 Bonus",
                formula_lds: "Formel 1 Malus",
                garanty: "VG",
                hub_height: "69",
                max_pg: "max",
                number_of_units: 4,
                operating_from: 1377561600000,
                pg_formula: "general development RPI",
                pg_possible: "YES",
                pg_qualifying_date: "19.11",
                remarks: "",
                remuneration_type: "Fixed payment",
                type: "MM92",
                windparc: "GB-BARLOCKHART1"
            },
            currentlyShowing: 'overview',
            selectedContractId:7
        }
    );
});
it('Testing LOADING_CONTRACT_OVERVIEW_DATA ',()=>{
    expect(contractsData(undefined,{
        type:AppConstants.LOADING_CONTRACT_OVERVIEW_DATA,
    })).toEqual( {
            overviewData: [],
            loadingOverViewData: true,
            contractDetails: {
                available_from: "End of year 1",
                commissioning: 1383091200000,
                contract: 40002639,
                contract_end: 2014156800000,
                contract_start: 1416355200000,
                contract_type: "ISP",
                contractduration_in_years: 18.91666667,
                formula_bonus: "Formel 3 Bonus",
                formula_lds: "Formel 1 Malus",
                garanty: "VG",
                hub_height: "69",
                max_pg: "max",
                number_of_units: 4,
                operating_from: 1377561600000,
                pg_formula: "general development RPI",
                pg_possible: "YES",
                pg_qualifying_date: "19.11",
                remarks: "",
                remuneration_type: "Fixed payment",
                type: "MM92",
                windparc: "GB-BARLOCKHART1"
            },
            currentlyShowing: 'overview',
            selectedContractId:7
        }
    );
});
it('Testing Action SET_CURRENTLY_SHOWING from reducer ',()=>{
    expect(contractsData(undefined,{
        type:AppConstants.SET_CURRENTLY_SHOWING,
        payload:{
            show:'overview'
        }
    })).toEqual( {
            overviewData: [],
            loadingOverViewData: true,
            contractDetails: {
                available_from: "End of year 1",
                commissioning: 1383091200000,
                contract: 40002639,
                contract_end: 2014156800000,
                contract_start: 1416355200000,
                contract_type: "ISP",
                contractduration_in_years: 18.91666667,
                formula_bonus: "Formel 3 Bonus",
                formula_lds: "Formel 1 Malus",
                garanty: "VG",
                hub_height: "69",
                max_pg: "max",
                number_of_units: 4,
                operating_from: 1377561600000,
                pg_formula: "general development RPI",
                pg_possible: "YES",
                pg_qualifying_date: "19.11",
                remarks: "",
                remuneration_type: "Fixed payment",
                type: "MM92",
                windparc: "GB-BARLOCKHART1"
            },

            currentlyShowing: 'overview',
            selectedContractId:7
        }
    );
});
it('Testing Action SET_CONTRACT from reducer ',()=>{
    expect(contractsData(undefined,{
        type:AppConstants.SET_CONTRACT,
        payload:{
            selectedContractId:7
        }
    })).toEqual( {
            overviewData: [],
            loadingOverViewData: true,
            contractDetails: {
                available_from: "End of year 1",
                commissioning: 1383091200000,
                contract: 40002639,
                contract_end: 2014156800000,
                contract_start: 1416355200000,
                contract_type: "ISP",
                contractduration_in_years: 18.91666667,
                formula_bonus: "Formel 3 Bonus",
                formula_lds: "Formel 1 Malus",
                garanty: "VG",
                hub_height: "69",
                max_pg: "max",
                number_of_units: 4,
                operating_from: 1377561600000,
                pg_formula: "general development RPI",
                pg_possible: "YES",
                pg_qualifying_date: "19.11",
                remarks: "",
                remuneration_type: "Fixed payment",
                type: "MM92",
                windparc: "GB-BARLOCKHART1"
            },
            currentlyShowing: 'overview',
            selectedContractId:7
        }
    );
});
it('Unit test cases for contracts form', () =>{
    const contractButton = mount(<CreateContract />)
    const buttonTest = contractButton.find('#previous');

    expect(contractButton.state().data.get('tabChange')).toBe(1);

})



