process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection')

describe.only('app', () => {
    beforeEach(() => {
        connection.seed.run()
    })
    afterAll(() => {
        connection.destroy()
    })

    describe('/api/topics', () => {
        test('GET - 200 - responds with all topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).toEqual(expect.any(Array))
                    expect(Object.keys(res.body.topics[0])).toEqual(expect.arrayContaining(['slug', 'description']))
                    expect(res.body.topics.length).toBe(3)
                })
        });
    });
});

