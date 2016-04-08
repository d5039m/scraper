var requester = require('request')
var cheerio = require('cheerio')
var http = require('http')
var port = 3100

var pug=require('pug')
var fs = require('fs')

var episodes = new Object()


var server = http.createServer(function(request, response){
  response.write(pug.renderFile('./view.pug',{data:episodes}))
  response.end()
})

server.listen(port, function(){
   console.log('Server listening on port ' + port)
})

var url = 'http://arrow.wikia.com/wiki/List_of_Arrow_episodes'


requester(url, function (error, response, body) {
  if (!error) {
  	var $ = cheerio.load(body)
      	var rows = $('tr')
      	$(rows).each(function(item){
            var data = $(this).children('td')

            if (data.eq(2).text().trim().length > 0){
            var episode = {
              name:data.eq(2).text().trim().slice(0, -1).slice(1),
              number:data.eq(0).text().trim(),
              airdate: data.eq(3).text().trim()
            }
            episodes[data.eq(0).text().trim()] = episode
          }
          })
        console.log(episodes)

  } else {
    console.log("We’ve encountered an error: " + error);
  }
});

