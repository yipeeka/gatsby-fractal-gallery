import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { ProjectListing } from 'components';

const ProjectList = ({ data }) => {
  const nodes = data.data.allMarkdownRemark.edges.filter(node => node.node.frontmatter.author === data.author);
  return <ProjectListing projectEdges={nodes} />;
};

const AuthorProjectList = props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "Project" } } }
          sort: { fields: [frontmatter___addtime], order: ASC }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                author
                date
                category
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
    `}
    render={data => <ProjectList data={{ ...props, data }} />}
  />
);

export default AuthorProjectList;
