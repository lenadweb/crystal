import type { NextPage } from 'next';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import Search from '../src/components/Search/Search';
import Crystal from '../src/components/Crystal/Crystal';
import ButtonToTop from '../src/components/ButtonToTop/ButtonToTop';
import ToggleTheme from '../src/components/ToggleTheme/ToggleTheme';
import Details from '../src/components/Details/Details';
import { ThemeContext } from '../src/contexts/ThemeContext';
import { ResultContext } from '../src/contexts/ResultContext';
import { SearchContext } from '../src/contexts/SearchContext';

const PageContent:FC = memo(() => {
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);
    const [isLightTheme, setLightTheme] = useState(false);
    const [selectItemId, setSelectItemId] = useState<string | null>(null);

    useEffect(() => {
        const sessionTheme = (typeof window !== 'undefined') ? localStorage.getItem('theme') === 'light' : false;
        setLightTheme(sessionTheme);
    }, []);

    const themeState = useMemo(() => ({
        isLightTheme,
        setLightTheme,
    }), [isLightTheme]);

    const searchState = useMemo(() => ({
        isLoading,
        setLoading,
        hasError,
        setError,
    }), [isLoading, hasError]);

    const resultState = useMemo(() => ({
        selectItemId,
        setSelectItemId,
    }), [selectItemId]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <ThemeContext.Provider value={themeState}>
                    <SearchContext.Provider value={searchState}>
                        <ResultContext.Provider value={resultState}>
                            <ToggleTheme />
                            <Crystal isLoading={isLoading} hasError={hasError} />
                            <Search />
                            <Details id={selectItemId} setSelectItemId={setSelectItemId} isLightTheme={isLightTheme} />
                            <ButtonToTop isLightTheme={isLightTheme} />
                        </ResultContext.Provider>
                    </SearchContext.Provider>
                </ThemeContext.Provider>
            </div>
        </div>
    );
});

const Home: NextPage = () => (
    <PageContent />
);

export default Home;
