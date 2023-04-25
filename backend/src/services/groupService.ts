import { StatusCodes } from 'http-status-codes';
import { prismaClient } from '../database/prismaClient';
import { AppError } from '../errors/AppErrors';
import { IGroup } from './../helpers/dto';

class GroupService {
  async createGroup({ 
    name,
    sport,
    minimumAge,
    isPrivate,
    isFree,
    value,
    address,
    additionalInformation,
    adminId
  }: IGroup) {
    const group = {
      name,
      sport,
      minimumAge,
      isPrivate,
      isFree,
      value,
      address,
      additionalInformation,
      admin : {
        connect: { id: adminId }
      }
    };

    const createdGroup = await prismaClient.group.create({
      data: group
    });

    return createdGroup;
  }

  async getGroupById(id: number) {
    const group = await prismaClient.group.findFirst({
      where: {
        id
      }
    });
    if (!group) {
      throw new AppError('Group not found', StatusCodes.NOT_FOUND);
    }
    return group;
  }

  async getAllGroups() {
    const groups = await prismaClient.group.findMany();
    return groups;
  }

  async updateGroup(id: number, { 
    name,
    sport,
    minimumAge,
    isPrivate,
    isFree,
    value,
    address,
    additionalInformation,
    adminId 
  }: IGroup) {
    this.verifyIfExists(id);
    const group = {
      name,
      sport,
      minimumAge,
      isPrivate,
      isFree,
      value,
      address,
      additionalInformation,
      adminId
    };
    const updatedGroup = await prismaClient.group.update({
      where: {
        id
      },
      data: group
    });
    return updatedGroup;
  }

  async getUsersByGroup(id: number) {
    this.verifyIfExists(id);
    const users = await prismaClient.user.findMany({
      where: {
        groups: {
          some: {
            id
          }
        }
      }
    });
    const usersWithoutPasswords = users.map(user => {
      // @ts-expect-error
      delete user.password;
      return user;
    });
    return usersWithoutPasswords;
  }

  private async verifyIfExists(id: number) {
    const group = prismaClient.group.findFirst({
      where: {
        id
      }
    });

    if (!group) {
      throw new AppError('Group not found', StatusCodes.NOT_FOUND);
    }
  }

  async deleteGroup(id: number) {
    const group = await prismaClient.group.delete({
      where: { id: id },
    });
    return group;
  }

  async addUserToGroup(groupId: number, userId: number) {
    const group = await prismaClient.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
    return group;
  }

  async removeUserFromGroup(groupId: number, userId: number) {
    const group = await prismaClient.group.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });
    return group;
  }
 }

export { GroupService };