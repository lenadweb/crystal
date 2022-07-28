import { useCallback, useMemo, useState } from 'react';

const keyInLocalStorage = 'tips';
const maxLength = 5;

const getTipsById = (id: string) => {
    try {
        if (typeof window === 'undefined') return [];
        const inputTips = localStorage.getItem(keyInLocalStorage);
        if (inputTips) {
            const targetTips = JSON.parse(inputTips)?.[id] || [];
            return targetTips;
        }
        return [];
    } catch (e) {
        return [];
    }
};

const appendTipsById = (id: string, value: string) => {
    try {
        if (typeof window === 'undefined') return;
        const inputTips = JSON.parse(localStorage.getItem(keyInLocalStorage) || '{}');
        if (inputTips?.[id]?.length) {
            if (!inputTips?.[id]?.includes(value)) {
                inputTips[id].push(value);
            } else {
                inputTips[id] = inputTips[id].filter((item: string) => item !== value);
                inputTips[id].push(value);
            }
            inputTips[id] = inputTips[id].slice(-maxLength);
        } else {
            inputTips[id] = [value];
        }
        localStorage.setItem(keyInLocalStorage, JSON.stringify(inputTips));
    } catch (e) {
        console.log(e);
    }
};

export const useInputTips = (id: string) => {
    const [tips, setTips] = useState<string[]>(getTipsById(id));

    const onSave = useCallback((value: string) => {
        appendTipsById(id, value);
        setTips((prevState) => (prevState?.includes(value) ? ([
            ...prevState.filter((item) => item !== value),
            value,
        ]) : ([
            ...prevState,
            value,
        ])));
    }, []);

    const splitReverseTips = useMemo(() => tips.reverse().slice(0, maxLength), [tips]);

    return {
        tips: splitReverseTips,
        onSave,
    };
};
