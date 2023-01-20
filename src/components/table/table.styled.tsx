// reference: https://dev.to/dcodeyt/creating-beautiful-html-tables-with-css-428l
import styled from 'styled-components';

export const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  font-weight: 500;
  font-family: sans-serif;
  min-width: 400px;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  /* add this */
  overflow: hidden;
`;

export const THead = styled.thead`
  & tr {
    background-color: var(--primary-color-600);
    color: var(--slate-color-100);
    text-align: left;
  }
`;

export const TFoot = styled.tfoot``;

export const TBody = styled.tbody``;

export const TR = styled.tr`
  border-bottom: 1px solid #dddddd;
  &:nth-of-type(even) {
    background-color: var(--slate-color-200);
  }
`;

export const TH = styled.th`
  padding: 12px 15px;
`;

export const TD = styled.td`
  max-width: 0;
  ${props => props.width && `width: ${props.width};`}
  padding: 12px 15px;
  height: 14px;
  word-wrap: break-word;
`;
