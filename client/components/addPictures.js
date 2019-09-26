import React from 'react'
import {connect} from 'react-redux'
import {getFolders, getCategories, addNewPicture} from '../store'

class AddPictures extends React.Component {
  constructor() {
    super()
    this.state = {
      imageDir: '',
      errorMsg: ''
    }
    this.handledOnchange = this.handledOnchange.bind(this)
    this.handledSubmit = this.handledSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getFolders()
      await this.props.getCategories()
    } catch (err) {
      console.log('loading picture error', err.msg)
    }
  }

  handledOnchange(evt) {
    const input = document.getElementById('file')
    if (input.files && input.files[0]) {
      this.setState({imageDir: input.files[0].name})
      // var reader = new FileReader()
      // reader.onload = function(e) {
      //   image.src = e.target.result
      //   image.width = 150
      //   image.height = 150
      //   // image.attr('src', e.target.result)
      //   //     .width(150)
      //   //     .height(200);
      // }
      // reader.readAsDataURL(input.files[0])
    }
  }

  async handledSubmit(evt) {
    evt.preventDefault()
    const picture = {
      name: evt.target.picName.value,
      description: evt.target.description.value,
      imageDir: this.state.imageDir,
      authorId: 1,
      folderId: evt.target.folders.value,
      categoryId: evt.target.categories.value
    }
    console.log('picture', picture)
    await this.props.addNewPicture(picture)
  }

  render() {
    const {folders, categories, isSaved} = this.props
    return (
      <div className="add-form-div">
        <div className="add-form-div-1">
          <form onSubmit={this.handledSubmit}>
            <input
              type="file"
              id="file"
              size="60"
              onChange={this.handledOnchange}
            />
            <select name="folders">
              {folders
                ? folders.map(el => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.folder}
                      </option>
                    )
                  })
                : ''}
            </select>
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
            Picture Name: <input type="text" name="picName" />
            Description: <input type="text" name="description" />
            {this.state.errorMsg}
            <input type="submit" value="Add Picture" />
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
    folders: state.folder.folders,
    categories: state.category.categories,
    isSaved: state.isSaved
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFolders: () => dispatch(getFolders()),
    getCategories: () => dispatch(getCategories()),
    addNewPicture: picture => dispatch(addNewPicture(picture))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPictures)
