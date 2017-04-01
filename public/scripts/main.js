class App extends React.Component {
    render() {
        return (
            <Header />
        );
    }
}

const app = <App user={user} />;

ReactDOM.render(
    app,
    document.getElementById('root')
);
