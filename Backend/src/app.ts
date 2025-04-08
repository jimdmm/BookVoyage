import fastify from "fastify";
import { env } from "./env";
import { ZodError } from "zod";

export const app = fastify();

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.", issues: error.format() });
	}

	if (env.NODE_ENV !== "prod") {
		console.error(error);
	}

	return reply.status(500).send({ message: "Internal Server Error." });
});
