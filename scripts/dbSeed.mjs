/* eslint-disable */

import { Client } from 'ssh2';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import promptSync from 'prompt-sync';

dotenv.config({
  path: path.resolve('./.env'), // this path is relative to the where the node command is run (from root when using npm run)
});

const remoteHost = process.env.RSPB_HOST;
const port = process.env.RSPB_PORT;
const username = process.env.RSPB_USER;
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH);

const pgsqlPassword = process.env.PGSQL_PASSWORD;
const dbSeedScriptPath = process.env.DB_SEED_SCRIPT_PATH;
const targetDatabaseName = process.argv[2];

if (!targetDatabaseName) {
  console.error('Error: You must provide a target database name');
  process.exit(1);
}

const askForPassphrase = () => {
  // TODO find a solution to hide the password input, didn't work with Node readline either
  const prompt = promptSync({ sigint: true, echo: false });
  return prompt('Enter your SSH private key passphrase: ');
};

const passphrase = askForPassphrase();

const client = new Client();

client
  .on('ready', () => {
    console.log('SSH connection established.');

    const command = `${dbSeedScriptPath} ${username} ${pgsqlPassword} ${targetDatabaseName}`;

    client.exec(command, (err, stream) => {
      if (err) throw err;

      stream.on('data', (data) => {
        console.log('STDOUT: ' + data);
      });

      stream.stderr.on('data', (data) => {
        console.error('STDERR: ' + data);
      });

      stream.on('close', (code, signal) => {
        console.log(
          `Command executed with exit code ${code}, signal ${signal}`
        );
        client.end();
      });
    });
  })
  .connect({
    host: remoteHost,
    port: port,
    username: username,
    privateKey: privateKey,
    passphrase: passphrase,
  });
