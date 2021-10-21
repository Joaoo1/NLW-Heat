import { Request, Response } from 'express';
import GetLastThreeMessagesService from '../services/GetLastThreeMessagesService';

class GetLastThreeMessagesController {
  async handle(req: Request, res: Response) {
    const result = await GetLastThreeMessagesService.run();
    return res.status(200).json(result);
  }
}

export { GetLastThreeMessagesController };
