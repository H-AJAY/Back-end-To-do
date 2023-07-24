
process.env.TZ = 'UTC';
const app = require('./app');
const config = require('./config/config');
const mongoDb = require('./db/mgdbconnection');
const port = config.app.PORT || 8888;
const host = config.app.HOST || 'localhost';

mongoDb.connect();

var server = app.listen(port, host, () => {
  logger.info('Connected to port ' + port);
});



//Listening

// set port, listen for requests

// routes
const todo = require("./routes/todo");
// connect database
connectDB();

const con = mongoose.connection

con.on("open", () => {
    console.log ("connected...")
});

// cors
app.use(cors({ origin: true, credentials: true }));

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("server is active"));

// use routes
app.use("/api/todo", todo);

// setting up port

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`Server is running on port ${PORT}.`);

});
