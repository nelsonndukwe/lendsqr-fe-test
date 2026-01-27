import { useEffect, useState } from "react";

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
    const [storedValue, setStoredValue] = useState<T | undefined>(initialValue);

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                setValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setHydrated(true);
        }
    }, [key]);

    useEffect(() => {
        if (!hydrated) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue, hydrated]);

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
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(error);
        }
    };

    const clearStorage = () => {
        try {
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
