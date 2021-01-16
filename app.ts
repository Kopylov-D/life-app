import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import config from 'config';
import path from 'path';

import { authRouter, budgetRouter } from './routes';

const app: express.Application = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/budget', budgetRouter);

let PORT: string | number = config.get('port') || 8008;
const uri: string = config.get('mongoUri');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../', 'client', 'build')));

	app.get('*', (req: Request, res: Response) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html')
		);
	});

	PORT = process.env.PORT || 8008;
}

async function start() {
	try {
		await mongoose.connect(uri, {
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		//Приложение запускает сервер и слушает соединения на порте

		app.listen(PORT, () =>
			console.log(`App has been started on port ${PORT}...`)
		);
	} catch (e) {
		console.log('Server error', e);
		process.exit(1);
	}
}

start();
