const path = require("path/posix");
const fs = require("fs");
const types = require("../extensions");

function organizeFn(dirPath) {
  let destinationPath;

  if (dirPath == undefined) {
    destinationPath = process.cwd();
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      destinationPath = path.join(dirPath, "organized_files");
      if (fs.existsSync(destinationPath) == false) {
        fs.mkdirSync(destinationPath);
      }
    } else {
      console.log("Please Enter the Correct the Path");
      return;
    }
  }
  organizeHelper(dirPath, destinationPath);
}

function organizeHelper(source, destination) {
  let filesName = fs.readdirSync(source);

  for (let i = 0; i < filesName.length; i++) {
    let fileAddress = path.join(source, filesName[i]);
    let isFile = fs.lstatSync(fileAddress).isFile();
    if (isFile) {
      
      let category = getCategory(filesName[i]);
        //  console.log(filesName[i] + " belongs to ==> " + category);
        sendFiles(fileAddress, destination, category);
    }
  }
}

function sendFiles(pathOfFiles,destination,category){
    let destinationPath = path.join(destination, category);
    if(fs.existsSync(destinationPath) == false){
        fs.mkdirSync(destinationPath);
    }
    let extractedFileName = path.basename(pathOfFiles);
    let toCopyFilePath = path.join(destinationPath,extractedFileName);
    fs.copyFileSync(pathOfFiles, toCopyFilePath);
    fs.unlinkSync(pathOfFiles);

    console.log(extractedFileName + " Copied to " + category);
}

function getCategory(names) {
  let extension = path.extname(names).slice(1);

  for (let type in types) {
    let extTypeArray = types[type];

    for (let i = 0; i < extTypeArray.length; i++) {
      if (extension == extTypeArray[i]) {
        return type;
      }
    }
  }
  return "Others";
}

module.exports = {
  organizeKey: organizeFn,
};
