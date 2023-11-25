import fs from "fs";
import PDFParser from "pdf2json";

const processPDF = (filePath) => {
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

      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
};

export const processPDFs = async (files) => {
  const texts = await Promise.all(files.map((file) => processPDF(file.path)));
  return texts.join("\n\n");
};
