const request = require("supertest");
const should = require("should"); // 단위 테스트 라이브러리
const app = require("../..");
const models = require("../../models");

describe("GET /sample", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시 ", () => {
    it("유저 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/sample")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("최대 리밋 갯수만큼 응답한다.", (done) => {
      request(app)
        .get("/sample?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시 ", () => {
    it("limit이 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app).get("/sample?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /sample/:id", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/sample/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).get("/sample/one").expect(400).end(done);
    });
    it("id로 유저를 찾을 수 없을 경우 404로 응답한다.", (done) => {
      request(app).get("/sample/999").expect(404).end(done);
    });
  });
});

describe("DELETE /sample/:id", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    it("204를 응답한다.", (done) => {
      request(app).delete("/sample/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).delete("/sample/one").expect(400).end(done);
    });
  });
});

describe("POST /sample", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  describe("성공시", () => {
    let name = "andy",
      body;
    before((done) => {
      request(app)
        .post("/sample")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환한다.", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환한다.", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라매터 누락시 400을 반환한다.", (done) => {
      request(app).post("/sample").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409를 반환한다.", (done) => {
      request(app).post("/sample").send({ name: "alice" }).expect(409).end(done);
    });
  });
});

describe("PUT /sample/:id", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users));
  let name = "chally";
  describe("성공시", () => {
    it("변경된 정보를 응답한다.", (done) => {
      request(app)
        .put("/sample/3")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id일 경우 400을 응답한다.", (done) => {
      request(app).put("/sample/three").expect(400).end(done);
    });
    it("name이 없을 경우 400을 응답한다.", (done) => {
      request(app).put("/sample/3").send({}).expect(400).end(done);
    });
    it("없는 유저일 경우 404를 응답한다.", (done) => {
      request(app).put("/sample/999").send({ name: "user5" }).expect(404).end(done);
    });
    it("이름이 중복일 경우 409를 응답한다.", (done) => {
      request(app).put("/sample/3").send({ name: "bek" }).expect(409).end(done);
    });
  });
});
