const express=require("express");
const cookieparser=require("cookie-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");

dotenv.config();
const app=express();

connectDB();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: ["http://localhost:5173",
        "http://localhost:5174"
    ]
    credentials: true,
}));

app.use("/api/auth",require("./routes/auth"));
app.use("/api/tasks",require("./routes/tasks"))

app.use(require("./middleware/errorHandler"));//error handler

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));