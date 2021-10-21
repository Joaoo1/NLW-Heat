import { Request, Response } from 'express';

import CreateMessageService from '../services/CreateMessageService';

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { userId } = req;
    const { message } = req.body;

    const result = await CreateMessageService.run({ text: message, userId });

    return res.status(200).json(result);
  }
}

export { CreateMessageController };
