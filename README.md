- [Intro](#intro)
  - [Default configuration](#default-configuration)
- [Container](#container)
- [Row](#row)
  - [Justify content](#justify-content)
  
## Intro
```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>      
      <Row>
        <Col m={12} ml={12} t={8} tl={8} l={6}>
          Centered column
        </Col>      
      </Row>            
    </Container>
  );
}  
```

This is a react styled components grid that export 3 components you can use to define your webpage layout.
Is a fully customizable flexbox grid with the following default configuration.


#### Default configuration
|                           | m         | ml                  | t         | tl                | l         | unit  |
|---                        |---        |---                  |---        |---                |---        |---    |
| stands for                | mobile    | mobile landscape    | tablet    | tablet landscape  | laptop    |       |
| columns                   | `12`      | `12`                | `12`      | `12`              | `12`      |       |
| breakpoint `(min-width)`  | `0 `      | `568`               | `768`     | `1024`            | `1200`    | `px`  |
| gutter                    | `8`       | `8`                 | `12`      | `12`              | `16`      | `px`  |
| container                 | `1140`    | `1140`              | `1140`    | `1140`            | `1140`    | `px`  |
| container padding         | `16`      | `16`                | `16`      | `16`              | `0`       | `px`  |

## Container
Container does not have special props. Simply import it for using it.

```JSX
import {Container} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>      
      <p>This will be in the container!</p>
    </Container>
  );
}  
```

## Row
Row displays your columns in a flexbox row. 

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      <Row>
        <Col>
          my col
        </Col>
        <Col>
          my other col
        </Col>
      </Row>     
    </Container>
  );
}  
```
#### Justify content

As a flexbox box, you can specify `justify-content` css property passing props to `<Row>` component.  
Available props are: 
- `justifyCenter`
- `justifyFlexStart`
- `justifyFlexEnd`
- `justifySpaceBetween`
- `justifySpaceAround`
- `spaceEvenly`

Each of these props can be used:
- without passing value (the behaviour is mantained for each breakpoint) 
- passing an array of one or more of the these values: `m`,`ml`,`t`,`tl` and`l` (in this case the target behaviour will be mantained only in the specified breakpoint).

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      <Row center>
        <Col>
          this column will be always centered
        </Col>
      </Row>  
      <Row center={['ml', 'l']}>
        <Col>
          this column will be centered only in mobile landscape and in laptop
        </Col>
      </Row>  
      <Row flexEnd={['m', 't']}>
        <Col>
          this column will be aligned to the right only in mobile and in tablet
        </Col>
      </Row>  
      <Row flexStart={['m', 't', 'l']}  center={['ml', 'tl']} >
        <Col>
          this column will be aligned to the left in mobile, tablet and laptop.
          this column will be centered in mobile landscape and tablet landscape.
        </Col>
      </Row>  
    </Container>
  );
}  
```
