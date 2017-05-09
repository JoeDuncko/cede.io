/** based on https://w33ble.github.io/understanding-react/demos/countdown.html */
class GameCountdown extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>{this.props.secondsRemaining}</span>
        );
    }
}
