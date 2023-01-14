import { PropTypes } from 'prop-types';
import { Box } from 'components/Box';
import { STATUS } from 'constants/status.constants';
import { Component } from 'react';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import {
  ButtonIconStyled,
  FormStyled,
  InputStyled,
} from '../Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleErase = () => {
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;

    //Прибираємо усі зайві пробіли
    const query = search
      .split(' ')
      .filter(word => word !== '')
      .join(' ');

    const { onSubmitForm, status } = this.props;
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
            onChange={this.handleChange}
          />

          <ButtonIconStyled type="button" right={0} onClick={this.handleErase}>
            <IoCloseOutline />
          </ButtonIconStyled>
        </FormStyled>
      </Box>
    );
  }
}
