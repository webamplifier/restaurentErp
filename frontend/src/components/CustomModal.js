import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React from 'react'

export default function CustomModal(props) {
    const { modal, setModal, deleteEntry } = props;

    return (
        <div className='delete_modal_box'>
            <CModal
                show={modal}
                onClose={setModal}
            >
                <CModalHeader closeButton>
                </CModalHeader>
                <CModalBody className='delete_modal_body'>
                    <p> Are you sure you want to delete this record ?</p>
                    <div className='btn-div-modal-group delete_modal_Btns'>
                        <button onClick={() => deleteEntry()} className='delete_modal_yes_Btn'>Yes, Approve</button>
                        <button className='btn btn-primary delete_modal_cancel_Btn' color="secondary" onClick={() => setModal(false)}>Cancel</button>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    )
}
