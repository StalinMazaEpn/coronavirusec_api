const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const { replaceAll } = require('../lib/utils.js');
const { dateFormatConfig } = require('../config/date-config.js');
const dateFormat = require("dateformat");

const { ProvincesData } = require("../config/main-data");

dateFormat.i18n = dateFormatConfig;
const server_date = new Date();
const dateFormatted = {
    natural_time: dateFormat(server_date, "dddd dd mmmm yyyy, h:MM:ss TT"),
    datetime: dateFormat(server_date, "mm-dd-yyyy HH:MM:ss")
};

// Define the index api route
router.get('/', function (req, res) {
    let urlDatosProvinciales = 'https://www.coronavirusecuador.com/estadisticas-covid-19/';
    request(urlDatosProvinciales, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);
            const data = [];
            $(".wpb_wrapper").each(function () {
                const caption_label = $(this).find('.vcex-milestone-caption').text();
                const caption_value = $(this).find('.vcex-milestone-number').text();
                if (caption_label && caption_label != "") {
                    const label = replaceAll(caption_label.toLowerCase(), " ", "_");
                    const obj = {};
                    obj[label] = caption_value;
                    data.push(obj);
                }
            });
            const json = {
                code: 200,
                requested_at: dateFormatted,
                data,
            };
            res.send(json)
        } else {
            res.status(500).send({
                code: 500,
                requested_at: dateFormatted,
                error,
            });
        }
    });
});

// Define the provincias api route
router.get('/provinces', function (req, res) {
    let urlDatosProvinciales = 'https://www.coronavirusecuador.com/datos-provinciales/';
    request(urlDatosProvinciales, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);
            let headersDataArray = [];
            let bodyDataArray = [];
            let headers = $('.tablepress').find('thead > tr > th').get();

            $(headers).each(function () {
                const theadText = $(this).text();
                const theadFormatted = replaceAll(theadText.toLowerCase(), " ", "_");
                headersDataArray.push(theadFormatted)
            });

            $(".tablepress tbody tr").each(function () {
                let rowDataArray = [];
                let actualData = $(this).find('td');
                if (actualData.length > 0) {
                    actualData.each(function () {
                        rowDataArray.push($(this).text());
                    });
                    bodyDataArray.push(rowDataArray);
                }
            });

            let data = bodyDataArray.map((row_array, index) => {
                const keys = [...headersDataArray];
                const values = [...row_array];
                const merged = keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
                return merged;
            });

            data.splice((data.length) - 1, 1);

            data = data.map((province_row) => {
                const config_province = ProvincesData.filter(province_config => province_config.provincia.toLowerCase() == province_row.provincia.toLowerCase());
                if(config_province && config_province.length > 0){
                    return {...province_row, ...config_province[0]};
                }
                return {...province_row, latitude: null, longitud: null, id: null};
            });

            const json = {
                code: 200,
                requested_at: dateFormatted,
                tz: process.env.TZ,
                data,
                total: data.length,
            };
            res.send(json)
        } else {
            res.status(500).send({
                requested_at: dateFormatted,
                code: 500,
                error,
            });
        }
    });
});

module.exports = router;