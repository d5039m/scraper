var requester = require('request')
var cheerio = require('cheerio')


var arrowUrl = 'http://arrow.wikia.com/wiki/List_of_Arrow_episodes'
var flashUrl = 'http://arrow.wikia.com/wiki/List_of_The_Flash_episodes'

var episodes = []


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
                  episodes.push(episode)
                }
             })
        }
      }})

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
                  episodes.push(episode)
                }
             })
        }
  console.log(episodes)
  episodes = episodes.sort(function(a, b) {
    console.log((new Date(a.airdate) > new Date(b.airdate)))
    return ( new Date(a.airdate) > new Date(b.airdate) ? -1 : 1);
  });
  console.log(episodes[0])
  console.log(episodes[1])

  var c = new Date('October 10, 2012')
  var d = new Date('October 7, 2015')

  console.log(c > d)

  } else {
    console.log("We’ve encountered an error: " + error);
  }
});



