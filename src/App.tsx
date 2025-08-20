import { config } from "./config"

const App = () => {
  const urls = config.baseUrl;
  console.log(
    urls
  )
  return (
    <div>
      <h1>Hello World</h1>
      
    </div>
  )
}

export default App