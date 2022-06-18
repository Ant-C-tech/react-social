export const selectTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#707070',
      primary25: 'rgb(230, 250, 230)'
    }
  }
}
