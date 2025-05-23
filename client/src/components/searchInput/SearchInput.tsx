import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useKeywordHistory } from '../../hooks/useKeywordHistory';
import SearchInputBody from './SearchInputBody';
import SearchInputHeader from './SearchInputHeader';

type SearchInputProps = {
  headerOpened: boolean;
  bodyOpened: boolean;
  hideHeader: () => void;
  hideBody: () => void;
  openBody?: () => void;
  isInitialOpen?: boolean;
};

export default function SearchInput({
  headerOpened,
  bodyOpened,
  hideHeader,
  hideBody,
  openBody,
  isInitialOpen = false,
}: SearchInputProps) {
  const portalRoot = document.querySelector('#portalRoot')!;

  const [isFocused, setIsFocused] = useState(false);

  const {
    keywordHistory,
    isAutoSave,
    addKeywordHistory,
    removeKeywordHistory,
    clearHistory,
    toggleAutoSave,
  } = useKeywordHistory();

  useEffect(() => {
    if (headerOpened && (isFocused || isInitialOpen)) {
      openBody?.();
    }
  }, [isFocused, headerOpened, isInitialOpen, openBody]);

  const handleClickDeleteAllHistory = () => {
    clearHistory();
  };

  return (
    <>
      {headerOpened &&
        createPortal(
          <SearchInputHeader
            isAutoSave={isAutoSave}
            hideHeader={hideHeader}
            hideBody={hideBody}
            setIsFocused={setIsFocused}
            addKeywordHistory={addKeywordHistory}
          />,
          portalRoot,
        )}
      {bodyOpened &&
        createPortal(
          <SearchInputBody
            keywordHistory={keywordHistory}
            isAutoSave={isAutoSave}
            toggleAutoSave={toggleAutoSave}
            removeKeywordHistory={removeKeywordHistory}
            handleClickDeleteAllHistory={handleClickDeleteAllHistory}
            hideBody={hideBody}
          />,
          portalRoot,
        )}
    </>
  );
}
