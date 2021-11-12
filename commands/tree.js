const fs=require("fs");
const path=require("path");
function treeHelper(dirPath,indent){
    const isFile=fs.lstatSync(dirPath).isFile();
    if(isFile){
        const fileName=path.basename(dirPath);
        console.log(indent,"|---",fileName);
    }
    else{
        const dirname=path.basename(dirPath);
        console.log(indent,"|___",dirname);
        const child=fs.readdirSync(dirPath);
        for(let i=0;i<child.length;i++){
        const childPath=path.join(dirPath,child[i]);
        treeHelper(childPath,indent+"\t");
        }
    }
}
function treeFunc(dirPath){
    if(dirPath==undefined){
        treeHelper(process.cwd()," ");
        return;
    }
    else{
        if(fs.existsSync(dirPath)==false){
            console.log("please enter the valid path");
        }
        else{
            treeHelper(dirPath," ");
        }
    }
}
module.exports={
    treeKey:treeFunc
}