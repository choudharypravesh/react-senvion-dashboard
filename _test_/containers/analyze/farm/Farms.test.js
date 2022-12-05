import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Farms from '../../../../client/containers/analyze/farm/Farms';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../../client/store/store';
import App from '../../../../client/containers/App';
import AppConstants from '../../../../client/constants/AppConstants';
import farmData from '../../../../client/containers/analyze/farm/FarmReducers';
import moment from 'moment';



    it('renders without crashing', () => {
        expect(farmData(undefined,{type:'unexpected'})).toEqual(
            {
                selectedTab: 1,
                selectedCountry: "",
                selectedFarm:"",
                initialDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                finalDate: moment().format('YYYY-MM-DD'),
                countriesList: [],
                farmsList: [],
                power: 0,
                windSpeed: 0,
                availTime: 0,
                availGen: 0,
                lpf: 0,
                numberOfAlerts: 0
            }
        );
    });

    it('can handle SET_DATES ',()=>{
        expect(farmData(undefined,{
                type:AppConstants.SET_DATES,
                payload:{
                    initialDate:"2017-07-10",
                    finalDate:"2017-07-17"
                }
        })).toEqual({availGen: 0,
                availTime: 0,
                countriesList: [],
                farmsList: [],
                finalDate: "2017-07-17",
                initialDate: "2017-07-10",
                lpf: 0,
                numberOfAlerts: 0,
                power: 0,
                selectedCountry: "",
                selectedFarm: "",
                selectedTab: 1,
                windSpeed: 0
            }
        );
    });
    it('can handle SELECT_TAB ',()=>{
        expect(farmData(undefined,{
            type:AppConstants.SELECT_TAB,
            payload:{
                id:9
            }
        })).toEqual({availGen: 0,
                availTime: 0,
                countriesList: [],
                farmsList: [],
                finalDate: "2017-07-17",
                initialDate: "2017-07-10",
                lpf: 0,
                numberOfAlerts:0,
                power: 0,
                selectedCountry: "",
                selectedFarm: "",
                selectedTab: 9,
                windSpeed: 0
            }
        );
    });

    it('can handle SELECT_COUNTRY ',()=>{
        expect(farmData(undefined,{
            type:AppConstants.SELECT_COUNTRY,
            payload:{
                countryId:"china"
            }
        })).toEqual({availGen: 0,
                availTime: 0,
                countriesList: [],
                farmsList: [],
                finalDate: "2017-07-17",
                initialDate: "2017-07-10",
                lpf: 0,
                numberOfAlerts:0,
                power: 0,
                selectedCountry: "china",
                selectedFarm: "",
                selectedTab: 1,
                windSpeed: 0
            }
        );
    });
    it('can handle SELECT_FARM ',()=>{
        expect(farmData(undefined,{
            type:AppConstants.SELECT_FARM,
            payload:{
                farm:"Sambres"
            }
        })).toEqual({availGen: 0,
                    availTime: 0,
                    countriesList: [],
                    farmsList: [],
                    finalDate: "2017-07-17",
                    initialDate: "2017-07-10",
                    lpf: 0,
                    numberOfAlerts:0,
                    power: 0,
                    selectedCountry: "",
                    selectedFarm: "Sambres",
                    selectedTab: 1,
                    windSpeed: 0
            }
        );
    });


    it('can handle RECEIVED_POWER_WIND ',()=>{
        expect(farmData(undefined,{
            type:AppConstants.RECEIVED_POWER_WIND,
            payload:{
                wind:10,
                power:9

            }
        })).toEqual({
                availGen: 0,
                availTime: 0,
                countriesList: [],
                farmsList: [],
                finalDate: "2017-07-17",
                initialDate: "2017-07-10",
                lpf: 0,
                numberOfAlerts:0,
                power: 9,
                selectedCountry: "",
                selectedFarm: "",
                selectedTab: 1,
                windSpeed:10
            }
        );
    });


    it('can handle RECEIVED_ALERTS_COUNT ',()=>{
            expect(farmData(undefined,{
                type:AppConstants.RECEIVED_ALERTS_COUNT,
                payload:{
                    numberOfAlerts:5
                }
            })).toEqual({availGen: 0,
                    availTime: 0,
                    countriesList: [],
                    farmsList: [],
                    finalDate: "2017-07-17",
                    initialDate: "2017-07-10",
                    lpf: 0,
                    numberOfAlerts:5,
                    power: 0,
                    selectedCountry: "",
                    selectedFarm: "",
                    selectedTab: 1,
                    windSpeed: 0
                }
            );
    });

    it('can handle RECEIVED_AVAIL_COUNT ',()=>{

        expect(farmData(undefined,{
            type:AppConstants.RECEIVED_AVAIL_COUNT,
            payload:{
                availGen: 6,
                availTime: 8,
                lpf:5
            }

        })).toEqual({
                availGen: 6,
                availTime: 8,
                countriesList: [],
                farmsList: [],
                finalDate: "2017-07-17",
                initialDate: "2017-07-10",
                lpf: 5,
                numberOfAlerts:0,
                power: 0,
                selectedCountry: "",
                selectedFarm: "",
                selectedTab: 1,
                windSpeed: 0
            }
        );
    });
    it('can handle RECEIVED_COUNTRIES_LIST ',()=>{

        expect(farmData(undefined,{
            type: AppConstants.RECEIVED_COUNTRIES_LIST ,
            payload:{
                countriesList:"France",
                countryId:"France"
            }

        })).toEqual({
                availGen: 0,
                availTime: 0,
                countriesList:"France" ,
                farmsList: [],
                finalDate: "2017-07-17",
                initialDate: "2017-07-10",
                lpf: 0,
                numberOfAlerts:0,
                power: 0,
                selectedCountry: undefined,
                selectedFarm: "",
                selectedTab: 1,
                windSpeed: 0
            }
        );
    });
    it('can handle RECEIVED_FARMS_LIST ',()=>{

        expect(farmData(undefined,{
            type: AppConstants.RECEIVED_FARMS_LIST ,
            payload:{
                farmsList:"Renardiere"
            }

        })).toEqual({
                availGen: 0,
                availTime: 0,
                countriesList:[],
                farmsList: "Renardiere",
                finalDate: "2017-07-17",
                initialDate: "2017-07-10",
                lpf: 0,
                numberOfAlerts:0,
                power: 0,
                selectedCountry: "",
                selectedFarm: undefined,
                selectedTab: 1,
                windSpeed: 0
            }
        );
    });


