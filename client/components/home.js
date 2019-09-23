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
              ? categories.map((el, idx) => {
                  return (
                    <button
                      className="button-home"
                      key={idx}
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
            {/* <button type = "button" name = "0" onClick = {this.handedClick}>All</button> &nbsp; */}
          </div>
          <div className="warpper">
            {/* <h1>Pictures</h1> */}
            <div className="img-area">
              {pics.map((el, idx) => {
                return (
                  <div key={idx} className="single-img">
                    <img src={el.imageDir} />
                    {el.description}
                  </div>
                )
              })}
              {/* <div className = "single-img"><img src = {this.props.pictures[0].imageDir}  />Discover.jpg</div>
                   */}
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
  console.log('state', state)
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
