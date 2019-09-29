import React from 'react'
import {connect} from 'react-redux'
import {getFolders, getCategories, getAuthors, addNewPicture} from '../store'

const divStyle = {
  margin: '40px',
  border: '5px solid pink'
}

class AddPictures extends React.Component {
  constructor() {
    super()
    this.state = {imageDir: '', errorMsg: '', selectedAuthorId: -1}
    this.handledFileOnchange = this.handledFileOnchange.bind(this)
    this.handledAuthorOnchange = this.handledAuthorOnchange.bind(this)
    this.handledSubmit = this.handledSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getAuthors()
      await this.props.getFolders()
      await this.props.getCategories()
    } catch (err) {
      console.log('loading picture error', err.msg)
    }
  }

  handledFileOnchange(evt) {
    const input = document.getElementById('file')
    if (input.files && input.files[0]) {
      this.setState({imageDir: input.files[0].name})
    }
  }

  handledAuthorOnchange(evt) {
    this.setState({selectedAuthorId: evt.target.value})
  }

  async handledSubmit(evt) {
    evt.preventDefault()
    const img = this.state.imageDir
    const picture = {
      description: evt.target.description.value,
      imageDir: this.state.imageDir,
      author_id: evt.target.authors.value,
      album_id: evt.target.folders.value,
      category_id: evt.target.categories.value
    }
    await this.props.addNewPicture(picture)
    this.setState({errorMsg: `Picture ${img} saved.`})
  }

  render() {
    const {folders, categories, authors, isSaved} = this.props
    const selectedAuthorId =
      this.state.selectedAuthorId > 0
        ? this.state.selectedAuthorId
        : this.props.selectedAuthorId
    const flds = folders.filter(el => {
      return el.author_id == selectedAuthorId
    })
    return (
      <div className="add-form-div">
        <div className="add-form-div-1">
          <form onSubmit={this.handledSubmit}>
            <div>
              <input
                type="file"
                id="file"
                size="60"
                onChange={this.handledFileOnchange}
              />
            </div>

            <div>
              <label htmlFor="authors">Author: </label>
              <select name="authors" onChange={this.handledAuthorOnchange}>
                {authors
                  ? authors.map(el => {
                      return (
                        <option key={el.id} name={el.id} value={el.id}>
                          {el.name}
                        </option>
                      )
                    })
                  : ''}
              </select>
            </div>
            <div>
              <label htmlFor="folders">Album: </label>
              <select name="folders">
                {flds
                  ? flds.map(el => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.album}
                        </option>
                      )
                    })
                  : ''}
              </select>
            </div>
            <div>
              <label htmlFor="categories">Category: </label>
              <select name="categories">
                {categories
                  ? categories.map(el => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.category}
                        </option>
                      )
                    })
                  : ''}
              </select>
            </div>
            <div>
              <label htmlFor="Description">Description: </label>
              <input type="text" name="description" />
            </div>
            <div>
              <h5>{this.state.errorMsg}</h5>
              <input
                type="submit"
                value="Add Picture"
                className="button-home"
              />
            </div>
          </form>
        </div>

        <div className="add-form-div-2">
          {this.state.imageDir ? <img src={this.state.imageDir} /> : ''}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authors: state.author.authors,
    folders: state.folder.folders,
    categories: state.category.categories,
    selectedAuthorId:
      state.author.authors && state.author.authors.length > 0
        ? state.author.authors[0].id
        : 0,
    isSaved: state.isSaved
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuthors: () => dispatch(getAuthors()),
    getFolders: () => dispatch(getFolders()),
    getCategories: () => dispatch(getCategories()),
    addNewPicture: picture => dispatch(addNewPicture(picture))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPictures)
