const path = require('path');
const { readdirSync, statSync, renameSync } = require('fs');

const folder = './';
const extension = {
  find: 'dmi',
  replace: 'png',
};

const listAllFilesInFolder = (dir, listAllFiles = []) => {
  const allFiles = readdirSync(dir);

  if (!allFiles) {
    console.log('No files were found in this folder.');
    return;
  }

  if (!extension['find'] || !extension['replace']) {
    console.log('Extensions cannot be empty.');
    return;
  }

  allFiles.forEach((file) => {
    if (statSync(path.join(dir, file)).isDirectory()) {
      listAllFiles = listAllFilesInFolder(path.join(dir, file), listAllFiles);
      return;
    }

    if (file.includes(extension['find'])) {
      const name =
        file.split('.')[0].replace(/\s/g, '_') + `.${extension['replace']}`;
      const srcFile = path.join(dir, file);
      const modifySrcFile = path.join(dir, name);
      listAllFiles.push({
        file: srcFile,
        newFile: modifySrcFile,
      });
    }
  });

  return listAllFiles;
};

listAllFilesInFolder(folder).forEach((f) => renameSync(f.file, f.newFile));
