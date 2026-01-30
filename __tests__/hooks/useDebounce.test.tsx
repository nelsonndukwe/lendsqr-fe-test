import { renderHook, act } from "@testing-library/react";
import useDebounce from "@/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  describe("positive scenarios", () => {
    it("returns initial value immediately", () => {
      const { result } = renderHook(() => useDebounce("hello", 500));
      expect(result.current).toBe("hello");
    });

    it("returns previous value until delay has passed after change", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "initial", delay: 500 } }
      );
      expect(result.current).toBe("initial");

      rerender({ value: "updated", delay: 500 });
      expect(result.current).toBe("initial");

      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(result.current).toBe("updated");
    });

    it("updates after new delay when delay prop changes", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "a", delay: 1000 } }
      );
      rerender({ value: "b", delay: 1000 });
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(result.current).toBe("a");
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(result.current).toBe("b");
    });

    it("debounces rapid changes and uses latest value after delay", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "1", delay: 300 } }
      );
      rerender({ value: "2", delay: 300 });
      rerender({ value: "3", delay: 300 });
      act(() => {
        jest.advanceTimersByTime(300);
      });
      expect(result.current).toBe("3");
    });
  });

  describe("negative scenarios", () => {
    it("does not update before delay expires", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "old", delay: 500 } }
      );
      rerender({ value: "new", delay: 500 });
      act(() => {
        jest.advanceTimersByTime(499);
      });
      expect(result.current).toBe("old");
    });

    it("handles empty string value", () => {
      const { result } = renderHook(() => useDebounce("", 500));
      expect(result.current).toBe("");
    });

    it("handles zero delay (updates on next tick)", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "first", delay: 0 } }
      );
      rerender({ value: "second", delay: 0 });
      act(() => {
        jest.runAllTimers();
      });
      expect(result.current).toBe("second");
    });
  });
});
