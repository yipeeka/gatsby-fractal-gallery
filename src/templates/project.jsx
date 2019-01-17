import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import { Container, SEO, Layout, ProjectPagination, NonStretchedImage } from 'components';
import * as _ from 'lodash';
import sample from 'lodash/sample';
import config from '../../config/website';
import { overlay } from '../../config/theme';

const overlayColor = sample(overlay);

const Wrapper = styled.section`
  text-align: center;
  position: relative;
  width: 100%;
  color: white;
  padding: 0;
  margin-bottom: 4rem;
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem ${props => props.theme.spacer.horizontal} ${props => props.theme.spacer.vertical}
    ${props => props.theme.spacer.horizontal};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    margin-bottom: 1rem;
  }
  > a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
`;

const Top = styled.div`
  font-size: 80%;
  margin-bottom: 0.5rem;
  position: relative;
  text-transform: uppercase;
`;

const Bottom = styled.div`
  font-size: 125%;
`;

const ImageWrapper = styled.div`
  margin-bottom: 1rem;
  > div {
    top: 0;
    > div {
      position: static !important;
    }
    > img {
      width: auto !important;
    }
    > picture {
      > img {
        width: auto !important;
      }
    }
  }
`;

const Project = ({ pageContext: { slug, prev, next }, data: { markdownRemark: postNode } }) => {
  const project = postNode.frontmatter;
  return (
    <Layout>
      <Helmet title={`${project.title} | ${config.siteTitle}`} />
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Wrapper style={{ backgroundColor: overlayColor }}>
        <ImageWrapper>
          {project.orientation === 'Landscape' ? (
            <Img fluid={project.cover.childImageSharp.fluid} />
          ) : (
            <NonStretchedImage fluid={project.cover.childImageSharp.fluid} />
            // <Img fixed={project.cover.childImageSharp.fixed} style={{ width: '100%', maxWidth: 400 }} />
          )}
        </ImageWrapper>
        <h3>{project.title}</h3>
        <InformationWrapper>
          <InfoBlock>
            <Top>Artist</Top>
            <Link to={`/authors/${_.kebabCase(project.author)}`}>
              <Bottom>{project.author}</Bottom>
            </Link>
          </InfoBlock>
          <InfoBlock>
            <Top>Category</Top>
            <Link to={`/projects/${_.kebabCase(project.category)}`}>
              <Bottom>{project.category}</Bottom>
            </Link>
          </InfoBlock>
        </InformationWrapper>
      </Wrapper>
      <Container type="text">
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <ProjectPagination next={next} prev={prev} />
      </Container>
    </Layout>
  );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        author
        date
        category
        orientation
        cover {
          childImageSharp {
            fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#f3f3f3" }) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
            fixed(width: 400) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
            resize(width: 800) {
              src
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
