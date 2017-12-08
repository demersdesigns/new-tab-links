import React, { Component } from 'react';
import firebase from './helpers/firebase.js';
import AddLinks from './components/AddLinks';
import LinkList from './components/LinkList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      links: []
    }
  }
  componentDidMount() {
    const linksRef = firebase.database().ref('links');
    linksRef.on('value', (snapshot) => {
      let links = snapshot.val();
      let newState = [];

      for(let link in links) {
        newState.push({
          id: link,
          linkTitle: links[link].linkTitle,
          linkUrl: links[link].linkUrl,
          linkCategory: links[link].linkCategory
        });
      }
      this.setState({
        links: newState
      })
    });
  }
  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>New Tab Links</h1>
          </div>
        </header>
        <div className="container">
          <h2>Add Links</h2>
          <AddLinks />
          <section className="display-links">
            <div className="wrapper">
              <h2>Links</h2>
              <LinkList links={this.state.links}/>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
