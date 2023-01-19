import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from './components/pagination';
import { usePagination } from './hooks/use-pagination';

interface User {
  login: string;
  avatar_url: string;
}

interface Repository {
  id: number;
  owner: User;
  name: string;
  html_url: string;
  description: string;
}

const pageSize = 10;

const AppContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [repositories, setRepositories] = useState<Array<Repository>>([]);
  const { currentPage, handlePageChange, startIndex, endIndex } = usePagination(
    {
      totalCount: repositories.length,
      pageSize,
    }
  );

  useEffect(() => {
    fetch('https://api.github.com/repositories')
      .then(response => response.json())
      .then((data: Array<Repository>) => {
        setRepositories(data);
      });
  }, []);

  const currentTableData = useMemo(() => {
    return repositories.slice(startIndex, endIndex);
  }, [currentPage, repositories]);

  return (
    <AppContainer>
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
          {currentTableData.map(repository => (
            <tr key={repository.id}>
              <td>{repository.owner.avatar_url}</td>
              <td>{repository.owner.login}</td>
              <td>{repository.name}</td>
              <td>{repository.html_url}</td>
              <td>{repository.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={repositories.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </AppContainer>
  );
}

export default App;
