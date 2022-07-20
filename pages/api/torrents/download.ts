import type { NextApiRequest, NextApiResponse } from 'next';
import TorrentsService from '../helpers/services/torrents.service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    await TorrentsService.download(req, res);
}
