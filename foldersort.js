let fs = require ("fs");
let extensionsMapping =require("./util.js");

let testFolderPath ="./docs";
let allfiles = fs.readdirSync(testFolderPath);

for( i = 0; i<allfiles.length;i++){
    sortfiles(allfiles[i]);
}
function getExtension(file){
    file =file.split(".");
    return file[1];

}
function checkExtensionFolder(extension){
    let extensionFolderName= testFolderPath;
    for(key in extensionsMapping){
        let extensions = extensionsMapping[key];
        if(extensions.includes(extension)){
            extensionFolderName = extensionFolderName+"/"+key;
            break;
        }
    }
    let isFolderExists = fs.existsSync(extensionFolderName);
    if(!isFolderExists){
        fs.mkdirSync(extensionFolderName);
    }
    return extensionFolderName;

}
function moveFile(file, extensionFolderName){
    let sourceFile= testFolderPath+"/"+file;
    let destinationFile= extensionFolderName+"/"+file;
    fs.copyFileSync(sourceFile,destinationFile);
    fs.unlinkSync(sourceFile);

}

function sortfiles(file){
    let extension = getExtension(file);
    
    let extensionFolderName = checkExtensionFolder(extension);

    moveFile(file, extensionFolderName);
}