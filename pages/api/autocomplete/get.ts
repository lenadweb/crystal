import type { NextApiRequest, NextApiResponse } from 'next';
import GoogleService from '../helpers/services/google.service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    try {
        const { q } = req.query;
        console.log(q);
        const result = await GoogleService.getAutocomplete(q as string);
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(403).json(err);
    }
}
