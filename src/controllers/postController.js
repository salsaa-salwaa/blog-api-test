const { Post, User } = require('../../models')

module.exports = {
  // Get all posts
  async getAll(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'email']
          }
        ],
        order: [['createdAt', 'DESC']]
      })

      return res.status(200).json({
        message: 'Berhasil mengambil semua post',
        data: posts
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message
      })
    }
  },

  // Get post by id
  async getById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'email']
          }
        ]
      })

      if (!post) {
        return res.status(404).json({
          message: 'Post tidak ditemukan'
        })
      }

      return res.status(200).json({
        message: 'Berhasil mengambil detail post',
        data: post
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message
      })
    }
  },

  // Create post
  async create(req, res) {
    try {
      const { content } = req.body

      if (!content) {
        return res.status(400).json({
          message: 'Content wajib diisi'
        })
      }

      const post = await Post.create({
        content,
        authorId: req.user.id
      })

      return res.status(201).json({
        message: 'Post berhasil dibuat',
        data: post
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message
      })
    }
  },

  // Update post
  async update(req, res) {
    try {
      const { content } = req.body

      if (!content) {
        return res.status(400).json({
          message: 'Content wajib diisi'
        })
      }

      const post = await Post.findByPk(req.params.id)

      if (!post) {
        return res.status(404).json({
          message: 'Post tidak ditemukan'
        })
      }

      if (post.authorId !== req.user.id) {
        return res.status(403).json({
          message: 'Tidak punya akses'
        })
      }

      await post.update({ content })

      return res.status(200).json({
        message: 'Post berhasil diupdate',
        data: post
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message
      })
    }
  },

  // Delete post
  async delete(req, res) {
    try {
      const post = await Post.findByPk(req.params.id)

      if (!post) {
        return res.status(404).json({
          message: 'Post tidak ditemukan'
        })
      }

      if (post.authorId !== req.user.id) {
        return res.status(403).json({
          message: 'Tidak punya akses'
        })
      }

      await post.destroy()

      return res.status(200).json({
        message: 'Post berhasil dihapus'
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message
      })
    }
  }
}