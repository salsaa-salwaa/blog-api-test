const request = require('supertest')
const app = require('../src/app')
const { User, Post, sequelize } = require('../models')

beforeAll(async () => {
  const user = await User.findOne({
    where: { email: 'test@example.com' }
  })

  if (user) {
    await Post.destroy({
      where: { authorId: user.id }
    })

    await User.destroy({
      where: { email: 'test@example.com' }
    })
  }
})

afterAll(async () => {
  const user = await User.findOne({
    where: { email: 'test@example.com' }
  })

  if (user) {
    await Post.destroy({
      where: { authorId: user.id }
    })

    await User.destroy({
      where: { email: 'test@example.com' }
    })
  }

  await sequelize.close()
})

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('message', 'Register berhasil')
  })

  it('should fail register if email already exists', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      })

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message', 'Email sudah terdaftar')
  })

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: '123456'
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      })

    expect(res.statusCode).toBe(401)
  })
})