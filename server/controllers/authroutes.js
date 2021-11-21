const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const crypto = require("crypto");
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient(15309, 'redis-15309.c290.ap-northeast-1-2.ec2.cloud.redislabs.com');
client.AUTH('5xSlGIhQo6TT7yIPP8MuEmeHQab3mTxu')
const API = axios.create({ baseURL: `https://stuart3.pythonanywhere.com` });
const GAINERS = axios.create({ baseURL: `https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers` });
const LOOSERS = axios.create({ baseURL: 'https://www1.nseindia.com/live_market/dynaContent/live_analysis/losers' });

var gainers = {
    method: 'GET',
    url: 'https://nse-data1.p.rapidapi.com/top_gainers',
    headers: {
        'x-rapidapi-host': 'nse-data1.p.rapidapi.com',
        'x-rapidapi-key': 'af9df1fd18mshe7f31771c051c40p121768jsn5a437a00a65c'
    }
};

var loosers = {
    method: 'GET',
    url: 'https://nse-data1.p.rapidapi.com/top_loosers',
    headers: {
        'x-rapidapi-host': 'nse-data1.p.rapidapi.com',
        'x-rapidapi-key': 'af9df1fd18mshe7f31771c051c40p121768jsn5a437a00a65c'
    }
};

client.on('connect', function () {
    console.log('Connected to redis!');
});

function mergeTwoRandom(arr1, arr2) {

    function extractRandom(arr) {
        let index = Math.floor(Math.random() * arr.length);
        let result = arr[index];
        arr.splice(index, 1);
        return (result);
    }

    let result = [];
    while (arr1.length || arr2.length) {
        if (arr1.length) {
            result.push(extractRandom(arr1));
        }
        if (arr2.length) {
            result.push(extractRandom(arr2));
        }
    }
    return (result);
}

exports.headlines = async (req, res, next) => {
    try {
        if (req.user.plan != null || req.user.plan != undefined || req.user.plan != "") {
            const data = await API.get(`/news/${req.params.req}`);
            return res
                .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: data.data.slice(0, 10) })
        } else { return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST }) }
    } catch (error) {
        console.log(error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.long = async (req, res, next) => {
    try {
        if (req.user.stocks.length === 0) {
            return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: ReasonPhrases.EXPECTATION_FAILED })
        }
        const data = await API.post(`/long`, { stock_list: req.user.stocks });
        return res
            .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: data.data })
    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.short = async (req, res, next) => {
    try {
        if (req.user.stocks.length === 0) {
            return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: ReasonPhrases.EXPECTATION_FAILED })
        }
        const data = await API.post(`/short`, { stock_list: req.user.stocks });
        return res
            .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: data.data })
    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}


exports.marketmovers = async (req, res, next) => {
    try {
        client.get('test', async (error, data) => {
            if (error) {
                console.log(error)
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
            }
            else {
                console.log(data)
                if (data !== null) {
                    return res
                        .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: JSON.parse(data) })
                } else {
                    // console.log(new Date().toLocaleTimeString())
                    // const gainersdata = await GAINERS.get('/niftyGainers1.json')
                    // console.log(gainersdata)
                    // const loosersdata = await LOOSERS.get('/niftyLosers1.json')
                    // console.log(loosersdata.data)
                    // console.log(new Date().toLocaleTimeString())
                    const gainersdata = await axios.request(gainers);
                    const loosersdata = await axios.request(loosers);
                    if (gainersdata.data && loosersdata.data) {
                        const data = mergeTwoRandom(gainersdata.data.body.NIFTY.data, loosersdata.data.body.NIFTY.data);

                        client.setex('test', 3600, JSON.stringify(data))
                        return res
                            .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: data })
                    }
                }
            }
        })

    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}


exports.home = async (req, res, next) => {
    try {
        if (req.user.stocks.length === 0) {
            return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: ReasonPhrases.EXPECTATION_FAILED })
        }
        else {
            const data = await API.post(`/home`, { stock_list: req.user.stocks });
            var loosers = [];
            var gainers = [];
            for (item of data.data.list) {
                if (item.gain < 0) {
                    if (loosers.length != 2) {
                        loosers.push(item)
                    }
                }
                if (item.gain > 0) {
                    if (gainers.length == 2) {
                        gainers[0] = gainers[1]
                        gainers[1] = item
                    }
                    if (gainers.length != 2) {
                        gainers.push(item)
                    }
                }
            }
            if (data.data) {
                return res
                    .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: { best: gainers, worst: loosers } })
            }

        }
    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}

exports.stockInternalData = async (req, res, next) => {
    try {

        if (req.params.time == "1d" || req.params.time == "7d" || req.params.time == "1m" || req.params.time == "6m" || req.params.time == "1y") {
            const data = await API.get(`/historicaldata/${req.params.time}?stktkr=${req.params.ticker}`);
            const getquote = await API.get(`/getquote?stktkr=${req.params.ticker}`)
            const live = await API.get(`/live/${req.params.ticker}`);
            const data2 = await API.get(`/news/${req.params.ticker}`);
            if (data.data && getquote.data) {
                return res
                    .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: { quote: getquote.data, histdata: data.data, live: live.data, news: data2.data.slice(0, 10) } })
            }
        }
        else {
            return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: ReasonPhrases.EXPECTATION_FAILED })
        }
    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}


exports.liveStock = async (req, res, next) => {
    try {
        const live = await API.get(`/live/${req.params.ticker}`);
        if (live.data) {
            return res
                .status(StatusCodes.OK).json({ message: ReasonPhrases.OK, result: { live: live.data } })
        }

    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}