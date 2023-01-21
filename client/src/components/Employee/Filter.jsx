import React from 'react'

function Filter() {
    return (
        <div className="row">
            <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus">
                    <input type="text" className='form-control floating' />
                    <label className='focus-label'>Employee ID</label>
                </div>
            </div>
            <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus">
                    <input type="text" className='form-control floating' />
                    <label className='focus-label'>Employee Name</label>
                </div>
            </div>
            {/* <div class="col-sm-6 col-md-3">
                <div class="form-group form-focus select-focus">
                    <select class="select floating">
                        <option>Select Designation</option>
                        <option>Web Developer</option>
                        <option>Web Designer</option>
                        <option>Android Developer</option>
                        <option>Ios Developer</option>
                    </select>
                    <label class="select-label">Designation</label>
                </div>
            </div> */}
            {/* <div className="col-sm-6 col-md-3">
        <div className="form-group form-focus select-focus focused">
                <select className='select floating select2-hidden-accessible' data-select2-id='select2-data-1-e051' tabIndex='-1' aria-hidden='true'>
                    <option data-select2-id='select2-data-3-dr3x'>Select Designatiion</option>
                    <option value="">Admin</option>
                    <option value="">Manager</option>
                    <option value="">Assistant Manager</option>                    
                </select>
                <span className='select2 select2-container select2-container--default' dir='ltr' data-select2-data-id='select2-data-2-jyaz' style={{width:'100%'}}>
                    <span className='select2-selection select2-selection--single'>
                        <span className='select2-selection__rendered' title='Select Designation'>Select Designation</span>
                        <span className='select2-selection__arrow'>
                            <b></b>
                        </span>
                    </span>
                </span>
                <label className='focus-label'>Select Designation</label>
            </div>
        </div> */}
            <div className="col-sm-6 col-md-3"></div>
        </div>
    )
}

export default Filter