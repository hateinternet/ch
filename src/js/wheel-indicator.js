var WheelIndicator=function(t,e){function i(t){this._options=h(u,t),this._deltaArray=[0,0,0],this._isAcceleration=!1,this._isStopped=!0,this._direction="",this._timer="",this._isWorking=!0;var e=this;this._wheelHandler=function(t){e._isWorking&&(o.call(e,t),e._options.preventMouse&&r(t))},a(this._options.elem,l,this._wheelHandler)}function n(t){t.direction=this._direction,this._options.callback.call(this,t)}function r(e){(e=e||t.event).preventDefault?e.preventDefault():e.returnValue=!1}function o(t){var e=this,i=_(t);if(0!==i){var r,o=i>0?"down":"up",a=e._deltaArray.length,c=!1,h=0;for(clearTimeout(e._timer),e._timer=setTimeout(function(){e._deltaArray=[0,0,0],e._isStopped=!0,e._direction=o},150),r=0;r<a;r++)0!==e._deltaArray[r]&&(e._deltaArray[r]>0?++h:--h);Math.abs(h)===a&&(h>0?"down":"up")!==e._direction&&(c=!0,e._direction=o),e._isStopped||(c?(e._isAcceleration=!0,n.call(this,t)):Math.abs(h)===a&&s.call(this,t)),e._isStopped&&(e._isStopped=!1,e._isAcceleration=!0,e._direction=o,n.call(this,t)),e._deltaArray.shift(),e._deltaArray.push(i)}}function s(t){var e=Math.abs(this._deltaArray[0]),i=Math.abs(this._deltaArray[1]),r=Math.abs(this._deltaArray[2]),o=Math.abs(_(t));o>r&&r>i&&i>e&&(this._isAcceleration||(n.call(this,t),this._isAcceleration=!0)),o<r&&r<=i&&(this._isAcceleration=!1)}function a(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent&&t.attachEvent("on"+e,i)}function c(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent&&t.detachEvent("on"+e,i)}function h(t,e){var i,n={};for(i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}var l="onwheel"in e?"wheel":"mousewheel",u={callback:function(){},elem:e,preventMouse:!0};i.prototype={constructor:i,turnOn:function(){return this._isWorking=!0,this},turnOff:function(){return this._isWorking=!1,this},setOptions:function(t){return this._options=h(this._options,t),this},getOption:function(t){var e=this._options[t];if(void 0!==e)return e;throw new Error("Unknown option")},destroy:function(){return c(this._options.elem,l,this._wheelHandler),this}};var _=function(t){return(_=t.wheelDelta&&!t.deltaY?function(t){return-1*t.wheelDelta}:function(t){return t.deltaY})(t)};return i}(window,document);"object"==typeof exports&&(module.exports=WheelIndicator);