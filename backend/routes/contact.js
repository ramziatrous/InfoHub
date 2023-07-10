const express = require('express');
const { add, del , getByIdUser, getById, update } = require('../controllers/contact');
const router = express.Router();
const verifytoken = require('../config/auth');

const multer = require('multer');


filename = '';
const myStorage = multer.diskStorage({
    destination: './uploads',
    filename:(req,file,redirect) => {
    let fl= Date.now() + '.' + file.mimetype.split('/')[1];
    redirect(null, fl);
    filename=fl;
    }
})
const upload = multer({storage: myStorage});

router.post('/add',verifytoken, upload.single('image'),add);

router.delete('/delete/:id', del );

router.get('/getbyiduser/:iduser',verifytoken, getByIdUser);

router.get('/getbyid/:id',verifytoken, getById);


router.put('/update/:id',upload.single('image'),update);
    module.exports = router;
