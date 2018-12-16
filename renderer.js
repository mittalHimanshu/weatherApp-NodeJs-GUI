var fs = require('fs');

function mergeContent(values, fileContent){
    for(key in values){
        fileContent = fileContent.replace("{{"+key+"}}", values[key]);
    }
    return fileContent;
}

function view(templateName, values, response){
    var fileContent = fs.readFileSync(`./views/${templateName}.html`, {encoding: "utf8"});
    fileContent = mergeContent(values, fileContent);
    response.write(fileContent);
}

module.exports.view = view;