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
        console.log(this.props);
        //Logic to create or load a game
        if (this.props.isNewGame){
            this.makeNewGame();
        } else if (this.props.gameId){
            this.loadPreviousGameData(this.props.gameId);
        }

        //Socket logic
        //TODO: move this to a better place
        var socket = io.connect('/');
        //TODO: make it not need self=this
        var self = this;

        socket.on('welcome', function (data) {
            console.log(data);
        });

        socket.on('gameLoopFinished', function (data) {
            console.log('game loop finished! Pull in the new data by doing a get', data);
            self.loadPreviousGameData(self.state._id);
        });
    }

    render() {
        console.log('this.state', this.state);
        let gameOver = null;

        if (this.state.isGameOver) {
            gameOver = <div className="row"><div className="col s12">GAME OVER</div></div>;
        }

        return(
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <GameScreenHeader round={this.state.round} startDate={this.state.startDate} resources={this.state.resources} />
                    </div>
                </div>

                {gameOver}

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

                console.log('gameData', gameData);

                this.setState(gameData);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
