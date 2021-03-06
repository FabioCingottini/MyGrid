import styled, {css} from 'styled-components';
import * as PropTypes from 'prop-types';

const UNIT = `unit`;

const MED = `gridMedia`;
const COL = `gridColumns`;
const GUT = `gridGutters`;
const PAD = `gridPadding`;
const CONT = `gridContainer`;

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
  [CONT]: {
    [M]: 1140,
    [ML]: 1140,
    [T]: 1140,
    [TL]: 1140,
    [L]: 1140,
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
 * @param {obj} theme = the theme object
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

/**
 * get strict media
 * @param {obj} theme = the theme obj
 * @param {string} dim = the dimension for wh
 */
function getStrictMedia(theme, dim) {
  const mediaUnit = get(theme, [MED, UNIT]);
  switch (dim) {
    case M: {
      const upperBreakpoint = get(theme, [MED, ML]) - 1;
      return css`(max-width: ${upperBreakpoint}${mediaUnit})`;
    }
    case ML: {
      const lowerBreakpoint = get(theme, [MED, ML]);
      const upperBreakpoint = get(theme, [MED, T]) - 1;
      return css`(min-width: ${lowerBreakpoint}${mediaUnit}) and (max-width: ${upperBreakpoint}${mediaUnit})`;
    }
    case T: {
      const lowerBreakpoint = get(theme, [MED, T]);
      const upperBreakpoint = get(theme, [MED, TL]) - 1;
      return css`(min-width: ${lowerBreakpoint}${mediaUnit}) and (max-width: ${upperBreakpoint}${mediaUnit})`;
    }
    case TL: {
      const lowerBreakpoint = get(theme, [MED, TL]);
      const upperBreakpoint = get(theme, [MED, L]) - 1;
      return css`(min-width: ${lowerBreakpoint}${mediaUnit}) and (max-width: ${upperBreakpoint}${mediaUnit})`;
    }
    case L: {
      const lowerBreakpoint = get(theme, [MED, L]);
      return css`(min-width: ${lowerBreakpoint}${mediaUnit})`;
    }
  }
}

function renderArrayOrBoolProp(prop, theme, cssToRender) {
  if (prop === true) {
    return cssToRender;
  } else if (Array.isArray(prop)){
    return prop.map((dimension) => {
      const strictMedia = getStrictMedia(theme, dimension);
      return css`
        @media ${strictMedia} {
          ${cssToRender}
        }
      `;
    });
  }
}

const dimensionPropTypes = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.arrayOf(
    PropTypes.oneOf([M, ML, T, TL, L])
  )
]).isRequired;

const Container = styled.div`
  box-sizing: border-box;
  
  max-width: ${({theme}) => get(theme, [CONT, M])}${({theme}) => get(theme, [CONT, UNIT])};
  ${({theme}) => {
    const containerUnit = get(theme, [CONT, UNIT]);
    const mediaUnit = get(theme, [MED, UNIT]);
    return [DIM].map((D) => {
      const media = get(theme, [MED, D]);
      const container = get(theme, [CONT, D]);
      return css`
        @media (min-width: ${media}${mediaUnit}) {
          max-width: ${container}${containerUnit};
        }
      `;
    });
  }}; 
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
  
  ${({fluid, theme}) => renderArrayOrBoolProp(fluid, theme, css`max-width: initial;`)}
`;

Container.propTypes = {
  fluid: dimensionPropTypes
}

Container.defaultProps = {
  fluid: false
}

