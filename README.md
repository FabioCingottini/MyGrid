- [Intro](#intro)
  - [Default configuration](#default-configuration)
- [Container](#container)
  - [Container fluid](#container-fluid)
- [Row](#row)
  - [Justify content](#justify-content)
  - [Align items](#align-items)
- [Col](#col)
  - [Col size](#col-size)
  - [Col size only in specific breakpoint](#col-size-only-in-specific-breakpoint)
  - [Col grow](#col-grow)
  - [Col shrink](#col-shrink)
- [Custom configuration](#custom-configuration)
  - [Overriding only specific parts of the default configuration](#overriding-only-specific-parts-of-the-default-configuration)
  - [Overriding units](#overriding-units)
  
## Intro
```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>      
      <Row>
        <Col m={12} ml={12} t={8} tl={8} l={6}>
          that's my column!
          - in mobile and mobile landscape it occupies the entire screen
          - in tablet and tablet landscape it occupies 8/12 of the screen
          - in laptop it occupies 6/12 of the screen
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
Container set the max-width for your grid.

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

#### Container fluid
You can set a fluid behaviour both for single and all breakpoints

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      this container will have standard max width for every breakpoint   
    </Container>
    <Container fluid>
      this container max-with will always be unsetted, so it will take the entire page
    </Container>
    <Container fluid={['t']}>
      this container max-with will be unsetted only in tablet mode
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

As a flexbox box, you can specify css rule `justify-content` passing props to `<Row>` component.  
Available props are: 
- `justifyCenter`
- `justifyFlexStart`
- `justifyFlexEnd`
- `justifySpaceBetween`
- `justifySpaceAround`
- `justifySpaceEvenly`

Each of these props can be used:
- without passing value (the chosen `justify-content` behaviour is mantained for each breakpoint) 
- passing an array of one or more of the these values: `m`,`ml`,`t`,`tl` and`l` (in this case the chosen `justify-content` behaviour will be mantained only in the specified breakpoint).

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
      <Row justifyCenter={['ml', 'l']}>
        <Col>
          this column will be horizontally centered only in mobile landscape and in laptop
        </Col>
      </Row>  
      <Row justifyFlexEnd={['m', 't']}>
        <Col>
          this column will be aligned horizontally to the right only in mobile and in tablet
        </Col>
      </Row>  
      <Row justifyFlexStart={['m', 't', 'l']}  justifyCenter={['ml', 'tl']} >
        <Col>
          this column will be aligned horizontally to the left in mobile, tablet and laptop.
          this column will be centered horizontally in mobile landscape and tablet landscape.
        </Col>
      </Row>  
    </Container>
  );
}  
```

#### Align items
As a flexbox box, you can specify css rule `align-items` passing props to `<Row>` component.  
Available props are: 
- `alignCenter`
- `alignBaseline`
- `alignFlexStart`
- `alignFlexEnd`
- `alignStretch`

Each of these props can be used:
- without passing value (the chosen `align-items` behaviour is mantained for each breakpoint) 
- passing an array of one or more of the these values: `m`,`ml`,`t`,`tl` and`l` (in this case the chosen `align-items` behaviour will be mantained only in the specified breakpoint).

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      <Row alignCenter>
        <Col>
          this column will be always vertically centered
        </Col>
      </Row>  
      <Row alignCenter={['ml', 'l']}>
        <Col>
          this column will be centered vertically only in mobile landscape and in laptop
        </Col>
      </Row>  
      <Row alignFlexEnd={['m', 't']}>
        <Col>
          this column will be aligned vertically to the bottom only in mobile and in tablet
        </Col>
      </Row>  
      <Row alignFlexStart={['m', 't', 'l']} alignCenter={['ml', 'tl']} >
        <Col>
          this column will be vertically aligned to the top in mobile, tablet and laptop.
          this column will be vertically centered in mobile landscape and tablet landscape.
        </Col>
      </Row>  
    </Container>
  );
}  
```

## Col
Col contains you webpage content, you can specify:
- col width for each breakpoint (it calculates `flex-basis`)
- col growth for each breakpoint (it calculates `flex-grow`)
- col shrink for each breakpoint (it calculates `flex-shrink`)

#### Col size
You can specify col width (in column unit) using `<Col>` props.
Because of media queries nature, once you specify a -for example- `t`, this sizing will affect all the 'bigger' breakpoints if you don't specify another sizing for them.

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      <Row >
        <Col m={12} t={6}>
          This column occupies full screen in mobile and mobile landscape.
          This column occupies half screen from tablet
        </Col>        
        <Col m={12} ml={10} t={8} tl={6} l={4}>
          This column occupies full screen in mobile.
          This column occupies 10/12 in mobile landscape.
          This column occupies 8/12 in tablet.
          This column occupies half screen in tablet landscape.
          This column occupies 4/12 in laptop.
        </Col>
      </Row>  
    </Container>
  );
}  
```
#### Col size only in specific breakpoint
For solve the above problem, you can specify one or more `strictM`, `strictMl`, `strictT`, `strictTl`, `strictL`. 
This will set the specified size only in that breakpoint

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      <Row >
        <Col strictM={12} strictT={1} strictL={6}>
          This column occupies full screen in mobile
          This column occupies 1/12 screen in tablet
          This column occupies half screen in laptop
        </Col>               
      </Row>  
    </Container>
  );
}  
```

#### Col grow
Sometime you simply need to have a column that grow to fit remaining part of row space

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      <Row>
        <Col m={6}>
          This column occupies half screen
        </Col>               
        <Col grow>
          This column occupies the other part of the screen
        </Col>               
      </Row>  
    </Container>
  );
}  
```

#### Col shrink
Other times you need to have a column that shrink as much as possibile

```JSX
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <Container>
      <Row>
        <Col grow>
          This column grows as much as possibile
        </Col>               
        <Col shrink>
          This column shrink as much as possibile
        </Col>               
      </Row>  
    </Container>
  );
}  
```

## Custom configuration

In the following snippet you can see how you can pass a custom configuration using styled-components `<ThemeProvider>`. 

```JSX
import {ThemeProvider} from "styled-components";
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <ThemeProvider
      theme={{
        gridMedia: {
          ml: 568,
          t: 768,
          tl: 1024,
          l: 1200,
          unit: `px`,
        },
        gridColumns: {
          m: 12,
          ml: 12,
          t: 12,
          tl: 12,
          l: 12,
        },
        gridGutters: {
          m: 8,
          ml: 8,
          t: 12,
          tl: 12,
          l: 16,
          unit: `px`,
        },
        gridContainer: {
          m: 1140,
          ml: 1140,
          t: 1140,
          tl: 1140,
          l: 1140,
          unit: `px`,
        },
        gridPadding: {
          m: 16,
          ml: 16,
          t: 16,
          tl: 16,
          l: 0,
          unit: `px`,
        }
      }}
    >
      <Container>
        <Row>
          <Col>           
          </Col>
        </Row>  
      </Container>
    </ThemeProvider>
  );
}  
```

#### Overriding only specific parts of the default configuration

You don't need to override every single value, you can override only the values you need to change, the other ones will be picked from the default configuration. 
For example, in the following snippet we are overriding the number of the column for mobile, mobile-landscape, tablet and tablet-landscape, the laptop value will be the default one. 
Also, `gridMedia`, `gridGutter` and the other configuration won't be touched.


```JSX
import {ThemeProvider} from "styled-components";
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <ThemeProvider
      theme={{
        gridColumns: {
          m: 4,
          ml: 4,
          t: 8,
          tl: 8,
        },
      }}
    >
      <Container>
        <Row>
          <Col>           
          </Col>
        </Row>  
      </Container>
    </ThemeProvider>
  );
}  
```

#### Overriding units

You can change the unit used in css the same way you change values.

```JSX
import {ThemeProvider} from "styled-components";
import {Container, Row, Col} from '../where/you/place/index/file.js';
  
export const MyComponent = () => {
  return (
    <ThemeProvider
      theme={{
        gridContainer: {
          m: 71.25,
          ml: 71.25,
          t: 71.25,
          tl: 71.25,
          l: 71.25,
          unit: `rem`,
        },
      }}
    >
      <Container>
        <Row>
          <Col>           
          </Col>
        </Row>  
      </Container>
    </ThemeProvider>
  );
}  
```

