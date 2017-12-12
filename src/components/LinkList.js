import React, { Component } from 'react';
import firebase from 'firebase';

class LinkList extends Component {
  removeLink(itemId) {
    const linkRef = firebase.database().ref(`/links/${itemId}`);
    linkRef.remove();
  }
  render() {
    return (
      <ul>
        {this.props.links.map((link, idx) => {
          const { linkTitle, linkUrl } = link;
          return(
            <li key={idx}>
              <a href={linkUrl}>{linkTitle}</a>
              {this.props.user ? 
                <button onClick={ () => this.removeLink(link.id) }>Remove</button>
                :
                null
              }
            </li>
          )
        })}
      </ul>
    );
  }
}

export default LinkList;
