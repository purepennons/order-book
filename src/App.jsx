import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  
  * {
    box-sizing: border-box;
  }
`

function App(props) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <div>Entry point</div>
            </ThemeProvider>
        </>
    )
}

export default App
