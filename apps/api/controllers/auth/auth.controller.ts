import express from 'express';
import { db } from '@api/database/database';
import { sign } from 'jsonwebtoken';
import { users } from '@api/database/schema';
import { eq } from 'drizzle-orm';
import { JwtUserModel } from './auth.model';
import dotenv from 'dotenv';
import path from 'path';
import * as process from 'node:process';
import bcrypt from 'bcrypt';
import { User } from "@shared/models";

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
   try {
     const result = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email))
      .limit(1)
      .execute();

     const user = result[0];

     if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
       return res.status(401).json({message: 'Invalid email or password'});
     }

     const jwtUser: JwtUserModel = {
       id_user: user.id,
       username: user.name,
     };

     const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
     if (!accessTokenSecret)
       return res.status(500).json({message: 'Server error'});

     const token = sign(jwtUser, accessTokenSecret);

     return res
      .status(200)
      .json({token, userId: user.id, userName: user.name});
   } catch (error) {
     console.error(error);
     return res.status(500).json({message: 'Internal Server Error'});
   }
 }
);

authController.post(
 '/register',
 async (req: express.Request<unknown, unknown, User>, res) => {
   try {
     // Check if the user already exists
     const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, req.body.email))
      .limit(1)
      .execute();

     if (existingUser.length > 0) {
       return res.status(400).json({message: 'Email already in use'});
     }

     const hashedPassword = await bcrypt.hash(req.body.password, 10);

     const result = await db
      .insert(users)
      .values({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
      .execute();

     return res.status(201).json({message: 'User created successfully'});
   } catch (error) {
     console.error(error);
     return res.status(500).json({message: 'Registration failed'});
   }
 }
);
