class GameRowItem extends React.Component { // eslint-disable-line no-unused-vars
    constructor(props) {
        super(props);
    }

    render() {
        if(
            this.props.value &&
            this.props.value.type === 'Enemy'
        ){
            return (
                <td className="gameTile">
                    <div className="gameTileInner">
                        <span className="healthHalo">{this.props.value.health}</span>
                        <img className="gameTileImage" src="/images/enemy.png"></img>
                    </div>
                </td>
            );
        } else if(
            this.props.value &&
            this.props.value.type === 'Tower'
        ){
            return (
                <td className="gameTile">
                    <div className="gameTileInner">
                        <span className="healthHalo">{this.props.value.health}</span>
                        <img className="gameTileImage" src="/images/tower.png"></img>
                    </div>
                </td>
            );
        }else if(
            this.props.value &&
            this.props.value.type === 'Base'
        ){
            return (
                <td className="gameTile">
                    <div className="gameTileInner">
                        <span className="healthHalo">{this.props.value.health}</span>
                        <img className="gameTileImage" src="/images/base.png"></img>
                    </div>
                </td>
            );
        }else if(
            this.props.value &&
            this.props.value.selected
        ){
            return (
                <td className="gameTile">
                    <div className="gameTileInner gameTileInnerSelected empty" onClick={this.props.setSelectedSpace.bind(this, this.props.value.positionX, this.props.value.positionY)}></div>
                </td>
            );
        }else {
            return (
                <td className="gameTile">
                    <div className="gameTileInner empty" onClick={this.props.setSelectedSpace.bind(this, this.props.value.positionX, this.props.value.positionY)}></div>
                </td>
            );
        }
    }
}
