class GameScreenBody extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);

        // creates the boardArray state, which represents the board, and fills it with nulls
        this.state = {
            boardArray: new Array(5).fill(new Array(5).fill({type:'none'}))
        };
    }

    render() {

        //TODO: do this the other way around. Iterate over the current boardArray, see if there should be an enemy or tower or none there. If so, update just that space

        //reset board - this is kinda bad to do, but oh well
        //maybe I should just have the server send the whole board? :/
        for (var i = 0; i < this.state.boardArray.length; i++){
            this.state.boardArray[i] = new Array(5);

            for (var k = 0; k < this.state.boardArray.length; k++){
                var selected = false;
                if(i === this.props.selectedSpaceY && k === this.props.selectedSpaceX){
                    selected = true;
                }
                this.state.boardArray[i][k] = {
                    type:'none',
                    positionX: k,
                    positionY: i,
                    selected: selected
                };
            }
        }

        //if there are enemies
        if (
            this.props.enemies &&
            this.props.enemies.length > 0
        ){
            for(var i = 0; i < this.props.enemies.length; i++){
                //put them in a 2d array

                //init x position of 2d array if there is none http://stackoverflow.com/questions/17534323/cannot-set-property-0-of-2d-array
                if (!this.state.boardArray[this.props.enemies[i].positionX]){
                    this.state.boardArray[this.props.enemies[i].positionX] = [];
                }

                this.state.boardArray[this.props.enemies[i].positionX][this.props.enemies[i].positionY] = this.props.enemies[i];
            }
        }

        //if there are towers
        console.log('this.props', this.props)
        console.log('do we got towers?', this.props.towers);
        if (
            this.props.towers &&
            this.props.towers.length > 0
        ){

            for(var i = 0; i < this.props.towers.length; i++){
                //put them in a 2d array

                //init x position of 2d array if there is none http://stackoverflow.com/questions/17534323/cannot-set-property-0-of-2d-array
                if (!this.state.boardArray[this.props.towers[i].positionX]){
                    this.state.boardArray[this.props.towers[i].positionX] = [];
                }

                this.state.boardArray[this.props.towers[i].positionX][this.props.towers[i].positionY] = this.props.towers[i];
            }
        }

        // shove the base in the center, because it doesn't come from the server, because I suck
        if (!this.state.boardArray[2]){
            this.state.boardArray[2] = [];
        }
        this.state.boardArray[2][2] = {
            type: 'Base',
            health: this.props.baseHealth
        };

        //TODO: do the same for towers

        const boardArray = this.state.boardArray;

        // look up more about how this works!
        const boardRows = boardArray.map((row, index) =>
            // Correct! Key should be specified inside the array.
            <GameRow key={index.toString()} value={row} selectedSpaceX={this.props.selectedSpaceX} selectedSpaceY={this.props.selectedSpaceY} setSelectedSpace={this.props.setSelectedSpace} />
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
