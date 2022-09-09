export const queryMiddleware = (params, body, url) => {
    const { query } = params;

    url.searchParams.append('nm', query);
};
