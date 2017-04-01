class Header extends React.Component { // eslint-disable-line no-unused-vars
    render() {
        return(
            <nav>
                <div className="nav-wrapper black">
                    <a className="brand-logo" href="/">cede.io</a>
                    <ul id="nav-mobile" className="right">
                        <li><a onClick={this.toProfile} href="#">{user.username}</a></li>
                    </ul>
                </div>
            </nav>
        );
    }

    toProfile(event){
        event.preventDefault();
        console.log("go to profile");

        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
    }
}
