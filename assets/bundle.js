!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("tweakpane")):"function"==typeof define&&define.amd?define(["tweakpane"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).Tweakpane)}(this,(function(n){"use strict";function t(n){return n&&"object"==typeof n&&"default"in n?n:{default:n}}var e=t(n);function o(n,t){void 0===t&&(t=!1);var e="*[data-pane-"+(n+(t?"console":""))+"]",o=document.querySelector(e);if(!o)throw new Error("container not found: "+e);return o}function a(n){var t=.02*n;return 12/Math.PI*(Math.sin(1*t*Math.PI)+Math.sin(3*t*Math.PI)/3+Math.sin(5*t*Math.PI)/5)*.25}function r(){var n={hello:function(n){new e.default({container:n})}};Object.keys(n).forEach((function(t){(0,n[t])(o(t))}))}function l(n){return function(t){return t.toFixed(Math.max(Math.min(n,20),0))}}function i(n,t,e,o,a){return o+(n-t)/(e-t)*(a-o)}function u(n,t,e){return Math.min(Math.max(n,t),e)}function c(n,t){return(n%t+t)%t}var d={hsl:{hsl:function(n,t,e){return[n,t,e]},hsv:function(n,t,e){var o=e+t*(100-Math.abs(2*e-100))/200;return[n,0!==o?t*(100-Math.abs(2*e-100))/o:0,e+t*(100-Math.abs(2*e-100))/200]},rgb:function(n,t,e){var o,a,r,l,i,c,d,s,f,h=(n%360+360)%360,p=u(t/100,0,1),b=u(e/100,0,1),g=(1-Math.abs(2*b-1))*p,m=g*(1-Math.abs(h/60%2-1)),v=b-g/2;return h>=0&&h<60?(d=(o=[g,m,0])[0],s=o[1],f=o[2]):h>=60&&h<120?(d=(a=[m,g,0])[0],s=a[1],f=a[2]):h>=120&&h<180?(d=(r=[0,g,m])[0],s=r[1],f=r[2]):h>=180&&h<240?(d=(l=[0,m,g])[0],s=l[1],f=l[2]):h>=240&&h<300?(d=(i=[m,0,g])[0],s=i[1],f=i[2]):(d=(c=[g,0,m])[0],s=c[1],f=c[2]),[255*(d+v),255*(s+v),255*(f+v)]}},hsv:{hsl:function(n,t,e){var o=100-Math.abs(e*(200-t)/100-100);return[n,0!==o?t*e/o:0,e*(200-t)/200]},hsv:function(n,t,e){return[n,t,e]},rgb:function(n,t,e){var o,a,r,l,i,d,s,f,h,p=c(n,360),b=u(t/100,0,1),g=u(e/100,0,1),m=g*b,v=m*(1-Math.abs(p/60%2-1)),k=g-m;return p>=0&&p<60?(s=(o=[m,v,0])[0],f=o[1],h=o[2]):p>=60&&p<120?(s=(a=[v,m,0])[0],f=a[1],h=a[2]):p>=120&&p<180?(s=(r=[0,m,v])[0],f=r[1],h=r[2]):p>=180&&p<240?(s=(l=[0,v,m])[0],f=l[1],h=l[2]):p>=240&&p<300?(s=(i=[v,0,m])[0],f=i[1],h=i[2]):(s=(d=[m,0,v])[0],f=d[1],h=d[2]),[255*(s+k),255*(f+k),255*(h+k)]}},rgb:{hsl:function(n,t,e){var o=u(n/255,0,1),a=u(t/255,0,1),r=u(e/255,0,1),l=Math.max(o,a,r),i=Math.min(o,a,r),c=l-i,d=0,s=0,f=(i+l)/2;return 0!==c&&(s=c/(1-Math.abs(l+i-1)),d=(d=o===l?(a-r)/c:a===l?2+(r-o)/c:4+(o-a)/c)/6+(d<0?1:0)),[360*d,100*s,100*f]},hsv:function(n,t,e){var o=u(n/255,0,1),a=u(t/255,0,1),r=u(e/255,0,1),l=Math.max(o,a,r),i=l-Math.min(o,a,r);return[0===i?0:l===o?((a-r)/i%6+6)%6*60:l===a?60*((r-o)/i+2):60*((o-a)/i+4),100*(0===l?0:i/l),100*l]},rgb:function(n,t,e){return[n,t,e]}}};var s={hsl:function(n){var t;return[c(n[0],360),u(n[1],0,100),u(n[2],0,100),u(null!==(t=n[3])&&void 0!==t?t:1,0,1)]},hsv:function(n){var t;return[c(n[0],360),u(n[1],0,100),u(n[2],0,100),u(null!==(t=n[3])&&void 0!==t?t:1,0,1)]},rgb:function(n){var t;return[u(n[0],0,255),u(n[1],0,255),u(n[2],0,255),u(null!==(t=n[3])&&void 0!==t?t:1,0,1)]}};function f(n,t){return"object"==typeof n&&null!=n&&(t in n&&"number"==typeof n[t])}var h=function(){function n(n,t){this.mode_=t,this.comps_=s[t](n)}return n.black=function(){return new n([0,0,0],"rgb")},n.fromObject=function(t){return new n("a"in t?[t.r,t.g,t.b,t.a]:[t.r,t.g,t.b],"rgb")},n.toRgbaObject=function(n){return n.toRgbaObject()},n.isRgbColorObject=function(n){return f(n,"r")&&f(n,"g")&&f(n,"b")},n.isRgbaColorObject=function(n){return this.isRgbColorObject(n)&&f(n,"a")},n.isColorObject=function(n){return this.isRgbColorObject(n)},n.equals=function(n,t){if(n.mode_!==t.mode_)return!1;for(var e=n.comps_,o=t.comps_,a=0;a<e.length;a++)if(e[a]!==o[a])return!1;return!0},Object.defineProperty(n.prototype,"mode",{get:function(){return this.mode_},enumerable:!1,configurable:!0}),n.prototype.getComponents=function(n){return function(n,t){return[n[0],n[1],n[2],t]}((r=this.comps_,t=[r[0],r[1],r[2]],e=this.mode_,o=n||this.mode_,(a=d[e])[o].apply(a,t)),this.comps_[3]);var t,e,o,a,r},n.prototype.toRgbaObject=function(){var n=this.getComponents("rgb");return{r:n[0],g:n[1],b:n[2],a:n[3]}},n}();function p(n,t){var e=n.match(/^(.+)%$/);return e?Math.min(.01*parseFloat(e[1])*t,t):Math.min(parseFloat(n),t)}var b={deg:function(n){return n},grad:function(n){return 360*n/400},rad:function(n){return 360*n/(2*Math.PI)},turn:function(n){return 360*n}};function g(n){var t=n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!t)return parseFloat(n);var e=parseFloat(t[1]),o=t[2];return b[o](e)}var m={"func.rgb":function(n){var t=n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;var e=[p(t[1],255),p(t[2],255),p(t[3],255)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:new h(e,"rgb")},"func.rgba":function(n){var t=n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;var e=[p(t[1],255),p(t[2],255),p(t[3],255),p(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:new h(e,"rgb")},"func.hsl":function(n){var t=n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;var e=[g(t[1]),p(t[2],100),p(t[3],100)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:new h(e,"hsl")},"func.hsla":function(n){var t=n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;var e=[g(t[1]),p(t[2],100),p(t[3],100),p(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:new h(e,"hsl")},"hex.rgb":function(n){var t=n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return new h([parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)],"rgb");var e=n.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?new h([parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)],"rgb"):null},"hex.rgba":function(n){var t=n.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return new h([parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16),i(parseInt(t[4]+t[4],16),0,255,0,1)],"rgb");var e=n.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?new h([parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),i(parseInt(e[4],16),0,255,0,1)],"rgb"):null}};var v=function(n){var t=function(n){return Object.keys(m).reduce((function(t,e){return t||((0,m[e])(n)?e:null)}),null)}(n);return t?m[t](n):null};function k(n){if("string"==typeof n){var t=v(n);if(t)return t}return h.black()}function w(n){var t=l(2),e=l(0);return"rgba("+n.getComponents("rgb").map((function(n,o){return(3===o?t:e)(n)})).join(", ")+")"}var x="http://www.w3.org/2000/svg";var I=function(){function n(n){this.x=0,this.y=0,this.en=0,this.element=document.createElementNS(x,"circle"),this.env_=n}return n.prototype.update=function(){this.element.setAttributeNS(null,"cx",this.x+"px"),this.element.setAttributeNS(null,"cy",this.y+"px");var n=(1-Math.pow(.9,this.en))*this.env_.maxSize;this.element.setAttributeNS(null,"r",n+"px")},n}(),y=function(){function n(n,t){var e=this;this.height_=0,this.width_=0,this.onTick_=this.onTick_.bind(this),this.elem_=n,this.env_=t,this.dots_=[],this.t_=0;var o=document.createElementNS(x,"svg");this.elem_.appendChild(o),this.svgElem_=o,this.dotsElem_=document.createElementNS(x,"g"),this.svgElem_.appendChild(this.dotsElem_),window.addEventListener("resize",(function(){e.resize()})),this.resize(),this.onTick_()}return n.prototype.reset=function(){var n=this.width_,t=this.height_,e=this.env_;this.dots_=[];var o=e.spacing,a=o*Math.sqrt(3)/2,r=Math.ceil(n/o),l=Math.ceil(t/a),i=document.createElementNS(x,"g");i.setAttributeNS(null,"fill",e.color);for(var u=0;u<=l;u++)for(var c=0;c<=r;c++){var d=new I(e);d.en=0,d.x=(c+(u%2==0?0:.5))*o,d.y=u*a,i.appendChild(d.element),this.dots_.push(d)}this.svgElem_.appendChild(i),this.svgElem_.removeChild(this.dotsElem_),this.dotsElem_=i},n.prototype.resize=function(){var n=this.elem_.getBoundingClientRect();this.height_=n.height,this.width_=n.width,this.reset()},n.prototype.onTick_=function(){var n=this.width_,t=this.height_,e=this.env_;this.dots_.forEach((function(n){n.en=0})),this.t_-=e.speed;for(var o=this.t_,a=function(a){var l,i,u=(i=0)+(a-(l=0))/(100-l)*(1-i),c=u*n+Math.sin(u*e.freq.x+o)*e.amp.x*n,d=Math.sin(o+u*e.freq.y),s=t/2+d*e.amp.y*t;r.dots_.forEach((function(n){var t,o,a,r,l=(t=n.x,o=n.y,a=c-t,r=s-o,Math.sqrt(a*a+r*r));n.en+=Math.pow(e.range,.1*l)}))},r=this,l=0;l<=100;l++)a(l);this.dots_.forEach((function(n){n.update()})),requestAnimationFrame(this.onTick_)},n}();function _(){var n={amp:{x:.1,y:.5},color:"#d8dbde",freq:{x:12.57,y:6.28},maxSize:64,range:.8,spacing:24,speed:.02,title:"Tweakpane"};window.matchMedia("(prefers-color-scheme: dark)").matches&&(n.color="#020202");var t={atmos:{amp:{x:.1,y:.53},color:"#cacbcd",freq:{x:45,y:16},maxSize:128,range:.79,spacing:24,speed:.02,title:"Tweakpane"},bubble:{amp:{x:.3,y:.51},color:"#f2f2f2",freq:{x:64,y:32},maxSize:128,range:.65,spacing:48,speed:.02,title:"Tweakpane"},cloud:{amp:{x:.07,y:0},color:"#e4e4e7",freq:{x:22.25,y:0},maxSize:105,range:.63,spacing:48,speed:.02,title:"Tweakpane"}},a={presetId:"",presetJson:""},r=document.querySelector(".pageHeader_sketchContainer");if(r){var l=new y(r,n),i={index:function(o){var r=new e.default({container:o,title:"Parameters"});r.addInput(n,"color").on("change",(function(n){var t=document.querySelector(".pageHeader");if(t){var e=k(n.value).getComponents("hsl"),o=new h([e[0]+30,1.5*e[1],e[2]+8],"hsl");t.style.backgroundColor=w(o)}})),r.addInput(n,"title").on("change",(function(n){var t=document.querySelector(".pageHeader_title");t&&(t.textContent=n.value)})),r.addSeparator(),r.addInput(n,"spacing",{max:48,min:24}),r.addInput(n,"range",{max:1,min:0}),r.addInput(n,"maxSize",{max:128,min:5}),r.addInput(n,"freq",{x:{max:64,min:0},y:{max:32,min:0}}),r.addInput(n,"amp",{x:{max:.3,min:0},y:{max:1,min:0}});var i=r.addFolder({expanded:!1,title:"Preset"});i.addInput(a,"presetId",{label:"preset",options:{"Import...":"",Atmos:"atmos",Bubble:"bubble",Cloud:"cloud"}}).on("change",(function(n){var e=t[n.value];e&&(a.presetId="",r.importPreset(e))})),i.addMonitor(a,"presetJson",{label:"data",multiline:!0}),r.on("change",(function(){l.reset(),a.presetJson=JSON.stringify(r.exportPreset(),null,2)})),r.on("fold",(function(){l.resize(),setTimeout((function(){l.resize()}),200)}))}};Object.keys(i).forEach((function(n){(0,i[n])(o(n))})),l.resize()}}function S(){var n={input:function(n){var t={b:!0,c:"#ff8800",n:50,v2:{x:12,y:34},v3:{x:12,y:34,z:56},s:"string"},o=new e.default({container:n}),a=o.addFolder({title:"Number"});a.addInput(t,"n",{label:"text"}),a.addInput(t,"n",{label:"slider",max:100,min:0}),a.addInput(t,"n",{label:"list",options:{low:0,medium:50,high:100}});var r=o.addFolder({title:"String"});r.addInput(t,"s",{label:"text"}),r.addInput(t,"s",{label:"list",options:{dark:"Dark",light:"Light"}}),o.addFolder({title:"Boolean"}).addInput(t,"b",{label:"checkbox"});var l=o.addFolder({title:"Misc"});l.addInput(t,"c",{label:"color"}),l.addInput(t,"v2",{label:"2d"}),l.addInput(t,"v3",{label:"3d"})},numbertext:function(n){new e.default({container:n}).addInput({value:50},"value",{label:"text"})},slider:function(n){new e.default({container:n}).addInput({value:50},"value",{label:"slider",max:100,min:0})},step:function(n){var t={speed:.5,count:10},o=new e.default({container:n});o.addInput(t,"speed",{step:.1}),o.addInput(t,"count",{label:"count",max:100,min:0,step:10})},numberlist:function(n){var t={quality:0},a=o("numberlist",!0),r={json:""},l=new e.default({container:a});l.addMonitor(r,"json",{interval:0,label:"PARAMS",multiline:!0});var i=function(){r.json=JSON.stringify(t,void 0,2),l.refresh()};new e.default({container:n}).addInput(t,"quality",{options:{low:0,medium:50,high:100}}).on("change",(function(){i()})),i()},stringtext:function(n){new e.default({container:n}).addInput({value:"hello, world"},"value",{label:"message"})},stringlist:function(n){var t={theme:""},a=o("stringlist",!0),r={json:""},l=new e.default({container:a});l.addMonitor(r,"json",{interval:0,label:"PARAMS",multiline:!0});var i=function(){r.json=JSON.stringify(t,void 0,2),l.refresh()};new e.default({container:n}).addInput(t,"theme",{options:{none:"",dark:"dark-theme.json",light:"light-theme.json"}}).on("change",(function(){i()})),i()},checkbox:function(n){new e.default({container:n}).addInput({value:!0},"value",{label:"hidden"})},objectcolor:function(n){var t={background:{r:255,g:127,b:0},tint:{r:255,g:255,b:0,a:.5}},o=new e.default({container:n});o.addInput(t,"background"),o.addInput(t,"tint")},stringcolor:function(n){var t={primary:"#8df",secondary:"rgb(255, 136, 221)"},o=new e.default({container:n});o.addInput(t,"primary"),o.addInput(t,"secondary")},numbercolor:function(n){var t={background:35071,tint:16711748},o=new e.default({container:n});o.addInput(t,"background",{input:"color"}),o.addInput(t,"tint",{input:"color.rgba"})},inputstring:function(n){new e.default({container:n}).addInput({hex:"#0088ff"},"hex",{input:"string"})},point2d:function(n){new e.default({container:n}).addInput({value:{x:50,y:25}},"value",{label:"offset"})},point2dparams:function(n){new e.default({container:n}).addInput({value:{x:20,y:30}},"value",{label:"offset",x:{step:20},y:{min:0,max:100}})},point2dinvertedy:function(n){new e.default({container:n}).addInput({value:{x:50,y:50}},"value",{label:"offset",y:{inverted:!0}})},point3d:function(n){var t={camera:{x:0,y:20,z:-10},source:{x:0,y:0,z:0}},o=new e.default({container:n});o.addInput(t,"source"),o.addInput(t,"camera",{y:{step:10},z:{max:0}})},point4d:function(n){var t={min:0,max:1};new e.default({container:n}).addInput({color:{x:0,y:0,z:0,w:1}},"color",{x:t,y:t,z:t,w:t})}};Object.keys(n).forEach((function(t){(0,n[t])(o(t))}))}function M(){var n={color:"#ff8000",name:"exported json",size:10},t={log:""},a={event:function(n){var t=o("eventconsole");if(t){var a={log:"",value:0},r=new e.default({container:t});r.addMonitor(a,"log",{bufferSize:10,interval:0,label:"console",lineCount:5}),new e.default({container:n}).addInput(a,"value",{max:100,min:0}).on("change",(function(n){a.log=n.value.toFixed(2),r.refresh()}))}},globalevent:function(n){var t=o("globaleventconsole");if(t){var a={boolean:!0,color:"#0080ff",number:0,point2d:{x:0,y:0},string:"text",log:""},r=new e.default({container:t});r.addMonitor(a,"log",{bufferSize:10,interval:0,label:"console",lineCount:5});var l=new e.default({container:n});l.addInput(a,"boolean"),l.addInput(a,"color"),l.addInput(a,"number",{max:100,min:0}),l.addInput(a,"point2d"),l.addInput(a,"string"),l.on("change",(function(n){var t="number"==typeof n.value?n.value.toFixed(2):JSON.stringify(n.value);a.log="changed: "+t,r.refresh()}))}},export:function(a){var r=o("exportconsole");if(r){new e.default({container:r}).addMonitor(t,"log",{label:"preset",lineCount:5,multiline:!0});var l=new e.default({container:a});l.addInput(n,"name"),l.addInput(n,"size",{max:100,min:0}),l.addInput(n,"color");var i=function(){var n=l.exportPreset();t.log=JSON.stringify(n,null,2)};l.on("change",i),i()}},import:function(a){var r=o("importconsole");if(r){new e.default({container:r}).addMonitor(t,"log",{label:"preset",lineCount:5,multiline:!0});var l={color:"#0080ff",log:"",name:"tweakpane",size:50},i=new e.default({container:a});i.addButton({label:"preset",title:"Import"}).on("click",(function(){i.importPreset(n)})),i.addSeparator(),i.addInput(l,"name"),i.addInput(l,"size"),i.addInput(l,"color")}},presetkey:function(n){var t=o("presetkeyconsole");if(t){var a={foo:{speed:1/3},bar:{speed:2/3},preset:""},r=new e.default({container:t});r.addMonitor(a,"preset",{interval:0,label:"preset",lineCount:4,multiline:!0});var l=new e.default({container:n});l.addInput(a.foo,"speed",{max:1,min:0}),l.addInput(a.bar,"speed",{max:1,min:0,presetKey:"speed2"});var i=function(){var n=l.exportPreset();a.preset=JSON.stringify(n,null,2),r.refresh()};l.on("change",i),i()}},label:function(n){var t={initSpd:0,size:30},o=new e.default({container:n});o.addInput(t,"initSpd",{label:"Initial speed"}),o.addInput(t,"size",{label:"Force field\nradius"})},insert:function(n){var t=new e.default({container:n});t.addButton({title:"Run"}),t.addButton({title:"Stop"}),t.addButton({title:"**Reset**",index:1})},hidden:function(n){var t=new e.default({container:n}),o=t.addFolder({title:"Advanced"});o.addInput({seed:.1},"seed"),t.addButton({index:0,label:"advanced",title:"Toggle"}).on("click",(function(){o.hidden=!o.hidden}))}};Object.keys(a).forEach((function(n){(0,a[n])(o(n))}))}function E(){var n={positive:!1,time:"",wave:0},t=function(){var t=String(new Date).match(/\d{2}:\d{2}:\d{2}/);n.time=t&&t[0]||""};setInterval(t,1e3),t();var r=0;setInterval((function(){n.wave=a(r),n.positive=n.wave>=0,r+=1}),50);var l={monitor:function(t){var o=new e.default({container:t}),a=o.addFolder({title:"Number"});a.addMonitor(n,"wave",{label:"text"}),a.addMonitor(n,"wave",{bufferSize:10,label:"multiline"}),a.addMonitor(n,"wave",{label:"graph",max:1,min:-1,view:"graph"}),o.addFolder({title:"Boolean"}).addMonitor(n,"positive",{label:"positive"})},multiline:function(t){var o={params:""};new e.default({container:t}).addMonitor(o,"params",{lineCount:5,multiline:!0}).on("update",(function(){o.params=JSON.stringify(n,null,2)}))},buffersize:function(t){new e.default({container:t}).addMonitor(n,"wave",{bufferSize:10})},interval:function(t){new e.default({container:t}).addMonitor(n,"time",{interval:1e3})},graph:function(t){new e.default({container:t}).addMonitor(n,"wave",{max:1,min:-1,view:"graph"})}};Object.keys(l).forEach((function(n){(0,l[n])(o(n))}))}function F(){var n={interval:function(n){var t={log:"",size1:{min:16,max:48},size2:{min:16,max:48}},a=new e.default({container:o("interval",!0)});a.addMonitor(t,"log",{interval:0,label:"value",lineCount:4,multiline:!0});var r=new e.default({container:n});r.addInput(t,"size1"),r.addInput(t,"size2",{min:0,max:100,step:1}),r.on("change",(function(n){t.log=JSON.stringify(n.value,void 0,2),a.refresh()}))},camerakit:function(n){var t={flen:55,fnum:1.8,iso:100},o=new e.default({container:n});o.addInput(t,"flen",{plugin:"camerakit",view:"ring",series:0}),o.addInput(t,"fnum",{plugin:"camerakit",view:"ring",series:1,unit:{ticks:10,pixels:40,value:.2},wide:!0,min:1.4,step:.02}),o.addInput(t,"flen",{plugin:"camerakit",view:"ring",series:2}),o.addInput(t,"iso",{plugin:"camerakit",view:"wheel",amount:10,min:100,step:100})}};Object.keys(n).forEach((function(t){(0,n[t])(o(t))}))}function A(){var n={inputs:function(n){var t={factor:123,title:"hello",color:"#0f0"},o=new e.default({container:n});o.addInput(t,"factor"),o.addInput(t,"title"),o.addInput(t,"color")},inputparams:function(n){var t={percentage:50,theme:"dark"},o=new e.default({container:n});o.addInput(t,"percentage",{min:0,max:100,step:10}),o.addInput(t,"theme",{options:{Dark:"dark",Light:"light"}})},folders:function(n){var t={factor:123,text:"hello",size:16},o=new e.default({container:n});o.addInput(t,"factor");var a=o.addFolder({title:"Title",expanded:!0});a.addInput(t,"text"),a.addInput(t,"size",{min:8,max:100,step:1})},title:function(n){var t={factor:123,text:"hello",size:16},o=new e.default({container:n,title:"Parameters"});o.addInput(t,"factor");var a=o.addFolder({title:"Title",expanded:!0});a.addInput(t,"text"),a.addInput(t,"size",{min:8,max:100,step:1})},events:function(n){var t=o("eventsconsole");if(t){var a={log:"",size:16},r=new e.default({container:t});r.addMonitor(a,"log",{bufferSize:100,interval:0,label:"console",lineCount:5}),new e.default({container:n}).addInput(a,"size",{min:8,max:100,step:1}).on("change",(function(n){a.log="change: "+n.value,r.refresh()}))}},preset:function(n){var t=o("presetconsole");if(t){var a={factor:50,title:"hello",color:"#0f0",log:""},r=new e.default({container:t});r.addMonitor(a,"log",{interval:0,label:"preset",lineCount:5,multiline:!0});var l=new e.default({container:n});l.addInput(a,"factor",{min:0,max:100,step:1}),l.addInput(a,"title"),l.addInput(a,"color"),l.addSeparator(),l.addButton({title:"Export"}).on("click",(function(){var n=l.exportPreset();a.log=JSON.stringify(n,void 0,2),r.refresh()}))}},monitors:function(n){var t={signal:0},o=0;setInterval((function(){t.signal=a(o),o+=1}),50),new e.default({container:n}).addMonitor(t,"signal",{view:"graph",min:-1,max:1})}};Object.keys(n).forEach((function(t){(0,n[t])(o(t))}))}var N={default:function(){return{"base-background-color":"hsla(230, 7%, 20%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(230, 7%, 70%, 1)","button-background-color-active":"hsla(230, 7%, 85%, 1)","button-background-color-focus":"hsla(230, 7%, 80%, 1)","button-background-color-hover":"hsla(230, 7%, 75%, 1)","button-foreground-color":"hsla(230, 7%, 20%, 1)","folder-background-color":"hsla(230, 7%, 80%, 0.1)","folder-background-color-active":"hsla(230, 7%, 80%, 0.25)","folder-background-color-focus":"hsla(230, 7%, 80%, 0.2)","folder-background-color-hover":"hsla(230, 7%, 80%, 0.15)","folder-foreground-color":"hsla(230, 7%, 80%, 1)","input-background-color":"hsla(230, 7%, 80%, 0.1)","input-background-color-active":"hsla(230, 7%, 80%, 0.25)","input-background-color-focus":"hsla(230, 7%, 80%, 0.2)","input-background-color-hover":"hsla(230, 7%, 80%, 0.15)","input-foreground-color":"hsla(230, 7%, 80%, 1)","input-guide-color":"hsla(230, 7%, 0%, 0.2)","monitor-background-color":"hsla(230, 7%, 0%, 0.2)","monitor-foreground-color":"hsla(230, 7%, 80%, 0.7)","label-foreground-color":"hsla(230, 7%, 80%, 0.7)","separator-color":"hsla(230, 7%, 0%, 0.2)"}},jetblack:function(){return{"base-background-color":"hsla(0, 0%, 0%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(0, 0%, 70%, 1)","button-background-color-active":"hsla(0, 0%, 85%, 1)","button-background-color-focus":"hsla(0, 0%, 80%, 1)","button-background-color-hover":"hsla(0, 0%, 75%, 1)","button-foreground-color":"hsla(0, 0%, 0%, 1)","folder-background-color":"hsla(0, 0%, 10%, 1)","folder-background-color-active":"hsla(0, 0%, 25%, 1)","folder-background-color-focus":"hsla(0, 0%, 20%, 1)","folder-background-color-hover":"hsla(0, 0%, 15%, 1)","folder-foreground-color":"hsla(0, 0%, 50%, 1)","input-background-color":"hsla(0, 0%, 10%, 1)","input-background-color-active":"hsla(0, 0%, 25%, 1)","input-background-color-focus":"hsla(0, 0%, 20%, 1)","input-background-color-hover":"hsla(0, 0%, 15%, 1)","input-foreground-color":"hsla(0, 0%, 70%, 1)","input-guide-color":"hsla(0, 0%, 100%, 0.05)","monitor-background-color":"hsla(0, 0%, 8%, 1)","monitor-foreground-color":"hsla(0, 0%, 48%, 1)","label-foreground-color":"hsla(0, 0%, 50%, 1)","separator-color":"hsla(0, 0%, 10%, 1)"}},light:function(){return{"base-background-color":"hsla(230, 5%, 90%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.1)","button-background-color":"hsla(230, 7%, 75%, 1)","button-background-color-active":"hsla(230, 7%, 60%, 1)","button-background-color-focus":"hsla(230, 7%, 65%, 1)","button-background-color-hover":"hsla(230, 7%, 70%, 1)","button-foreground-color":"hsla(230, 10%, 30%, 1)","folder-background-color":"hsla(230, 15%, 30%, 0.2)","folder-background-color-active":"hsla(230, 15%, 30%, 0.32)","folder-background-color-focus":"hsla(230, 15%, 30%, 0.28)","folder-background-color-hover":"hsla(230, 15%, 30%, 0.24)","folder-foreground-color":"hsla(230, 10%, 30%, 1)","input-background-color":"hsla(230, 15%, 30%, 0.1)","input-background-color-active":"hsla(230, 15%, 30%, 0.22)","input-background-color-focus":"hsla(230, 15%, 30%, 0.18)","input-background-color-hover":"hsla(230, 15%, 30%, 0.14)","input-foreground-color":"hsla(230, 10%, 30%, 1)","input-guide-color":"hsla(230, 15%, 30%, 0.1)","monitor-background-color":"hsla(230, 15%, 30%, 0.1)","monitor-foreground-color":"hsla(230, 10%, 30%, 0.5)","label-foreground-color":"hsla(230, 10%, 30%, 0.7)","separator-color":"hsla(230, 15%, 30%, 0.1)"}},iceberg:function(){return{"base-background-color":"hsla(230, 20%, 11%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(230, 10%, 80%, 1)","button-background-color-active":"hsla(230, 10%, 95%, 1)","button-background-color-focus":"hsla(230, 10%, 90%, 1)","button-background-color-hover":"hsla(230, 10%, 85%, 1)","button-foreground-color":"hsla(230, 20%, 11%, 1)","folder-background-color":"hsla(230, 25%, 16%, 1)","folder-background-color-active":"hsla(230, 25%, 31%, 1)","folder-background-color-focus":"hsla(230, 25%, 26%, 1)","folder-background-color-hover":"hsla(230, 25%, 21%, 1)","folder-foreground-color":"hsla(230, 10%, 80%, 1)","input-background-color":"hsla(230, 20%, 8%, 1)","input-background-color-active":"hsla(230, 28%, 23%, 1)","input-background-color-focus":"hsla(230, 28%, 18%, 1)","input-background-color-hover":"hsla(230, 20%, 13%, 1)","input-foreground-color":"hsla(230, 10%, 80%, 1)","input-guide-color":"hsla(230, 10%, 80%, 5%)","monitor-background-color":"hsla(230, 20%, 8%, 1)","monitor-foreground-color":"hsla(230, 12%, 48%, 1)","label-foreground-color":"hsla(230, 12%, 48%, 1)","separator-color":"hsla(230, 20%, 8%, 1)"}},retro:function(){return{"base-background-color":"hsla(40, 3%, 90%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.3)","button-background-color":"hsla(40, 3%, 70%, 1)","button-background-color-active":"hsla(40, 3%, 55%, 1)","button-background-color-focus":"hsla(40, 3%, 60%, 1)","button-background-color-hover":"hsla(40, 3%, 65%, 1)","button-foreground-color":"hsla(40, 3%, 20%, 1)","folder-background-color":"hsla(40, 3%, 40%, 1)","folder-background-color-active":"hsla(34, 3%, 55%, 1)","folder-background-color-focus":"hsla(43, 3%, 50%, 1)","folder-background-color-hover":"hsla(43, 3%, 45%, 1)","folder-foreground-color":"hsla(40, 3%, 70%, 1)","input-background-color":"hsla(120, 3%, 20%, 1)","input-background-color-active":"hsla(120, 3%, 35%, 1)","input-background-color-focus":"hsla(120, 3%, 30%, 1)","input-background-color-hover":"hsla(120, 3%, 25%, 1)","input-foreground-color":"hsla(120, 40%, 60%, 1)","input-guide-color":"hsla(120, 40%, 60%, 0.1)","monitor-background-color":"hsla(120, 3%, 20%, 0.8)","monitor-foreground-color":"hsla(120, 40%, 60%, 0.8)","label-foreground-color":"hsla(40, 3%, 50%, 1)","separator-color":"hsla(40, 3%, 40%, 1)"}},translucent:function(){return{"base-background-color":"hsla(0, 0%, 10%, 0.8)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(0, 0%, 80%, 1)","button-background-color-active":"hsla(0, 0%, 100%, 1)","button-background-color-focus":"hsla(0, 0%, 95%, 1)","button-background-color-hover":"hsla(0, 0%, 85%, 1)","button-foreground-color":"hsla(0, 0%, 0%, 0.8)","folder-background-color":"hsla(0, 0%, 0%, 0.3)","folder-background-color-active":"hsla(0, 0%, 0%, 0.6)","folder-background-color-focus":"hsla(0, 0%, 0%, 0.5)","folder-background-color-hover":"hsla(0, 0%, 0%, 0.4)","folder-foreground-color":"hsla(0, 0%, 100%, 0.5)","input-background-color":"hsla(0, 0%, 0%, 0.3)","input-background-color-active":"hsla(0, 0%, 0%, 0.6)","input-background-color-focus":"hsla(0, 0%, 0%, 0.5)","input-background-color-hover":"hsla(0, 0%, 0%, 0.4)","input-foreground-color":"hsla(0, 0%, 100%, 0.5)","input-guide-color":"hsla(0, 0%, 100%, 0.1)","monitor-background-color":"hsla(0, 0%, 0%, 0.3)","monitor-foreground-color":"hsla(0, 0%, 100%, 0.3)","label-foreground-color":"hsla(0, 0%, 100%, 0.5)","separator-color":"hsla(0, 0%, 0%, 0.2)"}}};function C(n){return N[n]()}var j=[{name:"Base",expanded:!0,props:["base-background-color","base-shadow-color"],label:function(n){var t=n.match(/^base-(.+)-color$/);return t&&t[1]||n}},{name:"Input",props:["input-foreground-color","input-guide-color","input-background-color","input-background-color:state"],label:function(n){var t=n.match(/^input-(.+)-color(-.+)?$/);return t&&""+t[1]+(t[2]||"")||n}},{name:"Monitor",props:["monitor-foreground-color","monitor-background-color"],label:function(n){var t=n.match(/^monitor-(.+)-color(-.+)?$/);return t&&""+t[1]+(t[2]||"")||n}},{name:"Button",props:["button-foreground-color","button-background-color","button-background-color:state"],label:function(n){var t=n.match(/^button-(.+)-color(-.+)?$/);return t&&""+t[1]+(t[2]||"")||n}},{name:"Folder",props:["folder-foreground-color","folder-background-color","folder-background-color:state"],label:function(n){var t=n.match(/^folder-(.+)-color(-.+)?$/);return t&&""+t[1]+(t[2]||"")||n}},{name:"Misc",expanded:!0,props:["label-foreground-color","separator-color"],label:function(n){var t=n.match(/^(.+)-color(-.+)?$/);return t&&""+t[1]+(t[2]||"")||n}}];function z(n,t){return function(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;var o=Array(n),a=0;for(t=0;t<e;t++)for(var r=arguments[t],l=0,i=r.length;l<i;l++,a++)o[a]=r[l];return o}([n+" {"],Object.keys(t).reduce((function(n,e){var o=t[e];return[].concat(n,"  --tp-"+e+": "+o+";")}),[]),["}"]).join("\n")}function B(n,t,e){var o=document.querySelector(n);o&&(o.textContent=["\x3c!-- "+e+" --\x3e","<style>",z(":root",t),"</style>"].join("\n"),hljs.highlightBlock(o))}function O(n){var t=n.styleElem,e=n.theme;t.textContent=z("*[data-preview-css]",e),B("*[data-preview-code]",e,"Append this element into your head element to apply the theme")}function q(n){var t={checkbox:!0,color:"rgba(0, 0, 0, 0)",list:"item",point2d:{x:0,y:0},slider:32,text:"text",monitor:[0,1,2,3].map((function(){return Math.random().toFixed(2)})).join("\n")},o=new e.default({container:n,title:"Preview"});return o.addInput(t,"text"),o.addInput(t,"slider",{max:64,min:0}),o.addInput(t,"list",{options:{item:"item"}}),o.addInput(t,"checkbox"),o.addButton({title:"button"}),o.addSeparator(),o.addMonitor(t,"monitor",{interval:0,multiline:!0}),o.addFolder({title:"folder"}).addInput(t,"color"),o.addFolder({title:"folder"}).addInput(t,"point2d"),o}function $(){var n=document.createElement("style");document.head.appendChild(n);var t=o("controller"),a=o("preview");if(t&&a){var r=C("translucent");B("*[data-exampleCss]",r,"Example theme: Translucent");var l=function(n,t){var o=new e.default({container:n,title:"Panepaint"}),a={preset:"Select..."};return o.addInput(a,"preset",{options:{"Select...":"",Default:"default",Iceberg:"iceberg",Jetblack:"jetblack",Light:"light",Retro:"retro",Translucent:"translucent"}}).on("change",(function(n){if(""!==n.value){var e=C(n.value);Object.keys(e).forEach((function(n){var o=n;t[o]=e[o]})),a.preset="",o.refresh()}})),o.addButton({label:"bg-image",title:"Shuffle"}).on("click",(function(){var n=document.querySelector(".paint_bgImage");if(n){var t=(new Date).getTime();n.style.backgroundImage="url(https://source.unsplash.com/collection/91620523?date="+t+")",Array.prototype.slice.call(document.querySelectorAll(".paint .photoCredit")).forEach((function(n,t){n.style.visibility=0===t?"visible":"hidden"}))}})),j.forEach((function(n){var e=o.addFolder({expanded:!!n.expanded,title:n.name});n.props.forEach((function(a){var r=a.match(/(.+):state$/);if(r){var l=e.addFolder({title:"State"});l.addButton({title:"Autofill"}).on("click",(function(){var n=k(t[r[1]]).getComponents("hsl"),e=n[2]>50?-1:1;t[r[1]+"-hover"]=w(new h([n[0],n[1],n[2]+5*e,n[3]],"hsl")),t[r[1]+"-focus"]=w(new h([n[0],n[1],n[2]+10*e,n[3]],"hsl")),t[r[1]+"-active"]=w(new h([n[0],n[1],n[2]+15*e,n[3]],"hsl")),o.refresh()}));var i=r[1];["active","focus","hover"].forEach((function(e){var o=[i,e].join("-");l.addInput(t,o,{label:n.label(o).replace("background","bg").replace("foreground","fg")})}))}else e.addInput(t,a,{label:n.label(a).replace("background","bg").replace("foreground","fg")})}))})),o}(t,r);O({styleElem:n,theme:r}),l.on("change",(function(){O({styleElem:n,theme:r})})),q(a);var i={header:function(n){n&&q(n)}};Object.keys(i).forEach((function(n){(0,i[n])(o(n))}))}}function P(){var n={header:function(n){var t=new e.default({container:n}).addFolder({title:"Folder"});t.addButton({title:"Button"}),t.addSeparator(),t.addButton({label:"label",title:"Button"}),t.addFolder({title:"Subfolder"}).addButton({title:"Button"})},folder:function(n){var t={acceleration:0,randomness:0,speed:0},o=new e.default({container:n});o.addFolder({title:"Basic"}).addInput(t,"speed");var a=o.addFolder({expanded:!1,title:"Advanced"});a.addInput(t,"acceleration"),a.addInput(t,"randomness")},panetitle:function(n){var t={bounce:.5,gravity:.01,speed:.1},o=new e.default({container:n,title:"Parameters"});o.addInput(t,"speed",{max:1,min:0});var a=o.addFolder({title:"Advanced"});a.addInput(t,"gravity",{max:1,min:0}),a.addInput(t,"bounce",{max:1,min:0})},button:function(n){var t={count:"0"},a=o("button",!0),r=new e.default({container:a});r.addMonitor(t,"count",{interval:0}),new e.default({container:n}).addButton({label:"counter",title:"Increment"}).on("click",(function(){t.count=String(parseInt(t.count,10)+1),r.refresh()}))},separator:function(n){var t=new e.default({container:n});t.addButton({title:"Previous"}),t.addButton({title:"Next"}),t.addSeparator(),t.addButton({title:"Reset"})}};Object.keys(n).forEach((function(t){(0,n[t])(o(t))}))}var T,L,R,J=function(){function n(n){this.onWindowScroll_=this.onWindowScroll_.bind(this),this.elem_=n,window.addEventListener("scroll",this.onWindowScroll_)}return n.prototype.onWindowScroll_=function(){var n=.5*window.scrollY;this.elem_.style.transform="rotate("+n+"deg)"},n}(),W=function(){function n(){this.routes_=[]}return n.prototype.add=function(n,t){this.routes_.push({init:t,pathname:n})},n.prototype.route=function(n){this.routes_.forEach((function(t){t.pathname.test(n)&&t.init()}))},n}(),D=function(){function n(n){this.expanded_=!1,this.onDocumentClick_=this.onDocumentClick_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onWindowHashChange_=this.onWindowHashChange_.bind(this),this.onWindowScroll_=this.onWindowScroll_.bind(this),this.buttonElem_=n.buttonElement,this.menuElem_=n.menuElement,this.menuElem_.classList.add("menu-loaded"),document.addEventListener("click",this.onDocumentClick_),window.addEventListener("hashchange",this.onWindowHashChange_),window.addEventListener("scroll",this.onWindowScroll_),this.buttonElem_.addEventListener("click",this.onButtonClick_),this.updateActiveItem_()}return Object.defineProperty(n.prototype,"expanded",{get:function(){return this.expanded_},set:function(n){this.expanded_=n,this.expanded_?this.menuElem_.classList.add("menu-expanded"):this.menuElem_.classList.remove("menu-expanded")},enumerable:!1,configurable:!0}),n.prototype.updateActiveItem_=function(){var n=["menuItem_anchor","submenuItem_anchor"];n.forEach((function(n){var t=n+"-active";Array.prototype.slice.call(document.querySelectorAll("."+t)).forEach((function(n){n.classList.remove(t)}))})),n.forEach((function(n){var t=location.pathname.split("/"),e=t[t.length-1]+location.hash,o=document.querySelector("."+n+"[href='"+e+"']");o&&o.classList.add(n+"-active")}))},n.prototype.onDocumentClick_=function(n){var t=n.target;this.menuElem_.contains(t)||t===this.buttonElem_||this.buttonElem_.contains(t)||this.expanded&&(n.preventDefault(),n.stopImmediatePropagation(),this.expanded=!1)},n.prototype.onWindowScroll_=function(){this.expanded=!1},n.prototype.onWindowHashChange_=function(){this.updateActiveItem_()},n.prototype.onButtonClick_=function(){this.expanded=!this.expanded},n}();(R=new W).add(/^(\/tweakpane)?\/getting-started\.html$/,r),R.add(/^(\/tweakpane)?\/$/,_),R.add(/^(\/tweakpane)?\/input\.html$/,S),R.add(/^(\/tweakpane)?\/misc\.html$/,M),R.add(/^(\/tweakpane)?\/monitor\.html$/,E),R.add(/^(\/tweakpane)?\/theming\.html$/,$),R.add(/^(\/tweakpane)?\/plugins\.html$/,F),R.add(/^(\/tweakpane)?\/quick-tour\.html$/,A),R.add(/^(\/tweakpane)?\/ui-components\.html$/,P),R.route(location.pathname),document.querySelectorAll(".logo_symbol").forEach((function(n){new J(n)})),T=document.getElementById("spMenuButton"),L=document.querySelector(".menu"),T&&L&&new D({buttonElement:T,menuElement:L}),hljs.initHighlightingOnLoad()}));
