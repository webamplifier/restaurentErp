(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[87],{681:function(e,t,c){"use strict";c.r(t);var s=c(63),n=c.n(s),a=c(112),r=c(48),i=c(1),l=c.n(i),o=c(163),j=c(623),d=c(627),u=c(113),b=c(83),x=c(626),m=c(11);t.default=function(){var e=l.a.useState(""),t=Object(r.a)(e,2),c=t[0],s=t[1],i=l.a.useState(""),h=Object(r.a)(i,2),p=h[0],O=h[1],f=l.a.useContext(b.b),w=f.setUser,g=f.setLoad;return Object(m.jsxs)("div",{className:"c-app c-default-layout flex-row align-items-center",children:[Object(m.jsx)(x.a,{}),Object(m.jsx)(j.w,{children:Object(m.jsx)(j.ub,{className:"justify-content-center",children:Object(m.jsx)(j.u,{md:"8",children:Object(m.jsxs)(j.m,{children:[Object(m.jsx)(j.j,{className:"p-4",children:Object(m.jsx)(j.k,{children:Object(m.jsxs)(j.J,{onSubmit:function(e){return function(e){function t(){return(t=Object(a.a)(n.a.mark((function e(){var t,s,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new FormData).append("email",c),t.append("password",p),e.next=5,fetch(u.d+"login",{method:"POST",body:t});case 5:if(!0!==(s=e.sent).ok){e.next=12;break}return e.next=9,s.json();case 9:a=e.sent,g(!1),200===a.status?(w(a.user_data),window.location=window.location.origin+"/"):x.b.error(a.message);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}g(!0),e.preventDefault(),function(){t.apply(this,arguments)}()}(e)},children:[Object(m.jsx)("h1",{children:"Login"}),Object(m.jsx)("p",{className:"text-muted",children:"Sign In to your account"}),Object(m.jsxs)(j.T,{className:"mb-3",children:[Object(m.jsx)(j.V,{children:Object(m.jsx)(j.W,{children:Object(m.jsx)(d.a,{name:"cil-user"})})}),Object(m.jsx)(j.Q,{type:"email",required:!0,placeholder:"Email",value:c,onChange:function(e){return s(e.target.value)},autoComplete:"email"})]}),Object(m.jsxs)(j.T,{className:"mb-4",children:[Object(m.jsx)(j.V,{children:Object(m.jsx)(j.W,{children:Object(m.jsx)(d.a,{name:"cil-lock-locked"})})}),Object(m.jsx)(j.Q,{type:"password",placeholder:"Password",value:p,onChange:function(e){return O(e.target.value)},autoComplete:"current-password"})]}),Object(m.jsxs)(j.ub,{children:[Object(m.jsx)(j.u,{xs:"6",children:Object(m.jsx)(j.f,{type:"submit",color:"primary",className:"px-4",children:"Login"})}),Object(m.jsx)(j.u,{xs:"6",className:"text-right",children:Object(m.jsx)(j.f,{color:"link",className:"px-0",children:"Forgot password?"})})]})]})})}),Object(m.jsx)(j.j,{className:"text-white bg-primary py-5 d-md-down-none",style:{width:"44%"},children:Object(m.jsx)(j.k,{className:"text-center",children:Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:"Sign up"}),Object(m.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),Object(m.jsx)(o.b,{to:"/register",children:Object(m.jsx)(j.f,{color:"primary",className:"mt-3",active:!0,tabIndex:-1,children:"Register Now!"})})]})})})]})})})})]})}}}]);
//# sourceMappingURL=87.0a38e933.chunk.js.map