class GameRowItem extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        console.log("render game row item", this.props.value);

        return (
            <td className="gameTile">HI</td>
        );
    }
}
