import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import arrowLeft from '../svg/left-chevron.svg';
import arrowRight from '../svg/right-chevron.svg';

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  margin: 0 auto 6rem auto;
  a {
    color: ${props => props.theme.colors.body_color};
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
  justify-items: center;
`;

const Prev = styled.div`
  img {
    width: 20px;
    height: 20px;
    margin: 0 1rem 0 0;
  }
`;

const Next = styled.div`
  img {
    width: 20px;
    height: 20px;
    margin: 0 0 0 1rem;
  }
  margin-left: auto;
`;

const ProjectPagination = ({ next, prev }) => {
  console.log('test');

  return (
    <Wrapper>
      {next && (
        <Prev>
          <Link to={next.fields.slug}>
            <img src={arrowLeft} alt="Arrow Left" />
            {next.frontmatter.title && next.frontmatter.title}
            {next.frontmatter.name && next.frontmatter.name}
          </Link>
        </Prev>
      )}

      {prev && (
        <Next>
          <Link to={prev.fields.slug}>
            {prev.frontmatter.title && prev.frontmatter.title}
            {prev.frontmatter.name && prev.frontmatter.name}
            <img src={arrowRight} alt="Arrow Right" />
          </Link>
        </Next>
      )}
    </Wrapper>
  );
};

export default ProjectPagination;

ProjectPagination.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
};

ProjectPagination.defaultProps = {
  next: null,
  prev: null,
};
