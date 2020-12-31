const chai = require('chai');
const chaiHttp = require('chai-http');
const apiV1 = require('../controllers/apiV1');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe("API ", () =>{
    describe('GET /', () =>{
        it('should get the welcome message', (done) =>{
            chai.request(server)
                .get('/')
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message");
                done();
                });
        });
    });
    describe('POST /', () =>{
        it('should generate a random slug, add to db, and return json object', (done) =>{
            const data = {
                url: "https://google.com"
            }
            chai.request(server)
                .post("/")
                .send(data)
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('dateAdded');
                    res.body.should.have.property('destUrl');
                    res.body.should.have.property('slug');
                    res.body.should.have.property('shortUrl');
                    res.body.should.have.property('count');
                    res.body.count.should.equal(0);
                done();
                });
        });
    })
});