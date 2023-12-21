const express =require('express');
const router =require('./src/routes/api');
const app= new express();

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require("path");

// Connecting to Database
let URL="mongodb+srv://<username>:<password>@cluster0.9pvozuw.mongodb.net/restaurant-reservation-db?retryWrites=true&w=majority";
let option={user:'codecrew',pass:"Ostad2023",autoIndex:true};
mongoose.connect(URL,option).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

// Configuring Cloudinary
cloudinary.config({
    cloud_name: 'dxnybnujt',
    api_key: '896672376795931',
    api_secret: '7b2tc_9WGdGfNExao9fP2yHV_8k',
});

app.use(cookieParser());
// app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json());

app.use(cors({
    origin: 'https://get-rest.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type',
  }));


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


app.use("/api/v1",router)

app.use((error, req, res, next)=>{
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        messsage: errorMessage,
        stack: error.stack,
    });
});

// app.get("/", function (req, res) {
//     res.send("hello World");
// })

// Add React Front End Routing
// app.get('*',function (req,res) {
//     res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
// })

module.exports=app;