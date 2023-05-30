import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';

const userService = new UserService();

export class AuthController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    const secret = 'default';
    const user = await userService.getUserByEmail(email);

    if (password !== user?.password) {
      return response.sendStatus(StatusCodes.NOT_FOUND);
    }

    const token = jwt.sign({ id: user?.id }, secret, { expiresIn: '1d' });

    // @ts-expect-error
    delete user.password;

    return response.json({
      user,
      token
    });
  }
}