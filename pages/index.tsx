import type { NextPage } from 'next';
import { createContext, FC, memo, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import Search from '../src/components/Search/Search';
import Crystal from '../src/components/Crystal/Crystal';
import ButtonToTop from '../src/components/ButtonToTop/ButtonToTop';

export const RootContext = createContext({
    isLoading: false,
    setLoading: null,
    isLightTheme: true,
} as any);

const PageContent:FC = memo(() => {
    const [isLoading, setLoading] = useState(false);
    const [isLightTheme, setLightTheme] = useState(false);

    const appState = useMemo(() => ({
        isLoading,
        setLoading,
        isLightTheme,
        setLightTheme,
    }), [isLoading]);

    useEffect(() => {
        if (isLightTheme) document.body.classList.add(styles.bodyLight);
        else document.body.classList.add(styles.bodyDark);

        return () => {
            if (isLightTheme) document.body.classList.remove(styles.bodyLight);
            else document.body.classList.remove(styles.bodyDark);
        };
    }, [isLightTheme]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <RootContext.Provider value={appState}>
                    <Crystal />
                    <Search />
                </RootContext.Provider>
                <ButtonToTop />
            </div>
        </div>
    );
});

const Home: NextPage = () => (
    <PageContent />
);

export default Home;
