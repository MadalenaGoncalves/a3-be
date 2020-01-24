'use strict';

import fs from 'fs';

const PATH_ROOT = process.cwd();

function deleteDir(path, id) {
  try {
    const fullpath = PATH_ROOT + '/' + path + id;  
    if (fs.existsSync(fullpath)) {
      fs.rmdirSync(fullpath);
    }
  } catch (err) {
    throw err;
  }
}

export function deleteFileById(id) {
  try {
    deleteDir(process.env.PATH_IMAGES, id);
    deleteDir(process.env.PATH_THUMBNAILS, id);
  } catch (err) {
    throw err;
  }
}

export function saveFile(file, id) {
  const path = PATH_ROOT + '/' + process.env.PATH_IMAGES + file.name;
  file.mv(path, (error) => {
    if (error) {
      throw error;
    }
    // TODO: handle thumbnail generation and add to the paths
  });
}