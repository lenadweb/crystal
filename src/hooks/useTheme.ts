import { useContext, useMemo } from 'react';
import { RootContext } from '../../pages';

export function useTheme() {
    const { isLightTheme, setLightTheme } = useContext(RootContext);

    const result = useMemo(() => ({
        isLightTheme,
        toggleTheme: () => {
            localStorage.setItem('theme', isLightTheme ? 'dark' : 'light');
            setLightTheme(!isLightTheme);
        },
    }), [setLightTheme, isLightTheme]);

    return result;
}
