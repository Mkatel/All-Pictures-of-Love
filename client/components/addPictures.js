import React from 'react'

class AddPictures extends React.Component {
  constructor() {
    super()
    this.handledOnchange = this.handledOnchange.bind(this)
  }
  handledOnchange(evt) {
    console.log(evt)
    const input = document.getElementById('file')
    const image = document.getElementById('blah')
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function(e) {
        image.src = e.target.result
        image.width = 150
        image.height = 150
        // image.attr('src', e.target.result)
        //     .width(150)
        //     .height(200);
      }

      reader.readAsDataURL(input.files[0])
    }
  }
  render() {
    return (
      <div>
        <form>
          <input type="file" id="file" onChange={this.handledOnchange} />
          <img id="blah" src="#" alt="your image" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default AddPictures
