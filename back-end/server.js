const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');

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

app.post('/uploadpdf', upload.single('pdf'), (req, res) => {
    // req.file is the 'pdf' file
    console.log(req.file);
    let dataBuffer = fs.readFileSync(req.file.path);

    pdfParse(dataBuffer).then(function(data) {
        // data.text contains the extracted text
        // Call a function to process this text
        const pattern = /\b\d+\.\s*(.*?)\s*(?=\b\d+\.|\bPART B\b)/gs;
        const questions = [...data.text.matchAll(pattern)].map(match => match[1].trim());
        
        questions.forEach((question, index) => {
            console.log(`Question ${index + 1}: ${question}`);
        });
    });
    res.send('File uploaded successfully');
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});