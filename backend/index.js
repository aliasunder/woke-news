const   express = require('express'),
        app = express();

app.use(express.static('../frontend/build'));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res)=>{
    res.sendFile('../frontend/build/index.html')
})

app.listen(PORT, () => {
    console.log('App listening on port 8080!');
});