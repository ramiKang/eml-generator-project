import fs from "fs";
import { parse } from "csv-parse/sync";

// Static Information
const CSV_PATH = "./dataset/eng_phishing_full_information.csv";

// Load CSV
const csvFile = fs.readFileSync(CSV_PATH, "utf-8");

// Parse CSV
const rawCSVDataArr = parse(csvFile, {
  columns: true, // 첫 행을 헤더로 사용
  skip_empty_lines: true,
});

// Remove Null Data
const csvDataArr = rawCSVDataArr?.filter((data) => data?.To);

console.log("Check csv data : ", csvDataArr[0]);
