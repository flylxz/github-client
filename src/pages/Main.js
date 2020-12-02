import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setQuery, setLoadingNext, setPage } from '../redux/actions';

import { ItemCard, Search, InfiniteScrollComponent } from '../components';

class Main extends Component {
  state = {
    choosenItem: null,
  };

  componentDidMount = () => this.getChoosenItem();

  componentDidUpdate = () => this.setChoosenItem(this.state.choosenItem);

  chooseItem = (id) => {
    const item = this.props.data.filter((repo) => repo.id === id);
    this.setState({ choosenItem: item[0] });
  };

  setChoosenItem = (item) => {
    localStorage.setItem('choosenItem', JSON.stringify(item));
  };

  getChoosenItem = () => {
    const choosenItem = localStorage.getItem('choosenItem')
      ? JSON.parse(localStorage.getItem('choosenItem'))
      : null;
    this.setState({ choosenItem });
  };

  handleSearch = (query) => {
    this.props.setPage(1);
    this.props.setQuery(query);
  };

  render() {
    return (
      <div className='container space-btw main'>
        <section className='col-1'>
          <Search setQuery={this.handleSearch} />
          <ul className='block scroll'>
            <li className='tab-head space-btw center'>
              <p className='col-1 gap-1 right'>No</p>
              <p className='col-6  gap-1 center'>Repo</p>
              <p className='col-1 gap-1 right'>Stars</p>
              <p className='col-1 gap-1 right'>Fav</p>
            </li>
            <InfiniteScrollComponent
              data={this.props.data}
              fav={this.props.fav}
              hasMore={this.props.hasMore}
              chooseItem={this.chooseItem}
              handleNext={this.props.setLoadingNext}
            />
          </ul>
        </section>
        <section className='col-1'>
          <ItemCard item={this.state.choosenItem} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ data, fav, hasMore }) => ({
  data,
  fav,
  hasMore,
});

const mapDispatchToProps = { setQuery, setLoadingNext, setPage };

export default connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = {
  data: PropTypes.array.isRequired,
  fav: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  setQuery: PropTypes.func.isRequired,
  setLoadingNext: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};
