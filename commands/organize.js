const fs=require("fs");
const path=require("path");
let types={
    media:["mp4","mkv"],
    archives:["zip","iso","xz","rar","ar"],
    documents:["pdf","txt","doc","docx","odf","xls","xlsx","odp","odg"],
    app:["exe","dmg","deb","pkg"]
}
function organizeFunc(dirPath){
    let organizePath;
    if(dirPath==undefined){
        organizePath=process.cwd();
        return;
    }
    else{
    if(fs.existsSync(dirPath)==false){
        console.log("please enter the valid path");
        return;
    }
    else{
     organizePath=path.join(dirPath,"organized files");
    if(fs.existsSync(organizePath)==false){
        fs.mkdirSync(organizePath);
        
    }
    organizeHelper(dirPath,organizePath);
    }
}

}
function category(name){
    let ext=path.extname(name);
             ext=ext.slice(1);
             for(let type in types){
                 let arr=types[type];
                 for(let j=0;j<arr.length;j++){
                     if(arr[j]==ext){
                          return type;
                     }
                 }
             }
             return "others";
}
function organizeHelper(dirPath,organizePath){
    const files=fs.readdirSync(dirPath);
    for(let i=0;i<files.length;i++){
        const filePath=path.join(dirPath,files[i]);
        const isFile=fs.lstatSync(filePath).isFile();
        if(isFile){
             const categoryOfFile=category(filePath);
             const categoryPath=path.join(organizePath,categoryOfFile)
             if(fs.existsSync(categoryPath)==false){
                 fs.mkdirSync(categoryPath);
             }
             const fileName=path.basename(filePath);
             const destFile=path.join(categoryPath,fileName);
             fs.copyFileSync(filePath,destFile);
             console.log(files[i],"belongs to",categoryOfFile);
             fs.unlinkSync(filePath);
        }
        
    }
}
module.exports={
    organizeKey:organizeFunc
}