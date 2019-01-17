import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import { Container, SEO, Layout, AuthorProjectList, ProjectPagination } from 'components';
import sample from 'lodash/sample';
import config from '../../config/website';
import { overlay } from '../../config/theme';

const overlayColor = sample(overlay);

const Wrapper = styled.section`
  text-align: center;
  position: relative;
  width: 100%;
  color: white;
  padding: 8rem 2rem 8rem 30%;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding: 6rem 2rem 6rem 40%;
    font-size: 70%;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 4rem 2rem 4rem 50%;
    font-size: 70%;
  }

  margin-bottom: 6rem;
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
  margin: ${props => props.theme.spacer.vertical} ${props => props.theme.spacer.horizontal} 0
    ${props => props.theme.spacer.horizontal};
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
  > div {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 30%;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      width: 40%;
    }
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      width: 50%;
    }

    > div {
      position: static !important;
    }
  }
`;

const Author = ({ pageContext: { slug, prev, next }, data: { markdownRemark: postNode } }) => {
  const author = postNode.frontmatter;
  return (
    <Layout>
      <Helmet title={`${author.name} | ${config.siteTitle}`} />
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Wrapper style={{ backgroundColor: overlayColor }}>
        <ImageWrapper>
          <Img fluid={author.cover.childImageSharp.fluid} />
        </ImageWrapper>
        <h1>{author.name}</h1>
        <InformationWrapper>
          <InfoBlock>
            <Top>Born-Died</Top>
            <Bottom>{author.date}</Bottom>
          </InfoBlock>
        </InformationWrapper>
      </Wrapper>
      <Container type="text">
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <ProjectPagination next={next} prev={prev} />
      </Container>
      <Container type="text">
        <h4>{author.name}'s works:</h4>
      </Container>
      <AuthorProjectList author={author.name} />
    </Layout>
  );
};

export default Author;

Author.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query AuthorPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        name
        date
        cover {
          childImageSharp {
            fluid(maxWidth: 400, quality: 90, traceSVG: { color: "#f3f3f3" }) {
              ...GatsbyImageSharpFluid_tracedSVG
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
