import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    motion,
} from 'framer-motion';
import Image from 'next/image';
import cn from 'classnames';
import styles from './TextInput.module.css';
import { useTheme } from '../../hooks/useTheme';
import { scrollToTop } from '../../utils';

interface ITextInput {
    value: string;
    onChange: (value: string)=> void;
}

const transitionValues = {
    duration: 0.2,
    ease: 'easeInOut',
};

const TextInput: FC<ITextInput> = ({ value, onChange }) => {
    const [isFocus, setFocus] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const { isLightTheme } = useTheme();
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        scrollToTop();
    };

    const toggleFocus = useMemo(() => ({
        on: () => setFocus(true),
        off: () => setFocus(false),
    }), []);

    useEffect(() => {
        ref.current?.focus();
    }, [ref]);

    const onFocus = useCallback(() => {
        toggleFocus.on();
        scrollToTop();
    }, []);

    return (
        <motion.div
            className={cn(styles.wrapper, {
                [styles.wrapperFocus]: isFocus,
                [styles.wrapperDark]: !isLightTheme,
            })}
            transition={{
                y: transitionValues,
                opacity: transitionValues,
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                y: ['10rem', '0rem'],
                opacity: [0, 1],
            }}
        >
            <div className={styles.searchIcon}>
                <Image src="/assets/icons/search.svg" width={20} height={20} />
            </div>
            <input
                onFocus={onFocus}
                onBlur={toggleFocus.off}
                ref={ref}
                className={styles.textInput}
                value={value}
                onChange={onChangeHandler}
            />
        </motion.div>
    );
};

export default TextInput;
