import React, { ChangeEvent, FC, KeyboardEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    AnimatePresence,
    motion,
} from 'framer-motion';
import Image from 'next/image';
import cn from 'classnames';
import styles from './TextInput.module.css';
import { useTheme } from '../../hooks/useTheme';
import { scrollToTop } from '../../utils';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import TimeIcon from '../../Icons/TimeIcon';

interface ITextInput {
    value: string;
    onChange: (value: string)=> void;
    tips: string[];
}

const transitionValues = {
    duration: 0.2,
    ease: 'easeInOut',
};

const TextInput: FC<ITextInput> = ({ value, onChange, tips }) => {
    const [isFocus, setFocus] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const refContainer = useRef<HTMLDivElement>(null);
    const [visibleTips, setVisibleTips] = useState(false);
    const { isLightTheme } = useTheme();
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        scrollToTop();
    };

    useEffect(() => {
        ref.current?.focus();
        setVisibleTips(true);
        const inputFocus = () => ref.current?.focus();
        window.addEventListener('keydown', inputFocus);
        return () => window.removeEventListener('keydown', inputFocus);
    }, [ref]);

    const onKeyDownHandler:KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            ref.current?.blur();
            setFocus(false);
        }
    };

    const toggleFocus = useMemo(() => ({
        on: () => setFocus(true),
        off: () => setFocus(false),
    }), []);

    const onFocus = useCallback(() => {
        toggleFocus.on();
        scrollToTop();
    }, []);

    useOutsideClick(refContainer, toggleFocus.off);

    return (
        <motion.div
            ref={refContainer}
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
                y: ['50rem', '0rem'],
                opacity: [0, 1],
            }}
        >
            <div className={styles.inputContainer}>
                <div className={styles.searchIcon}>
                    <Image src="/assets/icons/search.svg" width={20} height={20} />
                </div>
                <input
                    onFocus={onFocus}
                    ref={ref}
                    className={styles.textInput}
                    value={value}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
            </div>
            <AnimatePresence>
                {
                    tips?.length && (visibleTips && isFocus) && !value.length && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                delay: 0.2,
                            }}
                        >
                            <motion.div className={styles.tips}>
                                <motion.div className={cn(styles.divider, {
                                    [styles.dividerLight]: isLightTheme,
                                })}
                                />
                                {
                                    tips.map((item) => (
                                        <motion.div
                                            className={cn(styles.tipItem, {
                                                [styles.tipItemLight]: isLightTheme,
                                            })}
                                            onClick={() => onChange(item)}
                                        >
                                            <div
                                                className={styles.iconTips}
                                            >

                                                <TimeIcon fill={isLightTheme ? '#0096dc' : '#989898'} />
                                            </div>
                                            {item}
                                        </motion.div>
                                    ))
                                }
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.div>
    );
};

export default TextInput;
