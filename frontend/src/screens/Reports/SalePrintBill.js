import React from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { url } from 'src/helpers/helpers';
import { userContext } from '../../context/UserContext'

export default function SalePrintBill() {
    const [restaurent, setRestaurent] = React.useState({});
    const [header, setHeader] = React.useState({});
    const [item, setItem] = React.useState([]);

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
                width: 330px;
                padding: 15px 15px;
            }
            
            .text-uppercase{
                text-transform: uppercase
            }
            
            .FB{
                font-weight: bold;
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
            
            .bill-title.address{
                width: 260px;
                margin: 0 auto;
            }
            
            .bill-main .bill-title{
                text-align: center;
                margin-bottom: 4px;
            }
            
            .AlignItemsEnd{
                align-items: flex-end;
            }
            
            .upper-section-first-div{
                flex-basis: 60%;
            }
            
            .bill-upper-section{
                margin: 12px 0;
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
                border: 1.6px solid darkslategrey;
                padding: 0 8px;
            }
            
            .table-head td p{
                margin: 4px 0;
            }
            
            .bill-mid-section tr td:first-child{
                padding-left: 8px;
            }
            
            .bill-mid-section tr td:nth-child(2){
                width: 170px;
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
            
            .thanks{
                text-align: center;
                margin: 10px 0;
            }</style>`;

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
                    <p class="bill-title">SALES INVOICE</p>
                    <p class="bill-title text-uppercase FB">{restaurent?.name}</p>
                    <p class="bill-title address">{restaurent?.address}</p>
                    {restaurent?.food_licesnse_number && <p class="bill-title">FSSAI: {restaurent?.food_licesnse_number}</p>}
                    {restaurent?.gst_number && <p class="bill-title">GST: {restaurent?.gst_number}</p>}
                    <p class="bill-title">Mobile: {restaurent?.mobile}</p>
                    <hr />

                    <div class="bill-upper-section">
                        <div class="DFlex">
                            <div class="upper-section-first-div">
                                <div class="DFlex">
                                    <p>Customer: &nbsp; &nbsp; </p>
                                    <p>{header?.customer_name}</p>
                                </div>
                                <div class="DFlex">
                                    <p>Bill No: &nbsp; &nbsp; </p>
                                    <p>{header?.invoice_number}</p>
                                </div>
                            </div>
                            <div>
                                <div class="DFlex">
                                    <p>Date: &nbsp; &nbsp; </p>
                                    <p>{header?.sale_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bill-mid-section">
                        <table>
                            <thead>
                                <tr class="table-head">
                                    <td><p>#</p></td>
                                    <td><p>Product</p></td>
                                    <td><p class="textRight">QTY</p></td>
                                    <td><p class="textRight">Rate</p></td>
                                    <td><p class="textRight">Total</p></td>
                                </tr>
                            </thead>

                            <tbody>
                                {item.map((item, index) => (
                                    <tr>
                                        <td><p>{index + 1}</p></td>
                                        <td><p>{item.product_name}</p></td>
                                        <td><p class="textRight">{item.qty}</p></td>
                                        <td><p class="textRight">{item.mrp}</p></td>
                                        <td><p class="textRight">{item.total}</p></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    <div class="bill-lower-section">
                        <div class="DFlex">
                            <p class="right-section FB">Order Value</p>
                            <p>{header?.total_supply}</p>
                        </div>
                        {header?.bill_discount_percentage && <div class="DFlex">
                            <p class="right-section">discount(%)</p>
                            <p>{header?.bill_discount_percentage}</p>
                        </div>}
                        {header?.taxable_amount && <div class="DFlex">
                            <p class="right-section">total tax</p>
                            <p>{header?.taxable_amount}</p>
                        </div>}
                        <div class="DFlex">
                            <p class="right-section">Grand Total</p>
                            <p>{header?.total_after_roundoff}</p>
                        </div>
                    </div>
                    <hr />
                    <h2 class="thanks">THANKS FOR VISITING</h2>

                </div>
            </div>
        </div>
    )
}
