- [Intro](#intro)
  - [Default configuration](#default-configuration)
- [Container](#container)
  
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
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>      
      <p>This will be in the container!</p>
    </Container>
  );
}  
```

  



