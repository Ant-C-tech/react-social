export const selectTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#dce2e4',
      primary25: 'rgb(230, 250, 230)'
    }
  }
}
