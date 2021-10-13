!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("javascript",function(t,r){var n,a,i=t.indentUnit,o=r.statementIndent,c=r.jsonld,u=r.json||c,s=!1!==r.trackScope,f=r.typescript,l=r.wordCharacters||/[\w$\xa1-\uffff]/,d=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("keyword d"),i=e("operator"),o={type:"atom",style:"atom"};return{if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:a,break:a,continue:a,new:e("new"),delete:n,void:n,throw:n,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:i,typeof:i,instanceof:i,true:o,false:o,null:o,undefined:o,NaN:o,Infinity:o,this:e("this"),class:e("class"),super:e("atom"),yield:n,export:e("export"),import:e("import"),extends:n,await:n}}(),p=/[+\-*&%=<>!?|~^@]/,m=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function v(e,t,r){return n=e,a=r,t}function k(e,t){var r,n=e.next();if('"'==n||"'"==n)return t.tokenize=(r=n,function(e,t){var n,a=!1;if(c&&"@"==e.peek()&&e.match(m))return t.tokenize=k,v("jsonld-keyword","meta");for(;null!=(n=e.next())&&(n!=r||a);)a=!a&&"\\"==n;return a||(t.tokenize=k),v("string","string")}),t.tokenize(e,t);if("."==n&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return v("number","number");if("."==n&&e.match(".."))return v("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(n))return v(n);if("="==n&&e.eat(">"))return v("=>","operator");if("0"==n&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return v("number","number");if(/\d/.test(n))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),v("number","number");if("/"==n)return e.eat("*")?(t.tokenize=y,y(e,t)):e.eat("/")?(e.skipToEnd(),v("comment","comment")):Ze(e,t,1)?(function(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),v("regexp","string-2")):(e.eat("="),v("operator","operator",e.current()));if("`"==n)return t.tokenize=w,w(e,t);if("#"==n&&"!"==e.peek())return e.skipToEnd(),v("meta","meta");if("#"==n&&e.eatWhile(l))return v("variable","property");if("<"==n&&e.match("!--")||"-"==n&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start)))return e.skipToEnd(),v("comment","comment");if(p.test(n))return">"==n&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=n&&"="!=n||e.eat("="):/[<>*+\-|&?]/.test(n)&&(e.eat(n),">"==n&&e.eat(n))),"?"==n&&e.eat(".")?v("."):v("operator","operator",e.current());if(l.test(n)){e.eatWhile(l);var a=e.current();if("."!=t.lastType){if(d.propertyIsEnumerable(a)){var i=d[a];return v(i.type,i.style,a)}if("async"==a&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return v("async","keyword",a)}return v("variable","variable",a)}}function y(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=k;break}n="*"==r}return v("comment","comment")}function w(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=k;break}n=!n&&"\\"==r}return v("quasi","string-2",e.current())}var b="([{}])";function x(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(f){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var a=0,i=!1,o=r-1;o>=0;--o){var c=e.string.charAt(o),u=b.indexOf(c);if(u>=0&&u<3){if(!a){++o;break}if(0==--a){"("==c&&(i=!0);break}}else if(u>=3&&u<6)++a;else if(l.test(c))i=!0;else if(/["'\/`]/.test(c))for(;;--o){if(0==o)return;if(e.string.charAt(o-1)==c&&"\\"!=e.string.charAt(o-2)){o--;break}}else if(i&&!a){++o;break}}i&&!a&&(t.fatArrowAt=o)}}var h={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function g(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function j(e,t){if(!s)return!1;for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}function M(e,t,r,n,a){var i=e.cc;for(A.state=e,A.stream=a,A.marked=null,A.cc=i,A.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((i.length?i.pop():u?F:W)(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return A.marked?A.marked:"variable"==r&&j(e,n)?"variable-2":t}}var A={state:null,column:null,marked:null,cc:null};function V(){for(var e=arguments.length-1;e>=0;e--)A.cc.push(arguments[e])}function E(){return V.apply(null,arguments),!0}function z(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function I(e){var t=A.state;if(A.marked="def",s){if(t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var n=function e(t,r){if(r){if(r.block){var n=e(t,r.prev);return n?n==r.prev?r:new $(n,r.vars,!0):null}return z(t,r.vars)?r:new $(r.prev,new q(t,r.vars),!1)}return null}(e,t.context);if(null!=n)return void(t.context=n)}else if(!z(e,t.localVars))return void(t.localVars=new q(e,t.localVars));r.globalVars&&!z(e,t.globalVars)&&(t.globalVars=new q(e,t.globalVars))}}function T(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function $(e,t,r){this.prev=e,this.vars=t,this.block=r}function q(e,t){this.name=e,this.next=t}var C=new q("this",new q("arguments",null));function S(){A.state.context=new $(A.state.context,A.state.localVars,!1),A.state.localVars=C}function _(){A.state.context=new $(A.state.context,A.state.localVars,!0),A.state.localVars=null}function O(){A.state.localVars=A.state.context.vars,A.state.context=A.state.context.prev}function P(e,t){var r=function(){var r=A.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new g(n,A.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function N(){var e=A.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function U(e){return function t(r){return r==e?E():";"==e||"}"==r||")"==r||"]"==r?V():E(t)}}function W(e,t){return"var"==e?E(P("vardef",t),Me,U(";"),N):"keyword a"==e?E(P("form"),D,W,N):"keyword b"==e?E(P("form"),W,N):"keyword d"==e?A.stream.match(/^\s*$/,!1)?E():E(P("stat"),J,U(";"),N):"debugger"==e?E(U(";")):"{"==e?E(P("}"),_,ue,N,O):";"==e?E():"if"==e?("else"==A.state.lexical.info&&A.state.cc[A.state.cc.length-1]==N&&A.state.cc.pop()(),E(P("form"),D,W,N,Te)):"function"==e?E(Se):"for"==e?E(P("form"),_,$e,W,O,N):"class"==e||f&&"interface"==t?(A.marked="keyword",E(P("form","class"==e?e:t),Ue,N)):"variable"==e?f&&"declare"==t?(A.marked="keyword",E(W)):f&&("module"==t||"enum"==t||"type"==t)&&A.stream.match(/^\s*\w/,!1)?(A.marked="keyword","enum"==t?E(Xe):"type"==t?E(Oe,U("operator"),pe,U(";")):E(P("form"),Ae,U("{"),P("}"),ue,N,N)):f&&"namespace"==t?(A.marked="keyword",E(P("form"),F,W,N)):f&&"abstract"==t?(A.marked="keyword",E(W)):E(P("stat"),te):"switch"==e?E(P("form"),D,U("{"),P("}","switch"),_,ue,N,N,O):"case"==e?E(F,U(":")):"default"==e?E(U(":")):"catch"==e?E(P("form"),S,B,W,N,O):"export"==e?E(P("stat"),He,N):"import"==e?E(P("stat"),Ge,N):"async"==e?E(W):"@"==t?E(F,W):V(P("stat"),F,U(";"),N)}function B(e){if("("==e)return E(Pe,U(")"))}function F(e,t){return G(e,t,!1)}function H(e,t){return G(e,t,!0)}function D(e){return"("!=e?V():E(P(")"),J,U(")"),N)}function G(e,t,r){if(A.state.fatArrowAt==A.stream.start){var n=r?Y:X;if("("==e)return E(S,P(")"),oe(Pe,")"),N,U("=>"),n,O);if("variable"==e)return V(S,Ae,U("=>"),n,O)}var a=r?L:K;return h.hasOwnProperty(e)?E(a):"function"==e?E(Se,a):"class"==e||f&&"interface"==t?(A.marked="keyword",E(P("form"),Ne,N)):"keyword c"==e||"async"==e?E(r?H:F):"("==e?E(P(")"),J,U(")"),N,a):"operator"==e||"spread"==e?E(r?H:F):"["==e?E(P("]"),Re,N,a):"{"==e?ce(ne,"}",null,a):"quasi"==e?V(Q,a):"new"==e?E(function(e){return function(t){return"."==t?E(e?ee:Z):"variable"==t&&f?E(he,e?L:K):V(e?H:F)}}(r)):E()}function J(e){return e.match(/[;\}\)\],]/)?V():V(F)}function K(e,t){return","==e?E(J):L(e,t,!1)}function L(e,t,r){var n=0==r?K:L,a=0==r?F:H;return"=>"==e?E(S,r?Y:X,O):"operator"==e?/\+\+|--/.test(t)||f&&"!"==t?E(n):f&&"<"==t&&A.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1)?E(P(">"),oe(pe,">"),N,n):"?"==t?E(F,U(":"),a):E(a):"quasi"==e?V(Q,n):";"!=e?"("==e?ce(H,")","call",n):"."==e?E(re,n):"["==e?E(P("]"),J,U("]"),N,n):f&&"as"==t?(A.marked="keyword",E(pe,n)):"regexp"==e?(A.state.lastType=A.marked="operator",A.stream.backUp(A.stream.pos-A.stream.start-1),E(a)):void 0:void 0}function Q(e,t){return"quasi"!=e?V():"${"!=t.slice(t.length-2)?E(Q):E(J,R)}function R(e){if("}"==e)return A.marked="string-2",A.state.tokenize=w,E(Q)}function X(e){return x(A.stream,A.state),V("{"==e?W:F)}function Y(e){return x(A.stream,A.state),V("{"==e?W:H)}function Z(e,t){if("target"==t)return A.marked="keyword",E(K)}function ee(e,t){if("target"==t)return A.marked="keyword",E(L)}function te(e){return":"==e?E(N,W):V(K,U(";"),N)}function re(e){if("variable"==e)return A.marked="property",E()}function ne(e,t){if("async"==e)return A.marked="property",E(ne);if("variable"==e||"keyword"==A.style){return A.marked="property","get"==t||"set"==t?E(ae):(f&&A.state.fatArrowAt==A.stream.start&&(r=A.stream.match(/^\s*:\s*/,!1))&&(A.state.fatArrowAt=A.stream.pos+r[0].length),E(ie));var r}else{if("number"==e||"string"==e)return A.marked=c?"property":A.style+" property",E(ie);if("jsonld-keyword"==e)return E(ie);if(f&&T(t))return A.marked="keyword",E(ne);if("["==e)return E(F,se,U("]"),ie);if("spread"==e)return E(H,ie);if("*"==t)return A.marked="keyword",E(ne);if(":"==e)return V(ie)}}function ae(e){return"variable"!=e?V(ie):(A.marked="property",E(Se))}function ie(e){return":"==e?E(H):"("==e?V(Se):void 0}function oe(e,t,r){function n(a,i){if(r?r.indexOf(a)>-1:","==a){var o=A.state.lexical;return"call"==o.info&&(o.pos=(o.pos||0)+1),E(function(r,n){return r==t||n==t?V():V(e)},n)}return a==t||i==t?E():r&&r.indexOf(";")>-1?V(e):E(U(t))}return function(r,a){return r==t||a==t?E():V(e,n)}}function ce(e,t,r){for(var n=3;n<arguments.length;n++)A.cc.push(arguments[n]);return E(P(t,r),oe(e,t),N)}function ue(e){return"}"==e?E():V(W,ue)}function se(e,t){if(f){if(":"==e)return E(pe);if("?"==t)return E(se)}}function fe(e,t){if(f&&(":"==e||"in"==t))return E(pe)}function le(e){if(f&&":"==e)return A.stream.match(/^\s*\w+\s+is\b/,!1)?E(F,de,pe):E(pe)}function de(e,t){if("is"==t)return A.marked="keyword",E()}function pe(e,t){return"keyof"==t||"typeof"==t||"infer"==t||"readonly"==t?(A.marked="keyword",E("typeof"==t?H:pe)):"variable"==e||"void"==t?(A.marked="type",E(xe)):"|"==t||"&"==t?E(pe):"string"==e||"number"==e||"atom"==e?E(xe):"["==e?E(P("]"),oe(pe,"]",","),N,xe):"{"==e?E(P("}"),ve,N,xe):"("==e?E(oe(be,")"),me,xe):"<"==e?E(oe(pe,">"),pe):"quasi"==e?V(ye,xe):void 0}function me(e){if("=>"==e)return E(pe)}function ve(e){return e.match(/[\}\)\]]/)?E():","==e||";"==e?E(ve):V(ke,ve)}function ke(e,t){return"variable"==e||"keyword"==A.style?(A.marked="property",E(ke)):"?"==t||"number"==e||"string"==e?E(ke):":"==e?E(pe):"["==e?E(U("variable"),fe,U("]"),ke):"("==e?V(_e,ke):e.match(/[;\}\)\],]/)?void 0:E()}function ye(e,t){return"quasi"!=e?V():"${"!=t.slice(t.length-2)?E(ye):E(pe,we)}function we(e){if("}"==e)return A.marked="string-2",A.state.tokenize=w,E(ye)}function be(e,t){return"variable"==e&&A.stream.match(/^\s*[?:]/,!1)||"?"==t?E(be):":"==e?E(pe):"spread"==e?E(be):V(pe)}function xe(e,t){return"<"==t?E(P(">"),oe(pe,">"),N,xe):"|"==t||"."==e||"&"==t?E(pe):"["==e?E(pe,U("]"),xe):"extends"==t||"implements"==t?(A.marked="keyword",E(pe)):"?"==t?E(pe,U(":"),pe):void 0}function he(e,t){if("<"==t)return E(P(">"),oe(pe,">"),N,xe)}function ge(){return V(pe,je)}function je(e,t){if("="==t)return E(pe)}function Me(e,t){return"enum"==t?(A.marked="keyword",E(Xe)):V(Ae,se,ze,Ie)}function Ae(e,t){return f&&T(t)?(A.marked="keyword",E(Ae)):"variable"==e?(I(t),E()):"spread"==e?E(Ae):"["==e?ce(Ee,"]"):"{"==e?ce(Ve,"}"):void 0}function Ve(e,t){return"variable"!=e||A.stream.match(/^\s*:/,!1)?("variable"==e&&(A.marked="property"),"spread"==e?E(Ae):"}"==e?V():"["==e?E(F,U("]"),U(":"),Ve):E(U(":"),Ae,ze)):(I(t),E(ze))}function Ee(){return V(Ae,ze)}function ze(e,t){if("="==t)return E(H)}function Ie(e){if(","==e)return E(Me)}function Te(e,t){if("keyword b"==e&&"else"==t)return E(P("form","else"),W,N)}function $e(e,t){return"await"==t?E($e):"("==e?E(P(")"),qe,N):void 0}function qe(e){return"var"==e?E(Me,Ce):"variable"==e?E(Ce):V(Ce)}function Ce(e,t){return")"==e?E():";"==e?E(Ce):"in"==t||"of"==t?(A.marked="keyword",E(F,Ce)):V(F,Ce)}function Se(e,t){return"*"==t?(A.marked="keyword",E(Se)):"variable"==e?(I(t),E(Se)):"("==e?E(S,P(")"),oe(Pe,")"),N,le,W,O):f&&"<"==t?E(P(">"),oe(ge,">"),N,Se):void 0}function _e(e,t){return"*"==t?(A.marked="keyword",E(_e)):"variable"==e?(I(t),E(_e)):"("==e?E(S,P(")"),oe(Pe,")"),N,le,O):f&&"<"==t?E(P(">"),oe(ge,">"),N,_e):void 0}function Oe(e,t){return"keyword"==e||"variable"==e?(A.marked="type",E(Oe)):"<"==t?E(P(">"),oe(ge,">"),N):void 0}function Pe(e,t){return"@"==t&&E(F,Pe),"spread"==e?E(Pe):f&&T(t)?(A.marked="keyword",E(Pe)):f&&"this"==e?E(se,ze):V(Ae,se,ze)}function Ne(e,t){return"variable"==e?Ue(e,t):We(e,t)}function Ue(e,t){if("variable"==e)return I(t),E(We)}function We(e,t){return"<"==t?E(P(">"),oe(ge,">"),N,We):"extends"==t||"implements"==t||f&&","==e?("implements"==t&&(A.marked="keyword"),E(f?pe:F,We)):"{"==e?E(P("}"),Be,N):void 0}function Be(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||f&&T(t))&&A.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(A.marked="keyword",E(Be)):"variable"==e||"keyword"==A.style?(A.marked="property",E(Fe,Be)):"number"==e||"string"==e?E(Fe,Be):"["==e?E(F,se,U("]"),Fe,Be):"*"==t?(A.marked="keyword",E(Be)):f&&"("==e?V(_e,Be):";"==e||","==e?E(Be):"}"==e?E():"@"==t?E(F,Be):void 0}function Fe(e,t){if("!"==t)return E(Fe);if("?"==t)return E(Fe);if(":"==e)return E(pe,ze);if("="==t)return E(H);var r=A.state.lexical.prev;return V(r&&"interface"==r.info?_e:Se)}function He(e,t){return"*"==t?(A.marked="keyword",E(Qe,U(";"))):"default"==t?(A.marked="keyword",E(F,U(";"))):"{"==e?E(oe(De,"}"),Qe,U(";")):V(W)}function De(e,t){return"as"==t?(A.marked="keyword",E(U("variable"))):"variable"==e?V(H,De):void 0}function Ge(e){return"string"==e?E():"("==e?V(F):"."==e?V(K):V(Je,Ke,Qe)}function Je(e,t){return"{"==e?ce(Je,"}"):("variable"==e&&I(t),"*"==t&&(A.marked="keyword"),E(Le))}function Ke(e){if(","==e)return E(Je,Ke)}function Le(e,t){if("as"==t)return A.marked="keyword",E(Je)}function Qe(e,t){if("from"==t)return A.marked="keyword",E(F)}function Re(e){return"]"==e?E():V(oe(H,"]"))}function Xe(){return V(P("form"),Ae,U("{"),P("}"),oe(Ye,"}"),N,N)}function Ye(){return V(Ae,ze)}function Ze(e,t,r){return t.tokenize==k&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return O.lex=!0,N.lex=!0,{startState:function(e){var t={tokenize:k,lastType:"sof",cc:[],lexical:new g((e||0)-i,0,"block",!1),localVars:r.localVars,context:r.localVars&&new $(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),x(e,t)),t.tokenize!=y&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==n?r:(t.lastType="operator"!=n||"++"!=a&&"--"!=a?n:"incdec",M(t,r,n,a,e))},indent:function(t,n){if(t.tokenize==y||t.tokenize==w)return e.Pass;if(t.tokenize!=k)return 0;var a,c=n&&n.charAt(0),u=t.lexical;if(!/^\s*else\b/.test(n))for(var s=t.cc.length-1;s>=0;--s){var f=t.cc[s];if(f==N)u=u.prev;else if(f!=Te&&f!=O)break}for(;("stat"==u.type||"form"==u.type)&&("}"==c||(a=t.cc[t.cc.length-1])&&(a==K||a==L)&&!/^[,\.=+\-*:?[\(]/.test(n));)u=u.prev;o&&")"==u.type&&"stat"==u.prev.type&&(u=u.prev);var l=u.type,d=c==l;return"vardef"==l?u.indented+("operator"==t.lastType||","==t.lastType?u.info.length+1:0):"form"==l&&"{"==c?u.indented:"form"==l?u.indented+i:"stat"==l?u.indented+(function(e,t){return"operator"==e.lastType||","==e.lastType||p.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}(t,n)?o||i:0):"switch"!=u.info||d||0==r.doubleIndentSwitch?u.align?u.column+(d?0:1):u.indented+(d?0:i):u.indented+(/^(?:case|default)\b/.test(n)?i:2*i)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:u?null:"/*",blockCommentEnd:u?null:"*/",blockCommentContinue:u?null:" * ",lineComment:u?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:u?"json":"javascript",jsonldMode:c,jsonMode:u,expressionAllowed:Ze,skipExpression:function(t){M(t,"atom","atom","true",new e.StringStream("",2,null))}}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/manifest+json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})});