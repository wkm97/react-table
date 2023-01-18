import { useEffect, useState } from 'react';

interface User {
  login: string
  avatar_url: string
}

interface Repository {
  id: number
  owner: User
  name: string
  html_url: string
  description: string
}

function App() {
  const [repositories, setRepositories] = useState<Array<Repository>>([]);

  useEffect(() => {
    fetch('https://api.github.com/repositories')
      .then((response) => response.json())
      .then((data: Array<Repository>) => {
        setRepositories(data)
      })
  }, [])

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>avatar</th>
            <th>owner</th>
            <th>name</th>
            <th>url</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((repository) =>
            <tr key={repository.id}>
              <td>{repository.owner.avatar_url}</td>
              <td>{repository.owner.login}</td>
              <td>{repository.name}</td>
              <td>{repository.html_url}</td>
              <td>{repository.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
