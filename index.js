const express = require('express');

const app = express();

const todoRoutes = require('./routes/todos')

app.use(express.urlencoded({extended: true})) // to parse body of req in urlencoded type
app.use(express.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.sendFile("index.html")
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port: ${port}`)
})