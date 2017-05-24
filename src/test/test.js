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
                res.should.have.status(200)
                done()
            })
    })
})