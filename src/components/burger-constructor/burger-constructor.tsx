import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { resetState, stateSelector } from '../../services/reducers/constructor';
import {
  isLoadingSelector,
  makeOrder,
  orderSelector,
  resetOrder
} from '../../services/reducers/orders';
import { UserSelector } from '../../services/reducers/auth';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(stateSelector);
  const orderRequest = useSelector(isLoadingSelector);
  const orderModalData = useSelector(orderSelector);
  const user = useSelector(UserSelector);
  const nav = useNavigate();

  const ingredientsIds = useMemo(
    () =>
      [
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun?._id
      ].filter((id): id is string => id !== undefined),
    [constructorItems]
  );

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || !user) {
      if (!user) nav('/login', { replace: true });
      return;
    }
    dispatch(makeOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetState());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
