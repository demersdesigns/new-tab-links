import React, { Component } from 'react';
import firebase from '../helpers/firebase.js';

class AddLinks extends Component{
  constructor() {
    super();
    this.state={
      linkTitle: '',
      linkUrl: '',
      linkCategory: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const linksRef = firebase.database().ref('links');
    const link = {
      linkTitle: this.state.linkTitle,
      linkUrl: this.state.linkUrl,
      linkCategory: this.state.linkCategory
    }
    linksRef.push(link);
    this.setState({
      linkTitle: '',
      linkUrl: '',
      linkCategory: ''
    });
  }
  render(){
    return(
      <section className="add-links">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="linkTitle" placeholder="Link Title" onChange={this.handleChange} value={this.state.linkTitle} />
          <input type="text" name="linkUrl" placeholder="Link URL" onChange={this.handleChange} value={this.state.linkUrl} />
          <select name="linkCategory" onChange={this.handleChange} value={this.state.linkCategory} >
          <option value="">Choose a Category</option>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
          </select>
          <button>Add Link</button>
        </form>
      </section>
    )
  }
}

export default AddLinks;