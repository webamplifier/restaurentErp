(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[13],{628:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(623),r=(n(1),n(11));function s(e){var t=e.modal,n=e.setModal,s=e.deleteEntry;return Object(r.jsx)("div",{className:"delete_modal_box",children:Object(r.jsxs)(a.eb,{show:t,onClose:n,children:[Object(r.jsx)(a.hb,{closeButton:!0}),Object(r.jsxs)(a.fb,{className:"delete_modal_body",children:[Object(r.jsx)("p",{children:" Are you sure you want to delete this record ?"}),Object(r.jsxs)("div",{className:"btn-div-modal-group delete_modal_Btns",children:[Object(r.jsx)("button",{onClick:function(){return s()},className:"delete_modal_yes_Btn",children:"Yes, Approve"}),Object(r.jsx)("button",{className:"btn btn-primary delete_modal_cancel_Btn",color:"secondary",onClick:function(){return n(!1)},children:"Cancel"})]})]})]})})}},634:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(623),r=(n(1),n(11));function s(e){var t=e.paymodal,n=e.setPayModal,s=e.payBill,c=e.payAmount,o=e.setPayAmount,i=e.paymentMode,u=e.setPaymentMode;return Object(r.jsx)("div",{className:"delete_modal_box",children:Object(r.jsxs)(a.eb,{show:t,onClose:n,children:[Object(r.jsx)(a.hb,{closeButton:!0,children:"Pay Bill"}),Object(r.jsxs)(a.fb,{className:"delete_modal_body",children:[Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("div",{className:"col-6",children:Object(r.jsxs)("div",{className:"form-group",children:[Object(r.jsx)("label",{htmlFor:"",children:"Paid Amount"}),Object(r.jsx)("input",{type:"text",value:c,onChange:function(e){return o(e.target.value)},className:"form-control"})]})}),Object(r.jsx)("div",{className:"col-6",children:Object(r.jsxs)("div",{className:"form-group",children:[Object(r.jsx)("label",{htmlFor:"",children:"Payment Method"}),Object(r.jsxs)("select",{className:"form-control",value:i,onChange:function(e){return u(e.target.value)},children:[Object(r.jsx)("option",{value:""}),Object(r.jsx)("option",{value:"cash",children:"Cash"}),Object(r.jsx)("option",{value:"bank",children:"Bank"})]})]})})]}),Object(r.jsx)("button",{type:"submit",onClick:function(){return s()},className:"col-12 btn btn-secondary mb-5",children:"Submit"})]})]})})}},740:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var a=n(63),r=n.n(a),s=n(112),c=n(48),o=n(623),i=n(1),u=n.n(i),d=n(163),l=n(113),j=n(626),b=n(83),h=n(628),m=n(634),f=n(11),p=function(e){switch(e){case 2:return"success";case 1:return"dark";default:return"primary"}};function x(){var e=u.a.useContext(b.b),t=e.user,n=e.setLoad,a=u.a.useState([]),i=Object(c.a)(a,2),x=i[0],O=i[1],v=u.a.useState(!1),y=Object(c.a)(v,2),_=y[0],k=y[1],g=u.a.useState(!1),w=Object(c.a)(g,2),P=w[0],N=w[1],A=u.a.useState(""),C=Object(c.a)(A,2),M=C[0],S=C[1],B=u.a.useState(""),E=Object(c.a)(B,2),z=E[0],F=E[1],T=u.a.useState(""),G=Object(c.a)(T,2),J=G[0],D=G[1];return u.a.useEffect((function(){function e(){return(e=Object(s.a)(r.a.mark((function e(){var a,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.d+"estimation-list",{method:"GET",headers:{Authorization:null===t||void 0===t?void 0:t.token}});case 2:if(!0!==(a=e.sent).ok){e.next=9;break}return e.next=6,a.json();case 6:s=e.sent,n(!1),200===s.status?O(s.sales_data):j.b.error(s.message);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(!0),function(){e.apply(this,arguments)}()}),[]),Object(f.jsxs)("section",{children:[Object(f.jsx)(j.a,{}),Object(f.jsx)(h.a,{modal:_,setModal:k,deleteEntry:function(){function e(){return(e=Object(s.a)(r.a.mark((function e(){var a,c,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.d+"delete/estimation/"+J,{method:"GET",headers:{Authorization:null===t||void 0===t?void 0:t.token}});case 2:return a=e.sent,e.next=5,a.json();case 5:c=e.sent,n(!1),200===c.status?(o=function(){var e=Object(s.a)(r.a.mark((function e(){var a,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.d+"estimation-list",{method:"GET",headers:{Authorization:null===t||void 0===t?void 0:t.token}});case 2:if(!0!==(a=e.sent).ok){e.next=9;break}return e.next=6,a.json();case 6:s=e.sent,n(!1),200===s.status?O(s.sales_data):j.b.error(s.message);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k(!1),D(""),o()):j.b.error(c.message);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(!0),function(){e.apply(this,arguments)}()}}),Object(f.jsx)(m.a,{paymodal:P,setPayModal:N,payAmount:M,setPayAmount:S,paymentMode:z,payBill:function(){function e(){return(e=Object(s.a)(r.a.mark((function e(){var a,c,o,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).append("pay_amount",M),a.append("payment_mode",z),e.next=5,fetch(l.d+"pay/purchase/"+J,{method:"POST",headers:{Authorization:t.token},body:a});case 5:if(1!=(c=e.sent).ok){e.next=11;break}return e.next=9,c.json();case 9:200==(o=e.sent).status?(i=function(){var e=Object(s.a)(r.a.mark((function e(){var a,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.d+"purchase/report",{method:"GET",headers:{Authorization:null===t||void 0===t?void 0:t.token}});case 2:if(!0!==(a=e.sent).ok){e.next=9;break}return e.next=6,a.json();case 6:s=e.sent,n(!1),200===s.status?O(s.purchase_data):j.b.error(s.message);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N(!1),D(""),i()):j.b.error(o.message);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(!0),function(){e.apply(this,arguments)}()},setPaymentMode:F}),Object(f.jsx)(o.u,{xs:"12",lg:"12",children:Object(f.jsx)(o.j,{children:Object(f.jsx)(o.k,{children:Object(f.jsx)(o.y,{items:x,fields:["#","client_name","estimation_number","estimation_date","action"],columnFilter:!0,tableFilter:!0,itemsPerPageSelect:!0,itemsPerPage:5,hover:!0,sorter:!0,pagination:!0,scopedSlots:{"#":function(e,t){return Object(f.jsx)("td",{children:t+1})},purchase_date:function(e,t){return Object(f.jsx)("td",{children:e.purchase_date.split(" ")[0]})},billing_date:function(e,t){return Object(f.jsx)("td",{children:e.billing_date.split(" ")[0]})},"Payment Method":function(e){return Object(f.jsx)("td",{children:e.payment_type})},"Paid Amount":function(e){return Object(f.jsx)("td",{children:e.amount_paid})},Amount:function(e){return Object(f.jsx)("td",{children:null===e||void 0===e?void 0:e.total_after_roundoff})},status:function(e){return Object(f.jsx)("td",{children:Object(f.jsx)(o.b,{color:p(e.status_id),children:1===e.status_id?"Un Paid":"Paid"})})},action:function(e){return Object(f.jsxs)("td",{children:[Object(f.jsx)(d.b,{to:"/edit/sales/".concat(e.id),children:Object(f.jsx)("i",{class:"fa fa-pencil","aria-hidden":"true"})}),Object(f.jsx)("i",{style:{cursor:"pointer"},onClick:function(){return t=e.id,D(t),void k(!0);var t},class:"fa fa-trash","aria-hidden":"true"}),Object(f.jsx)(d.b,{to:"/create/jobcard/".concat(e.id),children:Object(f.jsx)("i",{class:"fa fa-arrow-right","aria-hidden":"true"})}),Object(f.jsx)("a",{href:"".concat(l.c,"print-estimation/").concat(e.id),target:"_blank",children:Object(f.jsx)("i",{class:"fa fa-print","aria-hidden":"true"})})]})}}})})})})]})}}}]);
//# sourceMappingURL=13.97094c60.chunk.js.map