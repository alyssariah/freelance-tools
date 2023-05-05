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

function formatMuiColors() {
  const data = {}
  for (const color of colorsFigma) {
    const colorName = color[0].token.split('-')[0];
    
    const colorLevels = colorName + 'Colors';
    data[colorName] = []
    data[colorLevels] = {};
    for(let i=0; i < color.length; i++) {
      data[colorName].push(color[i].hex);
      data[colorLevels][color[i].token.split('-')[1]] = color[i].hex
    }
  }

  createFileInChildDirectory("mui-colors", "colors", data);
}

// Example usage: convert all images in a directory called "images" to webp and save them to "webp-images"
formatMuiColors();
