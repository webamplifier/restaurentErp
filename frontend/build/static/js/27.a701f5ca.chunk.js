(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[27],{629:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));var a=c(114);var s=c(165);function r(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(s.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},630:function(e,t,c){"use strict";t.a=c.p+"static/media/add.b7874215.svg"},739:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return x}));var a=c(629),s=c(63),r=c.n(s),n=c(112),l=c(48),o=c(1),i=c.n(o),u=c(630),d=c(631),j=c(113),b=c(83),m=c(626),h=c(20),p=(c(377),c(11));function x(){var e=Object(h.g)(),t=i.a.useContext(b.b),c=t.user,s=t.setLoad,o=i.a.useState(""),x=Object(l.a)(o,2),f=x[0],O=x[1],v=i.a.useState(""),g=Object(l.a)(v,2),y=g[0],_=g[1],C=i.a.useState(""),k=Object(l.a)(C,2),N=k[0],S=k[1],w=i.a.useState([]),F=Object(l.a)(w,2),q=F[0],A=F[1],T=i.a.useState("None"),D=Object(l.a)(T,2),B=D[0],I=D[1],P=i.a.useState(j.a[0]),V=Object(l.a)(P,2),J=V[0],E=V[1],M=i.a.useState(""),z=Object(l.a)(M,2),R=z[0],Q=z[1],U=i.a.useState(0),G=Object(l.a)(U,2),L=G[0],H=G[1],K=i.a.useState(0),W=Object(l.a)(K,2),X=W[0],Y=W[1],Z=i.a.useState(0),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ce=i.a.useState("percent"),ae=Object(l.a)(ce,2),se=ae[0],re=ae[1],ne=i.a.useState(0),le=Object(l.a)(ne,2),oe=le[0],ie=le[1],ue=i.a.useState(""),de=Object(l.a)(ue,2),je=de[0],be=de[1],me=i.a.useState(""),he=Object(l.a)(me,2),pe=he[0],xe=he[1],fe=i.a.useState([]),Oe=Object(l.a)(fe,2),ve=Oe[0],ge=Oe[1],ye=i.a.useState([]),_e=Object(l.a)(ye,2),Ce=_e[0],ke=_e[1],Ne=i.a.useState([]),Se=Object(l.a)(Ne,2),we=Se[0],Fe=Se[1],qe=i.a.useState([]),Ae=Object(l.a)(qe,2),Te=Ae[0],De=Ae[1],Be=0,Ie=0,Pe=0,Ve=0,Je=0,Ee=i.a.useState(""),Me=Object(l.a)(Ee,2),ze=Me[0],Re=Me[1],Qe=i.a.useState("percent"),Ue=Object(l.a)(Qe,2),Ge=Ue[0],Le=Ue[1],He=i.a.useState(0),Ke=Object(l.a)(He,2),We=Ke[0],Xe=Ke[1],Ye=i.a.useState(0),Ze=Object(l.a)(Ye,2),$e=Ze[0],et=Ze[1],tt=i.a.useState("cash"),ct=Object(l.a)(tt,2),at=ct[0],st=ct[1],rt=i.a.useState(0),nt=Object(l.a)(rt,2),lt=nt[0],ot=nt[1],it=i.a.useState(0),ut=Object(l.a)(it,2),dt=ut[0],jt=ut[1],bt=i.a.useState(0),mt=Object(l.a)(bt,2),ht=mt[0],pt=mt[1],xt=i.a.useState(""),ft=Object(l.a)(xt,2),Ot=ft[0],vt=ft[1],gt=0,yt=0,_t=0,Ct=0,kt=0,Nt=0,St=0;i.a.useEffect((function(){function e(){return(e=Object(n.a)(r.a.mark((function e(){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(j.d+"fetch-needs-estimation",{method:"GET",headers:{Authorization:null===c||void 0===c?void 0:c.token}});case 2:if(!0!==(t=e.sent).ok){e.next=9;break}return e.next=6,t.json();case 6:a=e.sent,s(!1),200===a.status?(console.log(a),De(null===a||void 0===a?void 0:a.all_vehicles.map((function(e){return{value:e.id,label:e.car_name,client_id:e.client_id}}))),ge(a.product_inventory_based.map((function(e){return{value:e.id,label:e.total_qty?"".concat(null===e||void 0===e?void 0:e.product_name," (").concat(null===e||void 0===e?void 0:e.total_qty,")"):e.product_name,inventory_id:null===e||void 0===e?void 0:e.inventory_id,product_name:e.product_name,category_name:e.category_name,price:null===e||void 0===e?void 0:e.price}}))),O(a.new_invoice),ke(null===a||void 0===a?void 0:a.all_customers.map((function(e){return{value:e.id,label:e.mobile+" - "+e.name}})))):m.b.error(a.message);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}s(!0),function(){e.apply(this,arguments)}()}),[]);L>0&&X>0&&J&&(yt=parseFloat(L)*parseFloat(X),Ct=yt/100*parseFloat(J),gt=_t=yt+Ct,"Item"!=B&&"Both"!=B||(kt=_t,"percent"==se&&(St=parseFloat(kt)/100*parseFloat(oe),gt=Nt=kt-St),"amount"==se&&(St=parseFloat(oe),gt=Nt=kt-St)));lt>0&&("Bill"==B||"Both"==B?("percent"==Ge&&(Ve=lt/100*parseFloat(We),lt,Je=lt-Ve),"amount"==Ge&&(Ve=parseFloat(We),lt,Je=lt-Ve),Be=Je,Ie=Math.round(Je),Pe=Ie-parseFloat($e)):(Be=lt,Ie=Math.round(Be),Pe=Ie-parseFloat($e)));return Object(p.jsxs)("div",{className:"container full-size-create-page-main-section",children:[Object(p.jsx)(m.a,{}),Object(p.jsxs)("form",{children:[Object(p.jsxs)("div",{className:"p-sm-5 px-md-3 create-form-field create-purchase-page",children:[Object(p.jsxs)("div",{class:"py-4 px-2 form-row create-purchase-header",children:[Object(p.jsxs)("div",{class:"form-group col-md-3",children:[Object(p.jsxs)("label",{for:"invoice-number",children:["Estimation No.",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)("input",{value:f,onChange:function(e){return O(e.target.value)},type:"text",class:"form-control",id:"invoice-number",required:!0})]}),Object(p.jsxs)("div",{class:"form-group col-md-3",children:[Object(p.jsxs)("label",{for:"date",children:["Date",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)("input",{value:y,onChange:function(e){return _(e.target.value)},type:"date",class:"form-control",id:"date",required:!0})]}),Object(p.jsxs)("div",{class:"form-group col-md-6",children:[Object(p.jsxs)("label",{for:"input-party",children:["Client",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)(d.a,{options:Ce,value:N,onChange:function(e){S(e);var t=[];Te.map((function(c){c.client_id==e.value&&t.push(c)})),A(t)}})]}),Object(p.jsxs)("div",{class:"form-group col-md-6",children:[Object(p.jsxs)("label",{for:"input-party",children:["Vehicle",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)(d.a,{options:q,value:ze,onChange:Re})]}),Object(p.jsxs)("div",{class:"form-group my-md-3 col-md-4",children:[Object(p.jsx)("div",{className:"text-center mb-2 font-weight-bold",children:Object(p.jsxs)("label",{for:"input-party",children:["Discount Type",Object(p.jsx)("span",{className:"required-label",children:"*"})]})}),Object(p.jsxs)("div",{className:"row px-3",children:[Object(p.jsxs)("div",{class:"form-check col-sm-3",children:[Object(p.jsx)("input",{checked:"None"==B&&!0,onClick:function(){return I("None")},class:"form-check-input",name:"discount",type:"radio",value:"",id:"defaultCheck1"}),Object(p.jsx)("label",{class:"form-check-label",for:"defaultCheck1",children:"None"})]}),Object(p.jsxs)("div",{class:"form-check col-sm-3",children:[Object(p.jsx)("input",{onClick:function(){return I("Item")},class:"form-check-input",name:"discount",type:"radio",value:"",id:"defaultCheck2"}),Object(p.jsx)("label",{class:"form-check-label",for:"defaultCheck2",children:"Item"})]}),Object(p.jsxs)("div",{class:"form-check col-sm-3",children:[Object(p.jsx)("input",{onClick:function(){return I("Bill")},class:"form-check-input",name:"discount",type:"radio",value:"",id:"defaultCheck3"}),Object(p.jsx)("label",{class:"form-check-label",for:"defaultCheck3",children:"Bill"})]}),Object(p.jsxs)("div",{class:"form-check col-sm-3",children:[Object(p.jsx)("input",{onClick:function(){return I("Both")},class:"form-check-input",name:"discount",type:"radio",value:"",id:"defaultCheck3"}),Object(p.jsx)("label",{class:"form-check-label",for:"defaultCheck3",children:"Both"})]})]})]})]}),Object(p.jsxs)("div",{class:"my-4 form-row",children:[Object(p.jsxs)("div",{class:"form-group col-md-4",children:[Object(p.jsxs)("label",{for:"invoice-number",children:["Item",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)(d.a,{options:ve,value:R,onChange:function(e){Q(e),H(null===e||void 0===e?void 0:e.price),vt(""),JSON.parse(e.add_ons)}})]}),Object(p.jsxs)("div",{class:"form-group col-md-4",children:[Object(p.jsx)("label",{for:"invoice-number",children:"Item Description"}),Object(p.jsx)("textarea",{value:je,onChange:function(e){return be(e.target.value)},class:"form-control"})]}),Object(p.jsxs)("div",{class:"form-group col-md-4",children:[Object(p.jsxs)("label",{for:"invoice-number",children:["Cost/Unit",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)("input",{value:L,onChange:function(e){return H(e.target.value)},type:"text",class:"form-control",id:""})]}),Object(p.jsxs)("div",{class:"form-group col-md-4",children:[Object(p.jsxs)("label",{for:"invoice-number",children:["Quantity",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)("input",{value:X,onChange:function(e){return Y(e.target.value)},type:"text",class:"form-control",id:""})]}),Object(p.jsxs)("div",{class:"form-group col-md-4",children:[Object(p.jsxs)("label",{for:"invoice-number",children:["Free",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)("input",{value:ee,onChange:function(e){return te(e.target.value)},type:"text",class:"form-control",id:""})]}),Object(p.jsxs)("div",{class:"form-group col-md-4",children:[Object(p.jsxs)("label",{for:"invoice-number",children:["Tax%",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)("select",{className:"form-control",placeholder:"Select tax value",value:J,onChange:function(e){return E(e.target.value)},children:j.a.map((function(e){return Object(p.jsx)("option",{value:e,children:e})}))})]}),"Item"==B&&Object(p.jsxs)("div",{className:"form-group col-md-4",children:[Object(p.jsx)("label",{htmlFor:"",children:"Discount"}),Object(p.jsxs)("div",{className:"m-0 p-0 col-12 row",children:[Object(p.jsx)("div",{className:"px-0 col-5",children:Object(p.jsx)("input",{value:oe,onChange:function(e){return ie(e.target.value)},class:"form-control",type:"text",name:"",id:""})}),Object(p.jsx)("div",{className:"p-0 col-7",children:Object(p.jsxs)("select",{value:se,onChange:function(e){return re(e.target.value)},class:"form-control",required:!0,children:[Object(p.jsx)("option",{value:"",children:"Select Type"}),Object(p.jsx)("option",{value:"percent",children:"Percent"}),Object(p.jsx)("option",{value:"amount",children:"Amount"})]})})]})]}),"Both"==B&&Object(p.jsxs)("div",{className:"form-group col-md-4",children:[Object(p.jsx)("label",{htmlFor:"",children:"Discount"}),Object(p.jsxs)("div",{className:"m-0 p-0 col-12 row",children:[Object(p.jsx)("div",{className:"px-0 col-5",children:Object(p.jsx)("input",{value:oe,onChange:function(e){return ie(e.target.value)},class:"form-control",type:"text",name:"",id:""})}),Object(p.jsx)("div",{className:"p-0 col-7",children:Object(p.jsxs)("select",{value:se,onChange:function(e){return re(e.target.value)},class:"form-control",required:!0,children:[Object(p.jsx)("option",{value:"",children:"Select Type"}),Object(p.jsx)("option",{value:"percent",children:"Percent"}),Object(p.jsx)("option",{value:"amount",children:"Amount"})]})})]})]}),Object(p.jsxs)("div",{class:"form-group col-md-4 row",children:[Object(p.jsxs)("div",{class:"form-group col-9",children:[Object(p.jsxs)("label",{for:"invoice-number",children:["Total",Object(p.jsx)("span",{className:"required-label",children:"*"})]}),Object(p.jsx)("input",{value:gt,readOnly:!0,type:"text",class:"form-control",id:""})]}),Object(p.jsx)("div",{class:"form-group col-3 p-0 purchase-create-mid-plus-img",children:Object(p.jsx)("img",{className:"img-fluid",onClick:function(){return function(){if(f&&y&&N&&B&&R&&L&&X&&J){var e={item:R,description:je,cost_per_unit:L,qty:X,free:ee,tax:J,discount_type:se,discountValue:oe,total:gt,amount_before_tax_item:yt,tax_amount_item:Ct,amount_after_tax_item:_t,amount_before_discount:kt,discount_amount:St,amount_after_discount:Nt};if(Ot){vt("");var t=[];we.map((function(c,a){a==parseInt(Ot)-1?t.push(e):t.push(c)}));var c=0,s=0,r=0;t.map((function(e){c=parseFloat(c)+parseFloat(e.tax_amount_item),s=parseFloat(s)+parseFloat(e.total),r=parseFloat(r)+parseFloat(e.discount_amount)})),jt(c),ot(s),pt(r),Fe(t)}else{var n=[].concat(Object(a.a)(we),[e]),l=0,o=0,i=0;n.map((function(e){l=parseFloat(l)+parseFloat(e.tax_amount_item),o=parseFloat(o)+parseFloat(e.total),i=parseFloat(i)+parseFloat(e.discount_amount)})),jt(l),pt(i),ot(o),ot(parseFloat(lt)+parseFloat(gt)),Fe(n)}Q(""),H(0),H(0),Y(0),te(0),E(""),re(""),ie(0),be(""),gt=0,yt=0,_t=0,Ct=0,kt=0,Nt=0,St=0}else m.b.error("Fill all fields having *")}()},style:{cursor:"pointer"},src:u.a,alt:""})})]})]}),we.length>0&&Object(p.jsx)("div",{className:"my-table-responsive",children:Object(p.jsxs)("table",{class:"table mt-4",children:[Object(p.jsx)("thead",{class:"thead-dark",children:Object(p.jsxs)("tr",{children:[Object(p.jsx)("th",{scope:"col",children:"Items"}),Object(p.jsx)("th",{scope:"col",children:"Description"}),Object(p.jsx)("th",{scope:"col",children:"Cost/Unit"}),Object(p.jsx)("th",{scope:"col",children:"Quantity"}),Object(p.jsx)("th",{scope:"col",children:"Free"}),Object(p.jsx)("th",{scope:"col",children:"Tax%"}),Object(p.jsx)("th",{children:"Discount"}),Object(p.jsx)("th",{scope:"col",children:"Total"}),Object(p.jsx)("th",{children:"Actions"})]})}),Object(p.jsx)("tbody",{className:"table-borderless",children:we.map((function(e,t){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:e.item.product_name}),Object(p.jsx)("td",{children:e.description}),Object(p.jsx)("td",{children:e.cost_per_unit}),Object(p.jsx)("td",{children:e.qty}),Object(p.jsx)("td",{children:e.free}),Object(p.jsx)("td",{children:e.tax}),Object(p.jsxs)("td",{children:[e.discountValue," ",e.discount_type]}),Object(p.jsx)("td",{children:e.total}),Object(p.jsxs)("td",{children:[Object(p.jsx)("i",{style:{cursor:"pointer"},onClick:function(){return function(e,t){console.log(e),vt(t),Q(e.item),be(e.description),H(e.cost_per_unit),Y(e.qty),te(e.free),E(e.tax),re(e.discount_type),ie(e.discountValue),gt=e.total}(e,t+1)},class:"fa fa-pencil","aria-hidden":"true"}),Object(p.jsx)("i",{onClick:function(){return function(e){var t=[];we.map((function(c,a){a!=e&&t.push(c)})),Fe(t)}(t)},style:{cursor:"pointer"},class:"fa fa-trash","aria-hidden":"true"})]})]})}))})]})}),Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{children:["taxabale amount:- ",dt&&dt]}),Object(p.jsxs)("div",{children:["discount amount:- ",ht&&ht]})]}),Object(p.jsxs)("div",{className:"row mt-5 justify-content-between purchase-create-footer",children:[Object(p.jsxs)("div",{class:"form-group col-md-5",children:[Object(p.jsx)("label",{for:"exampleFormControlTextarea1",children:"Remarks"}),Object(p.jsx)("textarea",{value:pe,onChange:function(e){return xe(e.target.value)},class:"form-control",id:"exampleFormControlTextarea1",rows:"5"})]}),Object(p.jsxs)("div",{className:"col-md-6",children:[Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Total Value"}),Object(p.jsx)("div",{class:"col-md-8",children:Object(p.jsx)("input",{type:"text",value:lt,readOnly:!0,class:"form-control",id:""})})]}),"Bill"==B&&Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Discount"}),Object(p.jsxs)("div",{class:"pr-0 col-md-8 row",children:[Object(p.jsx)("div",{className:"pr-0 col-5",children:Object(p.jsx)("input",{class:"form-control",value:We,onChange:function(e){return Xe(e.target.value)},type:"text",name:"",id:""})}),Object(p.jsx)("div",{className:"px-0 col-7",children:Object(p.jsxs)("select",{value:Ge,onChange:function(e){return Le(e.target.value)},class:"form-control",required:!0,children:[Object(p.jsx)("option",{value:"",children:"Select Type"}),Object(p.jsx)("option",{value:"percent",children:"Percent"}),Object(p.jsx)("option",{value:"amount",children:"Amount"})]})})]})]}),"Both"==B&&Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Discount"}),Object(p.jsxs)("div",{class:"pr-0 col-md-8 row",children:[Object(p.jsx)("div",{className:"pr-0 col-5",children:Object(p.jsx)("input",{class:"form-control",type:"text",value:We,onChange:function(e){return Xe(e.target.value)}})}),Object(p.jsx)("div",{className:"px-0 col-7",children:Object(p.jsxs)("select",{value:Ge,onChange:function(e){return Le(e.target.value)},class:"form-control",required:!0,children:[Object(p.jsx)("option",{value:"",children:"Select Type"}),Object(p.jsx)("option",{value:"percent",children:"Percent"}),Object(p.jsx)("option",{value:"amount",children:"Amount"})]})})]})]}),Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Final Amount"}),Object(p.jsx)("div",{class:"col-md-8",children:Object(p.jsx)("input",{readOnly:!0,value:Be,type:"text",class:"form-control",id:""})})]}),Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Round Off Total"}),Object(p.jsx)("div",{class:"col-md-8",children:Object(p.jsx)("input",{readOnly:!0,value:Ie,type:"text",class:"form-control",id:""})})]}),Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Paid Amount"}),Object(p.jsx)("div",{class:"col-md-8",children:Object(p.jsx)("input",{value:$e,onChange:function(e){return et(e.target.value)},type:"text",class:"form-control",id:""})})]}),$e>0&&Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Payment Method"}),Object(p.jsx)("div",{class:"col-md-8",children:Object(p.jsxs)("select",{value:at,onChange:function(e){return st(e.target.value)},id:"input-party",class:"form-control",required:!0,children:[Object(p.jsx)("option",{value:"",children:"Select payment mode"}),Object(p.jsx)("option",{value:"cash",children:"Cash"}),Object(p.jsx)("option",{value:"bank",children:"Bank"})]})})]}),Object(p.jsxs)("div",{class:"form-group row",children:[Object(p.jsx)("label",{for:"",class:"col-md-4 col-form-label",children:"Remain Amount"}),Object(p.jsx)("div",{class:"col-md-8",children:Object(p.jsx)("input",{type:"text",value:Pe,readOnly:!0,class:"form-control",id:""})})]})]})]})]}),Object(p.jsxs)("div",{class:"d-flex justify-content-center create-catagory-btns",children:[Object(p.jsxs)("button",{type:"button",onClick:function(){return window.location.reload()},class:"font-weight-bold m-3 py-2 px-4 btn btn-danger",children:["Cancel",Object(p.jsx)("i",{class:"px-2 fa fa-times","aria-hidden":"true"})]}),Object(p.jsxs)("button",{type:"button",onClick:function(){return function(){if(f&&y&&N&&we.length>0&&lt){var t=function(){var t=Object(n.a)(r.a.mark((function t(){var a,n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(j.d+"create-estimation",{method:"POST",headers:{Authorization:c.token},body:i});case 2:if(1!=(a=t.sent).ok){t.next=9;break}return t.next=6,a.json();case 6:n=t.sent,s(!1),200==n.status?e.push("/#/create/purchase"):m.b.error(n.message);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();s(!0);var a={invoiceNo:f,purchaseDate:y,currentParty:N,currentVehilce:ze,discountType:B},l={totalValue:lt,finalAmount:Be,roundOffTotal:Ie,paidAmount:$e,remainAmount:Pe,finalDiscountValue:We,finalDiscountCriteria:Ge,remarks:pe,paymentMethod:at,taxableAmount:dt,discountAmount:ht},o=[];o.push(a),o.push(l);var i=new FormData;i.append("final_array",JSON.stringify(o)),i.append("allItems",JSON.stringify(we)),t()}else m.b.error("Please fill the data with *")}()},class:"font-weight-bold m-3 py-2 px-4 btn btn-success",children:["Save",Object(p.jsx)("i",{class:"px-2 fa fa-floppy-o","aria-hidden":"true"})]})]})]})]})}}}]);
//# sourceMappingURL=27.a701f5ca.chunk.js.map