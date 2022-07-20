// @ts-ignore
import RutrackerApi from 'rutracker-api';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const rutracker = new RutrackerApi();

const authOptions = { username: process.env.RTUSERNAE, password: process.env.RTPASSWORD };

class TorrentsService {
    async search(q:string) {
        const login = await rutracker.login(authOptions);
        if (login) {
            const resultSearch = await rutracker.search({ query: q, sort: 'size' });
            return resultSearch;
        }
        return {
            error: 'auth error',
        };
    }

    async download(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {
                id,
            } = req.query;
            const login = await rutracker.login(authOptions);
            if (login) {
                const result = await axios({
                    url: `http://rutracker.org/forum/dl.php?t=${id}`,
                    method: 'POST',
                    headers: {
                        Cookie: rutracker.pageProvider.cookie,
                        'Accept-language': 'en',
                    },
                    responseType: 'stream',
                });
                result.data.pipe(res);
            } else {
                res.json({
                    error: 'Auth Error',
                });
            }
        } catch (e) {
            res.status(400)
                .json({ message: e });
        }
    }
}

export default new TorrentsService();
