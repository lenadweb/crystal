import { useEffect, useState } from 'react';
import Api from '../api/api';

const validateSuggestion = (q: string, suggestion: string[]) => suggestion.filter((suggestItem) => {
    const requestWords = q.split(' ');
    const suggestionWords = suggestItem.split(' ');
    const isRequestWordsIncludesInSuggestion = suggestionWords
        .filter((item) => requestWords.includes(item)).length === (requestWords.length - 1);
    if (isRequestWordsIncludesInSuggestion && (requestWords.length === suggestionWords.length)) return true;
    return false;
});

export const useGoogleSuggestion = (q: string) => {
    const [suggestion, setSuggestion] = useState<string[]>([]);

    useEffect(() => {
        (async function () {
            try {
                const result = await Api.getAutoComplete(q);
                setSuggestion(result);
            } catch (e) {
                setSuggestion([]);
            }
        }());
    }, [q]);

    return suggestion;
};
