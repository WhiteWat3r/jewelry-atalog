import style from './App.module.scss';
import { Catalog } from '../Catalog/Catalog';
import { Filter } from '../Filter/Filter';

function App() {


  return (
    <div className={style.main}>
      <Filter />
      <Catalog />
    </div>
  );
}

export default App;
