import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'

import theme from './theme'
import OrderBook from "./order-book";

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  
  * {
    box-sizing: border-box;
    font-family: "Helvetica Neue", sans-serif;
  }
`

const App = styled(function App(props) {
    const { className } = props

    return (
        <div className={className}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <OrderBook className="order-table" />
            </ThemeProvider>
        </div>
    )
})`
  margin: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  
  > .order-table {
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
`

export default App
