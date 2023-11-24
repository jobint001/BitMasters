import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
import PDFParser from "pdf2json";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/uploadpdf", upload.array("files", 10), async (req, res) => {
  const allTexts = [];

  const processPDF = (file) => {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData) =>
        reject(errData.parserError)
      );
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        const text = pdfData.formImage.Pages.map((page) => {
          return page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(
            " "
          );
        }).join("\n");

        allTexts.push(text);
        resolve();
      });

      pdfParser.loadPDF(file.path);
    });
  };

  try {
    await Promise.all(req.files.map((file) => processPDF(file)));

    // Combine all texts and save to a single file
    const combinedText = allTexts.join("\n\n");
    const outputPath = path.join(
      "uploads",
      "text",
      `combined-${Date.now()}.txt`
    );
    fs.writeFileSync(outputPath, combinedText);

    res.send("Files uploaded and combined into a single text file.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error in processing the PDF files");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Ensure that the 'uploads' and 'uploads/text' directories exist in your project folder.
