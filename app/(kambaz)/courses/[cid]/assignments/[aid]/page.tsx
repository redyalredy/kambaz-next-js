export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label> 
        <br/>
        <br/>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description"
          defaultValue="The assignment is available online Submit a link to the landing page of"
        />
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select>
                <option value="Assignments">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
              <select className="wd-btn" id="wd-display-grade" defaultValue="Percentage">
                  <option value="Letter">Letter</option>
                  <option value="Points">Points</option>
                  <option value="Percentage">Percentage</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission">Submission Type</label>
            </td>
            <td>
              <select className="wd-btn" id="wd-submission-type" defaultValue="Online">
                  <option value="InPerson">InPerson</option>
                  <option value="Online">Online</option>
              </select>
              <br/>

            <label>Online Entry Options</label><br/>
              <input type="checkbox" name="check-entry" id="wd-chkbox-text"/>
              <label htmlFor="wd-chkbox-text">Text Entry</label><br/>

              <input type="checkbox" name="check-entry" id="wd-chkbox-website"/>
              <label htmlFor="wd-chkbox-website">Website URL</label><br/>

              <input type="checkbox" name="check-entry" id="wd-chkbox-media"/>
              <label htmlFor="wd-chkbox-media">Media Recordings</label><br/>

              <input type="checkbox" name="check-entry" id="wd-chkbox-student"/>
              <label htmlFor="wd-chkbox-student">Student Annotations</label><br/>

              <input type="checkbox" name="check-entry" id="wd-chkbox-file"/>
              <label htmlFor="wd-chkbox-file">File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">Assign</td>
            <td>
              <label htmlFor="wd-assign">Assign to</label>
              <br/>
              <input id="wd-assign" defaultValue="Everyone" />
              <br/>
              <label htmlFor="wd-due-date">Due</label>
              <br/>
              <input type="date" id="wd-due-date" name="wd-due-date" defaultValue="2026-11-25"/>
              <br/>
              <table>
                <tr>
                  <td>
                  <label htmlFor="wd-available">Available from</label>
            <br/>
              <input type="date" id="wd-available" name="wd-available" defaultValue="2026-11-22"/>
                  </td>
                  <td>
                  <label htmlFor="wd-until">Until</label> <br/>
              <input type="date" id="wd-until" name="wd-until" defaultValue="2026-11-25"/>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <hr />
        <button className="wd-assignment-button">Cancel</button>
        <button className="wd-assignment-button">Save</button>
      </div>
  );}
  
  