import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController';
import { GithubController } from './controllers/GithubController';
import { ProfileUserController } from './controllers/ProfileUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);

router.get('/github', new GithubController().handle);

router.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

router.post(
  '/messages',
  ensureAuthenticated,
  new CreateMessageController().handle,
);

router.get('/messages/lastThree', new GetLastThreeMessagesController().handle);

router.get('/profile', ensureAuthenticated, new ProfileUserController().handle);

export { router };
