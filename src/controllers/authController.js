const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

module.exports = {
  // Register
  async register(req, res) {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'Name, email, dan password wajib diisi!'
        })
      }

      const existingUser = await User.findOne({ where: { email } })

      if (existingUser) {
        return res.status(400).json({
          message: 'Email sudah terdaftar'
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
        name,
        email,
        password: hashedPassword
      })

      return res.status(201).json({
        message: 'Register berhasil',
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message
      })
    }
  },

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email dan password wajib diisi'
        })
      }

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(401).json({
          message: 'Email atau password salah'
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(401).json({
          message: 'Email atau password salah'
        })
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d'
        }
      )

      return res.status(200).json({
        message: 'Login berhasil',
        token,
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message
      })
    }
  }
}