import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppErrors';
import { IUser } from '../helpers/dto';

class UserService {
  async createUser({
    name,
    email,
    password,
    favoriteSport,
    age,
    address
  }: IUser) {
    const user = {
        name,
        email,
        password,
        favoriteSport,
        age,
        address
    };

    const createdUser = await prismaClient.user.create({
      data: user
    });

    // @ts-expect-error
    delete createdUser.password;
    return createdUser;
  }

  async validateInsert(userToCreate: IUser) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: userToCreate.email
      }
    });

    if (user) {
      throw new AppError('Email already exists', StatusCodes.BAD_GATEWAY);
    }
  }

  async getUserById(id: number) {
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    });
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }

    // @ts-expect-error
    delete user.password;
    return user;
  }

  async getAllUsers() {
    const users = await prismaClient.user.findMany();
    const usersWithoutPasswords = users.map(user => {
      // @ts-expect-error
      delete user.password;
      return user;
    });
    return usersWithoutPasswords;
  }

  async updateUser(
    id: number,
    newData: IUser
  ) {
    const {
        name,
        email,
        password,
        favoriteSport,
        age,
        address
    } = newData;
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    });
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id
      },
      data: {
        name,
        email,
        password,
        favoriteSport,
        age,
        address
      }
    });
    // @ts-expect-error
    delete updatedUser.password;
    return updatedUser;
  }

  async verifyIfExists(id: number) {
    await prismaClient.user.findFirstOrThrow({
      where: {
        id
      }
    });
  }
}

export { UserService };