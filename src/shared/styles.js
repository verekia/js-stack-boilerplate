import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const styles = {
  hoverMe: {
    '&:hover': {
      color: 'red',
    },
  },
  '@media (max-width: 800px)': {
    resizeMe: {
      color: 'red',
    },
  },
}

const styleSheet = jss.createStyleSheet(styles)

export const classes = styleSheet.classes
export default styleSheet
