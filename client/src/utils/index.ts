export function append<T>(items: T[], item: T) {
  return [...items, item];
}

export function remove<T>(items: T[], index: number) {
  return [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
}

export function update<T>(items: T[], index: number, f: (value: T) => T) {
  return items.map((item, i) => (i === index ? f(item) : item));
}

/**
 * `${index}-${value}`의 형태의 key를 반환
 * @param value
 * @param index
 * @returns `${index}-${value}`
 */
export function key(value: string, index: number) {
  return `${index}-${value}`;
}

// callback의 타입은 T, T의 매개변수는 ...args이므로 타입은 Parameters<T>
/**
 *
 * @param callback
 * @param delay
 * @returns `fn()`
 */
export function debounceCallback<T extends(...args: unknown[]) => void>(
  callback: T, delay = 300) {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

