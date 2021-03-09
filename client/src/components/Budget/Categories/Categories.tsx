import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddCategory,
  fetchDeleteCategory,
  getCategories,
  updateCategory,
} from '../../../store/ducks/budget/actions';
import {
  selectCategories,
  selectLoadingStatus,
} from '../../../store/ducks/budget/selectors';
import { CategoryInterface } from '../../../store/ducks/budget/contracts/state';
import { LoadingStatus } from '../../../store/types';
import { CategoryEditorParams } from '../../../types';
import Button from '../../UI/Button';
import Loader from '../../UI/Loader';
import CategoryItem from './CategoryItem';
import CategoryEditor from './CategoryEditor';
import Table from '../../Table';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loadingStatus = useSelector(selectLoadingStatus);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryInterface | undefined>();

  useEffect(() => {
    if (categories.length < 1) {
      dispatch(getCategories());
    }
  }, []);

  const onChangeCategoryHandler = (e: React.MouseEvent, id: string): void => {
    e.preventDefault();
    const currentCategory = categories.find(item => item._id === id);
    setCurrentCategory(currentCategory);
    setModalIsOpen(true);
  };

  const onDeleteCategoryHandler = async (id: string) => {
    dispatch(fetchDeleteCategory(id));
  };

  const onOkModalClick = (params: CategoryEditorParams): void => {
    const category: CategoryInterface = {
      _id: currentCategory!._id,
      name: params.value,
      amount: currentCategory!.amount,
      color: currentCategory!.color,
      user: currentCategory!.user,
      isExpense: params.isExpense,
    };
    dispatch(updateCategory(category));
    setModalIsOpen(false);
  };

  const onOkNewCategoryModalClick = (params: CategoryEditorParams): void => {
    addCategoryHandler(params.value, params.isExpense!);
    setNewCategoryModalIsOpen(false);
  };

  const onCancelModalClick = () => {
    setModalIsOpen(false);
  };

  const addCategoryHandler = async (name: string, isExpense: boolean) => {
    const category: CategoryInterface = {
      _id: '',
      name,
      amount: 0,
      color: '',
      user: '',
      isExpense,
    };
    dispatch(fetchAddCategory(category));
  };

  return (
    <Fragment>
      {loadingStatus === LoadingStatus.LOADING ? (
        <Loader type="cube-grid" />
      ) : (
        <div className="categories">
          <h2>Категории</h2>
          <Table className="categories">
            {categories.map(item => (
              <CategoryItem
                key={item._id}
                _id={item._id}
                name={item.name}
                amount={item.amount}
                onChangeCategory={onChangeCategoryHandler}
                onDeleteCategory={onDeleteCategoryHandler}
              />
            ))}
          </Table>
          <Button
            color="primary"
            size="small"
            disabled={false}
            onClick={() => setNewCategoryModalIsOpen(toggle => !toggle)}
          >
            Создать категорию
          </Button>

          {newCategoryModalIsOpen && (
            <CategoryEditor
              title="Новая категория"
              onClick={onOkNewCategoryModalClick}
              onCloseClick={() => setNewCategoryModalIsOpen(false)}
            />
          )}

          {modalIsOpen && (
            <CategoryEditor
              title="Изменить категорию"
              category={currentCategory}
              onClick={onOkModalClick}
              onCloseClick={onCancelModalClick}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Categories;
