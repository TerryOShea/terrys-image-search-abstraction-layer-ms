'use strict';

const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const imageSearch = require('node-google-image-search');

require('dotenv').config();

//add these to the .env file
MongoClient.connect('mongodb://' + process.env.DB_CREDS + '@ds047146.mlab.com:47146/image-search-abstraction', (err, db) => {
	if (err) return console.log(err)
	var searchesdb = db.collection('searches');

	app.get('/', (req, res) => {
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
  });
	
	app.get('/new_search', (req, res) => {
	  const searchQuery = req.query.search;
	  const page = req.query.page;
	  const when = new Date();
	  var searchArr = [];

	  imageSearch(searchQuery, function(results) {
	    for (let i = 0; i < results.length; i++) {
	      let searchObj = {
	        url: results[i].link,
	        snippet: results[i].snippet,
  	      thumbnail: results[i].image.thumbnailLink, 
	        context: results[i].image.contextLink
	      };
	      searchArr.push(searchObj);
	    }
	    searchesdb.save({ term: searchQuery, when: when }, (err, result) => {
    		if (err) return console.log(err);
      })
  	  res.send(JSON.stringify(searchArr));
	  }, (page-1)*10, 10);
	});
	
	app.get('/recent_searches', (req, res) => {
	  var pastSearches = [];
	  searchesdb.find().sort({ $natural: -1 }).limit(10).each(function(err, search) {
	    if (err) throw err;
	    if (search==null) res.send(JSON.stringify(pastSearches));
	    else {
	      pastSearches.push({ term: search.term, when: search.when });
	    }
	  });
	});
	
	app.listen(process.env.PORT || 3500, () => {
		console.log('listening on 3500');
	});
});