const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;


function convertImagesToWebp(sourcePath, destinationPath) {

  //joining path of directory 
  const directoryPath = path.join(__dirname, sourcePath);

  // Read the source directory
  fs.readdir(directoryPath, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    // Filter out any non-image files
    const imageFiles = files.filter((file) => /\.(jpe?g|png)$/i.test(file));

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }

    // Convert each image to webp
    for (const file of imageFiles) {
      const sourceFile = `${sourcePath}/${file}`;
      const destinationFile = `${destinationPath}/${file.replace(/\.[^/.]+$/, "")}.webp`;

      console.log(`Converting ${sourceFile} to ${destinationFile}`);

      const output = execSync(`cwebp -q 80 ${sourceFile} -o ${destinationFile}`, { encoding: 'utf-8' });  // the default is 'buffer'
    }

    console.log('Conversion complete!');
  });
}

// Example usage: convert all images in a directory called "images" to webp and save them to "webp-images"
convertImagesToWebp('images', 'images');
