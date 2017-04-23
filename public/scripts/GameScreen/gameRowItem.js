class GameRowItem extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        console.log('render game row item', this.props.value);

        if(
            this.props.value &&
            this.props.value.type === 'Enemy'
        ){
            return (
                <td className="gameTile">Enemy</td>
            );
        } else if(
            this.props.value &&
            this.props.value.type === 'Tower'
        ){
            return (
                <td className="gameTile">Tower</td>
            );
        }else if(
            this.props.value &&
            this.props.value.type === 'Base'
        ){
            return (
                <td className="gameTile">Base</td>
            );
        }else {
            return (
                <td className="gameTile"></td>
            );
        }


    }
}
