import { Editor } from 'ketcher-react'
import './App.css'

function App() {
  return (
    <div className="App">
      <Editor staticResourcesUrl={process.env.PUBLIC_URL} />
    </div>
  )
}

export default App
