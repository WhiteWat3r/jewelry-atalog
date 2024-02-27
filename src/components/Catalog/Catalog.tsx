import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import style from './Catalog.module.scss';
import { fetchAllIds, fetchItems } from '../../services/actionCreators';
import { Loader } from '../Loader/Loader';
import classNames from 'classnames';
import { Pagination } from '../Pagination/Pagination';
import { headerItems } from '../../utils/constants';

export const Catalog = () => {
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
    <div className={style.catalog}>
      <ul className={style.header}>
        {headerItems.map((item) => (
          <li key={item.id} className={style.header__item}>
            {item.name}
          </li>
        ))}
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
              <span className={style.product__item}>{product.price}</span>{' '}
              <span className={style.product__item}>{product.brand}</span>
            </li>
          ))
        ) : (
          'Не найдено'
        )}
      </ul>
      <Pagination />
    </div>
  );
};
