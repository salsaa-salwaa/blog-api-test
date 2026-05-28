const request = require('supertest')
const app = require('../src/app')
const { User, Post, sequelize } = require('../models')

let token
let postId

beforeAll(async () => {
  const user = await User.findOne({
    where: { email: 'posttest@example.com' }
  })

  if (user) {
    await Post.destroy({
      where: { authorId: user.id }
    })

    await User.destroy({
      where: { id: user.id }
    })
  }

  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Post Tester',
      email: 'posttest@example.com',
      password: '123456'
    })

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'posttest@example.com',
      password: '123456'
    })

  token = res.body.token
})

afterAll(async () => {
  const user = await User.findOne({
    where: { email: 'posttest@example.com' }
  })

  if (user) {
    await Post.destroy({
      where: { authorId: user.id }
    })

    await User.destroy({
      where: { id: user.id }
    })
  }

  await sequelize.close()
})

describe('Post Endpoints', () => {
  it('should fail create post without token', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        content: 'No token'
      })

    expect(res.statusCode).toBe(401)
  })

  it('should create a post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Test post content'
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('data')

    postId = res.body.data.id
  })

  it('should get all posts', async () => {
    const res = await request(app)
      .get('/api/posts')

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('data')
  })

  it('should get post by id', async () => {
    const res = await request(app)
      .get(`/api/posts/${postId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('data')
  })

  it('should update a post', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Updated content'
      })

    expect(res.statusCode).toBe(200)
  })

  it('should delete a post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
  })
})