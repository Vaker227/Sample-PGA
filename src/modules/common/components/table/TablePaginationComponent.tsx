import React from 'react';
import { getPagingRange } from '../../utils';
import PageSelectComponent from './PageSelectComponent';

interface Props {
  pagesLength: number;
  currentPage: number;
  setPage(page: number): void;
}

function TablePaginationCompoent(props: Props) {
  const { pagesLength, currentPage, setPage } = props;
  const pageNumbers = getPagingRange(pagesLength, currentPage, 7);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pagesLength) {
      setPage(currentPage + 1);
    }
  };
  return (
    <div>
      <div className="flex w-fit divide-x divide-secondary border border-secondary">
        <PageSelectComponent onClick={handlePreviousPage} disabled={currentPage == 1}>
          &laquo;
        </PageSelectComponent>
        {pageNumbers.map((number, index) => {
          if (index == 0) number = 1;
          if (index == 6) number = pagesLength;
          const isSpeard = (index == 1 && number - 1 !== 1) || (index == 5 && number + 1 !== pagesLength);
          return (
            <PageSelectComponent key={number} selected={currentPage == number} onClick={() => setPage(number)}>
              {!isSpeard ? number : '...'}
            </PageSelectComponent>
          );
        })}
        <PageSelectComponent onClick={handleNextPage} disabled={currentPage == pagesLength}>
          &raquo;
        </PageSelectComponent>
      </div>
    </div>
  );
}

export default React.memo(TablePaginationCompoent);
