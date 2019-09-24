import express from "express";
import indexRouter from "./routes";

const app = express();
const port = 8080 || process.env.PORT;

app.use(express.static("build"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //avoid CORES
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
    res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);

//WildCard handler
app.get("*", (req, res, next) => {
  let err: any = new Error("Page Not Found");
  err.statusCode = 404;
  next(err);
});

//Error handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(`${err.statusCode} - ${err.message}`);
});

app.listen(port, () => {
  //tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
