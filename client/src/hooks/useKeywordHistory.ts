import { useState, useEffect } from 'react';

import { uniqueArray } from '../utils/uniqueArray';
import { remove } from '../utils';

export function useKeywordHistory() {
  const [keywordHistory, setKeywordHistory] = useState<string[]>([]);
  const [isAutoSave, setIsAutoSave] = useState<boolean>(true);

  useEffect(() => {
    setKeywordHistory(loadHistory());
    setIsAutoSave(loadAutoSaveSetting());
  }, [])

  /**
   * 로컬 스토리지에서 히스토리를 가져오기
   */
  const loadHistory = () => {
    const storedHistory = localStorage.getItem("keywordHistory");
    return storedHistory ? storedHistory.split(",") : [];
  };

  /**
   * 로컬 스토리지에서 isAutoSave 설정을 가져오기
   */
  const loadAutoSaveSetting = () => {
    const storedAutoSave = localStorage.getItem("isAutoSave");
    return storedAutoSave ? storedAutoSave === 'true' : true;
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

  /**
   * isAutoSave 상태 업데이트 및 로컬 스토리지에 저장
   * @param value
   */
  const toggleAutoSave = () => {
    setIsAutoSave((prev) => {
      const newValue = !prev;
      localStorage.setItem("isAutoSave", newValue.toString());
      return newValue;
    });
  };


  return {
    keywordHistory,
    isAutoSave,
    addKeywordHistory,
    removeKeywordHistory,
    clearHistory,
    toggleAutoSave
  };
}
