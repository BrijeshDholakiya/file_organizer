#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let organizeObj = require("./commands/organize");
let treeObj = require("./commands/tree");
let helpObj = require("./commands/tree");


let command = inputArr[0];

switch (command) {
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "organize":
    organizeObj.organizeKey(inputArr[1]);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default:
      "Please 🙏 Enter right command";
    break;
}
