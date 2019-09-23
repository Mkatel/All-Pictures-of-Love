import React from 'react'
import {connect} from 'react-redux'
import {getAuthors, getFolders, getPictures} from '../store'

class AuthorPictures extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedAuthorId: -1,
      selectedFolderId: -1
    }
    this.handledFolderClick = this.handledFolderClick.bind(this)
    this.handledAuthorChange = this.handledAuthorChange.bind(this)
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
    console.log('evt', evt.target.className)
    this.setState({selectedFolderId: evt.target.value})
    if (evt.target.className) {
      evt.target.className = null
    } else {
      evt.target.className = 'active'
    }
  }

  handledAuthorChange(evt) {
    const fid = this.props.folders ? this.props.folders[0].id : 1
    this.setState({selectedAuthorId: evt.target.value, selectedFolderId: fid})
  }

  render() {
    const {authors, folders, pictures} = this.props
    const selectedAuthorId =
      this.state.selectedAuthorId >= 0
        ? this.state.selectedAuthorId
        : this.props.selectedAuthorId
    const selectedFolderId =
      this.state.selectedFolderId >= 0
        ? this.state.selectedFolderId
        : this.props.selectedFolderId
    //console.log("ids", selectedAuthorId, selectedFolderId);

    const pics = pictures.filter(el => {
      return el.authorId == selectedAuthorId && el.folderId == selectedFolderId
    })

    return (
      <div className="authorpictures-container">
        <div className="left">
          <div>
            <ul>
              {folders
                ? folders.map((el, idx) => {
                    return (
                      <li
                        key={idx}
                        value={el.id}
                        onClick={this.handledFolderClick}
                        className={el.id == selectedFolderId ? 'active' : null}
                      >
                        <img
                          src="folderclose.png"
                          width="40px"
                          height="40px"
                          id={el.id}
                        />
                        {el.folder}
                      </li>
                    )
                  })
                : ''}

              {/* <li>folder1</li>
                            <li>folder2</li>
                            <li>folder3</li> */}
            </ul>
          </div>
          <div>
            <span className="span-hidden">{this.state.selectedFolderId}</span>

            {/* <form>
                            <input type = "text"></input>
                            <button type = "submit">Add Folder</button>
                        </form> */}
          </div>
        </div>

        <div className="right">
          <div className="container-imgs-col2-filter">
            <span className="span-hidden">{this.state.selectedAuthorId}</span>
            Author: &nbsp;{' '}
            <select id="lang" onChange={this.handledAuthorChange}>
              {authors
                ? authors.map((el, idx) => {
                    return (
                      <option key={idx} value={el.id}>
                        {el.name}
                      </option>
                    )
                  })
                : ''}

              {/* <option value ="Kate">Kate</option>
                                <option value ="Darin">Darin</option>
                                <option value ="Ming">Ming</option> */}
            </select>&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" className="btn-regular">
              Add Picture
            </button>
          </div>
          <div className="warpper">
            <div className="img-area">
              {pics
                ? pics.map((el, idx) => {
                    return (
                      <div className="single-img" key={idx}>
                        <img src={el.imageDir} />
                        {el.description}
                      </div>
                    )
                  })
                : ''}

              {/* <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div>
                            <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div>
                            <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div>
                            <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div>
                            <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div>
                            <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div>
                            <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div>
                            <div className = "single-img"><img src = "flag.png"  />Discover.jpg</div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authors: state.author.authors,
    folders: state.folder.folders,
    selectedAuthorId:
      state.author.authors && state.author.authors.length > 0
        ? state.author.authors[0].id
        : 0,
    selectedFolderId:
      state.folder.folders && state.folder.folders.length > 0
        ? state.folder.folders[0].id
        : 0,
    pictures: state.picture.pictures
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuthors: () => dispatch(getAuthors()),
    getFolders: () => dispatch(getFolders()),
    getPictures: () => dispatch(getPictures())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPictures)
