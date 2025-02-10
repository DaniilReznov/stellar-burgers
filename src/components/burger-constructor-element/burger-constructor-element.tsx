import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  deleteIngredient,
  moveIngredientsDown,
  moveIngredientsUp
} from '../../services/reducers/constructor';

const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMove = (direction: 'up' | 'down') => {
      const action =
        direction === 'up' ? moveIngredientsUp : moveIngredientsDown;
      dispatch(action(index));
    };

    const handleClose = () => dispatch(deleteIngredient(index));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMove('up')}
        handleMoveDown={() => handleMove('down')}
        handleClose={handleClose}
      />
    );
  }
);

export { BurgerConstructorElement };
