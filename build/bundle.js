function _setState(t,e){Page.$html.removeClass("page_slide_"+Page.slide).addClass("page_slide_"+t),Page.slide=t,Page.state=Page.state||{},Page.state[t]=void 0===e?Page.state[t]:e;var i="philosophy"!==t&&"dark"!==Page.state[t],n="collections"===t;Page.$html.toggleClassIf(i,"page_dark").toggleClassIf(n,"page_no-logo")}function _scrollTo(t,e){var i=$("html, body");i.is(":animated")&&i.stop(),$.Deferred(function(n){i.animate({scrollTop:t},"number"==typeof e?e:Page.scrollDuration,n.resolve)})}function _calcPosition(t,e){return e="number"==typeof e?e:10,$(t).offset().top+-Page.scrollOffset()-e}function _setModal(t){if(Page.$html.toggleClassIf(t,"page_modal"),document.body.scrollHeight>document.body.clientHeight){var e=t?Page.scrollBarWidth:0;Page.$body.css("margin-right",e),Page.$header.css("right",e)}return Page}var Page={$win:$(window),$doc:$(document),$html:$("html"),$body:$("body"),$header:$(".header"),scrollTo:_scrollTo,scrollDuration:500,scrollTop:0,setState:_setState,calcPosition:_calcPosition,setModal:_setModal,scrollBarWidth:function(){var t=document.createElement("p");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.style.visibility="hidden",e.style.width="200px",e.style.height="150px",e.style.overflow="hidden",e.appendChild(t),document.body.appendChild(e);var i=t.offsetWidth;e.style.overflow="scroll";var n=t.offsetWidth;return i==n&&(n=e.clientWidth),document.body.removeChild(e),i-n}()};$.fn.toggleClassIf=function(t,e){return $(this)[t?"addClass":"removeClass"](e)},function(){var t="ontouchstart"in window||navigator.maxTouchPoints;Page.$html.toggleClassIf(window.devicePixelRatio>1.5,"page_hidpi").toggleClassIf(!t,"page_hoverable")}(),Page.$html.on("click",".header__burger, .header__close",function(){Page.$html.toggleClass("page_menu")});var WheelIndicator=function(t,e){function i(t){this._options=c(u,t),this._deltaArray=[0,0,0],this._isAcceleration=!1,this._isStopped=!0,this._direction="",this._timer="",this._isWorking=!0;var e=this;this._wheelHandler=function(t){e._isWorking&&(o.call(e,t),e._options.preventMouse&&r(t))},a(this._options.elem,l,this._wheelHandler)}function n(t){t.direction=this._direction,this._options.callback.call(this,t)}function r(e){(e=e||t.event).preventDefault?e.preventDefault():e.returnValue=!1}function o(t){var e=this,i=p(t);if(0!==i){var r,o=i>0?"down":"up",a=e._deltaArray.length,h=!1,c=0;for(clearTimeout(e._timer),e._timer=setTimeout(function(){e._deltaArray=[0,0,0],e._isStopped=!0,e._direction=o},150),r=0;r<a;r++)0!==e._deltaArray[r]&&(e._deltaArray[r]>0?++c:--c);Math.abs(c)===a&&(c>0?"down":"up")!==e._direction&&(h=!0,e._direction=o),e._isStopped||(h?(e._isAcceleration=!0,n.call(this,t)):Math.abs(c)===a&&s.call(this,t)),e._isStopped&&(e._isStopped=!1,e._isAcceleration=!0,e._direction=o,n.call(this,t)),e._deltaArray.shift(),e._deltaArray.push(i)}}function s(t){var e=Math.abs(this._deltaArray[0]),i=Math.abs(this._deltaArray[1]),r=Math.abs(this._deltaArray[2]),o=Math.abs(p(t));o>r&&r>i&&i>e&&(this._isAcceleration||(n.call(this,t),this._isAcceleration=!0)),o<r&&r<=i&&(this._isAcceleration=!1)}function a(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent&&t.attachEvent("on"+e,i)}function h(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent&&t.detachEvent("on"+e,i)}function c(t,e){var i,n={};for(i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}var l="onwheel"in e?"wheel":"mousewheel",u={callback:function(){},elem:e,preventMouse:!0};i.prototype={constructor:i,turnOn:function(){return this._isWorking=!0,this},turnOff:function(){return this._isWorking=!1,this},setOptions:function(t){return this._options=c(this._options,t),this},getOption:function(t){var e=this._options[t];if(void 0!==e)return e;throw new Error("Unknown option")},destroy:function(){return h(this._options.elem,l,this._wheelHandler),this}};var p=function(t){return(p=t.wheelDelta&&!t.deltaY?function(t){return-1*t.wheelDelta}:function(t){return t.deltaY})(t)};return i}(window,document);"object"==typeof exports&&(module.exports=WheelIndicator),function(t,e,i,n){"use strict";function r(t,e,i){return setTimeout(c(t,i),e)}function o(t,e,i){return!!Array.isArray(t)&&(s(t,i[e],i),!0)}function s(t,e,i){var r;if(t)if(t.forEach)t.forEach(e,i);else if(t.length!==n)for(r=0;r<t.length;)e.call(i,t[r],r,t),r++;else for(r in t)t.hasOwnProperty(r)&&e.call(i,t[r],r,t)}function a(e,i,n){var r="DEPRECATED METHOD: "+i+"\n"+n+" AT \n";return function(){var i=new Error("get-stack-trace"),n=i&&i.stack?i.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=t.console&&(t.console.warn||t.console.log);return o&&o.call(t.console,r,n),e.apply(this,arguments)}}function h(t,e,i){var n,r=e.prototype;(n=t.prototype=Object.create(r)).constructor=t,n._super=r,i&&lt(n,i)}function c(t,e){return function(){return t.apply(e,arguments)}}function l(t,e){return typeof t==ft?t.apply(e?e[0]||n:n,e):t}function u(t,e){return t===n?e:t}function p(t,e,i){s(m(e),function(e){t.addEventListener(e,i,!1)})}function f(t,e,i){s(m(e),function(e){t.removeEventListener(e,i,!1)})}function d(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function v(t,e){return t.indexOf(e)>-1}function m(t){return t.trim().split(/\s+/g)}function g(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}function y(t){return Array.prototype.slice.call(t,0)}function T(t,e,i){for(var n=[],r=[],o=0;o<t.length;){var s=e?t[o][e]:t[o];g(r,s)<0&&n.push(t[o]),r[o]=s,o++}return i&&(n=e?n.sort(function(t,i){return t[e]>i[e]}):n.sort()),n}function _(t,e){for(var i,r,o=e[0].toUpperCase()+e.slice(1),s=0;s<ut.length;){if(i=ut[s],(r=i?i+o:e)in t)return r;s++}return n}function E(){return Tt++}function w(e){var i=e.ownerDocument||e;return i.defaultView||i.parentWindow||t}function b(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){l(t.options.enable,[t])&&i.handler(e)},this.init()}function P(t){var e=t.options.inputClass;return new(e||(Et?Y:wt?X:_t?L:k))(t,A)}function A(t,e,i){var n=i.pointers.length,r=i.changedPointers.length,o=e&Pt&&n-r==0,s=e&(Ct|It)&&n-r==0;i.isFirst=!!o,i.isFinal=!!s,o&&(t.session={}),i.eventType=e,C(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function C(t,e){var i=t.session,n=e.pointers,r=n.length;i.firstInput||(i.firstInput=x(e)),r>1&&!i.firstMultiple?i.firstMultiple=x(e):1===r&&(i.firstMultiple=!1);var o=i.firstInput,s=i.firstMultiple,a=s?s.center:o.center,h=e.center=D(n);e.timeStamp=mt(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=$(a,h),e.distance=O(a,h),I(i,e),e.offsetDirection=M(e.deltaX,e.deltaY);var c=z(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=c.x,e.overallVelocityY=c.y,e.overallVelocity=vt(c.x)>vt(c.y)?c.x:c.y,e.scale=s?W(s.pointers,n):1,e.rotation=s?R(s.pointers,n):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,S(i,e);var l=t.element;d(e.srcEvent.target,l)&&(l=e.srcEvent.target),e.target=l}function I(t,e){var i=e.center,n=t.offsetDelta||{},r=t.prevDelta||{},o=t.prevInput||{};e.eventType!==Pt&&o.eventType!==Ct||(r=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=r.x+(i.x-n.x),e.deltaY=r.y+(i.y-n.y)}function S(t,e){var i,r,o,s,a=t.lastInterval||e,h=e.timeStamp-a.timeStamp;if(e.eventType!=It&&(h>bt||a.velocity===n)){var c=e.deltaX-a.deltaX,l=e.deltaY-a.deltaY,u=z(h,c,l);r=u.x,o=u.y,i=vt(u.x)>vt(u.y)?u.x:u.y,s=M(c,l),t.lastInterval=e}else i=a.velocity,r=a.velocityX,o=a.velocityY,s=a.direction;e.velocity=i,e.velocityX=r,e.velocityY=o,e.direction=s}function x(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:dt(t.pointers[i].clientX),clientY:dt(t.pointers[i].clientY)},i++;return{timeStamp:mt(),pointers:e,center:D(e),deltaX:t.deltaX,deltaY:t.deltaY}}function D(t){var e=t.length;if(1===e)return{x:dt(t[0].clientX),y:dt(t[0].clientY)};for(var i=0,n=0,r=0;r<e;)i+=t[r].clientX,n+=t[r].clientY,r++;return{x:dt(i/e),y:dt(n/e)}}function z(t,e,i){return{x:e/t||0,y:i/t||0}}function M(t,e){return t===e?St:vt(t)>=vt(e)?t<0?xt:Dt:e<0?zt:Mt}function O(t,e,i){i||(i=Wt);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return Math.sqrt(n*n+r*r)}function $(t,e,i){i||(i=Wt);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return 180*Math.atan2(r,n)/Math.PI}function R(t,e){return $(e[1],e[0],kt)+$(t[1],t[0],kt)}function W(t,e){return O(e[0],e[1],kt)/O(t[0],t[1],kt)}function k(){this.evEl=qt,this.evWin=Nt,this.pressed=!1,b.apply(this,arguments)}function Y(){this.evEl=Lt,this.evWin=Ht,b.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function q(){this.evTarget=Ut,this.evWin=Vt,this.started=!1,b.apply(this,arguments)}function N(t,e){var i=y(t.touches),n=y(t.changedTouches);return e&(Ct|It)&&(i=T(i.concat(n),"identifier",!0)),[i,n]}function X(){this.evTarget=Gt,this.targetIds={},b.apply(this,arguments)}function F(t,e){var i=y(t.touches),n=this.targetIds;if(e&(Pt|At)&&1===i.length)return n[i[0].identifier]=!0,[i,i];var r,o,s=y(t.changedTouches),a=[],h=this.target;if(o=i.filter(function(t){return d(t.target,h)}),e===Pt)for(r=0;r<o.length;)n[o[r].identifier]=!0,r++;for(r=0;r<s.length;)n[s[r].identifier]&&a.push(s[r]),e&(Ct|It)&&delete n[s[r].identifier],r++;return a.length?[T(o.concat(a),"identifier",!0),a]:void 0}function L(){b.apply(this,arguments);var t=c(this.handler,this);this.touch=new X(this.manager,t),this.mouse=new k(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function H(t,e){t&Pt?(this.primaryTouch=e.changedPointers[0].identifier,j.call(this,e)):t&(Ct|It)&&j.call(this,e)}function j(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY};this.lastTouches.push(i);var n=this.lastTouches;setTimeout(function(){var t=n.indexOf(i);t>-1&&n.splice(t,1)},Zt)}}function U(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,n=0;n<this.lastTouches.length;n++){var r=this.lastTouches[n],o=Math.abs(e-r.x),s=Math.abs(i-r.y);if(o<=Jt&&s<=Jt)return!0}return!1}function V(t,e){this.manager=t,this.set(e)}function B(t){if(v(t,ie))return ie;var e=v(t,ne),i=v(t,re);return e&&i?ie:e||i?e?ne:re:v(t,ee)?ee:te}function G(t){this.options=lt({},this.defaults,t||{}),this.id=E(),this.manager=null,this.options.enable=u(this.options.enable,!0),this.state=se,this.simultaneous={},this.requireFail=[]}function Z(t){return t&ue?"cancel":t&ce?"end":t&he?"move":t&ae?"start":""}function J(t){return t==Mt?"down":t==zt?"up":t==xt?"left":t==Dt?"right":""}function K(t,e){var i=e.manager;return i?i.get(t):t}function Q(){G.apply(this,arguments)}function tt(){Q.apply(this,arguments),this.pX=null,this.pY=null}function et(){Q.apply(this,arguments)}function it(){G.apply(this,arguments),this._timer=null,this._input=null}function nt(){Q.apply(this,arguments)}function rt(){Q.apply(this,arguments)}function ot(){G.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function st(t,e){return e=e||{},e.recognizers=u(e.recognizers,st.defaults.preset),new at(t,e)}function at(t,e){this.options=lt({},st.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=P(this),this.touchAction=new V(this,this.options.touchAction),ht(this,!0),s(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ht(t,e){var i=t.element;if(i.style){var n;s(t.options.cssProps,function(r,o){n=_(i.style,o),e?(t.oldCssProps[n]=i.style[n],i.style[n]=r):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={})}}function ct(t,i){var n=e.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=i,i.target.dispatchEvent(n)}var lt,ut=["","webkit","Moz","MS","ms","o"],pt=e.createElement("div"),ft="function",dt=Math.round,vt=Math.abs,mt=Date.now;lt="function"!=typeof Object.assign?function(t){if(t===n||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var r=arguments[i];if(r!==n&&null!==r)for(var o in r)r.hasOwnProperty(o)&&(e[o]=r[o])}return e}:Object.assign;var gt=a(function(t,e,i){for(var r=Object.keys(e),o=0;o<r.length;)(!i||i&&t[r[o]]===n)&&(t[r[o]]=e[r[o]]),o++;return t},"extend","Use `assign`."),yt=a(function(t,e){return gt(t,e,!0)},"merge","Use `assign`."),Tt=1,_t="ontouchstart"in t,Et=_(t,"PointerEvent")!==n,wt=_t&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),bt=25,Pt=1,At=2,Ct=4,It=8,St=1,xt=2,Dt=4,zt=8,Mt=16,Ot=xt|Dt,$t=zt|Mt,Rt=Ot|$t,Wt=["x","y"],kt=["clientX","clientY"];b.prototype={handler:function(){},init:function(){this.evEl&&p(this.element,this.evEl,this.domHandler),this.evTarget&&p(this.target,this.evTarget,this.domHandler),this.evWin&&p(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(w(this.element),this.evWin,this.domHandler)}};var Yt={mousedown:Pt,mousemove:At,mouseup:Ct},qt="mousedown",Nt="mousemove mouseup";h(k,b,{handler:function(t){var e=Yt[t.type];e&Pt&&0===t.button&&(this.pressed=!0),e&At&&1!==t.which&&(e=Ct),this.pressed&&(e&Ct&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:"mouse",srcEvent:t}))}});var Xt={pointerdown:Pt,pointermove:At,pointerup:Ct,pointercancel:It,pointerout:It},Ft={2:"touch",3:"pen",4:"mouse",5:"kinect"},Lt="pointerdown",Ht="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(Lt="MSPointerDown",Ht="MSPointerMove MSPointerUp MSPointerCancel"),h(Y,b,{handler:function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),r=Xt[n],o=Ft[t.pointerType]||t.pointerType,s="touch"==o,a=g(e,t.pointerId,"pointerId");r&Pt&&(0===t.button||s)?a<0&&(e.push(t),a=e.length-1):r&(Ct|It)&&(i=!0),a<0||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),i&&e.splice(a,1))}});var jt={touchstart:Pt,touchmove:At,touchend:Ct,touchcancel:It},Ut="touchstart",Vt="touchstart touchmove touchend touchcancel";h(q,b,{handler:function(t){var e=jt[t.type];if(e===Pt&&(this.started=!0),this.started){var i=N.call(this,t,e);e&(Ct|It)&&i[0].length-i[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:"touch",srcEvent:t})}}});var Bt={touchstart:Pt,touchmove:At,touchend:Ct,touchcancel:It},Gt="touchstart touchmove touchend touchcancel";h(X,b,{handler:function(t){var e=Bt[t.type],i=F.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:"touch",srcEvent:t})}});var Zt=2500,Jt=25;h(L,b,{handler:function(t,e,i){var n="touch"==i.pointerType,r="mouse"==i.pointerType;if(!(r&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(n)H.call(this,e,i);else if(r&&U.call(this,i))return;this.callback(t,e,i)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Kt=_(pt.style,"touchAction"),Qt=Kt!==n,te="auto",ee="manipulation",ie="none",ne="pan-x",re="pan-y",oe=function(){if(!Qt)return!1;var e={},i=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){e[n]=!i||t.CSS.supports("touch-action",n)}),e}();V.prototype={set:function(t){"compute"==t&&(t=this.compute()),Qt&&this.manager.element.style&&oe[t]&&(this.manager.element.style[Kt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return s(this.manager.recognizers,function(e){l(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),B(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var n=this.actions,r=v(n,ie)&&!oe[ie],o=v(n,re)&&!oe[re],s=v(n,ne)&&!oe[ne];if(r){var a=1===t.pointers.length,h=t.distance<2,c=t.deltaTime<250;if(a&&h&&c)return}if(!s||!o)return r||o&&i&Ot||s&&i&$t?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var se=1,ae=2,he=4,ce=8,le=ce,ue=16;G.prototype={defaults:{},set:function(t){return lt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(o(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=K(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return o(t,"dropRecognizeWith",this)?this:(t=K(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(o(t,"requireFailure",this))return this;var e=this.requireFail;return t=K(t,this),-1===g(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(o(t,"dropRequireFailure",this))return this;t=K(t,this);var e=g(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){i.manager.emit(e,t)}var i=this,n=this.state;n<ce&&e(i.options.event+Z(n)),e(i.options.event),t.additionalEvent&&e(t.additionalEvent),n>=ce&&e(i.options.event+Z(n))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=32},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|se)))return!1;t++}return!0},recognize:function(t){var e=lt({},t);if(!l(this.options.enable,[this,e]))return this.reset(),void(this.state=32);this.state&(le|ue|32)&&(this.state=se),this.state=this.process(e),this.state&(ae|he|ce|ue)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},h(Q,G,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,i=t.eventType,n=e&(ae|he),r=this.attrTest(t);return n&&(i&It||!r)?e|ue:n||r?i&Ct?e|ce:e&ae?e|he:ae:32}}),h(tt,Q,{defaults:{event:"pan",threshold:10,pointers:1,direction:Rt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Ot&&e.push(re),t&$t&&e.push(ne),e},directionTest:function(t){var e=this.options,i=!0,n=t.distance,r=t.direction,o=t.deltaX,s=t.deltaY;return r&e.direction||(e.direction&Ot?(r=0===o?St:o<0?xt:Dt,i=o!=this.pX,n=Math.abs(t.deltaX)):(r=0===s?St:s<0?zt:Mt,i=s!=this.pY,n=Math.abs(t.deltaY))),t.direction=r,i&&n>e.threshold&&r&e.direction},attrTest:function(t){return Q.prototype.attrTest.call(this,t)&&(this.state&ae||!(this.state&ae)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=J(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),h(et,Q,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[ie]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ae)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),h(it,G,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[te]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,o=t.deltaTime>e.time;if(this._input=t,!n||!i||t.eventType&(Ct|It)&&!o)this.reset();else if(t.eventType&Pt)this.reset(),this._timer=r(function(){this.state=le,this.tryEmit()},e.time,this);else if(t.eventType&Ct)return le;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===le&&(t&&t.eventType&Ct?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=mt(),this.manager.emit(this.options.event,this._input)))}}),h(nt,Q,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[ie]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ae)}}),h(rt,Q,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Ot|$t,pointers:1},getTouchAction:function(){return tt.prototype.getTouchAction.call(this)},attrTest:function(t){var e,i=this.options.direction;return i&(Ot|$t)?e=t.overallVelocity:i&Ot?e=t.overallVelocityX:i&$t&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&i&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&vt(e)>this.options.velocity&&t.eventType&Ct},emit:function(t){var e=J(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),h(ot,G,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ee]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,o=t.deltaTime<e.time;if(this.reset(),t.eventType&Pt&&0===this.count)return this.failTimeout();if(n&&o&&i){if(t.eventType!=Ct)return this.failTimeout();var s=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||O(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,a&&s?this.count+=1:this.count=1,this._input=t,0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=r(function(){this.state=le,this.tryEmit()},e.interval,this),ae):le}return 32},failTimeout:function(){return this._timer=r(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==le&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),st.VERSION="2.0.7",st.defaults={domEvents:!1,touchAction:"compute",enable:!0,inputTarget:null,inputClass:null,preset:[[nt,{enable:!1}],[et,{enable:!1},["rotate"]],[rt,{direction:Ot}],[tt,{direction:Ot},["swipe"]],[ot],[ot,{event:"doubletap",taps:2},["tap"]],[it]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};at.prototype={set:function(t){return lt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var i,n=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&le)&&(r=e.curRecognizer=null);for(var o=0;o<n.length;)i=n[o],2===e.stopped||r&&i!=r&&!i.canRecognizeWith(r)?i.reset():i.recognize(t),!r&&i.state&(ae|he|ce)&&(r=e.curRecognizer=i),o++}},get:function(t){if(t instanceof G)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event==t)return e[i];return null},add:function(t){if(o(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(o(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,i=g(e,t);-1!==i&&(e.splice(i,1),this.touchAction.update())}return this},on:function(t,e){if(t!==n&&e!==n){var i=this.handlers;return s(m(t),function(t){i[t]=i[t]||[],i[t].push(e)}),this}},off:function(t,e){if(t!==n){var i=this.handlers;return s(m(t),function(t){e?i[t]&&i[t].splice(g(i[t],e),1):delete i[t]}),this}},emit:function(t,e){this.options.domEvents&&ct(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},destroy:function(){this.element&&ht(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},lt(st,{INPUT_START:Pt,INPUT_MOVE:At,INPUT_END:Ct,INPUT_CANCEL:It,STATE_POSSIBLE:se,STATE_BEGAN:ae,STATE_CHANGED:he,STATE_ENDED:ce,STATE_RECOGNIZED:le,STATE_CANCELLED:ue,STATE_FAILED:32,DIRECTION_NONE:St,DIRECTION_LEFT:xt,DIRECTION_RIGHT:Dt,DIRECTION_UP:zt,DIRECTION_DOWN:Mt,DIRECTION_HORIZONTAL:Ot,DIRECTION_VERTICAL:$t,DIRECTION_ALL:Rt,Manager:at,Input:b,TouchAction:V,TouchInput:X,MouseInput:k,PointerEventInput:Y,TouchMouseInput:L,SingleTouchInput:q,Recognizer:G,AttrRecognizer:Q,Tap:ot,Pan:tt,Swipe:rt,Pinch:et,Rotate:nt,Press:it,on:p,off:f,each:s,merge:yt,extend:gt,assign:lt,inherit:h,bindFn:c,prefixed:_}),(void 0!==t?t:"undefined"!=typeof self?self:{}).Hammer=st,"function"==typeof define&&define.amd?define(function(){return st}):"undefined"!=typeof module&&module.exports?module.exports=st:t.Hammer=st}(window,document),$(".achievements, .history").each(function(){function t(){o.eq(0).prop("disabled",0===c).end().eq(1).prop("disabled",c===h)}function e(t,e){var o=t*a,h=e?0:s;n.animate({scrollLeft:o},h);var c=i.data("slide"),l=r.eq(t).data("type")||null;Page.setState(c,l)}var i=$(this),n=i.find(".horizontal-slider__list-wrapper"),r=n.find(".horizontal-slide"),o=i.find(".arrow-button"),s=500,a=r.eq(0).width(),h=r.length-1,c=0;t(),o.on("click",function(i){var n=$(i.target).closest(".arrow-button").hasClass("arrow-button_next")?1:-1,r=c+n;r<=h&&r>=0&&(c=r,t(),e(c))}),Page.$win.on("resize",function(){a=r.eq(0).width(),e(c,!0)})}),$(".vertical-slider").each(function(){function t(t,h){if(!r){var c=e(t);if(a!==c){r=!0;var l=(a=c)*s,u=h?0:o,p=n.eq(a).data("slide");i.animate({scrollTop:l},u,function(){r=!1}),!h&&Page.setState(p)}}}function e(t){var e=a+t;return e<0||e>h?a:e}var i=$(this),n=i.find(".vertical-slide"),r=!1,o=500,s=i.height(),a=0,h=n.length-1;new WheelIndicator({elem:i[0],callback:function(e){t("up"===e.direction?-1:1)}}),$(window).on("resize",function(){s=i.height(),t(0,!0)})}),$(".philosophy .horizontal-slider").each(function(){function t(t,e){var i=t*h,n=e?0:a;r.animate({scrollLeft:i},n)}function e(){r.find(".horizontal-slide_current").removeClass("horizontal-slide_current")}function i(t){r.find(".horizontal-slide[data-id="+t+"]").addClass("horizontal-slide_current")}var n=$(this),r=n.find(".horizontal-slider__list-wrapper"),o=r.find(".horizontal-slide").map(function(t){return this.dataset.id=t,this}),s=o.eq(0).clone();r.find(".horizontal-slider__list").append(s);var a=500,h=r.eq(0).width(),c=o.length,l=0;n.on("click",".arrow-button",function(n){var r=$(n.target).hasClass("arrow-button_next")?1:-1,o=l+r;o>c?(t(0,!0),o=1):o<0&&(t(c,!0),o=c-1),t(l=o),e(),i(l===c?0:l)}),$(window).on("resize",function(){h=r.eq(0).width(),t(l,!0)})});