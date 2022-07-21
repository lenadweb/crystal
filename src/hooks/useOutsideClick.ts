import { useEffect } from 'react';

export const useOutsideClick = (ref: any, callback: () => void): void => {
    useEffect(() => {
        function handleClickOutside(e: Event): void {
            if (ref && ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
