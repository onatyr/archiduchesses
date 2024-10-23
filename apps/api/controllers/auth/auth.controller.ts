import express from 'express';
import { db } from '../../database/database';
import { sign } from 'jsonwebtoken';
import { users } from '../../database/schema';
import { eq } from 'drizzle-orm';
import { JwtUserModel } from './auth.model';
import dotenv from 'dotenv';
import path from 'path';
import * as process from 'node:process';
import { User } from '@shared/models/user.model';
import bcrypt from 'bcrypt';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const authController: express.Router = express();

authController.post(
  '/login',
  async (
    req: express.Request<
      unknown,
      unknown,
      {
        email: string;
        password: string;
      }
    >,
    res
  ) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email))
      .limit(1)
      .execute();

    const user = result[0];

    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    const jwtUser: JwtUserModel = {
      id_user: user.id,
      username: user.name,
    };

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) return res.status(500);

    const token = sign(jwtUser, accessTokenSecret);

    res.status(200).json({ token });
  }
);

authController.post(
  '/register',
  async (req: express.Request<unknown, unknown, User>, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await db
      .insert(users)
      .values({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
      .execute();

    if (!result || result.rowCount === 0) return res.status(500).json();
    res.status(201).json();
  }
);
