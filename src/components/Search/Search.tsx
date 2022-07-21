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
    const { data, isLoading } = useSearch(debouncedValue);
    const isResultVisible = !!data.length && !isLoading && !!inputValue.length;
    return (
        <div className={styles.wrapper}>
            <TextInput value={inputValue} onChange={setInputValue} />
            <AnimatePresence>
                {isResultVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SearchResult data={data} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Search;
