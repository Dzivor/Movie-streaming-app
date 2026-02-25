import { Request, Response, NextFunction } from "express";

import * as yup from "yup";

export const validate = <T extends yup.AnyObject>(schema: yup.ObjectSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = validated as T;

      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }
      next(error);
    }
  };
};
