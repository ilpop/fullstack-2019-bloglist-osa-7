const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true)

// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useFindAndModify', false)

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // suodatetaan passwordHash eli salasanan tiiviste pois näkyviltä
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User