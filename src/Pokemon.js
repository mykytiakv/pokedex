import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Pokemon.css';

var Types = ['All', 'Electric', 'Poison', 'Grass', 'Normal', 'Bug'];

var PokemonCard = React.createClass({
  correctId: function(id) {
    if(id < 10) id = '00' + id;
    if(id < 100 && id > 10) id = '0' + id;
    return id;
  },

  render: function() {
    return(
      <div className="info-card">
        <img src={"http://pokeapi.co/media/img/" + this.props.id + ".png/"} alt="image"/>
        <h1>{this.props.name} #{this.correctId(this.props.id)}</h1>
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Fire</th>
            </tr>
            <tr>
              <td>Attack</td>
              <td>{this.props.attack}</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td>{this.props.defense}</td> 
            </tr>
            <tr>
              <td>HP</td>
              <td>{this.props.hp}</td> 
            </tr>
            <tr>
              <td>SP Attack</td>
              <td>{this.props.sp_atk}</td> 
            </tr>
            <tr>
              <td>SP Defense</td>
              <td>{this.props.sp_def}</td> 
            </tr>
            <tr>
              <td>Speed</td>
              <td>{this.props.speed}</td> 
            </tr>
            <tr>
              <td>Weight</td>
              <td>{this.props.weight}</td> 
            </tr>
            <tr>
              <td>Total Moves</td>
              <td>{this.props.moves}</td> 
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
})


var Pokemon = React.createClass({

  getInitialState: function() {
    return {
      info: [],
      types: []
    }
  },

  componentDidMount: function() {
    axios.get('http://pokeapi.co/api/v1/pokemon/' + this.props.id + '/')
    .then(results => {
      this.setState({
        types: results.data.types,
        info: results.data
      })
    })
    .catch(err => console.log(err))
  },

  handleClick: function(e) {
    ReactDOM.render(
    <PokemonCard 
      id={this.state.info.national_id}
      name={this.state.info.name}
      attack={this.state.info.attack}
      defense={this.state.info.defense}
      hp={this.state.info.hp}
      sp_atk={this.state.info.sp_atk}
      sp_def={this.state.info.sp_def}
      speed={this.state.info.speed}
      weight={this.state.info.weight}
      moves={this.state.info.moves.length}
    />, document.getElementById('card'));
  },

  render: function() {
    return (
      <div className="pokemon text-center" onClick={this.handleClick.bind(null, this)}>
        <img src={"http://pokeapi.co/media/img/" + this.props.id + ".png/"} alt="image"/>
        <h3>{this.props.name}</h3>
        <section role="types">
          {this.state.types.map(function(type, key) {
            return <div className={type.name} key={key}>{type.name}</div>   
          })}
        </section>
      </div>
    )
  }
})

var Pokemons = React.createClass({
    
  getInitialState: function() {
    return {
      pokemons: [],
      limit: 12,
      filterPokemon: []
    }
  },
    
  componentDidMount: function() {
    axios.get('http://pokeapi.co/api/v1/pokemon/?limit=' + this.state.limit)
    .then(results => {
      this.setState({
        pokemons: results.data.objects,
        filterPokemon: results.data.objects,
      })
    })
    .catch(err => console.log(err))
  },

  loadMore: function() {
    console.log('Click!');
    var newLimit = this.state.limit + 12;
    this.setState({
      limit: newLimit
    }, 
    function() {
      axios.get('http://pokeapi.co/api/v1/pokemon/?limit=' + this.state.limit)
        .then(results => {
          this.setState({
          pokemons: results.data.objects,
          filterPokemon: results.data.objects,
        })
      })
      .catch(err => console.log(err))
    });
    console.log('Limit now is ', this.state.limit);
    
  },

  handleSearch: function(event) {    
    var searchQuery = event.target.value.toLowerCase();
    var newList = this.state.pokemons.filter(function(el) {
      var searchValue = el.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.setState({
      filterPokemon: newList
    });
  },

  render: function() {   
    return (
      <div>
        <input type="text" placeholder="Search..." className="search-field" onChange={this.handleSearch} />
        {/* <select onChange={this.filterType}>
          {Types.map(function(type) {
            return <option value={type}>{type}</option>
          })}
        </select> */}
        {this.state.filterPokemon.map(function(pokemon, i) {
          return <Pokemon name={pokemon.name} key={i} id={pokemon.national_id} />      
        })}
        <button onClick={this.loadMore}>Load More</button>
      </div>
    )
  }
})

export default Pokemons;