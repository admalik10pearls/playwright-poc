import fs from 'fs';

/**
 *
 * @param filePath
 * @returns The contents of the specified JSON file as a JavaScript object.
 * @throws Will throw an error if the file does not exist at the specified path.
 * @description This function is used to load test data from a JSON file. It checks if the file exists and then reads and parses its contents. If the file is missing, it throws a descriptive error to help identify the issue.
 */
export function loadTestData(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `❌ Test Data Missing: Could not find file at ${filePath}. Ensure you have added the JSON to the testdata folder.`,
    );
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
