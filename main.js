import fs from "fs";
import path from "path";
import mime from "mime-types";
import { parse } from "csv-parse/sync";
import { eml } from "eml-generator";

// Static Information
const CSV_PATH = "./dataset/eng_phishing_full_information.csv";
const ATTACHMENT_PATH_ARR = ["./dataset/test.sh"];
const SAVE_DIR_PATH = "./dataset/new_eml";

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

// Setup eml DataList
const emlObjectArr = csvDataArr?.map((data) => {
  let emlObject = { to: data?.To, fileName: data?.fileName };

  if (data?.From) emlObject["from"] = data?.From;
  if (data?.Subject) emlObject["subject"] = data?.Subject;
  if (data?.text) emlObject["text"] = data?.text;
  if (data?.html) emlObject["html"] = data?.html;
  if (attachments?.length > 0) emlObject["attachments"] = attachments;

  return emlObject;
});

// Save eml file
emlObjectArr?.forEach?.((emlObject) => {
  const { fileName, ...emailContent } = emlObject;

  const emlContent = eml(emailContent);

  const fileFullPath = `${SAVE_DIR_PATH}/${fileName}.eml`;

  fs.writeFileSync(fileFullPath, emlContent);
  console.log(`Saved: ${fileName}`);
});
