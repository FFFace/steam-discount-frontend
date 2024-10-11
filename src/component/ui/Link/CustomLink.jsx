import styled from "styled-components";


export const CustomLink = styled.a`
  width: 60%;
  color: var(--color4);
  text-decoration: none;
`

export const onClickCustomLink = (e) => {
  e.preventDefault();
  window.open(e.target.href, '_blank', 'noopener,noreferrer');
};