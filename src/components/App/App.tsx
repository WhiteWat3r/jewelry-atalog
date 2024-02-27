import { useEffect } from 'react';
import style from './App.module.scss';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { Filter } from '../Filter/Filter';
import { fetchAllIds, fetchItems } from '../../services/actionCreators';
import classNames from 'classnames';

function App() {
  const dispatch = useAppDispatch();

  const allIds = useAppSelector((store) => store.products?.allIds);
  const isLoading = useAppSelector((store) => store.products.isLoading);

  useEffect(() => {
    dispatch(fetchAllIds());
  }, []);

  useEffect(() => {
    if (allIds?.length > 0) {
      const ids = allIds.slice(0, 50);
      dispatch(fetchItems(ids));
    }
  }, [allIds]);

  const products = useAppSelector((store) => store.products.items);

  return (
    <div className={style.main}>
      <Filter />

      <div className={style.catalog}>
        <ul className={style.header}>
          <li className={style.header__item}>id товара</li>
          <li className={style.header__item}>Название</li>
          <li className={style.header__item}>Цена</li>
          <li className={style.header__item}>Бренд</li>
        </ul>
        <ul className={style.products}>
          {isLoading ? (
            <div className={style.products__loaderContainer}>
              <Loader />
            </div>
          ) : products?.length > 0 ? (
            products?.map((product) => (
              <li className={style.product} key={product.id}>
                <span className={classNames(style.product__item, style.product__name)}>
                  {product.id}
                </span>
                <span className={classNames(style.product__item, style.product__name)}>
                  {product.product}
                </span>
                <span className={classNames(style.product__item, )}>
                  {product.price}
                </span>{' '}
                <span className={classNames(style.product__item, )}>
                  {product.brand}
                </span>
              </li>
            ))
          ) : (
            'Не найдено'
          )}
        </ul>
        <Pagination />
      </div>
    </div>
  );
}

export default App;
