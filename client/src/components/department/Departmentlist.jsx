import React from 'react'

function Departmentlist() {
  return (
    <table id='example' className='table table-stripped' style={{width:"100%", color:"#fff"}}>
        <thead>
            <tr>
                <th>SL</th>
                <th>Department</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>General Manager</td>
                <td>
                    <button className='btn btn-primary m-2'>Edit</button>
                    <button className='btn btn-primary m-2'>Delete</button>
                </td>
            </tr>
        </tbody>        
    </table>
  )
}

export default Departmentlist