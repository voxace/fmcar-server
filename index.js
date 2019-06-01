const config = require("./config");
const Koa = require("koa");
const cors = require("@koa/cors");
const routes = require("./routes");
const logger = require("koa-logger");
const bodyParser = require("koa-body");
const mongoose = require("mongoose");
const serve = require("koa-static");
const jwt = require('koa-jwt');

const app = new Koa();
app.use(cors());

//Set up body parsing middleware
app.use(
  bodyParser({
    formidable: { 
      uploadDir: "./uploads",
      keepExtensions: true
    },
    multipart: true,
    urlencoded: true
  })
);

// Serve static files from public directory
app.use(serve('public'));

// Connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongo.connection,
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
mongoose.connection
  .once("open", function() {
    console.log("Mongodb Connection made");
  })
  .on("error", function(error) {
    console.log("Connection error", error);
  });

// Enable logger
app.use(logger());

// Error Handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

// Custom 401 handling for koa-jwt errors
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

//app
//  .use(jwt({ secret: config.jwt.key })
//  .unless({ path: [/^\/api\/auth\/*/] } || { path: [/^\/api\/public\/*/] }));

app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(3001, () => {
  console.log(`API server listening on ${config.port}, in ${config.env} mode`);
});