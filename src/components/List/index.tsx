import React from "react";
import { styled } from "../../theme";
import { ListItem } from "./ListItem";

interface List {
  items: ListItem[];
  isLoading?: boolean;
  emptyListFallback?: React.ReactNode;
}

const StyledList = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

const List = (props: List) => {
  const { items, isLoading, emptyListFallback = "No items found." } = props;
  if (isLoading) return <div>Loading...</div>;
  if (items.length < 1) return <div>{emptyListFallback}</div>;
  return (
    <StyledList>
      {items.map((item) => (
        <ListItem {...item} key={item.uid} />
      ))}
    </StyledList>
  );
};

export { List, StyledList, ListItem };
