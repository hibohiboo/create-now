import { addParameters } from '@storybook/react'
import '@storybook/addon-console'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import 'sanitize.css'

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})
