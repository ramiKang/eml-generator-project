import fs from "fs";
import path from "path";
import mime from "mime-types";
import { parse } from "csv-parse/sync";

// Static Information
const CSV_PATH = "./dataset/eng_phishing_full_information.csv";
const ATTACHMENT_PATH_ARR = ["./dataset/test.sh"];

// Load CSV
const csvFile = fs.readFileSync(CSV_PATH, "utf-8");

// Parse CSV
const rawCSVDataArr = parse(csvFile, {
  columns: true, // 첫 행을 헤더로 사용
  skip_empty_lines: true,
});

// Remove Null Data
const csvDataArr = rawCSVDataArr?.filter((data) => data?.To);

// Setup Attachment
const attachments = ATTACHMENT_PATH_ARR.map((attachmentPath) => {
  const buffer = fs.readFileSync(attachmentPath);
  const filename = path.basename(attachmentPath);
  const contentType = mime.lookup(attachmentPath) || "application/octet-stream";

  return {
    filename,
    contentType,
    data: buffer,
  };
});

console.log("attachments : ", attachments);
