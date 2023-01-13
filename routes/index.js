var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET search page. */
router.get('/search', function (req, res, next) {
  // if (!req.headers['authorization']) {
  //   res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Search Page"', 'Content-Type': 'text/plain' });
  //   res.end();
  //   return;
  // }

  res.render('search');

  // fs.readFile('data/users.json', 'utf8', function (err, data) {
  //   if (err) throw err;
  //   let json = JSON.parse(data);
  //   var header = req.headers['authorization'] || '',        // get the header
  //   token = header.split(/\s+/).pop() || '',            // and the encoded auth token
  //   auth = Buffer.from(token, 'base64').toString(),    // convert from base64
  //   parts = auth.split(/:/),                          // split on colon
  //   username = parts[0],
  //   password = parts[1];
  //   user = json.users.find(user => { return user.name.toLowerCase() == username.toLowerCase() });
  //   console.log(`User [ ${username} ] is trying to login.`)
  //   console.log(user && user.password == password)
  //   if (user && user.password == password) {
  //     res.render('search');
  //   } else {
  //     res.send(401, 'Invalid username or password');
  //     next('Incorrect username or password');
  //   }
  // });
});

/* GET all articles. */
router.get('/data/articles', function (req, res, next) {

  fs.readFile('data/data.json', 'utf8', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    res.send(json);
  });
});

/* POST filter articles. */
router.post('/data/search', function (req, res, next) {

  fs.readFile('data/data.json', 'utf8', function (err, data) {
    if (err) throw err;
    let json = JSON.parse(data);
    var keywords = req.body.keywords;

    results = json.articles.filter(article => {
      return article.title.toLowerCase().indexOf(keywords.toLowerCase()) >= 0
    });

    // console.log(results);
    res.send({ articles: results });
    
  });
});

module.exports = router;
