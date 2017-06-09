class GameScreenBody extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        //Create a mock of the board to give to the rest of my game - this is kinda bad to do, but oh well
        //maybe I should just have the server send the whole board? :/

        //swap this out somehow with bind probably
        let self = this;

        // creates the mockBoardArray, which represents the board, and fills it with nulls
        // let mockBoardArray = new Array(5).fill(new Array(5).fill());
        let mockBoardArray = [];

        //Should probably not hardcode these lengths
        //sadly without generating the array first, we are stuck with having to do a normal for loop
        for(let x = 0; x < 5; x++){
            mockBoardArray[x] = [];
            for(let y = 0; y < 5; y++){
                let selected = false;
                let set = false;

                // shove the base in the center, because it doesn't come from the server, because I suck
                if (
                    set === false &&
                    x === 2 &&
                    y === 2
                ){
                    mockBoardArray[x][y] = {
                        type: 'Base',
                        health: self.props.baseHealth
                    };
                    set = true;
                }

                //if there's an enemy at that space, put it there
                if (set === false && self.props.enemies){
                    for (let enemy of self.props.enemies){
                        if(
                            enemy.positionX === x &&
                            enemy.positionY === y
                        ){
                            mockBoardArray[x][y] = enemy;
                            set = true;
                        }
                    }
                }

                //else if there's a tower at that space, put it there
                if (set === false && self.props.towers){
                    for (let tower of self.props.towers){
                        if(
                            tower.positionX === x &&
                            tower.positionY === y
                        ){
                            mockBoardArray[x][y] = tower;
                            set = true;
                        }
                    }
                }

                //else, just put a none in there
                    //if it's the selected space, mark it as selected
                if (set === false){
                    if(
                        x === self.props.selectedSpaceX &&
                        y === self.props.selectedSpaceY
                    ){
                        selected = true;
                    }

                    mockBoardArray[x][y] = {
                        type:'none',
                        positionX: x,
                        positionY: y,
                        selected: selected
                    };
                    set = true;
                }
            }
        }

        // look up more about how this works!
        const boardRows = mockBoardArray.map((rowArray, index) =>
            // Correct! Key should be specified inside the array.
            <GameRow key={index.toString()} rowArray={rowArray} selectedSpaceX={this.props.selectedSpaceX} selectedSpaceY={this.props.selectedSpaceY} setSelectedSpace={this.props.setSelectedSpace} />
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
