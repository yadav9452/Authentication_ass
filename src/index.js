const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const { register, login } = require("./controllers/auth.controller");
const productController = require("./controllers/post.controller");
const authenticate=require("./middleware/authenticate");

const app = express();

app.use(express.json());

app.use("/users", userController);


app.use("/register", register);
app.use("/login", login);
app.use("/posts",productController);

app.listen(6000, async () => {
    try {
        await connect();
    } catch (err) {
        console.log('err:', err);
    }
    console.log("Listening on Port 6000");
});
