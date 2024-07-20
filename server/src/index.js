import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import passport from "passport";
import jwtStrategy from "./auth/strategy.js";
import booksController from "./controllers/books-controller.js";
import authController from "./controllers/auth-controller.js";
import usersController from "./controllers/users-controller.js";
import reviewsController from "./controllers/reviews-controller.js";

const config = dotenv.config().parsed;
const PORT = config.PORT;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/", authController);
app.use("/books", booksController);
app.use("/users", usersController);
app.use("/reviews", reviewsController);

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
