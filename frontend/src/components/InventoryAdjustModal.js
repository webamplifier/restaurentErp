import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React from 'react'


export default function InventoryAdjustModal(props) {
    const { header="Adjust Inventory", label="Add/Subtract Quantity",showModal, setShowModal, adjustAmount,setAdjustAmount,submitAdjust } = props;

    return (
        <div className='delete_modal_box'>
            <CModal
                show={showModal}
                onClose={setShowModal}
            >
                <CModalHeader closeButton>
                    {header}
                </CModalHeader>
                <CModalBody className='delete_modal_body'>
                    <div className="row">

                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="">{label}</label>
                                <input type="text" value={adjustAmount} onChange={e => setAdjustAmount(e.target.value)} className='form-control' />
                            </div>
                        </div>
                        
                    </div>
                    <button type='submit' onClick={()=>submitAdjust()} className='col-12 btn btn-secondary mb-5'>Submit</button>
                </CModalBody>
            </CModal>
        </div>
    )
}
