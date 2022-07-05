const express = require("express");
const cors = require("cors");

//Database
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const jwt = require("jsonwebtoken");
// jwtkey shoup be private
const jwtkey = "test-key-ecomm-dashboard";

//Create express App
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Oops!! something went wrong..." });
        } else {
            resp.send({ user: result, auth: token });
        }
    });
});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Oops!! something went wrong..." });
                } else {
                    resp.send({ user, auth: token });
                }
            });
        } else {
            resp.send({ result: "No User Found" });
        }
    } else {
        resp.send({ result: "No User Found" });
    }
});

app.post("/add-product", verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(JSON.stringify(result));
});

app.get("/products", verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ results: "No products found" });
    }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No product found" });
    }
});

app.put("/update/:id", verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );

    resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
    let results = await Product.find({
        $or: [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
        ],
    });

    resp.send(results);
});

app.put("/update-profile/:id", verifyToken, async (req, resp) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
});

function verifyToken(req, resp, next) {
    let token = req.headers["authorization"];
    if (token) {
        // incoming token format = "bearer tokenstring"
        // spliting will give us array containing bearer and token string
        token = token.split(" ")[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                resp.status(401).send({
                    result: `Please provide valid token`,
                });
            } else {
                //move it to next call
                next();
            }
        });
    } else {
        resp.status(404).send({ result: "No token found" });
    }
}

app.listen(5000);
