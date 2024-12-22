const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

const connect = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://annguyen300243:93sm5W7sdZjkq4IC@cluster0.re4zb.mongodb.net/android-cuoiki"
        );
        console.log("Connect Success!");
    } catch (error) {
        console.log("Connect Error!");
    }
};

connect();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

const classRoomSchema = new mongoose.Schema({
    fullname: String,
    age: Number,
    gender: Number,
    point: Number,
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const Classroom = new mongoose.model("Classroom", classRoomSchema, "classroom");
const User = new mongoose.model("User", userSchema, "users");

app.get("/getAllClassroom", async (req, res) => {
    const listStudent = await Classroom.find();
    res.json(listStudent);
});

app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({
            username: username,
            password: password,
        });

        res.json(user);
    } catch (error) {
        res.json({});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
