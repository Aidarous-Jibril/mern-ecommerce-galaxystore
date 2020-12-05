import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:  [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    //don't hash if the password is not being added when user registers
    if(!this.isModified('password')){
        next();
    }
    //Other wise hash the password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  

//login mongoose static method
// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

const User = mongoose.model('User', userSchema)
export default User