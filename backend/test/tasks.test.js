const request = require('supertest')

describe('Tasks API', () => {
  let app
  beforeEach(() => {
    jest.resetModules()
    app = require('../src/server')
  })

  test('GET /api/tasks should return array', async () => {
    const res = await request(app).get('/api/tasks')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('POST /api/tasks validates title', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '' })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  test('POST /api/tasks creates a task', async () => {
    const payload = { title: 'Test task', description: 'desc' }
    const res = await request(app).post('/api/tasks').send(payload)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.title).toBe(payload.title)
  })

  test('PUT /api/tasks/:id updates a task', async () => {
    // create
    const create = await request(app).post('/api/tasks').send({ title: 'To update' })
    const id = create.body.id
    const res = await request(app)
      .put(`/api/tasks/${id}`)
      .send({ title: 'Updated', description: 'new', completed: true })
    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe('Updated')
    expect(res.body.completed).toBe(true)
  })

  test('DELETE /api/tasks/:id removes a task', async () => {
    const create = await request(app).post('/api/tasks').send({ title: 'To delete' })
    const id = create.body.id
    const res = await request(app).delete(`/api/tasks/${id}`)
    expect(res.statusCode).toBe(204)
    // verify not found
    const get = await request(app).get(`/api/tasks/${id}`)
    expect(get.statusCode).toBe(404)
  })
})
