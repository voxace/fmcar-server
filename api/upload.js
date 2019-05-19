const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
const path = require("path");
const uuidv4 = require('uuid/v4');

async function upload(ctx) {

  // Function to move files
  async function moveFile(file) {
    const oldPath = file.path;
    const extension = path.extname(oldPath);
    const newPath = './public/' + uuidv4() + extension;
    await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
    ctx.body = newPath.slice(9);
  }

  // List of files uploaded
  const files = ctx.request.files;

  // Move files to students folder
  await moveFile(files.upload);

}

router.post("/upload", upload);

module.exports = router.routes();