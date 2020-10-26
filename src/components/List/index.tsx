import React from "react";
import { styled, theme } from "../../theme";
import { ListItem } from "./Item";

interface List {
  items: ListItem[];
}

const StyledList = styled.ul`
  list-style: none;
`;

const List = (props: List) => {
  const { items } = props;
  return (
    <StyledList>
      {items.map((item) => (
        <ListItem {...item} key={item.uid} />
      ))}
    </StyledList>
  );
};

export { List };
