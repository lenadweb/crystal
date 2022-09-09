import Parser from './lib/parser';
import PageProvider from './lib/page-provider';

class RutrackerApi {
    constructor() {
        this.parser = new Parser();
        this.pageProvider = new PageProvider();
    }

    login({ username, password }) {
        return this.pageProvider.login(username, password);
    }

    search({ query, sort, order }) {
        return this.pageProvider
            .search({ query, sort, order })
            .then((html) => this.parser.parseSearch(html));
    }

    description({ id }) {
        return this.pageProvider
            .thread(id)
            .then((html) => this.parser.parseDescription(html));
    }

    download(id) {
        return this.pageProvider.torrentFile(id);
    }

    getMagnetLink(id) {
        return this.pageProvider
            .thread(id)
            .then((html) => this.parser.parseMagnetLink(html));
    }
}

export default RutrackerApi;
