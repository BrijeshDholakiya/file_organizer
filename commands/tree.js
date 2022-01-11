let fs = require("fs");
let path = require("path/posix");

function treeFn(dirPath) {
  if (dirPath == undefined) {
    treeFinder(process.cwd(), ""); 
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      treeFinder(dirPath, "");
    } else {
      console.log("Please Enter the Correct the Path");
      return;
    }
  }
}

function treeFinder(dirPath, indent) { 
  let isFile = fs.lstatSync(dirPath).isFile();

  if (isFile == true) {
    let fileName = path.basename(dirPath);
    console.log(indent + "├──" + fileName);
  }
   else {
    let dirName = path.basename(dirPath);
    console.log(indent + "└──" + dirName);
    let childrens = fs.readdirSync(dirPath);
    for(let i = 0; i < childrens.length; i++){
     let childAddress = path.join(dirPath, childrens[i]);
    treeFinder(childAddress, indent + "\t");
    }
}
}

module.exports = {
  treeKey: treeFn,
};
