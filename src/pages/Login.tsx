import React from "react";
import { IconLogin } from "tabler-icons";
import { styled, Center, theme } from "../theme";
import { Button } from "../components";
import { ReactComponent as LOGO } from "../assets/logo-white.svg";

const login = () => {
  const key = "VfZarR4QDMLH8pXVDP",
    url = `https://bitbucket.org/site/oauth2/authorize?client_id=${key}&response_type=token`;
  window.location.replace(url);
};

const Styled = styled(Center)`
  height: 100vh;
  background: ${theme.colors.primary};
  gap: 16px;
  color: ${theme.colors.default};

  #logo {
    height: 40px;
  }

  #title {
    font: ${theme.fonts.title};
    font-size: 2em;
    font-weight: bold;
    padding: 40px 20px 20px;
    border-bottom: 1px solid;
  }

  #desc {
    padding: 20px;
  }
`;

const Login = () => {
  return (
    <Styled>
      <LOGO id="logo" />
      <div id={"title"}>BucketPipes</div>
      <div id={"desc"}>Simple way to manage BitBucket Pipelines.</div>
      <Button
        onClick={login}
        title="Login with Bitbucket account"
        Icon={IconLogin}
        contained
      />
    </Styled>
  );
};

export default Login;
