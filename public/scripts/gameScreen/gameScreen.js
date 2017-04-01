//not currently including this in game.jade

class GameScreen extends React.Component { // eslint-disable-line no-unused-vars
    render() {
        return(
            <nav>
                <div className="nav-wrapper black">
                    <GameScreenHeader />
                    <GameScreenBody />
                </div>
            </nav>
        );
    }
}
