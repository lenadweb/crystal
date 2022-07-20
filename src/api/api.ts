import axios from 'axios';
import { TorrentItem } from '../types/api';

class TApi {
    // async search(q: string): Promise<TorrentItem[]> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => resolve(getSearchByQuery), 1500);
    //     });
    // }

    async search(q: string): Promise<TorrentItem[]> {
        try {
            const result = await axios({
                url: `/api/torrents/search?q=${q}`,
                method: 'GET',
            });
            return result as any;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}

export default new TApi();
