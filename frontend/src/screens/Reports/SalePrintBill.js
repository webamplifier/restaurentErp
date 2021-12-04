import React from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { url } from 'src/helpers/helpers';
import { userContext } from '../../context/UserContext'

export default function SalePrintBill() {
    const [restaurent,setRestaurent] = React.useState({});
    const [header,setHeader] = React.useState({});
    const [item,setItem] = React.useState([]);

    const { id } = useParams();
    const { user } = React.useContext(userContext)
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(url + 'fetchSalesDetail/' + id, {
                headers: {
                    'Authorization': user?.token
                }
            });

            if (response.ok == true) {
                const data = await response.json();

                if (data.status == 200) {
                    console.log(data)
                    // setRecieptData(data.recieptData)
                    setRestaurent(data?.restaurent_detail);
                    setItem(data?.sale_items)
                    setHeader(data?.sale_header);

                } else {
                    toast.error(data.message)
                }
            }
        }

        fetchData().catch(err => toast.error("Internal server error!"))
    }, [])

    const onPrint = async (data) => {
        var html = `
            <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            .bill-main{
                width: 350px;
                padding: 15px 15px;
            }
            
            .DFlex{
                display: flex;
            }
            
            .bill-main p{
                color: darkslategrey;
                font-family: sans-serif;
                font-size: 14px;
                margin-bottom: 8px;
            }
            
            .bill-main .bill-title{
                text-align: center;
                margin-bottom: 50px;
            }
            
            .AlignItemsEnd{
                align-items: flex-end;
            }
            
            .upper-section-first-div{
                flex-basis: 60%;
            }
            
            .bill-mid-section{
                min-height: 105px;
                border-bottom: 1.6px dashed darkslategrey;
            }
            
            .bill-mid-section table{
                width: 100%;
                border-collapse: collapse;
            }
            
            .textRight{
                text-align: right;
            }
            
            .table-head{
                border: 1.6px dashed darkslategrey;
                padding: 8px;
            }
            
            .bill-mid-section tr td:first-child{
                width: 200px;
                padding-left: 8px;
            }
            
            .bill-mid-section tr td:last-child{
                padding-right: 8px;
            }
            
            .bill-lower-section{
                margin-top: 8px;
            }
            
            .bill-lower-section .right-section{
                flex-basis: 80%;
            }
            </style>
            `;

        html = html + document.getElementById("print_reciept").innerHTML;

        var myWindow = window.open('', 'Receipt');
        myWindow.document.write('<html><head><title>Receipt</title>');
        myWindow.document.write("</head><body>");
        myWindow.document.write(html);
        myWindow.document.write('</body></html>');
        myWindow.document.close();

        myWindow.onload = function () {
            myWindow.focus();
            myWindow.print();
        }

    }
    return (
        <div>
            <ToastContainer />
            <button className="btn btn-primary" onClick={() => onPrint()}>Print</button>
            <div id="print_reciept">
                <div class="bill-main">
                    <p class="bill-title">{restaurent?.name}</p>
                    <p style={{ margin: 0, padding: 0, textAlign: 'center' }}>
                        {restaurent?.address}
                    </p>
                    <p style={{ margin: 0, padding: 0, textAlign: 'center' }}>
                        Mobile : {restaurent?.mobile}
                        {restaurent?.food_license_number && <span style={{textTransform : 'uppercase'}}>&nbsp; FSSAI : {restaurent?.food_license_number}</span>}
                        {restaurent?.gst_number && <span style={{textTransform : 'uppercase'}}>&nbsp; GST  {restaurent?.gst_number}</span>}
                        
                    </p>


                    <div class="bill-upper-section">
                        <div class="DFlex AlignItemsEnd">
                            <div class="upper-section-first-div">
                                <div class="DFlex">
                                    <p>invoice number:&nbsp;&nbsp;</p>
                                    <p>{header?.invoice_number}</p>
                                </div>
                                <div class="DFlex">
                                    <p>Date:&nbsp;&nbsp;</p>
                                    <p>{header?.sale_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bill-mid-section">
                        <table>
                            <thead>
                                <tr class="table-head">
                                    <td><p>Product</p></td>
                                    <td><p style={{ textAlign: 'left' }}>price</p></td>
                                    <td><p class="textRight">qty</p></td>
                                    <td><p class="textRight">total</p></td>
                                </tr>
                            </thead>

                            <tbody>
                                {item?.map((item, index) => (
                                    <tr>
                                        <td><p>{item.product_name}</p></td>
                                        <td><p style={{ textAlign: 'left' }}>{item.mrp}</p></td>
                                        <td><p class="textRight">{item.qty}</p></td>
                                        <td><p class="textRight">{item.total}</p></td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>

                    <div class="bill-lower-section">
                        <div class="DFlex">
                            <p class="right-section">Order Value</p>
                            <p>{header?.total_supply}</p>
                        </div>
                        <div class="DFlex">
                            <p class="right-section">discount(%)</p>
                            <p>{header?.bill_discount_percentage}</p>
                        </div>
                        {header?.taxable_amount && <div class="DFlex">
                            <p class="right-section">total tax</p>
                            <p>{header?.taxable_amount}</p>
                        </div>}
                        <div class="DFlex">
                            <p class="right-section">Total Amount</p>
                            <p>{header?.total_after_roundoff}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
