import React from 'react'

function Row2() {
    return (
        <div className="row box">
            <div className="col-lg-6 box1">
                <div className='row2'>
                    <div className="edit">
                        <a href="" className='edit-btn'>
                            <i className='fa fa-pencil'></i>
                        </a>
                    </div>
                    <h3 className='title'>Bank Account</h3>
                    <tbody className='personal-info-data'>
                        <tr className="information">
                            <td className="title">Bank Holder Name:</td>
                            <td className="text">Jibi George</td>
                        </tr>
                        <tr className="information">
                            <td className="title">Account Number:</td>
                            <td className="text">George</td>
                        </tr>
                        <tr className="information">
                            <td className="title">Bank Name:</td>
                            <td className="text">o+</td>
                        </tr>
                        <tr className="information">
                            <td className="title">Branch Name:</td>
                            <td className="text">DHNPG2837L</td>
                        </tr>
                        <tr className="information">
                            <td className="title">IFSC Code:</td>
                            <td className="text">FGH6546</td>
                        </tr>
                    </tbody>
                </div>
            </div>
            <div className="col-lg-6 box2">
                <div className='row2'>
                    <div className="edit">
                        <a href="" className='edit-btn'>
                            <i className='fa fa-pencil'></i>
                        </a>
                    </div>
                    <h3 className='title'>Emergency Contact</h3>
                    <div className="permanent-address">
                        <h4 className="sub-title">Primary</h4>
                        <tbody className='personal-info-data'>
                            <tr className="information">
                                <td className="title">Name:</td>
                                <td className="text">Lini Mol</td>
                            </tr>
                            <tr className="information">
                                <td className="title">Relation:</td>
                                <td className="text">MOM</td>
                            </tr>
                            <tr className="information">
                                <td className="title">Contact No:</td>
                                <td className="text">8893482860</td>
                            </tr>
                        </tbody>
                    </div>
                    <div className="permanent-address">
                        <h4 className="sub-title">Seconday</h4>
                        <tbody className='personal-info-data'>
                            <tr className="information">
                                <td className="title">Name:</td>
                                <td className="text">Lini Mol</td>
                            </tr>
                            <tr className="information">
                                <td className="title">Relation:</td>
                                <td className="text">MOM</td>
                            </tr>
                            <tr className="information">
                                <td className="title">Contact No:</td>
                                <td className="text">8893482860</td>
                            </tr>
                        </tbody>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Row2