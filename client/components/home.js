import React from 'react'
import {connect} from 'react-redux'
import {getPictures, getCategories} from '../store'
//const flower2 = require('../../public/flower2.jpeg');

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      filterBy: '0',
      filterName: 'ALL'
    }
    this.handedClick = this.handedClick.bind(this)
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
    const filter = evt.target.name
    console.log(evt.target.value)
    this.setState({filterBy: filter, filterName: evt.target.value})
  }
  render() {
    const {pictures, categories} = this.props
    if (pictures && pictures.length > 0) {
      const filter = this.state.filterBy
      let pics = pictures
      if (this.state.filterName.toUpperCase() !== 'ALL') {
        pics = pictures.filter(el => el.categoryId.toString() === filter)
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
          </div>
          <div className="warpper">
            <div className="img-area">
              {pics.map(el => {
                return (
                  <div key={el.id} className="single-img">
                    <img src={el.imageDir} />
                    {el.description}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
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
    getCategories: () => dispatch(getCategories())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
