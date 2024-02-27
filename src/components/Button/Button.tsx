import classNames from 'classnames';
import style from './Button.module.scss';

interface IButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type: 'primary' | 'secondary';
  disabled: boolean;
}

export const Button = ({ children, onClick, type, disabled }: IButtonProps) => {
  return (
    <button
      className={classNames(
        style.button,
        type === 'primary' ? style.button_type_primary : style.button_type_secondary,
      )}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};
