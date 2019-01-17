import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import sample from 'lodash/sample';
import { overlay } from '../../config/theme';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`;

const Item = styled.div`
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const Content = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;

  a {
    color: #fff;
    height: 100%;
    left: 0;
    opacity: 0;
    padding: 2rem;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
      color: #fff;
      opacity: 1;
      text-decoration: none;
    }
  }
`;

const ImageWrapper = styled.div`
  > div {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 100%;

    > div {
      position: static !important;
    }
  }
`;

const Overlay = styled.div`
  background-color: ${props => props.theme.brand.primary};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const ProjectListing = ({ projectEdges }) => (
  <Wrapper>
    {projectEdges.map(project => {
      const overlayColor = sample(overlay);
      return (
        <Item key={project.node.fields.slug}>
          <Content>
            <ImageWrapper>
              <Img fluid={project.node.frontmatter.cover.childImageSharp.fluid} />
            </ImageWrapper>
            <Link to={project.node.fields.slug}>
              <Overlay style={{ backgroundColor: overlayColor }} />
              {project.node.frontmatter.title && <h2>{project.node.frontmatter.title}</h2>}
              {project.node.frontmatter.author && <h4>{project.node.frontmatter.author}</h4>}
              {project.node.frontmatter.category && <h4>{project.node.frontmatter.category}</h4>}
              {project.node.frontmatter.date && <h4>{project.node.frontmatter.date}</h4>}
            </Link>
          </Content>
        </Item>
      );
    })}
  </Wrapper>
);

export default ProjectListing;

ProjectListing.propTypes = {
  projectEdges: PropTypes.array.isRequired,
};
