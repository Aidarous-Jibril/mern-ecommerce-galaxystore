import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
       //reg exp
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
    // reg exp
  const filetypes = /jpg|jpeg|png/
  //test uploaded image to be above file name
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
    //this allows to upload all files
  storage,
  // allow specific files
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

//attach above upload to this req, single image tobe uploaded, 
//image must match front end image state piece
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router