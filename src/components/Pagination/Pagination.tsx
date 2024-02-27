import { useEffect, useState } from 'react';
import style from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import classNames from 'classnames';
import { IoArrowForward } from 'react-icons/io5';
import { fetchItems } from '../../services/actionCreators';

export const Pagination = () => {
  const dispatch = useAppDispatch();

  // const [paginationBullets, setPaginationBullets] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expectedPage, setExpectedPage] = useState(1);

  const isLoading = useAppSelector((store) => store.products.isLoading);
  const allIds = useAppSelector((store) => store.products?.allIds);
  const lastPage = Math.ceil(allIds?.length / 50);

  useEffect(() => {
    setCurrentPage(1);
  }, [allIds]);

  const handlePaginate = async (page: number) => {
    setCurrentPage(page);
    const ids = allIds.slice(page * 50 - 50, page * 50);
    dispatch(fetchItems(ids));
  };

  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePaginate(expectedPage);
  };

  return (
    <div className={style.container}>
      <span> 1-{lastPage}</span>
      <ul className={style.pagination}>
        {lastPage ? (
          <>
            <li>
              <button
                className={classNames(style.pagination__item)}
                onClick={() => handlePaginate(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}>
                <MdArrowBackIos />
              </button>
            </li>

            <li>
              <button
                className={classNames(style.pagination__item)}
                // onClick={() => typeof bullet === 'number' && handlePaginate(bullet)}
                disabled={isLoading}>
                {currentPage}
              </button>
            </li>

            <li>
              <button
                className={classNames(style.pagination__item)}
                onClick={() => handlePaginate(currentPage + 1)}
                disabled={currentPage === lastPage || isLoading}>
                <MdArrowForwardIos />
              </button>
            </li>
          </>
        ) : (
          ''
        )}
      </ul>
      <form className={style.toThePage} onSubmit={handleSumit}>
        <label>К странице</label>
        <input
          type={'number'}
          className={style.currentPage}
          value={expectedPage}
          onChange={(e) => setExpectedPage(Number(e.target.value))}
        />
        <button
          disabled={
            currentPage === expectedPage ||
            isLoading ||
            expectedPage > lastPage ||
            expectedPage <= 0
          }
          type={'submit'}
          className={style.setPageButton}>
          {<IoArrowForward size={28} />}
        </button>
      </form>
    </div>
  );
};
