import cheerio from 'cheerio';
import Torrent from './torrent';

class Parser {
    constructor() {
        this.host = 'http://rutracker.org';
    }

    parseSearch(rawHtml) {
        const $ = cheerio.load(rawHtml, { decodeEntities: false });
        const results = [];

        let tracks = $('#tor-tbl tbody').find('tr');
        const { length } = tracks;

        for (let i = 0; i < length; i += 1) {
            // Ah-m... Couldn't find any better method
            const document = tracks.find('td');
            const state = document.next();
            const category = state.next();
            const title = category.next();
            const author = title.next();
            const size = author.next();
            const seeds = size.next();
            const leeches = seeds.next();
            const downloads = leeches.next();
            const registered = downloads.next();

            const id = title.find('div a').attr('data-topic_id');

            // Handle case where search has no results
            if (id) {
                const torrent = new Torrent({
                    state: state.attr('title'),
                    id: title.find('div a').attr('data-topic_id'),
                    category: category.find('.f-name a').html(),
                    title: title.find('div a').html(),
                    author: author.find('div a').html(),
                    size: Number(size.attr('data-ts_text')),
                    seeds: Number(seeds.find('b').html()),
                    leeches: Number(leeches.first().text()),
                    downloads: Number(downloads.html()),
                    registered: new Date(Number(registered.attr('data-ts_text')) * 1000),
                    host: this.host,
                });

                results.push(torrent);
            }

            tracks = tracks.next();
        }

        return results;
    }

    parseDescription(rawHtml) {
        const $ = cheerio.load(rawHtml, { decodeEntities: false });
        const postBody = $('#topic_main .row1 .post_wrap');
        const collapsesRT = $(postBody).find('.sp-wrap');
        const collapses = [];
        const description = $(postBody).contents();

        const d = [];

        description.each(function () {
            d.push($(this).html());
        });

        const splitedD = d[1].split('<br>');
        let splitIndex = splitedD.length;
        const splitedDFinal = splitedD.filter((item, index) => {
            if (splitIndex <= index) return false;
            if (item.includes('sp-wrap')) {
                splitIndex = index;
                return false;
            }
            return true;
        });

        collapsesRT.each(function () {
            const content = $(this).find('.sp-body').first();
            const postLinks = content.find('.postLink>var');
            const images = [];
            const header = $(this).find('.sp-head').first().text()
                .trim();
            let text = '';

            if (postLinks.length > 0) {
                postLinks.each(function () {
                    images.push($(this).attr('title'));
                });
            }

            if (header === 'MediaInfo') {
                text = content.find('.c-body').first().html().split('<br>')
                    .join('');
            } else {
                text = content.html();
            }

            const excludeHeaders = ['Последние поблагодарившие'];

            if (!excludeHeaders.includes(header)) {
                collapses.push({
                    header,
                    content: {
                        text: images.length > 0 ? null : text,
                        images,
                    },
                });
            }
        });

        return {
            description: splitedDFinal.join(),
            collapses,
        };
    }

    parseMagnetLink(rawHtml) {
        const $ = cheerio.load(rawHtml, { decodeEntities: false });

        return $('.magnet-link').attr('href');
    }
}

export default Parser;
