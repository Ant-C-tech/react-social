export const selectStyles = {
  control: (styles) => ({
    ...styles,
    position: 'relative',
    left: '0px',
    marginBottom: '15px',
    color: '#3f3f3f',
    border: '1px solid',
    borderColor: '#707070',
    boxShadow: '12px 15px 10px -5px #707070',
    transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
    "&:hover": {
      boxShadow: '0px 0px 0px 0px #707070',
      left: '3px'
    },
  }),
  menu: (styles) => ({
    ...styles,
    position: 'relative',
    left: '0px',
    color: '#3f3f3f',
    boxShadow: "12px 15px 10px -5px #707070",
    transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
    "&:hover": {
      boxShadow: '0px 0px 0px 0px #707070',
      left: '3px'
    }
  }),
  menuList: (styles) => ({
    ...styles,
    margin: '0 10px'
  }),
  option: (styles) => ({
    ...styles,
    borderRadius: '4px'
  }),
}
