import Component from 'react';

export default class ThreeContainer extends Component {
    componentDidMount() {
      threeEntryPoint(this.threeRootElement);
    }
    render () {
        return (
          <div ref={element => this.threeRootElement = element}>
            Three Container
          </div>
        );
    }
  }