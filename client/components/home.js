import React from 'react'
import {connect} from 'react-redux'
import {getPictures, getCategories, getPicturesByFilter} from '../store'
import {Link} from 'react-router-dom'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {filterBy: 2, filterName: 'ALL'}
    this.handedClick = this.handedClick.bind(this)
    this.handledSearch = this.handledSearch.bind(this)
  }
  async componentDidMount() {
    try {
      await this.props.getPictures()
      await this.props.getCategories()
    } catch (err) {
      console.log('loading picture error', err.msg)
    }
  }
  handedClick(evt) {
    this.setState({filterBy: evt.target.name, filterName: evt.target.value})
  }

  async handledSearch() {
    let description = document.getElementById('description').value
    await this.props.getPicturesByFilter(description)
  }

  render() {
    const {pictures, categories} = this.props
    let pics = pictures
    if (pictures && pictures.length > 0) {
      const filter = this.state.filterBy
      if (this.state.filterName.toUpperCase() !== 'ALL') {
        pics = pictures.filter(el => el.category_id.toString() === filter)
      }
    }

    return (
      <div>
        <div className="home-button-div">
          {categories
            ? categories.map(el => {
                return (
                  <button
                    className="button-home"
                    key={el.id}
                    type="button"
                    name={el.id}
                    value={el.category}
                    onClick={this.handedClick}
                  >
                    {el.category}
                  </button>
                )
              })
            : ''}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="home-span-desc">Description:</span>{' '}
          <input
            type="text"
            name="description"
            id="description"
            className="home-textbox"
          />
          <button
            name="Search"
            className="button-home"
            onClick={this.handledSearch}
          >
            Search
          </button>
        </div>

        <div className="warpper">
          <div className="img-area">
            {pics
              ? pics.map(el => {
                  return (
                    <div className="single-img" key={el.id}>
                      <div>
                        <img src={el.imageDir} />
                      </div>
                      <div className="img-desc">{el.description}</div>
                    </div>
                  )
                })
              : ''}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pictures: state.picture.pictures,
    categories: state.category.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPictures: () => dispatch(getPictures()),
    getCategories: () => dispatch(getCategories()),
    getPicturesByFilter: filter => dispatch(getPicturesByFilter(filter))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
