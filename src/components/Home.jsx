import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import get from 'lodash/get';

import { fetchPosts } from '../actions';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  onSubmit(e) {
    const { dispatch } = this.props;
    const { search } = this.state;

    dispatch(fetchPosts(search));

    e.preventDefault();
  }

  handleSearchChange (e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { shows } = this.props;

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="card mb-4">
              <div className="card-body">
                <h5>Search by name:</h5>
                <form className="form-inline" onSubmit={this.onSubmit}>
                  <div className="form-group pr-2">
                    <input type="name" className="form-control" placeholder="Name" onChange={this.handleSearchChange} value={this.state.search} />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="d-flex flex-wrap mr-n2">
              {shows.map(({ show }, index) => {
                return (
                  <div className="col-4 pr-1 pb-2 pl-1" key={index}>
                      <div className="card">
                        <Link to={`/details/${get(show, 'id', '')}`}>
                          <img src={get(show, 'image.medium', 'https://via.placeholder.com/200x230.jpg?text=Poster')} height={get(show, 'image') ? '' : '295'} alt={get(show, 'name', '')} className="card-img-top" />
                        </Link>
                        <div className="card-body">
                          <h6>{get(show, 'name', '')}</h6>
                          <Link to={`/details/${get(show, 'id', '')}`} className="btn btn-primary btn-small">Details</Link>
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { postsBySearch } = state;

  return {
    ...postsBySearch,
  };
}

export default connect(mapStateToProps)(Home);
