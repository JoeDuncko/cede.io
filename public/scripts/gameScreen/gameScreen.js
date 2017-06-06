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


        socket.on('gameLoopFinished', function () {
            //TODO: move to using data given by the this socket instead of from making a new GET call
            self.loadPreviousGameData(self.state._id);
        });

        //countdown
        this.interval = setInterval(function(){
            if (self.state.secondsRemaining <= 0) {
                clearInterval(self.interval);
            }
            self.setState({secondsRemaining: self.state.secondsRemaining - 1});
        }, 1000);
    }

    render() {
        let secondsRemaining = 60 - new Date().getSeconds();

        let gameOver = null;

        if (this.state.isGameOver) {
            gameOver = <div className="row"><div className="col s12">GAME OVER</div></div>;
        }

        return(
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <GameScreenHeader round={this.state.round} startDate={this.state.startDate} resources={this.state.resources} secondsRemaining={secondsRemaining} />
                    </div>
                </div>

                {gameOver}

                <div className="row">
                    <div className="col s12">
                        <GameScreenBody enemies={this.state.enemies} baseHealth={this.state.baseHealth}/>
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

    componentWillUnmount() {
        clearInterval(this.interval);
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

                this.setState(gameData);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
