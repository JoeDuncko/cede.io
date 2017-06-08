class GameRow extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        const rowArray = this.props.value;

        // look up more about how this works!
        const rowItems = rowArray.map((item, index) =>
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
