import React from 'react';
import { graphql } from 'gatsby';
import { Container, ProjectListing, Layout, SubNavigation } from 'components';
import styled from 'react-emotion';

/* const Categories = ({ pageContext: { category }, data }) => {
  const {
    allMarkdownRemark: { edges: nodes },
  } = data;
  return (
    <Layout>
      <Container>
        <SubNavigation />
      </Container>
      <ProjectListing projectEdges={nodes} />
    </Layout>
  );
}; */

const n = 12;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  text-align: -webkit-center;
  margin: 1rem 0;
`;

const Button = styled.button`
  text-align: center;
  background-color: #e7e7e7;
  padding: 0.5rem 2rem;
  border-radius: 8px;
  border: none;
  transition-duration: 0.4s;
  &:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    color: ${props => props.theme.brand.primary};
  }
`;

class Categories extends React.Component {
  state = {
    i: 0,
    length: this.props.data.allMarkdownRemark.edges.length,
    nodes: this.props.data.allMarkdownRemark.edges.slice(0, n),
  };

  handleClick = e => {
    e.preventDefault();
    const { length } = this.state;
    const { i } = this.state;
    const {
      data: {
        allMarkdownRemark: { edges: nodes },
      },
    } = this.props;
    const moreNodes = length > i + n + n ? nodes.slice(i + n, i + n + n) : nodes.slice(i + n);
    this.setState({ ...this.state, i: this.state.i + n, nodes: [...this.state.nodes, ...moreNodes] });
  };

  render() {
    const { length } = this.state;
    const { nodes } = this.state;
    const { i } = this.state;
    return (
      <Layout>
        <Container>
          <SubNavigation />
        </Container>
        <ProjectListing projectEdges={nodes} />
        {length > i + n && (
          <ButtonWrapper>
            <Button onClick={this.handleClick}>more</Button>
          </ButtonWrapper>
        )}
      </Layout>
    );
  }
}

export default Categories;

export const pageQuery = graphql`
  query CategoriesQuery($category: String) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
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
`;
