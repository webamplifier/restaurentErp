(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[19],{629:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var r=a(114);var s=a(165);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(s.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},630:function(e,t,a){"use strict";t.a=a.p+"static/media/add.b7874215.svg"},758:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return m}));var r=a(629),s=a(63),c=a.n(s),n=a(112),o=a(48),l=a(1),i=a.n(l),u=a(630),d=a(113),j=a(83),b=a(626),p=a(20),f=a(11);function m(){var e=Object(p.i)().id,t=i.a.useContext(j.b),a=t.user,s=t.setLoad,l=i.a.useState(""),m=Object(o.a)(l,2),h=m[0],O=(m[1],i.a.useState("")),x=Object(o.a)(O,2),v=x[0],y=x[1],g=i.a.useState(""),S=Object(o.a)(g,2),w=S[0],k=S[1],F=i.a.useState(""),C=Object(o.a)(F,2),N=(C[0],C[1],i.a.useState("")),_=Object(o.a)(N,2),T=(_[0],_[1],i.a.useState("None")),A=Object(o.a)(T,2),q=A[0],D=(A[1],i.a.useState(d.a[0])),I=Object(o.a)(D,2),z=(I[0],I[1]),E=i.a.useState(""),J=Object(o.a)(E,2),P=J[0],V=J[1],G=i.a.useState(""),M=Object(o.a)(G,2),Q=(M[0],M[1]),R=i.a.useState(0),U=Object(o.a)(R,2),L=U[0],B=U[1],H=i.a.useState(0),K=Object(o.a)(H,2),W=K[0],X=K[1],Y=i.a.useState(0),Z=Object(o.a)(Y,2),$=(Z[0],Z[1]),ee=i.a.useState("percent"),te=Object(o.a)(ee,2),ae=(te[0],te[1]),re=i.a.useState(0),se=Object(o.a)(re,2),ce=(se[0],se[1]),ne=i.a.useState(""),oe=Object(o.a)(ne,2),le=oe[0],ie=oe[1],ue=i.a.useState(""),de=Object(o.a)(ue,2),je=de[0],be=de[1],pe=i.a.useState([]),fe=Object(o.a)(pe,2),me=(fe[0],fe[1]),he=i.a.useState([]),Oe=Object(o.a)(he,2),xe=(Oe[0],Oe[1],i.a.useState([])),ve=Object(o.a)(xe,2),ye=(ve[0],ve[1],i.a.useState([])),ge=Object(o.a)(ye,2),Se=(ge[0],ge[1],i.a.useState([])),we=Object(o.a)(Se,2),ke=we[0],Fe=we[1],Ce=0,Ne=i.a.useState("percent"),_e=Object(o.a)(Ne,2),Te=_e[0],Ae=(_e[1],i.a.useState(0)),qe=Object(o.a)(Ae,2),De=qe[0],Ie=(qe[1],i.a.useState(0)),ze=Object(o.a)(Ie,2),Ee=ze[0],Je=(ze[1],i.a.useState("cash")),Pe=Object(o.a)(Je,2),Ve=Pe[0],Ge=(Pe[1],i.a.useState(0)),Me=Object(o.a)(Ge,2),Qe=Me[0],Re=Me[1],Ue=i.a.useState(0),Le=Object(o.a)(Ue,2),Be=Le[0],He=Le[1],Ke=i.a.useState(0),We=Object(o.a)(Ke,2),Xe=We[0],Ye=We[1],Ze=i.a.useState(""),$e=Object(o.a)(Ze,2),et=$e[0],tt=$e[1],at=0;i.a.useEffect((function(){function t(){return(t=Object(n.a)(c.a.mark((function t(){var r,n,o;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(d.d+"expense-detail/"+e,{method:"GET",headers:{Authorization:null===a||void 0===a?void 0:a.token}});case 2:if(!0!==(r=t.sent).ok){t.next=9;break}return t.next=6,r.json();case 6:n=t.sent,s(!1),200===n.status?(o=n.header,y(o.date),k(o.to),Re(o.total_value),be(o.remarks),Ce=o.round_off_total,Fe(n.items)):b.b.error(n.message);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function r(){return(r=Object(n.a)(c.a.mark((function e(){var t,r,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),e.next=3,fetch(d.d+"productlist",{method:"GET",headers:{Authorization:null===a||void 0===a?void 0:a.token}});case 3:if(!0!==(t=e.sent).ok){e.next=10;break}return e.next=7,t.json();case 7:r=e.sent,s(!1),200===r.status?me(null===r||void 0===r||null===(n=r.product_list)||void 0===n?void 0:n.map((function(e){return{value:e.id,label:e.product_name,type:e.type}}))):b.b.error(r.message);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}s(!0),function(){t.apply(this,arguments)}(),function(){r.apply(this,arguments)}()}),[]);L>0&&W>0&&(at=parseFloat(L)*parseFloat(W));Qe>0&&(Ce=Math.round(Qe));return Object(f.jsxs)("div",{className:"container full-size-create-page-main-section",children:[Object(f.jsx)(b.a,{}),Object(f.jsxs)("form",{children:[Object(f.jsxs)("div",{className:"p-sm-5 px-md-3 create-form-field create-purchase-page",children:[Object(f.jsxs)("div",{class:"py-4 px-2 form-row create-purchase-header",children:[Object(f.jsxs)("div",{class:"form-group col-md-4",children:[Object(f.jsxs)("label",{for:"date",children:["Date",Object(f.jsx)("span",{className:"required-label",children:"*"})]}),Object(f.jsx)("input",{value:v,onChange:function(e){return y(e.target.value)},type:"date",class:"form-control",id:"date",required:!0})]}),Object(f.jsxs)("div",{class:"form-group col-md-5",children:[Object(f.jsxs)("label",{for:"input-party",children:["To",Object(f.jsx)("span",{className:"required-label",children:"*"})]}),Object(f.jsx)("input",{className:"form-control",value:w,onChange:function(e){return k(e.target.value)}})]})]}),Object(f.jsxs)("div",{class:"my-4 form-row",children:[Object(f.jsxs)("div",{class:"form-group col-md-4",children:[Object(f.jsxs)("label",{for:"invoice-number",children:["Item",Object(f.jsx)("span",{className:"required-label",children:"*"})]}),Object(f.jsx)("input",{value:P,onChange:function(e){return V(e.target.value)},className:"form-control"})]}),Object(f.jsxs)("div",{class:"form-group col-md-4",children:[Object(f.jsx)("label",{for:"invoice-number",children:"Item Description"}),Object(f.jsx)("textarea",{value:le,onChange:function(e){return ie(e.target.value)},class:"form-control"})]}),Object(f.jsxs)("div",{class:"form-group col-md-4",children:[Object(f.jsxs)("label",{for:"invoice-number",children:["Cost/Unit",Object(f.jsx)("span",{className:"required-label",children:"*"})]}),Object(f.jsx)("input",{value:L,onChange:function(e){return B(e.target.value)},type:"text",class:"form-control",id:""})]}),Object(f.jsxs)("div",{class:"form-group col-md-4",children:[Object(f.jsxs)("label",{for:"invoice-number",children:["Quantity",Object(f.jsx)("span",{className:"required-label",children:"*"})]}),Object(f.jsx)("input",{value:W,onChange:function(e){return X(e.target.value)},type:"text",class:"form-control",id:""})]}),Object(f.jsxs)("div",{class:"form-group col-md-4 row",children:[Object(f.jsxs)("div",{class:"form-group col-9",children:[Object(f.jsxs)("label",{for:"invoice-number",children:["Total",Object(f.jsx)("span",{className:"required-label",children:"*"})]}),Object(f.jsx)("input",{value:at,readOnly:!0,type:"text",class:"form-control",id:""})]}),Object(f.jsx)("div",{class:"form-group col-3 p-0 purchase-create-mid-plus-img",children:Object(f.jsx)("img",{className:"img-fluid",onClick:function(){return function(){if(v&&w&&P&&L&&W){var e={item:P,description:le,cost_per_unit:L,qty:W,total:at};if(et){tt("");var t=[];ke.map((function(a,r){r==parseInt(et)-1?t.push(e):t.push(a)}));var a=0,s=0,c=0;t.map((function(e){a=parseFloat(a)+parseFloat(e.tax_amount_item),s=parseFloat(s)+parseFloat(e.total),c=parseFloat(c)+parseFloat(e.discount_amount)})),He(a),Re(s),Ye(c),Fe(t)}else{var n=[].concat(Object(r.a)(ke),[e]),o=0,l=0,i=0;n.map((function(e){o=parseFloat(o)+parseFloat(e.tax_amount_item),l=parseFloat(l)+parseFloat(e.total),i=parseFloat(i)+parseFloat(e.discount_amount)})),He(o),Ye(i),Re(l),Re(parseFloat(Qe)+parseFloat(at)),Fe(n)}V(""),B(0),Q(""),B(0),X(0),$(0),z(""),ae(""),ce(0),ie(""),at=0,0,0,0,0,0,0}else b.b.error("Fill all fields having *")}()},style:{cursor:"pointer"},src:u.a,alt:""})})]})]}),ke.length>0&&Object(f.jsx)("div",{className:"my-table-responsive",children:Object(f.jsxs)("table",{class:"table mt-4",children:[Object(f.jsx)("thead",{class:"thead-dark",children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{scope:"col",children:"Items"}),Object(f.jsx)("th",{scope:"col",children:"Description"}),Object(f.jsx)("th",{scope:"col",children:"Cost/Unit"}),Object(f.jsx)("th",{scope:"col",children:"Quantity"}),Object(f.jsx)("th",{scope:"col",children:"Total"}),Object(f.jsx)("th",{children:"Actions"})]})}),Object(f.jsx)("tbody",{className:"table-borderless",children:ke.map((function(e,t){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e.item}),Object(f.jsx)("td",{children:e.description}),Object(f.jsx)("td",{children:e.cost_per_unit}),Object(f.jsx)("td",{children:e.qty}),Object(f.jsx)("td",{children:e.total}),Object(f.jsxs)("td",{children:[Object(f.jsx)("i",{style:{cursor:"pointer"},onClick:function(){return function(e,t){tt(t),V(e.item),ie(e.description),B(e.cost_per_unit),X(e.qty),at=e.total}(e,t+1)},class:"fa fa-pencil","aria-hidden":"true"}),Object(f.jsx)("i",{onClick:function(){return function(e){var t=0,a=[];ke.map((function(t,r){r!=e&&a.push(t)})),a.map((function(e){t=parseFloat(t)+parseFloat(e.total)})),Re(t),Fe(a)}(t)},style:{cursor:"pointer"},class:"fa fa-trash","aria-hidden":"true"})]})]})}))})]})}),Object(f.jsxs)("div",{className:"row mt-5 justify-content-between purchase-create-footer",children:[Object(f.jsxs)("div",{class:"form-group col-md-5",children:[Object(f.jsx)("label",{for:"exampleFormControlTextarea1",children:"Remarks"}),Object(f.jsx)("textarea",{value:je,onChange:function(e){return be(e.target.value)},class:"form-control",id:"exampleFormControlTextarea1",rows:"5"})]}),Object(f.jsxs)("div",{className:"col-md-6",children:[Object(f.jsxs)("div",{class:"form-group row",children:[Object(f.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Total Value"}),Object(f.jsx)("div",{class:"col-md-8",children:Object(f.jsx)("input",{type:"text",value:Qe,readOnly:!0,class:"form-control",id:""})})]}),Object(f.jsxs)("div",{class:"form-group row",children:[Object(f.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Round Off Total"}),Object(f.jsx)("div",{class:"col-md-8",children:Object(f.jsx)("input",{readOnly:!0,value:Ce,type:"text",class:"form-control",id:""})})]})]})]})]}),Object(f.jsxs)("div",{class:"d-flex justify-content-center create-catagory-btns",children:[Object(f.jsxs)("button",{type:"button",onClick:function(){return window.location.reload()},class:"font-weight-bold m-3 py-2 px-4 btn btn-danger",children:["Cancel",Object(f.jsx)("i",{class:"px-2 fa fa-times","aria-hidden":"true"})]}),Object(f.jsxs)("button",{type:"button",onClick:function(){return function(){if(v&&w&&ke.length>0&&Qe){var t=function(){var t=Object(n.a)(c.a.mark((function t(){var r,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(d.d+"edit-expense/"+e,{method:"POST",headers:{Authorization:a.token},body:i});case 2:if(1!=(r=t.sent).ok){t.next=9;break}return t.next=6,r.json();case 6:n=t.sent,s(!1),200==n.status?window.location.reload():b.b.error(n.message);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();s(!0);var r={invoiceNo:h,purchaseDate:v,currentParty:w,discountType:q},o={totalValue:Qe,finalAmount:0,roundOffTotal:Ce,paidAmount:Ee,remainAmount:0,finalDiscountValue:De,finalDiscountCriteria:Te,remarks:je,paymentMethod:Ve,taxableAmount:Be,discountAmount:Xe},l=[];l.push(r),l.push(o);var i=new FormData;i.append("final_array",JSON.stringify(l)),i.append("allItems",JSON.stringify(ke)),t()}else b.b.error("Please fill the data with *")}()},class:"font-weight-bold m-3 py-2 px-4 btn btn-success",children:["Save",Object(f.jsx)("i",{class:"px-2 fa fa-floppy-o","aria-hidden":"true"})]})]})]})]})}}}]);
//# sourceMappingURL=19.0334310d.chunk.js.map