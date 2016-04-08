var requester = require('request')
var cheerio = require('cheerio')

var url = 'http://flash-arrow-order.herokuapp.com/hide/flash+legends/'

requester(url, function (error, response, body) {
  if (!error) {
  	var $ = cheerio.load(body)
      	var rows = $('.episode')
      	for( var i = 0 ; i < rows.length ; i++){
      		var data =rows.eq(i).children('td') //rows.eq(i) == $(rows[i])
      		var message = data.eq(0).html().trim() + ":"+ $(data[3]).html().trim()
      	    // var message = data[0]['children'][0]['data'].trim() + ":" + data[3]['children'][0]['data'].trim()
      		console.log(message)
      	}

        	
  } else {
    console.log("We’ve encountered an error: " + error);
  }

});