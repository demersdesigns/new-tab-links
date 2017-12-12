import React, { Component } from 'react';
import firebase, { auth, provider } from './helpers/firebase.js';
import AddLinks from './components/AddLinks';
import LinkList from './components/LinkList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      links: [],
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);    
  }
  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
      }
    });

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
            {this.state.user ?
              <button onClick={this.logout}>Log Out</button>
              :
              <button onClick={this.login}>Log In</button>
            }
          </div>
        </header>
        <div className="container">
          {this.state.user ? 
          <section className="add-links">
            <h2>Add Links</h2>
            <AddLinks />
          </section>
          :
          null
          }
          <section className="display-links">
            <div className="wrapper">
              <h2>Links</h2>
              <LinkList user={this.state.user} links={this.state.links}/>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
