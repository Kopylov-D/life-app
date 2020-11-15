import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import config from 'config';

import { authRouter } from './routes';

const app: express.Application = express();

app.use(express.json());

app.use('/api/auth', authRouter);

const PORT: number = config.get('port') || 8000;
const uri: string = config.get('mongoUri');

async function start() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		//Приложение запускает сервер и слушает соединения на порте

		app.listen(PORT, () =>
			console.log(`App has been started on port ${PORT}...`)
		);
		app.use((req: Request, res: Response, next: NextFunction) => {
			if (req.url === '/') {
				res.status(204).send('all good');
			}
		});
	} catch (e) {
		console.log('Server error', e);
		process.exit(1);
	}
}

start();
