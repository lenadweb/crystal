import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="Агрегатор фильмов и сериалов Devlo.ru" />
                    <meta name="keywords" content="фильмы, сериалы, смотреть, трейлеры" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
