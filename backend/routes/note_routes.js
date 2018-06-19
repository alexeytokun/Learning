const ObjectID = require('mongodb').ObjectID;

function checkId(req, res, next) {
    const id = req.params.id;
    if(!/[a-f0-9]{24}/.test(id)) {
        return res.send({'error': 'invalid id'})
    }
    req.id = id;
    next();
}

module.exports = function(app, db) {
    app.get('/note/:id', checkId, (req, res) => {
        const id = req.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'})
            } else {
                res.send(item);
            }
        })
    });

    app.get('/notes', (req, res) => {
        db.collection('notes').find({}).toArray((err, items) => {
            if(err) {
                res.send({'error': 'An error has occurred'})
            } else {
                res.send(items);
            }
        })
    });

    app.post('/note', (req, res) => {
        const note = {
            text: req.body.text,
            title: req.body.title
        };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/note/:id', checkId, (req, res) => {
        const id = req.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send({ message: 'Note ' + id + ' deleted!', result });
            }
        });
    });

    app.put('/note/:id', checkId, (req, res) => {
        const id = req.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text: req.body.text, title: req.body.title};
        db.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        })
    });
};