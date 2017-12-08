import React, { Component } from 'react';
import firebase from '../helpers/firebase.js';

class LinkList extends Component {
  removeLink(linkId){
    const linkRef = firebase.database().ref(`/links/${linkId}`);
    linkRef.remove();
  }
  render() {
    return (
      <ul>
        {this.props.links.map((link, idx) => {
          const { linkTitle, linkUrl } = link;
          return(
            <li key={idx}>
              <a href={linkUrl}>{linkTitle}</a> | <button onClick={() => this.removeLink(link.id)}>Remove</button>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default LinkList;
