import React, { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Accordion.module.css';
import { useTheme } from '../../hooks/useTheme';
import ArrowIcon from '../../Icons/ArrowIcon';

interface IAccordion {
    header: string;
    content: {
        images: string[];
        text: string;
    };
}

const Accordion:FC<IAccordion> = ({ header, content }) => {
    const [isOpen, setOpen] = useState(false);
    const { isLightTheme } = useTheme();
    return (
        <div>
            <motion.div
                className={styles.header}
                initial={false}
                animate={{ backgroundColor: isLightTheme ? '#ffffff' : '#181818' }}
                onClick={() => setOpen((prevState) => !prevState)}
            >
                <div>
                    {header}
                </div>
                <motion.div
                    className={styles.arrow}
                    initial={false}
                    animate={{ rotate: isOpen ? '180deg' : '270deg' }}
                >
                    <ArrowIcon fill={isLightTheme ? '#181818' : '#ececec'} />
                </motion.div>

            </motion.div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <motion.div
                            className={styles.content}
                            variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                            transition={{ duration: 0.3 }}
                        >
                            {
                                content.images?.length > 0 ? (
                                    <div className={styles.imagesContainer}>
                                        {
                                            content.images.map((item) => <img alt="" key={item} src={item} className={styles.image} />)
                                        }
                                    </div>
                                ) : (
                                    <div dangerouslySetInnerHTML={{
                                        __html: content.text,
                                    }}
                                    />
                                )
                            }

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    );
};

export default Accordion;
