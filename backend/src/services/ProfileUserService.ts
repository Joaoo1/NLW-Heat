import prismaClient from '../prisma';

interface ProfileUserServiceParams {
  userId: string;
}

class ProfileUserService {
  async run({ userId }: ProfileUserServiceParams) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}

export default new ProfileUserService();
