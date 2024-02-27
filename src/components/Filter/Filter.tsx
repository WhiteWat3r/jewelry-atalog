import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Button } from '../Button/Button';
import style from './Filter.module.scss';
import { fetchAllIds, filterItems } from '../../services/actionCreators';

export const Filter = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((store) => store.products.isLoading);

  const [product, setProduct] = useState('');
  const [price, setPrice] = useState<string | number>('');
  const [brand, setBrand] = useState('');

  const handleSearchProduct = () => {
    dispatch(filterItems({ product: product }));
    setPrice('');
    setBrand('');
  };

  const handleSearchBrand = () => {
    dispatch(filterItems({ brand: brand }));
    setPrice('');
    setProduct('');
  };

  const handleSearchPrice = () => {
    dispatch(filterItems({ price: price }));
    setProduct('');
    setBrand('');
  };

  const handleReset = () => {
    dispatch(fetchAllIds());
    setPrice('');
    setProduct('');
    setBrand('');
  };

  return (
    <div className={style.filter}>
      <div className={style.filter__section}>
        <label htmlFor="name" className={style.filter__label}>
          Название
        </label>
        <input
          id="name"
          type="text"
          className={style.filter__input}
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <Button type={'primary'} onClick={handleSearchProduct} disabled={isLoading || !product}>
          Применить
        </Button>
      </div>

      <div className={style.filter__section}>
        <label htmlFor={'number'} className={style.filter__label}>
          Цена
        </label>
        <input
          id={'price'}
          type={'number'}
          className={style.filter__input}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Button type={'primary'} onClick={handleSearchPrice} disabled={isLoading || !price}>
          Применить
        </Button>
      </div>

      <div className={style.filter__section}>
        <label htmlFor={'brand'} className={style.filter__label}>
          Бренд
        </label>
        <input
          id={'brand'}
          type={'text'}
          className={style.filter__input}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Button type={'primary'} onClick={handleSearchBrand} disabled={isLoading || !brand}>
          Применить
        </Button>
      </div>

      <Button
        type={'secondary'}
        onClick={handleReset}
        disabled={isLoading || (!product && !brand && !price)}>
        Сбросить фильтр
      </Button>
    </div>
  );
};
