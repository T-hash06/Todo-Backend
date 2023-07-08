import type { Request, Response } from 'express';

import * as UserService from '../services/UserService';

export function get(req: Request, res: Response) {
	res.send(UserService.getOne());
}
