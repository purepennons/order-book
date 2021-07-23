import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

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
            <div>Entry point</div>
        </>
    )
}

export default App
