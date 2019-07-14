import React, { Component } from 'react';

export default class Timestamp extends Component {
	token = null;
  state = {
    query: "",
    people: []
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      query: value
    });

    this.search(value);
  };

  search = query => {
    const url = `https://swapi.co/api/people?search=${query}`;
    const token = {};
    this.token = token;

    fetch(url)
      .then(results => results.json())
      .then(data => {
        if (this.token === token) {
          this.setState({ people: data.results });
        }
      });
  };

  componentDidMount() {
    this.search("");
  }
	render() {

		return (
			<form className="col-lg-12">
        <input
          type="text"
          className="search-box"
          placeholder="Search for..."
          onChange={this.onChange}
        />
        {/*<input
          type="number"
          className="search-box"
          placeholder="Search for..."
          onChange={this.onChange}
        />*/}
        {this.state.people.map(person => (
          <ul key={person.name}>
            <li>{person.name}</li>
          </ul>
        ))}
      </form>
		);
	}
}
