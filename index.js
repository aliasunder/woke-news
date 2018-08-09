const sslRedirect = require('heroku-ssl-redirect'),
      express = require('express'),
      app = express();

// enable ssl redirect
app.use(sslRedirect());

app.use(express.static(__dirname + '/frontend/build'));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/build/index.html')
})

app.listen(PORT, () => {
    console.log('App listening on port 8080!');
});