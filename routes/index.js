const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const { replaceAll } = require('../lib/utils.js');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

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
                    console.log('caption_label', caption_label)
                    const label = replaceAll(caption_label.toLowerCase(), " ", "_");
                    console.log('caption_value', caption_value)
                    const obj = {};
                    obj[label] = caption_value;
                    data.push(obj);
                }
            });
            const json = {
                code: 200,
                data,
            };
            res.send(json)
        } else {
            res.status(500).send({
                code: 500,
                error,
            });
        }
    });
});

// Define the provincias api route
router.get('/provincias', function (req, res) {
    // The scraping magic will happen here
    let urlDatosProvinciales = 'https://www.coronavirusecuador.com/datos-provinciales/';
    // The structure of our request call
    request(urlDatosProvinciales, function (error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
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
            // let estadisticas = data.splice((data.length) - 1, 1);
            //Remove row that show estadistics
            data.splice((data.length) - 1, 1);

            const json = {
                code: 200,
                data,
                total: data.length
            };
            res.send(json)
        } else {
            res.status(500).send({
                code: 500,
                error,
            });
        }
    });
});

module.exports = router;