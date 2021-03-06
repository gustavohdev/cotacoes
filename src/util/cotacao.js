const request = require('request')

const api_token = 'UnWKQPMQtxr0pby8OejtkO1B6H90YjVXuvqYK0aPTRaQc3JkLEgcruGDtUDC'

const cotacao = (symbol, callback) => {    
    
    const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`
    
    request({url: url, json: true}, (err, response) =>{
        if(err){
            callback({
                mensage : `Something went wrong: ${err}`,
                code : 500
            }, undefined)
        }        
        
        if(response.body === undefined || response.body.data === undefined){
            callback({
                mensage : `No data found`,
                code : 404
            }, undefined)
        }        
        //console.log(response)
        const parsedJSON = response.body.data[0]
        console.log(parsedJSON);
        const {symbol, price_open, price, day_high, day_low, currency, volume} = parsedJSON

        callback(undefined, {symbol, price_open, price, day_high, day_low, currency, volume})
    })
}

module.exports = cotacao