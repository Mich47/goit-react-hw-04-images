import { PropTypes } from 'prop-types';
import { Box } from 'components/Box';
import { STATUS } from 'constants/status.constants';
import { useState } from 'react';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { removeExtraSpaces } from 'helpers/removeExtraSpaces';
import {
  ButtonIconStyled,
  FormStyled,
  InputStyled,
} from '../Searchbar/Searchbar.styled';

export const Searchbar = ({ onSubmitForm, status }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleErase = () => {
    setSearch('');
  };

  //Прибираємо усі зайві пробіли
  const query = removeExtraSpaces(search);

  return (
    <Box p={4} borderBottom="normal" borderColor="darkGray" as="header">
      <FormStyled onSubmit={event => onSubmitForm(event, query)}>
        <ButtonIconStyled
          type="submit"
          left={0}
          disabled={status !== STATUS.success && status !== STATUS.idle}
        >
          <IoSearchOutline />
        </ButtonIconStyled>

        <InputStyled
          name="search"
          value={search}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />

        <ButtonIconStyled type="button" right={0} onClick={handleErase}>
          <IoCloseOutline />
        </ButtonIconStyled>
      </FormStyled>
    </Box>
  );
};

Searchbar.propTypes = {
  status: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};
