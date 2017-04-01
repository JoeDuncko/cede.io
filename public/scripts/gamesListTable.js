class GamesListTable extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentDidMount() {
        fetch('/game/list', {
            credentials: 'include'
        })
            .then((response) => {
                return response.json();
            })
            .then(response => {
                this.setState({
                    games: response
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render(){
        const games = this.state.games;

        const listItems = games.map((game) =>
            // Correct! Key should be specified inside the array.
            <GamesListItem key={game._id.toString()}
                  value={game} />
        );

        return (
            <tbody>
                {listItems}
            </tbody>
        );
    }
}