const Row = styled.div`
  box-sizing: border-box;
  
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
    });
  }}
  
  ${({justifyCenter, theme}) => renderArrayOrBoolProp(justifyCenter, theme, css`justify-content: center;`)}
  ${({justifyFlexStart, theme}) => renderArrayOrBoolProp(justifyFlexStart, theme, css`justify-content: flex-start;`)}
  ${({justifyFlexEnd, theme}) => renderArrayOrBoolProp(justifyFlexEnd, theme, css`justify-content: flex-end;`)}
  ${({justifySpaceBetween, theme}) => renderArrayOrBoolProp(justifySpaceBetween, theme, css`justify-content: space-between;`)}
  ${({justifySpaceAround, theme}) => renderArrayOrBoolProp(justifySpaceAround, theme, css`justify-content: space-around;`)}
  ${({justifySpaceEvenly, theme}) => renderArrayOrBoolProp(justifySpaceEvenly, theme, css`justify-content: space-evenly;`)}
  
  ${({alignCenter, theme}) => renderArrayOrBoolProp(alignCenter, theme, css`align-items: center;`)}
  ${({alignBaseline, theme}) => renderArrayOrBoolProp(alignBaseline, theme, css`align-items: baseline;`)}
  ${({alignFlexStart, theme}) => renderArrayOrBoolProp(alignFlexStart, theme, css`align-items: flex-start;`)}
  ${({alignFlexEnd, theme}) => renderArrayOrBoolProp(alignFlexEnd, theme, css`align-items: flex-end;`)}
  ${({alignStretch, theme}) => renderArrayOrBoolProp(alignStretch, theme, css`align-items: stretch;`)}
`;

Row.propTypes = {
  justifyCenter: dimensionPropTypes,
  justifyFlexStart: dimensionPropTypes,
  justifyFlexEnd: dimensionPropTypes,
  justifySpaceBetween: dimensionPropTypes,
  justifySpaceAround: dimensionPropTypes,
  justifySpaceEvenly: dimensionPropTypes,
  alignCenter: dimensionPropTypes,
  alignBaseline: dimensionPropTypes,
  alignFlexStart: dimensionPropTypes,
  alignFlexEnd: dimensionPropTypes,
  alignStretch: dimensionPropTypes,
}

Row.defaultProps = {
  justifyCenter: false,
  justifyFlexStart: false,
  justifyFlexEnd: false,
  justifySpaceBetween: false,
  justifySpaceAround: false,
  justifySpaceEvenly: false,
  alignCenter: false,
  alignBaseline: false,
  alignFlexStart: false,
  alignFlexEnd: false,
  alignStretch: false,
}

const Col = styled.div`
  box-sizing: border-box;
  
  padding-left: ${({theme}) => get(theme, [GUT, M])}${({theme}) => get(theme, [GUT, UNIT])};
  padding-right: ${({theme}) => get(theme, [GUT, M])}${({theme}) => get(theme, [GUT, UNIT])};
  
  ${props => {
    return props[M] && css`
      flex-basis: ${({theme}) => css`calc(100% / ${get(theme, [COL, M])} * ${props => props[M]})`}
    `;   
  }};
  
  ${({theme, ...props}) => {
    const mediaUnit = get(theme, [MED, UNIT]);
    const gutterUnit = get(theme, [GUT, UNIT]);
    return DIM.map((D) => {
      const media = get(theme, [MED, D]);
      const dimension = get(theme, [GUT, D]);
      const allColumns = get(theme, [COL, D]);
      return props[D] && css`
        @media (min-width: ${media}${mediaUnit}) {
          padding-left: ${dimension}${gutterUnit};
          padding-right: ${dimension}${gutterUnit};
          ${!!props[D] && css`flex-basis: calc(100% / ${allColumns} * ${props[D]});`};
        }
      `;
    });
  }}
  ${({theme, ...props}) => {
  return [  
      ['strictM', M],
      ['strictMl', ML],
      ['strictT', T],
      ['strictTl', TL],
      ['strictL', L],
    ].map(([prop, D]) => {
      if (props[prop]) {
        const allColumns = get(theme, [COL, D]);
        const strictMedia = getStrictMedia(theme, D);
        return props[prop] && css`
          @media ${strictMedia} {
            flex-basis: calc(100% / ${allColumns} * ${props[prop]}); 
          }        
        `;
      }
    })
  }}
  
  ${({grow, theme}) => renderArrayOrBoolProp(grow, theme, css`flex-grow: 1;`)}
  ${({shrink, theme}) => renderArrayOrBoolProp(shrink, theme, css`flex-shrink: 1;`)}
  
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
  strictM: PropTypes.number,
  strictMl: PropTypes.number,
  strictT: PropTypes.number,
  strictTl: PropTypes.number,
  strictL: PropTypes.number,
  grow: dimensionPropTypes,
  shrink: dimensionPropTypes,
  debug: PropTypes.bool.isRequired,
}
Col.defaultProps = {
  debug: false,
  grow: false,
  shrink: false,
}

export {Container, Row, Col}
