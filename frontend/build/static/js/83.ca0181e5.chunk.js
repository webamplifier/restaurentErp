(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[83],{720:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var a=n(63),r=n.n(a),s=n(112),c=n(48),i=n(623),o=n(1),u=n.n(o),d=n(163),l=n(113),j=n(626),f=n(83),b=n(11),h=function(e){switch(e){case"1":return"success";case"2":return"secondary";default:return"primary"}};function p(){var e=u.a.useContext(f.b).user,t=u.a.useState([]),n=Object(c.a)(t,2),a=n[0],o=n[1];return u.a.useEffect((function(){function t(){return(t=Object(s.a)(r.a.mark((function t(){var n,a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(l.d+"companiesList",{method:"GET",headers:{Authorization:null===e||void 0===e?void 0:e.token}});case 2:if(!0!==(n=t.sent).ok){t.next=8;break}return t.next=6,n.json();case 6:200===(a=t.sent).status?(console.log(a.companies_data),o(a.companies_data)):j.b.error(a.message);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),Object(b.jsxs)("section",{children:[Object(b.jsx)(j.a,{}),Object(b.jsx)(d.b,{to:"/create/company",children:"Create Company"}),Object(b.jsx)(i.u,{xs:"12",lg:"12",children:Object(b.jsx)(i.j,{children:Object(b.jsx)(i.k,{children:Object(b.jsx)(i.y,{items:a,fields:["#","firm_name","email","mobile_number","status","action"],columnFilter:!0,tableFilter:!0,itemsPerPageSelect:!0,itemsPerPage:5,hover:!0,sorter:!0,pagination:!0,scopedSlots:{status:function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(i.b,{color:h(e.status_id),children:1===e.status_id?"Active":"Inactive"})})},action:function(e){return Object(b.jsxs)("td",{children:[Object(b.jsx)("i",{class:"fa fa-pencil","aria-hidden":"true"}),Object(b.jsx)("i",{class:"fa fa-trash","aria-hidden":"true"})]})}}})})})})]})}}}]);
//# sourceMappingURL=83.ca0181e5.chunk.js.map