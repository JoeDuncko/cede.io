class GameScreen extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);

        //init state
        this.state = {};
    }

    componentDidMount() {
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
                        <GameScreenHeader />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <GameScreenBody />
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

                this.setState(gameData);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
