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
        it('should accept valid slug, add to db, and return json object', (done)=>{
            const data = {
                url: 'https://google.com',
                slug: 'google'
            }
            chai.request(server)
            .post('/')
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
            })
        });
        it('should reject an invalid slug, return error info', (done)=>{
            const data = {
                url: 'https://google.com',
                slug: 'google'
            }
            chai.request(server)
            .post('/')
            .send(data)
            .end((err, res) =>{
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
            done();
            });
        });
        it('should reject an invalid url, return error info', (done)=>{
            const data = {
                url: '$fgwsefvdafg@##55234'
            };
            chai.request(server)
            .post('/')
            .send(data)
            .end((err, res) =>{
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
            done();
            });
        })
    })
    describe('GET /:slug', () =>{
        it('should redirect if given valid slug', (done) =>{
            chai.request(server)
            .get('/google')
            .end((err, res) =>{
                res.should.redirect;
            done();
            })

        });
        it('should return an error if slug not found', (done) =>{
            chai.request(server)
            .get('/@@fdwsjiasdfh@@')
            .end((err, res) =>{
                res.should.have.status(500);
                res.should.be.a('object');
                res.should.have.property('error');
            done();
            })
        })
    })
    describe('GET /:slug/info', () =>{
        it('should return json object when passed valid slug, with correct count', (done) =>{
            chai.request(server)
            .get('/google/info')
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('dateAdded');
                res.body.should.have.property('destUrl');
                res.body.should.have.property('slug');
                res.body.should.have.property('shortUrl');
                res.body.should.have.property('count');
                res.body.count.should.equal(1);
            done();
            })
        })
        it('should return an error if slug not found', (done) =>{
            chai.request(server)
            .get('/@@fdwsjiasdfh@@/info')
            .end((err, res) =>{
                res.should.have.status(500);
                res.should.be.a('object');
                res.should.have.property('error');
            done();
            })
        })
    })
    describe('POST /:slug', (done) =>{
        it('should return the updated json object when given a valid slug', (done) =>{
            const data = {
                newSlug: "alphabet"
            }
            chai.request(server)
            .post(`/google`)
            .send(data)
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('dateAdded');
                res.body.should.have.property('destUrl');
                res.body.destUrl.should.equal('https://google.com');
                res.body.should.have.property('slug');
                res.body.slug.should.equal('alphabet');
                res.body.should.have.property('shortUrl');
                res.body.should.have.property('count');
                res.body.count.should.equal(1);
            done();
            })
        })
    })
    describe('POST /:slug/delete', (done) =>{
        it('should return status 200 to confirm url has been deleted', (done) =>{
            chai.request(server)
            .post('/alphabet/delete')
            .end((err, res) =>{
                res.should.have.status(200);
            done();
            })
        })
    })
});