import styled from '@emotion/styled'

const Button = styled.button`
  width: ${(props) => {
    console.log(props.width)
    return `${props.width}px` || '100px'
  }};
`

function App() {
  return (
    <div className="App">
      <Button width={300}>Click me</Button>
    </div>
  )
}

export default App
