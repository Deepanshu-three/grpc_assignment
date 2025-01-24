import fs from "fs";

// Function to preprocess the JSON
const preprocessJsonFile = (inputFile, outputFile) => {
  // Read the JSON file
  const rawData = fs.readFileSync(inputFile, "utf8");

  // Parse and process the JSON
  const fixedData = JSON.parse(rawData, (key, value) => {
    if (value && value["$oid"]) {
      return value["$oid"]; // Replace $oid objects with the actual string
    }
    return value;
  });

  // Write the fixed JSON back to a file
  fs.writeFileSync(outputFile, JSON.stringify(fixedData, null, 2), "utf8");
  console.log(`JSON file has been fixed and saved to ${outputFile}`);
};

// Usage
const inputFile = "./questions.json";
const outputFile = "./questions_fixed.json";
preprocessJsonFile(inputFile, outputFile);
