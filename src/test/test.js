import chai from 'chai'
import chaiHttp from 'chai-http'
let expect = chai.expect
let should = chai.should()

const server = 'http://localhost:3000'

chai.use(chaiHttp);

describe('Todos', () => {
    it('should list ALL todos on /todos GET', (done) => {
        chai.request(server)
            .get('/todo')
            .end((err, res) => {
                for (let todo of res.body) {
                    todo.should.have.property('id')
                }
                res.should.have.status(200)
                done()
            })
    })
    it('should list ONE todos on /todos GET', (done) => {
        chai.request(server)
            .get('/todo/1')
            .end((err, res) => {
                res.body.should.have.length(1)
                res.body[0].should.have.property('id')
                res.should.have.status(200)
                done()
            })
    })
    it('should ADD SINGLE todos on /todos POST', (done) => {
        chai.request(server)
            .post('/todo')
            .send({ title: 'Title test', completed: false })
            .end((err, res) => {
                res.should.have.status(201)
                done()
            })
    })
    it('should EDIT SINGLE todos on /todos PUT', (done) => {
        chai.request(server)
            .put('/todo/1')
            .send({ title: 'Edit title', completed: true })
            .end((err, res) => {
                res.should.have.status(204)
                done()
            })
    })
})