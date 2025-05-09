import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
	PORT: z.string().default('3333'),
	NODE_ENV: z.enum(['dev', 'hmlg', 'prod']).default('dev'),
	DATABASE_URL: z.string().default(''),
	JWT_SECRET: z.string().default(''),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error('❌ Invalid environment variables', _env.error.format());

	throw new Error('Invalid environment variables');
}

export const env = _env.data;
