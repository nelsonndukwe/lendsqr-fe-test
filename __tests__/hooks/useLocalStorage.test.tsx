import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
    const storageKey = "test-key";

    beforeEach(() => {
        localStorage.clear();
    });

    describe("positive scenarios", () => {
        it("returns initial value when key is not in localStorage", () => {
            const { result } = renderHook(() =>
                useLocalStorage(storageKey, "initial")
            );
            expect(result.current[0]).toBe("initial");
        });

        it("returns initial value for object type", () => {
            const initial = { name: "test" };
            const { result } = renderHook(() =>
                useLocalStorage(storageKey, initial)
            );
            expect(result.current[0]).toEqual(initial);
        });

        it("sets value and persists to localStorage after hydration", async () => {
            const { result } = renderHook(() =>
                useLocalStorage<string>(storageKey, "initial")
            );
            await act(async () => {
                result.current[1]("updated");
            });
            expect(result.current[0]).toBe("updated");
            expect(localStorage.getItem(storageKey)).toBe(JSON.stringify("updated"));
        });

        it("removeItem clears key and resets to initial value", async () => {
            const { result } = renderHook(() =>
                useLocalStorage<string>(storageKey, "initial")
            );
            await act(async () => {
                result.current[1]("set");
            });
            await act(async () => {
                result.current[2]();
            });
            expect(result.current[0]).toBe("initial");
            expect(localStorage.getItem(storageKey)).toBeNull();
        });

        it("clearStorage clears all localStorage and resets state", async () => {
            const { result } = renderHook(() =>
                useLocalStorage<string>(storageKey, "initial")
            );
            await act(async () => {
                result.current[1]("set");
            });
            localStorage.setItem("other", "value");
            await act(async () => {
                result.current[3]();
            });
            expect(result.current[0]).toBe("initial");
            expect(localStorage.length).toBe(0);
        });

        it("getKey returns key at index", () => {
            localStorage.setItem("key0", "a");
            localStorage.setItem("key1", "b");
            const { result } = renderHook(() =>
                useLocalStorage<string>("key0", undefined)
            );
            const key = result.current[4](0);
            expect(["key0", "key1"]).toContain(key);
        });

        it("updates state when setValue is called with function", async () => {
            const { result } = renderHook(() =>
                useLocalStorage<number>(storageKey, 0)
            );
            await act(async () => {
                result.current[1]((prev) => (prev ?? 0) + 1);
            });
            expect(result.current[0]).toBe(1);
        });
    });

    describe("negative scenarios", () => {
        it("handles invalid JSON in localStorage gracefully", async () => {
            localStorage.setItem(storageKey, "not valid json");
            const consoleSpy = jest.spyOn(console, "error").mockImplementation();
            const { result } = renderHook(() =>
                useLocalStorage<string>(storageKey, "fallback")
            );
            await act(async () => { });
            expect(result.current[0]).toBe("fallback");
            consoleSpy.mockRestore();
        });

        it("getKey returns null for out-of-range index", () => {
            const { result } = renderHook(() =>
                useLocalStorage<string>(storageKey, undefined)
            );
            const key = result.current[4](999);
            expect(key).toBeNull();
        });
    });
});
