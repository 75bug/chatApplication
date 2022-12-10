// external imports
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

// internal imports
import User from "../models/People.js";

// get login page
function getLogin(req, res, next) {
    res.render("index");
}

// do login
async function login(req, res, next) {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (isValidPassword) {
                const userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: "user",
                };

                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                // set cookie 
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true,
                });

                // set logged in user local identifier
                res.locals.loggedInUser = userObject;

                res.render("inbox");
            } else {
                throw createHttpError("Login faile! Please try again.");
                }
            } else {
                throw createHttpError("Login failed! Please try again.");
            }  
    } catch (err) {
        res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

// do logout
function logout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}

export { getLogin, login, logout }; 