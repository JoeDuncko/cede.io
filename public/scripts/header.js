class Header extends React.Component { // eslint-disable-line no-unused-vars
    render() {
        return(
            <nav>
                <div className="nav-wrapper black">
                    <a className="brand-logo" href="/" onClick={this.rerenderGamesList}>
                        <img className="brand-logo-image" src="/images/cedeiologowhite.png"></img>cede.io
                        </a>
                    <ul id="nav-mobile" className="right">
                        <li><a onClick={this.toProfile} href="#">{user.username}</a></li>
                    </ul>
                </div>
            </nav>
        );
    }

    toProfile(event){
        event.preventDefault();
        console.log('go to profile');

        // ReactDOM.render(
        //     <Profile username={user.username} />,
        //     document.getElementById('content')
        // );
    }

    rerenderGamesList(event){
        event.preventDefault();

        ReactDOM.render(
            <GamesList />,
            document.getElementById('content')
        );
    }
}
