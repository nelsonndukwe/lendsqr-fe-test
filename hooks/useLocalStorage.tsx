import { useEffect, useState, useRef } from "react";

type SetValue<T> = T | ((val: T | undefined) => T);

function useLocalStorage<T>(
    key: string,
    initialValue?: T
): [
    T | undefined,
    (value: SetValue<T>) => void,
    () => void,
    () => void,
    (index: number) => string | null
] {
    // Use lazy initialization to read from localStorage only once during initial render
    const [storedValue, setStoredValue] = useState<T | undefined>(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                return JSON.parse(item);
            }
            return initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const skipSyncRef = useRef(false);
    const isInitialMount = useRef(true);

    useEffect(() => {
        // Skip sync on initial mount since lazy initialization already handled it
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (skipSyncRef.current) {
            skipSyncRef.current = false;
            return;
        }

        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    const setValue = (value: SetValue<T>) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
        } catch (error) {
            console.error(error);
        }
    };

    const removeItem = () => {
        try {
            skipSyncRef.current = true;
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(error);
        }
    };

    const clearStorage = () => {
        try {
            skipSyncRef.current = true;
            window.localStorage.clear();
            setStoredValue(initialValue);
        } catch (error) {
            console.error(error);
        }
    };

    const getKey = (index: number) => {
        try {
            return window.localStorage.key(index);
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    return [storedValue, setValue, removeItem, clearStorage, getKey];
}

export default useLocalStorage;
