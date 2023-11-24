const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors');


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

app.post('/uploadpdf', upload.single('pdf'), (req, res) => {
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