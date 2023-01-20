import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from './components/pagination/pagination';
import { Table } from './components/table/table';
import { AvailableField, Repository, searchRepositories } from './github-data';
import { usePagination } from './hooks/use-pagination';

const pageSize = 10;

const AppContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [inputText, setInputText] = useState('');
  const [targetField, setTargetField] = useState<AvailableField>('name');
  const [repositories, setRepositories] = useState<Array<Repository>>([]);

  const displayRepositories = useMemo(() => {
    return searchRepositories(repositories, inputText, targetField);
  }, [repositories, inputText, targetField]);

  const { currentPage, handlePageChange, startIndex, endIndex } = usePagination(
    {
      totalCount: displayRepositories.length,
      pageSize,
    }
  );

  const currentTableData = useMemo(() => {
    return displayRepositories.slice(startIndex, endIndex);
  }, [currentPage, displayRepositories]);

  useEffect(() => {
    fetch('https://api.github.com/repositories')
      .then(response => response.json())
      .then((data: Array<Repository>) => {
        setRepositories(data);
      });
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleTargetFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetField(e.target.value.toLowerCase() as AvailableField);
  };

  return (
    <AppContainer>
      <form>
        <select
          name="targetField"
          id="targetField"
          placeholder="Choose field..."
          defaultValue="name"
          onChange={handleTargetFieldChange}
        >
          <option value="owner">owner</option>
          <option value="name">name</option>
          <option value="description">description</option>
        </select>
        <input type="text" placeholder="Search.." onChange={handleInput} />
      </form>
      {currentTableData.length === 0 ?? <h1>NO DATA</h1>}
      <Table>
        <Table.Head>
          <Table.TR>
            <Table.TH>avatar</Table.TH>
            <Table.TH>owner</Table.TH>
            <Table.TH>name</Table.TH>
            <Table.TH>url</Table.TH>
            <Table.TH>description</Table.TH>
          </Table.TR>
        </Table.Head>
        <Table.Body>
          {currentTableData.map(repository => (
            <Table.TR key={repository.id}>
              <Table.TD width="0%">{repository.owner.avatar_url}</Table.TD>
              <Table.TD width="15%">{repository.owner.login}</Table.TD>
              <Table.TD width="15%">{repository.name}</Table.TD>
              <Table.TD width="25%">{repository.html_url}</Table.TD>
              <Table.TD width="50%">{repository.description}</Table.TD>
            </Table.TR>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalCount={displayRepositories.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </AppContainer>
  );
}

export default App;
