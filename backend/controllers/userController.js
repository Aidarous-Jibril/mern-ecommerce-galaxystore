import asyncHandler from "express-async-handler";
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios'
import User from "../models/userModel.js";
import { createToken, handleErrors } from "../utils/createToken.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

//@ desc, REGISTER USER & CREATE TOKEN, @req Type & route, POST, /api/users/register, @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.send({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: createToken(user._id),
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

  res.send({ email, password });
});


const authUserEmailAndPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: createToken(user._id),
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });

  }
});


//for verifying google login clientId from react tobe same in the backend clientId
const client = new OAuth2Client('467512918612-mnlop54n512qt070c47aqircim7pm1e0.apps.googleusercontent.com');

// @desc: Auth with Google @route:   GET /api/users/google
const authUserWithGoogle = asyncHandler(async (req, res) => {
  const { tokenId}  = req.body 
  //compare tokenId from frontend tobe same idToken which we get back from client.verifyIdToken in the backend
  client.verifyIdToken({idToken: tokenId, audience: '467512918612-mnlop54n512qt070c47aqircim7pm1e0.apps.googleusercontent.com'}).then(response => {
   console.log(response.payload)
   const {email, name} = response.payload

   User.findOne({email}).then((currentUser) => {
    if(currentUser){
        // already have this user
        console.log('user is: ', currentUser);
        res.status(200).json({
          _id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          isAdmin: currentUser.isAdmin,
          token: createToken(currentUser._id),
        });
    } else {
        // if not, create user in our db
        new User({
            name,
            email,
            password: email.slice(0, 3)+process.env.JWT_SIGNING_KEY
        }).save().then((newUser) => {
            console.log('created new user: ', newUser);
            res.status(201).json({
                  _id: newUser._id,
                  name: newUser.name,
                  isAdmin: newUser.isAdmin,
                  token: createToken(newUser._id),
                });
        });
    }
  });
 
 })
});

// @desc: Auth with Google @route:   GET /api/users/google
const authUserWithFaceBook = asyncHandler(async (req, res) => {
  const { accessToken, userID}  = req.body 
  // console.log(accessToken, userID)
  let fbGraphUrl =`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  const {data}  = await axios.get(fbGraphUrl)
  console.log(data)
  const {name, email } = data

   User.findOne({email}).then((currentUser) => {
    if(currentUser){
        // already have this user
        console.log('user is: ', currentUser);
        res.status(200).json({
          _id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          isAdmin: currentUser.isAdmin,
          token: createToken(currentUser._id),
        });
    } else {
        // if not, create user in our db
        new User({
            name,
            email,
            password: email.slice(0, 3)+process.env.JWT_SIGNING_KEY
        }).save().then((newUser) => {
            console.log('created new user: ', newUser);
            res.status(201).json({
                  _id: newUser._id,
                  name: newUser.name,
                  isAdmin: newUser.isAdmin,
                  token: createToken(newUser._id),
                });
        });
    }
  });
 

});

//@ desc, Get USER PROFILE, @req Type & route, GET, /api/users/profile, @access Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // res.send('Your prof')
  } else {
    console.log("User not found");
  }
});

//@ desc, UPDATE USER PROFILE, @req Type & route, PUT, /api/users/profile, @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: createToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc: Get All users @req Type & route: GET, /api/user  @access: private for only admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc: Admin Delete user @req Type & route: DELETE, /api/user/:id  @access: private for only admin
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id);

  if(user) {
    await user.remove();
    res.json({message: 'User removed'})
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

//@desc: Admin Gets user By Id to then update, @req Type & route: GET, /api/user/:id  @access: private, only admin
const getAUserById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findById(req.params.id).select('-password')

  if(user) {
    res.status(201).json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});


//@ desc, ADMIN Updates User, @req Type & route, PUT, /api/users/:id, @access Private, Admin only
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


//@ desc, handle contactForm submission, @req Type & route, POST, /api/users/contact-us, @access Public
const customerContacForm = asyncHandler(async (req, res) => {
  const {name, email, message} = req.body;
  console.log(name, email, message)
  var content = `name: ${name} \n email: ${email} \n message: ${message} `


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:  process.env.SMTP_USER_EMAIL,
      pass: process.env.SMTP_USER_PASSWORD,
    }
  });

const mail = {
  from: email,
  to: process.env.FROM_EMAIL,  
  subject: 'New Message from Contact Form',
  text: content
}

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
      status: 'success'
      })
      console.log(data.status)
    }
  })
  //Auto-reply
  transporter.sendMail({
    from: process.env.FROM_EMAIL,  
    to: email,
    subject: "Submission was Successfull",
    text: `Tack för att du kontaktar Oss!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  }, function(error, info){
    if(error) {
        console.log(error);
    } else{
        console.log('Message sent: ' + info.response);
    }
  });
})


export {
  registerUser,
  authUserEmailAndPassword,
  authUserWithGoogle,
  authUserWithFaceBook,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getAUserById,
  updateUser,
  customerContacForm
};
