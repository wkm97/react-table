import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './pagination';

describe('Pagination when siblingCount = 1 and page pills = 6', () => {
  const mockedPageChange = jest.fn();
  const DOTS = '...';

  it('total page count is less than page pills available', () => {
    render(
      <Pagination
        currentPage={1}
        pageSize={10}
        totalCount={60}
        onPageChange={mockedPageChange}
      />
    );
    const expected = [1, 2, 3, 4, 5, 6];

    const paginationItemDots = screen.queryAllByTestId('pagination-item-dots');
    expect(paginationItemDots.length).toBe(0);

    const paginationItemNumbers = screen.queryAllByTestId(
      'pagination-item-number'
    );
    expect(paginationItemNumbers.length).toBe(expected.length);
    paginationItemNumbers.forEach((item, i) => {
      expect(item.innerHTML).toEqual(String(expected[i]));
    });
  });

  it('total page count is greater than the page pills but only the right DOTS are visible', () => {
    render(
      <Pagination
        currentPage={1}
        pageSize={10}
        totalCount={100}
        onPageChange={mockedPageChange}
      />
    );
    const expected = [1, 2, 3, 4, 5, DOTS, 10];

    const paginationItemDots = screen.queryAllByTestId('pagination-item-dots');
    expect(paginationItemDots.length).toBe(1);

    const paginationItemNumbers = screen.queryAllByTestId(/pagination-item-*/);
    expect(paginationItemNumbers.length).toBe(expected.length);
    paginationItemNumbers.forEach((item, i) => {
      expect(item.innerHTML).toEqual(String(expected[i]));
    });
  });

  it('total page count is greater than the page pills but only the left DOTS are visible', () => {
    render(
      <Pagination
        currentPage={9}
        pageSize={10}
        totalCount={100}
        onPageChange={mockedPageChange}
      />
    );
    const expected = [1, DOTS, 6, 7, 8, 9, 10];

    const paginationItemDots = screen.queryAllByTestId('pagination-item-dots');
    expect(paginationItemDots.length).toBe(1);

    const paginationItemNumbers = screen.queryAllByTestId(/pagination-item-*/);
    expect(paginationItemNumbers.length).toBe(expected.length);
    paginationItemNumbers.forEach((item, i) => {
      expect(item.innerHTML).toEqual(String(expected[i]));
    });
  });

  it('total page count is greater than the page pills and both the left and the right DOTS are visible', () => {
    render(
      <Pagination
        currentPage={5}
        pageSize={10}
        totalCount={100}
        onPageChange={mockedPageChange}
      />
    );
    const expected = [1, DOTS, 4, 5, 6, DOTS, 10];

    const paginationItemDots = screen.queryAllByTestId('pagination-item-dots');
    expect(paginationItemDots.length).toBe(2);

    const paginationItemNumbers = screen.queryAllByTestId(/pagination-item-*/);
    expect(paginationItemNumbers.length).toBe(expected.length);
    paginationItemNumbers.forEach((item, i) => {
      expect(item.innerHTML).toEqual(String(expected[i]));
    });
  });

  it('total page count is less than page pills available', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={1}
        pageSize={10}
        totalCount={60}
        onPageChange={mockedPageChange}
      />
    );

    const paginationItemNumbers = screen.queryAllByTestId(
      'pagination-item-number'
    );
    const targetPageNumber = 3;
    await user.click(paginationItemNumbers[targetPageNumber - 1]);
    expect(mockedPageChange).toBeCalledWith(targetPageNumber);
  });
});
