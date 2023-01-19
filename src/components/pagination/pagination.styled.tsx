import styled from 'styled-components';

export const PaginationContainer = styled.li`
  display: flex;
  padding: 0.75rem;
`;

interface PaginationItemProps {
  disabled?: boolean;
  selected?: boolean;
}

export const PaginationItem = styled.ul<PaginationItemProps>`
  padding: 0 12px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;
  cursor: pointer;
  border: 1px solid transparent;
  ${props => props.disabled && 'pointer-events: none;'}
  ${props => props.selected && 'background-color: var(--secondary-color-500);'}
  &:hover {
    border: 1px solid var(--slate-color-500);
  }
`;

const Arrow = styled.span`
  &::before {
    position: relative;
    /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
    content: '';
    /* By using an em scale, the arrows will size with the font */
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border-right: 0.12em solid rgba(0, 0, 0, 0.87);
    border-top: 0.12em solid rgba(0, 0, 0, 0.87);
  }
`;

export const LeftArrow = styled(Arrow)`
  transform: rotate(-135deg) translate(-50%);
`;

export const RightArrow = styled(Arrow)`
  transform: rotate(45deg);
`;
