import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react';
import firebase from '../helpers/firebase.js';
import AddLinks from './AddLinks';
import LinkList from './LinkList';

export default withAuth(class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      links: []
    };

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if(authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
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
      });
    });
  }
  render() {
    if(this.state.authenticated === null) return null;

    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>New Tab Links</h1>
            {this.state.authenticated ?
              <button onClick={this.props.auth.logout}>Logout</button>
              :
              <button onClick={this.props.auth.login}>Login</button>
            }
          </div>
        </header>
        <div className="container">
          {this.state.authenticated ?
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
              <LinkList links={this.state.links} authenticated={this.state.authenticated} />
            </div>
          </section>
        </div>
      </div>
    );
  }
});