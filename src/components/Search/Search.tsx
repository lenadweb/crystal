import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import TextInput from '../TextInput/TextInput';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearch } from '../../hooks/useSearch';
import styles from './Search.module.css';

const SearchResult = dynamic(() => import('../SearchResult/SearchResult'), {
    ssr: false,
});

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebounce(inputValue, 500);
    const { data, isLoading, isComplete } = useSearch(debouncedValue);
    const isResultVisible = !!data.length && !isLoading && !!inputValue.length && debouncedValue === inputValue;
    const isEmptyResultVisible = !data.length && isComplete && !isLoading && !!inputValue.length && debouncedValue === inputValue;
    return (
        <div className={styles.wrapper}>
            <TextInput value={inputValue} onChange={setInputValue} />
            <AnimatePresence exitBeforeEnter>
                {isResultVisible && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SearchResult data={data} />
                    </motion.div>
                )}
                {isEmptyResultVisible && (
                    <motion.div
                        key="emptyResult"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className={styles.emptyResult}>Ничего не найдено</div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Search;
