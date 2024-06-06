import { config } from 'dotenv';

interface Env {
  PUBLIC_URL: string;
}

config({ path: '.env' });

declare const process: { env: Env };

export default process.env;
