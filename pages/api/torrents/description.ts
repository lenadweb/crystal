import type { NextApiRequest, NextApiResponse } from 'next';
import TorrentsService from '../helpers/services/torrents.service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    try {
        const { id } = req.query;
        const result = await TorrentsService.description(id as string);
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(403).json(err);
    }
}
