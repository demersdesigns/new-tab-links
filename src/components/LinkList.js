import React, { Component } from 'react';

class LinkList extends Component {
  render() {
    return (
      <ul>
        {this.props.links.map((link, idx) => {
          const { linkTitle, linkUrl } = link;
          return(
            <li key={idx}>
              <a href={linkUrl}>{linkTitle}</a>
            </li>
          )
        })}
      </ul>
    );
  }
}

export default LinkList;
