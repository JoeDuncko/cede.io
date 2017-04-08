class GamesListItem extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
        if (props.value.isGameOver){
            props.value.isGameOverText = 'Complete';
        } else{
            props.value.isGameOverText = 'Active';
        }

        console.log(props);
    }

    render() {
        let button = null;

        if (this.props.value.isGameOver) {
            button = <button disabled className="btn waves-effect waves-light disabled">Play</button>;
        } else {
            button = <button className="btn waves-effect waves-light black" onClick={()=>this.startPreviousGame(this.props.value._id)}>Play</button>;
        }

        return (
            <tr>
                <td>{this.props.value.isGameOverText}</td>
                <td>{this.props.value.round}</td>
                <td className="right-align">
                    {button}
                </td>
            </tr>
        );
    }

    startPreviousGame() {
        ReactDOM.render(
            <GameScreen gameId={this.props.value._id} />,
            document.getElementById('content')
        );
    }
}
