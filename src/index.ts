import express from "express";
import indexRouter from "./routes";

const app = express();
const port = 8080 || process.env.PORT;
app.disable('x-powered-by');

app.use(express.static('build'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');//allow all origin to use it
  res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    res.status(200).json({})
  }
  next();
})

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});