import React from 'react';
import { StyledTable, THead, TBody, TFoot, TH, TR, TD } from './table.styled';

export const Table = ({ children }: React.PropsWithChildren) => {
  return <StyledTable>{children}</StyledTable>;
};

Table.Head = ({ children }: React.PropsWithChildren) => {
  return <THead>{children}</THead>;
};

Table.Body = ({ children }: React.PropsWithChildren) => {
  return <TBody>{children}</TBody>;
};

Table.Foot = ({ children }: React.PropsWithChildren) => {
  return <TFoot>{children}</TFoot>;
};

Table.TH = ({ children }: React.PropsWithChildren) => {
  return <TH>{children}</TH>;
};

Table.TR = ({ children }: React.PropsWithChildren) => {
  return <TR>{children}</TR>;
};

interface TDProps {
  width?: string;
}

Table.TD = ({ children, width }: React.PropsWithChildren<TDProps>) => {
  return <TD width={width}>{children}</TD>;
};
