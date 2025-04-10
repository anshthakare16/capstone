const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  const params = new URLSearchParams(event.rawQuery);
  const selectedClass = params.get("class");

  const classToFileMap = {
    "AIDS": "aids_students.csv",
    "CSE A": "csa_a_students.csv",
    "CSE B": "cse_b_students.csv"
  };

  const filename = classToFileMap[selectedClass];

  if (!filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid class selected." })
    };
  }

  const filePath = path.join(__dirname, "../../data", filename);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return {
      statusCode: 200,
      body: JSON.stringify({ students: lines })
    };
  } catch (err) {
    console.error("Error reading student file:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load student list." })
    };
  }
};
