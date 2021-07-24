import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'

import theme from './theme'
import OrderBook from "./order-book";

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
                <OrderBook />
            </ThemeProvider>
        </>
    )
}

export default App
