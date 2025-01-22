import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import passport from "passport";
import jwtStrategy from "./auth/strategy";
import booksController from "./controllers/books-controller.js";
import authController from "./controllers/auth-controller.js";
import usersController from "./controllers/users-controller.js";
import reviewsController from "./controllers/reviews-controller.js";

const config = dotenv.config().parsed;

if (!config?.PORT) {
  throw new Error("Environment variable PORT is missing.");
}

const PORT: number = parseInt(config.PORT, 10);

const app: Express = express();

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
