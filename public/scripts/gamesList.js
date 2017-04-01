class GamesList extends React.Component { // eslint-disable-line no-unused-vars
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

    render() {
        console.log (this.state);
        return(
            <nav>
                <div className="nav-wrapper black">
                    <Logo />
                    <Username games={user.username} />
                </div>
            </nav>
        );
    }

}
