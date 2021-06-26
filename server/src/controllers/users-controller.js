import express from 'express';
import asyncHandler from 'express-async-handler';
import usersService from '../services/users-service.js';
import usersData from '../data/users.js';
import createUserValidator from '../validators/create-user-validator.js';
import validateBody from '../middlewares/validate-body.js';
import transformBody from '../middlewares/transform-body.js';
import serviceErrors from '../common/service-errors.js';

const usersController = express.Router();

usersController

    .post('/', transformBody(createUserValidator), validateBody('user', createUserValidator), asyncHandler(async (req, res) => {
      const result = await usersService.createUser(usersData)(req.body);

      if (result.error === serviceErrors.DUPLICATE_RECORD) {
        res.status(409).json({message: 'Username or email already exists!'});
      } else {
        res.status(201).json(result.data);
      }
    }));

export default usersController;
