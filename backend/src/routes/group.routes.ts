import { GroupController } from './../controllers/groupController';
import { Router } from "express";

const groupRoutes = Router();

const groupController = new GroupController();

groupRoutes.get('/groups', groupController.getAllGroups);
groupRoutes.get('/groups/:id', groupController.getGroup);
groupRoutes.post('/groups', groupController.createGroup)
groupRoutes.put('/groups/:id',  groupController.updateGroup)
groupRoutes.get('/groups/:id/isMember/:userId', groupController.isMember);
groupRoutes.put('/groups/:id/user/:userId', groupController.addUser);
groupRoutes.delete('/groups/:id/user/:userId', groupController.removeUser);
groupRoutes.delete('/groups/:id', groupController.deleteGroup)
groupRoutes.get('/groups/:id/users', groupController.getAllUsers)
groupRoutes.post('/group/:id/owner/:adminId/insertUser/:userId', groupController.acceptInvite);
groupRoutes.post('/group/:id/user/:userId', groupController.sendInvite);
groupRoutes.put('/group/:id/user/:userId', groupController.rejectInvite);
groupRoutes.get('/group/:id/owner/:adminId', groupController.getGroupsInvite);

export { groupRoutes };