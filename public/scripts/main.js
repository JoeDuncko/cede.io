const header = <Header user={user} />;

const gamesList = <GamesList />;

//header
ReactDOM.render(
    header,
    document.getElementById('header')
);

//initial content, rendered separately so it can be replaced separately
ReactDOM.render(
    gamesList,
    document.getElementById('content')
);
