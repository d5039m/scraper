var requester = require('request')
var cheerio = require('cheerio')
var http = require('http')
var async = require('async')
var port = 3100

var pug=require('pug')
var fs = require('fs')

var episodes = []

var server = http.createServer();

var requestHandler = function(request, response){
    if(request.url === '/view' ){


      response.write(pug.renderFile('./view.pug',{data:episodes}))
      response.end()
  }else{
      response.statuscode = 404
      response.end()
  }
}

server.on('request', requestHandler)


server.listen(port, function(){
   console.log('Server listening on port ' + port)
})

var arrowUrl = 'http://arrow.wikia.com/wiki/List_of_Arrow_episodes'
var flashUrl = 'http://arrow.wikia.com/wiki/List_of_The_Flash_episodes'

var task1 = function(callback){
  requester(arrowUrl, function (error, response, body) {
  if (!error) {
  	var $ = cheerio.load(body)
      	var tables = $('.wikitable')
        for (var i = 0 ; i < tables.length ; i++){
             var table = tables[i]
             var rows = $(table).children('tr')
      	$(rows).each(function(item){
            var data = $(this).children('td')

            if (data.eq(2).text().trim().length > 0){
                 var episode = {
                    series:'Arrow',
                    name:data.eq(2).text().trim().slice(0, -1).slice(1),
                    number:'S'+ (i+1) + 'E' + data.eq(1).text().trim(),
                    airdate: data.eq(3).text().trim()
                 }
                 // episodes[data.eq(0).text().trim()] = episode
                                   episodes.push(episode)

            }
          })
      }
  } else {
    console.log("We’ve encountered an error: " + error);
  }
  callback(null)
});
}

var task2 = function(callback) {
  requester(flashUrl, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body)
        var tables = $('.wikitable')
        for (var i = 0 ; i < tables.length ; i++){
             var table = tables[i]
             var rows = $(table).children('tr')
             $(rows).each(function(item){
                var data = $(this).children('td')
                if (data.eq(2).text().trim().length > 0){
                  var episode = {
                    series:'Flash',
                    name:data.eq(2).text().trim().slice(0, -1).slice(1),
                    number:'S'+ (i+1) + 'E' + data.eq(1).text().trim(),
                    airdate: data.eq(3).text().trim()
                  }
                  // episodes[data.eq(0).text().trim()] = episode
                  episodes.push(episode)
                }
             })
        }
  } else {
    console.log("We’ve encountered an error: " + error);
  }
  callback(null)

});
}

var asyncTasks = [task1, task2];

async.parallel(asyncTasks, function(err, result){
      episodes.sort(function(a, b) {
         return (new Date(a.airdate) < new Date(b.airdate)) ? -1 : 1;
      });
      console.log('--SORTING COMPLETE--')
});
