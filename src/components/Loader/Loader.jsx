import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
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
  );
};
