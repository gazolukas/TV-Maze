import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { fetchPost } from '../actions';

const propTypes = {
  match: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  premiered: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

class Details extends React.Component {
  componentDidMount = () => {
    const { match, dispatch } = this.props;
    dispatch(fetchPost(match.params.id));
  };

  render() {
    const { name, summary, genres, premiered, image } = this.props;

    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {/* eslint-disable-next-line */}
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {name}
                </li>
              </ol>
            </nav>
            {image ? (
              <img src={image.original} alt={name} className="card-img-top" />
            ) : (
              <img
                src="https://via.placeholder.com/200x230.jpg?text=Poster"
                alt=""
                className="card-img-top"
              />
            )}
            <h1 className="mt-4">{name}</h1>
            <small>
              Premiered:
              {moment(premiered).format('DD.MM.YYYY')}
            </small>
            {summary && (
              <p dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
            )}
            {genres &&
              genres.map((genre) => <span className="badge badge-secondary">{genre}</span>)}
          </div>
        </div>
      </div>
    );
  }
}

Details.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    ...state.posts,
  };
}

export default connect(mapStateToProps)(Details);
