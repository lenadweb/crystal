import type { NextApiRequest, NextApiResponse } from 'next';
import TorrentsService from '../helpers/services/torrents.service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    try {
        const { q } = req.query;
        const result = await TorrentsService.search(q as string);
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(403).json([]);
    }
}
