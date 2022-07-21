import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const YMInitializer = dynamic(() => import('react-yandex-metrika').then((mod) => mod.YMInitializer as any), {
    ssr: false,
});

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Crystal | Simple search engine</title>
                <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0" />
            </Head>
            {/* @ts-ignore */}
            <YMInitializer accounts={[89632991]} />
            <Component {...pageProps} />
        </>
    );
}

export default App;
