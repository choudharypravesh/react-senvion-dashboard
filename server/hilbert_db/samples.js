'use strict';
var db = require('./schema');
var sequelize = require('sequelize');

function createUser() {
    db.jobs.findOrCreate({
        where: {

            customer_email: 'ashish.shetty@leafair.co.in',
            type: 1,
            subtype: 2,
            payment_method: 2,
            time_slot: 1234,
            date: 1234,
            user_id: 'asdfshsj',
            assigned_by: 'ashish',
            job_details: 'details',
            comment: 'comment',
            customer_feedback: 1,
            technician_feedback: 1,
            start_time: 1234,
            end_time: 12345,
            status: 1
        },
        defaults: {

            customer_email: 'ashish.shetty@leafair.co.in',
            type: 1,
            subtype: 2,
            payment_method: 2,
            time_slot: 1234,
            date: 1234,
            user_id: 'asdfshsj',
            assigned_by: 'ashish',
            job_details: 'details',
            comment: 'comment',
            customer_feedback: 1,
            technician_feedback: 1,
            start_time: 1234,
            end_time: 12345,
            status: 1
        }
    }).spread(function(inserted_data, record_created) {
        if (record_created) {
            console.log('new job added');
        }
        console.log(inserted_data);
    }).catch(function(err) {
        callback(err, null);
    });
}


function simpleCreate() {
    db.jobs.create({
        customer_email: 'ashish.shetty@leafair.co.in',
        type: 1,
        subtype: 2,
        payment_method: 2,
        time_slot: 1234,
        date: 1234,
        user_id: 'asdfshsj',
        assigned_by: 'ashish',
        job_details: 'details',
        comment: 'comment',
        customer_feedback: 1,
        technician_feedback: 1,
        start_time: 1234,
        end_time: 12345,
        status: 1

    }).then(function() {

    }).catch(function(err) {

    });
}

function simpleFind(argument) {
    db.jobs.find({
        where: {
            dth_id: {
                $in: [47, 49, 59, 60, 86]
            },
            channel_id: channel_details.channel_id
        }
    }).then(function() {

    }).catch(function(err) {
        // body...
    });
}

function rawQuery() {
    db.sequelize.query('select * from jobs', {
        type: sequelize.QueryTypes.SELECT
    }).then(function(data) {
        console.log('jobs done');

    }).catch(function(err) {

    });
}

function simpleUpdate() {
    db.jobs.update({
        customer_email: 'abcd@gmail.com'
    }, {
        where: {
            job_id: '1'
        }
    }).then(function() {

    }).catch(function(err) {

    });
}
