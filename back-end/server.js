import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import { processPDFs } from "./pdfProcesssor.js";
import { usePDFText } from "./palmInt.js";

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
  try {
    const combinedText = await processPDFs(req.files);
    await usePDFText(combinedText); // Pass the combined text to usePDFText
    res.send("Files processed successfully.");
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
