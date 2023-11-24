import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors';


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    }
});


const upload = multer({ storage: storage });

app.post('/uploadpdf', upload.single('files'), (req, res) => {
    // req.file is the 'pdf' file
    console.log(req.file);
    res.send('File uploaded successfully');
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});