import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React from 'react'


export default function PayModal(props) {
    const { paymodal, setPayModal, payBill, payAmount, setPayAmount, paymentMode, setPaymentMode } = props;

    return (
        <div className='delete_modal_box'>
            <CModal
                show={paymodal}
                onClose={setPayModal}
            >
                <CModalHeader closeButton>
                    Pay Bill
                </CModalHeader>
                <CModalBody className='delete_modal_body'>
                    <div className="row">

                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="">Paid Amount</label>
                                <input type="text" value={payAmount} onChange={e => setPayAmount(e.target.value)} className='form-control' />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="">Payment Method</label>
                                <select className='form-control' value={paymentMode} onChange={e => setPaymentMode(e.target.value)}>
                                    <option value=""></option>
                                    <option value="cash">Cash</option>
                                    <option value="bank">Bank</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <button type='submit' onClick={()=>payBill()} className='col-12 btn btn-secondary mb-5'>Submit</button>
                </CModalBody>
            </CModal>
        </div>
    )
}
