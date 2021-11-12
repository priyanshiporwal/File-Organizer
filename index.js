const helpFunc=require("./commands/help");
const treeObj=require("./commands/tree");
const organizeObj=require("./commands/organize");
const input=process.argv.slice(2);
const command=input[0];

switch(command){
    case "organize":
        organizeObj.organizeKey(input[1]);
        break;
    case "tree":
        treeObj.treeKey(input[1]);
        break;
    case "help":
        helpFunc();
        break;
    default:
        console.log("please input right command");
        break;  
}



