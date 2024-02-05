import{u as j,f as Z,g as ee,h as B,i as se,j as ae,t as te,k as le,l as b,m as A,n as re,p as M,q as a,s as I,v as O,R as U,x as ue,y as ne,z as ie,A as oe,B as ce,C as ve,D as pe,E as ye,F as de,G as he,H as me,I as fe,J as ge,K as L}from"./app-Lulzgzf0.js";const He=[],Re="SEARCH_PRO_QUERY_HISTORY",y=j(Re,[]),ke=()=>{const{queryHistoryCount:t}=L,l=t>0;return{enabled:l,queryHistory:y,addQueryHistory:r=>{l&&(y.value.length<t?y.value=Array.from(new Set([r,...y.value])):y.value=Array.from(new Set([r,...y.value.slice(0,t-1)])))},removeQueryHistory:r=>{y.value=[...y.value.slice(0,r),...y.value.slice(r+1)]}}},E=t=>He[t.id]+("anchor"in t?`#${t.anchor}`:""),Qe="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:D}=L,d=j(Qe,[]),xe=()=>{const t=D>0;return{enabled:t,resultHistory:d,addResultHistory:l=>{if(t){const r={link:E(l),display:l.display};"header"in l&&(r.header=l.header),d.value.length<D?d.value=[r,...d.value]:d.value=[r,...d.value.slice(0,D-1)]}},removeResultHistory:l=>{d.value=[...d.value.slice(0,l),...d.value.slice(l+1)]}}},Se=t=>{const l=ce(),r=B(),{search:Q,terminate:v}=ve(),m=b(!1),f=pe([]);return ye(()=>{const h=()=>{f.value=[],m.value=!1},x=ge(g=>{m.value=!0,g?Q({type:"search",query:g,locale:r.value,options:l}).then(p=>{f.value=p,m.value=!1}).catch(p=>{console.error(p),h()}):h()},L.searchDelay);M([t,r],()=>x(t.value),{immediate:!0}),de(()=>{v()})}),{searching:m,results:f}};var Ce=Z({name:"SearchResult",props:{query:{type:String,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(t,{emit:l}){const r=ee(),Q=B(),v=se(ae),{enabled:m,addQueryHistory:f,queryHistory:h,removeQueryHistory:x}=ke(),{enabled:g,resultHistory:p,addResultHistory:T,removeResultHistory:Y}=xe(),P=m||g,S=te(t,"query"),{results:H,searching:z}=Se(S),u=le({isQuery:!0,index:0}),o=b(0),c=b(0),_=A(()=>P&&(h.value.length>0||p.value.length>0)),w=A(()=>H.value.length>0),C=A(()=>H.value[o.value]||null),G=()=>{const{isQuery:e,index:s}=u;s===0?(u.isQuery=!e,u.index=e?p.value.length-1:h.value.length-1):u.index=s-1},J=()=>{const{isQuery:e,index:s}=u;s===(e?h.value.length-1:p.value.length-1)?(u.isQuery=!e,u.index=0):u.index=s+1},K=()=>{o.value=o.value>0?o.value-1:H.value.length-1,c.value=C.value.contents.length-1},V=()=>{o.value=o.value<H.value.length-1?o.value+1:0,c.value=0},$=()=>{c.value<C.value.contents.length-1?c.value+=1:V()},N=()=>{c.value>0?c.value-=1:K()},q=e=>e.map(s=>he(s)?s:a(s[0],s[1])),W=e=>{if(e.type==="customField"){const s=me[e.index]||"$content",[n,k=""]=fe(s)?s[Q.value].split("$content"):s.split("$content");return e.display.map(i=>a("div",q([n,...i,k])))}return e.display.map(s=>a("div",q(s)))},R=()=>{o.value=0,c.value=0,l("updateQuery",""),l("close")};return re("keydown",e=>{if(t.isFocusing){if(w.value){if(e.key==="ArrowUp")N();else if(e.key==="ArrowDown")$();else if(e.key==="Enter"){const s=C.value.contents[c.value];f(t.query),T(s),r.push(E(s)),R()}}else if(g){if(e.key==="ArrowUp")G();else if(e.key==="ArrowDown")J();else if(e.key==="Enter"){const{index:s}=u;u.isQuery?(l("updateQuery",h.value[s]),e.preventDefault()):(r.push(p.value[s].link),R())}}}}),M([o,c],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>a("div",{class:["search-pro-result-wrapper",{empty:S.value?!w.value:!_.value}],id:"search-pro-results"},S.value===""?P?_.value?[m?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},v.value.queryHistory),h.value.map((e,s)=>a("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===s}],onClick:()=>{l("updateQuery",e)}},[a(I,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},e),a("button",{class:"search-pro-remove-icon",innerHTML:O,onClick:n=>{n.preventDefault(),n.stopPropagation(),x(s)}})]))])):null,g?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},v.value.resultHistory),p.value.map((e,s)=>a(U,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===s}],onClick:()=>{R()}},()=>[a(I,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[e.header?a("div",{class:"content-header"},e.header):null,a("div",e.display.map(n=>q(n)).flat())]),a("button",{class:"search-pro-remove-icon",innerHTML:O,onClick:n=>{n.preventDefault(),n.stopPropagation(),Y(s)}})]))])):null]:v.value.emptyHistory:v.value.emptyResult:z.value?a(ue,{hint:v.value.searching}):w.value?a("ul",{class:"search-pro-result-list"},H.value.map(({title:e,contents:s},n)=>{const k=o.value===n;return a("li",{class:["search-pro-result-list-item",{active:k}]},[a("div",{class:"search-pro-result-title"},e||v.value.defaultTitle),s.map((i,X)=>{const F=k&&c.value===X;return a(U,{to:E(i),class:["search-pro-result-item",{active:F,"aria-selected":F}],onClick:()=>{f(t.query),T(i),R()}},()=>[i.type==="text"?null:a(i.type==="title"?ne:i.type==="heading"?ie:oe,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[i.type==="text"&&i.header?a("div",{class:"content-header"},i.header):null,a("div",W(i))])])})])})):v.value.emptyResult)}});export{Ce as default};
