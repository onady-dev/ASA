const utils = require('./utils');
const should = require('should');   // 단위 테스트 라이브러리

describe('utils.js 모듈의 capitialize() 함수는 ', ()=>{
    it('문자열을 반환한다.', ()=>{
        const result = utils.capitialize('hello')
        result.should.be.equal('Hello')
    })
})