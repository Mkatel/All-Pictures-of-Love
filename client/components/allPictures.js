import React from 'react'

class AllPictures extends React.Component {
  render() {
    return (
      <div className="container-imgs">
        <div className="container-imgs-col1">
          <div>
            <ul>
              <li>Folder09212019</li>
              <li>Folder09212019</li>
              <li>Folder09212019</li>
            </ul>
          </div>
          <div>add folder</div>
        </div>

        <div className="container-imgs-col2">
          <div className="container-imgs-col2-filter">
            all user || add images
          </div>
          <div className="warpper">
            <div className="img-area">
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
              <div className="single-img">
                <img src="flag.png" />Discover.jpg
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AllPictures
