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
                <td className="gameTile"><img src="/images/enemy.png" style={{width: '100%'}}></img></td>
            );
        } else if(
            this.props.value &&
            this.props.value.type === 'Tower'
        ){
            return (
                <td className="gameTile"><img src="/images/tower.png" style={{width: '100%'}}></img></td>
            );
        }else if(
            this.props.value &&
            this.props.value.type === 'Base'
        ){
            return (
                <td className="gameTile"><img src="/images/base.png" style={{width: '100%'}}></img></td>
            );
        }else {
            return (
                <td className="gameTile"></td>
            );
        }


    }
}
