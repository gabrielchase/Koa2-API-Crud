import chai from 'chai'
import { stringGen, getRandomInt } from '../utils/utils'

let expect = chai.expect
let assert = chai.assert
let should = chai.should()
        

describe('Utils', () => {
    it('stringGen gives a random string of hardcoded given size', (done) => {
        let newString1 = stringGen(10)
        let newString2 = stringGen(10)
        let newString3 = stringGen(10)
        assert.notEqual(newString1, newString2)
        assert.notEqual(newString1, newString3)
        assert.notEqual(newString2, newString3)
        done()
    })
    it('getRandomInt gives a number between or equal to the min and max given', (done) => {
        const min = 1
        const max = 100
        for(let i = min; i <= max; i++) {
            let num = getRandomInt(min, max)
            expect(num).gte(min)
            expect(num).lte(max)
        }
        done()
    })
})