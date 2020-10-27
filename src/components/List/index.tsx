import React from "react";
import { styled } from "../../theme";
import { ListItem } from "./ListItem";

interface List {
  isLoading?: boolean;
  items: ListItem[];
}

const StyledList = styled.ul`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`;

const List = (props: List) => {
  const { items, isLoading } = props;
  if (isLoading) return <div>Loading...</div>;
  return (
    <StyledList>
      {items.map((item) => (
        <ListItem {...item} key={item.uid} />
      ))}
    </StyledList>
  );
};

export { List, StyledList, ListItem };
