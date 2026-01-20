export default function Modules() {
    return (
      <div>
        <button className="wd-btn">Collapse All</button>
        <button className="wd-btn">View Progress</button>
                <select className="wd-btn" id="wd-publish">
                <option value="Publish All">Publish All</option>
                <option value="Publish None">Publish None</option>
                <option selected value="Publish One">Publish One</option>
                <option value="Publish Two">Publish Two</option>
                </select>
        <button className="wd-btn">+ Module</button>

        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div> </li>
          <li className="wd-module">
            <div className="wd-title">Week 3</div> </li>
        </ul>
      </div>
  );}
  
  