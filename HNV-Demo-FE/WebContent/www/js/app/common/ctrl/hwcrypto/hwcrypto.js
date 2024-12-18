/* Legacy dependencies for hwcrypto.js 0.0.11 generated on 2017-01-25 */
!function(a){"use strict";function b(a){switch(typeof a){case"undefined":return"undefined";case"boolean":return"boolean";case"number":return"number";case"string":return"string";default:return null===a?"null":"object"}}function c(a){return Object.prototype.toString.call(a).replace(/^\[object *|\]$/g,"")}function d(a){return"function"==typeof a}function e(a){if(null===a||a===D)throw TypeError();return Object(a)}function f(a){return a>>0}function g(a){return a>>>0}function h(b){function c(a){Object.defineProperty(b,a,{get:function(){return b._getter(a)},set:function(c){b._setter(a,c)},enumerable:!0,configurable:!1})}if(!("TYPED_ARRAY_POLYFILL_NO_ARRAY_ACCESSORS"in a)){if(b.length>E)throw RangeError("Array too large for polyfill");var d;for(d=0;d<b.length;d+=1)c(d)}}function i(a,b){var c=32-b;return a<<c>>c}function j(a,b){var c=32-b;return a<<c>>>c}function k(a){return[255&a]}function l(a){return i(a[0],8)}function m(a){return[255&a]}function n(a){return j(a[0],8)}function o(a){return a=M(Number(a)),[a<0?0:a>255?255:255&a]}function p(a){return[255&a,a>>8&255]}function q(a){return i(a[1]<<8|a[0],16)}function r(a){return[255&a,a>>8&255]}function s(a){return j(a[1]<<8|a[0],16)}function t(a){return[255&a,a>>8&255,a>>16&255,a>>24&255]}function u(a){return i(a[3]<<24|a[2]<<16|a[1]<<8|a[0],32)}function v(a){return[255&a,a>>8&255,a>>16&255,a>>24&255]}function w(a){return j(a[3]<<24|a[2]<<16|a[1]<<8|a[0],32)}function x(a,b,c){function d(a){var b=H(a),c=a-b;return c<.5?b:c>.5?b+1:b%2?b+1:b}var e,f,g,h=(1<<b-1)-1;if(a!==a)f=(1<<b)-1,g=L(2,c-1),e=0;else if(a===1/0||a===-(1/0))f=(1<<b)-1,g=0,e=a<0?1:0;else if(0===a)f=0,g=0,e=1/a===-(1/0)?1:0;else if(e=a<0,a=G(a),a>=L(2,1-h)){f=K(H(I(a)/F),1023);var i=a/L(2,f);i<1&&(f-=1,i*=2),i>=2&&(f+=1,i/=2);var j=L(2,c);g=d(i*j)-j,f+=h,g/j>=1&&(f+=1,g=0),f>2*h&&(f=(1<<b)-1,g=0)}else f=0,g=d(a/L(2,1-h-c));var k,l=[];for(k=c;k;k-=1)l.push(g%2?1:0),g=H(g/2);for(k=b;k;k-=1)l.push(f%2?1:0),f=H(f/2);l.push(e?1:0),l.reverse();for(var m=l.join(""),n=[];m.length;)n.unshift(parseInt(m.substring(0,8),2)),m=m.substring(8);return n}function y(a,b,c){var d,e,f,g,h,i,j,k,l=[];for(d=0;d<a.length;++d)for(f=a[d],e=8;e;e-=1)l.push(f%2?1:0),f>>=1;return l.reverse(),g=l.join(""),h=(1<<b-1)-1,i=parseInt(g.substring(0,1),2)?-1:1,j=parseInt(g.substring(1,1+b),2),k=parseInt(g.substring(1+b),2),j===(1<<b)-1?0!==k?NaN:i*(1/0):j>0?i*L(2,j-h)*(1+k/L(2,c)):0!==k?i*L(2,-(h-1))*(k/L(2,c)):i<0?-0:0}function z(a){return y(a,11,52)}function A(a){return x(a,11,52)}function B(a){return y(a,8,23)}function C(a){return x(a,8,23)}var D=void 0,E=1e5,F=Math.LN2,G=Math.abs,H=Math.floor,I=Math.log,J=Math.max,K=Math.min,L=Math.pow,M=Math.round;!function(){var a=Object.defineProperty,b=!function(){try{return Object.defineProperty({},"x",{})}catch(a){return!1}}();a&&!b||(Object.defineProperty=function(b,c,d){if(a)try{return a(b,c,d)}catch(a){}if(b!==Object(b))throw TypeError("Object.defineProperty called on non-object");return Object.prototype.__defineGetter__&&"get"in d&&Object.prototype.__defineGetter__.call(b,c,d.get),Object.prototype.__defineSetter__&&"set"in d&&Object.prototype.__defineSetter__.call(b,c,d.set),"value"in d&&(b[c]=d.value),b})}(),function(){function i(a){if(a=f(a),a<0)throw RangeError("ArrayBuffer size is not a small enough positive integer.");Object.defineProperty(this,"byteLength",{value:a}),Object.defineProperty(this,"_bytes",{value:Array(a)});for(var b=0;b<a;b+=1)this._bytes[b]=0}function j(){if(!arguments.length||"object"!=typeof arguments[0])return function(a){if(a=f(a),a<0)throw RangeError("length is not a small enough positive integer.");Object.defineProperty(this,"length",{value:a}),Object.defineProperty(this,"byteLength",{value:a*this.BYTES_PER_ELEMENT}),Object.defineProperty(this,"buffer",{value:new i(this.byteLength)}),Object.defineProperty(this,"byteOffset",{value:0})}.apply(this,arguments);if(arguments.length>=1&&"object"===b(arguments[0])&&arguments[0]instanceof j)return function(a){if(this.constructor!==a.constructor)throw TypeError();var b=a.length*this.BYTES_PER_ELEMENT;Object.defineProperty(this,"buffer",{value:new i(b)}),Object.defineProperty(this,"byteLength",{value:b}),Object.defineProperty(this,"byteOffset",{value:0}),Object.defineProperty(this,"length",{value:a.length});for(var c=0;c<this.length;c+=1)this._setter(c,a._getter(c))}.apply(this,arguments);if(arguments.length>=1&&"object"===b(arguments[0])&&!(arguments[0]instanceof j)&&!(arguments[0]instanceof i||"ArrayBuffer"===c(arguments[0])))return function(a){var b=a.length*this.BYTES_PER_ELEMENT;Object.defineProperty(this,"buffer",{value:new i(b)}),Object.defineProperty(this,"byteLength",{value:b}),Object.defineProperty(this,"byteOffset",{value:0}),Object.defineProperty(this,"length",{value:a.length});for(var c=0;c<this.length;c+=1){var d=a[c];this._setter(c,Number(d))}}.apply(this,arguments);if(arguments.length>=1&&"object"===b(arguments[0])&&(arguments[0]instanceof i||"ArrayBuffer"===c(arguments[0])))return function(a,b,c){if(b=g(b),b>a.byteLength)throw RangeError("byteOffset out of range");if(b%this.BYTES_PER_ELEMENT)throw RangeError("buffer length minus the byteOffset is not a multiple of the element size.");if(c===D){var d=a.byteLength-b;if(d%this.BYTES_PER_ELEMENT)throw RangeError("length of buffer minus byteOffset not a multiple of the element size");c=d/this.BYTES_PER_ELEMENT}else c=g(c),d=c*this.BYTES_PER_ELEMENT;if(b+d>a.byteLength)throw RangeError("byteOffset and length reference an area beyond the end of the buffer");Object.defineProperty(this,"buffer",{value:a}),Object.defineProperty(this,"byteLength",{value:d}),Object.defineProperty(this,"byteOffset",{value:b}),Object.defineProperty(this,"length",{value:c})}.apply(this,arguments);throw TypeError()}function x(a,b,c){var d=function(){Object.defineProperty(this,"constructor",{value:d}),j.apply(this,arguments),h(this)};"__proto__"in d?d.__proto__=j:(d.from=j.from,d.of=j.of),d.BYTES_PER_ELEMENT=a;var e=function(){};return e.prototype=y,d.prototype=new e,Object.defineProperty(d.prototype,"BYTES_PER_ELEMENT",{value:a}),Object.defineProperty(d.prototype,"_pack",{value:b}),Object.defineProperty(d.prototype,"_unpack",{value:c}),d}a.ArrayBuffer=a.ArrayBuffer||i,Object.defineProperty(j,"from",{value:function(a){return new this(a)}}),Object.defineProperty(j,"of",{value:function(){return new this(arguments)}});var y={};j.prototype=y,Object.defineProperty(j.prototype,"_getter",{value:function(a){if(arguments.length<1)throw SyntaxError("Not enough arguments");if(a=g(a),a>=this.length)return D;var b,c,d=[];for(b=0,c=this.byteOffset+a*this.BYTES_PER_ELEMENT;b<this.BYTES_PER_ELEMENT;b+=1,c+=1)d.push(this.buffer._bytes[c]);return this._unpack(d)}}),Object.defineProperty(j.prototype,"get",{value:j.prototype._getter}),Object.defineProperty(j.prototype,"_setter",{value:function(a,b){if(arguments.length<2)throw SyntaxError("Not enough arguments");if(a=g(a),!(a>=this.length)){var c,d,e=this._pack(b);for(c=0,d=this.byteOffset+a*this.BYTES_PER_ELEMENT;c<this.BYTES_PER_ELEMENT;c+=1,d+=1)this.buffer._bytes[d]=e[c]}}}),Object.defineProperty(j.prototype,"constructor",{value:j}),Object.defineProperty(j.prototype,"copyWithin",{value:function(a,b){var c=arguments[2],d=e(this),h=d.length,i=g(h);i=J(i,0);var j,k=f(a);j=k<0?J(i+k,0):K(k,i);var l,m=f(b);l=m<0?J(i+m,0):K(m,i);var n;n=c===D?i:f(c);var o;o=n<0?J(i+n,0):K(n,i);var p,q=K(o-l,i-j);for(l<j&&j<l+q?(p=-1,l=l+q-1,j=j+q-1):p=1;q>0;)d._setter(j,d._getter(l)),l+=p,j+=p,q-=1;return d}}),Object.defineProperty(j.prototype,"every",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(!d(a))throw TypeError();for(var e=arguments[1],f=0;f<c;f++)if(!a.call(e,b._getter(f),f,b))return!1;return!0}}),Object.defineProperty(j.prototype,"fill",{value:function(a){var b=arguments[1],c=arguments[2],d=e(this),h=d.length,i=g(h);i=J(i,0);var j,k=f(b);j=k<0?J(i+k,0):K(k,i);var l;l=c===D?i:f(c);var m;for(m=l<0?J(i+l,0):K(l,i);j<m;)d._setter(j,a),j+=1;return d}}),Object.defineProperty(j.prototype,"filter",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(!d(a))throw TypeError();for(var e=[],f=arguments[1],h=0;h<c;h++){var i=b._getter(h);a.call(f,i,h,b)&&e.push(i)}return new this.constructor(e)}}),Object.defineProperty(j.prototype,"find",{value:function(a){var b=e(this),c=b.length,f=g(c);if(!d(a))throw TypeError();for(var h=arguments.length>1?arguments[1]:D,i=0;i<f;){var j=b._getter(i),k=a.call(h,j,i,b);if(Boolean(k))return j;++i}return D}}),Object.defineProperty(j.prototype,"findIndex",{value:function(a){var b=e(this),c=b.length,f=g(c);if(!d(a))throw TypeError();for(var h=arguments.length>1?arguments[1]:D,i=0;i<f;){var j=b._getter(i),k=a.call(h,j,i,b);if(Boolean(k))return i;++i}return-1}}),Object.defineProperty(j.prototype,"forEach",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(!d(a))throw TypeError();for(var e=arguments[1],f=0;f<c;f++)a.call(e,b._getter(f),f,b)}}),Object.defineProperty(j.prototype,"indexOf",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(0===c)return-1;var d=0;if(arguments.length>0&&(d=Number(arguments[1]),d!==d?d=0:0!==d&&d!==1/0&&d!==-(1/0)&&(d=(d>0||-1)*H(G(d)))),d>=c)return-1;for(var e=d>=0?d:J(c-G(d),0);e<c;e++)if(b._getter(e)===a)return e;return-1}}),Object.defineProperty(j.prototype,"join",{value:function(a){if(this===D||null===this)throw TypeError();for(var b=Object(this),c=g(b.length),d=Array(c),e=0;e<c;++e)d[e]=b._getter(e);return d.join(a===D?",":a)}}),Object.defineProperty(j.prototype,"lastIndexOf",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(0===c)return-1;var d=c;arguments.length>1&&(d=Number(arguments[1]),d!==d?d=0:0!==d&&d!==1/0&&d!==-(1/0)&&(d=(d>0||-1)*H(G(d))));for(var e=d>=0?K(d,c-1):c-G(d);e>=0;e--)if(b._getter(e)===a)return e;return-1}}),Object.defineProperty(j.prototype,"map",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(!d(a))throw TypeError();var e=[];e.length=c;for(var f=arguments[1],h=0;h<c;h++)e[h]=a.call(f,b._getter(h),h,b);return new this.constructor(e)}}),Object.defineProperty(j.prototype,"reduce",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(!d(a))throw TypeError();if(0===c&&1===arguments.length)throw TypeError();var e,f=0;for(e=arguments.length>=2?arguments[1]:b._getter(f++);f<c;)e=a.call(D,e,b._getter(f),f,b),f++;return e}}),Object.defineProperty(j.prototype,"reduceRight",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(!d(a))throw TypeError();if(0===c&&1===arguments.length)throw TypeError();var e,f=c-1;for(e=arguments.length>=2?arguments[1]:b._getter(f--);f>=0;)e=a.call(D,e,b._getter(f),f,b),f--;return e}}),Object.defineProperty(j.prototype,"reverse",{value:function(){if(this===D||null===this)throw TypeError();for(var a=Object(this),b=g(a.length),c=H(b/2),d=0,e=b-1;d<c;++d,--e){var f=a._getter(d);a._setter(d,a._getter(e)),a._setter(e,f)}return a}}),Object.defineProperty(j.prototype,"set",{value:function(a,b){if(arguments.length<1)throw SyntaxError("Not enough arguments");var c,d,e,f,h,i,j,k,l,m;if("object"==typeof arguments[0]&&arguments[0].constructor===this.constructor){if(c=arguments[0],e=g(arguments[1]),e+c.length>this.length)throw RangeError("Offset plus length of array is out of range");if(k=this.byteOffset+e*this.BYTES_PER_ELEMENT,l=c.length*this.BYTES_PER_ELEMENT,c.buffer===this.buffer){for(m=[],h=0,i=c.byteOffset;h<l;h+=1,i+=1)m[h]=c.buffer._bytes[i];for(h=0,j=k;h<l;h+=1,j+=1)this.buffer._bytes[j]=m[h]}else for(h=0,i=c.byteOffset,j=k;h<l;h+=1,i+=1,j+=1)this.buffer._bytes[j]=c.buffer._bytes[i]}else{if("object"!=typeof arguments[0]||"undefined"==typeof arguments[0].length)throw TypeError("Unexpected argument type(s)");if(d=arguments[0],f=g(d.length),e=g(arguments[1]),e+f>this.length)throw RangeError("Offset plus length of array is out of range");for(h=0;h<f;h+=1)i=d[h],this._setter(e+h,Number(i))}}}),Object.defineProperty(j.prototype,"slice",{value:function(a,b){for(var c=e(this),d=c.length,h=g(d),i=f(a),j=i<0?J(h+i,0):K(i,h),k=b===D?h:f(b),l=k<0?J(h+k,0):K(k,h),m=l-j,n=c.constructor,o=new n(m),p=0;j<l;){var q=c._getter(j);o._setter(p,q),++j,++p}return o}}),Object.defineProperty(j.prototype,"some",{value:function(a){if(this===D||null===this)throw TypeError();var b=Object(this),c=g(b.length);if(!d(a))throw TypeError();for(var e=arguments[1],f=0;f<c;f++)if(a.call(e,b._getter(f),f,b))return!0;return!1}}),Object.defineProperty(j.prototype,"sort",{value:function(a){if(this===D||null===this)throw TypeError();for(var b=Object(this),c=g(b.length),d=Array(c),e=0;e<c;++e)d[e]=b._getter(e);for(a?d.sort(a):d.sort(),e=0;e<c;++e)b._setter(e,d[e]);return b}}),Object.defineProperty(j.prototype,"subarray",{value:function(a,b){function c(a,b,c){return a<b?b:a>c?c:a}a=f(a),b=f(b),arguments.length<1&&(a=0),arguments.length<2&&(b=this.length),a<0&&(a=this.length+a),b<0&&(b=this.length+b),a=c(a,0,this.length),b=c(b,0,this.length);var d=b-a;return d<0&&(d=0),new this.constructor(this.buffer,this.byteOffset+a*this.BYTES_PER_ELEMENT,d)}});var E=x(1,k,l),F=x(1,m,n),I=x(1,o,n),L=x(2,p,q),M=x(2,r,s),N=x(4,t,u),O=x(4,v,w),P=x(4,C,B),Q=x(8,A,z);a.Int8Array=a.Int8Array||E,a.Uint8Array=a.Uint8Array||F,a.Uint8ClampedArray=a.Uint8ClampedArray||I,a.Int16Array=a.Int16Array||L,a.Uint16Array=a.Uint16Array||M,a.Int32Array=a.Int32Array||N,a.Uint32Array=a.Uint32Array||O,a.Float32Array=a.Float32Array||P,a.Float64Array=a.Float64Array||Q}(),function(){function b(a,b){return d(a.get)?a.get(b):a[b]}function e(a,b,d){if(!(a instanceof ArrayBuffer||"ArrayBuffer"===c(a)))throw TypeError();if(b=g(b),b>a.byteLength)throw RangeError("byteOffset out of range");if(d=d===D?a.byteLength-b:g(d),b+d>a.byteLength)throw RangeError("byteOffset and length reference an area beyond the end of the buffer");Object.defineProperty(this,"buffer",{value:a}),Object.defineProperty(this,"byteLength",{value:d}),Object.defineProperty(this,"byteOffset",{value:b})}function f(a){return function(c,d){if(c=g(c),c+a.BYTES_PER_ELEMENT>this.byteLength)throw RangeError("Array index out of range");c+=this.byteOffset;for(var e=new Uint8Array(this.buffer,c,a.BYTES_PER_ELEMENT),f=[],h=0;h<a.BYTES_PER_ELEMENT;h+=1)f.push(b(e,h));return Boolean(d)===Boolean(i)&&f.reverse(),b(new a(new Uint8Array(f).buffer),0)}}function h(a){return function(c,d,e){if(c=g(c),c+a.BYTES_PER_ELEMENT>this.byteLength)throw RangeError("Array index out of range");var f,h,j=new a([d]),k=new Uint8Array(j.buffer),l=[];for(f=0;f<a.BYTES_PER_ELEMENT;f+=1)l.push(b(k,f));Boolean(e)===Boolean(i)&&l.reverse(),h=new Uint8Array(this.buffer,c,a.BYTES_PER_ELEMENT),h.set(l)}}var i=function(){var a=new Uint16Array([4660]),c=new Uint8Array(a.buffer);return 18===b(c,0)}();Object.defineProperty(e.prototype,"getUint8",{value:f(Uint8Array)}),Object.defineProperty(e.prototype,"getInt8",{value:f(Int8Array)}),Object.defineProperty(e.prototype,"getUint16",{value:f(Uint16Array)}),Object.defineProperty(e.prototype,"getInt16",{value:f(Int16Array)}),Object.defineProperty(e.prototype,"getUint32",{value:f(Uint32Array)}),Object.defineProperty(e.prototype,"getInt32",{value:f(Int32Array)}),Object.defineProperty(e.prototype,"getFloat32",{value:f(Float32Array)}),Object.defineProperty(e.prototype,"getFloat64",{value:f(Float64Array)}),Object.defineProperty(e.prototype,"setUint8",{value:h(Uint8Array)}),Object.defineProperty(e.prototype,"setInt8",{value:h(Int8Array)}),Object.defineProperty(e.prototype,"setUint16",{value:h(Uint16Array)}),Object.defineProperty(e.prototype,"setInt16",{value:h(Int16Array)}),Object.defineProperty(e.prototype,"setUint32",{value:h(Uint32Array)}),Object.defineProperty(e.prototype,"setInt32",{value:h(Int32Array)}),Object.defineProperty(e.prototype,"setFloat32",{value:h(Float32Array)}),Object.defineProperty(e.prototype,"setFloat64",{value:h(Float64Array)}),a.DataView=a.DataView||e}()}(self),function(a,b,c){b[a]=b[a]||c(),"undefined"!=typeof module&&module.exports?module.exports=b[a]:"function"==typeof define&&define.amd&&define(function(){return b[a]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function a(a,b){m.add(a,b),l||(l=o(m.drain))}function b(a){var b,c=typeof a;return null==a||"object"!=c&&"function"!=c||(b=a.then),"function"==typeof b&&b}function c(){for(var a=0;a<this.chain.length;a++)d(this,1===this.state?this.chain[a].success:this.chain[a].failure,this.chain[a]);this.chain.length=0}function d(a,c,d){var e,f;try{c===!1?d.reject(a.msg):(e=c===!0?a.msg:c.call(void 0,a.msg),e===d.promise?d.reject(TypeError("Promise-chain cycle")):(f=b(e))?f.call(e,d.resolve,d.reject):d.resolve(e))}catch(a){d.reject(a)}}function e(d){var g,i,j=this;if(!j.triggered){j.triggered=!0,j.def&&(j=j.def);try{(g=b(d))?(i=new h(j),g.call(d,function(){e.apply(i,arguments)},function(){f.apply(i,arguments)})):(j.msg=d,j.state=1,j.chain.length>0&&a(c,j))}catch(a){f.call(i||new h(j),a)}}}function f(b){var d=this;d.triggered||(d.triggered=!0,d.def&&(d=d.def),d.msg=b,d.state=2,d.chain.length>0&&a(c,d))}function g(a,b,c,d){for(var e=0;e<b.length;e++)!function(e){a.resolve(b[e]).then(function(a){c(e,a)},d)}(e)}function h(a){this.def=a,this.triggered=!1}function i(a){this.promise=a,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function j(b){if("function"!=typeof b)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var d=new i(this);this.then=function(b,e){var f={success:"function"!=typeof b||b,failure:"function"==typeof e&&e};return f.promise=new this.constructor(function(a,b){if("function"!=typeof a||"function"!=typeof b)throw TypeError("Not a function");f.resolve=a,f.reject=b}),d.chain.push(f),0!==d.state&&a(c,d),f.promise},this.catch=function(a){return this.then(void 0,a)};try{b.call(void 0,function(a){e.call(d,a)},function(a){f.call(d,a)})}catch(a){f.call(d,a)}}var k,l,m,n=Object.prototype.toString,o="undefined"!=typeof setImmediate?function(a){return setImmediate(a)}:setTimeout;try{Object.defineProperty({},"x",{}),k=function(a,b,c,d){return Object.defineProperty(a,b,{value:c,writable:!0,configurable:d!==!1})}}catch(a){k=function(a,b,c){return a[b]=c,a}}m=function(){function a(a,b){this.fn=a,this.self=b,this.next=void 0}var b,c,d;return{add:function(e,f){d=new a(e,f),c?c.next=d:b=d,c=d,d=void 0},drain:function(){var a=b;for(b=c=l=void 0;a;)a.fn.call(a.self),a=a.next}}}();var p=k({},"constructor",j,!1);return k(j,"prototype",p,!1),k(p,"__NPO__",0,!1),k(j,"resolve",function(a){var b=this;return a&&"object"==typeof a&&1===a.__NPO__?a:new b(function(b,c){if("function"!=typeof b||"function"!=typeof c)throw TypeError("Not a function");b(a)})}),k(j,"reject",function(a){return new this(function(b,c){if("function"!=typeof b||"function"!=typeof c)throw TypeError("Not a function");c(a)})}),k(j,"all",function(a){var b=this;return"[object Array]"!=n.call(a)?b.reject(TypeError("Not an array")):0===a.length?b.resolve([]):new b(function(c,d){if("function"!=typeof c||"function"!=typeof d)throw TypeError("Not a function");var e=a.length,f=Array(e),h=0;g(b,a,function(a,b){f[a]=b,++h===e&&c(f)},d)})}),k(j,"race",function(a){var b=this;return"[object Array]"!=n.call(a)?b.reject(TypeError("Not an array")):new b(function(c,d){if("function"!=typeof c||"function"!=typeof d)throw TypeError("Not a function");g(b,a,function(a,b){c(b)},d)})}),j});

/*! This is hwcrypto.js 0.0.11 generated on 2017-01-25 */
/* DO NOT EDIT (use src/hwcrypto.js) */
var hwcrypto = function hwcrypto() {
	"use strict";
	var _debug = function(x) {};
	_debug("hwcrypto.js activated");

	window.addEventListener = window.addEventListener || window.attachEvent;

	var digidoc_mime 		= "application/x-digidoc";
	var digidoc_chrome 		= "TokenSigning";
	var USER_CANCEL 		= "user_cancel";
	var NO_CERTIFICATES 	= "no_certificates";
	var INVALID_ARGUMENT 	= "invalid_argument";
	var TECHNICAL_ERROR 	= "technical_error";
	var NO_IMPLEMENTATION 	= "no_implementation";
	var NOT_ALLOWED 		= "not_allowed, https is required";

	function hasPluginFor(mime) {
		return navigator.mimeTypes && mime in navigator.mimeTypes;
	}
	function hasExtensionFor(cls) {
		return typeof window[cls] === "function";
	}
	function _hex2array(str) {
		if (typeof str == "string") {
			var len = Math.floor(str.length / 2);
			var ret = new Uint8Array(len);
			for (var i = 0; i < len; i++) {
				ret[i] = parseInt(str.substr(i * 2, 2), 16);
			}
			return ret;
		}
	}
	function _array2hex(args) {
		var ret = "";
		for (var i = 0; i < args.length; i++) ret += (args[i] < 16 ? "0" : "") + args[i].toString(16);
		return ret.toLowerCase();
	}
	function _mimeid(mime) {
		return "hwc" + mime.replace("/", "").replace("-", "");
	}
	function loadPluginFor(mime) {
		var element = _mimeid(mime);
		if (document.getElementById(element)) {
			_debug("Plugin element already loaded");
			return document.getElementById(element);
		}
		_debug("Loading plugin for " + mime + " into " + element);
		var objectTag = '<object id="' + element + '" type="' + mime + '" style="width: 1px; height: 1px; position: absolute; visibility: hidden;"></object>';
		var div = document.createElement("div");
		div.setAttribute("id", "pluginLocation" + element);
		document.body.appendChild(div);
		document.getElementById("pluginLocation" + element).innerHTML = objectTag;
		return document.getElementById(element);
	}
	function probe() {
		var msg = "probe() detected ";
		if (hasExtensionFor(digidoc_chrome)) {
			_debug(msg + digidoc_chrome);
		}
		if (hasPluginFor(digidoc_mime)) {
			_debug(msg + digidoc_mime);
		}
	}
	window.addEventListener("load", function(event) {
		probe();
	});
	function DigiDocPlugin() {
		this._name = "NPAPI/BHO for application/x-digidoc";
		var p = loadPluginFor(digidoc_mime);
		var certificate_ids = {};
		function code2str(err) {
			_debug("Error: " + err + " with: " + p.errorMessage);
			switch (parseInt(err)) {
			case 1:
				return USER_CANCEL;

			case 2:
				return INVALID_ARGUMENT;

			case 17:
				return INVALID_ARGUMENT;

			case 19:
				return NOT_ALLOWED;

			default:
				_debug("Unknown error: " + err + " with: " + p.errorMessage);
			return TECHNICAL_ERROR;
			}
		}
		function code2err(err) {
			return new Error(code2str(err));
		}
		this.check = function() {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve(typeof p.version !== "undefined");
				}, 0);
			});
		};
		this.getVersion = function() {
			return new Promise(function(resolve, reject) {
				var v = p.version;
				resolve(v);
			});
		};
		this.getCertificate = function(options) {
			if (options && options.lang) {
				p.pluginLanguage = options.lang;
			}
			return new Promise(function(resolve, reject) {
				try {
					var v = p.getCertificate();
					if (parseInt(p.errorCode) !== 0) {
						reject(code2err(p.errorCode));
					} else {
						certificate_ids[v.cert] = v.id;
						resolve({
							hex: v.cert
						});
					}
				} catch (ex) {
					_debug(ex);
					reject(code2err(p.errorCode));
				}
			});
		};
		this.sign = function(cert, hash, options) {
			return new Promise(function(resolve, reject) {
				var cid = certificate_ids[cert.hex];
				if (cid) {
					try {
						var language = options.lang || "en";
						var v = p.sign(cid, hash.hex, language);
						resolve({
							hex: v
						});
					} catch (ex) {
						_debug(JSON.stringify(ex));
						reject(code2err(p.errorCode));
					}
				} else {
					_debug("invalid certificate: " + cert);
					reject(new Error(INVALID_ARGUMENT));
				}
			});
		};
	}
	function DigiDocExtension() {
		this._name = "Chrome native messaging extension";
		var p = null;
		this.check = function() {
			return new Promise(function(resolve, reject) {
				if (!hasExtensionFor(digidoc_chrome)) {
					return resolve(false);
				}
				p = new window[digidoc_chrome]();
				if (p) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		};
		this.getVersion = function() {
			return p.getVersion();
		};
		this.getCertificate = function(options) {
			return p.getCertificate(options);
		};
		this.sign = function(cert, hash, options) {
			return p.sign(cert, hash, options);
		};
	}
	function NoBackend() {
		this._name = "No implementation";
		this.check = function() {
			return new Promise(function(resolve, reject) {
				resolve(true);
			});
		};
		this.getVersion = function() {
			return Promise.reject(new Error(NO_IMPLEMENTATION));
		};
		this.getCertificate = function() {
			return Promise.reject(new Error(NO_IMPLEMENTATION));
		};
		this.sign = function() {
			return Promise.reject(new Error(NO_IMPLEMENTATION));
		};
	}
	var _backend = null;
	var fields = {};
	function _testAndUse(Backend) {
		return new Promise(function(resolve, reject) {
			var b = new Backend();
			b.check().then(function(isLoaded) {
				if (isLoaded) {
					_debug("Using backend: " + b._name);
					_backend = b;
					resolve(true);
				} else {
					_debug(b._name + " check() failed");
					resolve(false);
				}
			});
		});
	}
	function _autodetect(force) {
		return new Promise(function(resolve, reject) {
			_debug("Autodetecting best backend");
			if (typeof force === "undefined") {
				force = false;
			}
			if (_backend !== null && !force) {
				return resolve(true);
			}
			function tryDigiDocPlugin() {
				_testAndUse(DigiDocPlugin).then(function(result) {
					if (result) {
						resolve(true);
					} else {
						resolve(_testAndUse(NoBackend));
					}
				});
			}
			if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Trident") != -1) {
				_debug("Assuming IE BHO, testing");
				return tryDigiDocPlugin();
			}
			if (hasExtensionFor(digidoc_chrome)) {
				_testAndUse(DigiDocExtension).then(function(result) {
					if (result) {
						resolve(true);
					} else {
						tryDigiDocPlugin();
					}
				});
				return;
			}
			if (hasPluginFor(digidoc_mime)) {
				return tryDigiDocPlugin();
			}
			resolve(_testAndUse(NoBackend));
		});
	}
	fields.use = function(backend) {
		return new Promise(function(resolve, reject) {
			if (typeof backend === "undefined" || backend === "auto") {
				_autodetect().then(function(result) {
					resolve(result);
				});
			} else {
				if (backend === "chrome") {
					resolve(_testAndUse(DigiDocExtension));
				} else if (backend === "npapi") {
					resolve(_testAndUse(DigiDocPlugin));
				} else {
					resolve(false);
				}
			}
		});
	};
	fields.debug = function() {
		return new Promise(function(resolve, reject) {
			var hwversion = "hwcrypto.js 0.0.11";
			_autodetect().then(function(result) {
				_backend.getVersion().then(function(version) {
					resolve(hwversion + " with " + _backend._name + " " + version);
				}, function(error) {
					resolve(hwversion + " with failing backend " + _backend._name);
				});
			});
		});
	};
	fields.getCertificate = function(options) {
		if (typeof options !== "object") {
			_debug("getCertificate options parameter must be an object");
			return Promise.reject(new Error(INVALID_ARGUMENT));
		}
		if (options && !options.lang) {
			options.lang = "en";
		}
		return _autodetect().then(function(result) {
			if (location.protocol !== "https:" && location.protocol !== "file:") {
				return Promise.reject(new Error(NOT_ALLOWED));
			}
			return _backend.getCertificate(options).then(function(certificate) {
				if (certificate.hex && !certificate.encoded) certificate.encoded = _hex2array(certificate.hex);
				return certificate;
			});
		});
	};
	fields.sign = function(cert, hash, options) {
		if (arguments.length < 2) return Promise.reject(new Error(INVALID_ARGUMENT));
		if (options && !options.lang) {
			options.lang = "en";
		}
		if (!hash.type || !hash.value && !hash.hex) return Promise.reject(new Error(INVALID_ARGUMENT));
		if (hash.hex && !hash.value) {
			_debug("DEPRECATED: hash.hex as argument to sign() is deprecated, use hash.value instead");
			hash.value = _hex2array(hash.hex);
		}
		if (hash.value && !hash.hex) hash.hex = _array2hex(hash.value);
		return _autodetect().then(function(result) {
			if (location.protocol !== "https:" && location.protocol !== "file:") {
				return Promise.reject(new Error(NOT_ALLOWED));
			}
			return _backend.sign(cert, hash, options).then(function(signature) {
				if (signature.hex && !signature.value) signature.value = _hex2array(signature.hex);
				return signature;
			});
		});
	};
	fields.NO_IMPLEMENTATION 	= NO_IMPLEMENTATION;
	fields.USER_CANCEL 			= USER_CANCEL;
	fields.NOT_ALLOWED 			= NOT_ALLOWED;
	fields.NO_CERTIFICATES 		= NO_CERTIFICATES;
	fields.TECHNICAL_ERROR 		= TECHNICAL_ERROR;
	fields.INVALID_ARGUMENT 	= INVALID_ARGUMENT;
	return fields;
}();