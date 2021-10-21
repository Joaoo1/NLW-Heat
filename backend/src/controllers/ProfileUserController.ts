import { Request, Response } from 'express';
import ProfileUserService from '../services/ProfileUserService';

class ProfileUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req;
    const result = await ProfileUserService.run({ userId });
    return res.status(200).json(result);
  }
}

export { ProfileUserController };
