import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const result = await AuthenticateUserService.run({ code });

    return res.json(result);
  }
}

export { AuthenticateUserController };
