import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from './components/pagination/pagination';
import { OwnerDisplay } from './components/owner-display/owner-display';
import { SearchBar } from './components/search-bar.styled';
import { Select } from './components/selection.styled';
import { Table } from './components/table/table';
import { AvailableField, Repository, searchRepositories } from './github-data';
import { usePagination } from './hooks/use-pagination';
import { EmptyDataWarning } from './components/warning.styled';

const pageSize = 10;

const AppContainer = styled.div`
  margin: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const FormContainer = styled.form`
  display: flex;
  width: 60%;
  gap: 0.4rem;
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
  }, [displayRepositories, startIndex, endIndex]);

  useEffect(() => {
    fetch('https://api.github.com/repositories')
      .then(response => response.json())
      .then((data: Array<Repository>) => {
        setRepositories(data);
      });
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // reset page to 1 when searching
    handlePageChange(1);
    setInputText(e.target.value);
  };

  const handleTargetFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // reset page to 1 when searching
    handlePageChange(1);
    setTargetField(e.target.value.toLowerCase() as AvailableField);
  };

  return (
    <AppContainer>
      <FormContainer>
        <Select
          name="targetField"
          id="targetField"
          placeholder="Choose field..."
          defaultValue="name"
          onChange={handleTargetFieldChange}
        >
          <option value="owner">Owner</option>
          <option value="name">Name</option>
          <option value="description">Description</option>
        </Select>
        <SearchBar
          type="text"
          autoFocus
          placeholder="Search.."
          onChange={handleInput}
        />
      </FormContainer>
      {currentTableData.length === 0 ? (
        <EmptyDataWarning>No data available.</EmptyDataWarning>
      ) : (
        <>
          <Table>
            <Table.Head>
              <Table.TR>
                <Table.TH>Owner</Table.TH>
                <Table.TH>Name</Table.TH>
                <Table.TH>Url</Table.TH>
                <Table.TH>Description</Table.TH>
              </Table.TR>
            </Table.Head>
            <Table.Body>
              {currentTableData.map(repository => (
                <Table.TR key={repository.id}>
                  <Table.TD width="15%">
                    <OwnerDisplay
                      avatar_url={repository.owner.avatar_url}
                      name={repository.owner.login}
                    />
                  </Table.TD>
                  <Table.TD width="15%">{repository.name}</Table.TD>
                  <Table.TD width="20%">{repository.html_url}</Table.TD>
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
        </>
      )}
    </AppContainer>
  );
}

export default App;
