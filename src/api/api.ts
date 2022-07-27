import axios from 'axios';
import { TorrentItem } from '../types/api';
import { downloadFile } from '../utils';

class TApi {
    // async search(q: string): Promise<TorrentItem[]> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => resolve(getSearchByQuery), Math.random() * 6000);
    //     });
    // }

    async search(q: string): Promise<TorrentItem[]> {
        const result = await axios({
            url: `/api/torrents/search?q=${q}`,
            method: 'GET',
        });
        return result?.data as any;
    }

    async description(id: string): Promise<TorrentItem[]> {
        try {
            const result = await axios({
                url: `/api/torrents/description?id=${id}`,
                method: 'GET',
            });
            return result?.data as any;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async download(id: string, title: string) {
        try {
            const response = await axios({
                method: 'GET',
                url: `/api/torrents/download?id=${id}`,
                responseType: 'blob',
            });
            const urlDownload = window.URL.createObjectURL(new Blob([response.data]));
            downloadFile(urlDownload, `${title}.torrent`);
            return null;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getAutoComplete(q: string) {
        try {
            const response = await axios({
                method: 'GET',
                url: `/api/autocomplete/get?q=${q}`,
            });
            return response.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}

export default new TApi();
