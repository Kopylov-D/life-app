import { Router, Response, Request } from 'express';
import config from 'config';
import { User } from '../models/User';

const router = Router();

router.get('/info', async (req: Request, res: Response) => {
	try {
		console.log(req.body);

		// const code = shortid.generate()

		// const existing = await User.findOne({ from })

		// if (existing) {
		//   return res.json({ link: existing })
		// }

		// const to = baseUrl + '/t/' + code

		// const link = new Link({
		//   code, to, from, owner: req.user.userId
		// })
		//
		// await link.save()

		// res.status(201).json({ link })
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

export default router;
