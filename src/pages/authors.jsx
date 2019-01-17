import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { AuthorListing, Layout } from 'components';

const Authors = ({
  data: {
    allMarkdownRemark: { edges: authorEdges },
  },
}) => (
  <Layout>
    <AuthorListing projectEdges={authorEdges} />
  </Layout>
);

export default Authors;

Authors.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query authorsQuery {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "Author" } } }
      sort: { fields: [frontmatter___name], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            date
            cover {
              childImageSharp {
                fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#f3f3f3" }) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
