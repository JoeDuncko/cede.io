class GamesList extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentDidMount() {
        // fetch('/game/list')
        //     .then(function(response) {
        //         console.log(response);
        //         console.log(response.json());
        //         // return response.json()
        //     });

        // fetch('/game/list')
        //     .then(response => {
        //         const reader = response.body.getReader();
        //
        //         reader.read().then(function process(result) {
        //             console.log(result);
        //             if (result.done) {
        //                 return;
        //             }
        //             console.log(`Received a ${result.value.length} byte chunk of data`);
        //             return reader.read().then(process);
        //         }).then(() => {
        //             console.log('All done!');
        //         });
        //     });

        // fetch('//localhost:3000/game/list', {
        //     method: 'GET'
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then(response => {
        //         this.setState({
        //             games: response
        //         });
        //     });
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
