const   express = require('express'),
        app = express();

app.use(express.static(__dirname + '/build'));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/frontend/build/index.html')
})

app.listen(8080, () => {
    console.log('App listening on port 8080!');
});