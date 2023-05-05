const fs = require("fs");
const colorsFigma = require("../colors/color");

function createFileInChildDirectory(fileName, directoryName, content) {
  const childDirectoryPath = `./${directoryName}`;

  // Check if the child directory exists
  if (!fs.existsSync(childDirectoryPath)) {
    fs.mkdirSync(childDirectoryPath);
  }

  const filePath = `${childDirectoryPath}/${fileName}.json`;

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.log(`File ${fileName}.js already exists in ${directoryName}`);
    return;
  }

  // Create the file
  fs.writeFile(filePath, JSON.stringify(content), err => {
    if (err) {
      console.log('Error writing file:', err);
    } else {
      console.log(`File ${filePath} written successfully.`);
    }
  });

  console.log(`New file ${fileName}.js created in ${directoryName}`);
}

function formatTwColors() {
  const data = {
    colors: {}
  }
  for (const color of colorsFigma) {
    for(const shade of color) {
      data.colors[shade.token] = shade.hex
    }
  }

  createFileInChildDirectory("tw-colors", "colors", data);
}

// Example usage: convert all images in a directory called "images" to webp and save them to "webp-images"
formatTwColors();
