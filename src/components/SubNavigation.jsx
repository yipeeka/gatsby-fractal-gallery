import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'react-emotion';
import * as _ from 'lodash';
import theme from '../../config/theme';
import categories from '../utils/data';

const Wrapper = styled.div`
  margin: 1rem 0;
  padding: 1rem ${props => props.theme.spacer.horizontal};
  display: block;
  text-align: center;
  a {
    color: ${props => props.theme.colors.body_color};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
`;

const active = css`
  color: ${theme.brand.primary} !important;
`;

const Nav = styled.nav`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 ${props => props.theme.spacer.horizontal};
  a:not(:first-child) {
    margin-left: 2rem;
    @media (max-width: ${props => props.theme.breakpoints.s}) {
    margin-left: 1rem;
  }
`;

const SubNavigation = () => (
  <Wrapper>
    <Nav>
      <Link
        to="/projects"
        activeClassName={css`
          ${active};
        `}
      >
        All
      </Link>
      {categories.map(category => (
        <Link
          key={category}
          to={`/projects/${_.kebabCase(category)}`}
          activeClassName={css`
            ${active};
          `}
        >
          {category}
        </Link>
      ))}
    </Nav>
  </Wrapper>
);

export default SubNavigation;
