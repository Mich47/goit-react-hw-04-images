import { PropTypes } from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { STATUS } from 'constants/status.constants';

export const Loader = ({ status }) => {
  return (
    status === STATUS.loading && (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#07c"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          height: '34px',
          paddingTop: '16px',
          paddingBottom: '32px',
        }}
        wrapperClassName=""
        visible={true}
      />
    )
  );
};

Loader.propTypes = {
  status: PropTypes.string.isRequired,
};
