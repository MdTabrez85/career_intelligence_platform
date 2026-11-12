
package com.careerintelligence.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;

@Service
public class ResumeTextExtractor {

    public String extractText(Path filePath, String originalFilename)
            throws IOException {

        if (originalFilename == null || originalFilename.isBlank()) {
            throw new IllegalArgumentException("Filename is required.");
        }

        String filename = originalFilename.toLowerCase(Locale.ROOT);

        if (filename.endsWith(".pdf")) {
            return extractPdfText(filePath);
        }

        if (filename.endsWith(".docx")) {
            return extractDocxText(filePath);
        }

        throw new IllegalArgumentException(
                "Only PDF and DOCX files are supported."
        );
    }

    private String extractPdfText(Path filePath) throws IOException {

        try (PDDocument document = Loader.loadPDF(filePath.toFile())) {

            PDFTextStripper stripper = new PDFTextStripper();

            return stripper.getText(document).trim();
        }
    }

    private String extractDocxText(Path filePath) throws IOException {

        try (InputStream inputStream = Files.newInputStream(filePath);
             XWPFDocument document = new XWPFDocument(inputStream);
             XWPFWordExtractor extractor =
                     new XWPFWordExtractor(document)) {

            return extractor.getText().trim();
        }
    }
}
