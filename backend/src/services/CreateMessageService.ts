import prismaClient from '../prisma';

import { io } from '../app';

interface CreateMessageServiceParams {
  text: string;
  userId: string;
}

class CreateMessageService {
  async run({ text, userId }: CreateMessageServiceParams) {
    const message = await prismaClient.message.create({
      data: {
        text,
        userId,
      },
      include: {
        user: true,
      },
    });

    const infoWS = {
      text: message.text,
      userId: message.userId,
      createdAt: message.createdAt,
      user: {
        name: message.user.name,
        avatarUrl: message.user.avatarUrl,
      },
    };

    io.emit('new_message', infoWS);

    return message;
  }
}

export default new CreateMessageService();
