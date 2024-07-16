export function append<T>(items: T[], item: T) {
  return [...items, item];
}

export function remove<T>(items: T[], index: number) {
  return [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
}

/**
 * `items`의 `index`에 있는 값을 `callback`의 반환 값으로 업데이트
 * @param items
 * @param index
 * @param callback
 */
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

export function inputSanitizer(value: string) {
  let sanitizedValue = value.replace(/[^0-9.]/g, '');

  // '.'으로 시작하는 경우 앞에 '0' 붙임
  if (sanitizedValue.startsWith('.')) sanitizedValue = '0' + sanitizedValue;

  const parts = sanitizedValue.split('.');

  if (parts.length > 2) {
    sanitizedValue = parts[0] + '.' + parts.slice(1).join('').slice(0, 1);
  }

  //  정수 부분 3자리 제한
  if (parts[0].length > 3) sanitizedValue = sanitizedValue.slice(0, 3);

  // 소수 부분이 1자리 제한
  if (parts.length === 2 && parts[1].length > 1) {
    parts[1] = parts[1].slice(0, 1);
    sanitizedValue = `${parts[0]}.${parts[1]}`;
  }

  return sanitizedValue;
}