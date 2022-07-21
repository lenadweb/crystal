import type { NextPage } from 'next';
import { createContext, FC, memo, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import Search from '../src/components/Search/Search';
import Crystal from '../src/components/Crystal/Crystal';
import ButtonToTop from '../src/components/ButtonToTop/ButtonToTop';
import ToggleTheme from '../src/components/ToggleTheme/ToggleTheme';
import Details from '../src/components/Details/Details';

export const RootContext = createContext({
    isLoading: false,
    setLoading: null,
    isLightTheme: true,
} as any);

const PageContent:FC = memo(() => {
    const [isLoading, setLoading] = useState(false);
    const [isLightTheme, setLightTheme] = useState(true);
    const [expandedItemId, setExpandedItemId] = useState();

    useEffect(() => {
        const sessionTheme = (typeof window !== 'undefined') ? localStorage.getItem('theme') === 'light' : true;
        setLightTheme(sessionTheme);
    }, []);

    const appState = useMemo(() => ({
        isLoading,
        setLoading,
        isLightTheme,
        setLightTheme,
        expandedItemId,
        setExpandedItemId,
    }), [isLoading, expandedItemId, isLightTheme]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <RootContext.Provider value={appState}>
                    <ToggleTheme />
                    <Crystal />
                    <Search />
                    <Details id={expandedItemId} />
                    <ButtonToTop />
                </RootContext.Provider>
            </div>
        </div>
    );
});

const Home: NextPage = () => (
    <PageContent />
);

export default Home;
