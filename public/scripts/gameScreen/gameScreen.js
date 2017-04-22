class GameScreen extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);

        //init state
        this.state = {};

        //TODO: test that when the state changes that gameScreenBody is completely rerendered
        // if that's not the case, then I'll need to tie each tile to a react module
        // which is probably the better way to autogenerate the body, but I'm not doing it yet
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.isNewGame){
            this.makeNewGame();
        } else if (this.props.gameId){
            this.loadPreviousGameData(this.props.gameId);
        }
    }

    render() {
        console.log("this.state", this.state)
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <GameScreenHeader round={this.state.round} startDate={this.state.startDate} resources={this.state.resources} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <GameScreenBody enemies={this.state.enemies}/>
                    </div>
                </div>
            </div>
        );
    }

    makeNewGame(){
        //makes a new game then sets the stat
        var newGame = {};

        fetch('/game/create', {
            method: 'POST',
            credentials: 'include'
        })
            .then((response) => {
                return response.json();
            })
            .then(response => {
                newGame = response;

                this.setState(newGame);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    loadPreviousGameData(gameId){
        //loads previous game data then sets the state
        var gameData = {};

        fetch('/game/'  + gameId, {
            credentials: 'include'
        })
            .then((response) => {
                return response.json();
            })
            .then(response => {
                gameData = response[0];

                console.log("gameData", gameData);

                this.setState(gameData);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
