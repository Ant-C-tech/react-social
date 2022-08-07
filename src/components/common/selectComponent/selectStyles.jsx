export const selectStyles = {
  control: (styles) => ({
    ...styles,
    // position: 'relative',
    height: '55px',
    // left: '0px',
    marginBottom: '15px',
    color: '#323e42',
    border: '1px solid #323e42',
    transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
    "&:hover": {
      // border: '1px solid #323e42'
      boxShadow: '0px 0px 0px 0px #718b93',
      // left: '3px',
    },
  }),
  menu: (styles) => ({
    ...styles,
    position: 'relative',
    left: '0px',
    color: ' #323e42',
    boxShadow: "12px 15px 10px -5px #718b93",
    transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
    border: '1px solid #323e42',
    "&:hover": {
      boxShadow: '0px 0px 0px 0px #718b93',
      left: '3px',
    },
  }),
  menuList: (styles) => ({
    ...styles,
    margin: '0 10px'
  }),
  option: (styles) => ({
    ...styles,
    paddingBottom: '5px',
    borderRadius: '4px',
    fontWeight: 'bold',
    color:'#323e42'
  }),
  singleValue: (styles) => ({
    ...styles,
    padding: '5px 0',
  }),
}
