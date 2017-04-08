class GamesList extends React.Component { // eslint-disable-line no-unused-vars
    render() {
        return(
            <div className="container">
                <div className="row section">
                    <div className="col s12 right-align">
                        <button className="btn waves-effect waves-light black" onClick={this.startNewGame}>
                            New Game
                        </button>
                    </div>
                </div>
                <div className="row">
                    <table className="bordered highlight">

                        <thead>
                            <tr>
                                <th>Game status</th>
                                <th>Round</th>
                                <th></th>
                            </tr>
                        </thead>

                        <GamesListTable />

                    </table>
                </div>
            </div>
        );
    }

    startNewGame() {
        ReactDOM.render(
            <GameScreen isNewGame />,
            document.getElementById('content')
        );
    }
}
