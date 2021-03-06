!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(require("tweakpane")):"function"==typeof define&&define.amd?define(["tweakpane"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).Tweakpane)}(this,(function(t){"use strict";function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=n(t);function o(t,n){void 0===n&&(n=!1);var e="*[data-pane-"+(t+(n?"console":""))+"]",o=document.querySelector(e);if(!o)throw new Error("container not found: "+e);return o}function a(t){var n=.02*t;return 12/Math.PI*(Math.sin(1*n*Math.PI)+Math.sin(3*n*Math.PI)/3+Math.sin(5*n*Math.PI)/5)*.25}function r(){var t={hello:function(t){new e.default({container:t})}};Object.keys(t).forEach((function(n){(0,t[n])(o(n))}))}function l(t){return function(n){return n.toFixed(Math.max(Math.min(t,20),0))}}function i(t,n,e,o,a){return o+(t-n)/(e-n)*(a-o)}function u(t,n,e){return Math.min(Math.max(t,n),e)}function d(t,n){return(t%n+n)%n}function c(t,n,e){var o=u(t/255,0,1),a=u(n/255,0,1),r=u(e/255,0,1),l=Math.max(o,a,r),i=Math.min(o,a,r),d=l-i,c=0,s=0,f=(i+l)/2;return 0!==d&&(s=f>.5?d/(2-i-l):d/(l+i),c=(c=o===l?(a-r)/d:a===l?2+(r-o)/d:4+(o-a)/d)/6+(c<0?1:0)),[360*c,100*s,100*f]}function s(t,n,e){var o,a,r,l,i,d,c,s,f,h=(t%360+360)%360,p=u(n/100,0,1),b=u(e/100,0,1),g=(1-Math.abs(2*b-1))*p,m=g*(1-Math.abs(h/60%2-1)),v=b-g/2;return h>=0&&h<60?(c=(o=[g,m,0])[0],s=o[1],f=o[2]):h>=60&&h<120?(c=(a=[m,g,0])[0],s=a[1],f=a[2]):h>=120&&h<180?(c=(r=[0,g,m])[0],s=r[1],f=r[2]):h>=180&&h<240?(c=(l=[0,m,g])[0],s=l[1],f=l[2]):h>=240&&h<300?(c=(i=[m,0,g])[0],s=i[1],f=i[2]):(c=(d=[g,0,m])[0],s=d[1],f=d[2]),[255*(c+v),255*(s+v),255*(f+v)]}function f(t,n,e){var o=u(t/255,0,1),a=u(n/255,0,1),r=u(e/255,0,1),l=Math.max(o,a,r),i=l-Math.min(o,a,r);return[0===i?0:l===o?((a-r)/i%6+6)%6*60:l===a?60*((r-o)/i+2):60*((o-a)/i+4),100*(0===l?0:i/l),100*l]}function h(t,n,e){var o,a,r,l,i,c,s,f,h,p=d(t,360),b=u(n/100,0,1),g=u(e/100,0,1),m=g*b,v=m*(1-Math.abs(p/60%2-1)),k=g-m;return p>=0&&p<60?(s=(o=[m,v,0])[0],f=o[1],h=o[2]):p>=60&&p<120?(s=(a=[v,m,0])[0],f=a[1],h=a[2]):p>=120&&p<180?(s=(r=[0,m,v])[0],f=r[1],h=r[2]):p>=180&&p<240?(s=(l=[0,v,m])[0],f=l[1],h=l[2]):p>=240&&p<300?(s=(i=[v,0,m])[0],f=i[1],h=i[2]):(s=(c=[m,0,v])[0],f=c[1],h=c[2]),[255*(s+k),255*(f+k),255*(h+k)]}var p={hsl:{hsl:function(t,n,e){return[t,n,e]},hsv:function(t,n,e){var o=s(t,n,e);return f(o[0],o[1],o[2])},rgb:s},hsv:{hsl:function(t,n,e){var o=h(t,n,e);return c(o[0],o[1],o[2])},hsv:function(t,n,e){return[t,n,e]},rgb:h},rgb:{hsl:c,hsv:f,rgb:function(t,n,e){return[t,n,e]}}};var b={hsl:function(t){var n;return[d(t[0],360),u(t[1],0,100),u(t[2],0,100),u(null!==(n=t[3])&&void 0!==n?n:1,0,1)]},hsv:function(t){var n;return[d(t[0],360),u(t[1],0,100),u(t[2],0,100),u(null!==(n=t[3])&&void 0!==n?n:1,0,1)]},rgb:function(t){var n;return[u(t[0],0,255),u(t[1],0,255),u(t[2],0,255),u(null!==(n=t[3])&&void 0!==n?n:1,0,1)]}};function g(t,n){return"object"==typeof t&&null!=t&&(n in t&&"number"==typeof t[n])}var m=function(){function t(t,n){this.mode_=n,this.comps_=b[n](t)}return t.black=function(){return new t([0,0,0],"rgb")},t.fromObject=function(n){return new t("a"in n?[n.r,n.g,n.b,n.a]:[n.r,n.g,n.b],"rgb")},t.toRgbaObject=function(t){return t.toRgbaObject()},t.isRgbColorObject=function(t){return g(t,"r")&&g(t,"g")&&g(t,"b")},t.isRgbaColorObject=function(t){return this.isRgbColorObject(t)&&g(t,"a")},t.isColorObject=function(t){return this.isRgbColorObject(t)},t.equals=function(t,n){if(t.mode_!==n.mode_)return!1;for(var e=t.comps_,o=n.comps_,a=0;a<e.length;a++)if(e[a]!==o[a])return!1;return!0},Object.defineProperty(t.prototype,"mode",{get:function(){return this.mode_},enumerable:!1,configurable:!0}),t.prototype.getComponents=function(t){return function(t,n){return[t[0],t[1],t[2],n]}((r=this.comps_,n=[r[0],r[1],r[2]],e=this.mode_,o=t||this.mode_,(a=p[e])[o].apply(a,n)),this.comps_[3]);var n,e,o,a,r},t.prototype.toRgbaObject=function(){var t=this.getComponents("rgb");return{r:t[0],g:t[1],b:t[2],a:t[3]}},t}();function v(t,n){var e=t.match(/^(.+)%$/);return e?Math.min(.01*parseFloat(e[1])*n,n):Math.min(parseFloat(t),n)}var k={deg:function(t){return t},grad:function(t){return 360*t/400},rad:function(t){return 360*t/(2*Math.PI)},turn:function(t){return 360*t}};function w(t){var n=t.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!n)return parseFloat(t);var e=parseFloat(n[1]),o=n[2];return k[o](e)}var x={"func.rgb":function(t){var n=t.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;var e=[v(n[1],255),v(n[2],255),v(n[3],255)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:new m(e,"rgb")},"func.rgba":function(t){var n=t.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;var e=[v(n[1],255),v(n[2],255),v(n[3],255),v(n[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:new m(e,"rgb")},"func.hsl":function(t){var n=t.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;var e=[w(n[1]),v(n[2],100),v(n[3],100)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:new m(e,"hsl")},"func.hsla":function(t){var n=t.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!n)return null;var e=[w(n[1]),v(n[2],100),v(n[3],100),v(n[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:new m(e,"hsl")},"hex.rgb":function(t){var n=t.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(n)return new m([parseInt(n[1]+n[1],16),parseInt(n[2]+n[2],16),parseInt(n[3]+n[3],16)],"rgb");var e=t.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?new m([parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)],"rgb"):null},"hex.rgba":function(t){var n=t.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(n)return new m([parseInt(n[1]+n[1],16),parseInt(n[2]+n[2],16),parseInt(n[3]+n[3],16),i(parseInt(n[4]+n[4],16),0,255,0,1)],"rgb");var e=t.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?new m([parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),i(parseInt(e[4],16),0,255,0,1)],"rgb"):null}};var I=function(t){var n=function(t){return Object.keys(x).reduce((function(n,e){return n||((0,x[e])(t)?e:null)}),null)}(t);return n?x[n](t):null};function y(t){if("string"==typeof t){var n=I(t);if(n)return n}return m.black()}function _(t){var n=l(2),e=l(0);return"rgba("+t.getComponents("rgb").map((function(t,o){return(3===o?n:e)(t)})).join(", ")+")"}var S="http://www.w3.org/2000/svg";var F=function(){function t(t){this.x=0,this.y=0,this.en=0,this.element=document.createElementNS(S,"circle"),this.env_=t}return t.prototype.update=function(){this.element.setAttributeNS(null,"cx",this.x+"px"),this.element.setAttributeNS(null,"cy",this.y+"px");var t=(1-Math.pow(.9,this.en))*this.env_.maxSize;this.element.setAttributeNS(null,"r",t+"px")},t}(),E=function(){function t(t,n){var e=this;this.height_=0,this.width_=0,this.onTick_=this.onTick_.bind(this),this.elem_=t,this.env_=n,this.dots_=[],this.t_=0;var o=document.createElementNS(S,"svg");this.elem_.appendChild(o),this.svgElem_=o,this.dotsElem_=document.createElementNS(S,"g"),this.svgElem_.appendChild(this.dotsElem_),window.addEventListener("resize",(function(){e.resize()})),this.resize(),this.onTick_()}return t.prototype.reset=function(){var t=this.width_,n=this.height_,e=this.env_;this.dots_=[];var o=e.spacing,a=o*Math.sqrt(3)/2,r=Math.ceil(t/o),l=Math.ceil(n/a),i=document.createElementNS(S,"g");i.setAttributeNS(null,"fill",e.color);for(var u=0;u<=l;u++)for(var d=0;d<=r;d++){var c=new F(e);c.en=0,c.x=(d+(u%2==0?0:.5))*o,c.y=u*a,i.appendChild(c.element),this.dots_.push(c)}this.svgElem_.appendChild(i),this.svgElem_.removeChild(this.dotsElem_),this.dotsElem_=i},t.prototype.resize=function(){var t=this.elem_.getBoundingClientRect();this.height_=t.height,this.width_=t.width,this.reset()},t.prototype.onTick_=function(){var t=this.width_,n=this.height_,e=this.env_;this.dots_.forEach((function(t){t.en=0})),this.t_-=e.speed;for(var o=this.t_,a=function(a){var l,i,u=(i=0)+(a-(l=0))/(100-l)*(1-i),d=u*t+Math.sin(u*e.freq.x+o)*e.amp.x*t,c=Math.sin(o+u*e.freq.y),s=n/2+c*e.amp.y*n;r.dots_.forEach((function(t){var n,o,a,r,l=(n=t.x,o=t.y,a=d-n,r=s-o,Math.sqrt(a*a+r*r));t.en+=Math.pow(e.range,.1*l)}))},r=this,l=0;l<=100;l++)a(l);this.dots_.forEach((function(t){t.update()})),requestAnimationFrame(this.onTick_)},t}();function M(){var t={amp:{x:.1,y:.5},color:"#e4e4e7",freq:{x:12.57,y:6.28},maxSize:64,range:.8,spacing:24,speed:.02,title:"Tweakpane"},n={atmos:{amp:{x:.1,y:.53},color:"#e4e4e7",freq:{x:45,y:16},maxSize:128,range:.79,spacing:24,speed:.02,title:"Tweakpane"},bubble:{amp:{x:.3,y:.51},color:"#f2f2f2",freq:{x:64,y:32},maxSize:128,range:.65,spacing:48,speed:.02,title:"Tweakpane"},cloud:{amp:{x:.07,y:0},color:"#e4e4e7",freq:{x:22.25,y:0},maxSize:105,range:.63,spacing:48,speed:.02,title:"Tweakpane"}},a={presetId:"",presetJson:""},r=document.querySelector(".pageHeader_sketchContainer");if(r){var l=new E(r,t),i={index:function(o){var r=new e.default({container:o,title:"Tweakpane"});r.addInput(t,"title").on("change",(function(t){var n=document.querySelector(".pageHeader_title");n&&(n.textContent=t.value)})),r.addInput(t,"color").on("change",(function(t){var n=document.querySelector(".pageHeader");if(n){var e=y(t.value).getComponents("hsl");e[0]+=30,e[1]*=1.5,e[2]*=1.06;var o=new m(e,"hsl");n.style.backgroundColor=_(o)}})),r.addSeparator(),r.addInput(t,"spacing",{max:48,min:24}),r.addInput(t,"range",{max:1,min:0}),r.addInput(t,"maxSize",{max:128,min:5}),r.addInput(t,"freq",{x:{max:64,min:0},y:{max:32,min:0}}),r.addInput(t,"amp",{x:{max:.3,min:0},y:{max:1,min:0}});var i=r.addFolder({expanded:!1,title:"Preset"});i.addInput(a,"presetId",{label:"preset",options:{"Import...":"",Atmos:"atmos",Bubble:"bubble",Cloud:"cloud"}}).on("change",(function(t){var e=n[t.value];e&&(a.presetId="",r.importPreset(e))})),i.addMonitor(a,"presetJson",{label:"data",multiline:!0}),r.on("change",(function(){l.reset(),a.presetJson=JSON.stringify(r.exportPreset(),null,2)})),r.on("fold",(function(){l.resize(),setTimeout((function(){l.resize()}),200)}))}};Object.keys(i).forEach((function(t){(0,i[t])(o(t))})),l.resize()}}function A(){var t={input:function(t){var n={b:!0,c:"#ff8800",n:50,v2:{x:12,y:34},v3:{x:12,y:34,z:56},s:"string"},o=new e.default({container:t}),a=o.addFolder({title:"Number"});a.addInput(n,"n",{label:"text"}),a.addInput(n,"n",{label:"slider",max:100,min:0}),a.addInput(n,"n",{label:"list",options:{low:0,medium:50,high:100}});var r=o.addFolder({title:"String"});r.addInput(n,"s",{label:"text"}),r.addInput(n,"s",{label:"list",options:{dark:"Dark",light:"Light"}}),o.addFolder({title:"Boolean"}).addInput(n,"b",{label:"checkbox"});var l=o.addFolder({title:"Misc"});l.addInput(n,"c",{label:"color"}),l.addInput(n,"v2",{label:"2d"}),l.addInput(n,"v3",{label:"3d"})},numbertext:function(t){new e.default({container:t}).addInput({value:50},"value",{label:"text"})},slider:function(t){new e.default({container:t}).addInput({value:50},"value",{label:"slider",max:100,min:0})},step:function(t){var n={speed:.5,count:10},o=new e.default({container:t});o.addInput(n,"speed",{step:.1}),o.addInput(n,"count",{label:"count",max:100,min:0,step:10})},numberlist:function(t){var n={quality:0},a=o("numberlist",!0),r={json:""},l=new e.default({container:a});l.addMonitor(r,"json",{interval:0,label:"PARAMS",multiline:!0});var i=function(){r.json=JSON.stringify(n,void 0,2),l.refresh()};new e.default({container:t}).addInput(n,"quality",{options:{low:0,medium:50,high:100}}).on("change",(function(){i()})),i()},stringtext:function(t){new e.default({container:t}).addInput({value:"hello, world"},"value",{label:"message"})},stringlist:function(t){var n={theme:""},a=o("stringlist",!0),r={json:""},l=new e.default({container:a});l.addMonitor(r,"json",{interval:0,label:"PARAMS",multiline:!0});var i=function(){r.json=JSON.stringify(n,void 0,2),l.refresh()};new e.default({container:t}).addInput(n,"theme",{options:{none:"",dark:"dark-theme.json",light:"light-theme.json"}}).on("change",(function(){i()})),i()},checkbox:function(t){new e.default({container:t}).addInput({value:!0},"value",{label:"hidden"})},objectcolor:function(t){var n={background:{r:255,g:127,b:0},tint:{r:255,g:255,b:0,a:.5}},o=new e.default({container:t});o.addInput(n,"background"),o.addInput(n,"tint")},stringcolor:function(t){var n={primary:"#8df",secondary:"rgb(255, 136, 221)"},o=new e.default({container:t});o.addInput(n,"primary"),o.addInput(n,"secondary")},numbercolor:function(t){var n={background:35071,tint:16711748},o=new e.default({container:t});o.addInput(n,"background",{input:"color"}),o.addInput(n,"tint",{input:"color.rgba"})},inputstring:function(t){new e.default({container:t}).addInput({hex:"#0088ff"},"hex",{input:"string"})},point2d:function(t){new e.default({container:t}).addInput({value:{x:50,y:25}},"value",{label:"offset"})},point2dparams:function(t){new e.default({container:t}).addInput({value:{x:20,y:30}},"value",{label:"offset",x:{step:20},y:{min:0,max:100}})},point2dinvertedy:function(t){new e.default({container:t}).addInput({value:{x:50,y:50}},"value",{label:"offset",y:{inverted:!0}})},point3d:function(t){var n={camera:{x:0,y:20,z:-10},source:{x:0,y:0,z:0}},o=new e.default({container:t});o.addInput(n,"source"),o.addInput(n,"camera",{y:{step:10},z:{max:0}})}};Object.keys(t).forEach((function(n){(0,t[n])(o(n))}))}function N(){var t={color:"#ff8000",name:"exported json",size:10},n={log:""},a={misc:function(t){var n=new e.default({container:t,title:"Global title"});n.addInput({value:0},"value",{label:"custom label"});var o=n.addFolder({title:"Folder"});o.addButton({title:"Button1"}),o.addButton({title:"Button2"}),o.addSeparator(),o.addButton({title:"Button3"})},event:function(t){var n=o("eventconsole");if(n){var a={log:"",value:0},r=new e.default({container:n});r.addMonitor(a,"log",{bufferSize:10,interval:0,label:"console",lineCount:5}),new e.default({container:t}).addInput(a,"value",{max:100,min:0}).on("change",(function(t){a.log=t.value.toFixed(2),r.refresh()}))}},globalevent:function(t){var n=o("globaleventconsole");if(n){var a={boolean:!0,color:"#0080ff",number:0,point2d:{x:0,y:0},string:"text",log:""},r=new e.default({container:n});r.addMonitor(a,"log",{bufferSize:10,interval:0,label:"console",lineCount:5});var l=new e.default({container:t});l.addInput(a,"boolean"),l.addInput(a,"color"),l.addInput(a,"number",{max:100,min:0}),l.addInput(a,"point2d"),l.addInput(a,"string"),l.on("change",(function(t){var n="number"==typeof t.value?t.value.toFixed(2):JSON.stringify(t.value);a.log="changed: "+n,r.refresh()}))}},export:function(a){var r=o("exportconsole");if(r){new e.default({container:r}).addMonitor(n,"log",{label:"preset",lineCount:5,multiline:!0});var l=new e.default({container:a});l.addInput(t,"name"),l.addInput(t,"size",{max:100,min:0}),l.addInput(t,"color");var i=function(){var t=l.exportPreset();n.log=JSON.stringify(t,null,2)};l.on("change",i),i()}},import:function(a){var r=o("importconsole");if(r){new e.default({container:r}).addMonitor(n,"log",{label:"preset",lineCount:5,multiline:!0});var l={color:"#0080ff",log:"",name:"tweakpane",size:50},i=new e.default({container:a});i.addButton({title:"Import"}).on("click",(function(){i.importPreset(t)})),i.addSeparator(),i.addInput(l,"name"),i.addInput(l,"size"),i.addInput(l,"color")}},presetkey:function(t){var n=o("presetkeyconsole");if(n){var a={foo:{speed:1/3},bar:{speed:2/3},preset:""},r=new e.default({container:n});r.addMonitor(a,"preset",{interval:0,label:"preset",lineCount:4,multiline:!0});var l=new e.default({container:t});l.addInput(a.foo,"speed",{max:1,min:0}),l.addInput(a.bar,"speed",{max:1,min:0,presetKey:"speed2"});var i=function(){var t=l.exportPreset();a.preset=JSON.stringify(t,null,2),r.refresh()};l.on("change",i),i()}},roottitle:function(t){var n={bounce:.5,gravity:.01,speed:.1},o=new e.default({container:t,title:"Parameters"});o.addInput(n,"speed",{max:1,min:0});var a=o.addFolder({title:"Advanced"});a.addInput(n,"gravity",{max:1,min:0}),a.addInput(n,"bounce",{max:1,min:0})},label:function(t){var n={initSpd:0,size:30},o=new e.default({container:t});o.addInput(n,"initSpd",{label:"Initial speed"}),o.addInput(n,"size",{label:"Force field\nradius"})},insert:function(t){var n=new e.default({container:t});n.addButton({title:"Run"}),n.addButton({title:"Stop"}),n.addButton({title:"**Reset**",index:1})},hidden:function(t){var n=new e.default({container:t}),o=n.addFolder({title:"Advanced"});o.addInput({seed:.1},"seed"),n.addButton({index:0,title:"Toggle"}).on("click",(function(){o.hidden=!o.hidden}))}};Object.keys(a).forEach((function(t){(0,a[t])(o(t))}))}function C(){var t={positive:!1,time:"",wave:0},n=function(){var n=String(new Date).match(/\d{2}:\d{2}:\d{2}/);t.time=n&&n[0]||""};setInterval(n,1e3),n();var r=0;setInterval((function(){t.wave=a(r),t.positive=t.wave>=0,r+=1}),50);var l={monitor:function(n){var o=new e.default({container:n}),a=o.addFolder({title:"Number"});a.addMonitor(t,"wave",{label:"text"}),a.addMonitor(t,"wave",{bufferSize:10,label:"multiline"}),a.addMonitor(t,"wave",{label:"graph",max:1,min:-1,view:"graph"}),o.addFolder({title:"Boolean"}).addMonitor(t,"positive",{label:"positive"})},multiline:function(n){var o={params:""};new e.default({container:n}).addMonitor(o,"params",{lineCount:5,multiline:!0}).on("update",(function(){o.params=JSON.stringify(t,null,2)}))},buffersize:function(n){new e.default({container:n}).addMonitor(t,"wave",{bufferSize:10})},interval:function(n){new e.default({container:n}).addMonitor(t,"time",{interval:1e3})},graph:function(n){new e.default({container:n}).addMonitor(t,"wave",{max:1,min:-1,view:"graph"})}};Object.keys(l).forEach((function(t){(0,l[t])(o(t))}))}function j(){var t={inputs:function(t){var n={factor:123,title:"hello",color:"#0f0"},o=new e.default({container:t});o.addInput(n,"factor"),o.addInput(n,"title"),o.addInput(n,"color")},inputparams:function(t){var n={percentage:50,theme:"dark"},o=new e.default({container:t});o.addInput(n,"percentage",{min:0,max:100,step:10}),o.addInput(n,"theme",{options:{Dark:"dark",Light:"light"}})},folders:function(t){var n={factor:123,text:"hello",size:16},o=new e.default({container:t});o.addInput(n,"factor");var a=o.addFolder({title:"Title",expanded:!0});a.addInput(n,"text"),a.addInput(n,"size",{min:8,max:100,step:1})},title:function(t){var n={factor:123,text:"hello",size:16},o=new e.default({container:t,title:"Parameters"});o.addInput(n,"factor");var a=o.addFolder({title:"Title",expanded:!0});a.addInput(n,"text"),a.addInput(n,"size",{min:8,max:100,step:1})},events:function(t){var n=o("eventsconsole");if(n){var a={log:"",size:16},r=new e.default({container:n});r.addMonitor(a,"log",{bufferSize:100,interval:0,label:"console",lineCount:5}),new e.default({container:t}).addInput(a,"size",{min:8,max:100,step:1}).on("change",(function(t){a.log="change: "+t.value,r.refresh()}))}},preset:function(t){var n=o("presetconsole");if(n){var a={factor:50,title:"hello",color:"#0f0",log:""},r=new e.default({container:n});r.addMonitor(a,"log",{interval:0,label:"preset",lineCount:5,multiline:!0});var l=new e.default({container:t});l.addInput(a,"factor",{min:0,max:100,step:1}),l.addInput(a,"title"),l.addInput(a,"color"),l.addSeparator(),l.addButton({title:"Export"}).on("click",(function(){var t=l.exportPreset();a.log=JSON.stringify(t,void 0,2),r.refresh()}))}},monitors:function(t){var n={signal:0},o=0;setInterval((function(){n.signal=a(o),o+=1}),50),new e.default({container:t}).addMonitor(n,"signal",{view:"graph",min:-1,max:1})}};Object.keys(t).forEach((function(n){(0,t[n])(o(n))}))}function B(t,n){for(var e=0,o=n.length,a=t.length;e<o;e++,a++)t[a]=n[e];return t}var z={default:function(){return{"base-background-color":"hsla(230, 7%, 20%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(230, 7%, 70%, 1)","button-background-color-active":"hsla(230, 7%, 85%, 1)","button-background-color-focus":"hsla(230, 7%, 80%, 1)","button-background-color-hover":"hsla(230, 7%, 75%, 1)","button-foreground-color":"hsla(230, 7%, 20%, 1)","folder-background-color":"hsla(230, 7%, 80%, 0.1)","folder-background-color-active":"hsla(230, 7%, 80%, 0.25)","folder-background-color-focus":"hsla(230, 7%, 80%, 0.2)","folder-background-color-hover":"hsla(230, 7%, 80%, 0.15)","folder-foreground-color":"hsla(230, 7%, 80%, 1)","input-background-color":"hsla(230, 7%, 80%, 0.1)","input-background-color-active":"hsla(230, 7%, 80%, 0.25)","input-background-color-focus":"hsla(230, 7%, 80%, 0.2)","input-background-color-hover":"hsla(230, 7%, 80%, 0.15)","input-foreground-color":"hsla(230, 7%, 80%, 1)","input-guide-color":"hsla(230, 7%, 0%, 0.2)","monitor-background-color":"hsla(230, 7%, 0%, 0.2)","monitor-foreground-color":"hsla(230, 7%, 80%, 0.7)","label-foreground-color":"hsla(230, 7%, 80%, 0.7)","separator-color":"hsla(230, 7%, 0%, 0.2)"}},jetblack:function(){return{"base-background-color":"hsla(0, 0%, 0%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(0, 0%, 70%, 1)","button-background-color-active":"hsla(0, 0%, 85%, 1)","button-background-color-focus":"hsla(0, 0%, 80%, 1)","button-background-color-hover":"hsla(0, 0%, 75%, 1)","button-foreground-color":"hsla(0, 0%, 0%, 1)","folder-background-color":"hsla(0, 0%, 10%, 1)","folder-background-color-active":"hsla(0, 0%, 25%, 1)","folder-background-color-focus":"hsla(0, 0%, 20%, 1)","folder-background-color-hover":"hsla(0, 0%, 15%, 1)","folder-foreground-color":"hsla(0, 0%, 50%, 1)","input-background-color":"hsla(0, 0%, 10%, 1)","input-background-color-active":"hsla(0, 0%, 25%, 1)","input-background-color-focus":"hsla(0, 0%, 20%, 1)","input-background-color-hover":"hsla(0, 0%, 15%, 1)","input-foreground-color":"hsla(0, 0%, 70%, 1)","input-guide-color":"hsla(0, 0%, 100%, 0.05)","monitor-background-color":"hsla(0, 0%, 8%, 1)","monitor-foreground-color":"hsla(0, 0%, 48%, 1)","label-foreground-color":"hsla(0, 0%, 50%, 1)","separator-color":"hsla(0, 0%, 10%, 1)"}},light:function(){return{"base-background-color":"hsla(230, 5%, 90%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.1)","button-background-color":"hsla(230, 7%, 75%, 1)","button-background-color-active":"hsla(230, 7%, 60%, 1)","button-background-color-focus":"hsla(230, 7%, 65%, 1)","button-background-color-hover":"hsla(230, 7%, 70%, 1)","button-foreground-color":"hsla(230, 10%, 30%, 1)","folder-background-color":"hsla(230, 15%, 30%, 0.2)","folder-background-color-active":"hsla(230, 15%, 30%, 0.32)","folder-background-color-focus":"hsla(230, 15%, 30%, 0.28)","folder-background-color-hover":"hsla(230, 15%, 30%, 0.24)","folder-foreground-color":"hsla(230, 10%, 30%, 1)","input-background-color":"hsla(230, 15%, 30%, 0.1)","input-background-color-active":"hsla(230, 15%, 30%, 0.22)","input-background-color-focus":"hsla(230, 15%, 30%, 0.18)","input-background-color-hover":"hsla(230, 15%, 30%, 0.14)","input-foreground-color":"hsla(230, 10%, 30%, 1)","input-guide-color":"hsla(230, 15%, 30%, 0.1)","monitor-background-color":"hsla(230, 15%, 30%, 0.1)","monitor-foreground-color":"hsla(230, 10%, 30%, 0.5)","label-foreground-color":"hsla(230, 10%, 30%, 0.7)","separator-color":"hsla(230, 15%, 30%, 0.1)"}},iceberg:function(){return{"base-background-color":"hsla(230, 20%, 11%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(230, 10%, 80%, 1)","button-background-color-active":"hsla(230, 10%, 95%, 1)","button-background-color-focus":"hsla(230, 10%, 90%, 1)","button-background-color-hover":"hsla(230, 10%, 85%, 1)","button-foreground-color":"hsla(230, 20%, 11%, 1)","folder-background-color":"hsla(230, 25%, 16%, 1)","folder-background-color-active":"hsla(230, 25%, 31%, 1)","folder-background-color-focus":"hsla(230, 25%, 26%, 1)","folder-background-color-hover":"hsla(230, 25%, 21%, 1)","folder-foreground-color":"hsla(230, 10%, 80%, 1)","input-background-color":"hsla(230, 20%, 8%, 1)","input-background-color-active":"hsla(230, 28%, 23%, 1)","input-background-color-focus":"hsla(230, 28%, 18%, 1)","input-background-color-hover":"hsla(230, 20%, 13%, 1)","input-foreground-color":"hsla(230, 10%, 80%, 1)","input-guide-color":"hsla(230, 10%, 80%, 5%)","monitor-background-color":"hsla(230, 20%, 8%, 1)","monitor-foreground-color":"hsla(230, 12%, 48%, 1)","label-foreground-color":"hsla(230, 12%, 48%, 1)","separator-color":"hsla(230, 20%, 8%, 1)"}},retro:function(){return{"base-background-color":"hsla(40, 3%, 90%, 1)","base-shadow-color":"hsla(0, 0%, 0%, 0.3)","button-background-color":"hsla(40, 3%, 70%, 1)","button-background-color-active":"hsla(40, 3%, 55%, 1)","button-background-color-focus":"hsla(40, 3%, 60%, 1)","button-background-color-hover":"hsla(40, 3%, 65%, 1)","button-foreground-color":"hsla(40, 3%, 20%, 1)","folder-background-color":"hsla(40, 3%, 40%, 1)","folder-background-color-active":"hsla(34, 3%, 55%, 1)","folder-background-color-focus":"hsla(43, 3%, 50%, 1)","folder-background-color-hover":"hsla(43, 3%, 45%, 1)","folder-foreground-color":"hsla(40, 3%, 70%, 1)","input-background-color":"hsla(120, 3%, 20%, 1)","input-background-color-active":"hsla(120, 3%, 35%, 1)","input-background-color-focus":"hsla(120, 3%, 30%, 1)","input-background-color-hover":"hsla(120, 3%, 25%, 1)","input-foreground-color":"hsla(120, 40%, 60%, 1)","input-guide-color":"hsla(120, 40%, 60%, 0.1)","monitor-background-color":"hsla(120, 3%, 20%, 0.8)","monitor-foreground-color":"hsla(120, 40%, 60%, 0.8)","label-foreground-color":"hsla(40, 3%, 50%, 1)","separator-color":"hsla(40, 3%, 40%, 1)"}},translucent:function(){return{"base-background-color":"hsla(0, 0%, 10%, 0.8)","base-shadow-color":"hsla(0, 0%, 0%, 0.2)","button-background-color":"hsla(0, 0%, 80%, 1)","button-background-color-active":"hsla(0, 0%, 100%, 1)","button-background-color-focus":"hsla(0, 0%, 95%, 1)","button-background-color-hover":"hsla(0, 0%, 85%, 1)","button-foreground-color":"hsla(0, 0%, 0%, 0.8)","folder-background-color":"hsla(0, 0%, 0%, 0.3)","folder-background-color-active":"hsla(0, 0%, 0%, 0.6)","folder-background-color-focus":"hsla(0, 0%, 0%, 0.5)","folder-background-color-hover":"hsla(0, 0%, 0%, 0.4)","folder-foreground-color":"hsla(0, 0%, 100%, 0.5)","input-background-color":"hsla(0, 0%, 0%, 0.3)","input-background-color-active":"hsla(0, 0%, 0%, 0.6)","input-background-color-focus":"hsla(0, 0%, 0%, 0.5)","input-background-color-hover":"hsla(0, 0%, 0%, 0.4)","input-foreground-color":"hsla(0, 0%, 100%, 0.5)","input-guide-color":"hsla(0, 0%, 100%, 0.1)","monitor-background-color":"hsla(0, 0%, 0%, 0.3)","monitor-foreground-color":"hsla(0, 0%, 100%, 0.3)","label-foreground-color":"hsla(0, 0%, 100%, 0.5)","separator-color":"hsla(0, 0%, 0%, 0.2)"}}};function O(t){return z[t]()}var q=[{name:"Base",expanded:!0,props:["base-background-color","base-shadow-color"],label:function(t){var n=t.match(/^base-(.+)-color$/);return n&&n[1]||t}},{name:"Input",props:["input-foreground-color","input-guide-color","input-background-color","input-background-color:state"],label:function(t){var n=t.match(/^input-(.+)-color(-.+)?$/);return n&&""+n[1]+(n[2]||"")||t}},{name:"Monitor",props:["monitor-foreground-color","monitor-background-color"],label:function(t){var n=t.match(/^monitor-(.+)-color(-.+)?$/);return n&&""+n[1]+(n[2]||"")||t}},{name:"Button",props:["button-foreground-color","button-background-color","button-background-color:state"],label:function(t){var n=t.match(/^button-(.+)-color(-.+)?$/);return n&&""+n[1]+(n[2]||"")||t}},{name:"Folder",props:["folder-foreground-color","folder-background-color","folder-background-color:state"],label:function(t){var n=t.match(/^folder-(.+)-color(-.+)?$/);return n&&""+n[1]+(n[2]||"")||t}},{name:"Misc",expanded:!0,props:["label-foreground-color","separator-color"],label:function(t){var n=t.match(/^(.+)-color(-.+)?$/);return n&&""+n[1]+(n[2]||"")||t}}];function $(t,n){return B(B([t+" {"],Object.keys(n).reduce((function(t,e){var o=n[e];return[].concat(t,"  --tp-"+e+": "+o+";")}),[])),["}"]).join("\n")}function P(t,n,e){var o=document.querySelector(t);o&&(o.textContent=["\x3c!-- "+e+" --\x3e","<style>",$(":root",n),"</style>"].join("\n"),hljs.highlightBlock(o))}function T(t){var n=t.styleElem,e=t.theme;n.textContent=$("*[data-preview-css]",e),P("*[data-preview-code]",e,"Append this element into your head element to apply the theme")}function L(t){var n={checkbox:!0,color:"rgba(0, 0, 0, 0)",list:"item",point2d:{x:0,y:0},slider:32,text:"text",monitor:[0,1,2,3].map((function(){return Math.random().toFixed(2)})).join("\n")},o=new e.default({container:t,title:"Preview"});return o.addInput(n,"text"),o.addInput(n,"slider",{max:64,min:0}),o.addInput(n,"list",{options:{item:"item"}}),o.addInput(n,"checkbox"),o.addButton({title:"button"}),o.addSeparator(),o.addMonitor(n,"monitor",{interval:0,multiline:!0}),o.addFolder({title:"folder"}).addInput(n,"color"),o.addFolder({title:"folder"}).addInput(n,"point2d"),o}function R(){var t=document.createElement("style");document.head.appendChild(t);var n=o("controller"),a=o("preview");if(n&&a){var r=O("translucent");P("*[data-exampleCss]",r,"Example theme: Translucent");var l=function(t,n){var o=new e.default({container:t,title:"Panepaint"}),a={preset:"Select..."};return o.addInput(a,"preset",{options:{"Select...":"",Default:"default",Iceberg:"iceberg",Jetblack:"jetblack",Light:"light",Retro:"retro",Translucent:"translucent"}}).on("change",(function(t){if(""!==t.value){var e=O(t.value);Object.keys(e).forEach((function(t){var o=t;n[o]=e[o]})),a.preset="",o.refresh()}})),o.addButton({title:"Shuffle background image"}).on("click",(function(){var t=document.querySelector(".paint_bgImage");if(t){var n=(new Date).getTime();t.style.backgroundImage="url(https://source.unsplash.com/collection/91620523?date="+n+")",Array.prototype.slice.call(document.querySelectorAll(".paint .photoCredit")).forEach((function(t,n){t.style.visibility=0===n?"visible":"hidden"}))}})),q.forEach((function(t){var e=o.addFolder({expanded:!!t.expanded,title:t.name});t.props.forEach((function(a){var r=a.match(/(.+):state$/);if(r){var l=e.addFolder({title:"State"});l.addButton({title:"Autofill"}).on("click",(function(){var t=y(n[r[1]]).getComponents("hsl"),e=t[2]>50?-1:1;n[r[1]+"-hover"]=_(new m([t[0],t[1],t[2]+5*e,t[3]],"hsl")),n[r[1]+"-focus"]=_(new m([t[0],t[1],t[2]+10*e,t[3]],"hsl")),n[r[1]+"-active"]=_(new m([t[0],t[1],t[2]+15*e,t[3]],"hsl")),o.refresh()}));var i=r[1];["active","focus","hover"].forEach((function(e){var o=[i,e].join("-");l.addInput(n,o,{label:t.label(o).replace("background","bg").replace("foreground","fg")})}))}else e.addInput(n,a,{label:t.label(a).replace("background","bg").replace("foreground","fg")})}))})),o}(n,r);T({styleElem:t,theme:r}),l.on("change",(function(){T({styleElem:t,theme:r})})),L(a);var i={header:function(t){t&&L(t)}};Object.keys(i).forEach((function(t){(0,i[t])(o(t))}))}}function J(){var t={header:function(t){var n=new e.default({container:t}).addFolder({title:"Folder"});n.addButton({title:"Button"}),n.addButton({title:"Button"});var o=n.addFolder({title:"Subfolder"});o.addButton({title:"Button"}),o.addButton({title:"Button"}),n.addSeparator(),n.addButton({title:"Button"})},folder:function(t){var n={acceleration:0,randomness:0,speed:0},o=new e.default({container:t});o.addFolder({title:"Basic"}).addInput(n,"speed");var a=o.addFolder({expanded:!1,title:"Advanced"});a.addInput(n,"acceleration"),a.addInput(n,"randomness")},button:function(t){var n={count:"0"},o=new e.default({container:t});o.addButton({title:"Increment"}).on("click",(function(){n.count=String(parseInt(n.count,10)+1),o.refresh()})),o.addSeparator(),o.addMonitor(n,"count",{interval:0})},separator:function(t){var n=new e.default({container:t});n.addButton({title:"Previous"}),n.addButton({title:"Next"}),n.addSeparator(),n.addButton({title:"Reset"})}};Object.keys(t).forEach((function(n){(0,t[n])(o(n))}))}var W,D,H,G=function(){function t(t){this.onWindowScroll_=this.onWindowScroll_.bind(this),this.elem_=t,window.addEventListener("scroll",this.onWindowScroll_)}return t.prototype.onWindowScroll_=function(){var t=.5*window.scrollY;this.elem_.style.transform="rotate("+t+"deg)"},t}(),K=function(){function t(){this.routes_=[]}return t.prototype.add=function(t,n){this.routes_.push({init:n,pathname:t})},t.prototype.route=function(t){this.routes_.forEach((function(n){n.pathname.test(t)&&n.init()}))},t}(),Y=function(){function t(t){this.expanded_=!1,this.onDocumentClick_=this.onDocumentClick_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onWindowHashChange_=this.onWindowHashChange_.bind(this),this.onWindowScroll_=this.onWindowScroll_.bind(this),this.buttonElem_=t.buttonElement,this.menuElem_=t.menuElement,this.menuElem_.classList.add("menu-loaded"),document.addEventListener("click",this.onDocumentClick_),window.addEventListener("hashchange",this.onWindowHashChange_),window.addEventListener("scroll",this.onWindowScroll_),this.buttonElem_.addEventListener("click",this.onButtonClick_),this.updateActiveItem_()}return Object.defineProperty(t.prototype,"expanded",{get:function(){return this.expanded_},set:function(t){this.expanded_=t,this.expanded_?this.menuElem_.classList.add("menu-expanded"):this.menuElem_.classList.remove("menu-expanded")},enumerable:!1,configurable:!0}),t.prototype.updateActiveItem_=function(){var t=["menuItem_anchor","submenuItem_anchor"];t.forEach((function(t){var n=t+"-active";Array.prototype.slice.call(document.querySelectorAll("."+n)).forEach((function(t){t.classList.remove(n)}))})),t.forEach((function(t){var n=location.pathname.split("/"),e=n[n.length-1]+location.hash,o=document.querySelector("."+t+"[href='"+e+"']");o&&o.classList.add(t+"-active")}))},t.prototype.onDocumentClick_=function(t){var n=t.target;this.menuElem_.contains(n)||n===this.buttonElem_||this.buttonElem_.contains(n)||this.expanded&&(t.preventDefault(),t.stopImmediatePropagation(),this.expanded=!1)},t.prototype.onWindowScroll_=function(){this.expanded=!1},t.prototype.onWindowHashChange_=function(){this.updateActiveItem_()},t.prototype.onButtonClick_=function(){this.expanded=!this.expanded},t}();(H=new K).add(/^(\/tweakpane)?\/getting-started\.html$/,r),H.add(/^(\/tweakpane)?\/$/,M),H.add(/^(\/tweakpane)?\/input\.html$/,A),H.add(/^(\/tweakpane)?\/misc\.html$/,N),H.add(/^(\/tweakpane)?\/monitor\.html$/,C),H.add(/^(\/tweakpane)?\/theming\.html$/,R),H.add(/^(\/tweakpane)?\/quick-tour\.html$/,j),H.add(/^(\/tweakpane)?\/ui-components\.html$/,J),H.route(location.pathname),document.querySelectorAll(".logo_symbol").forEach((function(t){new G(t)})),W=document.getElementById("spMenuButton"),D=document.querySelector(".menu"),W&&D&&new Y({buttonElement:W,menuElement:D}),hljs.initHighlightingOnLoad()}));
