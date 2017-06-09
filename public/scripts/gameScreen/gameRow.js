class GameRow extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        // look up more about how this works!
        const rowItems = this.props.rowArray.map((item, index) =>
            // Correct! Key should be specified inside the array.
            <GameRowItem key={index.toString()} value={item} setSelectedSpace={this.props.setSelectedSpace}/>
        );

        return (
            <tr>
                {rowItems}
            </tr>
        );
    }
}
