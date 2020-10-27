import React from "react";
import { styled } from "../../theme";

interface Image {
  src: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  title?: string;
}

const Styled = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 2px;
  object-fit: contain;
`;

const Image = (props: Image) => <Styled {...props} alt={props.title} />;

export { Image };
