import React from 'react'
import { Link } from 'react-router-dom'
const FeedBack = () => {
  return (
    <div>
      <div className='container-fluid group-chat-container row'>
      <div class="modal-dialog " role="document">
    <div class="modal-content rounded-4 shadow ">
      <div class="modal-header p-5 pb-4 border-bottom-0">
        <h1 class="fw-bold mb-0 fs-2">Thank You for using our services</h1>
      </div>
      <div class="modal-body p-5 pt-0">
        <form class="">
          <div className="col-md-12">
              <label for="country" className="form-label">Was your query resolved?</label>
              <select className="form-select" id="country" name="status">
                <option value="">select...</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">Help us serve you better by your invaluable feedback</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="background"></textarea>
            </div>
            <Link to='/'><button type="button" class="btn btn-success">Submit</button></Link>
        </form>
      </div>
    </div>
  </div>
      
    </div>
    </div>
  )
}

export default FeedBack
