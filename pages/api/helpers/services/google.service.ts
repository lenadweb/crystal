import axios from 'axios';

const validateSuggestion = (q: string, suggestion: string[]) => suggestion.filter((suggestItem) => {
    const requestWords = q.split(' ');
    const suggestionWords = suggestItem.split(' ');
    const isRequestWordsIncludesInSuggestion = suggestionWords
        .filter((item) => requestWords.includes(item)).length === (requestWords.length - 1);
    if (isRequestWordsIncludesInSuggestion) return true;
    return false;
});

class GoogleService {
    async getAutocomplete(q: string) {
        try {
            console.log();
            const result = await axios({
                url: `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURI(q)}`,
                method: 'GET',
            });
            return result.data[1];
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}

export default new GoogleService();
