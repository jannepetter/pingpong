(this.webpackJsonppingpong=this.webpackJsonppingpong||[]).push([[0],[,,,,function(e,t,i){e.exports=i(13)},,,,,function(e,t,i){},function(e,t,i){},function(e,t,i){},function(e,t,i){},function(e,t,i){"use strict";i.r(t);var n,a=i(0),r=i.n(a),h=i(3),c=i.n(h),o=(i(9),i(1)),d=(i(10),{width:1600,height:2/3*1600}),u={x:d.width/2,y:d.height/2,size:d.height/40,dx:d.width/100,dy:d.height/100},s={x:d.width/30,y:d.height/2.5,width:d.width/40,height:d.height/5.5,speed:16,dy:0},l={x:d.width-d.width/20,y:d.height/2.5,width:d.width/40,height:d.height/5.5,speed:16,dy:0},y=!1,f=function(){y=!1,!1},g=function(e,t){Math.abs(e.y+e.height/2-d.height/2)<6?e.dy=0:e.y+e.height/2>d.height/2?e.dy=-1*t:e.y+e.height/2<d.height/2&&(e.dy=t)},m=function(e){var t=0;e&&(t=l.speed/3);var i=function(e,t){var i=Math.abs(e.y-(t.y+t.height/2)),n=Math.min(Math.abs(e.dy)+1,t.speed),a=Math.abs(e.dx),r=Math.abs(e.dy);return a>8||r>8?t.speed:i<t.height/2?n:t.speed}(u,l)-t,n=u.dx>0?"incoming":"outgoing",a=u.y>l.y+l.height/2?"down":"up";switch(u.y>l.y+l.height/2-l.speed&&u.y<l.y+l.height/2+l.speed?n+"towards":n+a){case"incomingdown":l.dy=i;break;case"incomingup":l.dy=-1*i;break;case"incomingtowards":l.dy=0;break;default:g(l,i)}},p=function(e,t,i){if(i)return Math.abs(e-t);if(!i){var n=e+t;return n>d.height?d.height-(n-d.height):n}},w=function(e,t,i,n){var a=function(e){var t=d.width;return e>t/2?t-(t-e)-(s.x+s.width):t-e-(t-l.x)}(e)/i,r=Math.abs(a*n),h=Math.floor(r/d.height),c=r%d.height;if(0===r)return u.y;if(h%2===0&&n<0)return p(t,c,!0);if(h%2===0&&n>0)return p(t,c,!1);if(h%2===1&&n<0){var o=d.height-t;return p(o,c,!1)}if(h%2===1&&n>0){var y=d.height-t;return p(y,c,!0)}},b=d.width/100,v=d.height/100,x=function(){u.x=d.width/2,u.y=d.height/2,u.dx=b,u.dy=v,s.y=d.height/2.5,l.y=d.height/2.5},k=function(e){e.beginPath(),e.fillStyle="white",e.fillRect(s.x,s.y,s.width,s.height),e.fillRect(l.x,l.y,l.width,l.height)},E=function(e){e.beginPath(),e.arc(u.x,u.y,u.size,0,2*Math.PI),e.fillStyle="red",e.fill()},j=function(e,t){e.clearRect(0,0,t.width,t.height),e.fillStyle="black",e.fillRect(0,0,t.width,t.height)},O=(i(11),function(e){var t=Object(a.useRef)(),i=e.run?"pause":"continue",h=document.getElementById("kanvaasi"),c=Object(a.useState)(0),p=Object(o.a)(c,2),b=p[0],v=p[1],O=Object(a.useState)(0),M=Object(o.a)(O,2),S=M[0],C=M[1],T=e.difficulty,A=e.setDifficulty,D=e.setUpdate,z=e.setStart,B=e.setRun,N=h.getContext("2d");h.width=d.width,h.height=d.height,N.fillStyle="black",N.fillRect(0,0,h.width,h.height);var R=function(e){switch(e){case"easy":return m(!0);case"normal":return m(!1);case"hard":return function(){var e=l.speed,t=u.dx>0?"incoming":"outgoing";"outgoing"===t&&!0===y&&(y=!1),"incoming"===t&&!1===y&&(n=w(u.x,u.y,u.dx,u.dy),y=!0);var i=n>l.y+l.height/2?"down":"up";switch(n<l.y+l.height/2+l.speed&&n>l.y+l.height/2-l.speed&&(i="towards"),t+i){case"incomingdown":l.dy=e;break;case"incomingup":l.dy=-1*e;break;case"incomingtowards":l.dy=0;break;default:g(l,e)}}();default:return m(!0)}},F=Object(a.useCallback)((function(){j(N,h),k(N),E(N),function(e,t,i,n){e.font="30px Arial",e.fillStyle="white",i&&!t?e.fillText("Paused",d.width/2.2,d.height/4.4):i||t?t&&i&&e.fillText("Get ready!",d.width/2.2,d.height/4.4):(e.fillText("Press start to begin game",d.width/2.6,d.height/4.4),e.fillText("Move paddle up, arrowUp key",d.width/2.6,d.height/3.8),e.fillText("Move paddle down, arrowDown key",d.width/2.6,d.height/3.3),e.fillText("Mobile touchkeys, appear in landscapeview",d.width/2.6,d.height/2.95),e.fillText("Who gets ".concat(n," points first wins"),d.width/2.6,d.height/2.65))}(N,e.run,e.start,10)}),[N,h,e.run,e.start]),L=Object(a.useCallback)((function(e){var t=function(){x(),f(),F()};return e.x<-200?(C(S+1),t(),"computer"):e.x>d.width+200?(v(b+1),t(),"player"):"noscore"}),[S,b,F]),P=Object(a.useCallback)((function(e){var t=function(){setTimeout((function(){D(!0)}),1500)},i=function(){z(!1),B(!1),A("easy"),j(N,h),k(N),E(N),function(e,t,i){e.font="30px Arial",e.fillStyle="white",t>i?e.fillText("You won! Play again?",d.width/2.4,d.height/4.4):i>t&&e.fillText("You lose! Try again?",d.width/2.4,d.height/4.4)}(N,b,S)};switch(e){case"computer":if(S+1>=10){i();break}t();break;case"player":if(b+1>=10){i();break}t()}}),[N,h,b,S,D,z,B,A]),I=Object(a.useCallback)((function(){j(N,h),k(N),R(T),s.y+=s.dy,l.y+=l.dy,E(N),u.x+=u.dx,u.y+=u.dy,function(e){s.y<0&&(s.y=0),s.y+s.height>e.height&&(s.y=e.height-s.height),l.y<0&&(l.y=0),l.y+l.height>e.height&&(l.y=e.height-l.height)}(h),function(e){var t=Math.abs(u.dy);u.y>e.height-t&&(u.y=e.height,u.dy*=-1),u.y<t&&(u.y=0,u.dy*=-1)}(h),function(){var e=Math.round(Math.random()*(l.height/20)),t=function(t,i){switch(i.dx>0?"right":"left"){case"right":i.x=t.x-i.size,i.dx*=-1.02;break;case"left":i.x=t.x+t.width+i.size,i.dx*=-1.02}var n=t.height/3;i.y>=t.y-i.size&&i.y<=t.y+n&&(i.dy<=-30?i.dy=-30:i.dy-=2),i.y>=t.y+n&&i.y<=t.y+2*n&&(e%2===0?i.dy+=e:i.dy-=e),i.y>=t.y+2*n&&i.y<=t.y+i.size+3*n&&(i.dy>=30?i.dy=30:i.dy+=2)},i=function(e,t){var i=t.dx>0,n=t.x+t.dx,a=e.x+e.width;return!!(i&&n>=e.x&&n<=a)||!i&&n-t.size<=a&&n>=e.x},n=function(e,t){return t.y>=e.y-t.size&&t.y<=e.y+e.height+t.size};i(s,u)&&n(s,u)&&t(s,u),i(l,u)&&n(l,u)&&t(l,u)}();var e=L(u);"noscore"!==e?(D(!1),P(e)):t.current=requestAnimationFrame(I)}),[h,N,T,D,L,P]);Object(a.useEffect)((function(){cancelAnimationFrame(t.current),e.run&&e.start&&e.update&&I()}),[S,b,e.run,e.start,e.update,I,e.difficulty]);document.addEventListener("keydown",(function(e){"ArrowUp"===e.key&&(s.dy=-1*s.speed),"ArrowDown"===e.key&&(s.dy=s.speed)})),document.addEventListener("keyup",(function(e){"ArrowUp"===e.key&&(s.dy=0),"ArrowDown"===e.key&&(s.dy=0)}));var U=function(e){s.dy=s.speed*e},W=function(){s.dy=0},J=document.getElementById("ylosnappi"),Y=document.getElementById("alasnappi");return J.addEventListener("touchstart",(function(){return U(-1)}),{passive:!0}),J.addEventListener("touchend",W),Y.addEventListener("touchstart",(function(){return U(1)}),{passive:!0}),Y.addEventListener("touchend",W),F(),r.a.createElement("div",{className:"infobar"},r.a.createElement("span",{className:"infoitem"},"player ",b)," ",r.a.createElement("span",{className:"infoitem"},"computer   ",S),e.start?r.a.createElement("button",{className:"infoitem basicButton",onClick:function(){!1!==e.run?!0===e.run&&B(!1):B(!0)}},i):null,e.start?r.a.createElement("button",{className:"infoitem basicButton",onClick:function(){cancelAnimationFrame(t.current),x(),f(),e.setDifficulty("easy"),F(),z(!1),B(!1),C(0),v(0)}},"restart"):r.a.createElement("button",{className:"infoitem basicButton",onClick:function(){!1===e.start&&(I(),v(0),C(0),D(!0),B(!0),z(!0))}},"start"))}),M=(i(12),function(e){return e.start?r.a.createElement("div",null):r.a.createElement("div",{className:"optionpanelcontainer"},r.a.createElement("div",null,"difficulty:",r.a.createElement("input",{onChange:function(t){return e.setDifficulty(t.target.value)},name:"jee",type:"radio",id:"radio1",defaultChecked:!0,value:"easy"}),r.a.createElement("label",{htmlFor:"radio1"},"easy"),r.a.createElement("input",{onChange:function(t){return e.setDifficulty(t.target.value)},name:"jee",type:"radio",id:"radio2",value:"normal"}),r.a.createElement("label",{htmlFor:"radio2"},"normal"),r.a.createElement("input",{onChange:function(t){return e.setDifficulty(t.target.value)},name:"jee",type:"radio",id:"radio3",value:"hard"}),r.a.createElement("label",{htmlFor:"radio3"},"real pro")))});var S=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),i=t[0],n=t[1],h=Object(a.useState)(!1),c=Object(o.a)(h,2),d=c[0],u=c[1],s=Object(a.useState)("easy"),l=Object(o.a)(s,2),y=l[0],f=l[1],g=Object(a.useState)(!1),m=Object(o.a)(g,2),p=m[0],w=m[1];return r.a.createElement("div",{className:"App"},r.a.createElement(M,{setDifficulty:f,start:d}),r.a.createElement(O,{run:i,setRun:n,start:d,setStart:u,difficulty:y,setDifficulty:f,update:p,setUpdate:w}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.07e5af43.chunk.js.map