class GameScreenBody extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);

        // creates the boardArray state, which represents the board, and fills it with nulls
        this.state = {
            boardArray: new Array(5).fill({type:'none'})
        };

        for (var i = 0; i < this.state.boardArray.length; i++){
            this.state.boardArray[i] = new Array(5).fill({type:'none'});
        }
    }

    componentDidMount() {

    }

    render() {
        //reset enemy list - this is kinda bad to do, but oh well
        //maybe I should just have the server send the whole board? :/
        for (var i = 0; i < this.state.boardArray.length; i++){
            this.state.boardArray[i] = new Array(5).fill({type:'none'});
        }

        //if there are enemies
        console.log('this.props.enemies', this.props.enemies);
        if (
            this.props.enemies &&
            this.props.enemies.length > 0
        ){
            for(var i = 0; i < this.props.enemies.length; i++){
                //put them in a 2d array
                console.log('tower location', this.props.enemies[i].positionX, this.props.enemies[i].positionY);

                //init x position of 2d array if there is none http://stackoverflow.com/questions/17534323/cannot-set-property-0-of-2d-array
                if (!this.state.boardArray[this.props.enemies[i].positionX]){
                    this.state.boardArray[this.props.enemies[i].positionX] = [];
                }
                this.state.boardArray[this.props.enemies[i].positionX][this.props.enemies[i].positionY] = this.props.enemies[i];
            }

            console.log(this.state.boardArray);
        }

        // shove the base in the center, because it doesn't come from the server, because I suck
        if (!this.state.boardArray[2]){
            this.state.boardArray[2] = [];
        }
        this.state.boardArray[2][2] = {
            type: 'Base'
        };

        //TODO: do the same for towers


        const boardArray = this.state.boardArray;

        // look up more about how this works!
        const boardRows = boardArray.map((row, index) =>
            // Correct! Key should be specified inside the array.
            <GameRow key={index.toString()} value={row} />
        );

        return (
            <table className="gameBoard">
                <tbody>
                    {boardRows}
                </tbody>
            </table>
        );
    }
}
