import type { NextPage } from 'next';
import { createContext, FC, memo, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import Search from '../src/components/Search/Search';
import Crystal from '../src/components/Crystal/Crystal';
import ButtonToTop from '../src/components/ButtonToTop/ButtonToTop';
import ToggleTheme from '../src/components/ToggleTheme/ToggleTheme';

export const RootContext = createContext({
    isLoading: false,
    setLoading: null,
    isLightTheme: false,
} as any);

const PageContent:FC = memo(() => {
    const [isLoading, setLoading] = useState(false);
    const [isLightTheme, setLightTheme] = useState(false);

    useEffect(() => {
        const sessionTheme = (typeof window !== 'undefined') ? localStorage.getItem('theme') === 'light' : false;
        setLightTheme(sessionTheme);
    }, []);

    const appState = useMemo(() => ({
        isLoading,
        setLoading,
        isLightTheme,
        setLightTheme,
    }), [isLoading, isLightTheme]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <RootContext.Provider value={appState}>
                    <ToggleTheme />
                    <Crystal />
                    <Search />
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
