const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const uuid = require("uuid")

router.get('/', (req, res) => {
    res.send('api routes here');
});


router.get('/notes', (req, res) => {
    fs.readFile('db/db.json', {encoding: 'utf8'},(err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        res.json(data);
    });
});


router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();
    fs.readFile('db/db.json', {encoding: 'utf8'}, (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        data.push(newNote);
        data = JSON.stringify(data);
        fs.writeFile('db/db.json', data,(err, data) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});


router.delete('/notes/:id', (req,res) => {
    const idToDelete = req.params.id;
    fs.readFile('db/db.json', {encoding: 'utf8'},(err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        for(var i = 0; i < data.length; i++){
            if(data[i].id == idToDelete){
                data.splice(i, 1);
                data = JSON.stringify(data);
                fs.writeFile('db/db.json', data,(err, data) => {
                    if (err) throw err;
                    res.send('sucess');
                });
            }
        }
    });
});



module.exports = router;