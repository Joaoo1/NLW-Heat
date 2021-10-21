import { Request, Response } from 'express';

class GithubController {
  async handle(req: Request, res: Response) {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  }
}

export { GithubController };
