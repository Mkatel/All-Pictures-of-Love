import React from 'react'
import {connect} from 'react-redux'
import {getAuthors, getFolders, getPictures, removePicture} from '../store'
import {Link} from 'react-router-dom'

class AuthorPictures extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedAuthorId: -1,
      selectedFolderId: -1
    }
    this.handledFolderClick = this.handledFolderClick.bind(this)
    this.handledAuthorChange = this.handledAuthorChange.bind(this)
    this.handledRemove = this.handledRemove.bind(this)
  }

  async componentDidMount() {
    // load authors
    await this.props.getAuthors()
    // load folders for selected author
    await this.props.getFolders()
    // load pictures for selected author and folder
    await this.props.getPictures()
  }

  handledFolderClick(evt) {
    this.setState({selectedFolderId: evt.target.value})
    if (evt.target.className) {
      evt.target.className = null
    } else {
      evt.target.className = 'active'
    }
  }

  async handledAuthorChange(evt) {
    const aid = document.getElementById('author').value
    let fid = 1
    if (this.props.folders && this.props.folders.length > 0) {
      const ret = this.props.folders.filter(el => el.author_id == aid)
      if (ret.length > 0) {
        fid = ret[0].id
      }
    }
    await this.setState(currentState => {
      return {selectedAuthorId: aid, selectedFolderId: fid}
    })
  }

  async handledRemove(evt) {
    await this.props.removePicture(evt.target.name)
  }

  render() {
    const {authors, folders, pictures} = this.props

    const selectedAuthorId =
      this.state.selectedAuthorId > 0
        ? this.state.selectedAuthorId
        : this.props.selectedAuthorId
    const selectedFolderId =
      this.state.selectedFolderId > 0
        ? this.state.selectedFolderId
        : this.props.selectedFolderId

    const flds = folders.filter(el => {
      return el.author_id == selectedAuthorId
    })

    const pics = pictures.filter(el => {
      return el.author_id == selectedAuthorId && el.album_id == selectedFolderId
    })

    return (
      <div className="authorpictures-container">
        <div className="left">
          <div>
            <ul>
              {flds
                ? flds.map(el => {
                    return (
                      <li
                        key={el.id}
                        value={el.id}
                        onClick={this.handledFolderClick}
                        className={el.id == selectedFolderId ? 'active' : null}
                      >
                        <img
                          src="folderclose.png"
                          width="20px"
                          height="20px"
                          id={el.id}
                        />
                        {el.album}
                      </li>
                    )
                  })
                : ''}
            </ul>
          </div>
          <div>
            <span className="span-hidden">{this.state.selectedFolderId}</span>
          </div>
        </div>

        <div className="right">
          <div className="container-imgs-col2-filter">
            <span className="span-hidden">{this.state.selectedAuthorId}</span>
            Author: &nbsp;{' '}
            <select id="author" onChange={this.handledAuthorChange}>
              {authors
                ? authors.map(el => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    )
                  })
                : ''}
            </select>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/addPictures">
              <button type="button" className="btn-regular">
                Add Picture
              </button>
            </Link>
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
                        <div className="img-desc-ap">{el.description}</div>
                        <div className="button-div">
                          <button
                            name={el.id}
                            id={el.id}
                            className="button-home"
                            onClick={this.handledRemove}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  })
                : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const authorId =
    state.author.authors && state.author.authors.length > 0
      ? state.author.authors[0].id
      : 0
  let folderId = 0
  if (authorId > 0 && state.folder.folders && state.folder.folders.length > 0) {
    folderId = state.folder.folders.filter(el => el.author_id === authorId)[0]
      .id
  }
  return {
    authors: state.author.authors,
    folders: state.folder.folders,
    selectedAuthorId: authorId,
    selectedFolderId: folderId,
    pictures: state.picture.pictures
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuthors: () => dispatch(getAuthors()),
    getFolders: () => dispatch(getFolders()),
    getPictures: () => dispatch(getPictures()),
    removePicture: id => dispatch(removePicture(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPictures)
