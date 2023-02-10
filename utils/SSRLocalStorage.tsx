const SSRLocalStorage = () => {
    let localeStorage: Storage = {
        length: 0,
        clear: () => {},
        getItem: (key: string) => null,
        key: (index: number) => null,
        removeItem: (key:string) => {},
        setItem: (key: string, value: string) => {}
    };

    if (typeof window !== "undefined"){
        localeStorage = window.localStorage;
    }

    return localeStorage;
}

export default SSRLocalStorage;