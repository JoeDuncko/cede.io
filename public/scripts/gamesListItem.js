class GamesListItem extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
        if (props.value.isGameOver){
            props.value.isGameOver = 'Complete';
        } else{
            props.value.isGameOver = 'Active';
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.value.isGameOver}</td>
                <td>{this.props.value.round}</td>
                <td className="right-align">
                    <button className="btn waves-effect waves-light black" onClick={this.makeNewGame}>
                        Play
                    </button>
                </td>
            </tr>
        );
    }
}
