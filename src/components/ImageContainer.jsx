import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacer.horizontal};
  max-width: ${props => props.theme.container[props.type]};
  max-height: 600px;
  ${props =>
    props.type === 'text' &&
    css`
      p {
        font-size: 1.25rem;
        letter-spacing: -0.003em;
        line-height: 1.58;
        --baseline-multiplier: 0.179;
        --x-height-multiplier: 0.35;
      }
    `};
`;

const ImageContainer = ({ children, type, className }) => (
  <Wrapper className={className} type={type}>
    {children}
  </Wrapper>
);

export default ImageContainer;

ImageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['base', 'text']),
  className: PropTypes.string,
};

ImageContainer.defaultProps = {
  type: 'base',
  className: null,
};
