class GameScreenPlaceTowerButton extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <button className="btn waves-effect waves-light black" onClick={this.props.placeTower.bind(this, this.props.selectedSpaceX, this.props.selectedSpaceY)}>
                Place Tower at {this.props.selectedSpaceX + 1}, {this.props.selectedSpaceY + 1}
            </button>
        );
    }
}
