export const StoreResponse = (api, store_name) => {
    return {
        type : 'STORE_RESPONSE_DATA',
        store : store_name,
        api : api
    }
}