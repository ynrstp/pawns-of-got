import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ajax from 'superagent';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends Component{

	constructor(props){

		super(props)
    this.filterName = this.filterName.bind(this);
		this.state = {
      data: [
      //   {_id: 1,
      //     name: "Jon Snow",
      //     quote: "And now my watch has ended",
      //     location: "The Wall",
      //     house: "Stark",
      //     status: "Dead"
      // }
      ]
    }
	}

  filterName(event){
    var updatedData = this.state.alldata;
    updatedData = updatedData.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({data: updatedData});
  }

  componentWillMount() {
    ajax.get('http://api.pawnsofgot.com/pawn')
        .end((error, response) => {
            if (!error && response) {
                var shuffledData = shuffle(response.body.data)
                this.setState({ data: shuffledData, alldata: shuffledData });
            } else {
                console.log('There was an error fetching from api', error);
            }
        }
    );
  }

	render(){

      var items = this.state.data.map((item, i) => {
        return <Item key={i} item={item} />
      })

			return(
				<div>
          <input type="text" placeholder="Search" onChange={this.filterName}/>
          <ul className="grid">{items}</ul>
				</div>
			)

	}

}

class Item extends React.Component {
  render(){

    var cardStyles = {
    }

    // if(this.props.item.status == "Dead"){
    //
    //   cardStyles.opacity = "0.2"
    // }

    var photoStyles = {
      backgroundImage: 'url(../images/avatar/' + this.props.item.name.replace(/\s/g, '') + '.jpg)'
    }

    var bannerStyles = {
      backgroundImage: 'url(../images/location/' + this.props.item.location.replace(/\s/g, '') + '.jpg)'
    }

    var sigilStyles = {
      backgroundImage: 'url(../images/house/' + this.props.item.house.replace(/\s/g, '') + '.png)'
    }

    var statusStyles = {
      backgroundImage: 'url(../images/status/' + this.props.item.status + '.png)'
    }

    return (<div><li className="col-1-4">
      <div className="container" style={cardStyles}>
        <div className="card">
          <div className="photo" style={photoStyles}></div>
          <div className="banner" style={bannerStyles}></div>
          <ul>
            <li className="name">{this.props.item.name}</li>
            <li className="quote">"{this.props.item.quote}"</li>
          </ul>
          <div className="holder">
            <div className="sigil" style={sigilStyles}></div>
            <div className="status" style={statusStyles}></div>
          </div>
        </div>
      </div>
    </li></div>)
  }
}

export default App
