class Header extends React.Component { // eslint-disable-line no-unused-vars
    render() {
        return(
            <nav>
                <div className="nav-wrapper black">
                    <Logo />
                    <Username username={user.username} />
                </div>
            </nav>
        );
    }
}

class Logo extends React.Component {
    render() {
        return <a className="brand-logo" href="/">cede.io</a>;
    }
}

class Username extends React.Component {
    render() {
        return(
            <ul id="nav-mobile" className="right">
                <li><a href="/profile">{this.props.username}</a></li>
            </ul>
        );
    }
}
