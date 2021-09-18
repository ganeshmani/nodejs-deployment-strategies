const app = require('../server')
const db = require('../app/models/index')

const supertest  = require('supertest')



describe('test Todo APIs',() => {

    let thisDb = db

  // Before any tests run, clear the DB and run migrations with Sequelize sync()
  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
  })

  // After all tersts have finished, close the DB connection
  afterAll(async () => {
    await thisDb.sequelize.close()
  })


  it('test Todo findAll data empty',async () => {
    const response = await supertest(app).get('/api/todos')

    expect(response.status).toBe(200)
  })

  it('Create Todo successfully', async () => {

    const data = {
      title : 'Sample',
      description : 'This is a sample',
      published : true
    }

    const response = await supertest(app).post('/api/todos').send(data).set('Accept','application/json').expect(200)

    expect(response.body.title).toEqual(data.title)
  })

  it('Create Todo and Find All to return', async () => {

    const data = {
      title : 'Sample',
      description : 'This is a sample',
      published : true
    }

    await supertest(app).post('/api/todos').send(data).set('Accept','application/json').expect(200)

    const response = await supertest(app).get('/api/todos')

    expect(response.body.length).toBeGreaterThan(0)
  })

  it('Todo should update successfully', async () => {
    const data = {
      title : 'Sample',
      description : 'This is a sample',
      published : true
    }

    const createResponse = await supertest(app).post('/api/todos').send(data).set('Accept','application/json').expect(200)
    const todo = createResponse.body
    const updateData = {
      title : 'Update',
      description : 'This is a sample',
      published : true
    }

    const updateResponse = await supertest(app).put(`/api/todos/${todo.id}`).send(updateData).set('Accept','application/json').expect(200)

    expect(updateResponse.body.message).toEqual("Todo was updated successfully.")
  })

})