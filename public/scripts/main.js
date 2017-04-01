class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <GamesList />
            </div>
        );
    }
}

const app = <App user={user} />;

ReactDOM.render(
    app,
    document.getElementById('root')
);
