import React, { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import TextInput from '../TextInput/TextInput';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearch } from '../../hooks/useSearch';
import styles from './Search.module.css';
import { useInputTips } from '../../hooks/useInputTips';

const SearchResult = dynamic(() => import('../SearchResult/SearchResult'), {
    ssr: false,
});

const Search = memo(() => {
    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebounce(inputValue, 500);
    const debouncedValueForSave = useDebounce(inputValue, 2000);
    const { tips, onSave } = useInputTips('search');
    const { data, isLoading, isSuccess, isError } = useSearch(debouncedValue);
    const isComplete = !!inputValue.length && debouncedValue === inputValue && isSuccess && !isLoading;
    const isResultVisible = !!data.length && isComplete;
    const isEmptyResultVisible = !data.length && isComplete;

    useEffect(() => {
        if (debouncedValueForSave.length) onSave(debouncedValueForSave);
    }, [debouncedValueForSave]);

    return (
        <div className={styles.wrapper}>
            <TextInput tips={tips} value={inputValue} onChange={setInputValue} />
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={(isResultVisible && 'rv') || (isEmptyResultVisible && 'rev') || (isError && 'err') as string}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {
                        (isResultVisible && <SearchResult data={data} />)
                            || (isEmptyResultVisible && <div className={styles.info}>Ничего не найдено</div>)
                            || (isError && <div className={styles.info}>Упс. Что-то сломалось</div>)
                    }
                </motion.div>
            </AnimatePresence>

        </div>
    );
});

export default Search;
