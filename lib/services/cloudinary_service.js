'use strict';

const path = require('path');
const cloudinary = require('cloudinary');

module.exports = class CloudinaryService {
  static async upload(files, oldFiles) {
    const urls = {};
    for (const { path: filepath, filename, fieldname  } of files) {
      if (filename !== '') {
        if (oldFiles) {
          cloudinary.uploader.destroy(path.parse(oldFiles[fieldname]).name);
        }
        urls[fieldname] = (await cloudinary.uploader.upload(filepath)).secure_url;
      }
    }
    return urls;
  }

  static destroy(fileUrl) {
    cloudinary.uploader.destroy(path.parse(fileUrl).name);
  }
};
