import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { v4 as uuid } from "uuid";

import "./style.scss";

interface Props {
  total: number;
  limit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const pageLength = 5;

const Pagination = ({ total, limit, currentPage, setCurrentPage }: Props) => {
  const [startFrom, setStartFrom] = useState<number>(1);

  const maxInView = pageLength - 1 + startFrom;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (currentPage === maxInView) {
      setStartFrom(startFrom + 1);
    } else if (
      maxInView - currentPage === pageLength - 1 &&
      currentPage !== 1
    ) {
      setStartFrom(startFrom - 1);
    }
  }, [currentPage, maxInView, startFrom]);

  const displayPages = (pageLength: number) => {
    return Array.from({ length: pageLength }, (_, i) => i + startFrom).map(
      (page: number) => {
        return (
          <div
            key={uuid()}
            className={`pagination__page ${
              currentPage === page ? "current" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </div>
        );
      }
    );
  };

  return (
    <div className="pagination">
      <div className="pagination__container">
        <div
          className="pagination__controls"
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1);
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className="pagination__pages">
          {totalPages > 5 ? (
            <>
              {displayPages(pageLength)}
              <div className="pagination__page">...</div>
              <div className="pagination__page">{totalPages}</div>
            </>
          ) : (
            displayPages(totalPages)
          )}
        </div>
        <div
          className="pagination__controls"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
