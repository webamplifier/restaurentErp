(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[33],{628:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(623),c=(n(1),n(11));function a(e){var t=e.modal,n=e.setModal,a=e.deleteEntry;return Object(c.jsx)("div",{className:"delete_modal_box",children:Object(c.jsxs)(r.eb,{show:t,onClose:n,children:[Object(c.jsx)(r.hb,{closeButton:!0}),Object(c.jsxs)(r.fb,{className:"delete_modal_body",children:[Object(c.jsx)("p",{children:" Are you sure you want to delete this record ?"}),Object(c.jsxs)("div",{className:"btn-div-modal-group delete_modal_Btns",children:[Object(c.jsx)("button",{onClick:function(){return a()},className:"delete_modal_yes_Btn",children:"Yes, Approve"}),Object(c.jsx)("button",{className:"btn btn-primary delete_modal_cancel_Btn",color:"secondary",onClick:function(){return n(!1)},children:"Cancel"})]})]})]})})}},726:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var r=n(63),c=n.n(r),a=n(112),s=n(48),o=n(623),i=n(1),u=n.n(i),d=n(163),l=n(113),p=n(626),j=n(83),b=n(628),f=n(11),h=function(e){switch(e){case"1":return"success";case"2":return"secondary";default:return"primary"}};function m(){var e=u.a.useContext(j.b),t=e.user,n=e.setLoad,r=u.a.useState([]),i=Object(s.a)(r,2),m=i[0],x=i[1],_=u.a.useState(null),O=Object(s.a)(_,2),y=O[0],v=O[1],k=u.a.useState(!1),g=Object(s.a)(k,2),w=g[0],C=g[1];u.a.useEffect((function(){function e(){return(e=Object(a.a)(c.a.mark((function e(){var r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.d+"productlist",{method:"GET",headers:{Authorization:null===t||void 0===t?void 0:t.token}});case 2:if(!0!==(r=e.sent).ok){e.next=8;break}return e.next=6,r.json();case 6:200===(a=e.sent).status&&(n(!1),x(a.product_list.map((function(e,t){return{"#":t+1,product_name:e.product_name,product_category:e.category_name,type:e.type,product_id:e.id,price:e.price}}))));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(!0),function(){e.apply(this,arguments)}()}),[]);return Object(f.jsxs)("section",{children:[Object(f.jsx)(p.a,{}),Object(f.jsx)(b.a,{modal:w,setModal:C,deleteEntry:function(){function e(){return(e=Object(a.a)(c.a.mark((function e(){var r,s,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.d+"deleteproduct/"+y,{method:"GET",headers:{Authorization:null===t||void 0===t?void 0:t.token}});case 2:return r=e.sent,e.next=5,r.json();case 5:200===(s=e.sent).status?(o=function(){var e=Object(a.a)(c.a.mark((function e(){var r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l.d+"productlist",{method:"GET",headers:{Authorization:null===t||void 0===t?void 0:t.token}});case 2:if(!0!==(r=e.sent).ok){e.next=8;break}return e.next=6,r.json();case 6:200===(a=e.sent).status&&(n(!1),x(a.product_list.map((function(e,t){return{"#":t+1,product_name:e.product_name,product_category:e.category_name,type:e.type,product_id:e.id}}))));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C(!1),v(""),o()):(n(!1),p.b.error(s.message));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(!0),function(){e.apply(this,arguments)}()}}),Object(f.jsx)(d.b,{to:"/create/products",children:"Create Product"}),Object(f.jsx)(o.u,{xs:"12",lg:"12",children:Object(f.jsx)(o.j,{children:Object(f.jsx)(o.k,{children:Object(f.jsx)(o.y,{items:m,fields:["#","product_name","product_category","type","price","action"],columnFilter:!0,tableFilter:!0,itemsPerPageSelect:!0,itemsPerPage:5,hover:!0,sorter:!0,pagination:!0,scopedSlots:{status:function(e){return Object(f.jsx)("td",{children:Object(f.jsx)(o.b,{color:h(e.status_id),children:1===e.status_id?"Active":"Inactive"})})},action:function(e){return Object(f.jsxs)("td",{children:[Object(f.jsx)(d.b,{to:"/edit/products/".concat(e.product_id),children:Object(f.jsx)("i",{class:"fa fa-pencil","aria-hidden":"true"})}),Object(f.jsx)("i",{style:{cursor:"pointer"},onClick:function(){return t=e.product_id,v(t),void C(!0);var t},class:"fa fa-trash","aria-hidden":"true"})]})}}})})})})]})}}}]);
//# sourceMappingURL=33.aa951fad.chunk.js.map