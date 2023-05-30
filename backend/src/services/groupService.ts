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

  async isMember(groupId: number, userId: number) {{
    const group = await prismaClient.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });
  
    if (!group) {
      throw new Error(`Group with ID ${groupId} not found`);
    }
  
    const isMember = group.members.some((member) => member.id === userId);
    return isMember;
  }}

  async acceptInvite(userId: number, groupId: number, adminId: string) {
    this.verifyGroupOwner(groupId, Number(adminId));
    this.verifyIfExists(groupId);
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }
    const userGroup = await prismaClient.group.update({
      where: {
        id: groupId
      },
      data: {
        members: {
          connect: {
            id: userId
          }
        }
      }
    });

    await prismaClient.inviteUser.update({
      where: {
        userId_groupId: {
          userId,
          groupId
        }
      },
      data: {
        status: 'ACCEPTED'
      }
    });
    return userGroup;
  }

  async rejectInvite(groupId: number, userId: number) {
    this.verifyIfExists(groupId);
    const invite = await prismaClient.inviteUser.update({
      where: {
        userId_groupId: {
          userId,
          groupId
        }
      },
      data: {
        status: 'REJECTED'
      }
    });

    return invite;
  }

  async sendInvite(groupId: number, userId: number) {
    this.verifyIfExists(groupId);
    const invite = await prismaClient.inviteUser.create({
      data: {
        userId,
        groupId,
        status: 'WAITING'
      }
    });

    return invite;
  }

  async getGroupInvites(groupId: number, owner: string) {
    this.verifyGroupOwner(groupId, Number(owner));
    const invite = await prismaClient.inviteUser.findMany({
      where: {
        groupId,
        status: {
          equals: 'WAITING'
        }
      }
    });
    return invite;
  }

  private async verifyGroupOwner(id: number, adminID: number) {
    const group = prismaClient.group.findFirst({
      where: {
        id,
        adminId: adminID
      }
    });
    if (!group) {
      throw new AppError('Group not found ', StatusCodes.NOT_FOUND);
    }
  }
 }

export { GroupService };