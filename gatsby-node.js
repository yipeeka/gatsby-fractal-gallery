const path = require('path');
const _ = require('lodash');

const categories = ['Painting', 'Fresco', 'Sculpture'];

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (node.frontmatter.type === 'Project') {
      if (
        Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
        Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
      ) {
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      }
      if (
        Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
        Object.prototype.hasOwnProperty.call(node.frontmatter, 'title') &&
        Object.prototype.hasOwnProperty.call(node.frontmatter, 'author')
      ) {
        slug = `/projects/${_.kebabCase(`${node.frontmatter.title} ${node.frontmatter.author}`)}`;
      }
      createNodeField({ node, name: 'slug', value: slug });
    }
    if (node.frontmatter.type === 'Author') {
      if (
        Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
        Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
      ) {
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      }
      if (
        Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
        Object.prototype.hasOwnProperty.call(node.frontmatter, 'name')
      ) {
        slug = `/authors/${_.kebabCase(node.frontmatter.name)}`;
      }
      createNodeField({ node, name: 'slug', value: slug });
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const projectPage = new Promise((resolve, reject) => {
    const projectPagePath = path.resolve('src/templates/project.jsx');
    resolve(
      graphql(`
        {
          projects: allMarkdownRemark(
            filter: { frontmatter: { type: { eq: "Project" } } }
            sort: { fields: [frontmatter___author, frontmatter___addtime], order: ASC }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  type
                  title
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        const projectPosts = result.data.projects.edges;

        result.data.projects.edges.forEach((edge, index) => {
          const next = index === 0 ? null : projectPosts[index - 1].node;
          const prev = index === projectPosts.length - 1 ? null : projectPosts[index + 1].node;
          createPage({
            path: edge.node.fields.slug,
            component: projectPagePath,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next,
            },
          });
        });
      })
    );
  });

  const authorPage = new Promise((resolve, reject) => {
    const authorPagePath = path.resolve('src/templates/author.jsx');
    resolve(
      graphql(`
        {
          authors: allMarkdownRemark(
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
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        const authorPosts = result.data.authors.edges;

        result.data.authors.edges.forEach((edge, index) => {
          const next = index === 0 ? null : authorPosts[index - 1].node;
          const prev = index === authorPosts.length - 1 ? null : authorPosts[index + 1].node;

          createPage({
            path: edge.node.fields.slug,
            component: authorPagePath,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next,
            },
          });
        });
      })
    );
  });

  const categoryPage = new Promise(resolve => {
    const categoryPagePath = path.resolve('src/templates/categories.jsx');
    resolve(
      categories.forEach(category => {
        createPage({
          path: `/projects/${_.kebabCase(category)}`,
          component: categoryPagePath,
          context: {
            category,
          },
        });
      })
    );
  });

  return Promise.all([projectPage, authorPage, categoryPage]);
};

/* Allow us to use something like: import { X } from 'directory' instead of '../../folder/directory' */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
