import React from 'react';
import styled from 'react-emotion';
import config from '../../config/website';

const Wrapper = styled.div`
  margin: 3rem 0;
  padding: 1rem ${props => props.theme.spacer.horizontal};
  display: block;
  text-align: center;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    margin: 2rem 0;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    margin: 1rem 0;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.brand.primary};
  }
`;

const Introduction = () => (
  <Wrapper>
    <h2>{config.siteIntroduction}</h2>
  </Wrapper>
);

export default Introduction;
