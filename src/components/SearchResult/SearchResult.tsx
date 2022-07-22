import React, { FC, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { TorrentItem } from '../../types/api';
import TItem from '../TItem/TItem';
import styles from './SearchResult.module.css';

import TItemStyles from '../TItem/TItem.module.css';
import SortButton from '../SortButton/SortButton';
import { useTheme } from '../../hooks/useTheme';

interface ISearchResult {
    data: TorrentItem[];
}

type TOrderDirection = 'DESC' | 'ASC';

const sortByTypes = (a: any, b: any, type: keyof TorrentItem) => {
    switch (type) {
    case 'category':
    case 'title':
    case 'author':
        return a.localeCompare(b);
    default:
        return a - b;
    }
};

const SearchResult:FC<ISearchResult> = ({ data }) => {
    const [sortTarget, setSortTarget] = useState<keyof TorrentItem>('seeds');
    const [orderDirections, setOrderDirections] = useState<TOrderDirection>('DESC');
    const { isLightTheme } = useTheme();
    const sortedData = useMemo(() => {
        const nSortedData = data.sort((a, b) => (orderDirections === 'ASC'
            ? sortByTypes(a[sortTarget], b[sortTarget], sortTarget)
            : sortByTypes(b[sortTarget], a[sortTarget], sortTarget)
        ));
        return nSortedData;
    }, [data, orderDirections, sortTarget]);

    const onChangeSortTarget = (target: keyof TorrentItem) => {
        setOrderDirections((prevState) => (prevState === 'DESC' ? 'ASC' : 'DESC'));
        setSortTarget(target);
    };

    return (
        <div className={styles.wrapper}>
            <div className={cn(TItemStyles.wrapper, styles.header, {
                [TItemStyles.wrapperDark]: !isLightTheme,
            })}
            >
                <SortButton onClick={() => onChangeSortTarget('title')} label="Название" direction={sortTarget === 'title' ? orderDirections : undefined} />
                <SortButton className={TItemStyles.category} onClick={() => onChangeSortTarget('category')} label="Категория" direction={sortTarget === 'category' ? orderDirections : undefined} />
                <SortButton onClick={() => onChangeSortTarget('size')} label="Размер" direction={sortTarget === 'size' ? orderDirections : undefined} />
                <SortButton onClick={() => onChangeSortTarget('seeds')} label="Сиды" direction={sortTarget === 'seeds' ? orderDirections : undefined} />
            </div>
            {
                sortedData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layout
                    >
                        <TItem
                            id={item.id}
                            title={item.title}
                            category={item.category}
                            seeds={item.seeds}
                            size={item.size}
                            delay={index}
                            light={isLightTheme}
                        />
                    </motion.div>
                ))
            }
        </div>
    );
};

export default SearchResult;
