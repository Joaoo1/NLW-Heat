import axios from 'axios';
import { sign } from 'jsonwebtoken';

import prismaClient from '../prisma';

interface AuthenticateUserServiceParams {
  code: string;
}

interface AcessTokenResponse {
  access_token: string;
}

interface UserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async run({ code }: AuthenticateUserServiceParams) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: acessTokenResponse } = await axios.post<AcessTokenResponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const response = await axios.get<UserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${acessTokenResponse.access_token}`,
        },
      },
    );

    const { login, id, avatar_url: avatarUrl, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        githubId: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          githubId: id,
          login,
          avatarUrl,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatarUrl: user.avatarUrl,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { token, user };
  }
}

export default new AuthenticateUserService();
