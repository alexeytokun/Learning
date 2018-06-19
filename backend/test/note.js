let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

let noteId;

describe('/GET notes', () => {
    it('it should GET all the notes', (done) => {
      chai.request(server)
          .get('/notes')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    });
});

describe('/POST note', () => {
    it('it should POST a note ', (done) => {
        let note = {
            title: "Test title",
            text: "Test text"
        }
        chai.request(server)
            .post('/note')
            .send(note)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('text');
                res.body.should.have.property('_id');
                noteId = res.body._id;
            done();
        });
    });
});

describe('/GET/:id note', () => {
    it('it should GET a note by the given id', (done) => {
        let note = {
            title: "Edited title",
            text: "Edited text"
        }

        chai.request(server)
          .get('/note/' + noteId)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('text');
            done();
        });
    });
});

describe('/PUT/:id note', () => {
    it('it should UPDATE a note by the given id', (done) => {
        let note = {
            title: "Edited title",
            text: "Edited text"
        }

        chai.request(server)
            .put('/note/' + noteId)
            .send(note)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql('Edited title');
                res.body.should.have.property('text').eql('Edited text');
            done();
        });
    });
});

describe('/DELETE/:id note', () => {
    it('it should DELETE a note by the given id', (done) => {
        chai.request(server)
            .delete('/note/' + noteId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Note ' + noteId + ' deleted!');
                res.body.result.should.have.property('ok').eql(1);
                res.body.result.should.have.property('n').eql(1);
            done();
        })
    })
})






