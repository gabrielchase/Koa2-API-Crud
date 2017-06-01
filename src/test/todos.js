import chai from 'chai'
import chaiHttp from 'chai-http'
import fetch from 'node-fetch'
import { stringGen, getRandomInt } from '../utils/utils'

let expect = chai.expect
let assert = chai.assert
let should = chai.should()


const server = 'http://localhost:3000'

chai.use(chaiHttp);

describe('Todos', () => {
    let dbLength

    fetch(`${server}/todos`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            dbLength = data.length
        })
        .catch(err => {
            new Error(err)
        })

    it('should list ALL todos on /todos GET', (done) => {
        chai.request(server)
            .get('/todos')
            .end((err, res) => {
                for (let todo of res.body) {
                    todo.should.have.property('id')
                    todo.should.have.property('title')
                    todo.should.have.property('completed')
                }
                res.should.have.status(200)
                done()
            })
    })
    it('should ADD SINGLE todos on /todos POST', (done) => {
        chai.request(server)
            .post('/todos')
            .send({ title: 'Title test', completed: false })
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.have.property('id')
                res.body.should.have.property('title')
                res.body.should.have.property('completed')
                done()
            })
    })
    it('should list ONE todos on /todos GET', (done) => {
        let id = getRandomInt(1, dbLength)
        chai.request(server)
            .get(`/todos/${id}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.length(1)
                res.body[0].should.have.property('id')
                res.body[0].should.have.property('title')
                res.body[0].should.have.property('completed')
                done()
            })
    })
    it('should EDIT SINGLE todos on /todos PUT', (done) => {
        let oldTodo
        let newTodo
        let id = getRandomInt(1, dbLength)

        chai.request(server).get(`/todos/${id}`).end((err, res) => {
            oldTodo = Object.assign({}, res.body[0])
        })

        let newTitle = stringGen(10)
        let newCompleted = getRandomInt(0, 1) === 0 ? false : true

        chai.request(server)
            .put(`/todos/${id}`)
            .send({ title: newTitle, completed: newCompleted })
            .end((err, res) => {
                res.should.have.status(202)
                newTodo = Object.assign({}, res.body)
                assert.equal(newTodo.id, oldTodo.id)
                assert.notEqual(newTodo, oldTodo)
                done()
            })
    })
})
