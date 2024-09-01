import { useState, useEffect } from 'react';

import { uniqueArray } from '../utils/uniqueArray';
import { remove } from '../utils';

export function useKeywordHistory() {
  const [keywordHistory, setKeywordHistory] = useState<string[]>([]);

  useEffect(() => {
    setKeywordHistory(loadHistory());
  }, [])

  /**
   * 로컬 스토리지에서 히스토리를 가져오기
   */
  const loadHistory = () => {
    const storedHistory = localStorage.getItem("keywordHistory");
    return storedHistory ? storedHistory.split(",") : [];
  };

  /**
   * 히스토리 추가
   * @param keyword
   */
  const addKeywordHistory = (keyword: string) => {
    const updatedHistory = [keyword, ...keywordHistory];
    saveHistory(updatedHistory);
  };

  /**
   * 로컬 스토리지에 히스토리를 저장
   * @param newHistory
   */
  const saveHistory = (newHistory: string[]) => {
    const keywordHistory = uniqueArray(newHistory).slice(0, 10);
    localStorage.setItem("keywordHistory", keywordHistory.join(","));
    setKeywordHistory(keywordHistory);
  };

  /**
   * 히스토리에서 특정 항목을 제거
   * @param index
   */
  const removeKeywordHistory = (index: number) => {
    const updatedHistory = remove(keywordHistory, index);
    saveHistory(updatedHistory);
  };

  /**
   * 히스토리 전체 삭제
   */
  const clearHistory = () => {
    localStorage.removeItem("keywordHistory");
    setKeywordHistory([]);
  };

  return {
    keywordHistory,
    addKeywordHistory,
    removeKeywordHistory,
    clearHistory,
  };
}
