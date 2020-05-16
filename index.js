import styled, {css} from 'styled-components';
import * as PropTypes from 'prop-types';

const UNIT = `unit`;

const MED = `media`;
const COL = `columns`;
const GUT = `gutters`;
const PAD = `padding`;

const M = `m`;
const ML = `ml`;
const T = `t`;
const TL = `tl`;
const L = `l`;

const DIM = [ML, T, TL, L];

const defaultTheme = {
  [MED]: {
    [ML]: 568,
    [T]: 768,
    [TL]: 1024,
    [L]: 1200,
    [UNIT]: `px`,
  },
  [COL]: {
    [M]: 12,
    [ML]: 12,
    [T]: 12,
    [TL]: 12,
    [L]: 12,
  },
  [GUT]: {
    [M]: 8,
    [ML]: 8,
    [T]: 12,
    [TL]: 12,
    [L]: 16,
    [UNIT]: `px`,
  },
  [PAD]: {
    [M]: 16,
    [ML]: 16,
    [T]: 16,
    [TL]: 16,
    [L]: 0,
    [UNIT]: `px`,
  }
}

/**
 * get value from theme or config if not available in theme
 * @param {string} theme = the theme object
 * @param {string[]} path = path object in order
 * @returns {string} : the value
 */
function get(theme, path) {
  try {
    return path.reduce((val, pathPiece) => {
      return val[pathPiece];
    }, theme);
  } catch {
    return path.reduce((val, pathPiece) => {
      return val[pathPiece];
    }, defaultTheme);
  }
}

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  width: 100%;
  
  padding: 0 ${({theme}) => get(theme, [PAD, M])}${({theme}) => get(theme, [PAD, UNIT])};
  
  ${({theme}) => {
    const mediaUnit = get(theme, [MED, UNIT]);
    const paddingUnit = get(theme, [PAD, UNIT]);
    return DIM.map((D) => {
      const media = get(theme, [MED, D]);
      const padding = get(theme, [PAD, D]);
      return css`
        @media (min-width: ${media}${mediaUnit}) {
          padding: 0 ${padding}${paddingUnit};        
        }
      `;
    })  
  }}
`;

const Row = styled.div`
  display: flex;
   
  margin-left: -${({theme}) => get(theme, [GUT, M]) / 2}${({theme}) => get(theme, [GUT, UNIT])};
  margin-right: -${({theme}) => get(theme, [GUT, M]) / 2}${({theme}) => get(theme, [GUT, UNIT])};
  
  ${({theme}) => {
    const mediaUnit = get(theme, [MED, UNIT]);
    const gutterUnit = get(theme, [GUT, UNIT]);
    return DIM.map((D) => {
      const media = get(theme, [MED, D]);
      const dimension = get(theme, [GUT, D]);
      return css`
        @media (min-width: ${media}${mediaUnit}) {
          margin-left: -${dimension / 2}${gutterUnit};
          margin-right: -${dimension / 2}${gutterUnit};
        }   
      `;
    })
  }}
`;

const Col = styled.div`
  box-sizing: border-box;
  
  padding-left: ${({theme}) => get(theme, [GUT, M])}${({theme}) => get(theme, [GUT, UNIT])};
  padding-right: ${({theme}) => get(theme, [GUT, M])}${({theme}) => get(theme, [GUT, UNIT])};
  width: ${({theme}) => css`calc(100% / ${get(theme, [COL, M])} * ${props => props[M]})`};
  
  ${({theme}) => {
    const mediaUnit = get(theme, [MED, UNIT]);
    const gutterUnit = get(theme, [GUT, UNIT]);
    return DIM.map((D) => {
      const media = get(theme, [MED, D]);
      const dimension = get(theme, [GUT, D]);
      const allColumns = get(theme, [COL, ML]);
      return css`
        @media (min-width: ${media}${mediaUnit}) {
          padding-left: ${dimension}${gutterUnit};
          padding-right: ${dimension}${gutterUnit};
          width: ${({theme}) => css`calc(100% / ${get(theme, [COL, D])} * ${props => props[D]})`};
          width: calc(100% / ${allColumns} * ${props => props[D]});
        }   
      `;
    })
  }}
  ${({debug}) => debug && css`
    background-color: lightsalmon;   
  `}    
`;

Col.propTypes = {
  m: PropTypes.number,
  ml: PropTypes.number,
  t: PropTypes.number,
  tl: PropTypes.number,
  l: PropTypes.number,
  debug: PropTypes.bool.isRequired,
}
Col.defaultProps = {
  m: 12,
  ml: 12,
  t: 12,
  tl: 12,
  l: 12,
  debug: false,
}

export {Container, Row, Col}
