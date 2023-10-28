const express = require('express');
const config = require ('config');

const mysql = require('mysql');

var connection = mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
})

const appForFavQuotes = express.Router();

appForFavQuotes.post("/:user_id/:quote_id",(request,response)=>{
    var query = `insert into fav_quotes values(${request.params.user_id},${request.params.quote_id})`;
    connection.query(query,(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else
        {
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)

        }
        response.end();
    })
})

appForFavQuotes.post("/:quote_id",(request,response)=>{
    var query = `delete fromfav_quotes where quote_id = ${request.params.quote_id}`;
    connection.query(query,(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json")
            response.write(data)
        }
        else
        {
            console.log(error)
            response.setHeader("Content-Type","application/json")
            response.write(error)

        }
        response.end();
    })
})

module.exports = appForFavQuotes;
