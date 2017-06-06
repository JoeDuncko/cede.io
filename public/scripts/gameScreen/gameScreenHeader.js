class GameScreenHeader extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <table className="bordered centered">

                <tbody>
                    <tr>
                        <td>Round: {this.props.round}</td>
                        <td><i className="material-icons">av_timer</i>
                            <GameCountdown secondsRemaining={this.props.secondsRemaining} />
                        </td>
                        <td><i className="material-icons">shopping_basket</i> {this.props.resources}</td>
                    </tr>
                </tbody>

            </table>
        );
    }
}
