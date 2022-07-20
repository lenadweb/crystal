import { useContext, useMemo } from 'react';
import { RootContext } from '../../pages';

export function useTheme() {
    const { isLightTheme, setLightTheme } = useContext(RootContext);

    const result = useMemo(() => ({
        isLightTheme,
        toggleTheme: () => setLightTheme(!isLightTheme),
    }), [isLightTheme]);

    return result;
}
