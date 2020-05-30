- [Basic usage](#basic-usage)
  - [Default configuration](#default-configuration)
  
### Basic usage
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

##### Default configuration
|             | m                 | ml                  | t                   | tl                  | l                     |
|---          |---                |---                  |---                  |---                  |---                    |
| stands for  | mobile            | mobile landscape    | tablet              | tablet landscape    | laptop                |
| columns     | `12`              | `12`                | `12`                | `12`                | `12`                  |
| breakpoint  | `(min-width:0px)` | `(min-width:568px)` | `(min-width:768px)` | `(min-width:1024px)`| `(min-width:1200px)`  |



