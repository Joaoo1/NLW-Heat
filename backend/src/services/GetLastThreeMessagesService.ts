import prismaClient from '../prisma';

class GetLastThreeMessagesService {
  async run() {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return messages;
  }
}

export default new GetLastThreeMessagesService();
