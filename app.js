const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
const getRouter = require("./routers/getRouters");
const postRouter = require("./routers/postRouters");
const app = express();

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));
app.use(cookie());
app.use(express.urlencoded({extended : true}));
app.use('',getRouter);
app.use('',postRouter);
app.set("view engine", "hbs");

app.listen(2525);