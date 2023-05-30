import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/AppErrors";
import { UserService } from "../services/userService";
import { IUser } from "../helpers/dto";
const userService = new UserService();

export class UserController {
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      await userService.validateInsert({
        ...(request.body as IUser),
      });
      const user = await userService.createUser({
        ...(request.body as IUser),
      });

      const secret = "default";
      const token = jwt.sign({ id: user?.id }, secret, { expiresIn: "1d" });

      return response.status(StatusCodes.OK).send({user, token});
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          error:
            err instanceof Error
              ? err.message
              : "Failed to do something exceptional",
        });
    }
  }

  async getUser(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const user = await userService.getUserById(Number(id));
      return response.status(StatusCodes.OK).send(user);
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          error:
            err instanceof Error
              ? err.message
              : "Failed to do something exceptional",
        });
    }
  }

  async getAllUsers(request: Request, response: Response): Promise<Response> {
    try {
      const users = await userService.getAllUsers();
      return response.status(StatusCodes.OK).send(users);
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          error:
            err instanceof Error
              ? err.message
              : "Failed to do something exceptional",
        });
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const updatedUser = await userService.updateUser(Number(id), {
        ...(request.body as IUser),
      });
      return response.status(StatusCodes.OK).send(updatedUser);
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          error:
            err instanceof Error
              ? err.message
              : "Failed to do something exceptional",
        });
    }
  }

  async findManagedGroupsByUserId(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const id = request.params.id;
      const groups = await userService.findManagedGroupsByUserId(Number(id));
      return response.status(StatusCodes.OK).send(groups);
    } catch (err) {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message });
      }
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          error:
            err instanceof Error
              ? err.message
              : "Failed to do something exceptional",
        });
    }
  }
}
