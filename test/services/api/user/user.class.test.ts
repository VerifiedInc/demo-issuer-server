import { v4 } from 'uuid';

import { UserService } from '../../../../src/services/api/user/user.class';
import { Application } from '../../../../src/declarations';
import { dummyUser, dummyUser2 } from '../../../mocks';

describe('UserService class', () => {
  let service: UserService;

  const mockUserDataService = {
    get: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    patch: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const app = {
      service: () => {
        return mockUserDataService;
      }
    };

    service = new UserService({}, app as unknown as Application);
  });

  describe('get', () => {
    it('gets a user from the data service by id', async () => {
      mockUserDataService.get.mockResolvedValueOnce(dummyUser);

      const user = await service.get(dummyUser.uuid);
      expect(mockUserDataService.get).toBeCalledWith(dummyUser.uuid, { populate: ['pushTokens'] });
      expect(user).toEqual(dummyUser);
    });
  });

  describe('find', () => {
    it('gets all users from the data service', async () => {
      mockUserDataService.find.mockResolvedValueOnce([dummyUser, dummyUser2]);
      const foundUsers = await service.find();
      expect(mockUserDataService.find).toBeCalled();
      expect(foundUsers).toEqual([dummyUser, dummyUser2]);
    });

    it('gets users by params from the data service', async () => {
      mockUserDataService.find.mockResolvedValueOnce([dummyUser]);
      const params = { where: { email: 'test@unumid.org' } };
      service.find(params);
      expect(mockUserDataService.find).toBeCalledWith(params);
    });
  });

  describe('create', () => {
    it('creates a user with the user data service', async () => {
      mockUserDataService.create.mockResolvedValueOnce(dummyUser);
      const options = { email: 'test@unumid.org', password: 'test' };
      const createdUser = await service.create(options);
      expect(mockUserDataService.create).toBeCalledWith(options, undefined);
      expect(createdUser).toEqual(dummyUser);
    });
  });

  describe('patch', () => {
    it('patches a user with the user data service', async () => {
      const did = `did:unum:${v4}`;
      const patchedUser = {
        ...dummyUser,
        did
      };
      mockUserDataService.patch.mockResolvedValueOnce(patchedUser);

      const options = { did };

      const response = await service.patch(dummyUser.uuid, options);
      expect(mockUserDataService.patch).toBeCalledWith(dummyUser.uuid, options, undefined);

      expect(response).toEqual(patchedUser);
    });
  });

  describe('remove', () => {
    it('removes a user with the user data service', async () => {
      mockUserDataService.remove.mockResolvedValueOnce(dummyUser);
      await service.remove(dummyUser.uuid);
      expect(mockUserDataService.remove).toBeCalledWith(dummyUser.uuid, undefined);
    });

    it('returns the removed user', async () => {
      mockUserDataService.remove.mockResolvedValueOnce(dummyUser);
      const removedUser = await service.remove(dummyUser.uuid);
      expect(removedUser).toEqual(dummyUser);
    });
  });
});
