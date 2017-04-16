class GameScreenBody extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        for(var i = 0; i < this.props.enemies.length; i++){
            //put enemy in tile
        }

        //TODO: do the same for towers
    }

    render() {
        return(
            <table className="gameBoard">
                <tbody>
                    <tr>
                        <td id="tile-1-1" className="gameTile"></td>
                        <td id="tile-2-1" className="gameTile"></td>
                        <td id="tile-3-1" className="gameTile"></td>
                        <td id="tile-4-1" className="gameTile"></td>
                        <td id="tile-5-1" className="gameTile"></td>
                    </tr>
                    <tr>
                        <td id="tile-1-2" className="gameTile"></td>
                        <td id="tile-2-2" className="gameTile"></td>
                        <td id="tile-3-2" className="gameTile"></td>
                        <td id="tile-4-2" className="gameTile"></td>
                        <td id="tile-5-2" className="gameTile"></td>
                    </tr>
                    <tr>
                        <td id="tile-1-3" className="gameTile"></td>
                        <td id="tile-2-3" className="gameTile"></td>
                        <td id="tile-3-3" className="gameTile">PUT BASE HERE</td>
                        <td id="tile-4-3" className="gameTile"></td>
                        <td id="tile-5-3" className="gameTile"></td>
                    </tr>
                    <tr>
                        <td id="tile-1-4" className="gameTile"></td>
                        <td id="tile-2-4" className="gameTile"></td>
                        <td id="tile-3-4" className="gameTile"></td>
                        <td id="tile-4-4" className="gameTile"></td>
                        <td id="tile-5-4" className="gameTile"></td>
                    </tr>
                    <tr>
                        <td id="tile-1-5" className="gameTile"></td>
                        <td id="tile-2-5" className="gameTile"></td>
                        <td id="tile-3-5" className="gameTile"></td>
                        <td id="tile-4-5" className="gameTile"></td>
                        <td id="tile-5-5" className="gameTile"></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
