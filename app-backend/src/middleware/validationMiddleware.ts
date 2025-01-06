import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().min(3).max(100).required(),
  }).strict();

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export default validateUser;
