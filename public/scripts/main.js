//header
ReactDOM.render(
    <Header user={user} />,
    document.getElementById('header')
);

//initial content, rendered separately so it can be replaced separately
ReactDOM.render(
    <GamesList />,
    document.getElementById('content')
);
