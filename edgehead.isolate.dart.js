(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(b7){if(a2[b7])return
a2[b7]=true
var a5=a4.pending[b7]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[b7].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[b7]
var b5=b4.prototype
b5.constructor=b4
b5.$isd=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[b7]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(b5.$isaU)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="d"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="B"){processStatics(init.statics[b1]=b2.B,b3)
delete b2.B}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ej"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ej"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ej(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bb=function(){}
var dart=[["","",,H,{"^":"",wR:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aU:{"^":"d;",
S:function(a,b){return a===b},
gD:function(a){return H.aA(a)},
i:function(a){return H.cO(a)}},
f1:{"^":"aU;",
i:function(a){return String(a)},
gD:function(a){return a?519018:218159},
$isaf:1},
f3:{"^":"aU;",
S:function(a,b){return null==b},
i:function(a){return"null"},
gD:function(a){return 0},
gec:function(a){return C.a8},
$isar:1},
f6:{"^":"aU;",
gD:function(a){return 0},
i:function(a){return String(a)},
$islR:1},
wY:{"^":"f6;"},
bm:{"^":"f6;"},
c5:{"^":"aU;$ti",
f_:function(a,b){if(!!a.immutable$list)throw H.c(new P.S(b))},
cl:function(a,b){if(!!a.fixed$length)throw H.c(new P.S(b))},
v:function(a,b){this.cl(a,"add")
a.push(b)},
fo:function(a){this.cl(a,"removeLast")
if(a.length===0)throw H.c(H.ba(a,-1))
return a.pop()},
a_:function(a,b){var z
this.cl(a,"remove")
for(z=0;z<a.length;++z)if(J.t(a[z],b)){a.splice(z,1)
return!0}return!1},
hL:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(!b.$1(w)===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.st(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bJ:function(a,b){return new H.I(a,b,[H.j(a,0)])},
av:function(a,b){var z
this.cl(a,"addAll")
for(z=J.aj(b);z.w();)a.push(z.d)},
Z:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
bo:function(a,b){return new H.al(a,b,[H.j(a,0),null])},
dl:function(a,b){return H.fZ(a,b,null,H.j(a,0))},
b7:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
aX:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x))return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.aK())},
cY:function(a,b){return this.aX(a,b,null)},
ar:function(a,b){return a[b]},
gdY:function(a){if(a.length>0)return a[0]
throw H.c(H.aK())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aK())},
gbM:function(a){var z=a.length
if(z===1)return a[0]
if(z===0)throw H.c(H.aK())
throw H.c(H.dq())},
aN:function(a,b,c,d,e){var z,y
this.f_(a,"setRange")
P.cb(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.e(P.a8(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.f0())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
b6:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
bN:function(a,b){var z
this.f_(a,"sort")
z=b==null?P.tp():b
H.cf(a,0,a.length-1,z)},
ep:function(a){return this.bN(a,null)},
e_:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.t(a[z],b))return z
return-1},
b0:function(a,b){return this.e_(a,b,0)},
ae:function(a,b){var z
for(z=0;z<a.length;++z)if(J.t(a[z],b))return!0
return!1},
ga0:function(a){return a.length===0},
ge0:function(a){return a.length!==0},
i:function(a){return P.cI(a,"[","]")},
eg:function(a){return P.c8(a,H.j(a,0))},
ga1:function(a){return new J.b3(a,a.length,0,null,[H.j(a,0)])},
gD:function(a){return H.aA(a)},
gt:function(a){return a.length},
st:function(a,b){this.cl(a,"set length")
if(b<0)throw H.c(P.a8(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ba(a,b))
if(b>=a.length||b<0)throw H.c(H.ba(a,b))
return a[b]},
u:function(a,b,c){if(!!a.immutable$list)H.e(new P.S("indexed set"))
if(b>=a.length||b<0)throw H.c(H.ba(a,b))
a[b]=c},
$iscK:1,
$ascK:I.bb,
$isM:1,
$isac:1},
wQ:{"^":"c5;$ti"},
b3:{"^":"d;a,b,c,d,$ti",
gT:function(){return this.d},
w:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.aw(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c6:{"^":"aU;",
by:function(a,b){var z
if(typeof b!=="number")throw H.c(H.a5(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gd0(b)
if(this.gd0(a)===z)return 0
if(this.gd0(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gd0:function(a){return a===0?1/a<0:a<0},
jf:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.S(""+a+".round()"))},
ba:function(a,b){var z
if(b>20)throw H.c(P.a8(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gd0(a))return"-"+z
return z},
jm:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a8(b,2,36,"radix",null))
z=a.toString(b)
if(C.c.cW(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.e(new P.S("Unexpected toString result: "+z))
x=J.X(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.c.bt("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD:function(a){return a&0x1FFFFFFF},
aL:function(a,b){if(typeof b!=="number")throw H.c(H.a5(b))
return a+b},
c2:function(a,b){if(typeof b!=="number")throw H.c(H.a5(b))
return a-b},
ei:function(a,b){if(typeof b!=="number")throw H.c(H.a5(b))
return a/b},
bt:function(a,b){if(typeof b!=="number")throw H.c(H.a5(b))
return a*b},
bu:function(a,b){return(a|0)===a?a/b|0:this.hR(a,b)},
hR:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.S("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
cS:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
bL:function(a,b){if(typeof b!=="number")throw H.c(H.a5(b))
return a<b},
cC:function(a,b){if(typeof b!=="number")throw H.c(H.a5(b))
return a>b},
$isL:1},
f2:{"^":"c6;",$isaY:1,$isL:1,$isr:1},
lQ:{"^":"c6;",$isaY:1,$isL:1},
c7:{"^":"aU;",
cW:function(a,b){if(b<0)throw H.c(H.ba(a,b))
if(b>=a.length)H.e(H.ba(a,b))
return a.charCodeAt(b)},
bR:function(a,b){if(b>=a.length)throw H.c(H.ba(a,b))
return a.charCodeAt(b)},
cT:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.qL(b,a,c)},
dP:function(a,b){return this.cT(a,b,0)},
fe:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cW(b,c+y)!==this.bR(a,y))return
return new H.fY(c,b,a)},
aL:function(a,b){if(typeof b!=="string")throw H.c(P.de(b,null,null))
return a+b},
dV:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bf(a,y-z)},
j7:function(a,b,c,d){H.cn(c)
P.nc(d,0,a.length,"startIndex",null)
return H.b0(a,b,c,d)},
j6:function(a,b,c){return this.j7(a,b,c,0)},
h1:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iK(b,a,c)!=null},
cG:function(a,b){return this.h1(a,b,0)},
aw:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.c(P.ca(b,null,null))
if(b>c)throw H.c(P.ca(b,null,null))
if(c>a.length)throw H.c(P.ca(c,null,null))
return a.substring(b,c)},
bf:function(a,b){return this.aw(a,b,null)},
de:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.bR(z,0)===133){x=J.dr(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cW(z,w)===133?J.lS(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jn:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.bR(z,0)===133?J.dr(z,1):0}else{y=J.dr(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bt:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.O)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e_:function(a,b,c){var z
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b0:function(a,b){return this.e_(a,b,0)},
iP:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
iO:function(a,b){return this.iP(a,b,null)},
ib:function(a,b,c){if(b==null)H.e(H.a5(b))
if(c>a.length)throw H.c(P.a8(c,0,a.length,null,null))
return H.wj(a,b,c)},
ae:function(a,b){return this.ib(a,b,0)},
ga0:function(a){return a.length===0},
by:function(a,b){var z
if(typeof b!=="string")throw H.c(H.a5(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
i:function(a){return a},
gD:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gt:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.c(H.ba(a,b))
return a[b]},
$iscK:1,
$ascK:I.bb,
$isl:1,
$isdK:1,
B:{
f4:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dr:function(a,b){var z,y
for(z=a.length;b<z;){y=C.c.bR(a,b)
if(y!==32&&y!==13&&!J.f4(y))break;++b}return b},
lS:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.c.cW(a,z)
if(y!==32&&y!==13&&!J.f4(y))break}return b}}}}],["","",,H,{"^":"",
hz:function(a){return a},
aK:function(){return new P.u("No element")},
dq:function(){return new P.u("Too many elements")},
f0:function(){return new P.u("Too few elements")},
cf:function(a,b,c,d){if(c-b<=32)H.fS(a,b,c,d)
else H.fR(a,b,c,d)},
fS:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.X(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.aq(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.u(a,w,y.h(a,v))
w=v}y.u(a,w,x)}},
fR:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.i.bu(c-b+1,6)
y=b+z
x=c-z
w=C.i.bu(b+c,2)
v=w-z
u=w+z
t=J.X(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.aq(d.$2(s,r),0)){n=r
r=s
s=n}if(J.aq(d.$2(p,o),0)){n=o
o=p
p=n}if(J.aq(d.$2(s,q),0)){n=q
q=s
s=n}if(J.aq(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aq(d.$2(s,p),0)){n=p
p=s
s=n}if(J.aq(d.$2(q,p),0)){n=p
p=q
q=n}if(J.aq(d.$2(r,o),0)){n=o
o=r
r=n}if(J.aq(d.$2(r,q),0)){n=q
q=r
r=n}if(J.aq(d.$2(p,o),0)){n=o
o=p
p=n}t.u(a,y,s)
t.u(a,w,q)
t.u(a,x,o)
t.u(a,v,t.h(a,b))
t.u(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.t(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.u(a,k,t.h(a,m))
t.u(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.u(a,k,t.h(a,m))
g=m+1
t.u(a,m,t.h(a,l))
t.u(a,l,j)
l=h
m=g
break}else{t.u(a,k,t.h(a,l))
t.u(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.u(a,k,t.h(a,m))
t.u(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.u(a,k,t.h(a,m))
g=m+1
t.u(a,m,t.h(a,l))
t.u(a,l,j)
m=g}else{t.u(a,k,t.h(a,l))
t.u(a,l,j)}l=h
break}}f=!1}e=m-1
t.u(a,b,t.h(a,e))
t.u(a,e,r)
e=l+1
t.u(a,c,t.h(a,e))
t.u(a,e,p)
H.cf(a,b,m-2,d)
H.cf(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.t(d.$2(t.h(a,m),r),0);)++m
for(;J.t(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.u(a,k,t.h(a,m))
t.u(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.u(a,k,t.h(a,m))
g=m+1
t.u(a,m,t.h(a,l))
t.u(a,l,j)
m=g}else{t.u(a,k,t.h(a,l))
t.u(a,l,j)}l=h
break}}H.cf(a,m,l,d)}else H.cf(a,m,l,d)},
ac:{"^":"x;$ti"},
b5:{"^":"ac;$ti",
ga1:function(a){return new H.dz(this,this.gt(this),0,null,[H.y(this,"b5",0)])},
Z:function(a,b){var z,y
z=this.gt(this)
for(y=0;y<z;++y){b.$1(this.ar(0,y))
if(z!==this.gt(this))throw H.c(new P.B(this))}},
ga0:function(a){return this.gt(this)===0},
b6:function(a,b){var z,y
z=this.gt(this)
for(y=0;y<z;++y){if(b.$1(this.ar(0,y)))return!0
if(z!==this.gt(this))throw H.c(new P.B(this))}return!1},
aX:function(a,b,c){var z,y,x
z=this.gt(this)
for(y=0;y<z;++y){x=this.ar(0,y)
if(b.$1(x))return x
if(z!==this.gt(this))throw H.c(new P.B(this))}return c.$0()},
cr:function(a,b){var z,y,x,w
z=this.gt(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ar(0,0))
if(z!==this.gt(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ar(0,w))
if(z!==this.gt(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ar(0,w))
if(z!==this.gt(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bJ:function(a,b){return this.cH(0,b)},
bo:function(a,b){return new H.al(this,b,[H.y(this,"b5",0),null])},
b7:function(a,b,c){var z,y,x
z=this.gt(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ar(0,x))
if(z!==this.gt(this))throw H.c(new P.B(this))}return y},
bs:function(a,b){var z,y,x,w
z=[H.y(this,"b5",0)]
if(b){y=H.m([],z)
C.a.st(y,this.gt(this))}else{x=new Array(this.gt(this))
x.fixed$length=Array
y=H.m(x,z)}for(w=0;w<this.gt(this);++w)y[w]=this.ar(0,w)
return y},
c0:function(a){return this.bs(a,!0)}},
oN:{"^":"b5;a,b,c,$ti",
ghr:function(){var z=J.aT(this.a)
return z},
ghP:function(){var z,y
z=J.aT(this.a)
y=this.b
if(y>z)return z
return y},
gt:function(a){var z,y
z=J.aT(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ar:function(a,b){var z=this.ghP()+b
if(b<0||z>=this.ghr())throw H.c(P.cH(b,this,"index",null,null))
return J.eA(this.a,z)},
bs:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.X(y)
w=x.gt(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.m([],u)
C.a.st(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.m(s,u)}for(r=0;r<v;++r){t[r]=x.ar(y,z+r)
if(x.gt(y)<w)throw H.c(new P.B(this))}return t},
h9:function(a,b,c,d){var z=this.b
if(z<0)H.e(P.a8(z,0,null,"start",null))},
B:{
fZ:function(a,b,c,d){var z=new H.oN(a,b,c,[d])
z.h9(a,b,c,d)
return z}}},
dz:{"^":"d;a,b,c,d,$ti",
gT:function(){return this.d},
w:function(){var z,y,x
z=this.a
y=z.gt(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ar(0,x);++this.c
return!0}},
dC:{"^":"x;a,b,$ti",
ga1:function(a){return new H.ml(null,J.aj(this.a),this.b,this.$ti)},
gt:function(a){return J.aT(this.a)},
ga0:function(a){return J.eB(this.a)},
$asx:function(a,b){return[b]},
B:{
bC:function(a,b,c,d){if(!!J.o(a).$isac)return new H.cE(a,b,[c,d])
return new H.dC(a,b,[c,d])}}},
cE:{"^":"dC;a,b,$ti",$isac:1,
$asac:function(a,b){return[b]}},
ml:{"^":"cJ;a,b,c,$ti",
w:function(){var z=this.b
if(z.w()){this.a=this.c.$1(z.gT())
return!0}this.a=null
return!1},
gT:function(){return this.a},
$ascJ:function(a,b){return[b]}},
al:{"^":"b5;a,b,$ti",
gt:function(a){return J.aT(this.a)},
ar:function(a,b){return this.b.$1(J.eA(this.a,b))},
$asb5:function(a,b){return[b]},
$asac:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
I:{"^":"x;a,b,$ti",
ga1:function(a){return new H.bN(J.aj(this.a),this.b,this.$ti)},
bo:function(a,b){return new H.dC(this,b,[H.j(this,0),null])}},
bN:{"^":"cJ;a,b,$ti",
w:function(){var z,y
for(z=this.a,y=this.b;z.w();)if(y.$1(z.gT()))return!0
return!1},
gT:function(){return this.a.gT()}},
fJ:{"^":"x;a,b,$ti",
ga1:function(a){return new H.o5(J.aj(this.a),this.b,this.$ti)},
B:{
o4:function(a,b,c){if(!!J.o(a).$isac)return new H.kP(a,H.hz(b),[c])
return new H.fJ(a,H.hz(b),[c])}}},
kP:{"^":"fJ;a,b,$ti",
gt:function(a){var z=J.aT(this.a)-this.b
if(z>=0)return z
return 0},
$isac:1},
o5:{"^":"cJ;a,b,$ti",
w:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.w()
this.b=0
return z.w()},
gT:function(){return this.a.gT()}},
kQ:{"^":"d;$ti",
w:function(){return!1},
gT:function(){return}}}],["","",,H,{"^":"",
cj:function(a,b){var z=a.cn(b)
if(!init.globalState.d.cy)init.globalState.f.b9()
return z},
il:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isM)throw H.c(P.F("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qy(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eZ()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.q8(P.b7(null,H.ch),0)
x=P.r
y.z=new H.Q(0,null,null,null,null,null,0,[x,H.e6])
y.ch=new H.Q(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.qx()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lI,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qz)}if(init.globalState.x)return
y=init.globalState.a++
w=P.ah(null,null,null,x)
v=new H.cc(0,null,!1)
u=new H.e6(y,new H.Q(0,null,null,null,null,null,0,[x,H.cc]),w,init.createNewIsolate(),v,new H.bd(H.db()),new H.bd(H.db()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
w.v(0,0)
u.dq(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.av(a,{func:1,args:[,]}))u.cn(new H.vo(z,a))
else if(H.av(a,{func:1,args:[,,]}))u.cn(new H.vp(z,a))
else u.cn(a)
init.globalState.f.b9()},
lM:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.lN()
return},
lN:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.S("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.S('Cannot extract URI from "'+z+'"'))},
lI:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cZ(!0,[]).bB(b.data)
y=J.X(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cZ(!0,[]).bB(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cZ(!0,[]).bB(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.r
p=P.ah(null,null,null,q)
o=new H.cc(0,null,!1)
n=new H.e6(y,new H.Q(0,null,null,null,null,null,0,[q,H.cc]),p,init.createNewIsolate(),o,new H.bd(H.db()),new H.bd(H.db()),!1,!1,[],P.ah(null,null,null,null),null,null,!1,!0,P.ah(null,null,null,null))
p.v(0,0)
n.dq(0,o)
init.globalState.f.a.ax(new H.ch(n,new H.lJ(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b9()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").F(y.h(z,"msg"))
init.globalState.f.b9()
break
case"close":init.globalState.ch.a_(0,$.$get$f_().h(0,a))
a.terminate()
init.globalState.f.b9()
break
case"log":H.lH(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.a1(["command","print","msg",z])
q=new H.bo(!0,P.bQ(null,P.r)).b3(q)
y.toString
self.postMessage(q)}else P.eq(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
lH:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.a1(["command","log","msg",a])
x=new H.bo(!0,P.bQ(null,P.r)).b3(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.E(w)
y=P.cF(z)
throw H.c(y)}},
lK:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fu=$.fu+("_"+y)
$.fv=$.fv+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.ci(y,x),w,z.r])
x=new H.lL(a,b,c,d,z)
if(e){z.eZ(w,w)
init.globalState.f.a.ax(new H.ch(z,x,"start isolate"))}else x.$0()},
r1:function(a){return new H.cZ(!0,[]).bB(new H.bo(!1,P.bQ(null,P.r)).b3(a))},
vo:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vp:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qy:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",B:{
qz:function(a){var z=P.a1(["command","print","msg",a])
return new H.bo(!0,P.bQ(null,P.r)).b3(z)}}},
e6:{"^":"d;q:a<,b,c,iM:d<,ie:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
eZ:function(a,b){if(!this.f.S(0,a))return
if(this.Q.v(0,b)&&!this.y)this.y=!0
this.cg()},
j5:function(a){var z,y
if(!this.y)return
z=this.Q
z.a_(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
init.globalState.f.a.eY(y)}this.y=!1}this.cg()},
i1:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.S(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
j3:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.S(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.e(new P.S("removeRange"))
P.cb(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
fW:function(a,b){if(!this.r.S(0,a))return
this.db=b},
iy:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.b7(null,null)
this.cx=z}z.ax(new H.qo(a,c))},
ix:function(a,b){var z
if(!this.r.S(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.e2()
return}z=this.cx
if(z==null){z=P.b7(null,null)
this.cx=z}z.ax(this.giN())},
iz:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eq(a)
if(b!=null)P.eq(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.J(a)
y[1]=b==null?null:b.i(0)
for(x=new P.ae(z,z.r,null,null,[null]),x.c=z.e;x.w();)x.d.F(y)},
cn:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.C(u)
v=H.E(u)
this.iz(w,v)
if(this.db){this.e2()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.giM()
if(this.cx!=null)for(;t=this.cx,!t.ga0(t);)this.cx.d6().$0()}return y},
d2:function(a){return this.b.h(0,a)},
dq:function(a,b){var z=this.b
if(z.aa(a))throw H.c(P.cF("Registry: ports must be registered only once."))
z.u(0,a,b)},
cg:function(){var z=this.b
if(z.gt(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.e2()},
e2:[function(){var z,y,x
z=this.cx
if(z!=null)z.aW(0)
for(z=this.b,y=z.gc1(),y=y.ga1(y);y.w();)y.gT().hm()
z.aW(0)
this.c.aW(0)
init.globalState.z.a_(0,this.a)
this.dx.aW(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].F(z[x+1])
this.ch=null}},"$0","giN",0,0,7]},
qo:{"^":"a:7;a,b",
$0:function(){this.a.F(this.b)}},
q8:{"^":"d;a,b",
ik:function(){var z=this.a
if(z.b===z.c)return
return z.d6()},
fw:function(){var z,y,x
z=this.ik()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aa(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.ga0(y)}else y=!1
else y=!1
else y=!1
if(y)H.e(P.cF("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.ga0(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a1(["command","close"])
x=new H.bo(!0,new P.hv(0,null,null,null,null,null,0,[null,P.r])).b3(x)
y.toString
self.postMessage(x)}return!1}z.j1()
return!0},
eU:function(){if(self.window!=null)new H.q9(this).$0()
else for(;this.fw(););},
b9:function(){var z,y,x,w,v
if(!init.globalState.x)this.eU()
else try{this.eU()}catch(x){z=H.C(x)
y=H.E(x)
w=init.globalState.Q
v=P.a1(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bo(!0,P.bQ(null,P.r)).b3(v)
w.toString
self.postMessage(v)}}},
q9:{"^":"a:7;a",
$0:function(){if(!this.a.fw())return
P.p9(C.E,this)}},
ch:{"^":"d;a,b,c",
j1:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cn(this.b)}},
qx:{"^":"d;"},
lJ:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lK(this.a,this.b,this.c,this.d,this.e,this.f)}},
lL:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.av(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.av(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cg()}},
hq:{"^":"d;"},
ci:{"^":"hq;b,a",
F:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.r1(a)
if(z.gie()===y){y=J.X(x)
switch(y.h(x,0)){case"pause":z.eZ(y.h(x,1),y.h(x,2))
break
case"resume":z.j5(y.h(x,1))
break
case"add-ondone":z.i1(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.j3(y.h(x,1))
break
case"set-errors-fatal":z.fW(y.h(x,1),y.h(x,2))
break
case"ping":z.iy(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ix(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.v(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a_(0,y)
break}return}init.globalState.f.a.ax(new H.ch(z,new H.qA(this,x),"receive"))},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.ci){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gD:function(a){return this.b.a}},
qA:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.hf(this.b)}},
e9:{"^":"hq;b,c,a",
F:function(a){var z,y,x
z=P.a1(["command","message","port",this,"msg",a])
y=new H.bo(!0,P.bQ(null,P.r)).b3(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.e9){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
cc:{"^":"d;a,b,c",
hm:function(){this.c=!0
this.b=null},
bl:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a_(0,y)
z.c.a_(0,y)
z.cg()},
hf:function(a){if(this.c)return
this.b.$1(a)},
$isnd:1},
ne:{"^":"bM;a,b",
bn:function(a,b,c,d){var z=this.b
z.toString
return new P.cY(z,[H.j(z,0)]).bn(a,b,c,d)},
bl:[function(){this.a.bl()
this.b.bl()},"$0","gi9",0,0,7],
h7:function(a){var z=new P.qO(null,0,null,null,null,null,this.gi9(),[null])
this.b=z
this.a.b=z.ghV(z)},
$asbM:I.bb},
p5:{"^":"d;a,b,c",
ha:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ax(new H.ch(y,new H.p7(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d6(new H.p8(this,b),0),a)}else throw H.c(new P.S("Timer greater than 0."))},
B:{
p6:function(a,b){var z=new H.p5(!0,!1,null)
z.ha(a,b)
return z}}},
p7:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
p8:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bd:{"^":"d;a",
gD:function(a){var z=this.a
z=C.i.cS(z,0)^C.i.bu(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bd){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bo:{"^":"d;a,b",
b3:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gt(z))
z=J.o(a)
if(!!z.$iscK)return this.fS(a)
if(!!z.$islF){x=this.gfP()
z=a.gbW()
z=H.bC(z,x,H.y(z,"x",0),null)
z=P.O(z,!0,H.y(z,"x",0))
w=a.gc1()
w=H.bC(w,x,H.y(w,"x",0),null)
return["map",z,P.O(w,!0,H.y(w,"x",0))]}if(!!z.$islR)return this.fT(a)
if(!!z.$isaU)this.fD(a)
if(!!z.$isnd)this.cv(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isci)return this.fU(a)
if(!!z.$ise9)return this.fV(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cv(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbd)return["capability",a.a]
if(!(a instanceof P.d))this.fD(a)
return["dart",init.classIdExtractor(a),this.fR(init.classFieldsExtractor(a))]},"$1","gfP",2,0,0],
cv:function(a,b){throw H.c(new P.S((b==null?"Can't transmit:":b)+" "+H.b(a)))},
fD:function(a){return this.cv(a,null)},
fS:function(a){var z=this.fQ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cv(a,"Can't serialize indexable: ")},
fQ:function(a){var z,y
z=[]
C.a.st(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.b3(a[y])
return z},
fR:function(a){var z
for(z=0;z<a.length;++z)C.a.u(a,z,this.b3(a[z]))
return a},
fT:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.cv(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.st(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.b3(a[z[x]])
return["js-object",z,y]},
fV:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fU:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
cZ:{"^":"d;a,b",
bB:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.F("Bad serialized message: "+H.b(a)))
switch(C.a.gdY(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.m(this.cm(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.m(this.cm(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.cm(z)
case"const":z=a[1]
this.b.push(z)
y=H.m(this.cm(z),[null])
y.fixed$length=Array
return y
case"map":return this.io(a)
case"sendport":return this.ip(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.im(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.bd(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.cm(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gil",2,0,0],
cm:function(a){var z
for(z=0;z<a.length;++z)C.a.u(a,z,this.bB(a[z]))
return a},
io:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.aW()
this.b.push(x)
z=J.eC(z,this.gil()).c0(0)
for(w=J.X(y),v=0;v<z.length;++v)x.u(0,z[v],this.bB(w.h(y,v)))
return x},
ip:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.d2(x)
if(u==null)return
t=new H.ci(u,y)}else t=new H.e9(z,x,y)
this.b.push(t)
return t},
im:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.X(z),v=J.X(y),u=0;u<w.gt(z);++u)x[w.h(z,u)]=this.bB(v.h(y,u))
return x}}}],["","",,H,{"^":"",
jV:function(){throw H.c(new P.S("Cannot modify unmodifiable Map"))},
up:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.J(a)
if(typeof z!=="string")throw H.c(H.a5(a))
return z},
aA:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bG:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.Q||!!J.o(a).$isbm){v=C.T(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.c.bR(w,0)===36)w=C.c.bf(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d9(H.co(a),0,null),init.mangledGlobalNames)},
cO:function(a){return"Instance of '"+H.bG(a)+"'"},
ap:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.i.cS(z,10))>>>0,56320|z&1023)}throw H.c(P.a8(a,0,1114111,null,null))},
ft:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.a5(a))
return a[b]},
ba:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b2(!0,b,"index",null)
z=J.aT(a)
if(b<0||b>=z)return P.cH(b,a,"index",null,z)
return P.ca(b,"index",null)},
a5:function(a){return new P.b2(!0,a,null,null)},
d4:function(a){if(typeof a!=="number")throw H.c(H.a5(a))
return a},
cn:function(a){if(typeof a!=="string")throw H.c(H.a5(a))
return a},
c:function(a){var z
if(a==null)a=new P.cM()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iv})
z.name=""}else z.toString=H.iv
return z},
iv:function(){return J.J(this.dartException)},
e:function(a){throw H.c(a)},
aw:function(a){throw H.c(new P.B(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wt(a)
if(a==null)return
if(a instanceof H.dm)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.i.cS(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dt(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fk(v,null))}}if(a instanceof TypeError){u=$.$get$h6()
t=$.$get$h7()
s=$.$get$h8()
r=$.$get$h9()
q=$.$get$hd()
p=$.$get$he()
o=$.$get$hb()
$.$get$ha()
n=$.$get$hg()
m=$.$get$hf()
l=u.b8(y)
if(l!=null)return z.$1(H.dt(y,l))
else{l=t.b8(y)
if(l!=null){l.method="call"
return z.$1(H.dt(y,l))}else{l=s.b8(y)
if(l==null){l=r.b8(y)
if(l==null){l=q.b8(y)
if(l==null){l=p.b8(y)
if(l==null){l=o.b8(y)
if(l==null){l=r.b8(y)
if(l==null){l=n.b8(y)
if(l==null){l=m.b8(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fk(y,l==null?null:l.method))}}return z.$1(new H.pf(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fT()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b2(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fT()
return a},
E:function(a){var z
if(a instanceof H.dm)return a.b
if(a==null)return new H.hx(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hx(a,null)},
uG:function(a){if(a==null||typeof a!='object')return J.f(a)
else return H.aA(a)},
tR:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
uv:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cj(b,new H.uw(a))
case 1:return H.cj(b,new H.ux(a,d))
case 2:return H.cj(b,new H.uy(a,d,e))
case 3:return H.cj(b,new H.uz(a,d,e,f))
case 4:return H.cj(b,new H.uA(a,d,e,f,g))}throw H.c(P.cF("Unsupported number of arguments for wrapped closure"))},
d6:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uv)
a.$identity=z
return z},
jQ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isM){z.$reflectionInfo=c
x=H.ng(z).r}else x=c
w=d?Object.create(new H.or().constructor.prototype):Object.create(new H.df(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aJ
$.aJ=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eN(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.up,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eI:H.dg
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eN(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jN:function(a,b,c,d){var z=H.dg
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eN:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jP(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jN(y,!w,z,b)
if(y===0){w=$.aJ
$.aJ=w+1
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.by
if(v==null){v=H.cy("self")
$.by=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aJ
$.aJ=w+1
t+=H.b(w)
w="return function("+t+"){return this."
v=$.by
if(v==null){v=H.cy("self")
$.by=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jO:function(a,b,c,d){var z,y
z=H.dg
y=H.eI
switch(b?-1:a){case 0:throw H.c(new H.ns("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jP:function(a,b){var z,y,x,w,v,u,t,s
z=H.jE()
y=$.eH
if(y==null){y=H.cy("receiver")
$.eH=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jO(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aJ
$.aJ=u+1
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aJ
$.aJ=u+1
return new Function(y+H.b(u)+"}")()},
ej:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isM){c.fixed$length=Array
z=c}else z=c
return H.jQ(a,b,z,!!d,e,f)},
uP:function(a,b){var z=J.X(b)
throw H.c(H.cA(H.bG(a),z.aw(b,3,z.gt(b))))},
A:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.uP(a,b)},
el:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
av:function(a,b){var z
if(a==null)return!1
z=H.el(a)
return z==null?!1:H.eo(z,b)},
i0:function(a,b){var z,y
if(a==null)return a
if(H.av(a,b))return a
z=H.a_(b,null)
y=H.el(a)
throw H.c(H.cA(y!=null?H.a_(y,null):H.bG(a),z))},
wq:function(a){throw H.c(new P.k5(a))},
db:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
hV:function(a){return new H.aC(a,null)},
m:function(a,b){a.$ti=b
return a},
co:function(a){if(a==null)return
return a.$ti},
i5:function(a,b){return H.ez(a["$as"+H.b(b)],H.co(a))},
y:function(a,b,c){var z=H.i5(a,b)
return z==null?null:z[c]},
j:function(a,b){var z=H.co(a)
return z==null?null:z[b]},
a_:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d9(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a_(z,b)
return H.r5(a,b)}return"unknown-reified-type"},
r5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a_(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a_(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a_(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tQ(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a_(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d9:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bk("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.a_(u,c)}return w?"":"<"+z.i(0)+">"},
uo:function(a){var z,y
if(a instanceof H.a){z=H.el(a)
if(z!=null)return H.a_(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.d9(a.$ti,0,null)},
ez:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aR:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.co(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hN(H.ez(y[d],z),c)},
aH:function(a,b,c,d){if(a==null)return a
if(H.aR(a,b,c,d))return a
throw H.c(H.cA(H.bG(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d9(c,0,null),init.mangledGlobalNames)))},
hN:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.an(a[y],b[y]))return!1
return!0},
d5:function(a,b,c){return a.apply(b,H.i5(b,c))},
hR:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="ar"
if(b==null)return!0
z=H.co(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.eo(x.apply(a,null),b)}return H.an(y,b)},
iq:function(a,b){if(a!=null&&!H.hR(a,b))throw H.c(H.cA(H.bG(a),H.a_(b,null)))
return a},
an:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ar")return!0
if('func' in b)return H.eo(a,b)
if('func' in a)return b.builtin$cls==="bA"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.a_(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hN(H.ez(u,z),x)},
hM:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.an(z,v)||H.an(v,z)))return!1}return!0},
rh:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.an(v,u)||H.an(u,v)))return!1}return!0},
eo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.an(z,y)||H.an(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hM(x,w,!1))return!1
if(!H.hM(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.an(o,n)||H.an(n,o)))return!1}}return H.rh(a.named,b.named)},
wj:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$isf5){z=C.c.bf(a,c)
return b.b.test(z)}else{z=z.dP(b,C.c.bf(a,c))
return!z.ga0(z)}}},
k:function(a,b,c){var z,y,x
H.cn(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xe:[function(a){return a},"$1","hA",2,0,19],
wk:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdK)throw H.c(P.de(b,"pattern","is not a Pattern"))
for(z=z.dP(b,a),z=new H.ho(z.a,z.b,z.c,null),y=0,x="";z.w();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hA().$1(C.c.aw(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hA().$1(C.c.bf(a,y)))
return z.charCodeAt(0)==0?z:z},
b0:function(a,b,c,d){var z,y,x,w,v
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.ip(a,z,z+b.length,c)}if(b==null)H.e(H.a5(b))
y=J.iG(b,a,d)
x=new H.hy(y.a,y.b,y.c,null)
if(!x.w())return a
w=x.d
y=w.a
v=w.c
H.cn(c)
return H.ip(a,y,P.cb(y,y+v.length,a.length,null,null,null),c)},
ip:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jU:{"^":"d;$ti",
ga0:function(a){return this.gt(this)===0},
i:function(a){return P.dD(this)},
u:function(a,b,c){return H.jV()},
$isH:1},
jW:{"^":"jU;a,b,c,$ti",
gt:function(a){return this.a},
aa:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.aa(b))return
return this.eE(b)},
eE:function(a){return this.b[a]},
Z:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eE(w))}}},
nf:{"^":"d;a,b,c,d,e,f,r,x",B:{
ng:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nf(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
pa:{"^":"d;a,b,c,d,e,f",
b8:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
B:{
aM:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.pa(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cX:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hc:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fk:{"^":"a6;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+z+"' on null"}},
lU:{"^":"a6;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
B:{
dt:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lU(a,y,z?null:b.receiver)}}},
pf:{"^":"a6;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dm:{"^":"d;a,bO:b<"},
wt:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isa6)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hx:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
uw:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
ux:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uy:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uz:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uA:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
i:function(a){return"Closure '"+H.bG(this).trim()+"'"},
gfK:function(){return this},
$isbA:1,
gfK:function(){return this}},
h5:{"^":"a;"},
or:{"^":"h5;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
df:{"^":"h5;a,b,c,d",
S:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.df))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gD:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.f(z):H.aA(z)
return(y^H.aA(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cO(z)},
B:{
dg:function(a){return a.a},
eI:function(a){return a.c},
jE:function(){var z=$.by
if(z==null){z=H.cy("self")
$.by=z}return z},
cy:function(a){var z,y,x,w,v
z=new H.df("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jJ:{"^":"a6;a",
i:function(a){return this.a},
B:{
cA:function(a,b){return new H.jJ("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ns:{"^":"a6;a",
i:function(a){return"RuntimeError: "+H.b(this.a)}},
aC:{"^":"d;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gD:function(a){return J.f(this.a)},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.aC){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}},
Q:{"^":"d;a,b,c,d,e,f,r,$ti",
gt:function(a){return this.a},
ga0:function(a){return this.a===0},
gbW:function(){return new H.ma(this,[H.j(this,0)])},
gc1:function(){return H.bC(this.gbW(),new H.lT(this),H.j(this,0),H.j(this,1))},
aa:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eA(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eA(y,a)}else return this.iF(a)},
iF:function(a){var z=this.d
if(z==null)return!1
return this.cq(this.cP(z,this.cp(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c7(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c7(x,b)
return y==null?null:y.b}else return this.iG(b)},
iG:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cP(z,this.cp(a))
x=this.cq(y,a)
if(x<0)return
return y[x].b},
u:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dE()
this.b=z}this.es(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dE()
this.c=y}this.es(y,b,c)}else this.iI(b,c)},
iI:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dE()
this.d=z}y=this.cp(a)
x=this.cP(z,y)
if(x==null)this.dI(z,y,[this.dF(a,b)])
else{w=this.cq(x,a)
if(w>=0)x[w].b=b
else x.push(this.dF(a,b))}},
j2:function(a,b){var z
if(this.aa(a))return this.h(0,a)
z=b.$0()
this.u(0,a,z)
return z},
a_:function(a,b){if(typeof b==="string")return this.eT(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eT(this.c,b)
else return this.iH(b)},
iH:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cP(z,this.cp(a))
x=this.cq(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eV(w)
return w.b},
aW:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
es:function(a,b,c){var z=this.c7(a,b)
if(z==null)this.dI(a,b,this.dF(b,c))
else z.b=c},
eT:function(a,b){var z
if(a==null)return
z=this.c7(a,b)
if(z==null)return
this.eV(z)
this.eB(a,b)
return z.b},
dF:function(a,b){var z,y
z=new H.m9(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eV:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cp:function(a){return J.f(a)&0x3ffffff},
cq:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.t(a[y].a,b))return y
return-1},
i:function(a){return P.dD(this)},
c7:function(a,b){return a[b]},
cP:function(a,b){return a[b]},
dI:function(a,b,c){a[b]=c},
eB:function(a,b){delete a[b]},
eA:function(a,b){return this.c7(a,b)!=null},
dE:function(){var z=Object.create(null)
this.dI(z,"<non-identifier-key>",z)
this.eB(z,"<non-identifier-key>")
return z},
$islF:1,
$isH:1,
B:{
f7:function(a,b){return new H.Q(0,null,null,null,null,null,0,[a,b])}}},
lT:{"^":"a:0;a",
$1:function(a){return this.a.h(0,a)}},
m9:{"^":"d;a,b,c,d,$ti"},
ma:{"^":"ac;a,$ti",
gt:function(a){return this.a.a},
ga0:function(a){return this.a.a===0},
ga1:function(a){var z,y
z=this.a
y=new H.mb(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Z:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
mb:{"^":"d;a,b,c,d,$ti",
gT:function(){return this.d},
w:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
f5:{"^":"d;a,b,c,d",
i:function(a){return"RegExp/"+this.a+"/"},
ghD:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.ds(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghC:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.ds(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
cT:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return new H.pP(this,b,c)},
dP:function(a,b){return this.cT(a,b,0)},
ht:function(a,b){var z,y
z=this.ghD()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hw(this,y)},
hs:function(a,b){var z,y
z=this.ghC()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(y.pop()!=null)return
return new H.hw(this,y)},
fe:function(a,b,c){if(c>b.length)throw H.c(P.a8(c,0,b.length,null,null))
return this.hs(b,c)},
$isdK:1,
B:{
ds:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eV("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hw:{"^":"d;a,b",
h:function(a,b){return this.b[b]},
$isbg:1},
pP:{"^":"c4;a,b,c",
ga1:function(a){return new H.ho(this.a,this.b,this.c,null)},
$asc4:function(){return[P.bg]},
$asx:function(){return[P.bg]}},
ho:{"^":"d;a,b,c,d",
gT:function(){return this.d},
w:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.ht(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fY:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.e(P.ca(b,null,null))
return this.c},
$isbg:1},
qL:{"^":"x;a,b,c",
ga1:function(a){return new H.hy(this.a,this.b,this.c,null)},
$asx:function(){return[P.bg]}},
hy:{"^":"d;a,b,c,d",
w:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.fY(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gT:function(){return this.d}}}],["","",,H,{"^":"",
tQ:function(a){var z=H.m(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uO:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pQ:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ri()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d6(new P.pS(z),1)).observe(y,{childList:true})
return new P.pR(z,y,x)}else if(self.setImmediate!=null)return P.rj()
return P.rk()},
x8:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d6(new P.pT(a),0))},"$1","ri",2,0,15],
x9:[function(a){++init.globalState.f.b
self.setImmediate(H.d6(new P.pU(a),0))},"$1","rj",2,0,15],
xa:[function(a){P.dX(C.E,a)},"$1","rk",2,0,15],
aF:function(a,b){P.ea(null,a)
return b.a},
at:function(a,b){P.ea(a,b)},
aE:function(a,b){b.bz(a)},
aD:function(a,b){b.dS(H.C(a),H.E(a))},
ea:function(a,b){var z,y,x,w
z=new P.qU(b)
y=new P.qV(b)
x=J.o(a)
if(!!x.$isK)a.dJ(z,y)
else if(!!x.$isP)a.ed(z,y)
else{w=new P.K(0,$.q,null,[null])
w.a=4
w.c=a
w.dJ(z,null)}},
au:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.q.toString
return new P.rg(z)},
d1:function(a,b,c){var z,y,x,w,v
if(b===0){z=c.c
if(z!=null)z.f1()
else c.a.bl()
return}else if(b===1){z=c.c
if(z!=null)z.dS(H.C(a),H.E(a))
else{y=H.C(a)
x=H.E(a)
z=c.a
if(z.b>=4)H.e(z.bQ())
if(y==null)y=new P.cM()
$.q.toString
z.dn(y,x)
c.a.bl()}return}if(a instanceof P.bO){if(c.c!=null){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
w=c.a
if(w.b>=4)H.e(w.bQ())
w.c5(z)
P.cr(new P.qS(b,c))
return}else if(z===1){v=a.a
c.a.i5(v,!1).bH(new P.qT(b,c))
return}}P.ea(a,b)},
rf:function(a){var z=a.a
z.toString
return new P.cY(z,[H.j(z,0)])},
ef:function(a,b){if(H.av(a,{func:1,args:[P.ar,P.ar]})){b.toString
return a}else{b.toString
return a}},
ax:function(a){return new P.qM(new P.K(0,$.q,null,[a]),[a])},
r7:function(){var z,y
for(;z=$.bp,z!=null;){$.bS=null
y=z.b
$.bp=y
if(y==null)$.bR=null
z.a.$0()}},
xd:[function(){$.ec=!0
try{P.r7()}finally{$.bS=null
$.ec=!1
if($.bp!=null)$.$get$e0().$1(P.hO())}},"$0","hO",0,0,7],
hI:function(a){var z=new P.hp(a,null)
if($.bp==null){$.bR=z
$.bp=z
if(!$.ec)$.$get$e0().$1(P.hO())}else{$.bR.b=z
$.bR=z}},
re:function(a){var z,y,x
z=$.bp
if(z==null){P.hI(a)
$.bS=$.bR
return}y=new P.hp(a,null)
x=$.bS
if(x==null){y.b=z
$.bS=y
$.bp=y}else{y.b=x.b
x.b=y
$.bS=y
if(y.b==null)$.bR=y}},
cr:function(a){var z=$.q
if(C.k===z){P.br(null,null,C.k,a)
return}z.toString
P.br(null,null,z,z.dQ(a,!0))},
x3:function(a,b){return new P.qK(null,a,!1,[b])},
eg:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.C(x)
y=H.E(x)
w=$.q
w.toString
P.bq(null,null,w,z,y)}},
r8:[function(a,b){var z=$.q
z.toString
P.bq(null,null,z,a,b)},function(a){return P.r8(a,null)},"$2","$1","rm",2,2,22,0],
xc:[function(){},"$0","rl",0,0,7],
rd:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.C(u)
y=H.E(u)
$.q.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gf6()
w=t
v=x.gbO()
c.$2(w,v)}}},
qW:function(a,b,c,d){var z=a.ck()
if(!!J.o(z).$isP&&z!==$.$get$be())z.bI(new P.qZ(b,c,d))
else b.b5(c,d)},
qX:function(a,b){return new P.qY(a,b)},
r_:function(a,b,c){var z=a.ck()
if(!!J.o(z).$isP&&z!==$.$get$be())z.bI(new P.r0(b,c))
else b.bh(c)},
p9:function(a,b){var z=$.q
if(z===C.k){z.toString
return P.dX(a,b)}return P.dX(a,z.dQ(b,!0))},
dX:function(a,b){var z=C.i.bu(a.a,1000)
return H.p6(z<0?0:z,b)},
ps:function(){return $.q},
bq:function(a,b,c,d,e){var z={}
z.a=d
P.re(new P.rb(z,e))},
hF:function(a,b,c,d){var z,y
y=$.q
if(y===c)return d.$0()
$.q=c
z=y
try{y=d.$0()
return y}finally{$.q=z}},
hH:function(a,b,c,d,e){var z,y
y=$.q
if(y===c)return d.$1(e)
$.q=c
z=y
try{y=d.$1(e)
return y}finally{$.q=z}},
hG:function(a,b,c,d,e,f){var z,y
y=$.q
if(y===c)return d.$2(e,f)
$.q=c
z=y
try{y=d.$2(e,f)
return y}finally{$.q=z}},
br:function(a,b,c,d){var z=C.k!==c
if(z)d=c.dQ(d,!(!z||!1))
P.hI(d)},
pS:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pR:{"^":"a:33;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pT:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pU:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qU:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qV:{"^":"a:29;a",
$2:function(a,b){this.a.$2(1,new H.dm(a,b))}},
rg:{"^":"a:46;a",
$2:function(a,b){this.a(a,b)}},
qS:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.b
y=z.a
x=y.b
if((x&1)!==0?(y.gbi().e&4)!==0:(x&2)===0){z.b=!0
return}this.a.$2(null,0)}},
qT:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pV:{"^":"d;a,b,c",
hc:function(a){var z=new P.pY(a)
this.a=new P.q2(null,0,null,new P.q_(z),null,new P.q0(this,z),new P.q1(this,a),[null])},
B:{
pW:function(a){var z=new P.pV(null,!1,null)
z.hc(a)
return z}}},
pY:{"^":"a:2;a",
$0:function(){P.cr(new P.pZ(this.a))}},
pZ:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
q_:{"^":"a:2;a",
$0:function(){this.a.$0()}},
q0:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b){z.b=!1
this.b.$0()}}},
q1:{"^":"a:2;a,b",
$0:function(){var z=this.a
if((z.a.b&4)===0){z.c=new P.cg(new P.K(0,$.q,null,[null]),[null])
if(z.b){z.b=!1
P.cr(new P.pX(this.b))}return z.c.a}}},
pX:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bO:{"^":"d;al:a<,b",
i:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
B:{
bP:function(a){return new P.bO(a,1)},
aO:function(){return C.a9},
ht:function(a){return new P.bO(a,0)},
aP:function(a){return new P.bO(a,3)}}},
b9:{"^":"d;a,b,c,d",
gT:function(){var z=this.c
return z==null?this.b:z.gT()},
w:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.w())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bO){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.aj(z)
if(!!w.$isb9){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qN:{"^":"c4;a",
ga1:function(a){return new P.b9(this.a(),null,null,null)},
$asc4:I.bb,
$asx:I.bb,
B:{
aQ:function(a){return new P.qN(a)}}},
P:{"^":"d;$ti"},
hr:{"^":"d;$ti",
dS:function(a,b){if(a==null)a=new P.cM()
if(this.a.a!==0)throw H.c(new P.u("Future already completed"))
$.q.toString
this.b5(a,b)},
cX:function(a){return this.dS(a,null)}},
cg:{"^":"hr;a,$ti",
bz:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.u("Future already completed"))
z.bg(a)},
f1:function(){return this.bz(null)},
b5:function(a,b){this.a.ew(a,b)}},
qM:{"^":"hr;a,$ti",
bz:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.u("Future already completed"))
z.bh(a)},
f1:function(){return this.bz(null)},
b5:function(a,b){this.a.b5(a,b)}},
e5:{"^":"d;a,b,c,d,e,$ti",
iT:function(a){if(this.c!==6)return!0
return this.b.b.eb(this.d,a.a)},
iw:function(a){var z,y
z=this.e
y=this.b.b
if(H.av(z,{func:1,args:[,,]}))return y.jg(z,a.a,a.b)
else return y.eb(z,a.a)}},
K:{"^":"d;ce:a<,b,hM:c<,$ti",
ed:function(a,b){var z=$.q
if(z!==C.k){z.toString
if(b!=null)b=P.ef(b,z)}return this.dJ(a,b)},
bH:function(a){return this.ed(a,null)},
dJ:function(a,b){var z,y
z=new P.K(0,$.q,null,[null])
y=b==null?1:3
this.cI(new P.e5(null,z,y,a,b,[H.j(this,0),null]))
return z},
bI:function(a){var z,y
z=$.q
y=new P.K(0,z,null,this.$ti)
if(z!==C.k)z.toString
z=H.j(this,0)
this.cI(new P.e5(null,y,8,a,null,[z,z]))
return y},
cI:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.cI(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.br(null,null,z,new P.qb(this,a))}},
eQ:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.eQ(a)
return}this.a=u
this.c=y.c}z.a=this.c9(a)
y=this.b
y.toString
P.br(null,null,y,new P.qi(z,this))}},
dH:function(){var z=this.c
this.c=null
return this.c9(z)},
c9:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
bh:function(a){var z,y
z=this.$ti
if(H.aR(a,"$isP",z,"$asP"))if(H.aR(a,"$isK",z,null))P.d_(a,this)
else P.hs(a,this)
else{y=this.dH()
this.a=4
this.c=a
P.bn(this,y)}},
b5:[function(a,b){var z=this.dH()
this.a=8
this.c=new P.cw(a,b)
P.bn(this,z)},function(a){return this.b5(a,null)},"ju","$2","$1","gcK",2,2,22,0],
bg:function(a){var z
if(H.aR(a,"$isP",this.$ti,"$asP")){this.hl(a)
return}this.a=1
z=this.b
z.toString
P.br(null,null,z,new P.qd(this,a))},
hl:function(a){var z
if(H.aR(a,"$isK",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.br(null,null,z,new P.qh(this,a))}else P.d_(a,this)
return}P.hs(a,this)},
ew:function(a,b){var z
this.a=1
z=this.b
z.toString
P.br(null,null,z,new P.qc(this,a,b))},
he:function(a,b){this.a=4
this.c=a},
$isP:1,
B:{
hs:function(a,b){var z,y,x
b.a=1
try{a.ed(new P.qe(b),new P.qf(b))}catch(x){z=H.C(x)
y=H.E(x)
P.cr(new P.qg(b,z,y))}},
d_:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.c9(y)
b.a=a.a
b.c=a.c
P.bn(b,x)}else{b.a=2
b.c=a
a.eQ(y)}},
bn:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.bq(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.bn(z.a,b)}y=z.a
s=y.c
x.a=w
x.b=s
v=!w
if(v){u=b.c
u=(u&1)!==0||u===8}else u=!0
if(u){u=b.b
r=u.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){y=y.b
v=s.a
u=s.b
y.toString
P.bq(null,null,y,v,u)
return}p=$.q
if(p==null?r!=null:p!==r)$.q=r
else p=null
y=b.c
if(y===8)new P.ql(z,x,w,b).$0()
else if(v){if((y&1)!==0)new P.qk(x,b,s).$0()}else if((y&2)!==0)new P.qj(z,x,b).$0()
if(p!=null)$.q=p
y=x.b
if(!!J.o(y).$isP){if(y.a>=4){o=u.c
u.c=null
b=u.c9(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.d_(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.c9(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
qb:{"^":"a:2;a,b",
$0:function(){P.bn(this.a,this.b)}},
qi:{"^":"a:2;a,b",
$0:function(){P.bn(this.b,this.a.a)}},
qe:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bh(a)}},
qf:{"^":"a:52;a",
$2:function(a,b){this.a.b5(a,b)},
$1:function(a){return this.$2(a,null)}},
qg:{"^":"a:2;a,b,c",
$0:function(){this.a.b5(this.b,this.c)}},
qd:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dH()
z.a=4
z.c=this.b
P.bn(z,y)}},
qh:{"^":"a:2;a,b",
$0:function(){P.d_(this.b,this.a)}},
qc:{"^":"a:2;a,b,c",
$0:function(){this.a.b5(this.b,this.c)}},
ql:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.d
z=w.b.b.fu(w.d)}catch(v){y=H.C(v)
x=H.E(v)
if(this.c){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.cw(y,x)
u.a=!0
return}if(!!J.o(z).$isP){if(z instanceof P.K&&z.gce()>=4){if(z.gce()===8){w=this.b
w.b=z.ghM()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.bH(new P.qm(t))
w.a=!1}}},
qm:{"^":"a:0;a",
$1:function(a){return this.a}},
qk:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.eb(x.d,this.c)}catch(w){z=H.C(w)
y=H.E(w)
x=this.a
x.b=new P.cw(z,y)
x.a=!0}}},
qj:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.iT(z)&&w.e!=null){v=this.b
v.b=w.iw(z)
v.a=!1}}catch(u){y=H.C(u)
x=H.E(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.cw(y,x)
s.a=!0}}},
hp:{"^":"d;a,b"},
bM:{"^":"d;$ti",
Z:function(a,b){var z,y
z={}
y=new P.K(0,$.q,null,[null])
z.a=null
z.a=this.bn(new P.oC(z,this,b,y),!0,new P.oD(y),y.gcK())
return y},
gt:function(a){var z,y
z={}
y=new P.K(0,$.q,null,[P.r])
z.a=0
this.bn(new P.oG(z),!0,new P.oH(z,y),y.gcK())
return y},
ga0:function(a){var z,y
z={}
y=new P.K(0,$.q,null,[P.af])
z.a=null
z.a=this.bn(new P.oE(z,y),!0,new P.oF(y),y.gcK())
return y},
c0:function(a){var z,y,x
z=H.y(this,"bM",0)
y=H.m([],[z])
x=new P.K(0,$.q,null,[[P.M,z]])
this.bn(new P.oI(this,y),!0,new P.oJ(y,x),x.gcK())
return x}},
oC:{"^":"a;a,b,c,d",
$1:function(a){P.rd(new P.oA(this.c,a),new P.oB(),P.qX(this.a.a,this.d))},
$S:function(){return H.d5(function(a){return{func:1,args:[a]}},this.b,"bM")}},
oA:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oB:{"^":"a:0;",
$1:function(a){}},
oD:{"^":"a:2;a",
$0:function(){this.a.bh(null)}},
oG:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oH:{"^":"a:2;a,b",
$0:function(){this.b.bh(this.a.a)}},
oE:{"^":"a:0;a,b",
$1:function(a){P.r_(this.a.a,this.b,!1)}},
oF:{"^":"a:2;a",
$0:function(){this.a.bh(!0)}},
oI:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.d5(function(a){return{func:1,args:[a]}},this.a,"bM")}},
oJ:{"^":"a:2;a,b",
$0:function(){this.b.bh(this.a)}},
d0:{"^":"d;ce:b<,$ti",
ghG:function(){if((this.b&8)===0)return this.a
return this.a.c},
dw:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.e8(null,null,0,this.$ti)
this.a=z}return z}y=this.a
z=y.c
if(z==null){z=new P.e8(null,null,0,this.$ti)
y.c=z}return z},
gbi:function(){if((this.b&8)!==0)return this.a.c
return this.a},
bQ:function(){if((this.b&4)!==0)return new P.u("Cannot add event after closing")
return new P.u("Cannot add event while adding a stream")},
i5:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.bQ())
if((z&2)!==0){z=new P.K(0,$.q,null,[null])
z.bg(null)
return z}z=this.a
y=new P.K(0,$.q,null,[null])
x=a.bn(this.ghj(),!1,this.ghk(),this.ghg())
w=this.b
if((w&1)!==0?(this.gbi().e&4)!==0:(w&2)===0)x.fj()
this.a=new P.qG(z,y,x,this.$ti)
this.b|=8
return y},
eD:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$be():new P.K(0,$.q,null,[null])
this.c=z}return z},
v:[function(a,b){if(this.b>=4)throw H.c(this.bQ())
this.c5(b)},"$1","ghV",2,0,function(){return H.d5(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d0")}],
bl:function(){var z=this.b
if((z&4)!==0)return this.eD()
if(z>=4)throw H.c(this.bQ())
z|=4
this.b=z
if((z&1)!==0)this.cc()
else if((z&3)===0)this.dw().v(0,C.x)
return this.eD()},
c5:[function(a){var z=this.b
if((z&1)!==0)this.cb(a)
else if((z&3)===0)this.dw().v(0,new P.e2(a,null,this.$ti))},"$1","ghj",2,0,function(){return H.d5(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"d0")}],
dn:[function(a,b){var z=this.b
if((z&1)!==0)this.cd(a,b)
else if((z&3)===0)this.dw().v(0,new P.e3(a,b,null))},"$2","ghg",4,0,40],
ev:[function(){var z=this.a
this.a=z.c
this.b&=4294967287
z.a.bg(null)},"$0","ghk",0,0,7],
hQ:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.u("Stream has already been listened to."))
z=$.q
y=d?1:0
x=new P.q6(this,null,null,null,z,y,null,null,this.$ti)
x.hd(a,b,c,d,H.j(this,0))
w=this.ghG()
y=this.b|=1
if((y&8)!==0){v=this.a
v.c=x
v.b.ft()}else this.a=x
x.hO(w)
x.dD(new P.qI(this))
return x},
hJ:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.ck()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.C(v)
x=H.E(v)
u=new P.K(0,$.q,null,[null])
u.ew(y,x)
z=u}else z=z.bI(w)
w=new P.qH(this)
if(z!=null)z=z.bI(w)
else w.$0()
return z}},
qI:{"^":"a:2;a",
$0:function(){P.eg(this.a.d)}},
qH:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bg(null)}},
qP:{"^":"d;$ti",
cb:function(a){this.gbi().c5(a)},
cd:function(a,b){this.gbi().dn(a,b)},
cc:function(){this.gbi().ev()}},
q3:{"^":"d;$ti",
cb:function(a){this.gbi().bP(new P.e2(a,null,[H.j(this,0)]))},
cd:function(a,b){this.gbi().bP(new P.e3(a,b,null))},
cc:function(){this.gbi().bP(C.x)}},
q2:{"^":"d0+q3;a,b,c,d,e,f,r,$ti"},
qO:{"^":"d0+qP;a,b,c,d,e,f,r,$ti"},
cY:{"^":"qJ;a,$ti",
gD:function(a){return(H.aA(this.a)^892482866)>>>0},
S:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cY))return!1
return b.a===this.a}},
q6:{"^":"e1;x,a,b,c,d,e,f,r,$ti",
eL:function(){return this.x.hJ(this)},
eN:[function(){var z=this.x
if((z.b&8)!==0)z.a.b.fj()
P.eg(z.e)},"$0","geM",0,0,7],
eP:[function(){var z=this.x
if((z.b&8)!==0)z.a.b.ft()
P.eg(z.f)},"$0","geO",0,0,7]},
pN:{"^":"d;$ti",
ck:function(){var z=this.b.ck()
if(z==null){this.a.bg(null)
return}return z.bI(new P.pO(this))}},
pO:{"^":"a:2;a",
$0:function(){this.a.a.bg(null)}},
qG:{"^":"pN;c,a,b,$ti"},
e1:{"^":"d;ce:e<,$ti",
hO:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.cD(this)}},
iY:function(a){var z,y,x
z=this.e
if((z&8)!==0)return
y=(z+128|4)>>>0
this.e=y
if(z<128&&this.r!=null){x=this.r
if(x.a===1)x.a=3}if((z&4)===0&&(y&32)===0)this.dD(this.geM())},
fj:function(){return this.iY(null)},
ft:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128)if((z&64)!==0&&this.r.c!=null)this.r.cD(this)
else{z=(z&4294967291)>>>0
this.e=z
if((z&32)===0)this.dD(this.geO())}}},
ck:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dr()
z=this.f
return z==null?$.$get$be():z},
dr:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.eL()},
c5:function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cb(a)
else this.bP(new P.e2(a,null,[H.y(this,"e1",0)]))},
dn:function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cd(a,b)
else this.bP(new P.e3(a,b,null))},
ev:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cc()
else this.bP(C.x)},
eN:[function(){},"$0","geM",0,0,7],
eP:[function(){},"$0","geO",0,0,7],
eL:function(){return},
bP:function(a){var z,y
z=this.r
if(z==null){z=new P.e8(null,null,0,[H.y(this,"e1",0)])
this.r=z}z.v(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cD(this)}},
cb:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fz(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dt((z&4)!==0)},
cd:function(a,b){var z,y
z=this.e
y=new P.q5(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dr()
z=this.f
if(!!J.o(z).$isP&&z!==$.$get$be())z.bI(y)
else y.$0()}else{y.$0()
this.dt((z&4)!==0)}},
cc:function(){var z,y
z=new P.q4(this)
this.dr()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isP&&y!==$.$get$be())y.bI(z)
else z.$0()},
dD:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dt((z&4)!==0)},
dt:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.eN()
else this.eP()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.cD(this)},
hd:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ef(b==null?P.rm():b,z)
this.c=c==null?P.rl():c}},
q5:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.av(y,{func:1,args:[P.d,P.bj]})
w=z.d
v=this.b
u=z.b
if(x)w.jh(u,v,this.c)
else w.fz(u,v)
z.e=(z.e&4294967263)>>>0}},
q4:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fv(z.c)
z.e=(z.e&4294967263)>>>0}},
qJ:{"^":"bM;$ti",
bn:function(a,b,c,d){return this.a.hQ(a,d,c,!0===b)}},
e4:{"^":"d;d4:a@,$ti"},
e2:{"^":"e4;al:b<,a,$ti",
e5:function(a){a.cb(this.b)}},
e3:{"^":"e4;f6:b<,bO:c<,a",
e5:function(a){a.cd(this.b,this.c)},
$ase4:I.bb},
q7:{"^":"d;",
e5:function(a){a.cc()},
gd4:function(){return},
sd4:function(a){throw H.c(new P.u("No events after a done."))}},
qB:{"^":"d;ce:a<,$ti",
cD:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cr(new P.qC(this,a))
this.a=1}},
qC:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gd4()
z.b=w
if(w==null)z.c=null
x.e5(this.b)}},
e8:{"^":"qB;b,c,a,$ti",
ga0:function(a){return this.c==null},
v:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sd4(b)
this.c=b}}},
qK:{"^":"d;a,b,c,$ti"},
qZ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b5(this.b,this.c)}},
qY:{"^":"a:29;a,b",
$2:function(a,b){P.qW(this.a,this.b,a,b)}},
r0:{"^":"a:2;a,b",
$0:function(){return this.a.bh(this.b)}},
cw:{"^":"d;f6:a<,bO:b<",
i:function(a){return H.b(this.a)},
$isa6:1},
qR:{"^":"d;"},
rb:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cM()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.i(0)
throw x}},
qD:{"^":"qR;",
fv:function(a){var z,y,x,w
try{if(C.k===$.q){x=a.$0()
return x}x=P.hF(null,null,this,a)
return x}catch(w){z=H.C(w)
y=H.E(w)
return P.bq(null,null,this,z,y)}},
fz:function(a,b){var z,y,x,w
try{if(C.k===$.q){x=a.$1(b)
return x}x=P.hH(null,null,this,a,b)
return x}catch(w){z=H.C(w)
y=H.E(w)
return P.bq(null,null,this,z,y)}},
jh:function(a,b,c){var z,y,x,w
try{if(C.k===$.q){x=a.$2(b,c)
return x}x=P.hG(null,null,this,a,b,c)
return x}catch(w){z=H.C(w)
y=H.E(w)
return P.bq(null,null,this,z,y)}},
dQ:function(a,b){if(b)return new P.qE(this,a)
else return new P.qF(this,a)},
h:function(a,b){return},
fu:function(a){if($.q===C.k)return a.$0()
return P.hF(null,null,this,a)},
eb:function(a,b){if($.q===C.k)return a.$1(b)
return P.hH(null,null,this,a,b)},
jg:function(a,b,c){if($.q===C.k)return a.$2(b,c)
return P.hG(null,null,this,a,b,c)}},
qE:{"^":"a:2;a,b",
$0:function(){return this.a.fv(this.b)}},
qF:{"^":"a:2;a,b",
$0:function(){return this.a.fu(this.b)}}}],["","",,P,{"^":"",
dy:function(a,b){return new H.Q(0,null,null,null,null,null,0,[a,b])},
aW:function(){return new H.Q(0,null,null,null,null,null,0,[null,null])},
a1:function(a){return H.tR(a,new H.Q(0,null,null,null,null,null,0,[null,null]))},
lP:function(a,b,c){var z,y
if(P.ed(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bT()
y.push(a)
try{P.r6(a,z)}finally{y.pop()}y=P.fX(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cI:function(a,b,c){var z,y,x
if(P.ed(a))return b+"..."+c
z=new P.bk(b)
y=$.$get$bT()
y.push(a)
try{x=z
x.C=P.fX(x.gC(),a,", ")}finally{y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
ed:function(a){var z,y
for(z=0;y=$.$get$bT(),z<y.length;++z)if(a===y[z])return!0
return!1},
r6:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga1(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.w())return
w=H.b(z.gT())
b.push(w)
y+=w.length+2;++x}if(!z.w()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gT();++x
if(!z.w()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
u=b.pop()
y+=v.length+2}else{s=z.gT();++x
for(;z.w();t=s,s=r){r=z.gT();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
mc:function(a,b,c,d,e){return new H.Q(0,null,null,null,null,null,0,[d,e])},
fb:function(a,b,c){var z=P.mc(null,null,null,b,c)
a.Z(0,new P.rt(z))
return z},
ah:function(a,b,c,d){return new P.hu(0,null,null,null,null,null,0,[d])},
c8:function(a,b){var z,y
z=P.ah(null,null,null,b)
for(y=J.aj(a);y.w();)z.v(0,y.gT())
return z},
dD:function(a){var z,y,x
z={}
if(P.ed(a))return"{...}"
y=new P.bk("")
try{$.$get$bT().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.Z(0,new P.mm(z,y))
z=y
z.C=z.gC()+"}"}finally{$.$get$bT().pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
hv:{"^":"Q;a,b,c,d,e,f,r,$ti",
cp:function(a){return H.uG(a)&0x3ffffff},
cq:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
B:{
bQ:function(a,b){return new P.hv(0,null,null,null,null,null,0,[a,b])}}},
hu:{"^":"qn;a,b,c,d,e,f,r,$ti",
hE:function(){return new P.hu(0,null,null,null,null,null,0,this.$ti)},
ga1:function(a){var z=new P.ae(this,this.r,null,null,[null])
z.c=this.e
return z},
gt:function(a){return this.a},
ga0:function(a){return this.a===0},
ae:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hn(b)},
hn:function(a){var z=this.d
if(z==null)return!1
return this.cN(z[this.cL(a)],a)>=0},
d2:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.ae(0,a)?a:null
else return this.hB(a)},
hB:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cL(a)]
x=this.cN(y,a)
if(x<0)return
return J.aI(y,x).ghq()},
Z:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
v:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.ex(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.ex(x,b)}else return this.ax(b)},
ax:function(a){var z,y,x
z=this.d
if(z==null){z=P.qw()
this.d=z}y=this.cL(a)
x=z[y]
if(x==null)z[y]=[this.du(a)]
else{if(this.cN(x,a)>=0)return!1
x.push(this.du(a))}return!0},
a_:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ey(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ey(this.c,b)
else return this.hK(b)},
hK:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cL(a)]
x=this.cN(y,a)
if(x<0)return!1
this.ez(y.splice(x,1)[0])
return!0},
hv:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.a_(0,y)}},
aW:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
ex:function(a,b){if(a[b]!=null)return!1
a[b]=this.du(b)
return!0},
ey:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ez(z)
delete a[b]
return!0},
du:function(a){var z,y
z=new P.qv(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ez:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cL:function(a){return J.f(a)&0x3ffffff},
cN:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.t(a[y].a,b))return y
return-1},
$isdT:1,
$isac:1,
B:{
qw:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qv:{"^":"d;hq:a<,b,c"},
ae:{"^":"d;a,b,c,d,$ti",
gT:function(){return this.d},
w:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qn:{"^":"nY;$ti"},
c4:{"^":"x;$ti"},
rt:{"^":"a:6;a",
$2:function(a,b){this.a.u(0,a,b)}},
fc:{"^":"fl;$ti"},
fl:{"^":"d+b6;$ti",$asM:null,$asac:null,$isM:1,$isac:1},
b6:{"^":"d;$ti",
ga1:function(a){return new H.dz(this,this.gt(this),0,null,[H.y(this,"b6",0)])},
ar:function(a,b){return this.h(0,b)},
Z:function(a,b){var z,y
z=this.gt(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gt(this))throw H.c(new P.B(this))}},
ga0:function(a){return this.gt(this)===0},
ge0:function(a){return!this.ga0(this)},
gE:function(a){if(this.gt(this)===0)throw H.c(H.aK())
return this.h(0,this.gt(this)-1)},
ae:function(a,b){var z,y,x
z=this.gt(this)
for(y=0;y<this.gt(this);++y){x=this.h(0,y)
if(x==null?b==null:x===b)return!0
if(z!==this.gt(this))throw H.c(new P.B(this))}return!1},
b6:function(a,b){var z,y
z=this.gt(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y)))return!0
if(z!==this.gt(this))throw H.c(new P.B(this))}return!1},
aX:function(a,b,c){var z,y,x
z=this.gt(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x))return x
if(z!==this.gt(this))throw H.c(new P.B(this))}return c.$0()},
bo:function(a,b){return new H.al(this,b,[H.y(this,"b6",0),null])},
dl:function(a,b){return H.fZ(this,b,null,H.y(this,"b6",0))},
eg:function(a){var z,y
z=P.ah(null,null,null,H.y(this,"b6",0))
for(y=0;y<this.gt(this);++y)z.v(0,this.h(0,y))
return z},
v:function(a,b){var z=this.gt(this)
this.st(0,z+1)
this.u(0,z,b)},
a_:function(a,b){var z
for(z=0;z<this.gt(this);++z)if(this.h(0,z)===b){this.aN(0,z,this.gt(this)-1,this,z+1)
this.st(0,this.gt(this)-1)
return!0}return!1},
hu:function(a,b){var z,y,x,w
z=H.m([],[H.y(this,"b6",0)])
y=this.gt(this)
for(x=0;x<y;++x){w=this.h(0,x)
if(J.t(a.$1(w),b))z.push(w)
if(y!==this.gt(this))throw H.c(new P.B(this))}if(z.length!==this.gt(this)){this.fX(0,0,z.length,z)
this.st(0,z.length)}},
aN:function(a,b,c,d,e){var z,y,x,w,v
P.cb(b,c,this.gt(this),null,null,null)
z=c-b
if(z===0)return
if(H.aR(d,"$isM",[H.y(this,"b6",0)],"$asM")){y=e
x=d}else{x=J.iN(d,e).bs(0,!1)
y=0}w=J.X(x)
if(y+z>w.gt(x))throw H.c(H.f0())
if(y<b)for(v=z-1;v>=0;--v)this.u(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.u(0,b+v,w.h(x,y+v))},
fX:function(a,b,c,d){return this.aN(a,b,c,d,0)},
i:function(a){return P.cI(this,"[","]")},
$isM:1,
$isac:1},
qQ:{"^":"d;$ti",
u:function(a,b,c){throw H.c(new P.S("Cannot modify unmodifiable map"))},
$isH:1},
mk:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
u:function(a,b,c){this.a.u(0,b,c)},
aa:function(a){return this.a.aa(a)},
Z:function(a,b){this.a.Z(0,b)},
ga0:function(a){var z=this.a
return z.ga0(z)},
gt:function(a){var z=this.a
return z.gt(z)},
i:function(a){return this.a.i(0)},
$isH:1},
hk:{"^":"mk+qQ;a,$ti",$asH:null,$isH:1},
mm:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
md:{"^":"b5;a,b,c,d,$ti",
ga1:function(a){return new P.e7(this,this.c,this.d,this.b,null,this.$ti)},
Z:function(a,b){var z,y
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){b.$1(this.a[y])
if(z!==this.d)H.e(new P.B(this))}},
ga0:function(a){return this.b===this.c},
gt:function(a){return(this.c-this.b&this.a.length-1)>>>0},
ar:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.e(P.cH(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
av:function(a,b){var z,y,x,w,v,u,t,s
z=this.$ti
if(H.aR(b,"$isM",z,"$asM")){y=b.gt(b)
x=this.gt(this)
w=C.i.aL(x,y)
v=this.a.length
if(w>=v){w=C.i.aL(x,y)
w=new Array(P.me(w+C.i.cS(w,1)))
w.fixed$length=Array
u=H.m(w,z)
this.c=this.hT(u)
this.a=u
this.b=0
C.a.aN(u,x,C.i.aL(x,y),b,0)
this.c=C.i.aL(this.c,y)}else{t=v-this.c
if(y.bL(0,t)){z=this.a
w=this.c
C.a.aN(z,w,C.i.aL(w,y),b,0)
this.c=C.i.aL(this.c,y)}else{s=y.c2(0,t)
z=this.a
w=this.c
C.a.aN(z,w,w+t,b,0)
C.a.aN(this.a,0,s,b,t)
this.c=s}}++this.d}else for(z=new P.e7(b,b.c,b.d,b.b,null,[H.j(b,0)]);z.w();)this.ax(z.e)},
aW:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
i:function(a){return P.cI(this,"{","}")},
eY:function(a){var z,y
z=this.b
y=this.a
z=(z-1&y.length-1)>>>0
this.b=z
y[z]=a
if(z===this.c)this.eH();++this.d},
d6:function(){var z,y,x
z=this.b
if(z===this.c)throw H.c(H.aK());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
ax:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.eH();++this.d},
eH:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.m(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aN(y,0,w,z,x)
C.a.aN(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
hT:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aN(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aN(a,0,v,x,z)
C.a.aN(a,v,v+this.c,this.a,0)
return this.c+v}},
h4:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.m(z,[b])},
B:{
b7:function(a,b){var z=new P.md(null,0,0,0,[b])
z.h4(a,b)
return z},
me:function(a){var z
a=C.S.js(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
e7:{"^":"d;a,b,c,d,e,$ti",
gT:function(){return this.e},
w:function(){var z,y
z=this.a
if(this.c!==z.d)H.e(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
nZ:{"^":"d;$ti",
ga0:function(a){return this.a===0},
av:function(a,b){var z
for(z=J.aj(b);z.w();)this.v(0,z.gT())},
ic:function(a){var z,y
for(z=a.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e;y.w();)if(!this.ae(0,y.d))return!1
return!0},
bs:function(a,b){var z,y,x,w
z=H.m([],this.$ti)
C.a.st(z,this.a)
for(y=new P.ae(this,this.r,null,null,[null]),y.c=this.e,x=0;y.w();x=w){w=x+1
z[x]=y.d}return z},
c0:function(a){return this.bs(a,!0)},
bo:function(a,b){return new H.cE(this,b,[H.j(this,0),null])},
i:function(a){return P.cI(this,"{","}")},
Z:function(a,b){var z
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.w();)b.$1(z.d)},
b7:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=b;z.w();)y=c.$2(y,z.d)
return y},
aX:function(a,b,c){var z,y
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e;z.w();){y=z.d
if(b.$1(y))return y}if(c!=null)return c.$0()
throw H.c(H.aK())},
cY:function(a,b){return this.aX(a,b,null)},
be:function(a,b){var z,y,x,w
for(z=new P.ae(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.w();){w=z.d
if(b.$1(w)){if(x)throw H.c(H.dq())
y=w
x=!0}}if(x)return y
throw H.c(H.aK())},
$isdT:1,
$isac:1},
nY:{"^":"nZ;$ti"}}],["","",,P,{"^":"",
d2:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qq(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d2(a[z])
return a},
r9:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.a5(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.C(x)
w=String(y)
throw H.c(new P.eV(w,null,null))}w=P.d2(z)
return w},
xb:[function(a){return a.dc()},"$1","to",2,0,0],
qq:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hI(b):y}},
gt:function(a){var z
if(this.b==null){z=this.c
z=z.gt(z)}else z=this.cM().length
return z},
ga0:function(a){var z
if(this.b==null){z=this.c
z=z.gt(z)}else z=this.cM().length
return z===0},
u:function(a,b,c){var z,y
if(this.b==null)this.c.u(0,b,c)
else if(this.aa(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.hS().u(0,b,c)},
aa:function(a){if(this.b==null)return this.c.aa(a)
return Object.prototype.hasOwnProperty.call(this.a,a)},
Z:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Z(0,b)
z=this.cM()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d2(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
i:function(a){return P.dD(this)},
cM:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
hS:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dy(P.l,null)
y=this.cM()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.u(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.st(y,0)
this.b=null
this.a=null
this.c=z
return z},
hI:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d2(this.a[a])
return this.b[a]=z},
$isH:1,
$asH:function(){return[P.l,null]}},
eO:{"^":"d;$ti"},
cC:{"^":"d;$ti"},
du:{"^":"a6;a,b",
i:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lW:{"^":"du;a,b",
i:function(a){return"Cyclic error in JSON stringify"}},
lV:{"^":"eO;a,b",
ii:function(a,b){var z=P.r9(a,this.gij().a)
return z},
ih:function(a){return this.ii(a,null)},
ir:function(a,b){var z=this.gis()
z=P.qs(a,z.b,z.a)
return z},
f5:function(a){return this.ir(a,null)},
gis:function(){return C.V},
gij:function(){return C.U},
$aseO:function(){return[P.d,P.l]}},
lY:{"^":"cC;a,b",
$ascC:function(){return[P.d,P.l]}},
lX:{"^":"cC;a",
$ascC:function(){return[P.l,P.d]}},
qt:{"^":"d;",
fJ:function(a){var z,y,x,w,v,u,t
z=a.length
for(y=J.bu(a),x=this.c,w=0,v=0;v<z;++v){u=y.bR(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.c.aw(a,w,v)
w=v+1
x.C+=H.ap(92)
switch(u){case 8:x.C+=H.ap(98)
break
case 9:x.C+=H.ap(116)
break
case 10:x.C+=H.ap(110)
break
case 12:x.C+=H.ap(102)
break
case 13:x.C+=H.ap(114)
break
default:x.C+=H.ap(117)
x.C+=H.ap(48)
x.C+=H.ap(48)
t=u>>>4&15
x.C+=H.ap(t<10?48+t:87+t)
t=u&15
x.C+=H.ap(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.C+=C.c.aw(a,w,v)
w=v+1
x.C+=H.ap(92)
x.C+=H.ap(u)}}if(w===0)x.C+=H.b(a)
else if(w<z)x.C+=y.aw(a,w,z)},
ds:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lW(a,null))}z.push(a)},
df:function(a){var z,y,x
if(this.fI(a))return
this.ds(a)
try{z=this.b.$1(a)
if(!this.fI(z))throw H.c(new P.du(a,null))
this.a.pop()}catch(x){y=H.C(x)
throw H.c(new P.du(a,y))}},
fI:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.C+=C.m.i(a)
return!0}else if(a===!0){this.c.C+="true"
return!0}else if(a===!1){this.c.C+="false"
return!0}else if(a==null){this.c.C+="null"
return!0}else if(typeof a==="string"){z=this.c
z.C+='"'
this.fJ(a)
z.C+='"'
return!0}else{z=J.o(a)
if(!!z.$isM){this.ds(a)
this.jq(a)
this.a.pop()
return!0}else if(!!z.$isH){this.ds(a)
y=this.jr(a)
this.a.pop()
return y}else return!1}},
jq:function(a){var z,y,x
z=this.c
z.C+="["
y=J.X(a)
if(y.gt(a)>0){this.df(y.h(a,0))
for(x=1;x<y.gt(a);++x){z.C+=","
this.df(y.h(a,x))}}z.C+="]"},
jr:function(a){var z,y,x,w,v,u
z={}
if(a.ga0(a)){this.c.C+="{}"
return!0}y=a.gt(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Z(0,new P.qu(z,x))
if(!z.b)return!1
w=this.c
w.C+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.C+=v
this.fJ(x[u])
w.C+='":'
this.df(x[u+1])}w.C+="}"
return!0}},
qu:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
z[x]=a
y.a=w+1
z[w]=b}},
qr:{"^":"qt;c,a,b",B:{
qs:function(a,b,c){var z,y,x
z=new P.bk("")
y=new P.qr(z,[],P.to())
y.df(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wy:[function(a,b){return J.bx(a,b)},"$2","tp",4,0,42],
eS:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.J(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kR(a)},
kR:function(a){var z=J.o(a)
if(!!z.$isa)return z.i(a)
return H.cO(a)},
cF:function(a){return new P.qa(a)},
O:function(a,b,c){var z,y
z=H.m([],[c])
for(y=J.aj(a);y.w();)z.push(y.gT())
if(b)return z
z.fixed$length=Array
return z},
mf:function(a,b,c,d){var z,y
z=H.m(new Array(a),[d])
for(y=0;y<a;++y)z[y]=b.$1(y)
return z},
az:function(a,b){var z=P.O(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eq:function(a){H.uO(H.b(a))},
bh:function(a,b,c){return new H.f5(a,H.ds(a,!1,b,!1),null,null)},
af:{"^":"d;"},
"+bool":0,
a0:{"^":"d;$ti"},
aY:{"^":"L;",$isa0:1,
$asa0:function(){return[P.L]}},
"+double":0,
bz:{"^":"d;a",
aL:function(a,b){return new P.bz(C.i.aL(this.a,b.geC()))},
c2:function(a,b){return new P.bz(C.i.c2(this.a,b.geC()))},
bL:function(a,b){return C.i.bL(this.a,b.geC())},
cC:function(a,b){return this.a>b.a},
S:function(a,b){if(b==null)return!1
if(!(b instanceof P.bz))return!1
return this.a===b.a},
gD:function(a){return this.a&0x1FFFFFFF},
by:function(a,b){return C.i.by(this.a,b.a)},
i:function(a){var z,y,x,w,v
z=new P.ky()
y=this.a
if(y<0)return"-"+new P.bz(0-y).i(0)
x=z.$1(C.i.bu(y,6e7)%60)
w=z.$1(C.i.bu(y,1e6)%60)
v=new P.kx().$1(y%1e6)
return""+C.i.bu(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isa0:1,
$asa0:function(){return[P.bz]}},
kx:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
ky:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a6:{"^":"d;",
gbO:function(){return H.E(this.$thrownJsError)}},
cM:{"^":"a6;",
i:function(a){return"Throw of null."}},
b2:{"^":"a6;a,b,n:c<,d",
gdA:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdz:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdA()+y+x
if(!this.a)return w
v=this.gdz()
u=P.eS(this.b)
return w+v+": "+H.b(u)},
B:{
F:function(a){return new P.b2(!1,null,null,a)},
de:function(a,b,c){return new P.b2(!0,a,b,c)},
i:function(a){return new P.b2(!1,null,a,"Must not be null")}}},
dR:{"^":"b2;e,f,a,b,c,d",
gdA:function(){return"RangeError"},
gdz:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
B:{
nb:function(a){return new P.dR(null,null,!1,null,null,a)},
ca:function(a,b,c){return new P.dR(null,null,!0,a,b,"Value not in range")},
a8:function(a,b,c,d,e){return new P.dR(b,c,!0,a,d,"Invalid value")},
nc:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a8(a,b,c,d,e))},
cb:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a8(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a8(b,a,c,"end",f))
return b}}},
lE:{"^":"b2;e,t:f>,a,b,c,d",
gdA:function(){return"RangeError"},
gdz:function(){if(J.iC(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+z},
B:{
cH:function(a,b,c,d,e){var z=e!=null?e:J.aT(b)
return new P.lE(b,z,!0,a,c,"Index out of range")}}},
S:{"^":"a6;a",
i:function(a){return"Unsupported operation: "+this.a}},
Z:{"^":"a6;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
u:{"^":"a6;a",
i:function(a){return"Bad state: "+this.a}},
B:{"^":"a6;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eS(z))+"."}},
mI:{"^":"d;",
i:function(a){return"Out of Memory"},
gbO:function(){return},
$isa6:1},
fT:{"^":"d;",
i:function(a){return"Stack Overflow"},
gbO:function(){return},
$isa6:1},
k5:{"^":"a6;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
qa:{"^":"d;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eV:{"^":"d;a,b,c",
i:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.c.aw(x,0,75)+"..."
return y+"\n"+x}},
kW:{"^":"d;n:a<,hz,$ti",
i:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.hz
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.e(P.de(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.ft(b,"expando$values")
return y==null?null:H.ft(y,z)}},
bA:{"^":"d;"},
r:{"^":"L;",$isa0:1,
$asa0:function(){return[P.L]}},
"+int":0,
x:{"^":"d;$ti",
bo:function(a,b){return H.bC(this,b,H.y(this,"x",0),null)},
bJ:["cH",function(a,b){return new H.I(this,b,[H.y(this,"x",0)])}],
ae:function(a,b){var z
for(z=this.ga1(this);z.w();)if(J.t(z.gT(),b))return!0
return!1},
Z:function(a,b){var z
for(z=this.ga1(this);z.w();)b.$1(z.gT())},
b7:function(a,b,c){var z,y
for(z=this.ga1(this),y=b;z.w();)y=c.$2(y,z.gT())
return y},
b6:function(a,b){var z
for(z=this.ga1(this);z.w();)if(b.$1(z.gT()))return!0
return!1},
bs:function(a,b){return P.O(this,b,H.y(this,"x",0))},
c0:function(a){return this.bs(a,!0)},
eg:function(a){return P.c8(this,H.y(this,"x",0))},
gt:function(a){var z,y
z=this.ga1(this)
for(y=0;z.w();)++y
return y},
ga0:function(a){return!this.ga1(this).w()},
ge0:function(a){return!this.ga0(this)},
dl:function(a,b){return H.o4(this,b,H.y(this,"x",0))},
gE:function(a){var z,y
z=this.ga1(this)
if(!z.w())throw H.c(H.aK())
do y=z.gT()
while(z.w())
return y},
gbM:function(a){var z,y
z=this.ga1(this)
if(!z.w())throw H.c(H.aK())
y=z.gT()
if(z.w())throw H.c(H.dq())
return y},
ar:function(a,b){var z,y,x
if(b<0)H.e(P.a8(b,0,null,"index",null))
for(z=this.ga1(this),y=0;z.w();){x=z.gT()
if(b===y)return x;++y}throw H.c(P.cH(b,this,"index",null,y))},
i:function(a){return P.lP(this,"(",")")}},
cJ:{"^":"d;$ti"},
M:{"^":"d;$ti",$isx:1,$isac:1},
"+List":0,
H:{"^":"d;$ti"},
ar:{"^":"d;",
gD:function(a){return P.d.prototype.gD.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
L:{"^":"d;",$isa0:1,
$asa0:function(){return[P.L]}},
"+num":0,
d:{"^":";",
S:function(a,b){return this===b},
gD:function(a){return H.aA(this)},
i:function(a){return H.cO(this)},
gec:function(a){return new H.aC(H.uo(this),null)},
toString:function(){return this.i(this)}},
bg:{"^":"d;"},
bj:{"^":"d;"},
l:{"^":"d;",$isa0:1,
$asa0:function(){return[P.l]},
$isdK:1},
"+String":0,
bk:{"^":"d;C<",
gt:function(a){return this.C.length},
ga0:function(a){return this.C.length===0},
i:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
B:{
fX:function(a,b,c){var z=J.aj(b)
if(!z.w())return a
if(c.length===0){do a+=H.b(z.gT())
while(z.w())}else{a+=H.b(z.gT())
for(;z.w();)a=a+c+H.b(z.gT())}return a},
oM:function(a){return new P.bk(a)}}}}],["","",,P,{"^":"",fH:{"^":"d;"}}],["","",,P,{"^":"",
dQ:function(a){return C.P},
qp:{"^":"d;",
ak:function(a){if(a<=0||a>4294967296)throw H.c(P.nb("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
iV:function(){return Math.random()}}}],["","",,S,{"^":"",di:{"^":"d;a,b,$ti",
af:function(a){var z=new S.N(null,null,this.$ti)
z.ac()
z.j(this)
a.$1(z)
return z.p()},
gD:function(a){var z=this.b
if(z==null){z=X.bv(this.a)
this.b=z}return z},
S:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdi)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gD(b)
w=this.gD(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;v!==x.length;++v)if(!J.t(y[v],x[v]))return!1
return!0},
i:function(a){return J.J(this.a)},
h:function(a,b){return this.a[b]},
gt:function(a){return this.a.length},
ga1:function(a){var z=this.a
return new J.b3(z,z.length,0,null,[H.j(z,0)])},
bo:function(a,b){var z=this.a
z.toString
return new H.al(z,b,[H.j(z,0),null])},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
ga0:function(a){return this.a.length===0},
ac:function(){if(new H.aC(H.a_(H.j(this,0)),null).S(0,C.u))throw H.c(new P.S('explicit element type required, for example "new BuiltList<int>"'))}},N:{"^":"d;a,b,$ti",
p:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.di(z,null,this.$ti)
y.ac()
this.a=z
this.b=y
z=y}return z},
j:function(a){if(H.aR(a,"$isdi",this.$ti,null)){this.a=a.a
this.b=a}else{this.a=P.O(a,!0,H.j(this,0))
this.b=null}},
h:function(a,b){return this.a[b]},
v:function(a,b){var z
if(b==null)H.e(P.F("null element"))
z=this.gcQ();(z&&C.a).v(z,b)},
gcQ:function(){if(this.b!=null){this.a=P.O(this.a,!0,H.j(this,0))
this.b=null}return this.a},
ac:function(){if(new H.aC(H.a_(H.j(this,0)),null).S(0,C.u))throw H.c(new P.S('explicit element type required, for example "new ListBuilder<int>"'))}}}],["","",,A,{"^":"",cz:{"^":"d;a,b,c,d,$ti",
af:function(a){var z=new A.cL(null,null,this.$ti)
z.bS()
z.j(this)
a.$1(z)
return z.p()},
gD:function(a){var z=this.b
if(z==null){z=this.a.gbW()
z=H.bC(z,new A.jH(this),H.y(z,"x",0),null)
z=P.O(z,!1,H.y(z,"x",0))
C.a.ep(z)
z=X.bv(z)
this.b=z}return z},
S:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscz)return!1
y=b.a
x=this.a
if(y.gt(y)!==x.gt(x))return!1
z=z.gD(b)
w=this.gD(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbW()
this.c=z}z=z.ga1(z)
for(;z.w();){v=z.gT()
if(!J.t(y.h(0,v),x.h(0,v)))return!1}return!0},
i:function(a){return J.J(this.a)},
h:function(a,b){return this.a.h(0,b)},
Z:function(a,b){this.a.Z(0,b)},
ga0:function(a){var z=this.a
return z.ga0(z)},
gt:function(a){var z=this.a
return z.gt(z)},
bS:function(){if(new H.aC(H.a_(H.j(this,0)),null).S(0,C.u))throw H.c(new P.S('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aC(H.a_(H.j(this,1)),null).S(0,C.u))throw H.c(new P.S('explicit value type required, for example "new BuiltMap<int, int>"'))}},jH:{"^":"a:0;a",
$1:function(a){var z,y
z=J.f(a)
y=J.f(this.a.a.h(0,a))
return X.d3(X.aX(X.aX(0,J.f(z)),J.f(y)))}},cL:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new A.cz(this.a,null,null,null,this.$ti)
z.bS()
this.b=z}return z},
j:function(a){var z
if(H.aR(a,"$iscz",this.$ti,null)){this.b=a
this.a=a.a}else if(!!a.$iscz){z=P.fb(a.a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else if(!!a.$isH){z=P.fb(a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else throw H.c(P.F("expected Map or BuiltMap, got "+a.gec(a).i(0)))},
h:function(a,b){return this.a.h(0,b)},
bS:function(){if(new H.aC(H.a_(H.j(this,0)),null).S(0,C.u))throw H.c(new P.S('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aC(H.a_(H.j(this,1)),null).S(0,C.u))throw H.c(new P.S('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dj:{"^":"d;a,b,$ti",
af:function(a){var z=new L.W(null,null,this.$ti)
z.ai()
z.j(this)
a.$1(z)
return z.p()},
gD:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.O(new H.cE(z,new L.jI(),[H.j(z,0),null]),!1,null)
C.a.ep(z)
z=X.bv(z)
this.b=z}return z},
S:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isdj)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gD(b)
x=this.gD(this)
if(z==null?x!=null:z!==x)return!1
return y.ic(b)},
i:function(a){return J.J(this.a)},
gt:function(a){return this.a.a},
d2:function(a){return this.a.d2(a)},
ga1:function(a){var z,y
z=this.a
y=new P.ae(z,z.r,null,null,[null])
y.c=z.e
return y},
bo:function(a,b){var z=this.a
z.toString
return new H.cE(z,b,[H.j(z,0),null])},
ae:function(a,b){return this.a.ae(0,b)},
Z:function(a,b){return this.a.Z(0,b)},
ga0:function(a){return this.a.a===0},
ai:function(){if(new H.aC(H.a_(H.j(this,0)),null).S(0,C.u))throw H.c(new P.S('explicit element type required, for example "new BuiltSet<int>"'))}},jI:{"^":"a:0;",
$1:function(a){return J.f(a)}},W:{"^":"d;a,b,$ti",
p:function(){var z=this.b
if(z==null){z=new L.dj(this.a,null,this.$ti)
z.ai()
this.b=z}return z},
j:function(a){var z,y,x,w
if(H.aR(a,"$isdj",this.$ti,null)){this.a=a.a
this.b=a}else{z=H.j(this,0)
y=P.ah(null,null,null,z)
for(x=J.aj(a);x.w();){w=x.gT()
if(H.hR(w,z))y.v(0,w)
else throw H.c(P.F("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
gb_:function(){if(this.b!=null){this.a=P.c8(this.a,H.j(this,0))
this.b=null}return this.a},
ai:function(){if(new H.aC(H.a_(H.j(this,0)),null).S(0,C.u))throw H.c(new P.S('explicit element type required, for example "new SetBuilder<int>"'))}}}],["","",,Y,{"^":"",
h:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
U:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
rn:{"^":"a:32;",
$1:function(a){var z,y
z=new P.bk("")
y=z.C+=H.b(a)
z.C=y+" {\n"
$.ck=$.ck+2
return new Y.lD(z)}},
lD:{"^":"d;a",
m:function(a,b,c){var z,y
if(c!=null){z=this.a
y=z.C+=C.c.bt(" ",$.ck)
y+=b
z.C=y
z.C=y+"="
z.toString
y=z.C+=H.b(c)
z.C=y+",\n"}},
i:function(a){var z,y,x
z=$.ck-2
$.ck=z
y=this.a
z=y.C+=C.c.bt(" ",z)
y.C=z+"}"
x=J.J(this.a)
this.a=null
return x}}}],["","",,N,{"^":"",nA:{"^":"ny;ch,cx,co:cy<,db,dx,b,c,d,e,f,r,x,y,z,Q,a",
fl:function(){var z=$.$get$cs()
z.u(0,"game",this.cx)
z.u(0,"hitpoints",this.cy)
z.u(0,"stamina",this.db)
z.u(0,"gold",this.dx)},
iD:function(){var z,y,x,w
this.cx=null
this.cy=Z.bJ("Health",new N.nD(),"#CCCCCC","Your physical state",100,0,!0,P.aY)
z=P.r
this.db=Z.bJ("Stamina",new N.nE(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bJ("Gold",new N.nF(),"#CCCCCC","Gold coins",0,0,!1,z)
this.dx=z
y=$.$get$bU()
x=this.cy
w=this.db
y=new O.eR(N.bf("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a3(H.m([],[Y.ai]),0,P.aW()),x,w,z,O.uV(),O.uU(),O.uT(),y,this.gfZ(),new P.bk(""),!1,null)
y.fY()
this.cx=y
y.x="endGame"
$.$get$cm().v(0,0)},
h8:function(){var z,y
z=new O.cT(["# Insignificant Little Vermin",[null,P.a1(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.u(0,"start",z)
z.a="start"
z=new O.cT([new N.nC(this),[null,P.a1(["goto","gameLoop"])]],0,null,!1,!1)
y.u(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cT(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.u(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
B:{
nB:function(){var z,y,x,w
z=Z.bJ("Health",new N.t2(),"#CCCCCC","Your physical state",100,0,!0,P.aY)
y=P.r
x=Z.bJ("Stamina",new N.t3(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bJ("Gold",new N.t4(),"#CCCCCC","Gold coins",0,0,!1,y)
w=P.l
z=new N.nA("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nG(new H.Q(0,null,null,null,null,null,0,[w,O.cT])),null,null,null,P.ah(null,null,null,w),!1,null,-9999,null,null,null)
z.h8()
return z}}},t2:{"^":"a:20;",
$1:function(a){if(a===0)return"\ud83d\udc80"
if(a<=0.5)return"\ud83d\ude23"
if(a<1)return"\ud83d\ude27"
return"\ud83d\ude10"}},t3:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83c\udf1f"}},t4:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nC:{"^":"a:17;a",
$0:function(){var z=0,y=P.ax(),x=this
var $async$$0=P.au(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:z=2
return P.at(x.a.cx.b9(),$async$$0)
case 2:return P.aE(null,y)}})
return P.aF($async$$0,y)}},nD:{"^":"a:20;",
$1:function(a){if(a===0)return"\ud83d\udc80"
if(a<=0.5)return"\ud83d\ude23"
if(a<1)return"\ud83d\ude27"
return"\ud83d\ude10"}},nE:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83c\udf1f"}},nF:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cD:{"^":"d;"},kO:{"^":"d;"},px:{"^":"cD;a,b,c",
af:function(a){var z=new M.dZ(null,!1,0,0)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cD))return!1
return this.a===b.a&&this.b===b.b&&!0},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.R.gD(!1)))},
i:function(a){var z,y
z=$.$get$T().$1("EdgeheadGlobalState")
y=J.z(z)
y.m(z,"bloodrockFollowers",this.a)
y.m(z,"brianaQuoteIndex",this.b)
y.m(z,"hasKegOfBeer",!1)
return y.i(z)}},dZ:{"^":"kO;d,a,b,c",
gc3:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
j:function(a){this.d=a},
p:function(){var z,y,x
z=this.d
if(z==null){this.gc3()
y=this.b
this.gc3()
x=this.c
this.gc3()
this.a
z=new M.px(y,x,!1)}this.j(z)
return z}}}],["","",,O,{"^":"",
xf:[function(a){return a.a-2*a.c},"$1","d8",2,0,24],
xr:[function(a){return a.a+a.b-a.c},"$1","hX",2,0,24],
eR:{"^":"mg;y,z,Q,ch,cx,cy,db,dx,dy,cA:fr<,fx,fy,co:go<,id,k1,a,b,c,d,e,f,r,x",
fY:function(){var z,y,x,w,v,u
z=P.az(C.r,null)
y=$.$get$bs()
this.cy=R.b1(1000,"orc",O.d8(),null,null,new G.aB("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,!1,2,!1,C.w,0,y)
this.db=R.b1(1001,"goblin",O.d8(),null,null,new G.aB("scimitar",1,1,!1,!0,!1,P.az(C.r,null)),null,0,1,0,!1,!1,1,!1,C.w,0,y)
y=new S.N(null,null,[Q.n])
y.ac()
y.j([new Q.n("start_adventure","","",null)])
this.dx=new K.cd(y.p(),"preStartBook",new O.kF(),new O.kG(),null,null,"ground")
y=R.b1(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!1,!0,2,!0,C.I,1,null)
this.ch=y
this.go.sal(y.x/y.db)
this.id.sal(this.ch.fy)
this.cx=R.b1(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,!1,2,!0,C.a4,0,null)
this.dy=F.fC(this.dx,!1)
y=K.cd
x=P.O($.$get$hK(),!0,y)
C.a.av(x,[this.dx,$.$get$ek()])
w=new M.dZ(null,!1,0,0).p()
z=this.ch
v=this.cx
u=this.dy
v=P.c8([z,v],R.w)
z=P.b7(null,O.cu)
u=new A.a4(v,P.ah(null,null,null,U.D),w,z,P.c8(x,y),P.O([u],!0,S.ad),0,null)
this.fr=u
y=new Y.a3(H.m([],[Y.ai]),0,P.aW())
y.b=u.r
this.fx=new B.bE(u,null,y,1,1,!0,!1,!1,0)},
cw:function(){var z=0,y=P.ax(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$cw=P.au(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.giq()
if(v.fi(u)){z=1
break}t=w.fr.A(w.ch.y)
s=w.go
r=t.x/t.db
if(!J.t(s.f,r)){s.f=r
s.y=!0
$.bL=!0}s=w.id
r=t.fy
if(!J.t(s.f,r)){s.f=r
s.y=!0
$.bL=!0}s=w.y
s.U(C.B,"update() for world at time "+w.fr.r,null,null)
r=w.fr.f
if(r.length===0){w.r=!0
v.l(0,"\n\n",!0)
if(!w.fr.iA(w.ch.y))v.l(0,"You die.",!0)
w.f.C+=v.bY()
z=1
break}r=C.a.gE(r)
q=w.fr
p=r.at(r.gV(),q)
if(p==null){v=w.fr
u=v.f
o=C.a.gE(u)
o.ct(v)
C.a.a_(u,o);++w.fr.r
z=1
break}n=G.iT(p,w.fr)
z=3
return P.at(n.j_(),$async$cw)
case 3:q=n.f
if(q.ga0(q)){m=n.a
l=n.b
m.U(C.D,"There are no actions available for actorId="+H.b(l)+".",null,null)
l="Actions not available for "+H.b(l)+" and "
k=n.c
j=k.a
i=J.o(j)
j="PlanConsequence<"+i.gD(j)+", "+i.i(j)+", "+J.J(k.b)+", "+H.b(k.d)+", "+k.y+", "
m.U(C.q,l+(j+(k.x?"isSuccess":"")+">")+".",null,null)}m=Z.mP(q)
h=new Z.mO(new P.hk(q,[null,null]),m)
if(q.ga0(q))$.$get$bF().U(C.D,"Created with no recommendations.",null,null)
q=m.length
if(q===0){s.U(C.C,"No recommendation for "+H.b(p.dx),null,null)
s.U(C.C,new O.kI(w),null,null)
w.fr.f4(r.gq());++w.fr.r
z=1
break}z=p.cx?4:6
break
case 4:if(q>1)for(g=0;u=m.length,g<u;u===q||(0,H.aw)(m),++g);s.U(C.q,"planner.generateTable for "+H.b(p.dx),null,null)
n.ej().Z(0,new O.kJ(w))
u=h.fk(r.gd3(),O.hX())
u.toString
f=P.O(u,!1,H.y(u,"x",0))
if(f.length!==0&&C.a.b6(f,new O.kK())){w.f.C+=v.bY()
C.a.st(v.a,0)}v=new O.kL(new O.kN())
u=f.length-1
if(u-0<=32)H.fS(f,0,u,v)
else H.fR(f,0,u,v)
for(v=f.length,u=w.c,g=0;g<f.length;f.length===v||(0,H.aw)(f),++g){e=f[g]
u.$3$helpMessage$script(e.gX(),e.gN(),new O.kM(w,p,e))}z=1
break
z=5
break
case 6:s=p.b
z=7
return P.at(w.c4(h.iZ(s==null?O.hX():s),p,v),$async$cw)
case 7:case 5:v.fi(u)
case 1:return P.aE(x,y)}})
return P.aF($async$cw,y)},
cJ:function(a,b,c){var z=0,y=P.ax(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cJ=P.au(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=a.H(b,x.fr)
z=w===1?2:4
break
case 2:x.fx=C.a.gbM(c)
z=3
break
case 4:z=w===0?5:7
break
case 5:x.fx=C.a.gbM(c)
z=6
break
case 7:v=C.a.gE(J.J(a.gJ()).split("."))
w.toString
u=a.a5(b,x.fr)
if(a.gO()){a.gJ()
t=b.fy>=1}else t=!1
s="use "+H.b(v)
x.eR()
z=8
return P.at(x.e.$4$rerollEffectDescription$rerollable(w,u,s,t),$async$cJ)
case 8:r=e
t=new H.I(c,new O.kz(r),[H.j(c,0)])
x.fx=t.gbM(t)
if(r.gjp()){q=A.dY(x.fx.a)
q.W(b.y,new O.kA())
u=x.fx
t=u.b
s=H.m([],[Y.ai])
p=new Y.a3(s,0,P.aW())
C.a.av(s,u.c.a)
s=u.d
o=u.e
n=u.f
m=u.r
l=u.x
u=u.y
p.b=q.r
x.fx=new B.bE(q,t,p,s,o,n,m,l,u)}case 6:case 3:return P.aE(null,y)}})
return P.aF($async$cJ,y)},
c4:function(a,b,c){var z=0,y=P.ax(),x=this,w,v
var $async$c4=P.au(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=a.cU(b,x.fx,x.fr)
v=P.O(w,!0,H.y(w,"x",0))
z=b.cx?2:4
break
case 2:z=5
return P.at(x.cJ(a,b,v),$async$c4)
case 5:z=3
break
case 4:x.fx=v[S.n9(new H.al(v,new O.kC(),[H.j(v,0),null]),1)]
case 3:C.a.av(c.a,x.fx.c.a)
x.fr=x.fx.a
w=x.y
w.U(C.q,new O.kD(a,b),null,null)
w.U(C.j,new O.kE(x,b),null,null)
return P.aE(null,y)}})
return P.aF($async$c4,y)}},
kF:{"^":"a:3;",
$3:function(a,b,c){return c.l(0,"UNUSED because this is the first choice",!0)}},
kG:{"^":"a:3;",
$3:function(a,b,c){return H.e(new P.u("Room isn't to be revisited"))}},
kI:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.al(z,new O.kH(),[H.j(z,0),null]).cr(0," <- ")}},
kH:{"^":"a:0;",
$1:function(a){return a.gbd()}},
kJ:{"^":"a:0;a",
$1:function(a){return this.a.y.U(C.q,a,null,null)}},
kN:{"^":"a:51;",
$1:function(a){if(a instanceof Q.v)return H.b(a.b.dx)+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
kK:{"^":"a:0;",
$1:function(a){return a.gX()!==""}},
kL:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bx(z.$1(a),z.$1(b))}},
kM:{"^":"a:17;a,b,c",
$0:function(){var z=0,y=P.ax(),x=this,w
var $async$$0=P.au(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.at(w.c4(x.c,x.b,w.fy),$async$$0)
case 2:return P.aE(null,y)}})
return P.aF($async$$0,y)}},
kz:{"^":"a:0;a",
$1:function(a){return a.ge1()===this.a.ge1()}},
kA:{"^":"a:0;",
$1:function(a){var z=a.gk().go
a.gk().go=z-1
return a}},
kC:{"^":"a:0;",
$1:function(a){return a.gj0()}},
kD:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.dx)+" selected "+this.a.gn()}},
kE:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.al(z,new O.kB(),[H.j(z,0),null]).cr(0," <- ")
return"- how "+H.b(this.b.dx)+" got here: "+y}},
kB:{"^":"a:0;",
$1:function(a){return a.gbd()}}}],["","",,Q,{"^":"",
i1:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$i1(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.iQ(t.aM(y.a,y),new Q.u4(z))
t=J.aj(s.a),r=new H.bN(t,s.b,[H.j(s,0)])
case 2:if(!r.w()){w=3
break}q=t.gT()
p=x.$1(q)
if(p.gI()&&z.cZ(q,y)<=0){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
i2:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i2(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.di((t.length!==0?C.a.gE(t):null).a).a.a,t=new J.b3(t,t.length,0,null,[H.j(t,0)])
case 2:if(!t.w()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
i3:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i3(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gE(t):null).a.a,t=new J.b3(t,t.length,0,null,[H.j(t,0)])
case 2:if(!t.w()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
u4:{"^":"a:0;a",
$1:function(a){return!J.t(a,this.a)&&a.gbm()}},
ag:{"^":"d;",
cU:function(a,b,c){var z=this
return P.aQ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cU(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.H(y,x.a)
v=s>0?2:3
break
case 2:r=A.dY(w)
v=4
return B.fq(r,x,z,z.hi(r,y,w,z.gM(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dY(w)
v=7
return B.fq(r,x,z,z.hh(r,y,w,z.gL(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aO()
case 1:return P.aP(t)}}})},
eu:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.be(0,new Q.iR(b))
y=new O.eE(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gn()
y.ga3().c=x
x=b.y
y.ga3().r=x
y.ga3().f=C.W
y.ga3().cx=f
y.ga3().Q=e
x=this.gI()
y.ga3().z=x
x=this.gY()
y.ga3().ch=x
if(!!this.$isv){x=y.ga3()
w=x.x
if(w==null){w=new L.W(null,null,[P.r])
w.ai()
w.j(C.h)
x.x=w
x=w}else x=w
w=this.b.y
if(w==null)H.e(P.F("null element"))
x.gb_().v(0,w)}if(!!this.$isc1){x=this.b.a
y.ga3().d=x}v=new Y.a3(H.m([],[Y.ai]),0,P.aW())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gq()
a.gD(a);(x.length!==0?C.a.gE(x):null).toString
this.a=d.$3(z,a,v)
if(a.cO(u)!=null)a.f4(u);++a.r
w=a.ek(u)
if(!(w==null))w.fg(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.at(w.gV(),a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.t(w==null?w:w.cF(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
t=C.a.gE(x)
t.ct(a)
C.a.a_(x,t)}x=x.length!==0?C.a.gE(x):null
if(!(x==null))x.fh(a,v)
if(this.a==null)H.e(new P.u("No description given when executing "+this.i(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga3().e=x
x=a.r
y.ga3().y=x
a.d.eY(y.p())
return v},
hi:function(a,b,c,d,e){return this.eu(a,b,c,d,!1,e)},
hh:function(a,b,c,d,e){return this.eu(a,b,c,d,e,!1)}},
iR:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.y
return z==null?y==null:z===y}},
v:{"^":"ag;dW:b<",
gX:function(){var z=new Y.a3(H.m([],[Y.ai]),0,P.aW())
z.eW(0,this.ga4(),this.b)
return z.bY()},
a5:function(a,b){var z=new Y.a3(H.m([],[Y.ai]),0,P.aW())
z.hY(0,this.ga8(),this.b,a,!0)
return z.bY()},
i:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga4()+"::enemy="+H.b(z.y)+"/"+H.b(z.dx)+">"}},
c1:{"^":"ag;",
gX:function(){return this.b.b},
i:function(a){return"ExitAction<"+this.b.b+">"}},
c3:{"^":"ag;",
gX:function(){var z=new Y.a3(H.m([],[Y.ai]),0,P.aW())
z.eW(0,this.ga4(),this.b)
return z.bY()},
i:function(a){return"ItemAction<"+this.gX()+">"}},
nj:{"^":"d;a,b",
i:function(a){return this.b}}}],["","",,O,{"^":"",cu:{"^":"d;",
i:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},m5:{"^":"d;a,b",
i:function(a){return this.b}},pt:{"^":"cu;a,dK:b<,dU:c<,bd:d<,e,cu:f<,er:r<,V:x<,fF:y<,z,fG:Q<,fH:ch<",
af:function(a){var z=new O.eE(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cu))return!1
if(J.t(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
y=b.f
if(z==null?y==null:z===y)if(J.t(this.r,b.r)){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)),J.f(this.f)),J.f(this.r)),J.f(this.x)),J.f(this.y)),J.f(this.z)),J.f(this.Q)),J.f(this.ch)))},
i:function(a){var z,y
z=$.$get$T().$1("ActionRecord")
y=J.z(z)
y.m(z,"accomplices",this.a)
y.m(z,"actionName",this.b)
y.m(z,"dataString",this.c)
y.m(z,"description",this.d)
y.m(z,"knownTo",this.e)
y.m(z,"protagonist",this.f)
y.m(z,"sufferers",this.r)
y.m(z,"time",this.x)
y.m(z,"wasAggressive",this.y)
y.m(z,"wasFailure",this.z)
y.m(z,"wasProactive",this.Q)
y.m(z,"wasSuccess",this.ch)
return y.i(z)}},eE:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdK:function(){return this.ga3().c},
gdU:function(){return this.ga3().d},
gbd:function(){return this.ga3().e},
gcu:function(){return this.ga3().r},
ger:function(){var z,y
z=this.ga3()
y=z.x
if(y==null){y=new L.W(null,null,[P.r])
y.ai()
y.j(C.h)
z.x=y
z=y}else z=y
return z},
gV:function(){return this.ga3().y},
gfF:function(){return this.ga3().z},
gfG:function(){return this.ga3().ch},
gfH:function(){return this.ga3().cx},
ga3:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.W(null,null,[H.j(z,0)])
y.ai()
y.j(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.W(null,null,[H.j(z,0)])
y.ai()
y.j(z)
z=y}this.x=z
z=this.a
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
if(z==null){y=this.ga3()
x=y.b
if(x==null){x=new L.W(null,null,[P.r])
x.ai()
x.j(C.h)
y.b=x
y=x}else y=x
y=y.p()
x=this.ga3().c
w=this.ga3().d
v=this.ga3().e
u=this.ga3().f
t=this.ga3().r
s=this.ga3()
r=s.x
if(r==null){r=new L.W(null,null,[P.r])
r.ai()
r.j(C.h)
s.x=r
s=r}else s=r
s=s.p()
r=this.ga3().y
q=this.ga3().z
p=this.ga3().Q
o=this.ga3().ch
n=this.ga3().cx
z=new O.pt(y,x,w,v,u,t,s,r,q,p,o,n)
if(y==null)H.e(P.i("accomplices"))
if(x==null)H.e(P.i("actionName"))
if(v==null)H.e(P.i("description"))
if(u==null)H.e(P.i("knownTo"))
if(t==null)H.e(P.i("protagonist"))
if(s==null)H.e(P.i("sufferers"))
if(r==null)H.e(P.i("time"))
if(q==null)H.e(P.i("wasAggressive"))
if(p==null)H.e(P.i("wasFailure"))
if(o==null)H.e(P.i("wasProactive"))
if(n==null)H.e(P.i("wasSuccess"))}this.j(z)
return z}}}],["","",,R,{"^":"",
i4:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$i4(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bP(new H.I(u,new R.un(z),[H.j(u,0)]))
case 3:return P.aO()
case 1:return P.aP(v)}}})},
b1:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var z=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.rZ(a,b,l,n,o,f,e,i,m,p,j,h,d,g,q,!1,c).$1(z)
return z.p()},
un:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gf7()
y=this.a.y
return z==null?y==null:z===y}},
w:{"^":"mq;",
gam:function(){return this.x>0},
gf9:function(){return this.e instanceof K.V},
gfb:function(){return this.fr===C.f},
gd1:function(){return this.fr===C.d},
dT:function(a){var z,y,x
for(z=this.cy.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e,x=0;y.w();)if(C.a.ae(y.d.gfC(),a))++x
z=this.e
z=z==null?z:z.a
if((z==null?z:J.bX(z,a))===!0)++x
z=this.d
z=z==null?z:z.a
return(z==null?z:J.bX(z,a))===!0?x+1:x},
iv:function(){var z,y,x,w,v,u,t
for(z=this.cy.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.w();){v=y.d
if(!(v instanceof L.aN))continue
z=v.gag()
u=v.gaK()
t=v.gaH()?1:0
if(2+z+u+t>w){z=v.gag()
u=v.gaK()
t=v.gaH()?1:0
w=2+z+u+t
x=v}}return x},
iB:function(a,b){return this.cZ(a,b)>0},
cZ:function(a,b){var z,y
if(this.ch){z=a.go
y=this.go.a
z=z.a
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.hy(a,b,10))return 1
z=a.go
y=this.go.a
z=z.a
return(y==null?z!=null:y!==z)?1:0},
cE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.A(this.y)
y=z.x
x=2*y
if(!(y>0))x-=10
y=z.e
if(!(y instanceof K.V))x+=4
x+=y.gal()/2
for(y=z.cy.a,w=[null],v=new P.ae(y,y.r,null,null,w),v.c=y.e;v.w();)x+=J.ct(v.d.gal(),10)
y=a.a
for(v=y.ga1(y),u=new H.bN(v,new R.jl(this),[H.j(y,0)]),t=0;u.w();){s=v.gT()
r=s.gbm()?2:0
q=s.gco()
p=s.e
o=p.gag()
n=p.gaK()
p=p.gaH()?1:0
t=t+r+2*q+(2+o+n+p)/2
for(r=s.cy.a,q=new P.ae(r,r.r,null,null,w),q.c=r.e;q.w();)t+=J.ct(q.d.gal(),10)}return new A.cv(x,t,y.b7(0,0,new R.jm(this,a)))},
hy:function(a,b,c){var z=b.ji(a,this,!0)
if(z==null)return!1
return z<=c},
$isay:1},
mq:{"^":"d+dl;"},
rZ:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
$1:function(a){var z,y
a.gk().z=this.a
a.gk().dy=this.b
a.gk().fr=this.d
a.gk().fy=this.e
z=this.f
if(z==null)z=$.$get$d7()
a.gk().f=z
a.gk().e=this.r
a.gk().b=[]
a.gk().fx=C.d
a.gk().y=this.x
a.gk().dx=this.y
a.gk().x=this.ch
a.gk().go=this.z
a.gk().Q=this.Q
a.gk().ch=!0
a.gk().cy=this.c
z=new L.W(null,null,[U.D])
z.ai()
z.j(C.h)
a.gk().db=z
z=this.db
if(z!=null){y=new L.bl(null,null)
y.j(z)
z=y}else{z=$.$get$da()
z.toString
y=new L.bl(null,null)
y.j(z)
z=y}a.gk().id=z
a.gk().d=this.cx
a.gk().r=this.cy
a.gk().cx=this.dx
a.gk().c=this.dy
return a}},
jl:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.t(a.gbr(),z.go)){y=a.gq()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jm:{"^":"a:30;a,b",
$2:function(a,b){var z=b.gam()&&b.Q?1:0
return a+(z+b.x)*this.a.cZ(b,this.b)}},
dL:{"^":"d;a,b",
i:function(a){return this.b}},
pu:{"^":"w;a,b,ig:c<,bA:d<,f3:e<,f7:f<,r,co:x<,q:y<,z,bV:Q<,fa:ch<,b1:cx<,cy,db,n:dx<,aH:dy<,fr,ah:fx<,fy,br:go<",
af:function(a){var z=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.w))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.t(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
y=b.f
if(z==null?y==null:z===y){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
if(z==null?y==null:z===y){z=this.cx
y=b.cx
if(z==null?y==null:z===y)if(J.t(this.cy,b.cy)){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fx
y=b.fx
if(z==null?y==null:z===y){z=this.fy
y=b.fy
z=(z==null?y==null:z===y)&&J.t(this.go,b.go)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)),J.f(this.f)),J.f(this.r)),J.f(this.x)),J.f(this.y)),J.f(this.z)),J.f(this.Q)),J.f(this.ch)),J.f(this.cx)),J.f(this.cy)),J.f(this.db)),J.f(this.dx)),J.f(this.dy)),J.f(this.fr)),J.f(this.fx)),J.f(this.fy)),J.f(this.go)))},
i:function(a){var z,y
z=$.$get$T().$1("Actor")
y=J.z(z)
y.m(z,"categories",this.a)
y.m(z,"combineFunction",this.b)
y.m(z,"currentRoomName",this.c)
y.m(z,"currentShield",this.d)
y.m(z,"currentWeapon",this.e)
y.m(z,"followingActorId",this.f)
y.m(z,"gold",this.r)
y.m(z,"hitpoints",this.x)
y.m(z,"id",this.y)
y.m(z,"initiative",this.z)
y.m(z,"isActive",this.Q)
y.m(z,"isConfused",this.ch)
y.m(z,"isPlayer",this.cx)
y.m(z,"items",this.cy)
y.m(z,"maxHitpoints",this.db)
y.m(z,"name",this.dx)
y.m(z,"nameIsProperNoun",this.dy)
y.m(z,"pose",this.fr)
y.m(z,"pronoun",this.fx)
y.m(z,"stamina",this.fy)
y.m(z,"team",this.go)
return y.i(z)}},
ao:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gbA:function(){return this.gk().e},
gf3:function(){return this.gk().f},
gf7:function(){return this.gk().r},
gco:function(){return this.gk().y},
gq:function(){return this.gk().z},
gfa:function(){return this.gk().cx},
gb1:function(){return this.gk().cy},
gn:function(){return this.gk().dy},
gbr:function(){var z,y
z=this.gk()
y=z.id
if(y==null){y=new L.bl(null,null)
z.id=y
z=y}else z=y
return z},
gk:function(){var z,y
z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.cy=z.cx
z=z.cy
if(!(z==null)){y=new L.W(null,null,[H.j(z,0)])
y.ai()
y.j(z)
z=y}this.db=z
z=this.a
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
this.go=z.fy
z=z.go
if(!(z==null)){y=new L.bl(null,null)
y.j(z)
z=y}this.id=z
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gk().b
x=this.gk().c
w=this.gk().d
v=this.gk().e
u=this.gk().f
t=this.gk().r
s=this.gk().x
r=this.gk().y
q=this.gk().z
p=this.gk().Q
o=this.gk().ch
n=this.gk().cx
m=this.gk().cy
l=this.gk()
k=l.db
if(k==null){k=new L.W(null,null,[U.D])
k.ai()
k.j(C.h)
l.db=k
l=k}else l=k
l=l.p()
k=this.gk().dx
j=this.gk().dy
i=this.gk().fr
h=this.gk().fx
g=this.gk().fy
f=this.gk().go
e=this.gk()
d=e.id
if(d==null){d=new L.bl(null,null)
e.id=d
e=d}else e=d
e=e.p()
z=new R.pu(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e)
if(y==null)H.e(P.i("categories"))
if(u==null)H.e(P.i("currentWeapon"))
if(s==null)H.e(P.i("gold"))
if(r==null)H.e(P.i("hitpoints"))
if(q==null)H.e(P.i("id"))
if(p==null)H.e(P.i("initiative"))
if(o==null)H.e(P.i("isActive"))
if(n==null)H.e(P.i("isConfused"))
if(m==null)H.e(P.i("isPlayer"))
if(l==null)H.e(P.i("items"))
if(k==null)H.e(P.i("maxHitpoints"))
if(j==null)H.e(P.i("name"))
if(i==null)H.e(P.i("nameIsProperNoun"))
if(h==null)H.e(P.i("pose"))
if(g==null)H.e(P.i("pronoun"))
if(f==null)H.e(P.i("stamina"))}this.j(z)
return z}}}],["","",,A,{"^":"",cv:{"^":"d;em:a<,fA:b<,dW:c<",
c2:function(a,b){return new A.ak(this.a-b.a,this.b-b.b,this.c-b.c)},
i:function(a){return"ActorScore<self="+C.m.ba(this.a,2)+",team="+C.m.ba(this.b,2)+",enemy="+J.iP(this.c,2)+">"}},ak:{"^":"d;em:a<,fA:b<,dW:c<",
giL:function(){return this.a===-1/0&&this.b===-1/0&&this.c===-1/0},
bt:function(a,b){return new A.ak(this.a*b,this.b*b,this.c*b)},
aL:function(a,b){return new A.ak(this.a+b.a,this.b+b.b,this.c+b.c)},
ei:function(a,b){return new A.ak(this.a/b,this.b/b,this.c/b)},
i:function(a){return"ActorScoreChange<self="+C.m.ba(this.a,2)+",team="+C.m.ba(this.b,2)+",enemy="+C.m.ba(this.c,2)+">"},
B:{
jk:function(a){var z,y,x,w,v,u,t,s
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.aw)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
v+=s.c}if(y===0)throw H.c(P.F("Cannot average empty iterable"))
return new A.ak(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
ws:function(a){switch(a){case C.F:return"fist"
case C.y:return"shield"
case C.v:return"spear"
case C.z:return"sword"}throw H.c(P.F(a))},
D:{"^":"mr;fC:a<",
gbd:function(){return U.ws(C.a.gdY(this.a))},
gq:function(){return H.aA(this)},
gbV:function(){return!0},
gam:function(){return!1},
gb1:function(){return!1},
gaH:function(){return!1},
gah:function(){return C.p},
gbr:function(){return $.$get$aG()},
$isay:1},
mr:{"^":"d+dl;"},
bB:{"^":"d;a,b",
i:function(a){return this.b}}}],["","",,K,{"^":"",V:{"^":"aN;n:b<,a"}}],["","",,E,{"^":"",bi:{"^":"D;n:b<,a",
gal:function(){return 1},
$isay:1}}],["","",,Z,{"^":"",am:{"^":"aN;n:b<,ag:c<,aK:d<,aH:e<,bT:f<,dR:r<,a",B:{
og:function(a,b,c,d,e){return new Z.am(c,0,e,!1,!1,!1,P.az(C.G,null))}}}}],["","",,G,{"^":"",aB:{"^":"aN;n:b<,ag:c<,aK:d<,aH:e<,bT:f<,dR:r<,a",B:{
oO:function(a,b,c,d,e,f){return new G.aB(c,e,f,d,!0,!1,P.az(C.r,null))}}}}],["","",,L,{"^":"",aN:{"^":"D;",
gdR:function(){return!1},
gbT:function(){return!1},
gt:function(a){return 2},
gag:function(){return 0},
gaK:function(){return 0},
gal:function(){var z,y,x
z=this.gag()
y=this.gaK()
x=this.gaH()?1:0
return 2+z+y+x},
$isay:1}}],["","",,G,{"^":"",mg:{"^":"d;",
eR:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
jx:[function(a){this.f.C+=a},"$1","giq",2,0,16],
b9:function(){var z=0,y=P.ax(),x,w=this,v,u
var $async$b9=P.au(function(a,b){if(a===1)return P.aD(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.u("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.st(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gt(v)===0&&u.C.length===0)){z=4
break}z=5
return P.at(w.cw(),$async$b9)
case 5:z=3
break
case 4:w.eR()
case 1:return P.aE(x,y)}})
return P.aF($async$b9,y)}}}],["","",,B,{"^":"",eP:{"^":"d;el:a<,f2:b<,e4:c<",
i:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.m.ba(this.b,3)+", score="+this.a.i(0)+">"}},bE:{"^":"d;cA:a<,hU:b<,c,j0:d<,f2:e<,f,r,e1:x<,e4:y<",
gD:function(a){return X.bv(H.m([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
S:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbE&&this.gD(this)===z.gD(b)},
i:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gD(z)+", "+y.i(z)+", "+J.J(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
B:{
fq:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.e
z=z?0:b.y+1
d.b=a.r
return new B.bE(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iS:{"^":"d;a,b,c,d,e,f",
ia:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.U(C.j,"...",null,null)
z.U(C.j,"combining scores",null,null)
y=H.m([],[A.ak])
x=new G.jd()
for(w=J.aj(a),v=b.a,u=b.b,t=b.c,s=null;w.w();){r=w.gT()
z.U(C.j,new G.jb(r),null,null)
if(r.gf2()>0.15)if(s==null){z.U(C.j,"    - first _bestCase",null,null)
s=r}else if(J.aq(x.$1(r.gel()),x.$1(s.a))){z.U(C.j,"    - new _bestCase",null,null)
s=r}q=r.gel()
p=r.b
o=new A.ak((q.a-v)*p,(q.b-u)*p,(q.c-t)*p)
z.U(C.j,new G.jc(o),null,null)
y.push(o)}n=A.jk(y)
w=s==null
if(w)m=C.K
else{q=s.a
m=new A.ak(q.a-v,q.b-u,q.c-t)}w=w?s:s.c
if(w==null)w=1
v=m.a/w
u=m.b/w
w=m.c/w
t=n.a
q=n.b
p=n.c
z.U(C.j,"- uplifts average = "+("ActorScoreChange<self="+C.m.ba(t,2)+",team="+C.m.ba(q,2)+",enemy="+C.m.ba(p,2)+">"),null,null)
z.U(C.j,"- best = "+new A.ak(v,u,w).i(0),null,null)
l=new A.ak(v+t,u+q,w+p)
z.U(C.j,"- result = "+l.i(0),null,null)
return l},
ej:function(){var z=this
return P.aQ(function(){var y=0,x=1,w,v,u,t,s
return function $async$ej(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbW(),u=u.ga1(u),t=1
case 2:if(!u.w()){y=3
break}s=u.gT()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aO()
case 1:return P.aP(w)}}})},
d5:function(a,b,c){var z=0,y=P.ax(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$d5=P.au(function(d,e){if(d===1)return P.aD(e,y)
while(true)switch(z){case 0:w=x.f
w.aW(0)
v=x.c
u=v.a
t=u.a.be(0,new G.je(x))
s=t.cE(u)
r=x.a
r.U(C.q,"Planning for "+H.b(t.dx)+", initialScore="+s.i(0),null,null)
q=new P.b9(x.dC(t,u).a(),null,null,null)
case 2:if(!q.w()){z=3
break}p=q.c
o=p==null?q.b:p.gT()
r.U(C.l,new G.jf(t,o),null,null)
if(!o.G(t,u)){r.U(C.l,new G.jg(o),null,null)
z=2
break}z=4
return P.at(x.c6(v,o,b,a,c).c0(0),$async$d5)
case 4:n=e
if(J.eB(n)){r.U(C.l,new G.jh(o),null,null)
w.u(0,o,C.L)
z=2
break}r.U(C.l,new G.ji(s,o,n),null,null)
m=x.ia(n,s,b)
w.u(0,o,m)
r.U(C.l,new G.jj(o,m),null,null)
z=2
break
case 3:x.e=!0
return P.aE(null,y)}})
return P.aF($async$d5,y)},
j_:function(){return this.d5(50,10,null)},
dC:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dC(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bP((u.length!==0?C.a.gE(u):null).gbv())
case 2:u=(u.length!==0?C.a.gE(u):null).gau()
t=u.length
s={func:1,ret:Q.c3,args:[U.D]}
r={func:1,ret:Q.c1,args:[Q.n]}
q={func:1,ret:Q.v,args:[R.w]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.av(o,q)?6:8
break
case 6:x=9
return P.bP(Q.i1(z,y,o))
case 9:x=7
break
case 8:x=H.av(o,r)?10:12
break
case 10:x=13
return P.bP(Q.i2(z,y,o))
case 13:x=11
break
case 12:x=H.av(o,s)?14:16
break
case 14:x=17
return P.bP(Q.i3(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.u(o.i(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.aw)(u),++p
x=3
break
case 5:return P.aO()
case 1:return P.aP(v)}}})},
c6:function(a5,a6,a7,a8,a9){var $async$c6=P.au(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.be(0,new G.iW(t))
p=t.a
p.U(C.l,"=====",null,null)
p.U(C.l,new G.iX(a6,q),null,null)
p.U(C.l,new G.iY(a6),null,null)
if(!a6.G(q,r)){p.U(C.l,"- firstAction not applicable",null,null)
z=1
break}o=q.cE(r)
p.U(C.l,new G.j3(a5,o),null,null)
p.U(C.l,new G.j4(a5),null,null)
n=P.b7(null,B.bE)
m=P.ah(null,null,null,A.a4)
l=J.o(r)
k=l.gD(r)
for(j=new P.b9(a6.cU(q,a5,r).a(),null,null,null);j.w();){i=j.c
h=i==null?j.b:i.gT()
if(l.gD(r)!==k)throw H.c(new P.u("Action "+a6.i(0)+" modified world state when producing "+H.b(h)+"."))
n.ax(h)}s.a=0
r=t.b
case 3:if(!!n.ga0(n)){z=4
break}++s.a
g=n.d6()
p.U(C.j,"----",null,null)
p.U(C.j,new G.j5(g),null,null)
p.U(C.j,new G.j6(g),null,null)
if(g.ge4()>a7||s.a>a8){p.U(C.j,new G.j7(s,a7,g),null,null)
p.U(C.j,new G.j8(g),null,null)
z=4
break}z=g.gcA().f.length===0?5:6
break
case 5:p.U(C.j,"- leaf node: world.situations is empty (end of book)",null,null)
l=g.a
q=l.a.aX(0,new G.j9(t),new G.ja())
if(q==null){p.U(C.j,"- this actor ("+H.b(r)+") has been removed",null,null)
z=3
break}f=new B.eP(q.cE(l),g.e,g.y)
p.U(C.j,new G.iZ(f),null,null)
z=7
x=[1]
return P.d1(P.ht(f),$async$c6,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
j=j.length!==0?C.a.gE(j):null
e=j.at(j.gV(),l)
j=l.a
i=new H.I(j,new G.j_(t),[H.j(j,0)])
d=i.gt(i)
if(d>1)throw H.c(new P.u("World has several duplicates of mainActor: "+J.J(l)))
else if(d===0){p.U(C.B,"mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead",null,null)
q=null}else q=j.be(0,new G.j0(t))
c=J.t(e,q)
j=e.dx
p.U(C.j,"- actor: "+H.b(j)+" (isMain=="+c+")",null,null)
i=q==null
p.U(C.j,"- mainActor: "+H.b(i?q:q.dx),null,null)
b=i?q:q.cE(l)
if(b==null)b=C.M
f=new B.eP(b,g.e,g.y)
p.U(C.j,new G.j1(o,f),null,null)
p.U(C.j,new G.j2(g),null,null)
z=8
x=[1]
return P.d1(P.ht(f),$async$c6,y)
case 8:p.U(C.j,"- generating all actions for "+H.b(j),null,null)
j=n.c
i=n.b
a=n.a
for(a0=new P.b9(t.dC(e,l).a(),null,null,null);a0.w();){a1=a0.c
a2=a1==null?a0.b:a1.gT()
if(!a2.G(e,l))continue
for(a1=new P.b9(a2.cU(e,g,l).a(),null,null,null);a1.w();){a3=a1.c
a4=a3==null?a1.b:a3.gT();++t.d
if(a4.e<0.05)continue
if(m.ae(0,a4.a))continue
n.ax(a4)}}p.U(C.j,"- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences",null,null)
m.v(0,l)
z=3
break
case 4:case 1:return P.d1(null,0,y)
case 2:return P.d1(v,1,y)}})
var z=0,y=P.pW($async$c6),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rf(y)},
h2:function(a,b){},
B:{
iT:function(a,b){var z,y
z=N.bf("ActorPlanner")
y=new Y.a3(H.m([],[Y.ai]),0,P.aW())
y.b=b.r
z=new G.iS(z,a.y,new B.bE(b,null,y,1,1,!0,!1,!1,0),0,!1,new H.Q(0,null,null,null,null,null,0,[null,null]))
z.h2(a,b)
return z}}},jd:{"^":"a:49;",
$1:function(a){return a.b-a.c}},jb:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},jc:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.i(0)}},je:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},jf:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.dx)}},jg:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},jh:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},ji:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aT(this.c))+" different ConsequenceStats, initialScore="+this.a.i(0)}},jj:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+this.b.i(0)}},iW:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},iX:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gn())}},iY:{"^":"a:2;a",
$0:function(){return"- firstAction == "+J.J(this.a)}},j3:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.i(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j4:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.c.bt(" ",z.y)+"- "+J.J(z.b)}},j5:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.ghU().gX()+"'"}},j6:{"^":"a:2;a",
$0:function(){var z=this.a.gcA().f
return"- situation: "+J.iI(z.length!==0?C.a.gE(z):null).i(0)}},j7:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.ge4()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},j8:{"^":"a:2;a",
$0:function(){var z=this.a.gcA().d
return"- how we got here: "+new H.al(z,new G.iV(),[H.j(z,0),null]).cr(0," <- ")}},iV:{"^":"a:0;",
$1:function(a){return a.gbd()}},j9:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},ja:{"^":"a:2;",
$0:function(){return}},iZ:{"^":"a:2;a",
$0:function(){return"- "+this.a.i(0)}},j_:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},j0:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a.b
return z==null?y==null:z===y}},j1:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.i(0)+" (initial="+this.a.i(0)+")"}},j2:{"^":"a:2;a",
$0:function(){var z=this.a.gcA().d
return"- how we got here: "+new H.al(z,new G.iU(),[H.j(z,0),null]).cr(0," <- ")}},iU:{"^":"a:0;",
$1:function(a){return a.gbd()}}}],["","",,Z,{"^":"",mO:{"^":"d;a,b",
ga0:function(a){return this.b.length===0},
fk:function(a,b){var z=this
return P.aQ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fk(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bP(t)
case 5:w=1
break
case 4:s=z.hw(new Z.mR())
r=z.dB(new Z.mS(),[s])
q=z.dB(new Z.mT(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bF().U(C.q,"best self preserving: "+s.i(0),null,null)
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bF().U(C.q,"best enemy damaging: "+J.J(r),null,null)
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bF().U(C.q,"best team preserving: "+J.J(q),null,null)
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.bN(t,new Z.mU(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.S(m,s)){w=17
break}if(l.S(m,r)){w=17
break}if(l.S(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.aw)(t),++n
w=16
break
case 18:case 1:return P.aO()
case 2:return P.aP(u)}}})},
iZ:function(a){var z,y,x,w,v,u,t,s
z={}
y=this.b
if(y.length===1)return C.a.gbM(y)
C.a.bN(y,new Z.mV(this,a))
x=this.a.a
w=x.gc1().b7(0,1/0,new Z.mW(a))
v=x.gc1().b7(0,-1/0,new Z.mX(a))
u=w-(v-w)*0.1
z.a=u
if(w===v){--u
z.a=u
x=u}else x=u
t=P.mf(y.length,new Z.mY(z,this,a,v-x),!1,P.L)
s=new H.al(t,new Z.mZ(C.a.b7(t,0,Z.uL())),[H.j(t,0),null]).bs(0,!1)
x=C.a.b7(s,0,Z.uM())
z=s.length-1
s[z]=J.iB(s[z],1000-x)
return y[S.na(s,1000)]},
dB:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.aw)(z),++u){t=z[u]
if(C.a.ae(b,t))continue
if(w==null||J.aq(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hw:function(a){return this.dB(a,C.h)},
B:{
mP:function(a){var z,y,x
z=a.gbW()
y=H.y(z,"x",0)
x=P.O(new H.I(z,new Z.mQ(a),[y]),!1,y)
if(x.length===0)$.$get$bF().U(C.D,"After removing actions scored by undefined, there are no recommendations.",null,null)
return x},
wZ:[function(a,b){return a+b},"$2","uL",4,0,44],
x_:[function(a,b){return a+b},"$2","uM",4,0,45]}},mR:{"^":"a:0;",
$1:function(a){return a.gem()}},mS:{"^":"a:0;",
$1:function(a){return-a.gdW()}},mT:{"^":"a:0;",
$1:function(a){return a.gfA()}},mU:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bx(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},mV:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bx(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},mW:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d4(a),H.d4(z))}},mX:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d4(a),H.d4(z))}},mY:{"^":"a:9;a,b,c,d",
$1:function(a){var z=this.b
return J.ct(J.iE(this.c.$1(z.a.a.h(0,z.b[a])),this.a.a),this.d)}},mZ:{"^":"a:0;a",
$1:function(a){return J.iM(J.iD(J.ct(a,this.a),1000))}},mQ:{"^":"a:0;a",
$1:function(a){return!this.a.h(0,a).giL()}}}],["","",,K,{"^":"",ro:{"^":"a:3;",
$3:function(a,b,c){}},cd:{"^":"d;a,n:b<,c,d,e,f,bK:r<",
gD:function(a){return C.c.gD(this.b)},
S:function(a,b){if(b==null)return!1
return b instanceof K.cd&&b.b===this.b},
i:function(a){return"Room<"+this.b+">"},
B:{
Y:function(a,b,c,d,e,f,g){var z=new S.N(null,null,[Q.n])
z.ac()
z.j(f)
return new K.cd(z.p(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",n:{"^":"d;a,X:b<,bd:c<,d"}}],["","",,S,{"^":"",ad:{"^":"d;",
gau:function(){return C.h},
gbv:function(){return C.h},
gd3:function(){return 3},
fg:function(a,b){},
fh:function(a,b){},
ct:function(a){},
cF:function(a){return!0}}}],["","",,S,{"^":"",
fz:function(a){return a[$.$get$bH().ak(3)]},
n9:function(a,b){var z,y,x,w
z=$.$get$bH().iV()*b
for(y=new H.dz(a,a.gt(a),0,null,[H.y(a,"b5",0)]),x=0,w=0;y.w();){x+=y.d
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
na:function(a,b){var z,y,x,w,v,u
z=$.$get$bH().ak(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.aw)(a),++v){x+=a[v]
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
bI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=J.iJ(a,"{")
if(z!==-1&&z<a.length-1){y=H.m([],[P.r])
y.push(z)
w=z+1
v=a.length
u=null
t=1
while(!0){if(!(w<v)){x=null
break}s=a[w]
if(s==="{")++t
else if(s==="|"&&t===1)y.push(w)
else if(s==="}"){--t
if(t===0){y.push(w)
x=w
u=x
break}}r=w+1
u=w
w=r}q=y.length-1
if(q>1){p=$.$get$bH().ak(q)
o=C.c.aw(a,0,z)+H.b(S.bI(C.c.aw(a,y[p]+1,y[p+1])))+C.c.aw(a,x+1,v)
o=o.charCodeAt(0)==0?o:o
if(u===v-1)return o
else return S.bI(o)}else if(u===v-1)return a
else{v=u+1
return C.c.aw(a,0,v)+H.b(S.bI(C.c.bf(a,v)))}}else return a},
a7:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bH().ak(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ai:{"^":"d;bc:a<,aO:b<,aY:c<,iX:d<,e,cV:f@,fm:r<,ff:x<,eq:y<,it:z<,h0:Q<,cz:ch<,cx,cy,V:db<",
h:function(a,b){switch(b){case"string":return this.a
case"subject":return this.b
case"object":return this.c
case"owner":return this.d
case"but":return this.f
case"positive":return this.r
case"negative":return this.x
case"endSentence":return this.z
case"startSentence":return this.Q
case"wholeSentence":return this.ch
case"time":return this.db
default:throw H.c(P.F("Invalid key "+b+"."))}},
i:function(a){var z=this.a
z="Report<"+C.c.aw(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a3:{"^":"d;a,V:b<,c",
gdZ:function(){return C.a.b6(this.a,new Y.ou())},
aD:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||b==="")return
z=(J.bu(b).dV(b,".")||C.c.dV(b,"!")||C.c.dV(b,"?"))&&C.c.cG(b,P.bh("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ai(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
v:function(a,b){return this.aD(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
l:function(a,b,c){return this.aD(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
bw:function(a,b,c,d){return this.aD(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
dL:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aD(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
eW:function(a,b,c){return this.aD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
dN:function(a,b,c,d,e){return this.aD(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
dM:function(a,b,c,d){return this.aD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
bw:function(a,b,c,d){return this.aD(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
eX:function(a,b,c,d,e,f){return this.aD(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
hZ:function(a,b,c,d,e,f){return this.aD(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
hW:function(a,b,c){return this.aD(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
hX:function(a,b,c,d){return this.aD(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
i_:function(a,b,c,d,e,f){return this.aD(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
hY:function(a,b,c,d,e){return this.aD(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
i3:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.os().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.aw)(b),++u){t=b[u]
if(w>0){if(w===1&&J.t(t,C.a.gE(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bx(t.gn(),t.gn(),t,null,this.b));++w
if(w>x||t.S(0,C.a.gE(b))){z+="."
this.i_(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.k(a,"<also>","also")+" "
w=0}}},
i2:function(a,b,c,d){return this.i3(a,b,c,"and",3,null,null,d)},
dO:function(){return this.l(0,"\n\n",!0)},
bx:function(a,b,c,d,e){var z,y,x
if(d!=null)z=J.X(a).b0(a,"<owner's> "+H.b(b))!==-1||C.c.b0(a,"<ownerPronoun's> "+H.b(b))!==-1||C.c.b0(a,"<object-owner's> "+H.b(b))!==-1||C.c.b0(a,"<object-ownerPronoun's> "+H.b(b))!==-1
else z=!1
if(z)return a
if(J.X(a).b0(a,"<subject's> "+H.b(b))!==-1||C.c.b0(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(!c.gaH()){z=this.c
y=z.h(0,c.gq())
if((y==null?-1:y)<e){z="the "+H.b(b)
x=H.b0(a,b,z,0)}else{if(J.eD(c.gn(),P.bh("[aeiouy]",!1,!1))){y="an "+H.b(b)
x=H.b0(a,b,y,0)}else{y="a "+H.b(b)
x=H.b0(a,b,y,0)}z.u(0,c.gq(),e)}}else x=null
return x==null?a:x},
dX:function(a,b){var z,y,x
if(!this.aF(a)||!this.aF(b))return!1
z=this.a
if(z[a].gaO()==null||z[b].gaO()==null)return!1
if(z[a].gaY()==null||z[b].gaY()==null)return!1
y=z[a].gaO().gq()
x=z[b].gaY().gq()
if(y==null?x==null:y===x){y=z[a].gaY().gq()
z=z[b].gaO().gq()
z=y==null?z==null:y===z}else z=!1
return z},
dg:function(a){var z=this
return P.aQ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dg(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aF(y)){x=1
break}u=z.a[y]
x=u.gaO()!=null?3:4
break
case 3:x=5
return u.gaO()
case 5:case 4:x=u.gaY()!=null?6:7
break
case 6:x=8
return u.gaY()
case 8:case 7:x=u.giX()!=null?9:10
break
case 9:x=11
return u.d
case 11:case 10:t=u.e
x=t!=null?12:13
break
case 12:x=14
return t
case 14:case 13:case 1:return P.aO()
case 2:return P.aP(v)}}})},
cs:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gaY()},"$1","gaY",2,0,18],
iW:function(a,b){if(!this.aF(a)||!this.aF(b))return!1
if(this.dX(a,b))this.a[a].geq()
return!1},
fi:function(a){var z
for(z=!1;this.gdZ();z=!0){a.$1(this.fn(!0))
this.j4()}return z},
fn:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.b7(z,[],new Y.ov())
C.a.hL(z,new Y.ow(y),!1)
x=a&&this.gdZ()?C.a.b0(z,C.a.cY(z,new Y.ox()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dX(p,s)
if(!z[s].gcV())n=this.iW(s,p)&&this.h_(s,p)
else n=!0
t=n&&!z[p].gcV()
z[s].scV(t)
n=s-w
if(n<3)if(!u){if(!z[s].gh0())if(!z[p].git())if(!z[s].gcz())if(this.cR(s,p)||o)if(!(t&&n>1))n=t&&z[p].gcV()||this.jj(s)>4
else n=!0
else n=!0
else n=!0
else n=!0
else n=!0
v=n}else v=!0
else v=!0
if(v){if(z[p].gcz()){r+=" "
p=r}else{r+=". "
p=r}r=t&&!z[s].gcz()?r+"But ":p
u=!1}else if(t){r+=S.fz([" but "," but ",", but "])
u=!this.fO(s,s+1)&&!0}else{r+=S.fz([" and "," and ",", and "])
u=!0}}m=this.dm(s)
l=S.bI(m)
if(J.bX(l,"{")||C.c.ae(l,"}"))$.$get$ib().U(C.C,'Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+l+'"""',null,null)
p=!v
if(p){n=s-1
n=this.cR(s,n)&&J.eD(this.dm(n),"<subject> ")&&C.c.cG(l,"<subject> ")}else n=!1
if(n)l=H.b0(l,"<subject> ","",0)
n=this.dm(s)
if(typeof n!=="string")H.e(H.a5(n))
k=H.k(l,"<action>",n)
n=s-1
j=this.hN(s,n)
if(j)j=!(this.cs(s).gah()===C.p&&this.b4(s).gah()===C.p)
else j=!1
if(j){k=H.k(k,"<object-owner's> <object>","<objectPronounAccusative>")
k=H.k(k,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
k=H.k(k,"<object>","<objectPronounAccusative>")
k=H.k(k,"<object's>","<objectPronoun's>")}j=this.cR(s,n)
if(j){k=H.k(k,"<owner's> <subject>","<subjectPronoun>")
k=H.k(k,"<ownerPronoun's> <subject>","<subjectPronoun>")
k=H.k(k,"<subject>","<subjectPronoun>")
k=H.k(k,"<subject's>","<subjectPronoun's>")}if(this.cs(n)!=null)if(this.b4(s)!=null)if(this.b4(n)!=null){j=this.cs(n)
j=j==null?j:j.gq()
i=this.b4(s)
if(J.t(j,i==null?i:i.gq())){j=this.b4(n)
j=j==null?j:j.gah()
i=this.b4(s)
j=!J.t(j,i==null?i:i.gah())}else j=!1}else j=!1
else j=!1
else j=!1
if(j){k=H.k(k,"<owner's> <subject>","<subjectPronoun>")
k=H.k(k,"<ownerPronoun's> <subject>","<subjectPronoun>")
k=H.k(k,"<subject>","<subjectPronoun>")
k=H.k(k,"<subject's>","<subjectPronoun's>")}if(this.b4(n)!=null)if(this.cs(s)!=null){j=this.b4(n)
j=j==null?j:j.gq()
i=this.cs(s)
if(J.t(j,i==null?i:i.gq())){n=this.b4(n)
n=n==null?n:n.gah()
j=this.b4(s)
n=!J.t(n,j==null?j:j.gah())}else n=!1}else n=!1
else n=!1
if(n){k=H.k(k,"<object-owner's> <object>","<objectPronoun>")
k=H.k(k,"<object-ownerPronoun's> <object>","<objectPronoun>")
k=H.k(k,"<object>","<objectPronounAccusative>")
k=H.k(k,"<object's>","<objectPronoun's>")}n=z[s]
h=n.b
g=n.c
f=n.d
e=n.e
j=h!=null
if(j){if(h.gb1()){d=H.k(k,"<subject>","<subjectPronoun>")
d=H.k(d,"<subject's>","<subjectPronoun's>")}else d=k
if(h.gah()===C.I||h.gah()===C.H){d=H.k(d,"<s>","")
d=H.k(d,"<es>","")
d=H.k(d,"<sses>","ss")
d=H.k(d,"<ies>","y")
d=H.k(d,"<does>","do")
d=H.k(d,"<is>","are")
d=H.k(d,"<has>","have")}else{d=H.k(d,"<s>","s")
d=H.k(d,"<es>","es")
d=H.k(d,"<sses>","sses")
d=H.k(d,"<ies>","ies")
d=H.k(d,"<does>","does")
d=H.k(d,"<is>","is")
d=H.k(d,"<has>","has")}d=H.b0(d,"<subject>","<subjectNoun>",0)
i=h.gah().a
d=H.k(d,"<subject>",i)
i=n.db
d=this.bx(d,"<subjectNoun>",h,f,i)
c=h.gn()
d.toString
if(typeof c!=="string")H.e(H.a5(c))
d.length
d=H.b0(d,"<subjectNoun>",c,0)
c=h.gah().a
d=H.k(d,"<subjectPronoun>",c)
if(C.c.ae(k,P.bh("<subject>.+<subject's>",!0,!1))){c=h.gah().c
d=H.k(d,"<subject's>",c)}d=this.bx(d,"<subject's>",h,f,i)
i=H.b(h.gn())+"'s"
d.length
d=H.b0(d,"<subject's>",i,0)
i=h.gah().c
d=H.k(d,"<subject's>",i)
i=h.gah().b
d=H.k(d,"<subjectPronounAccusative>",i)
i=h.gah().d
d=H.k(d,"<subjectPronounSelf>",i)}else d=k
if(g!=null){if(g.gaH()){d=H.k(d,"<subject's> <object>","<object>")
d=H.k(d,"<subjectPronoun's> <object>","<object>")}if(g.gb1()){d=H.k(d,"<object>","<objectPronoun>")
d=H.k(d,"<object's>","<objectPronoun's>")}else{d=this.bx(d,"<object>",g,e,n.db)
i=g.gn()
d.toString
if(typeof i!=="string")H.e(H.a5(i))
d=H.k(d,"<object>",i)}i=g.gah().b
d=H.k(d,"<objectPronoun>",i)
if(C.c.ae(k,P.bh("<object>.+<object's>",!0,!1))){i=g.gah().c
d=H.k(d,"<object's>",i)}d=this.bx(d,"<object's>",g,e,n.db)
i=H.b(g.gn())+"'s"
d.length
d=H.b0(d,"<object's>",i,0)
i=g.gah().c
d=H.k(d,"<object's>",i)
i=g.gah().c
d=H.k(d,"<objectPronoun's>",i)
i=g.gah().b
d=H.k(d,"<objectPronounAccusative>",i)
i=g.gah().a
d=H.k(d,"<objectPronounNominative>",i)}if(j){j=h.gah().c
d=H.k(d,"<subjectPronoun's>",j)}n=n.db
k=this.eS(e,this.eS(f,d,k,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),k,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.ot(k):k
if(v)w=s
if(z[s].gcz())u=!0}z=!z[x-1].gcz()?r+".":r
return H.wk(z.charCodeAt(0)==0?z:z,$.$get$fV(),new Y.oy(),null)},
bY:function(){return this.fn(!1)},
j4:function(){var z,y
if(!this.gdZ()){C.a.st(this.a,0)
return}z=this.a
y=C.a.b0(z,C.a.cY(z,new Y.oz()))+1
P.cb(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fO:function(a,b){var z
if(!this.aF(a)||!this.aF(b))return!1
if(this.dX(a,b))this.a[a].geq()
if(!this.cR(a,b))return!1
z=this.a
if(z[a].gfm()&&z[b].gfm())return!0
if(z[a].gff()&&z[b].gff())return!0
else return!1},
h_:function(a,b){var z,y,x,w,v,u
if(!this.aF(a)||!this.aF(b))return!1
for(z=new P.b9(this.dg(a).a(),null,null,null);z.w();){y=z.c
x=y==null?z.b:y.gT()
for(y=new P.b9(this.dg(b).a(),null,null,null);y.w();){w=y.c
v=w==null?y.b:w.gT()
w=x.gq()
u=v.gq()
if(w==null?u==null:w===u)return!0}}return!1},
dm:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gbc()},"$1","gbc",2,0,13],
b4:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gaO()},"$1","gaO",2,0,18],
jj:function(a){var z,y
z=this.a
if(z[a].gV()!=null){y=a-1
y=!this.aF(y)||z[y].gV()==null}else y=!0
if(y)return 1000
else return z[a].gV()-z[a-1].gV()},
i:function(a){return this.bY()},
aF:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eS:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.cx)z=H.k(H.k(b,d,"you"),e,"your")
else{z=this.bx(b,d,a,null,h)
y=a.dx
z.toString
H.cn(y)
z=H.k(z,d,y)}y=a.fx
z=H.k(z,f,y.a)
z=J.iL(this.bx(C.c.ae(c,P.bh(d+".+"+e,!0,!1))?H.k(z,e,y.c):z,e,a,null,h),e,H.b(a.dx)+"'s")
y=y.c
z=H.k(H.k(z,e,y),g,y)}else z=H.k(H.k(H.k(H.k(b,d,""),e,""),f,""),g,"")
return z},
hN:function(a,b){var z,y
if(!this.aF(a)||!this.aF(b))return!1
z=this.a
if(z[a].gaY()==null||z[b].gaY()==null)return!1
y=z[a].gaY().gq()
z=z[b].gaY().gq()
return y==null?z==null:y===z},
cR:function(a,b){var z,y
if(!this.aF(a)||!this.aF(b))return!1
z=this.a
if(z[a].gaO()==null||z[b].gaO()==null)return!1
y=z[a].gaO().gq()
z=z[b].gaO().gq()
return y==null?z==null:y===z},
B:{
ot:function(a){var z,y,x
z=!C.c.ae(a,"\n\n")?C.c.jn(a):a
y=z.length
if(y===0)return z
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.c.bf(z,1)}}},ou:{"^":"a:0;",
$1:function(a){return J.t(a.gbc(),"\n\n")}},os:{"^":"a:19;",
$1:function(a){return C.c.de(H.k(H.k(a,"<also> ",""),"  "," "))}},ov:{"^":"a:48;",
$2:function(a,b){var z,y,x,w
z=J.X(a)
y=z.ge0(a)?z.gE(a):null
if(y!=null)if(y.cy){x=b.cx
w=y.cx
w=x==null?w==null:x===w
x=w}else x=!1
else x=!1
if(x)z.u(a,z.gt(a)-1,b)
else z.v(a,b)
return a}},ow:{"^":"a:53;a",
$1:function(a){return J.bX(this.a,a)}},ox:{"^":"a:0;",
$1:function(a){return J.t(a.gbc(),"\n\n")}},oy:{"^":"a:43;",
$1:function(a){return H.b(a.h(0,1))+H.b(a.h(0,2))+H.b(a.h(0,3))}},oz:{"^":"a:0;",
$1:function(a){return J.t(a.gbc(),"\n\n")}},ay:{"^":"ms;aH:a<,n:b<,c,br:d<,b1:e<,ah:f<",
gq:function(){return H.aA(this)},
gbV:function(){return!0},
gam:function(){return!0},
B:{
c0:function(a,b,c,d,e){var z=H.m([],[P.l])
return new Y.ay(c,b,z,e==null?$.$get$aG():e,!1,d)}}},ms:{"^":"d+dl;"},dl:{"^":"d;",
gbm:function(){return this.gam()&&this.gbV()},
a6:function(a,b,c,d,e,f,g,h,i,j,k,l,m){a.dL(0,b,c,d,e,f,g,h,i,j,k,H.A(this,"$isay"),!1,m)},
aZ:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
ap:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
a2:function(a,b){return this.a6(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
ab:function(a,b,c){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
d7:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
jb:function(a,b,c,d,e){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,e)},
a7:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
d9:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
d9:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
as:function(a,b,c){return this.a6(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
bF:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
ja:function(a,b,c,d,e){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
e8:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
e8:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bp:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bq:function(a,b,c,d,e){return this.a6(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
e7:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
b2:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
bF:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
d8:function(a,b,c,d,e){return this.a6(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
fs:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
fq:function(a,b,c,d){return this.a6(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
jd:function(a,b,c,d,e,f){return this.a6(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
bG:function(a,b,c,d,e){return this.a6(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
fp:function(a,b,c){return this.a6(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
j8:function(a,b,c,d){return this.a6(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
e9:function(a,b,c,d){return this.a6(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
jc:function(a,b,c,d,e){return this.a6(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
je:function(a,b,c,d,e,f){return this.a6(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
e7:function(a,b,c,d){return this.a6(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
j9:function(a,b,c,d){return this.a6(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},c9:{"^":"d;a,b,c,d",
i:function(a){return this.a}}}],["","",,L,{"^":"",t0:{"^":"a:0;",
$1:function(a){a.gcf().b=2
return 2}},rr:{"^":"a:0;",
$1:function(a){a.gcf().b=0
return 0}},t_:{"^":"a:0;",
$1:function(a){a.gcf().b=1
return 1}},h4:{"^":"d;"},pM:{"^":"h4;q:a<",
af:function(a){var z=new L.bl(null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h4))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gD:function(a){return Y.U(Y.h(0,J.f(this.a)))},
i:function(a){var z,y
z=$.$get$T().$1("Team")
y=J.z(z)
y.m(z,"id",this.a)
return y.i(z)},
B:{
e_:function(a){var z=new L.bl(null,null)
a.$1(z)
return z.p()}}},bl:{"^":"d;a,b",
gq:function(){return this.gcf().b},
gcf:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y
z=this.a
if(z==null){y=this.gcf().b
z=new L.pM(y)
if(y==null)H.e(P.i("id"))}this.j(z)
return z}}}],["","",,O,{"^":"",pe:{"^":"d;a"}}],["","",,X,{"^":"",
hL:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hL(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.b3(u,u.length,0,null,[H.j(u,0)])
u=y.a
s=new J.b3(u,u.length,0,null,[H.j(u,0)])
case 2:r=t.w()
q=s.w()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aO()
case 1:return P.aP(v)}}})}}],["","",,A,{"^":"",a4:{"^":"d;a,b,c,d,e,f,V:r<,x",
gD:function(a){var z,y,x,w,v
z=X.bv(this.a)
y=X.bv(this.d)
x=X.bv(this.f)
w=this.r
v=this.c
v=X.d3(X.aX(X.aX(0,C.i.gD(w)),J.f(v)))
return X.d3(X.aX(X.aX(X.aX(X.aX(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
S:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isa4&&this.gD(this)===z.gD(b)},
bk:function(a){var z,y
z=this.fM(a,!0)
y=z.ga1(z)
if(y.w()){y.gT()
return!0}return!1},
aj:function(a){var z,y
z=this.fL(a)
y=z.ga1(z)
if(y.w()){y.gT()
return!0}return!1},
f4:function(a){var z,y
z=this.cO(a)
if(z==null)throw H.c(new P.u("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
y[z]=y[z].an()},
an:function(){++this.r},
cB:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.cH(0,new A.pj(a))
if(b!=null)z=z.bJ(0,new A.pk(b))
if(c!=null)z=z.bJ(0,new A.pl(c))
if(e!=null)z=z.bJ(0,new A.pm(e))
return d!=null?z.bJ(0,new A.pn(d)):z},
fM:function(a,b){return this.cB(a,null,null,null,b)},
fN:function(a,b,c){return this.cB(a,b,null,null,c)},
fL:function(a){return this.cB(a,null,null,null,null)},
A:function(a){return this.a.be(0,new A.po(a))},
di:function(a){return this.e.be(0,new A.pp(a))},
ek:function(a){var z=this.cO(a)
if(z==null)return
return this.f[z]},
a9:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y)if(z[y].gn()===a)return z[y]
throw H.c(P.F("No situation with name="+a+" found."))},
iA:function(a){var z=this.a.aX(0,new A.pq(a),new A.pr())
if(z==null)return!1
return z.gam()},
ao:function(){var z,y
z=this.f
y=C.a.gE(z)
y.ct(this)
C.a.a_(z,y)},
aE:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&C.a.gE(z).gn()!==a))break
y=C.a.gE(z)
y.ct(this)
C.a.a_(z,y)}if(z.length===0)throw H.c(P.F("Tried to pop situations until "+a+" but none was found in stack."))},
bE:function(a,b){var z=this.cO(a)
if(z==null)throw H.c(P.F("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
this.f[z]=b},
ee:function(a,b,c,d,e){var z,y,x
z=this.cB(a,b,c,d,e)
y=z.ga1(z)
if(y.w()){x=y.gT()
return this.r-x.gV()}return},
ji:function(a,b,c){return this.ee(null,a,b,c,null)},
c_:function(a,b,c){return this.ee(a,null,b,null,c)},
da:function(a){return this.ee(a,null,null,null,null)},
i:function(a){var z,y
z=this.a
y=z.hE()
y.av(0,z)
return"World<"+y.i(0)+">"},
W:function(a,b){var z,y,x
z=this.A(a)
z.toString
y=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
y.j(z)
b.$1(y)
x=y.p()
y=this.a
y.a_(0,z)
y.v(0,x)},
cO:function(a){var z,y,x,w
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}w=y[x].gq()
if(w==null?a==null:w===a){z=x
break}++x}return z},
hb:function(a){this.a.av(0,a.a)
this.d.av(0,a.d)
this.b.av(0,a.b)
this.e.av(0,a.e)
C.a.av(this.f,a.f)
this.r=a.r},
B:{
dY:function(a){var z,y,x,w
z=P.ah(null,null,null,R.w)
y=P.b7(null,O.cu)
x=P.ah(null,null,null,U.D)
w=P.ah(null,null,null,null)
w=new A.a4(z,x,a.c,y,w,[],null,null)
w.hb(a)
return w}}},pj:{"^":"a:0;a",
$1:function(a){return a.gdK()===this.a}},pk:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gcu()
y=this.a.y
return z==null?y==null:z===y}},pl:{"^":"a:0;a",
$1:function(a){return a.ger().ae(0,this.a.y)}},pm:{"^":"a:0;a",
$1:function(a){return a.gfH()===this.a}},pn:{"^":"a:0;a",
$1:function(a){return a.gfF()===this.a}},po:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a
return z==null?y==null:z===y}},pp:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gn()
y=this.a
return z==null?y==null:z===y}},pq:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gq()
y=this.a
return z==null?y==null:z===y}},pr:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",R:{"^":"ag;Y:b<"},fI:{"^":"R;c,d,X:e<,N:f<,n:r<,b,a",
gI:function(){return!1},
gO:function(){return!1},
gJ:function(){return H.e(new P.u("Not rerollable"))},
P:[function(a,b,c){throw H.c(new P.u("SimpleAction always succeeds"))},"$3","gL",6,0,1],
R:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gM",6,0,1],
a5:function(a,b){throw H.c(new P.u("SimpleAction shouldn't have to provide roll reason"))},
H:function(a,b){return 1},
G:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",jR:{"^":"v;I:c<,Y:d<,N:e<,O:f<,J:r<,b,a",
ga4:function(){return"confuse <object>"},
gn:function(){return"Confuse"},
ga8:function(){return"will <subject> confuse <object>?"},
P:[function(a,b,c){var z
a.a2(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.a7(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.e7(c,"<subject> fail<s>",!0,!0)
return H.b(a.dx)+" fails to confuse "+H.b(z.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.a2(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.b2(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.as(c,"<subject's> eyes go wide with terror",!0)
b.W(z.y,new N.jS())
return H.b(a.dx)+" confuses "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){return 0.6},
G:function(a,b){var z
if(a.cx)if(a.fr===C.d){z=b.a
z=new H.I(z,new N.jT(this),[H.j(z,0)])
z=z.gt(z)>=2&&!this.b.ch}else z=!1
else z=!1
return z},
B:{
wz:[function(a){return new N.jR(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.e,a,null)},"$1","tn",2,0,4]}},jS:{"^":"a:0;",
$1:function(a){a.gk().cx=!0
return a}},jT:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gam()){z=a.gbr()
y=this.a.b.go
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",kb:{"^":"v;O:c<,J:d<,I:e<,Y:f<,N:r<,b,a",
ga4:function(){return"kick <object's> weapon off"},
gn:function(){return"DisarmKick"},
ga8:function(){return"will <subject> kick the weapon off?"},
P:[function(a,b,c){S.a7(new V.kc(this,a,c),new V.kd(this,a,c),null,null)
return H.b(a.dx)+" fails to kick "+H.b(this.b.dx)+"'s weapon off"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
S.a7(new V.ke(this,a,c),new V.kf(this,a,c),null,null)
z=b.f
z=z.length!==0?C.a.gE(z):null
y=z.e
x=new U.b4(null,null,null,null,null,null,null,null,null)
x.j(z)
new V.kg(this).$1(x)
b.bE(y,x.p())
z=this.b
b.W(z.y,new V.kh())
return H.b(a.dx)+" kicks "+H.b(z.dx)+"'s weapon off"},"$3","gM",6,0,1],
H:function(a,b){var z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
return 0.5-z},
G:function(a,b){var z=a.fr
if(z===C.d||z===C.f){z=this.b
z=z.fr===C.b&&!(z.e instanceof K.V)}else z=!1
return z},
B:{
wC:[function(a){return new V.kb(!0,C.e,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tG",2,0,4]}},kc:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.a7(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.ab(y,"<subject> mi<sses>",!0)}},kd:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.a7(z,"<subject> kick<s> <object's> weapon",y)
y.ab(z,"<subject> hold<s> onto it",!0)}},ke:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.je(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.e,z,!0)}},kf:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b2(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.bw(0,"<owner's> <subject> fl<ies> away",y,y.e)}},kg:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gad()
y=z.b
if(y==null){y=new S.N(null,null,[U.D])
y.ac()
y.j(C.h)
z.b=y
z=y}else z=y
y=this.a.b.e
if(y==null)H.e(P.F("null element"))
z=z.gcQ();(z&&C.a).v(z,y)
return a}},kh:{"^":"a:0;",
$1:function(a){var z=$.$get$d7()
a.gk().f=z
return a}}}],["","",,R,{"^":"",m_:{"^":"v;O:c<,J:d<,I:e<,Y:f<,N:r<,b,a",
gn:function(){return"KickToGround"},
ga4:function(){return"kick <object> to the ground"},
ga8:function(){return"will <subject> kick <object> prone?"},
P:[function(a,b,c){S.a7(new R.m0(this,a,c),new R.m1(this,a,c),null,null)
return H.b(a.dx)+" fails to sweep "+H.b(this.b.dx)+" off feet"},"$3","gL",6,0,1],
R:[function(a,b,c){var z
S.a7(new R.m2(this,a,c),new R.m3(this,a,c,U.bt(b)),null,null)
z=this.b
b.W(z.y,new R.m4())
return H.b(a.dx)+" sweeps "+H.b(z.dx)+" off feet"},"$3","gM",6,0,1],
H:function(a,b){var z=a.fr===C.d?0:0.3
if(a.cx)return 0.8-z
return 0.5-z},
G:function(a,b){var z=a.fr
return(z===C.d||z===C.f)&&this.b.fr!==C.b},
B:{
wT:[function(a){return new R.m_(!0,C.e,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uC",2,0,4]}},m0:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.a7(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.ab(y,"<subject> mi<sses>",!0)}},m1:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.a7(z,"<subject> kick<s> <object's> shin",y)
y.ab(z,"<subject> <does>n't budge",!0)}},m2:{"^":"a:2;a,b,c",
$0:function(){this.b.jc(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},m3:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b2(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.a2(z,"<subject> {grunt|shriek}<s>")
y.as(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},m4:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,F,{"^":"",mN:{"^":"ag;N:b<,I:c<,Y:d<,O:e<,J:f<,a",
gX:function(){return"Stand off."},
gn:function(){return"Pass"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.cx)a.a2(c,"<subject> stand<s> off")
return H.b(a.dx)+" passes the opportunity"},"$3","gM",6,0,1],
a5:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return!0}}}],["","",,Y,{"^":"",n0:{"^":"v;O:c<,J:d<,I:e<,Y:f<,N:r<,b,a",
ga4:function(){return"force <object> off balance"},
gn:function(){return"Pound"},
ga8:function(){return"will <subject> force <object> off balance?"},
P:[function(a,b,c){var z=this.b
a.e9(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.e,z)
z.aZ(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.dx)+" kicks "+H.b(z.dx)+" off balance"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
a.e9(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.e,z)
y=z.fr
if(y===C.d){z.fs(c,"<subject> lose<s> <object>",!0,$.$get$ei())
b.W(z.y,new Y.n1())
C.a.v(b.f,U.mt(z,a))
return H.b(a.dx)+" pounds "+H.b(z.dx)+" off balance"}else if(y===C.f){z.a2(c,"<subject> <is> already off balance")
c.dM(0,"<subject> make<s> <object> fall to the "+H.b(U.bt(b)),z,$.$get$ig())
b.W(z.y,new Y.n2())
return H.b(a.dx)+" pounds "+H.b(z.dx)+" to the ground"}throw H.c(new P.u("enemy pose must be either standing or off-balance"))},"$3","gM",6,0,1],
H:function(a,b){var z=a.fr===C.d?0:0.2
if(a.cx)return 0.9-z
return 0.5-z},
G:function(a,b){var z,y
if(a.fr!==C.b)if(a.e.gag()>0||!1){z=this.b
y=z.e
if(!y.gbT()){y.gdR()
y=!1}else y=!0
z=y&&z.fr!==C.b}else z=!1
else z=!1
return z},
B:{
x0:[function(a){return new Y.n0(!0,C.e,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uN",2,0,4]}},n1:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return a}},n2:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,B,{"^":"",nh:{"^":"ag;N:b<,I:c<,Y:d<,O:e<,J:f<,a",
gX:function(){return"Regain balance."},
gn:function(){return"RegainBalance"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){if(a.cx)a.b2(c,"<subject> regain<s> <object>",$.$get$ei(),!0)
b.W(a.y,new B.ni())
return H.b(a.dx)+" regains balance"},"$3","gM",6,0,1],
a5:function(a,b){return"Will "+a.fx.a+" regain balance?"},
H:function(a,b){return 1},
G:function(a,b){return a.fr===C.f}},ni:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return C.d}}}],["","",,O,{"^":"",nx:{"^":"ag;N:b<,I:c<,Y:d<,O:e<,J:f<,a",
gX:function(){return"Scramble."},
gn:function(){return"Scramble"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.dx)+" scrambles on ground"},"$3","gM",6,0,1],
a5:function(a,b){return"Will "+a.fx.a+" crawl out of harm's way?"},
H:function(a,b){return 1},
G:function(a,b){if(a.fr!==C.b)return!1
if(A.dc(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oh:{"^":"ag;N:b<,I:c<,Y:d<,O:e<,J:f<,a",
gX:function(){return"Stand up."},
gn:function(){return"StandUp"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.a2(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a7(new Q.oi(a,c),new Q.oj(a,c),null,null)
b.W(a.y,new Q.ok())
return H.b(a.dx)+" stands up"},"$3","gM",6,0,1],
a5:function(a,b){return"Will "+a.fx.a+" stand up?"},
H:function(a,b){return 1},
G:function(a,b){if(a.fr!==C.b)return!1
if(A.dc(a,b))return!1
return!0}},oi:{"^":"a:2;a,b",
$0:function(){return this.a.a2(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},oj:{"^":"a:2;a,b",
$0:function(){return this.a.a2(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},ok:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return C.d}}}],["","",,T,{"^":"",
xs:[function(a){return new A.a2(T.es(),null,null,new T.v_(),new T.v0(),new T.v1(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","w3",2,0,4],
xt:[function(a){return new A.a2(T.es(),new T.v2(),T.es(),new T.v3(),new T.v4(),new T.v5(),new T.v6(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.e,"break <object's> neck","will <subject> succeed?",a,null)},"$1","w4",2,0,4],
xu:[function(a,b,c,d,e){a.a7(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.W(a.y,new T.v7())},"$5","es",10,0,8],
v_:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.e instanceof K.V&&c.e instanceof K.V}},
v0:{"^":"a:3;",
$3:function(a,b,c){return Y.eK(a,c)}},
v1:{"^":"a:3;",
$3:function(a,b,c){return S.dH(a,c,C.n)}},
v3:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.e instanceof K.V&&c.e instanceof K.V}},
v4:{"^":"a:3;",
$3:function(a,b,c){return Y.eK(a,c)}},
v5:{"^":"a:3;",
$3:function(a,b,c){return S.dH(a,c,C.o)}},
v2:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v6:{"^":"a:3;",
$3:function(a,b,c){return S.dH(a,c,C.t)}},
v7:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,A,{"^":"",a2:{"^":"v;c,d,e,f,r,x,y,z,N:Q<,I:ch<,Y:cx<,n:cy<,O:db<,J:dx<,a4:dy<,a8:fr<,b,a",
P:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.v(y,x)
C.a.v(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.dx)+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.v(w,y)
C.a.v(w,x)
return H.b(a.dx)+" starts a "+this.cy+" (defensible situation) at "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
G:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xv:[function(a){return new A.a2(M.et(),null,null,new M.v8(),new M.v9(),new M.va(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","w5",2,0,4],
xw:[function(a){return new A.a2(M.et(),new M.vb(),M.et(),new M.vc(),new M.vd(),new M.ve(),new M.vf(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.e,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","w6",2,0,4],
xx:[function(a,b,c,d,e){if(a.fr===C.b){a.fp(c,"<subject> roll<s>",e.gq())
a.fp(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gq())}a.j8(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gq(),d)},"$5","et",10,0,8],
v8:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(!a.cx){if(!(a.e instanceof K.V)){z=a.go
y=$.$get$bs()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&c.fr!==C.b&&!A.dc(a,b)}else z=!1
return z}},
v9:{"^":"a:3;",
$3:function(a,b,c){return F.fa(a,c)}},
va:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.n)}},
vc:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.e instanceof K.V&&c.fr!==C.b&&!A.dc(a,b)}},
vd:{"^":"a:3;",
$3:function(a,b,c){return F.fa(a,c)}},
ve:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.o)}},
vb:{"^":"a:3;",
$3:function(a,b,c){return a.gd1()?0.4:0.2}},
vf:{"^":"a:3;",
$3:function(a,b,c){return V.dw(a,c,C.t)}}}],["","",,U,{"^":"",
xy:[function(a){return new A.a2(U.eu(),null,null,new U.vg(),new U.vh(),new U.vi(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","w7",2,0,4],
xz:[function(a){return new A.a2(U.eu(),new U.vj(),U.eu(),new U.vk(),new U.vl(),new U.vm(),new U.vn(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.e,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","w8",2,0,4],
xA:[function(a,b,c,d,e){c.hZ(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gq(),!0,d,a)},"$5","eu",10,0,8],
vg:{"^":"a:3;",
$3:function(a,b,c){var z
if(!a.cx){z=a.fr
z=(z===C.d||z===C.f)&&c.fr!==C.b&&a.e instanceof K.V}else z=!1
return z}},
vh:{"^":"a:3;",
$3:function(a,b,c){return Q.fy(a,c)}},
vi:{"^":"a:3;",
$3:function(a,b,c){return Z.dO(a,c,C.n)}},
vk:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.cx){z=a.fr
z=(z===C.d||z===C.f)&&c.fr!==C.b&&a.e instanceof K.V}else z=!1
return z}},
vl:{"^":"a:3;",
$3:function(a,b,c){return Q.fy(a,c)}},
vm:{"^":"a:3;",
$3:function(a,b,c){return Z.dO(a,c,C.o)}},
vj:{"^":"a:3;",
$3:function(a,b,c){return 0.8}},
vn:{"^":"a:3;",
$3:function(a,b,c){return Z.dO(a,c,C.t)}}}],["","",,G,{"^":"",
xB:[function(a){return new A.a2(G.ev(),null,null,new G.vq(),new G.vr(),new G.vs(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","w9",2,0,4],
xG:[function(a){return new A.a2(G.ev(),new G.vB(),G.ev(),new G.vC(),new G.vD(),new G.vE(),new G.vF(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.e,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wa",2,0,4],
xH:[function(a,b,c,d,e){return a.d8(c,"<subject> swing<s> {"+U.aa(a)+" |}at <object>",e.gq(),!0,d)},"$5","ev",10,0,8],
vq:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e.gag()>0}},
vr:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vs:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.n)}},
vC:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e.gag()>0}},
vD:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vE:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.o)}},
vB:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=c.gbA()!=null?0.2:0
y=c.gd1()?0:0.2
return 0.7-z+y}},
vF:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.t)}}}],["","",,R,{"^":"",
xC:[function(a,b,c,d,e){return a.fs(c,"<subject> completely miss<es> <object> with "+U.aa(a),!0,d)},"$5","im",10,0,12],
xD:[function(a){return new A.a2(R.io(),new R.vt(),R.im(),new R.vu(),new R.vv(),new R.vw(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wb",2,0,4],
xE:[function(a){return new A.a2(R.io(),new R.vx(),R.im(),new R.vy(),new R.vz(),new R.vA(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","wc",2,0,4],
xF:[function(a,b,c,d,e){return a.d8(c,"<subject> swing<s> {"+U.aa(a)+" |}at <object>",e.gq(),!0,d)},"$5","io",10,0,8],
vu:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.f&&c.fr!==C.b&&a.e.gag()>0}},
vv:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vw:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.n)}},
vt:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vy:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.f&&c.fr!==C.b&&a.e.gag()>0}},
vz:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vA:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.o)}},
vx:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gbA()!=null?0.2:0)}}}],["","",,D,{"^":"",
xI:[function(a){return new A.a2(D.ew(),null,null,new D.vG(),new D.vH(),new D.vI(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","wd",2,0,4],
xJ:[function(a){return new A.a2(D.ew(),new D.vJ(),D.ew(),new D.vK(),new D.vL(),new D.vM(),new D.vN(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.e,"strike down at <object>","will <subject> hit?",a,null)},"$1","we",2,0,4],
xK:[function(a,b,c,d,e){return a.a7(c,"<subject> strike<s> down {with "+U.aa(a)+" |}at <object>",d)},"$5","ew",10,0,12],
vG:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e.gag()>0}},
vH:{"^":"a:3;",
$3:function(a,b,c){return D.cW(a,c)}},
vI:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.n)}},
vK:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e.gag()>0}},
vL:{"^":"a:3;",
$3:function(a,b,c){return D.cW(a,c)}},
vM:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.o)}},
vJ:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gfb()?0.2:0
y=c.gbA()!=null?0.2:0
return 0.7-z-y}},
vN:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.t)}}}],["","",,A,{"^":"",
xL:[function(a){return new A.a2(A.ex(),null,null,new A.vO(),new A.vP(),new A.vQ(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wf",2,0,4],
xP:[function(a){return new A.a2(A.ex(),new A.vZ(),A.ex(),new A.w_(),new A.w0(),new A.w1(),new A.w2(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.e,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wg",2,0,4],
xQ:[function(a,b,c,d,e){return a.d8(c,"<subject> thrust<s> {"+U.aa(a)+" |}at <object>",e.gq(),!0,d)},"$5","ex",10,0,8],
vO:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e instanceof Z.am}},
vP:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
vQ:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.n)}},
w_:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e instanceof Z.am}},
w0:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
w1:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.o)}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gbA()!=null?0.2:0)}},
w2:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.t)}}}],["","",,O,{"^":"",
xM:[function(a){return new A.a2(O.ey(),null,null,new O.vR(),new O.vS(),new O.vT(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wh",2,0,4],
xN:[function(a){return new A.a2(O.ey(),new O.vU(),O.ey(),new O.vV(),new O.vW(),new O.vX(),new O.vY(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.e,"thrust down at <object>","will <subject> hit?",a,null)},"$1","wi",2,0,4],
xO:[function(a,b,c,d,e){return a.a7(c,"<subject> thrust<s> down {with "+U.aa(a)+" |}at <object>",d)},"$5","ey",10,0,12],
vR:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e instanceof Z.am}},
vS:{"^":"a:3;",
$3:function(a,b,c){return D.cW(a,c)}},
vT:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.n)}},
vV:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e instanceof Z.am}},
vW:{"^":"a:3;",
$3:function(a,b,c){return D.cW(a,c)}},
vX:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.o)}},
vU:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gfb()?0.2:0
y=c.gbA()!=null?0.2:0
return 0.7-z-y}},
vY:{"^":"a:3;",
$3:function(a,b,c){return V.bD(a,c,C.t)}}}],["","",,E,{"^":"",oP:{"^":"c3;Y:c<,b,a",
ga4:function(){return"pick up <object>"},
gN:function(){return"A shield makes a huge difference in battle."},
gI:function(){return!1},
gn:function(){return"TakeDroppedShield"},
gO:function(){return!1},
gJ:function(){return},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.f
z=z.length!==0?C.a.gE(z):null
y=z.e
x=new U.b4(null,null,null,null,null,null,null,null,null)
x.j(z)
new E.oQ(this).$1(x)
b.bE(y,x.p())
b.W(a.y,new E.oR(this))
z=this.b
a.a7(c,"<subject> pick<s> <object> up",z)
return H.b(a.dx)+" picks up "+z.gn()},"$3","gM",6,0,1],
a5:function(a,b){return H.e(new P.Z(null))},
H:function(a,b){return 1},
G:function(a,b){if(!(this.b instanceof E.bi))return!1
if(a.d!=null)return!1
return!0},
B:{
x4:[function(a){return new E.oP(!0,a,null)},"$1","wn",2,0,27]}},oQ:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gad()
y=z.b
if(y==null){y=new S.N(null,null,[U.D])
y.ac()
y.j(C.h)
z.b=y
z=y}else z=y
z=z.gcQ();(z&&C.a).a_(z,this.a.b)
return a}},oR:{"^":"a:0;a",
$1:function(a){var z=H.A(this.a.b,"$isbi")
a.gk().e=z}}}],["","",,M,{"^":"",oS:{"^":"c3;Y:c<,b,a",
ga4:function(){return"pick up <object>"},
gN:function(){return"A different weapon might change the battle."},
gI:function(){return!1},
gn:function(){return"TakeDroppedWeapon"},
gO:function(){return!1},
gJ:function(){return},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.f
z=z.length!==0?C.a.gE(z):null
y=z.e
x=new U.b4(null,null,null,null,null,null,null,null,null)
x.j(z)
new M.oT(this).$1(x)
b.bE(y,x.p())
b.W(a.y,new M.oU(this,a))
z=this.b
a.a7(c,"<subject> pick<s> <object> up",z)
return H.b(a.dx)+" picks up "+z.gn()},"$3","gM",6,0,1],
a5:function(a,b){return H.e(new P.Z(null))},
H:function(a,b){return 1},
G:function(a,b){var z,y,x,w,v
z=this.b
y=J.o(z)
if(!y.$isaN)return!1
if(!!y.$isam)return!1
x=a.e
w=x instanceof Z.am&&!!y.$isaB
if(z.gal()<=x.gal()&&!w)return!1
v=b.c_("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
B:{
x5:[function(a){return new M.oS(!0,a,null)},"$1","wo",2,0,27]}},oT:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gad()
y=z.b
if(y==null){y=new S.N(null,null,[U.D])
y.ac()
y.j(C.h)
z.b=y
z=y}else z=y
z=z.gcQ();(z&&C.a).a_(z,this.a.b)
return a}},oU:{"^":"a:0;a,b",
$1:function(a){var z,y
if(!(this.b.e instanceof K.V)){z=a.gk()
y=z.db
if(y==null){y=new L.W(null,null,[U.D])
y.ai()
y.j(C.h)
z.db=y
z=y}else z=y
y=a.gk().f
if(y==null)H.e(P.F("null element"))
z.gb_().v(0,y)}z=H.A(this.a.b,"$isaN")
a.gk().f=z}}}],["","",,D,{"^":"",p0:{"^":"v;I:c<,Y:d<,N:e<,O:f<,J:r<,b,a",
ga4:function(){return"throw spear at <object>"},
gn:function(){return"ThrowSpear"},
ga8:function(){return"will <subject> hit <object>?"},
P:[function(a,b,c){var z,y,x
z=this.eF(a)
y=this.b
x="<subject's> "+z.b
a.a7(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+x+" at <object>",y)
x=y.d
if(x!=null)y.ja(c,"<subject> deflects it with <subject's> <object>",!0,x,!0)
else y.e8(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.a2(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bt(b))+"{| nearby| not far from here}")
this.eK(b,a,z)
return H.b(a.dx)+" fails to hit "+H.b(y.dx)+" with spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t
z=this.eF(a)
y=this.b
x="<subject's> "+z.b
a.a7(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+x+" at <object>",y)
x=y.d
if(x!=null)z.d9(c,"<subject> fl<ies> past <object-owner's> <object>",x,y,a,!0)
x=y.y
b.W(x,new D.p4(z))
w=b.A(x)
v=!(w.x>0)&&w.y!==100
x=[P.l]
if(!v){u=S.bI("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.go
x=H.m([],x)
z.d9(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.ay(!1,u,x,t==null?$.$get$aG():t,!1,C.p),w,a,!0)
N.b_(c,w)}else{u=S.bI("{chest|eye|neck}")
t=a.go
x=H.m([],x)
z.d9(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.ay(!1,u,x,t==null?$.$get$aG():t,!1,C.p),w,a,!0)
N.bc(c,b,w)}this.eK(b,a,z)
return H.b(a.dx)+" hits "+H.b(y.dx)+" with spear"},"$3","gM",6,0,1],
H:function(a,b){return 0.4-(this.b.d!=null?0.2:0)},
G:function(a,b){var z
if(a.cx)if(a.fr===C.d)z=(C.a.ae(a.e.a,C.v)||a.dT(C.v)>=1)&&J.t(b.a9("FightSituation").gV(),0)
else z=!1
else z=!1
return z},
eF:function(a){var z,y,x
z=a.e
if(z!=null&&!!z.$isam)return z
for(z=a.cy.a,y=new P.ae(z,z.r,null,null,[null]),y.c=z.e;y.w();){x=y.d
if(x instanceof Z.am)return x}throw H.c(new P.u("No spear found in "+H.b(a)))},
eK:function(a,b,c){var z,y,x
z=a.a9("FightSituation")
y=b.e
if(y==null?c==null:y===c){x=b.iv()
if(x==null)x=$.$get$d7()
a.W(b.y,new D.p1(x))}else a.W(b.y,new D.p2(c))
a.bE(z.gq(),z.af(new D.p3(c)))},
B:{
x7:[function(a){return new D.p0(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.e,a,null)},"$1","wr",2,0,4]}},p4:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.d
a.gk().y=z-y
return a}},p1:{"^":"a:0;a",
$1:function(a){var z,y,x
z=this.a
a.gk().f=z
y=a.gk()
x=y.db
if(x==null){x=new L.W(null,null,[U.D])
x.ai()
x.j(C.h)
y.db=x
y=x}else y=x
y.gb_().a_(0,z)
return a}},p2:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.W(null,null,[U.D])
y.ai()
y.j(C.h)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}},p3:{"^":"a:0;a",
$1:function(a){a.gbC().v(0,this.a)
return a}}}],["","",,M,{"^":"",pc:{"^":"ag;N:b<,O:c<,J:d<,I:e<,Y:f<,a",
gX:function(){return"Regain clarity."},
gn:function(){return"Unconfuse"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){a.a2(c,"<subject> shake<s> <subject's> head violently")
if(a.cx)c.v(0,"the {horrible|terrible} spell seems to recede")
a.j9(c,"<subject's> eyes regain focus and clarity",!0,!0)
b.W(a.y,new M.pd())
return H.b(a.dx)+" regains clarity"},"$3","gM",6,0,1],
a5:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.ch&&b.c_("Confuse",a,!0)>8}},pd:{"^":"a:0;",
$1:function(a){a.gk().cx=!1
return a}}}],["","",,R,{"^":"",l9:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
gn:function(){return"FinishBreakNeck"},
ga4:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
y=z.y
b.W(y,new R.la())
x=b.A(y)
if(x.y===100){a.b2(c,"<subject> smash<es> <object's> head to the ground",x,!0)
N.b_(c,x)}else{a.b2(c,"<subject> break<s> <object's> neck",x,!0)
N.bc(c,b,x)}return H.b(a.dx)+" breaks "+H.b(z.dx)+"'s neck on ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
B:{
wI:[function(a){return new R.l9(null,!0,!0,!0,C.e,a,null)},"$1","tS",2,0,4]}},la:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,Y,{"^":"",
eK:function(a,b){var z=new Y.dh(null,null,null,null,null)
new Y.tg(a,b).$1(z)
return z.p()},
eJ:{"^":"ad;",
gau:function(){return[R.tS()]},
gn:function(){return"BreakNeckOnGroundSituation"},
an:function(){var z=new Y.dh(null,null,null,null,null)
z.j(this)
new Y.jF().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.A(this.a)
return},
aM:function(a,b){return new H.I(a,new Y.jG(this),[H.j(a,0)])}},
tg:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaP().c=z
a.gaP().e=0
z=this.a.y
a.gaP().b=z
z=this.b.y
a.gaP().d=z
return a}},
jF:{"^":"a:0;",
$1:function(a){var z=a.gaP().e
a.gaP().e=z+1
return a}},
jG:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pv:{"^":"eJ;a,q:b<,c,V:d<",
af:function(a){var z=new Y.dh(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eJ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("BreakNeckOnGroundSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dh:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaP().c},
gV:function(){return this.gaP().e},
gaP:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaP().b
x=this.gaP().c
w=this.gaP().d
v=this.gaP().e
z=new Y.pv(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Z,{"^":"",kS:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"evade"},
gn:function(){return"EvadeNeckBreaking"},
ga8:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {dodge it|break free}")
S.a7(new Z.kT(a,c),new Z.kU(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.b2(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.aE("FightSituation")
return H.b(a.dx)+" evades "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.6
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.5)},
G:function(a,b){return!0},
B:{
wH:[function(a){return new Z.kS("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.e,a,null)},"$1","tM",2,0,4]}},kT:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {can't|fail<s>}",!0)}},kU:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dH:function(a,b,c){var z=new S.dG(null,null,null,null,null,null)
new S.tf(a,b,c).$1(z)
return z.p()},
fo:{"^":"c_;",
gau:function(){return[Z.tM()]},
gn:function(){return"OnGroundWrestleDefenseSituation"},
an:function(){var z=new S.dG(null,null,null,null,null,null)
z.j(this)
new S.mH().$1(z)
return z.p()}},
tf:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaC().c=z
a.gaC().f=0
z=this.a.y
a.gaC().b=z
z=this.b.y
a.gaC().e=z
a.gaC().d=this.c
return a}},
mH:{"^":"a:0;",
$1:function(a){var z=a.gaC().f
a.gaC().f=z+1
return a}},
pF:{"^":"fo;ci:a<,q:b<,bX:c<,bZ:d<,V:e<",
af:function(a){var z=new S.dG(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fo))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$T().$1("OnGroundWrestleDefenseSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dG:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaC().c},
gV:function(){return this.gaC().f},
gaC:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaC().b
x=this.gaC().c
w=this.gaC().d
v=this.gaC().e
u=this.gaC().f
z=new S.pF(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,A,{"^":"",
dc:function(a,b){var z,y,x,w
z=b.c_("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.c_("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.c_("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.c_("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
bW:function(a){var z="<subject's> "+a.d.b
return z},
aa:function(a){var z=a.e
return z.gaH()?z.gn():"<subject's> "+z.gn()}}],["","",,G,{"^":"",
xg:[function(a,b,c,d,e){var z
a.a2(c,"<subject> tr<ies> to swing back")
a.e7(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
z=a.fr
if(z===C.d){b.W(a.y,new G.tq())
a.bF(c,"<subject> lose<s> balance because of that",!0,!0)}else if(z===C.f){b.W(a.y,new G.tr())
a.as(c,"<subject> lose<s> balance because of that",!0)
a.bF(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hT",10,0,12],
xh:[function(a){return new A.a2(G.hU(),new G.ts(),G.hT(),new G.tt(),new G.tu(),new G.tv(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tA",2,0,4],
xj:[function(a,b,c,d,e){return a.a7(c,"<subject> swing<s> back",d)},"$5","hU",10,0,8],
xi:[function(a){return new A.a2(G.hU(),new G.tw(),G.hT(),new G.tx(),new G.ty(),new G.tz(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.e,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tB",2,0,4],
tq:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return a}},
tr:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},
tt:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.e.gag()>0&&a.fr!==C.b}},
tu:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
tv:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.n)}},
ts:{"^":"a:3;",
$3:function(a,b,c){return c.gd1()?0.7:0.9}},
tx:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.e.gag()>0&&a.fr!==C.b}},
ty:{"^":"a:3;",
$3:function(a,b,c){return M.b8(a,c)}},
tz:{"^":"a:3;",
$3:function(a,b,c){return L.aL(a,c,C.o)}},
tw:{"^":"a:3;",
$3:function(a,b,c){return c.gd1()?0.7:0.9}}}],["","",,V,{"^":"",jZ:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"tackle <object>"},
gn:function(){return"CounterTackle"},
ga8:function(){return"will <subject> tackle <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.a7(c,"<subject> tr<ies> to tackle <object>",z)
S.a7(new V.k_(a,c),new V.k0(this,c),null,null)
a.a7(c,"<subject> land<s> on the "+H.b(U.bt(b))+" next to <object>",z)
b.W(a.y,new V.k1())
return H.b(a.dx)+" fails to tackle "+H.b(z.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.a7(c,"<subject> tackle<s> <object> to the ground",z)
b.W(z.y,new V.k2())
b.W(a.y,new V.k3())
return H.b(a.dx)+" tackles "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){var z=this.b.fr===C.f?0.2:0
if(a.cx)return 0.7+z
return 0.5+z},
G:function(a,b){return a.fr!==C.b&&a.e instanceof K.V},
B:{
wA:[function(a){return new V.jZ("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.e,a,null)},"$1","tC",2,0,4]}},k_:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> go<es> wide",!0)}},k0:{"^":"a:2;a,b",
$0:function(){return this.a.b.ab(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},k1:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},k2:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},k3:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,S,{"^":"",
bZ:function(a,b){var z=new S.dk(null,null,null,null,null)
new S.t9(a,b).$1(z)
return z.p()},
eQ:{"^":"ad;",
gau:function(){return[G.tA(),G.tB(),V.tC()]},
gbv:function(){return[$.$get$dJ()]},
gn:function(){return"CounterAttackSituation"},
an:function(){var z=new S.dk(null,null,null,null,null)
z.j(this)
new S.jX().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.A(this.a)
return},
aM:function(a,b){return new H.I(a,new S.jY(this),[H.j(a,0)])}},
t9:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaQ().c=z
a.gaQ().e=0
a.gaQ().b=this.a.y
z=this.b.y
a.gaQ().d=z
return a}},
jX:{"^":"a:0;",
$1:function(a){var z=a.gaQ().e
a.gaQ().e=z+1
return a}},
jY:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pw:{"^":"eQ;a,q:b<,c,V:d<",
af:function(a){var z=new S.dk(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eQ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("CounterAttackSituation")
y=J.z(z)
y.m(z,"counterAttacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dk:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaQ().c},
gV:function(){return this.gaQ().e},
gaQ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaQ().b
x=this.gaQ().c
w=this.gaQ().d
v=this.gaQ().e
z=new S.pw(y,x,w,v)
if(y==null)H.e(P.i("counterAttacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",c_:{"^":"o3;",
gd3:function(){return 1000},
at:function(a,b){if(a===0)return b.A(this.gbZ())
return},
aM:function(a,b){return new H.I(a,new O.k6(this),[H.j(a,0)])}},o3:{"^":"ad+n3;"},k6:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.gci()
if(z==null?x!=null:z!==x){z=a.gq()
y=y.gbZ()
y=z==null?y==null:z===y
z=y}else z=!0
return z}}}],["","",,U,{"^":"",
bt:function(a){return a.a9("FightSituation").gbK()},
c2:function(a,b,c,d,e){var z=new U.b4(null,null,null,null,null,null,null,null,null)
new U.rs(a,b,c,d,e).$1(z)
return z.p()},
cG:{"^":"ad;",
gau:function(){return[N.tn(),V.tG(),R.uC(),Y.uN(),T.w3(),T.w4(),M.w5(),M.w6(),U.w7(),U.w8(),G.w9(),G.wa(),D.wd(),D.we(),R.wb(),R.wc(),A.wf(),A.wg(),O.wh(),O.wi(),E.wn(),M.wo(),D.wr()]},
gbv:function(){return H.m([$.$get$fB(),$.$get$fU(),$.$get$fF(),$.$get$hj()],[Q.ag])},
gd3:function(){return 1000},
gn:function(){return"FightSituation"},
cj:function(a,b){var z=b.a
return(z&&C.a).b6(z,new U.kX(a))},
an:function(){var z=new U.b4(null,null,null,null,null,null,null,null,null)
z.j(this)
new U.kY().$1(z)
return z.p()},
at:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=X.hL(this.f,this.b)
y=H.bC(z,new U.kZ(b),H.y(z,"x",0),null)
x=H.y(y,"x",0)
w=P.O(new H.I(y,new U.l_(),[x]),!1,x)
x=H.j(w,0)
v=P.O(new H.I(w,new U.l0(),[x]),!1,x)
u=v.length===1?C.a.gbM(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.aw)(w),++r){q=w[r]
x=b.d
p=x.aX(0,new U.l1(q),new U.l2())
o=p==null?p:p.gV()
if(o==null)o=-1
n=b.r-o
if(n<=0)continue
m=x.aX(0,new U.l3(q),new U.l4())
l=m==null?m:m.gV()
if(l==null)l=-1
k=(b.r-l+n)/2
if(q.gb1())k*=1.5
if(k>t){s=q
t=k}}return s},
aM:function(a,b){return new H.I(a,new U.l5(this),[H.j(a,0)])},
fh:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.aa(z))y.h(0,z).$2(a,b)},
ct:function(a){var z,y,x,w,v,u,t,s
z=this.r
if(z!=null&&!this.cj(a,this.b)&&this.cj(a,this.f)){y=a.ek(z)
z=y.b
x=new F.cQ(null,null,null,null,null)
x.j(y)
new U.l6().$1(x)
a.bE(z,x.p())
for(z=this.f,x=z.a,x=new J.b3(x,x.length,0,null,[H.j(x,0)]),w=a.a;x.w();){v=x.d
u=a.A(v)
if(u.gam()&&u.Q){t=a.A(v)
t.toString
u=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(t==null)H.e(P.i("other"))
u.a=t
new U.l7().$1(u)
s=u.p()
w.a_(0,t)
w.v(0,s)}}C.a.v(a.f,X.mh(z,this.d,this.a,null))}else this.cj(a,this.f)},
cF:function(a){var z=this.f
if(this.cj(a,z))if(this.cj(a,this.b)){z=z.a
z=(z&&C.a).b6(z,new U.l8(a))}else z=!1
else z=!1
return z}},
rs:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a9().ak(1073741823)
a.gad().f=z
a.gad().y=0
z=a.gad()
y=z.r
if(y==null){y=new S.N(null,null,[P.r])
y.ac()
y.j(C.h)
z.r=y
z=y}else z=y
z.j(J.eC(this.a,new U.r2()))
z=a.gad()
y=z.c
if(y==null){y=new S.N(null,null,[P.r])
y.ac()
y.j(C.h)
z.c=y
z=y}else z=y
y=this.b
z.j(new H.al(y,new U.r3(),[H.j(y,0),null]))
a.gad().e=this.c
y=new S.N(null,null,[U.D])
y.ac()
y.j(C.h)
a.gad().b=y
y=this.d.b
a.gad().x=y
y=new A.cL(null,null,[P.r,{func:1,v:true,args:[A.a4,Y.a3]}])
y.bS()
y.j(this.e)
a.gad().d=y
return a}},
r2:{"^":"a:0;",
$1:function(a){return a.gq()}},
r3:{"^":"a:0;",
$1:function(a){return a.gq()}},
kX:{"^":"a:0;a",
$1:function(a){var z=this.a.A(a)
return z.gam()&&z.Q}},
kY:{"^":"a:0;",
$1:function(a){var z=a.gad().y
a.gad().y=z+1
return a}},
kZ:{"^":"a:0;a",
$1:function(a){return this.a.A(a)}},
l_:{"^":"a:0;",
$1:function(a){return a.gbm()}},
l0:{"^":"a:0;",
$1:function(a){return a.gb1()}},
l1:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gcu()
y=this.a.gq()
return(z==null?y==null:z===y)&&a.gfG()}},
l2:{"^":"a:2;",
$0:function(){return}},
l3:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gcu()
y=this.a.gq()
return z==null?y==null:z===y}},
l4:{"^":"a:2;",
$0:function(){return}},
l5:{"^":"a:21;a",
$1:function(a){var z,y,x
if(a.gam()&&a.Q){z=this.a
y=a.y
x=z.f.a
if(!(x&&C.a).ae(x,y)){z=z.b.a
y=(z&&C.a).ae(z,y)
z=y}else z=!0}else z=!1
return z}},
l6:{"^":"a:0;",
$1:function(a){a.gaG().d=!1
return a}},
l7:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}},
l8:{"^":"a:31;a",
$1:function(a){var z=this.a.A(a)
return z.cx&&z.gam()&&z.Q}},
py:{"^":"cG;bC:a<,b,c,bK:d<,q:e<,f,r,V:x<",
af:function(a){var z=new U.b4(null,null,null,null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cG))return!1
if(J.t(this.a,b.a))if(J.t(this.b,b.b))if(J.t(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.t(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)),J.f(this.f)),J.f(this.r)),J.f(this.x)))},
i:function(a){var z,y
z=$.$get$T().$1("FightSituation")
y=J.z(z)
y.m(z,"droppedItems",this.a)
y.m(z,"enemyTeamIds",this.b)
y.m(z,"events",this.c)
y.m(z,"groundMaterial",this.d)
y.m(z,"id",this.e)
y.m(z,"playerTeamIds",this.f)
y.m(z,"roomRoamingSituationId",this.r)
y.m(z,"time",this.x)
return y.i(z)}},
b4:{"^":"d;a,b,c,d,e,f,r,x,y",
gbC:function(){var z,y
z=this.gad()
y=z.b
if(y==null){y=new S.N(null,null,[U.D])
y.ac()
y.j(C.h)
z.b=y
z=y}else z=y
return z},
gbK:function(){return this.gad().e},
gq:function(){return this.gad().f},
gV:function(){return this.gad().y},
gad:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ac()
y.j(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ac()
y.j(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cL(null,null,[H.j(z,0),H.j(z,1)])
y.bS()
y.j(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ac()
y.j(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gad()
x=y.b
if(x==null){x=new S.N(null,null,[U.D])
x.ac()
x.j(C.h)
y.b=x
y=x}else y=x
y=y.p()
x=this.gad()
w=x.c
if(w==null){w=new S.N(null,null,[P.r])
w.ac()
w.j(C.h)
x.c=w
x=w}else x=w
x=x.p()
w=this.gad()
v=w.d
if(v==null){v=new A.cL(null,null,[P.r,{func:1,v:true,args:[A.a4,Y.a3]}])
v.bS()
v.j(C.a2)
w.d=v
w=v}else w=v
w=w.p()
v=this.gad().e
u=this.gad().f
t=this.gad()
s=t.r
if(s==null){s=new S.N(null,null,[P.r])
s.ac()
s.j(C.h)
t.r=s
t=s}else t=s
t=t.p()
s=this.gad().x
r=this.gad().y
z=new U.py(y,x,w,v,u,t,s,r)
if(y==null)H.e(P.i("droppedItems"))
if(x==null)H.e(P.i("enemyTeamIds"))
if(w==null)H.e(P.i("events"))
if(v==null)H.e(P.i("groundMaterial"))
if(u==null)H.e(P.i("id"))
if(t==null)H.e(P.i("playerTeamIds"))
if(s==null)H.e(P.i("roomRoamingSituationId"))
if(r==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,N,{"^":"",
bc:function(a,b,c){var z,y
z=b.a9("FightSituation")
y=z.gbK()
b.bE(z.gq(),z.af(new N.uD(c)))
if(c.fr===C.b){c.as(a,"<subject> stop<s> moving",!0)
a.l(0,"\n\n",!0)
return}switch($.$get$hD().ak(3)){case 0:c.bF(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.as(a,"<subject> fall<s> backward",!0)
c.as(a,"<subject> twist<s>",!0)
c.bF(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.as(a,"<subject> drop<s> to <subject's> knees",!0)
c.as(a,"<subject> keel<s> over",!0)
break}a.l(0,"\n\n",!0)},
b_:function(a,b){if(b.y===100&&b.x===0){N.ra(a,b)
return}b.as(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
ra:function(a,b){if(b.fr===C.b){b.as(a,"<subject> stop<s> moving",!0)
a.l(0,"\n\n",!0)
return}b.as(a,"<subject> drop<s> to <subject's> knees",!0)
b.as(a,"<subject> keel<s> over",!0)
a.l(0,"\n\n",!0)},
uD:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
y=z.e
if(!(y instanceof K.V))a.gbC().v(0,y)
z=z.d
if(z!=null)a.gbC().v(0,z)
return a}}}],["","",,R,{"^":"",lb:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
gn:function(){return"FinishLeap"},
ga4:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v
z=this.b
y=z.y
b.W(y,new R.lc())
x=b.A(y)
b.W(a.y,new R.ld())
w=b.a9("LeapSituation").gq()
v=U.bt(b)
a.bq(c,"<subject> {ram<s>|smash<es>} into <object>",w,z,!0)
c.hW(0,"both "+(a.cx||z.cx?"of you":"")+" {land on|fall to} the "+H.b(v),w)
if(z.x>1){c.hX(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",w,z)
N.b_(c,x)
b.W(y,new R.le())}return H.b(a.dx)+" finishes leap at "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
B:{
wJ:[function(a){return new R.lb(null,!0,!0,!0,C.e,a,null)},"$1","tT",2,0,4]}},lc:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},ld:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},le:{"^":"a:0;",
$1:function(a){var z=a.gk().y
a.gk().y=z-1
return a}}}],["","",,S,{"^":"",ki:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"dodge"},
gn:function(){return"DodgeLeap"},
ga8:function(){return"will <subject> dodge?"},
P:[function(a,b,c){var z=b.a9("LeapSituation").gq()
a.fq(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.fr===C.f)a.bG(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new S.kj(a,c,z),new S.kk(a,c,z),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.a9("LeapSituation").gq()
y=U.bt(b)
x=this.b
a.bq(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.as(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.W(x.y,new S.kl())
b.aE("FightSituation")
return H.b(a.dx)+" dodges "+H.b(x.dx)},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.b?0.2:0
if(a.cx)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.5-z+y)},
G:function(a,b){return a.fr!==C.b},
B:{
wD:[function(a){return new S.ki("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.e,a,null)},"$1","tH",2,0,4]}},kj:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},kk:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kl:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,D,{"^":"",lz:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"impale"},
gn:function(){return"ImpaleLeaper"},
ga8:function(){return"will <subject> impale <objectPronoun>?"},
P:[function(a,b,c){var z,y
z=b.a9("LeapSituation").gq()
y=this.b
a.d8(c,"<subject> tr<ies> to {move|swing|shift} "+U.aa(a)+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.fr===C.f)a.bG(c,"<subject> <is> out of balance",z,!0,!0)
else S.a7(new D.lA(a,c,z),new D.lB(a,c,z),null,null)
b.ao()
return H.b(a.dx)+" fails to impale "+H.b(y.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=b.a9("LeapSituation").gq()
y=this.b
a.bq(c,"<subject> {move<s>|swing<s>|shift<s>} "+U.aa(a)+" between <subjectPronounSelf> and <object>",z,y,!0)
y.as(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
z=y.y
b.W(z,new D.lC())
x=b.A(z)
if(!(!(x.x>0)&&x.y!==100)){a.e.a7(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",x)
x.a2(c,"<subject> fall<s> to the ground")
N.b_(c,x)}else{a.e.a7(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",x)
x.as(c,"<subject> go<es> down",!0)
N.bc(c,b,x)}b.aE("FightSituation")
return H.b(a.dx)+" impales "+H.b(y.dx)},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.b?0.2:0
if(a.cx)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.4-z+y)},
G:function(a,b){return a.fr!==C.b&&a.e.gaK()>0},
B:{
wP:[function(a){return new D.lz("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.e,a,null)},"$1","uu",2,0,4]}},lA:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lB:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lC:{"^":"a:0;",
$1:function(a){var z=a.gk().y
a.gk().y=z-1
a.gk().fx=C.b
return a}}}],["","",,V,{"^":"",
dw:function(a,b,c){var z=new V.dv(null,null,null,null,null,null)
new V.td(a,b,c).$1(z)
return z.p()},
f8:{"^":"c_;",
gau:function(){return[S.tH(),D.uu()]},
gn:function(){return"LeapDefenseSituation"},
an:function(){var z=new V.dv(null,null,null,null,null,null)
z.j(this)
new V.m6().$1(z)
return z.p()}},
td:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gay().c=z
a.gay().f=0
z=this.a.y
a.gay().b=z
z=this.b.y
a.gay().e=z
a.gay().d=this.c
return a}},
m6:{"^":"a:0;",
$1:function(a){var z=a.gay().f
a.gay().f=z+1
return a}},
pA:{"^":"f8;ci:a<,q:b<,bX:c<,bZ:d<,V:e<",
af:function(a){var z=new V.dv(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f8))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$T().$1("LeapDefenseSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dv:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gay().c},
gV:function(){return this.gay().f},
gay:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gay().b
x=this.gay().c
w=this.gay().d
v=this.gay().e
u=this.gay().f
z=new V.pA(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,F,{"^":"",
fa:function(a,b){var z=new F.dx(null,null,null,null,null)
new F.te(a,b).$1(z)
return z.p()},
f9:{"^":"ad;",
gau:function(){return[R.tT()]},
gn:function(){return"LeapSituation"},
an:function(){var z=new F.dx(null,null,null,null,null)
z.j(this)
new F.m7().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.A(this.a)
return},
aM:function(a,b){return new H.I(a,new F.m8(this),[H.j(a,0)])}},
te:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaR().c=z
a.gaR().e=0
z=this.a.y
a.gaR().b=z
z=this.b.y
a.gaR().d=z
return a}},
m7:{"^":"a:0;",
$1:function(a){var z=a.gaR().e
a.gaR().e=z+1
return a}},
m8:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pB:{"^":"f9;a,q:b<,c,V:d<",
af:function(a){var z=new F.dx(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.f9))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("LeapSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dx:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaR().c},
gV:function(){return this.gaR().e},
gaR:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaR().b
x=this.gaR().c
w=this.gaR().d
v=this.gaR().e
z=new F.pB(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Z,{"^":"",jn:{"^":"ag;I:b<,Y:c<,O:d<,J:e<,a",
gX:function(){return""},
gN:function(){return},
gn:function(){return"AutoLoot"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.a9("LootSituation")
y=b.A(100)
if(y.Q&&!(y.x>0)){a.a7(c,"<subject> kneel<s> next to <object>",y)
a.a7(c,"<subject> help<s> <object> to <object's> feet",y)
y.ap(c,'"I\'ll live," <subject> say<s>.',!0)
b.W(100,new Z.jA())}x=[]
for(w=z.gbC(),w=w.ga1(w),v=b.a,u=null,t=null;w.w();){s=w.d
r=a.y
q=b.A(r)
p=q.e
o=p instanceof Z.am&&s instanceof G.aB
n=J.o(s)
if(!!n.$isaN){m=s.gag()
l=s.gaK()
k=s.gaH()?1:0
j=p.gag()
i=p.gaK()
p=p.gaH()?1:0
p=2+m+l+k>2+j+i+p||o}else p=!1
if(p){h=b.A(r)
h.toString
r=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.i("other"))
r.a=h
new Z.jB(s,q).$1(r)
g=r.p()
v.a_(0,h)
v.v(0,g)
u=s}else if(!!n.$isbi&&q.d==null){h=b.A(r)
h.toString
r=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.i("other"))
r.a=h
new Z.jC(s).$1(r)
g=r.p()
v.a_(0,h)
v.v(0,g)
t=s}else{h=b.A(r)
h.toString
r=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.i("other"))
r.a=h
new Z.jD(s).$1(r)
g=r.p()
v.a_(0,h)
v.v(0,g)
x.push(s)}}if(u!=null){a.a7(c,"<subject> pick<s> up <object>",u)
a.a7(c,"<subject> wield<s> <object>",u)}if(t!=null){a.a7(c,"<subject> pick<s> up <object>",t)
a.a7(c,"<subject> wield<s> <object>",t)}this.hp(x,a,z,b,c)
this.ho(x,a,z,b,c)
if(x.length!==0)c.i2("<subject> <also> take<s>",x,null,a)
return H.b(a.dx)+" auto-loots"},"$3","gM",6,0,1],
a5:function(a,b){return"WARNING this shouldn't be user-visible"},
H:function(a,b){return 1},
G:function(a,b){return a.cx},
hp:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=P.O(new H.I(a,new Z.ju(),[H.j(a,0)]),!0,L.aN)
for(y=b.cy.a,x=new P.ae(y,y.r,null,null,[null]),x.c=y.e;x.w();){w=x.d
if(w instanceof L.aN)C.a.v(z,w)}if(z.length===0)return
C.a.bN(z,new Z.jv())
y=c.c.a
y.toString
v=new H.al(y,new Z.jw(d),[H.j(y,0),null]).cH(0,new Z.jx())
for(y=J.aj(v.a),x=new H.bN(y,v.b,[H.j(v,0)]),u=d.a;x.w();){t=y.gT()
if(z.length===0)break
s=C.a.fo(z)
r=d.A(t.gq())
r.toString
q=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.jy(s).$1(q)
p=q.p()
u.a_(0,r)
u.v(0,p)
C.a.a_(a,s)
r=d.A(b.y)
r.toString
q=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.jz(s).$1(q)
p=q.p()
u.a_(0,r)
u.v(0,p)
e.dL(0,"<subject> give<s> the "+H.b(s.gn())+" to <object>",null,!1,!1,!1,!1,t,null,null,!1,b,!1,!1)}},
ho:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=P.O(new H.I(a,new Z.jo(),[H.j(a,0)]),!0,E.bi)
for(y=b.cy.a,x=new P.ae(y,y.r,null,null,[null]),x.c=y.e;x.w();){w=x.d
if(w instanceof E.bi)C.a.v(z,w)}if(z.length===0)return
C.a.bN(z,new Z.jp())
y=c.c.a
y.toString
v=new H.al(y,new Z.jq(d),[H.j(y,0),null]).cH(0,new Z.jr())
for(y=J.aj(v.a),x=new H.bN(y,v.b,[H.j(v,0)]),u=d.a;x.w();){t=y.gT()
if(z.length===0)break
s=C.a.fo(z)
r=d.A(t.gq())
r.toString
q=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.js(s).$1(q)
p=q.p()
u.a_(0,r)
u.v(0,p)
C.a.a_(a,s)
r=d.A(b.y)
r.toString
q=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.i("other"))
q.a=r
new Z.jt(s).$1(q)
p=q.p()
u.a_(0,r)
u.v(0,p)
e.dL(0,"<subject> give<s> the "+H.b(s.gn())+" to <object>",null,!1,!1,!1,!1,t,null,null,!1,b,!1,!1)}}},jA:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
a.gk().y=1
return a}},jB:{"^":"a:0;a,b",
$1:function(a){var z,y,x
z=this.b.e
if(!(z instanceof K.V)){y=a.gk()
x=y.db
if(x==null){x=new L.W(null,null,[U.D])
x.ai()
x.j(C.h)
y.db=x
y=x}else y=x
if(z==null)H.e(P.F("null element"))
y.gb_().v(0,z)}a.gk().f=this.a}},jC:{"^":"a:0;a",
$1:function(a){var z=this.a
a.gk().e=z
return z}},jD:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.W(null,null,[U.D])
y.ai()
y.j(C.h)
z.db=y
z=y}else z=y
y=this.a
if(y==null)H.e(P.F("null element"))
z.gb_().v(0,y)
return a}},ju:{"^":"a:0;",
$1:function(a){return a instanceof L.aN}},jv:{"^":"a:6;",
$2:function(a,b){return J.bx(a.gal(),b.gal())}},jw:{"^":"a:0;a",
$1:function(a){return this.a.A(a)}},jx:{"^":"a:0;",
$1:function(a){return a.gbm()&&a.gf9()}},jy:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},jz:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.W(null,null,[U.D])
y.ai()
y.j(C.h)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}},jo:{"^":"a:0;",
$1:function(a){return a instanceof E.bi}},jp:{"^":"a:6;",
$2:function(a,b){return J.bx(a.gal(),b.gal())}},jq:{"^":"a:0;a",
$1:function(a){return this.a.A(a)}},jr:{"^":"a:0;",
$1:function(a){return a.gbm()&&a.gbA()==null}},js:{"^":"a:0;a",
$1:function(a){a.gk().e=this.a
return a}},jt:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.W(null,null,[U.D])
y.ai()
y.j(C.h)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}}}],["","",,X,{"^":"",
mh:function(a,b,c,d){var z=new X.dB(null,null,null,null,null,null)
new X.ru(a,b,c).$1(z)
return z.p()},
fg:{"^":"ad;",
gbv:function(){return H.m([$.$get$eG()],[Q.ag])},
gn:function(){return"LootSituation"},
an:function(){var z=new X.dB(null,null,null,null,null,null)
z.j(this)
new X.mj().$1(z)
return z.p()},
at:function(a,b){if(a>0)return
return this.eG(b.a)},
aM:function(a,b){return[this.eG(a)]},
cF:function(a){return!0},
eG:function(a){return a.cY(0,new X.mi())}},
ru:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaq().e=z
a.gaq().f=0
a.gaq().c=this.b
z=new S.N(null,null,[P.r])
z.ac()
z.j(this.a)
a.gaq().d=z
z=new S.N(null,null,[U.D])
z.ac()
z.j(this.c)
a.gaq().b=z
return a}},
mj:{"^":"a:0;",
$1:function(a){var z=a.gaq().f
a.gaq().f=z+1
return a}},
mi:{"^":"a:0;",
$1:function(a){return a.gb1()&&a.gbm()}},
pC:{"^":"fg;bC:a<,bK:b<,c,q:d<,V:e<",
af:function(a){var z=new X.dB(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fg))return!1
if(J.t(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.t(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$T().$1("LootSituation")
y=J.z(z)
y.m(z,"droppedItems",this.a)
y.m(z,"groundMaterial",this.b)
y.m(z,"playerTeamIds",this.c)
y.m(z,"id",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dB:{"^":"d;a,b,c,d,e,f",
gbC:function(){var z,y
z=this.gaq()
y=z.b
if(y==null){y=new S.N(null,null,[U.D])
y.ac()
y.j(C.h)
z.b=y
z=y}else z=y
return z},
gbK:function(){return this.gaq().c},
gq:function(){return this.gaq().e},
gV:function(){return this.gaq().f},
gaq:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ac()
y.j(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.N(null,null,[H.j(z,0)])
y.ac()
y.j(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaq()
x=y.b
if(x==null){x=new S.N(null,null,[U.D])
x.ac()
x.j(C.h)
y.b=x
y=x}else y=x
y=y.p()
x=this.gaq().c
w=this.gaq()
v=w.d
if(v==null){v=new S.N(null,null,[P.r])
v.ac()
v.j(C.h)
w.d=v
w=v}else w=v
w=w.p()
v=this.gaq().e
u=this.gaq().f
z=new X.pC(y,x,w,v,u)
if(y==null)H.e(P.i("droppedItems"))
if(x==null)H.e(P.i("groundMaterial"))
if(w==null)H.e(P.i("playerTeamIds"))
if(v==null)H.e(P.i("id"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,A,{"^":"",mx:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"stab <object>"},
gn:function(){return"OffBalanceOpportunityThrust"},
ga8:function(){return"will <subject> hit <objectPronoun>?"},
P:[function(a,b,c){var z=this.b
a.a7(c,"<subject> tr<ies> to stab <object>",z)
a.ab(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.dx)+" fails to stab "+H.b(z.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x
z=this.b
y=z.y
b.W(y,new A.my(a))
x=b.A(y)
if(!(!(x.x>0)&&x.y!==100)){a.b2(c,"<subject> thrust<s> {|"+U.aa(a)+"} deep into <object's> {shoulder|hip|thigh}",x,!0)
N.b_(c,x)}else{a.b2(c,"<subject> {stab<s>|run<s> "+U.aa(a)+" through} <object>",x,!0)
N.bc(c,b,x)}return H.b(a.dx)+" stabs "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){if(a.cx)return 0.6
return 0.5},
G:function(a,b){return a.fr===C.d&&this.b.fr===C.f&&a.e.gaK()>0},
B:{
wU:[function(a){return new A.mx("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.e,a,null)},"$1","uH",2,0,4]}},my:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaK()
a.gk().y=z-y
return a}}}],["","",,U,{"^":"",
mt:function(a,b){var z=new U.dE(null,null,null,null,null)
new U.ti(a,b).$1(z)
return z.p()},
fm:{"^":"ad;",
gau:function(){return H.m([A.uH()],[{func:1,ret:Q.v,args:[R.w]}])},
gbv:function(){return[$.$get$dJ()]},
gn:function(){return"OffBalanceOpportunitySituation"},
an:function(){var z=new U.dE(null,null,null,null,null)
z.j(this)
new U.mu().$1(z)
return z.p()},
at:function(a,b){var z,y,x,w,v
if(a>0)return
z=b.A(this.a)
y=b.a
x=H.j(y,0)
w=P.O(new H.I(y,new U.mv(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gdY(w)
if(v.fr===C.d&&z.fr===C.f&&v.e.gaK()>0)return v
return},
aM:function(a,b){return new H.I(a,new U.mw(b,b.A(this.a)),[H.j(a,0)])}},
ti:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaS().d=z
a.gaS().e=0
z=this.a.y
a.gaS().b=z
z=this.b
z=z==null?z:z.y
a.gaS().c=z
return a}},
mu:{"^":"a:0;",
$1:function(a){var z=a.gaS().e
a.gaS().e=z+1
return a}},
mv:{"^":"a:21;a,b,c",
$1:function(a){var z,y
if(a.gam()&&a.Q)if(a.cZ(this.c,this.b)>0){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mw:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.t(a,z)||a.iB(z,this.a)}},
pD:{"^":"fm;a,b,q:c<,V:d<",
af:function(a){var z=new U.dE(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fm))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("OffBalanceOpportunitySituation")
y=J.z(z)
y.m(z,"actorId",this.a)
y.m(z,"culpritId",this.b)
y.m(z,"id",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dE:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaS().d},
gV:function(){return this.gaS().e},
gaS:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaS().b
x=this.gaS().c
w=this.gaS().d
v=this.gaS().e
z=new U.pD(y,x,w,v)
if(y==null)H.e(P.i("actorId"))
if(w==null)H.e(P.i("id"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",lf:{"^":"v;N:c<,I:d<,Y:e<,O:f<,b,a",
ga4:function(){return""},
gn:function(){return"FinishPunch"},
gJ:function(){return},
ga8:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.fr===C.d?C.f:C.b
x=b.a9("PunchSituation").gq()
w=U.bt(b)
b.W(z.y,new O.lg(y))
switch(y){case C.d:throw H.c(new P.u("Enemy's pose should never be 'standing' after a successful punch"))
case C.f:c.eX(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.as(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.b:c.eX(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.dx)+" punches "+H.b(z.dx)+" to "+y.i(0)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return!0},
B:{
wK:[function(a){return new O.lf(null,!0,!0,!1,a,null)},"$1","tU",2,0,4]}},lg:{"^":"a:0;a",
$1:function(a){a.gk().fx=this.a
return a}}}],["","",,E,{"^":"",km:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"dodge"},
gn:function(){return"DodgePunch"},
ga8:function(){return"will <subject> dodge the fist?"},
P:[function(a,b,c){var z=b.a9("PunchSituation").gq()
a.fq(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a7(new E.kn(a,c,z),new E.ko(this,a,c,z),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.bq(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.a9("PunchSituation").gq(),z,!0)
b.aE("FightSituation")
if(a.cx)c.v(0,"this opens an opportunity for a counter attack")
C.a.v(b.f,S.bZ(a,z))
return H.b(a.dx)+" dodges punch from "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gaJ().aI(0.4-z)},
G:function(a,b){return!0},
B:{
wE:[function(a){return new E.km("Dodging means moving your body out of harm's way.",!1,!1,!0,C.e,a,null)},"$1","tI",2,0,4]}},kn:{"^":"a:2;a,b,c",
$0:function(){return this.a.bG(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},ko:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.jd(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dO:function(a,b,c){var z=new Z.dN(null,null,null,null,null,null)
new Z.tb(a,b,c).$1(z)
return z.p()},
fw:{"^":"c_;",
gau:function(){return[E.tI()]},
gn:function(){return"PunchDefenseSituation"},
an:function(){var z=new Z.dN(null,null,null,null,null,null)
z.j(this)
new Z.n6().$1(z)
return z.p()}},
tb:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaA().c=z
a.gaA().f=0
z=this.a.y
a.gaA().b=z
z=this.b.y
a.gaA().e=z
a.gaA().d=this.c
return a}},
n6:{"^":"a:0;",
$1:function(a){var z=a.gaA().f
a.gaA().f=z+1
return a}},
pG:{"^":"fw;ci:a<,q:b<,bX:c<,bZ:d<,V:e<",
af:function(a){var z=new Z.dN(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fw))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$T().$1("PunchDefenseSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dN:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaA().c},
gV:function(){return this.gaA().f},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
u=this.gaA().f
z=new Z.pG(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Q,{"^":"",
fy:function(a,b){var z=new Q.dP(null,null,null,null,null)
new Q.tc(a,b).$1(z)
return z.p()},
fx:{"^":"ad;",
gau:function(){return[O.tU()]},
gn:function(){return"PunchSituation"},
an:function(){var z=new Q.dP(null,null,null,null,null)
z.j(this)
new Q.n7().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.A(this.a)
return},
aM:function(a,b){return new H.I(a,new Q.n8(this),[H.j(a,0)])}},
tc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaT().c=z
a.gaT().e=0
z=this.a.y
a.gaT().b=z
z=this.b.y
a.gaT().d=z
return a}},
n7:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
a.gaT().e=z+1
return a}},
n8:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pH:{"^":"fx;a,q:b<,c,V:d<",
af:function(a){var z=new Q.dP(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fx))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("PunchSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dP:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaT().c},
gV:function(){return this.gaT().e},
gaT:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaT().b
x=this.gaT().c
w=this.gaT().d
v=this.gaT().e
z=new Q.pH(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",lh:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return""},
gn:function(){return"FinishSlash"},
ga8:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.W(y,new O.lk(a))
x=b.A(y)
y=b.a9("SlashSituation").gq()
w=!(x.x>0)&&x.y!==100
if(!w){a.bq(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,x,!0)
N.b_(c,x)}else{a.bq(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,x,!0)
y=a.e
if(y.gn()===$.$get$cp().b&&J.bX(z.dx,"orc"))y.ap(c,"<subject> slit<s> through the flesh like it isn't there.",!0)
N.bc(c,b,x)}y=H.b(a.dx)+" slashes"
return y+(w?" (and kills)":"")+" "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.e.gag()>0},
B:{
wM:[function(a){return new O.lh(null,!0,!0,!0,C.e,a,null)},"$1","tV",2,0,4]}},lk:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gag()
a.gk().y=z-y
return a}}}],["","",,V,{"^":"",ll:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return""},
gn:function(){return"FinishThrustSpear"},
ga8:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.W(y,new V.lo(a))
x=b.A(y)
y=b.a9("SlashSituation").gq()
w=!(x.x>0)&&x.y!==100
if(!w){a.bq(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",y,x,!0)
N.b_(c,x)}else{a.bq(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",y,x,!0)
N.bc(c,b,x)}y=H.b(a.dx)+" pierces"
return y+(w?" (and kills)":"")+" "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return a.e instanceof Z.am},
B:{
wO:[function(a){return new V.ll(null,!0,!0,!0,C.e,a,null)},"$1","tX",2,0,4]}},lo:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaK()
a.gk().y=z-y
return a}}}],["","",,X,{"^":"",k7:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"step back and parry"},
gn:function(){return"DefensiveParrySlash"},
ga8:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+U.aa(a)+"|fend it off}")
if(a.fr===C.f)a.ab(c,"<subject> <is> out of balance",!0)
else S.a7(new X.k8(a,c),new X.k9(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z=a.cx
if(z)a.a2(c,"<subject> {step<s>|take<s> a step} back")
a.aZ(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+U.aa(a)+"|fend<s> it off}",!0)
if(a.fr!==C.d){b.W(a.y,new X.ka())
if(z)a.a2(c,"<subject> regain<s> balance")}b.aE("FightSituation")
return H.b(a.dx)+" steps back and parries "+H.b(this.b.dx)},"$3","gM",6,0,1],
H:function(a,b){var z,y
if(a.cx)return 0.98
z=b.f
z=z.length!==0?C.a.gE(z):null
y=a.fr===C.d?0:0.2
return z.gaJ().aI(0.5-y)},
G:function(a,b){return a.e.gbT()},
B:{
wB:[function(a){return new X.k7("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.e,a,null)},"$1","tD",2,0,4]}},k8:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},k9:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ka:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}}}],["","",,F,{"^":"",kp:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
gn:function(){return"DodgeSlash"},
ga4:function(){return"dodge and counter"},
ga8:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.fr===C.f)a.ab(c,"<subject> <is> out of balance",!0)
else S.a7(new F.kq(a,c),new F.kr(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.b2(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.fr===C.d){z.bF(c,"<subject> lose<s> balance because of that",!0,!0)
b.W(z.y,new F.ks())}b.aE("FightSituation")
if(a.cx)c.v(0,"this opens an opportunity for a counter attack")
C.a.v(b.f,S.bZ(a,z))
return H.b(a.dx)+" dodges "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gaJ().aI(0.4-z)},
G:function(a,b){return a.fr!==C.b&&this.b.e.gag()>0},
B:{
wF:[function(a){return new F.kp("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.e,a,null)},"$1","tJ",2,0,4]}},kq:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kr:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ks:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return C.f}}}],["","",,M,{"^":"",kt:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"dodge and counter"},
gn:function(){return"DodgeThrustSpear"},
ga8:function(){return"will <subject> dodge?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.fr===C.f)a.ab(c,"<subject> <is> out of balance",!0)
else S.a7(new M.ku(a,c),new M.kv(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)+"'s spear"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
a.b2(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.fr===C.d){z.bF(c,"<subject> lose<s> balance because of that",!0,!0)
b.W(z.y,new M.kw())}b.aE("FightSituation")
if(a.cx)c.v(0,"this opens an opportunity for a counter attack")
C.a.v(b.f,S.bZ(a,z))
return H.b(a.dx)+" dodges "+H.b(z.dx)+"'s spear"},"$3","gM",6,0,1],
H:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gE(y):null).gaJ().aI(0.4-z)},
G:function(a,b){return a.fr!==C.b&&this.b.e instanceof Z.am},
B:{
wG:[function(a){return new M.kt("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.e,a,null)},"$1","tK",2,0,4]}},ku:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kv:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kw:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return C.f}}}],["","",,O,{"^":"",lZ:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"jump back"},
gn:function(){return"JumpBackFromSlash"},
ga8:function(){return"will <subject> avoid the slash?"},
P:[function(a,b,c){a.ap(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.ao()
return H.b(a.dx)+" fails to jump back from "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z
a.aZ(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.bw(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.e)
b.aE("FightSituation")
return H.b(a.dx)+" jumps back from "+H.b(z.dx)+"'s attack"},"$3","gM",6,0,1],
H:function(a,b){var z,y
if(a.cx)return 0.98
z=b.f
z=z.length!==0?C.a.gE(z):null
y=a.fr===C.d?0:0.2
return z.gaJ().aI(0.5-y)},
G:function(a,b){return a.e instanceof K.V&&this.b.e.gag()>0},
B:{
wS:[function(a){return new O.lZ("Jump back and the weapon can't reach you.",!1,!1,!0,C.e,a,null)},"$1","uB",2,0,4]}}}],["","",,G,{"^":"",mK:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
gn:function(){return"ParrySlash"},
ga4:function(){return"parry and counter"},
ga8:function(){return"will <subject> parry?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+U.aa(a)+"|fend it off}")
if(a.fr===C.f)a.ab(c,"<subject> <is> out of balance",!0)
else S.a7(new G.mL(a,c),new G.mM(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.fr===C.f){c.dN(0,"<subject> <is> out of balance",!0,!0,z)
c.bw(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$it())
a.aZ(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+U.aa(a)+"|fend<s> it off easily}",!0)}else a.aZ(c,"<subject> {parr<ies> it|meet<s> it with "+U.aa(a)+"|fend<s> it off}",!0)
b.aE("FightSituation")
if(a.cx)c.v(0,"this opens an opportunity for a counter attack")
C.a.v(b.f,S.bZ(a,z))
return H.b(a.dx)+" parries "+H.b(z.dx)},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.f?0.3:0
if(a.cx)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.3-z+y)},
G:function(a,b){return a.e.gbT()},
B:{
wX:[function(a){return new G.mK("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.e,a,null)},"$1","uK",2,0,4]}},mL:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mM:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",o_:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"block with shield and counter"},
gn:function(){return"ShieldBlockSlash"},
ga8:function(){return"will <subject> block the slash?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a))
if(a.fr===C.f)a.ab(c,"<subject> <is> out of balance",!0)
else S.a7(new E.o0(a,c),new E.o1(a,c),new E.o2(this,a,c),null)
b.ao()
return H.b(a.dx)+" fails to block "+H.b(this.b.dx)+" with shield"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.fr===C.f){c.dN(0,"<subject> <is> out of balance",!0,!0,z)
c.bw(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$is())
a.aZ(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)}else a.aZ(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)
b.aE("FightSituation")
if(a.cx)c.v(0,"this opens an opportunity for a counter attack")
C.a.v(b.f,S.bZ(a,z))
return H.b(a.dx)+" blocks "+H.b(z.dx)+" with a shield"},"$3","gM",6,0,1],
H:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.f?0.2:0
if(a.cx)return 0.78-z+y
x=b.f
return(x.length!==0?C.a.gE(x):null).gaJ().aI(0.5-z+y)},
G:function(a,b){return a.d!=null},
B:{
x2:[function(a){return new E.o_("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.e,a,null)},"$1","uZ",2,0,4]}},o0:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},o1:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> <is> too slow",!0)}},o2:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aL:function(a,b,c){var z=new L.dU(null,null,null,null,null,null)
new L.t8(a,b,c).$1(z)
return z.p()},
fK:{"^":"c_;",
gau:function(){return[X.tD(),F.tJ(),M.tK(),O.uB(),G.uK(),E.uZ()]},
gn:function(){return"SlashDefenseSituation"},
an:function(){var z=new L.dU(null,null,null,null,null,null)
z.j(this)
new L.o6().$1(z)
return z.p()}},
t8:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaB().c=z
a.gaB().f=0
z=this.a.y
a.gaB().b=z
z=this.b.y
a.gaB().e=z
a.gaB().d=this.c
return a}},
o6:{"^":"a:0;",
$1:function(a){var z=a.gaB().f
a.gaB().f=z+1
return a}},
pJ:{"^":"fK;ci:a<,q:b<,bX:c<,bZ:d<,V:e<",
af:function(a){var z=new L.dU(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fK))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$T().$1("SlashDefenseSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dU:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaB().c},
gV:function(){return this.gaB().f},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
u=this.gaB().f
z=new L.pJ(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,M,{"^":"",
b8:function(a,b){var z=new M.dV(null,null,null,null,null)
new M.ta(a,b).$1(z)
return z.p()},
fL:{"^":"ad;",
gau:function(){return[O.tV(),V.tX()]},
gn:function(){return"SlashSituation"},
an:function(){var z=new M.dV(null,null,null,null,null)
z.j(this)
new M.o7().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.A(this.a)
return},
aM:function(a,b){return new H.I(a,new M.o8(this),[H.j(a,0)])}},
ta:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.y
a.gaU().b=z
z=this.b.y
a.gaU().d=z
return a}},
o7:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
a.gaU().e=z+1
return a}},
o8:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pK:{"^":"fL;a,q:b<,c,V:d<",
af:function(a){var z=new M.dV(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fL))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("SlashSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"target",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dV:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaU().c},
gV:function(){return this.gaU().e},
gaU:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaU().b
x=this.gaU().c
w=this.gaU().d
v=this.gaU().e
z=new M.pK(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("target"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,Q,{"^":"",li:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
gn:function(){return"FinishSlashGroundedEnemy"},
ga4:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.W(y,new Q.lj())
x=b.A(y)
w=x.y===100
c.dM(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(w?"side":"{throat|neck|side}"),x,a.e)
if(w)N.b_(c,x)
else N.bc(c,b,x)
return H.b(a.dx)+" slains "+H.b(z.dx)+" on the ground"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.fr===C.b&&a.e.gag()>0},
B:{
wL:[function(a){return new Q.li(null,!0,!0,!0,C.e,a,null)},"$1","tW",2,0,4]}},lj:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,V,{"^":"",lm:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return""},
gn:function(){return"FinishThrustSpearAtGroundedEnemy"},
ga8:function(){return"(WARNING should not be user-visible)"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.W(y,new V.ln())
x=b.A(y)
w=x.y===100
c.dM(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(w?"side":"{throat|neck|heart}"),x,a.e)
if(w)N.b_(c,x)
else N.bc(c,b,x)
return H.b(a.dx)+" slains "+H.b(z.dx)+" on the ground with a spear"},"$3","gM",6,0,1],
H:function(a,b){return 1},
G:function(a,b){return this.b.fr===C.b&&a.e instanceof Z.am},
B:{
wN:[function(a){return new V.lm(null,!0,!0,!0,C.e,a,null)},"$1","tY",2,0,4]}},ln:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,K,{"^":"",mA:{"^":"v;I:c<,Y:d<,O:e<,J:f<,N:r<,b,a",
gn:function(){return"OnGroundParry"},
ga4:function(){return"parry it"},
ga8:function(){return"will <subject> parry it?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+U.aa(a)+"}}")
S.a7(new K.mB(a,c),new K.mC(this,a,c),null,null)
b.ao()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gL",6,0,1],
R:[function(a,b,c){a.aZ(c,"<subject> {parr<ies> it|stop<s> it with "+U.aa(a)+"}",!0)
b.aE("FightSituation")
return H.b(a.dx)+" parries "+H.b(this.b.dx)},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.6
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.3)},
G:function(a,b){return this.b.e.gag()>0&&a.e.gbT()},
B:{
wV:[function(a){return new K.mA(!1,!1,!0,C.e,"TODO",a,null)},"$1","uI",2,0,4]}},mB:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mC:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mD:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
ga4:function(){return"block with shield"},
gn:function(){return"OnGroundShieldBlock"},
ga8:function(){return"will <subject> block the strike?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a))
S.a7(new L.mE(a,c),new L.mF(a,c),new L.mG(this,a,c),null)
b.ao()
return H.b(a.dx)+" fails to block "+H.b(this.b.dx)+" with shield on ground"},"$3","gL",6,0,1],
R:[function(a,b,c){var z=this.b
if(z.fr===C.f){c.dN(0,"<subject> <is> out of balance",!0,!0,z)
c.bw(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ir())
a.aZ(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)}else a.aZ(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+U.bW(a),!0)
b.aE("FightSituation")
return H.b(a.dx)+" blocks "+H.b(z.dx)+" with a shield on ground"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.8
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.5)},
G:function(a,b){return a.d!=null},
B:{
wW:[function(a){return new L.mD("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.e,a,null)},"$1","uJ",2,0,4]}},mE:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mF:{"^":"a:2;a,b",
$0:function(){return this.a.ab(this.b,"<subject> <is> too slow",!0)}},mG:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bp(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nk:{"^":"v;N:c<,I:d<,Y:e<,O:f<,J:r<,b,a",
gn:function(){return"RollOutOfWay"},
ga4:function(){return"roll out of way"},
ga8:function(){return"will <subject> evade?"},
P:[function(a,b,c){a.a2(c,"<subject> tr<ies> to roll out of the way")
a.ab(c,"<subject> can't",!0)
b.ao()
return H.b(a.dx)+" fails to roll out of the way"},"$3","gL",6,0,1],
R:[function(a,b,c){a.e8(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.cx){b.W(a.y,new Y.nl())
a.aZ(c,"<subject> jump<s> up on <subject's> feet",!0)}b.aE("FightSituation")
return H.b(a.dx)+" rolls out of the way of "+H.b(this.b.dx)+"'s strike"},"$3","gM",6,0,1],
H:function(a,b){var z
if(a.cx)return 0.98
z=b.f
return(z.length!==0?C.a.gE(z):null).gaJ().aI(0.5)},
G:function(a,b){return!0},
B:{
x1:[function(a){return new Y.nk(null,!1,!1,!0,C.e,a,null)},"$1","uS",2,0,4]}},nl:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}}}],["","",,V,{"^":"",
bD:function(a,b,c){var z=new V.dF(null,null,null,null,null,null)
new V.t5(a,b,c).$1(z)
return z.p()},
fn:{"^":"c_;",
gau:function(){return[K.uI(),L.uJ(),Y.uS()]},
gn:function(){return"OnGroundDefenseSituation"},
an:function(){var z=new V.dF(null,null,null,null,null,null)
z.j(this)
new V.mz().$1(z)
return z.p()}},
t5:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaz().c=z
a.gaz().f=0
z=this.a.y
a.gaz().b=z
z=this.b.y
a.gaz().e=z
a.gaz().d=this.c
return a}},
mz:{"^":"a:0;",
$1:function(a){var z=a.gaz().f
a.gaz().f=z+1
return a}},
pE:{"^":"fn;ci:a<,q:b<,bX:c<,bZ:d<,V:e<",
af:function(a){var z=new V.dF(null,null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fn))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)),J.f(this.e)))},
i:function(a){var z,y
z=$.$get$T().$1("OnGroundDefenseSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"predeterminedResult",this.c)
y.m(z,"target",this.d)
y.m(z,"time",this.e)
return y.i(z)}},
dF:{"^":"d;a,b,c,d,e,f",
gq:function(){return this.gaz().c},
gV:function(){return this.gaz().f},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
u=this.gaz().f
z=new V.pE(y,x,w,v,u)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("predeterminedResult"))
if(v==null)H.e(P.i("target"))
if(u==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,D,{"^":"",
cW:function(a,b){var z=new D.dW(null,null,null,null,null)
new D.t7(a,b).$1(z)
return z.p()},
fW:{"^":"ad;",
gau:function(){return[Q.tW(),V.tY()]},
gn:function(){return"StrikeDownSituation"},
an:function(){var z=new D.dW(null,null,null,null,null)
z.j(this)
new D.oK().$1(z)
return z.p()},
at:function(a,b){if(a===0)return b.A(this.a)
return},
aM:function(a,b){return new H.I(a,new D.oL(this),[H.j(a,0)])}},
t7:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaV().c=z
a.gaV().e=0
z=this.a.y
a.gaV().b=z
z=this.b.y
a.gaV().d=z
return a}},
oK:{"^":"a:0;",
$1:function(a){var z=a.gaV().e
a.gaV().e=z+1
return a}},
oL:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gq()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gq()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pL:{"^":"fW;a,q:b<,c,V:d<",
af:function(a){var z=new D.dW(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fW))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("StrikeDownSituation")
y=J.z(z)
y.m(z,"attacker",this.a)
y.m(z,"id",this.b)
y.m(z,"targetOnGround",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
dW:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaV().c},
gV:function(){return this.gaV().e},
gaV:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaV().b
x=this.gaV().c
w=this.gaV().d
v=this.gaV().e
z=new D.pL(y,x,w,v)
if(y==null)H.e(P.i("attacker"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("targetOnGround"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",n3:{"^":"d;",
gaJ:function(){switch(this.gbX()){case C.n:return C.a3
case C.o:return $.$get$fr()
case C.t:return $.$get$fs()
default:throw H.c(P.F(this.gbX()))}},
$isad:1}}],["","",,K,{"^":"",dM:{"^":"d;a,b",
i:function(a){return this.b}}}],["","",,D,{"^":"",oc:{"^":"ag;I:b<,O:c<,Y:d<,J:e<,a",
gX:function(){return""},
gN:function(){return},
gn:function(){return"SlayMonstersAction"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.di(y.a)
w=b.a
C.a.v(z,x.e.$3(b,y,new H.I(w,new D.od(a,x),[H.j(w,0)])))
return H.b(a.dx)+" initiated combat with monsters in "+J.J(x)},"$3","gM",6,0,1],
a5:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
return H.A(z.length!==0?C.a.gE(z):null,"$isG").c}},od:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gbm()){z=a.gbr()
y=this.a.go
z=z.a
y=y.a
z=(z==null?y==null:z===y)&&a.gig()===this.b.b}else z=!1
return z}}}],["","",,Y,{"^":"",oV:{"^":"c1;I:c<,Y:d<,O:e<,J:f<,b,a",
gN:function(){return},
gn:function(){return"TakeExitAction"},
P:[function(a,b,c){throw H.c(new P.Z(null))},"$3","gL",6,0,1],
R:[function(a,b,c){var z,y
z=this.b
y=z.c
if(C.c.de(y)!=="N/A")c.l(0,y,!0)
y=b.f
y=H.A(y.length!==0?C.a.gE(y):null,"$isG")
z=z.a
y.iU(b,a,z,c)
return H.b(a.dx)+" went through exit to "+z},"$3","gM",6,0,1],
a5:function(a,b){return"WARNING should not be user-visible"},
H:function(a,b){return 1},
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").c)return!1
this.b.d
return!0},
B:{
x6:[function(a){return new Y.oV(!1,!0,!1,null,a,null)},"$1","wp",2,0,50]}}}],["","",,F,{"^":"",
fC:function(a,b){var z=new F.cQ(null,null,null,null,null)
new F.rY(a,b).$1(z)
return z.p()},
G:{"^":"ad;",
gau:function(){return[Y.wp()]},
gbv:function(){var z=[]
C.a.av(z,$.$get$hJ())
z.push($.$get$fO())
return z},
gd3:function(){return 1000},
gn:function(){return"RoomRoamingSituation"},
an:function(){var z=new F.cQ(null,null,null,null,null)
z.j(this)
new F.nm().$1(z)
return z.p()},
at:function(a,b){return b.a.aX(0,new F.nn(),new F.no())},
aM:function(a,b){var z=this.at(null,b)
if(z==null)return[]
return[z]},
bU:function(a,b,c){return a.fN("TakeExitAction",b,!0).b6(0,new F.np(c))},
bD:function(a,b,c,d,e){var z,y,x,w,v,u,t,s
z=a.di(c)
a.bE(this.b,F.fC(z,!this.bU(a,b,c)&&z.e!=null))
if(!e)if(this.bU(a,b,z.b))z.d.$3(b,a,d)
else{d.l(0,"\n\n",!0)
z.c.$3(b,a,d)
d.l(0,"\n\n",!0)}for(y=R.i4(b,a),y=P.O(y,!0,H.y(y,"x",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.aw)(y),++v){u=a.A(y[v].gq())
u.toString
t=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(u==null)H.e(P.i("other"))
t.a=u
new F.nq(z).$1(t)
s=t.p()
w.a_(0,u)
w.v(0,s)}},
iU:function(a,b,c,d){return this.bD(a,b,c,d,!1)},
fg:function(a,b){a.a.hv(new F.nr(),!0)},
cF:function(a){if(this.a===$.$get$ek().b)return!1
return!0}},
rY:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gaG().c=z
a.gaG().e=0
z=this.a.b
a.gaG().b=z
a.gaG().d=this.b
return a}},
nm:{"^":"a:0;",
$1:function(a){var z=a.gaG().e
a.gaG().e=z+1
return a}},
nn:{"^":"a:0;",
$1:function(a){return a.gb1()&&a.gbm()}},
no:{"^":"a:2;",
$0:function(){return}},
np:{"^":"a:0;a",
$1:function(a){return a.gdU()===this.a}},
nq:{"^":"a:0;a",
$1:function(a){var z=this.a.b
a.gk().d=z
return a}},
nr:{"^":"a:0;",
$1:function(a){return!a.gam()}},
pI:{"^":"G;a,q:b<,c,V:d<",
af:function(a){var z=new F.cQ(null,null,null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.G))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)),J.f(this.c)),J.f(this.d)))},
i:function(a){var z,y
z=$.$get$T().$1("RoomRoamingSituation")
y=J.z(z)
y.m(z,"currentRoomName",this.a)
y.m(z,"id",this.b)
y.m(z,"monstersAlive",this.c)
y.m(z,"time",this.d)
return y.i(z)}},
cQ:{"^":"d;a,b,c,d,e",
gq:function(){return this.gaG().c},
gV:function(){return this.gaG().e},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
z=new F.pI(y,x,w,v)
if(y==null)H.e(P.i("currentRoomName"))
if(x==null)H.e(P.i("id"))
if(w==null)H.e(P.i("monstersAlive"))
if(v==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",
tE:function(a,b){var z,y,x,w,v,u,t,s,r,q
b.l(0,"<p class='meta'>",!0)
b.l(0,"Thanks for playing _Insignificant Little Vermin._",!0)
z=a.bk("take_orcthorn")
y=a.bk("smelter_throw_spear")
x=a.A(1)
x.a2(b,"<subject> "+(z?"took":"didn't find")+" Orcthorn")
x.ab(b,"<subject> "+(y?"destroyed":"didn't destroy")+" the iron monster",z!==y)
w=new O.tF(x)
v=w.$2(C.z,"sword")
u=w.$2(C.v,"spear")
t=w.$2(C.y,"shield")
x.ap(b,"<subject> <is> leaving Mount Bloodrock with "+H.b(v)+", "+H.b(u)+" and "+H.b(t)+".",!0)
s=x.x>=2?"in good health":"seriously injured"
r=x.fy>0?"with energy to spare":"exhausted"
x.ap(b,"<subject> <is> "+s+" and "+r+".",!0)
q=a.A(100)
q.a2(b,"<subject> <is> "+(q.x>=2?"uninjured":"wounded"))
b.l(0,"The important thing, though, is that you survived. <strong>Congratulations!</strong>",!0)
b.l(0,"</p>",!0)},
tL:function(a,b){var z,y,x
z=a.bk("take_orcthorn")
y=a.bk("smelter_throw_spear")
x=a.bk("guardpost_above_church_enter_tunnel_with_cancel")
if(z||y||x){a.a9("RoomRoamingSituation").bD(a,a.A(1),"tunnel",b,!1)
return}a.a9("RoomRoamingSituation").bD(a,a.A(1),"tunnel_cancel_chance",b,!1)},
tN:function(a,b){var z=a.A(1).cy.a.aX(0,new O.tO(),null)
a.W(a.A(1).y,new O.tP(z))
a.a9("RoomRoamingSituation").bD(a,a.A(1),"war_forge",b,!0)},
xl:[function(a,b,c){var z,y
z=R.b1(6666,"Agruth",null,null,null,null,null,0,2,100,!1,!1,2,!0,C.w,0,$.$get$bs())
y=z.y
a.a.v(0,z)
return U.c2(c,[z],"{rock|cavern} floor",b,P.a1([1,new O.u_(y),5,new O.u0(y),9,new O.u1(y),12,new O.u2(y),17,new O.u3(y)]))},"$3","wu",6,0,10],
xm:[function(a,b,c){var z,y,x,w,v
z=O.hB(2)
y=O.ee(!1)
x=new O.ue(z.y)
w=new O.ud(y.y)
v=[z,y]
a.a.av(0,v)
return U.c2(c,v,"{rock|cavern} floor",b,P.a1([1,new O.u7(x,w,new O.u6()),4,new O.u8(x,w),6,new O.u9(),9,new O.ua(),12,new O.ub(),16,new O.uc()]))},"$3","wv",6,0,10],
xn:[function(a,b,c){var z,y,x
z=a.aj("talk_to_briana_3")?"guardian":"orc"
y=R.b1(6667,z,null,null,null,new G.aB("rusty sword",1,1,!1,!0,!1,P.az(C.r,null)),null,0,3,100,!1,!1,3,!1,C.w,0,$.$get$bs())
x=y.y
a.a.v(0,y)
return U.c2(c,[y],"{rock|cavern} floor",b,P.a1([1,new O.uf(x),3,new O.ug(x),5,new O.uh(x)]))},"$3","ww",6,0,10],
xo:[function(a,b,c){var z,y,x,w,v
z=O.hB(2)
y=O.ee(!0)
x=new O.um(z.y)
w=new O.ul(y.y)
v=[z,y]
a.a.av(0,v)
return U.c2(c,v,"{rough|stone} floor",b,P.a1([1,new O.uj(x,w,new O.ui()),3,new O.uk(x,w)]))},"$3","wx",6,0,10],
uq:function(a){return a.W(a.A(1).y,new O.ur())},
i6:function(a,b){a.W(a.A(1).y,new O.us(b))},
ep:function(a){var z=a.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").c)return!1
return C.a.ae(C.Z,H.A(z.length!==0?C.a.gE(z):null,"$isG").a)},
aZ:function(a,b){var z,y,x,w,v
z=a.A(1)
for(y=a.d,y=new P.e7(y,y.c,y.d,y.b,null,[H.j(y,0)]);y.w();){x=y.e
w=x.gcu()
v=z.y
if(w==null?v!=null:w!==v)continue
if(x.gdK()!=="TakeExitAction")continue
if(x.gdU()===b)return!0
return!1}return!1},
ic:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.a,y=z.ga1(z),x=new H.bN(y,new O.uE(),[H.j(z,0)]);x.w();){w=y.gT()
if(!w.gf9()){v=H.A(w.e,"$isaB")
y=b
x=v.c
u=v.d
v.r
t=P.O(C.r,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.A(w.y)
s.toString
r=new R.ao(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(s==null)H.e(P.i("other"))
r.a=s
new O.uF(new G.aB(y,x,u,!0,!0,!1,t)).$1(r)
q=r.p()
z.a_(0,s)
z.v(0,q)
break}}},
cq:function(a,b){var z,y,x
z=H.A(a.c,"$iscD").b
if(z>=5)return
b.l(0,C.a1[z],!0)
y=H.A(a.c,"$iscD")
y.toString
x=new M.dZ(null,!1,0,0)
x.j(y)
a.c=new O.uR().$1(x).p()},
er:function(a,b,c,d){var z,y
b.W(a.y,new O.uW())
if(!d){z=b.a
y=O.ee(!1)
z.v(0,y)
C.a.v(b.f,U.c2(new H.I(z,new O.uX(),[H.j(z,0)]),[y],"{smooth|} rock",b.a9("RoomRoamingSituation"),P.a1([1,new O.uY(y.y)])))}},
wl:function(a,b){a.W(b.y,new O.wm(b))},
ee:function(a){var z,y
z=$.$get$eh().a++
y=a?new Z.am("spear",0,1,!1,!1,!1,P.az(C.G,null)):new G.aB("scimitar",1,1,!1,!0,!1,P.az(C.r,null))
return R.b1(z,"goblin",O.d8(),null,null,y,null,0,1,0,!1,!1,1,!1,C.w,0,$.$get$bs())},
hB:function(a){return R.b1($.$get$eh().a++,"orc",O.d8(),null,null,new G.aB("sword",1,1,!1,!0,!1,P.az(C.r,null)),null,0,a,0,!1,!1,a,!1,C.w,0,$.$get$bs())},
tF:{"^":"a:47;a",
$2:function(a,b){var z,y
z=this.a.dT(a)
if(z>1)y=b+"s"
else y=z===1?"a "+b:"no "+b
return y}},
tO:{"^":"a:0;",
$1:function(a){return C.a.ae(a.gfC(),C.v)}},
tP:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.W(null,null,[U.D])
y.ai()
y.j(C.h)
z.db=y
z=y}else z=y
z.gb_().a_(0,this.a)
return a}},
u_:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.A(z)
x=new G.aB("sword",1,1,!1,!0,!1,P.az(C.r,null))
y.a2(b,"<subject> {drop<s>|let<s> go of} the whip")
y.a7(b,"<subject> draw<s> <subject's> <object>",x)
a.W(z,new O.tZ(x))
y.d7(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',a.A(1),!0)}},
tZ:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},
u0:{"^":"a:6;a",
$2:function(a,b){a.A(this.a).a2(b,"<subject> spit<s> on the cavern floor")}},
u1:{"^":"a:6;a",
$2:function(a,b){var z=a.A(this.a)
b.dO()
z.ap(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.l(0,"\n\n",!0)}},
u2:{"^":"a:6;a",
$2:function(a,b){var z=a.A(this.a)
z.a2(b,"<subject> grit<s> <subject's> teeth")
z.ab(b,"<subject> do<es>n't talk any more",!0)}},
u3:{"^":"a:6;a",
$2:function(a,b){a.A(this.a).a2(b,"<subject> scowl<s> with pure hatred")}},
ue:{"^":"a:11;a",
$1:function(a){return a.A(this.a)}},
ud:{"^":"a:11;a",
$1:function(a){return a.A(this.a)}},
u6:{"^":"a:28;",
$2:function(a,b){return a.gam()&&a.Q&&b.gam()&&b.Q}},
u7:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y,x,w,v,u
z=this.a.$1(a)
y=this.b.$1(a)
x=a.A(1)
if(this.c.$2(z,y)){w=z.gfa()?y:z
v=J.t(w,z)?y:z
w.ap(b,'"Look, Sgarr," <subject> say<s>. "Look at them. Give a puny slave some steel and suddenly they think they\'re mighty slayers."',!0)
v.a2(b,"<subject> laugh<s>")
u=x.e
if(u.gn()===$.$get$cp().b){v.ab(b,"<subject> stop<s> almost instantly",!0)
v.d7(b,"<subject> see<s> <object> in your hand.",u,!0)}}else{w=z.gam()&&z.gbV()?z:y
w.ap(b,'"Look at you," <subject> laugh<s>. "Give a puny slave some steel and suddenly you think you\'re mighty slayers."',!0)
u=x.e
if(u.gn()===$.$get$cp().b)w.jb(b,"But then <subject> see<s> <object> in your hand and his face hardens.",!0,u,!0)}}},
u8:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gam()&&z.gbV()?z:y
w=a.A(1)
if(!(x.gf3() instanceof K.V))v=w.e instanceof K.V&&w.d==null
else v=!0
u=v?"kicking":"slashing"
t=v?["Whoosh!","Swah!","Slam!"]:["Swish!","Whoosh!","Thunk!"]
x.aZ(b,"<subject> start<s> wildly "+u+" in your direction",!0)
s=J.z(b)
s.l(b,'"Insignificant..." '+t[0]+' "... little ..." '+t[1]+' "... vermin!" '+t[2],!0)
if(v)r="knee"
else r=w.d!=null?"shield":w.e.gn()
q="That last blow hits your "+r+" hard"
s.l(b,q+(w.fr===C.b?"":" and sends you a couple of steps back")+".",!0)
q=H.m([],[P.l])
p=$.$get$aG()
s.bw(b,"<owner's> <subject> glint<s> with intensity",x,new Y.ay(!1,"eyes",q,p,!1,C.H))}},
u9:{"^":"a:6;",
$2:function(a,b){J.bw(b,"From behind, you hear loud cries. Your pursuers must have reached the top of the stairs.",!0)}},
ua:{"^":"a:6;",
$2:function(a,b){J.bw(b,"Ear-splitting shouts come from behind. You wheel around and see a body of orcs and goblins approaching at top speed, their swords and spears at the ready.",!0)}},
ub:{"^":"a:6;",
$2:function(a,b){J.bw(b,"The orcs are goblins are halfway here.",!0)}},
uc:{"^":"a:6;",
$2:function(a,b){J.bw(b,"Your pursuers reach you from behind and a sword pierces your chest with formidable power.",!0)
a.W(a.A(1).y,new O.u5())
a.aE("RoomRoamingSituation")
a.ao()}},
u5:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}},
uf:{"^":"a:6;a",
$2:function(a,b){a.A(this.a).d7(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',a.A(1),!0)}},
ug:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.A(this.a)
y=a.A(100)
b.dO()
z.ap(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.l(0,"\n\n",!0)
if(y.gam()&&y.Q){y.a2(b,"<subject> glare<s> at him")
y.ap(b,'"Shut up and die."',!0)
b.l(0,"\n\n",!0)}}},
uh:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.A(this.a)
y=a.A(1)
b.dO()
z.ap(b,'"You\'ll make a nice addition to my collection," <subject> say<s>, laughing.',!0)
z.a2(b,"<subject> nod<s> towards a heap of rotting bodies nearby")
b.l(0,"\n\n",!0)
y.ap(b,"<subject> glance<s> over at Briana, then back at the orc.",!0)
y.ap(b,'_"You had better shut up, and die."_',!0)
b.l(0,"\n\n",!0)}},
um:{"^":"a:11;a",
$1:function(a){return a.A(this.a)}},
ul:{"^":"a:11;a",
$1:function(a){return a.A(this.a)}},
ui:{"^":"a:28;",
$2:function(a,b){return a.gam()&&a.Q&&b.gam()&&b.Q}},
uj:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!(y.gco()>0)){z.a7(b,"<subject> look<s> at <object's> body",y)
z.ap(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)){z.a7(b,"<subject> look<s> at <object>",y)
z.d7(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
uk:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gam()&&z.gbV()?z:y
x.ap(b,'"You don\'t understand," <subject> growl<s>. "No matter how many of us you kill, there will be more. And when we get you, we will eat your face alive."',!0)
x.a2(b,"<subject> smirk<s>")
x.ap(b,'"You mean nothing."',!0)}},
ur:{"^":"a:0;",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.W(null,null,[U.D])
y.ai()
y.j(C.h)
z.db=y
z=y}else z=y
y=$.$get$eb()
if(y==null)H.e(P.F("null element"))
z.gb_().v(0,y)
return a}},
us:{"^":"a:0;a",
$1:function(a){var z=a.gk().go
a.gk().go=z+this.a
return a}},
uE:{"^":"a:0;",
$1:function(a){return J.t(a.gbr(),$.$get$da())}},
uF:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},
uR:{"^":"a:0;",
$1:function(a){var z
a.gc3()
z=a.c
a.gc3()
a.c=z+1
return a}},
uW:{"^":"a:0;",
$1:function(a){var z=P.az(C.a0,null)
a.gk().e=new E.bi("shield",z)
return a}},
uX:{"^":"a:0;",
$1:function(a){return J.t(a.gbr(),$.$get$da())}},
uY:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.A(this.a)
y=a.A(1)
if(a.bk("take_spear_in_underground_church")){z.e9(b,"<subject> look<s> at <object-owner's> <object>",$.$get$eb(),y)
z.ap(b,'"Thief," <subject> hiss<es>.',!0)}}},
wm:{"^":"a:0;a",
$1:function(a){var z,y,x
z=this.a.e
if(!(z instanceof K.V)){y=a.gk()
x=y.db
if(x==null){x=new L.W(null,null,[U.D])
x.ai()
x.j(C.h)
y.db=x
y=x}else y=x
if(z==null)H.e(P.F("null element"))
y.gb_().v(0,z)}z=$.$get$cp()
a.gk().f=z}}}],["","",,V,{"^":"",
lr:function(){var z=new V.dn(null,null,null)
new V.tj().$1(z)
return z.p()},
rV:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rX:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rT:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond, at the very base of Mount Bloodrock. That leaves two options: the black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both these paths lead upwards and in the general direction of a small exit near the mountaintop \u2014 the Upper Door.\n",!0)}},
rU:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.cq(b,c)
c.l(0,"",!0)}},
nX:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="cave_with_agruth")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)\n",!0)
O.i6(b,1)
return H.b(a.dx)+" successfully performs SearchAgruth"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gI:function(){return!1}},
rR:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'Only a few bends ahead, the tunnel gets blindingly bright and the empty smell of mountain air fills your nose. After three years, you hear the howling wind. You run through a small stone portal and out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nBut merely two breaths later, you are again in motion, jumping down a sharply descending path. Outside, it\'s you and Briana who have the upper hand \u2014 the orcs and goblins groan and stumble. This is still their territory, but the bright sun and the lack of cave walls rubs against all their instincts. These are cave breeds.\n\n\nSoon, they stop following altogether, presumably leaving the two of you to their aboveground brothers. You don\'t dare to stop but you gradually slow down, and then lift your eyes from the treacherous terrain.\n\n\nAt first, you cannot make much sense of what you see \u2014 this is nothing like the country you left three years ago. You look at Briana but she doesn\'t seem surprised. You turn your eyes to the scenery again, to the black smoke of orc camps and razed villages, to the burned forests, to the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview hill. \n\n\nNo birds, only some horrible dark eagle-like creatures with no head, circling in both directions above Mount Bloodrock.\n\n\n_"We must stop this."_\n\n\nBriana follows your gaze, then shakes her head. "This is much larger than us, Aren. We\'ve both seen what takes place in the mountain. Now you can see what has happend outside. This is a problem for kings, not peasants."\n\n\n_"No king has what we have."_\n\n\n',!0)
if(b.aj("take_orcthorn"))c.l(0,'"Orcthorn? Bah, you think they\'ll let you have it? A farm boy?" \n\n\n_"I\'m not a farm boy. And I don\'t mean Orcthorn, no. I have a connection. We both do."_\n',!0)
c.l(0,"\n",!0)
if(!b.aj("take_orcthorn"))c.l(0,"\"Let me guess. Muscles and a bit of brains? Don't be a fool, you're still a farm boy.\" \n\n\n_\"I'm not a farm boy. And I don't mean muscles or brains, no. I have a connection. We both do.\"_\n",!0)
c.l(0,'\n"A connection."\n\n\n_"With the Dead Prince. I dream his dreams. I think I have some of his power. He is more than people think. A lot more. You feel it, too \u2014 I am sure of it \u2014 but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."_\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? Negotiate?"\n\n\n_"I do not have anything the Dead Prince wants. No, I do not think any mortal man does. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."_\n\n\n"And your plan is?"\n\n\n[IMG long view of the road ahead]\n\n\n_"Not letting him have it. Giving him the exact opposite of what he wants."_\n\n\n"You know we could just run as fast as we can, slaying some orcs along the way, and getting as far away from this place as possible, right?"\n\n\n_"Yes."_\n\n\n"That others would do exactly that."\n\n\n_"But we will not."_\n\n\n"No. We will not."\n\n\nWith that, you both start down the road towards the black fort in the distance. \n\n\nTHE END.\n\n\n',!0)
O.tE(b,c)
c.l(0,"",!0)}},
rS:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rP:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The crevice is small.\n",!0)}},
rQ:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rN:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You enter a small, circular room. There are exits on three sides, all marked with crude writing.\n\n\n",!0)
if(O.aZ(b,"smelter"))c.l(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.\n',!0)
c.l(0,"\n",!0)
if(O.aZ(b,"underground_church"))c.l(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.\n',!0)
c.l(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end to those three horrible years. For the first time, you see a smile on Briana's face. Not a smirk or an angry taunt of a laugh, but a genuine smile. \"_Up Door?_\" she whispers, shaking hear head. \"I can't believe we've made it this far.\"\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a scimitar in one hand, and there's a shield laid on his lap.\n",!0)}},
rO:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)
if(b.aj("guardpost_above_church_take_shield")&&!b.bk("guardpost_above_church_take_shield"))c.v(0,"The goblin's corpse is sprawled on the ground in the middle of the circular room.")
else c.v(0,"The goblin is sleeping soundly next to the exit to the Upper Door.")
c.l(0,"",!0)}},
lp:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="guardpost_above_church")return!1
return!0},
R:[function(a,b,c){c.l(0,"You take the passage that leads to the Upper Door.\n",!0)
O.tL(b,c)
return H.b(a.dx)+" successfully performs GuardpostAboveChurchEnterTunnelWithCancel"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
lq:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="guardpost_above_church")return!1
if(b.da(this.d)!=null)return!1
return!0},
R:[function(a,b,c){c.l(0,"You silently approach the goblin's legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.\n\n\nYou take a few slow steps back, then fix the shield on your offhand.\n",!0)
O.er(a,b,c,!0)
return H.b(a.dx)+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gM",6,0,1],
P:[function(a,b,c){c.l(0,"You silently approach the goblin's legs, and wait a few moments. You're trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he'll wake up.\n",!0)
C.a.v(b.f,V.lr())
return H.b(a.dx)+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gL",6,0,1],
H:function(a,b){return 0.3},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return"The goblin is asleep but not soundly \u2014 the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin's lap will quite likely wake him up."},
gI:function(){return!1}},
eX:{"^":"ad;",
gbv:function(){return[new A.fI(new V.lt(),new V.lu(),"Stay perfectly still","If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fI(new V.lv(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gn:function(){return"guardpost_above_church_take_shield"},
an:function(){var z=new V.dn(null,null,null)
z.j(this)
new V.lw().$1(z)
return z.p()},
at:function(a,b){if(a!==0)return
return b.a.be(0,new V.lx())},
aM:function(a,b){return[a.be(0,new V.ly())]}},
tj:{"^":"a:0;",
$1:function(a){var z=$.$get$a9().ak(1073741823)
a.gbj().b=z
a.gbj().c=0
return a}},
lt:{"^":"a:26;",
$4:function(a,b,c,d){J.bw(c,"You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin's leg.\n\n\nFortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.",!0)
b.ao()
b.W(a.gq(),new V.ls())
O.er(a,b,c,!0)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
ls:{"^":"a:0;",
$1:function(a){var z=a.gk().go
a.gk().go=z-1
return a}},
lu:{"^":"a:3;",
$3:function(a,b,c){return a.fy>0}},
lv:{"^":"a:26;",
$4:function(a,b,c,d){J.bw(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly and gets his bearing suprisingly fast. He jumps up and gets into combat stance, pointing his scimitar at you.\n\n\nYou hold the shield on your offhand and get ready to fight.",!0)
b.ao()
O.er(a,b,c,!1)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)"}},
lw:{"^":"a:0;",
$1:function(a){var z=a.gbj().c
a.gbj().c=z+1
return a}},
lx:{"^":"a:0;",
$1:function(a){return a.gb1()}},
ly:{"^":"a:0;",
$1:function(a){return a.gb1()}},
rK:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse, and I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure," she says, and turns her attention to the sword. "We should name it. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
rM:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
mo:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
R:[function(a,b,c){c.l(0,'_"We will call it Luck Bringer. We got lucky, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ic(b,"Luck Bringer")
b.a9("RoomRoamingSituation").bD(b,b.A(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordOpportunity"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
mp:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
R:[function(a,b,c){c.l(0,'_"We will call it Savior. It was our first step to freedom. The sword should have killed us and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ic(b,"Savior")
b.a9("RoomRoamingSituation").bD(b,b.A(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordRedemption"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
mn:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
R:[function(a,b,c){c.l(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.a9("RoomRoamingSituation").bD(b,b.A(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordNothing"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
rI:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rJ:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"TODO\n",!0)}},
rG:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The room is dark and wet. As you enter, the noises end. Smell of rotting flesh fills your nostrils and almost makes you vomit.\n\n\nWhen your eyes become accustomed to the dark, you see a figure standing in front of you, and next to a heap of dead bodies. You realize it's a male orc, but an especially large one, with huge muscles and many scars. His face is in constant motion, overwhelmed by tics and waves of hateful expressions.\n",!0)}},
rH:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
oW:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="orcthorn_room")return!1
if(b.aj("talk_to_briana_3"))if(!b.aj(this.d))z=!H.A(z.length!==0?C.a.gE(z):null,"$isG").c
else z=!1
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.l(0,'You and Briana nod at each other and start sweeping the room. The mad guardian has left many bizarre things scattered around the space. A box of severed orc hands. Crude drawings of tentacles covering one of the walls, with several gouged out eyes below it. A circle made from half-eaten rats, with a single pebble in the middle.\n\n\n"None of this makes any sense," Briana says, turning some useless apparatus made of sticks in hand. "He must _really_ have gone mad. From fear, or magic, or both."\n\n\nSoon, the last place in the room that hasn\'t been searched by either you or Briana is the large pile of rotting corpses. Mostly orcs, but there are also some human slaves, and many rats and bats. The reek of rotten flesh raises above it in visible, pale fumes. Briana hides her nose in an elbow and starts dragging out the upper, less rotten corpses. You join her.\n\n\n"The sword will be at the bottom, I bet."\n\n\n_"Of course. He tried to bury it."_\n\n\nIn what seems like hours of work, you get to the bottom. Among a slush of decayed meat, you feel something hard and cold. Pulling it uncovers a sword.\n\n\nYou fling the weapon and the green-red rot falls to the ground easily, as if it had no traction on the steel. You hold in your hand the brightest, sharpest sword you have ever seen.\n\n\n[IMG orcthorn]\n\n\n"Orcthorn," Briana nods and surveys the blade and the hilt. Gradually, she starts shaking her head. "Why would they keep the sword at all? Why wouldn\'t they destroy it? They were terrified of it."\n\n\n_"Fear. It is the ultimate authority. I do not think it was the orcs who decided to keep the sword."_\n\n\n"Well, now they can start fearing again." Briana crouches next to the corpse of the mad guardian. "And all this because of a common soldier and a farm boy," she says to the lifeless face.\n\n\n_"I am not a farm boy. And we still need to get out of here first."_\n',!0)
O.wl(b,a)
return H.b(a.dx)+" successfully performs TakeOrcthorn"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
rE:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'"There is a difference between being brave and being stupid. You\'re crossing it," she says.\n',!0)}},
rF:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'"We _really_ shouldn\'t be pushing our luck," she says.\n',!0)}},
o9:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="slave_quarters")return!1
return!0},
R:[function(a,b,c){c.l(0,"_\"Do you not want to kill some more orcs?\"_\n\n\n\"I do, trust me. That's why I don't want to get killed before having a chance to do it.\"\n\n\nYou shake your head and start walking. Briana reluctantly follows, here eyes darting around the familiar tunnel. You're close to where the orcs were keping you during sleep hours.\n\n\nSoon, you see an orc patrol appearing from behind a bend, and here it's impossible to hide. The orcs spot you immediatelly. There are three of them, one with a longsword, second with a spear, and the third one holds a battle axe.\n\n\nThe one with the spear throws it, and it rams into Briana's shoulder. She screams in pain. The swordman makes three fast leaps towards you, and swings his weapon. You have no time to react, and the blade slits your throat. You gurgle in surprise.\n\n\nYou look at Briana. As the battle axe cleaves her stomach, she looks directly at you.\n",!0)
b.W(a.y,new V.oa())
b.ao()
return H.b(a.dx)+" successfully performs SlaveQuartersContinue"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
oa:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}},
rC:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
rD:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)
if(b.a9("RoomRoamingSituation").bU(b,b.A(1),"orcthorn_room")&&!O.aZ(b,"orcthorn_room"))c.l(0,"The small door on the side of the corridor is open.",!0)
c.l(0,"\n",!0)
if(!b.a9("RoomRoamingSituation").bU(b,b.A(1),"orcthorn_room"))c.l(0,"The small door on the side of the corridor is closed.",!0)
c.l(0,"\n",!0)
O.cq(b,c)
c.l(0,"",!0)}},
ob:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="slave_quarters_passage")return!1
if(!b.aj(this.d))z=!H.A(z.length!==0?C.a.gE(z):null,"$isG").c&&!b.a9("RoomRoamingSituation").bU(b,b.A(1),"orcthorn_room")
else z=!1
if(!z)return!1
return!0},
R:[function(a,b,c){c.l(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)
return H.b(a.dx)+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
rz:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.aZ(b,"war_forge"))c.l(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.l(0,"",!0)
if(O.aZ(b,"guardpost_above_church"))c.l(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel goes \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.l(0,"",!0)}},
rB:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
if(b.bk("smelter_look_around"))c.l(0,"About a spear's throw away, the ogre is {closing the flow of molten steel|waiting for commands from the forges}.",!0)
c.l(0,"\n",!0)
O.cq(b,c)
c.l(0,"",!0)}},
oe:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="smelter")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,"The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you. But he doesn't notice. In fact, you realize he's blind, probably from all the molten steel around him. Yet he's performing his job without fault, listening to commands from orcs in the war forges beyond the wall, and operating the  floodgates accordingly.\n",!0)
return H.b(a.dx)+" successfully performs SmelterLookAround"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
of:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="smelter")return!1
if(!(!b.aj(this.d)&&b.aj("war_forge_watch_workers")&&b.aj("smelter_look_around")&&b.A(1).dT(C.v)>=1))return!1
return!0},
R:[function(a,b,c){c.l(0,'It is a long distance to the blind ogre, but you can\'t come any closer \u2014 there is the pool of molten steel between you and him, and going around it would surely make the orcs aware of your presence. You wait for the ogre to get an order from bellow and watch him open one of the gates. The molten steel starts flowing.\n\n\nYou move just a few steps closer to the ogre and withdraw the spear. \n\n\nBriana gives you a puzzled look. "Wait\u2026" she whispers.\n\n\nYou throw.\n\n\nThe spear sails over the molten steel and rams into the blind ogre\'s shoulder. Your heart skips a beat. It\'s not a killing throw. The ogre will scream, the orcs will hear it \u2014 you\'re dead. But then, the gods show mercy. The ogre wheels around, trying to reach the spear with his left hand. He gets away from the gate and tries to correct it by stepping back.\n\n\nThe last step takes him over the edge and into the pool of white-hot steel. He doesn\'t even have a chance to scream \u2014 the liquid swallows him. The orcs on the other side of the room don\'t notice.\n\n\n"Why would you do that?" Briana says with her hands extended in the direction of the throw. "You wasted a perfectly good spear on a stupid ogre that posed no threat to us."\n\n\n_"Listen."_\n\n\nAt this point, the distant voices coming from the war forges get slightly louder. Then again. In the clamor and noise of the two rooms, the small increase in volume is almost imperceptible but Briana hears it. She looks at you and a smile starts to form on her lips. "Let\'s go," she says.\n\n\nYou pass the short passage and crouch at the walkway above the war forges. There is chaos below. Most orcs and ogres have stopped working and watch molten steel overflowing the troughs and raining down on the forges. A large part of the iron monster is obliterated and the orcs working there are either dead or running away. \n\n\nSoon, you see an orc using a rope ladder to scale the wall to the smelter. He\'ll be able to get to the gate and close it but it will take him some time to make the climb. And the damage has already been done.\n\n\n"That, my friend, was the most boring heroic deed in history." Briana seems amused, watching the havoc below. "You just threw a spear\u2026"\n\n\n_"A well placed throw."_\n\n\n"... and killed a _blind_ ogre \u2026"\n\n\n_"An important one."_\n\n\n"... a _dam_ worker. Who happened to trip and fall into molten steel."\n\n\n_"As I said, a well placed throw. The less simple you see the world, the easier it is for you to change it."_\n\n\n"Nonsense. You got lucky."\n',!0)
O.tN(b,c)
return H.b(a.dx)+" successfully performs SmelterThrowSpear"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
rx:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
ry:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
oY:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){if(!(b.da(this.d)==null&&O.ep(b)))return!1
return!0},
R:[function(a,b,c){c.l(0,'_"You were caught not too long ago, I think. What can you tell me about outside?"_\n\n\n\n\nBriana shrugs. "How long have you been here?"\n\n\n\n\n_"Three years."_\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n',!0)
return H.b(a.dx)+" successfully performs TalkToBriana1"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
oZ:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){if(!(b.aj("talk_to_briana_1")&&b.da(this.d)==null&&O.ep(b)))return!1
return!0},
R:[function(a,b,c){c.l(0,'_"Where did they get you?"_\n\n\n\n\n"At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n_"You what?"_\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."\n',!0)
return H.b(a.dx)+" successfully performs TalkToBriana2"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
p_:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){if(!(b.aj("talk_to_briana_2")&&b.da(this.d)==null&&O.ep(b)))return!1
return!0},
R:[function(a,b,c){c.l(0,'_"What\'s Orcthorn?"_\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n_"Almost."_\n\n\n"Yes. Last full moon, an orcish captain and a company of prime warriors ambushed Lord Glencot. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n_"The mad guardian."_\n\n\n"The mad who?"\n\n\n_"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him *grach kamkorr*. The mad guardian. That sword is still with him. Hidden there in the cell."_\n\n\n"Where is that cell?"\n\n\n_"Somewhere in the slave quarters."_\n\n\n',!0)
if(!b.a9("RoomRoamingSituation").bU(b,b.A(1),"slave_quarters_passage"))c.l(0,'Briana tenses. "Well then, at least we have that choice." ',!0)
c.l(0,"",!0)
return H.b(a.dx)+" successfully performs TalkToBriana3"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
rv:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rw:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
tm:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'Almost as soon as you lose the circular room from sight, loud yells and shouting rises from the deep of the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear stomping of dozens of orc and goblin feet.\n\n\nThe air gets colder and fresher, but there\'s still no end in sight, and the stairs are now so high that the climb feels like walking up a ladder.\n\n\n"I have\u2026" Briana gasps, trying to catch her breath. "I have not fought my way through the depths of Mount Bloodrock just to die of exhaution on its doorstep."\n\n\n_"That\u2026 that would be disappointing, yes."_\n\n\nThe sounds from behind get louder. You can now pick out individual voices, although not what they say. The stairway suddenly makes a sharp left and levels out. Tasting blood on the roof of your mouth, your whole body demands to stop \u2014 but you start running anyway. Briana closely follows.\n\n\nThe light in the tunnel gets brighter and the air colder. Then, suddenly, an orc and a goblin jump in front of you from a slimy crevice, swords in hands. \n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n\n\nThis must be the guard of the Upper Door. There is no way around them.\n',!0)}},
rq:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
tk:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'After a few strides, you realize Briana still stands in the circular room behind.\n\n\n_"Are you not coming?"_\n\n\nBriana hesitates. "It feels like we could have done more." She motions at the goblin, then extends her gesture to the rest of the mountain. "Wreak more havoc. Take more. I mean, we might be the first people to be in Mount Bloodrock, and live."\n',!0)}},
tl:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
t6:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n",!0)
if(O.aZ(b,"cave_with_agruth"))c.v(0,"After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.")
c.l(0,"",!0)
if(O.aZ(b,"guardpost_above_church"))c.v(0,"Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.")
c.l(0,"",!0)}},
th:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The temple stands silent, as if holding breath.\n\n\n",!0)
O.cq(b,c)
c.l(0,"",!0)}},
kV:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="underground_church")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The ceiling is high enough to make you feel small, negligible, unimportant. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\n"What are these things?" Briana whispers, looking at the ornaments.\n\n\n_"This place worships the Dead Prince."_\n\n\nSaying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."\n\n\n_"He is god."_\n\n\n',!0)
if(!b.aj("wait_for_ritual"))c.l(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best.\" \n",!0)
c.l(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.dx)+" successfully performs ExamineUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
rL:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'The altar is a simple block of stone at the back of the temple. On the wall above it, there is a large ornament portraying an octopus with eight tentacles and eight black eyes at their tips. It\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.\n',!0)}},
rW:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The altar glows with a dim red light that reflects in the eight black eyes above it.\n",!0)}},
pg:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="underground_church_altar")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,'You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. As if the whole mountain groaned.\n\n\nAfter the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.\n\n\nThe ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.\n\n\nThis has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite \u2014 an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)\n\n\nYou notice that the priest takes a deep breath as well.\n\n\nThen, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again, and \u2014 without ceremony \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.\n\n\nBriana doesn\'t look at you. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"Is this\u2026 I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.i6(b,1)
return H.b(a.dx)+" successfully performs WaitForRitual"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
oX:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="underground_church_altar")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.uq(b)
return H.b(a.dx)+" successfully performs TakeSpearInUndergroundChurch"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
rp:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\n",!0)
if(O.aZ(b,"cave_with_agruth"))c.l(0,"You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. ",!0)
c.l(0,"\n",!0)
if(O.aZ(b,"smelter"))c.l(0,"You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. ",!0)
c.l(0,"",!0)}},
rA:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The air in the war forges is heavy and the noise overwhelming.\n\n\n",!0)
O.cq(b,c)
c.l(0,"",!0)}},
ph:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="war_forge")return!1
if(b.aj(this.d))return!1
return!0},
R:[function(a,b,c){c.l(0,"The cave is natural, but on the side of the smelter there is an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into all parts of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot is almost stronger than the smell of all that orc sweat.\n\n\nThis place makes Fort Ironcast's military forge look like a doll house: tiny and inconsequential.\n",!0)
return H.b(a.dx)+" successfully performs WarForgeLookAround"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
pi:{"^":"R;X:c<,n:d<,b,a",
G:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gE(z):null,"$isG").a!=="war_forge")return!1
if(!(!b.aj(this.d)&&b.aj("war_forge_look_around")))return!1
return!0},
R:[function(a,b,c){c.l(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',!0)
return H.b(a.dx)+" successfully performs WarForgeWatchWorkers"},"$3","gM",6,0,1],
P:[function(a,b,c){throw H.c(new P.u("Success chance is 100%"))},"$3","gL",6,0,1],
H:function(a,b){return 1},
gO:function(){return!1},
a5:function(a,b){return"Will you be successful?"},
gJ:function(){return},
gN:function(){return""},
gI:function(){return!1}},
pz:{"^":"eX;q:a<,V:b<",
af:function(a){var z=new V.dn(null,null,null)
z.j(this)
a.$1(z)
return z.p()},
S:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.eX))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gD:function(a){return Y.U(Y.h(Y.h(0,J.f(this.a)),J.f(this.b)))},
i:function(a){var z,y
z=$.$get$T().$1("GuardpostAboveChurchTakeShieldRescueSituation")
y=J.z(z)
y.m(z,"id",this.a)
y.m(z,"time",this.b)
return y.i(z)}},
dn:{"^":"d;a,b,c",
gq:function(){return this.gbj().b},
gV:function(){return this.gbj().c},
gbj:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
j:function(a){this.a=a},
p:function(){var z,y,x
z=this.a
if(z==null){y=this.gbj().b
x=this.gbj().c
z=new V.pz(y,x)
if(y==null)H.e(P.i("id"))
if(x==null)H.e(P.i("time"))}this.j(z)
return z}}}],["","",,O,{"^":"",
xk:[function(a){var z,y
z=$.$get$dd()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","uU",2,0,23],
xp:[function(a){$.en=a},"$1","uV",2,0,23],
hS:[function(a,b,c,d,e,f,g){var z=L.eL(a,!1,!1,d,e,f,g)
$.$get$bU().v(0,z)
return z},function(a){return O.hS(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hS(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uT",2,13,41,0,0,0,1,1,0],
ny:{"^":"nK;",
bb:function(){var z=0,y=P.ax(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bb=P.au(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.bL){n=t.Q
n.toString
m=new A.p(667,null,null,null,null)
m.c="Sending updated stats."
n.a.F(m.K())
m=t.Q
n=Z.oo()
m.toString
l=new A.p(100,null,null,null,null)
l.e=n.K()
m.a.F(l.K())
new P.K(0,$.q,null,[null]).bg(!0)}if(t.r){n=t.Q
n.toString
m=new A.p(667,null,null,null,null)
m.c="Saving player chronology."
n.a.F(m.K())
t.r=!1
m=t.Q
m.toString
n=new A.p(60,null,null,null,null)
n.b=t.f.c0(0)
m.a.F(n.K())}s=null
case 3:n=t.Q
n.toString
m=new A.p(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.F(m.K())
w=7
z=10
return P.at(t.c8(),$async$bb)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.C(j)
if(n instanceof M.cx){r=n
q=H.E(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.p(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.F(l.K())
z=1
break}else{p=n
o=H.E(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.p(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.F(l.K())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.t(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.p(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.F(m.K())
case 1:return P.aE(x,y)
case 2:return P.aD(v,y)}})
return P.aF($async$bb,y)},
ea:function(){var z,y
this.eI()
this.f.aW(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hi(Z.bK())
z.toString
y=new A.p(90,null,null,null,null)
y.b=Z.bK()
z.a.F(y.K())
this.bb()},
jv:[function(a){var z,y
z={}
z.a=null
y=$.$get$bU()
y.Z(0,new O.nV(z,this,a))
z=z.a
if(z==null)throw H.c(P.F("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.J(y)+")"))
this.hH(z)
this.bb()},"$1","ghx",2,0,34],
hH:function(a){var z=a.r
if(z!=null)$.$get$cl().ax(z)
z=a.x
if(z!=null)this.dG(z)},
c8:function(){var z=0,y=P.ax(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$c8=P.au(function(a,a0){if(a===1)return P.aD(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$cm()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.p(667,null,null,null,null)
q.c="Awarding points."
u.a.F(q.K())
p=r.b.d6()
r=v.Q
q=p.gi6()
u=p.b
o=p.c
r.toString
n=new A.p(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.F(n.K())
r=new P.K(0,$.q,null,[null])
r.bg(null)
r.bH(new O.nL(v))
x=!0
z=1
break}r=v.x
q=v.e.d
o=q.length
m=r===o-1||r===v.y
u.a=m
l=v.y
k=r!==l&&r!=null&&r<o&&!!J.o(q[r]).$isM
r="atEndOfPage = "+m+", atStaticChoiceList = "+k
q=v.Q
q.toString
o=new A.p(667,null,null,null,null)
o.c=r
q.a.F(o.K())
o=$.$get$bU()
o.hu(new O.nM(v),!1)
if(o.gt(o)!==0){r=v.Q
r.toString
q=new A.p(667,null,null,null,null)
q.c="We have choices."
r.a.F(q.K())
q=H.y(o,"b6",0)
q=P.O(new H.I(o,new O.nN(u,k),[q]),!0,q)
r=o.a
H.m([],[L.ab])
j=new L.eM(r,q)
if(!j.ga0(j)){u=v.Q
r=u.e
if(r!=null){r.cX(new D.bY("Showing new choice before previous one was selected."))
u.e=null}r=P.r
u.e=new P.cg(new P.K(0,$.q,null,[r]),[r])
r=j.dd()
u.a.F(r.K())
u=u.e.a.bH(v.ghx())
i=new O.nO(v)
r=H.j(u,0)
q=$.q
if(q!==C.k){i=P.ef(i,q)
q.toString}u.cI(new P.e5(null,new P.K(0,q,null,[r]),6,new O.nP(),i,[r,r]))
x=!0
z=1
break}else{h=o.aX(0,new O.nQ(),new O.nR())
if(h!=null){r=h.r
if(r!=null)$.$get$cl().ax(r)
r=h.x
if(r!=null)v.dG(r)
o.a_(0,h)}}}r=$.$get$cl()
q=r.b
g=r.c
z=q!==g?3:4
break
case 3:++r.d
u=r.a
g=(g-1&u.length-1)>>>0
r.c=g
f=u[g]
u[g]=null
z=5
return P.at(v.ca(f),$async$c8)
case 5:x=a0
z=1
break
case 4:r=$.en
if(r!=null){v.dG(r)
$.en=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===l){r=v.e.d.length-1
v.x=r}else if($.hE)$.hE=!1
else{++r
v.x=r}q=v.e
u.a=r===q.d.length-1
q="Resolving block: '"+H.b(q.a)+"' block "+H.b(v.x)+"."
r=v.Q
r.toString
l=new A.p(667,null,null,null,null)
l.c=q
r.a.F(l.K())
r=v.x
q=v.e.d
if(r===q.length){u=v.Q
u.toString
r=new A.p(667,null,null,null,null)
r.c="End of book."
u.a.F(r.K())
r=v.Q
u=v.dv()
r.toString
u=u.ef(50)
r.a.F(u.K())
v.Q.a.F(new A.p(80,null,null,null,null).K())
x=!0
z=1
break}r=q[r]
z=typeof r==="string"?6:8
break
case 6:u=v.Q
q=P.af
u.f=new P.cg(new P.K(0,$.q,null,[q]),[q])
q=new A.p(30,null,null,null,null)
q.c=r
u.a.F(q.K())
u.f.a.bH(new O.nS(v))
x=!0
z=1
break
z=7
break
case 8:z=!!J.o(r).$isM?9:11
break
case 9:r=v.Q
r.toString
q=new A.p(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.F(q.K())
try{o.i4(v.e.d[v.x])}catch(b){u=H.C(b)
if(u instanceof M.cx){t=u
s=H.E(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.p(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.F(q.K())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.p(667,null,null,null,null)
q.c="- choices added"
r.a.F(q.K())
if(o.b6(0,new O.nT(u,v))&&v.x===v.e.d.length-1){u=v.Q
u.toString
r=new A.p(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.F(r.K())
r=v.Q
u=v.dv()
r.toString
u=u.ef(50)
r.a.F(u.K())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:q={func:1,ret:[P.P,P.ar]}
z=H.av(r,q)?12:14
break
case 12:d=v.x===v.e.d.length-1?v.dv():null
z=15
return P.at(v.ca(H.i0(v.e.d[v.x],q)),$async$c8)
case 15:c=a0
if(o.b6(0,new O.nU(u,v))&&v.x===v.e.d.length-1){u=v.Q
u.toString
r=d.ef(50)
u.a.F(r.K())}x=c
z=1
break
z=13
break
case 14:throw H.c(new P.u("Invalid block: "+H.b(v.e.d[v.x])))
case 13:case 10:case 7:case 1:return P.aE(x,y)}})
return P.aF($async$c8,y)},
dG:function(a){var z,y,x,w,v
z=$.$get$cB()
if(z.b.test(H.cn(a))){y=this.d
if(y==null)throw H.c(new P.u("Cannot use ["+J.J(z)+"] when there is no _preGotoPosition."))
x=y.a
w=y.b-1}else{x=this.b.dh(a,this.e.gdj())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.v(0,H.b(z.a)+">>"+H.b(y.a))
this.r=!0}if(this.f.ae(0,H.b(this.e.a)+">>"+H.b(x.a))||x.e>0){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!((y?null:z.a).e>0)
else z=!1}else z=!1
$.hC=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.p(667,null,null,null,null)
v.c=z
y.a.F(v.K())
v=this.e
this.d=new O.nz(v,this.x)
this.e=x
this.x=w
v.e=v.e+1},
eI:function(){var z,y,x,w,v,u
this.x=null
$.$get$cl().aW(0)
$.$get$bU().st(0,0)
$.r4=null
x=$.$get$cs()
x.aW(0)
w=$.$get$cm()
x.u(0,"points",w)
w.a=0
w.b.aW(0)
this.b.i8()
$.i9=!0
try{this.iD()}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.p(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.F(u.K())
throw H.c(z)}this.fl()
$.i9=!1},
ca:function(a){var z=0,y=P.ax(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$ca=P.au(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$dd()
q.C=""
w=4
z=7
return P.at(a.$0(),$async$ca)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.C(m)
r=H.E(m)
q.C+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.J(s)
o=t.e.a
n=t.x
throw H.c(new M.cx(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.en(J.J(q)).bH(new O.nW(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aE(x,y)
case 2:return P.aD(v,y)}})
return P.aF($async$ca,y)},
hA:[function(a){var z,y,x
z=a.x
if(z==null)return!1
if($.$get$cB().b.test(z))return!1
if(this.b.dh(z,this.e.gdj())==null){z="Target page '"+z+"' was not found."
y=this.Q
y.toString
x=new A.p(667,null,null,null,null)
x.c=z
y.a.F(x.K())
return!0}return!1},"$1","geJ",2,0,35],
dv:function(){var z,y,x,w,v,u
this.fl()
try{x=this.e.a
w=$.$get$cs()
x=new Z.fD(x,this.b.iu(),null,null,null,null)
x.c=H.aH(Z.cS(w),"$isH",[P.l,P.d],"$asH")
x.f=Date.now()
x.e=C.i.jm(H.aA(x),16)
return x}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.p(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.F(u.K())
throw H.c(z)}},
fd:function(a,b){var z,y,x
this.eI()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.dp("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.p(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.F(x.K())
z.iC(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.p(667,null,null,null,null)
y.c="Importing player chronology."
z.a.F(y.K())
this.f.av(0,b)}z=this.Q
z.toString
y=new A.p(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.F(y.K())
y=$.$get$cs()
Z.nv(a,y,P.dy(P.l,P.bA))
this.cx=H.A(y.h(0,"game"),"$iseR")
this.cy=H.aH(y.h(0,"hitpoints"),"$isas",[P.aY],"$asas")
z=[P.r]
this.db=H.aH(y.h(0,"stamina"),"$isas",z,"$asas")
this.dx=H.aH(y.h(0,"gold"),"$isas",z,"$asas")
z=this.Q
Z.hi(Z.bK())
z.toString
y=new A.p(90,null,null,null,null)
y.b=Z.bK()
z.a.F(y.K())
y=this.Q
y.toString
z=new A.p(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.F(z.K())
this.bb()},
iQ:function(a){return this.fd(a,null)},
dk:[function(a,b,c,d){var z=0,y=P.ax(),x,w=this,v,u,t
var $async$dk=P.au(function(e,f){if(e===1)return P.aD(f,y)
while(true)switch(z){case 0:v=$.$get$dd()
if(v.C.length!==0){w.Q.en(J.J(v))
v.C=""}v=w.Q
v.toString
u=new A.p(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.F(u.K())
u=U.ce
t=new P.K(0,$.q,null,[u])
v.x=new P.cg(t,[u])
x=t
z=1
break
case 1:return P.aE(x,y)}})
return P.aF($async$dk,y)},function(a,b){return this.dk(a,b,null,!1)},"jt","$4$rerollEffectDescription$rerollable","$2","gfZ",4,5,54,1,0]},
nV:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seo(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.p(667,null,null,null,null)
x.c=z
y.a.F(x.K())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cB().b.test(z)?y.d.a:y.b.dh(z,y.e.gdj())
if(w!=null){y.f.v(0,H.b(y.e.a)+">>"+H.b(w.a))
y.r=!0}}}}},
nL:{"^":"a:0;a",
$1:function(a){return this.a.bb()}},
nM:{"^":"a:0;a",
$1:function(a){return a.geo()||this.a.hA(a)}},
nN:{"^":"a:37;a,b",
$1:function(a){return a.iJ(this.b,this.a.a)}},
nO:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.p(667,null,null,null,null)
x.c=z
y.a.F(x.K())
return}},
nP:{"^":"a:0;",
$1:function(a){return a instanceof D.bY}},
nQ:{"^":"a:0;",
$1:function(a){return a.giK()}},
nR:{"^":"a:2;",
$0:function(){return}},
nS:{"^":"a:0;a",
$1:function(a){return this.a.bb()}},
nT:{"^":"a:0;a,b",
$1:function(a){return a.d_(!0,this.a.a,this.b.geJ())}},
nU:{"^":"a:0;a,b",
$1:function(a){return a.d_(!0,this.a.a,this.b.geJ())}},
nW:{"^":"a:0;a",
$1:function(a){return this.a.bb()}},
n_:{"^":"d;a,b,f0:c<",
m:function(a,b,c){var z
if(!$.hC){z=this.a+b
this.a=z
this.b.ax(new A.cN(b,z,c))}},
v:function(a,b){return this.m(a,b,null)},
aL:function(a,b){this.v(0,b)
return this},
K:function(){return P.a1(["points",this.a])},
fE:function(a){this.a=a.h(0,"points")
this.b.aW(0)},
h6:function(){this.b=P.b7(null,A.cN)},
$isdS:1},
cT:{"^":"mJ;d,eh:e@,a,b,c"},
nz:{"^":"d;a,b"},
nG:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
dh:function(a,b){var z
if(b!=null&&this.a.aa(b+": "+H.b(a)))return this.a.h(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.aa(a))return z.h(0,a)
else return}},
iu:function(){var z=new H.Q(0,null,null,null,null,null,0,[P.l,null])
this.a.Z(0,new O.nI(z))
return z},
iC:function(a){a.Z(0,new O.nJ(this))},
i8:function(){this.a.Z(0,new O.nH())}},
nI:{"^":"a:6;a",
$2:function(a,b){this.a.u(0,a,P.a1(["visitCount",b.geh()]))}},
nJ:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.aa(a))z.h(0,a).seh(J.aI(b,"visitCount"))}},
nH:{"^":"a:6;",
$2:function(a,b){b.seh(0)}}}],["","",,M,{"^":"",cx:{"^":"d;a,b,c",
i:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
B:{
eF:function(a){return new M.cx(a,null,null)}}}}],["","",,M,{"^":"",nK:{"^":"d;"}}],["","",,Z,{"^":"",fD:{"^":"d;a,b,c,d,e,f",
ef:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.p(a,null,null,null,null)
z.c=this.dc()
return z},
dc:function(){var z,y
z=new H.Q(0,null,null,null,null,null,0,[P.l,null])
z.u(0,"uid",this.e)
z.u(0,"currentPageName",this.a)
z.u(0,"pageMapState",this.b)
z.u(0,"vars",this.c)
z.u(0,"timestamp",this.f)
y=this.d
if(y!=null)z.u(0,"previousText",y)
return C.A.f5(z)},
i:function(a){return this.dc()},
B:{
fE:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isM||!!z.$isH}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdS},
cS:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isM){y=[]
for(x=0;x<z.gt(a);++x)if(Z.fE(z.h(a,x)))y.push(Z.cS(z.h(a,x)))
return y}else if(!!z.$isH){w=new H.Q(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nu(a,w))
return w}else if(!!z.$isdS){v=a.K()
v.u(0,"_class",a.gf0())
return Z.cS(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cR:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isM){y=[]
for(x=0;x<z.gt(a);++x)y.push(Z.cR(z.h(a,x),b,null))
return y}else{w=!!z.$isH
if(w&&!a.aa("_class")){v=new H.Q(0,null,null,null,null,null,0,[null,null])
z.Z(a,new Z.nt(b,v))
return v}else if(w&&a.aa("_class"))if(c!=null){c.fE(a)
return c}else{u=z.h(a,"_class")
if(!b.aa(u))throw H.c(new Z.dp("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
nv:function(a,b,c){a.c.Z(0,new Z.nw(b,c))}}},nu:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fE(this.a.h(0,a)))this.b.u(0,a,Z.cS(b))}},nt:{"^":"a:6;a,b",
$2:function(a,b){this.b.u(0,a,Z.cR(b,this.a,null))}},nw:{"^":"a:38;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.u(0,a,Z.cR(b,x,null))
else z.u(0,a,Z.cR(b,x,y))}},dp:{"^":"d;a",
i:function(a){return"IncompatibleSavegameException: "+this.a}},lG:{"^":"d;a",
i:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",n5:{"^":"d;"},n4:{"^":"n5;"},lO:{"^":"n4;a,b,c,d,e,f,r,x",
jw:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.l
n=[o,P.d]
H.aH(a,"$isH",n,"$asH")
m=new A.p(a.h(0,"type"),null,null,null,null)
if(a.aa("strContent"))m.c=a.h(0,"strContent")
if(a.aa("listContent"))m.b=a.h(0,"listContent")
if(a.aa("intContent"))m.d=a.h(0,"intContent")
if(a.aa("mapContent"))m.e=H.aH(a.h(0,"mapContent"),"$isH",n,"$asH")
z=m
switch(z.gfB()){case 1070:o=this.e
if(o!=null){o.cX(new D.bY("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bl()
o.b.bl()
return
case 1000:o=new A.p(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.F(o.K())
n.F(new A.p(10,null,this.c.ch,null,null).K())
return
case 1050:l=z.giE()
this.e.bz(l)
this.e=null
return
case 1060:o=new A.p(667,null,null,null,null)
o.c="New form state from player received."
this.a.F(o.K())
o=z.giS()
if(!o.aa("__submitted__"))o.u(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.e(n.bQ())
n.c5(new G.k4(o))
return
case 1080:o=new A.p(667,null,null,null,null)
o.c="Received slot machine result."
this.a.F(o.K())
k=J.aI(z.ge3(),0)
j=J.aI(z.ge3(),1)
this.x.bz(new U.ce(C.Y[k],j))
this.x=null
return
case 1010:o=new A.p(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.F(o.K())
o=this.e
if(o!=null){o.cX(new D.bY("Book Restart before choice was selected."))
this.e=null}try{this.c.ea()}catch(i){y=H.C(i)
x=H.E(i)
o=new A.p(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.F(o.K())
throw H.c(y)}o=new A.p(90,null,null,null,null)
o.b=Z.bK()
n.F(o.K())
n.F(new A.cN(0,0,null).dd().K())
return
case 1020:h=new A.p(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.F(h.K())
h=this.e
if(h!=null){h.cX(new D.bY("Book Load before choice was selected."))
this.e=null}try{h=z.c
f=new Z.fD(null,null,null,null,null,null)
e=H.aH(C.A.ih(h),"$isH",n,"$asH")
if(!e.aa("currentPageName")||!e.aa("vars"))H.e(new Z.lG("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.aH(e.h(0,"pageMapState"),"$isH",n,"$asH")
f.c=H.aH(e.h(0,"vars"),"$isH",n,"$asH")
if(e.aa("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.aH(J.iO(z.ge3()),"$isdT",[o],"$asdT")
o=this.c
if(v!=null)o.fd(w,v)
else o.iQ(w)}catch(i){o=H.C(i)
if(o instanceof Z.dp){u=o
t=H.E(i)
o=new A.p(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.F(o.K())
this.c.ea()}else{s=o
r=H.E(i)
o=new A.p(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.F(o.K())
this.c.ea()}}try{o=new A.p(90,null,null,null,null)
o.b=Z.bK()
g.F(o.K())}catch(i){q=H.C(i)
p=H.E(i)
o=new A.p(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.F(o.K())
throw H.c(q)}this.c.toString
g.F(new A.cN(0,$.$get$cm().a,null).dd().K())
return
case 1090:this.f.bz(!0)
this.f=null
return
case 1040:this.c.bb()
return
default:o=new A.p(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gfB())+"."
this.a.F(o.K())}},"$1","ghF",2,0,16],
en:function(a){var z=P.af
this.f=new P.cg(new P.K(0,$.q,null,[z]),[z])
z=new A.p(30,null,null,null,null)
z.c=a
this.a.F(z.K())
return this.f.a}},bY:{"^":"d;a",
i:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",k4:{"^":"d;a",
m:function(a,b,c){this.a.u(0,b,c)},
i:function(a){return"<CurrentState submitted="+H.b(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",p:{"^":"d;fB:a<,e3:b<,c,iE:d<,iS:e<",
gjo:function(){var z=this.a
switch(z){case 10:return"SEND_BOOK_UID"
case 20:return"NO_RESULT"
case 30:return"TEXT_RESULT"
case 40:return"SHOW_CHOICES"
case 50:return"SAVE_GAME"
case 60:return"SAVE_PLAYER_CHRONOLOGY"
case 70:return"POINTS_AWARD"
case 80:return"END_OF_BOOK"
case 90:return"SET_STATS"
case 100:return"UPDATE_STATS"
case 110:return"SHOW_FORM"
case 120:return"UPDATE_FORM"
case 666:return"SCRIPTER_ERROR"
case 667:return"SCRIPTER_LOG"
case 1000:return"REQUEST_BOOK_UID"
case 1010:return"START"
case 1020:return"LOAD_GAME"
case 1040:return"PROCEED"
case 1050:return"CHOICE_SELECTED"
case 1060:return"FORM_INPUT"
case 130:return"SHOW_SLOT_MACHINE"
case 1090:return"TEXT_SHOWN"
case 1070:return"QUIT"
default:return"Unknown type="+H.b(z)}},
dc:function(){return C.A.f5(this.K())},
K:function(){var z,y
z=new H.Q(0,null,null,null,null,null,0,[P.l,P.d])
z.u(0,"type",this.a)
y=this.c
if(y!=null)z.u(0,"strContent",y)
y=this.b
if(y!=null)z.u(0,"listContent",y)
y=this.d
if(y!=null)z.u(0,"intContent",y)
y=this.e
if(y!=null)z.u(0,"mapContent",y)
return z},
i:function(a){var z,y
z="Message "+this.gjo()
y=this.a
return z+(y===50||y===60||y===90||y===100||y===666||y===667?" (async)":"")}}}],["","",,E,{"^":"",mJ:{"^":"d;n:a<",
i:function(a){return this.a},
gdj:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=C.c.b0(z,": ")
if(y>0)return C.c.aw(z,0,y)
else return}}}],["","",,A,{"^":"",cN:{"^":"d;i6:a<,b,c",
i:function(a){var z,y
z=this.c
y=this.a
if(z!=null)return"Score +"+y+" for "+z+"."
else return"Score +"+y+"."},
dd:function(){var z=new A.p(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",ab:{"^":"d;eo:a@,b,c,d,bc:e<,f,r,x,y",
giK:function(){return this.e.length===0},
d_:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this))return!1
return!0},
iJ:function(a,b){return this.d_(a,b,null)},
jk:function(){return P.a1(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bH:function(a){this.r=a
return this},
by:function(a,b){return C.c.by(this.e,b.e)},
i:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
h3:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.F("String given to choice cannot be null."))
this.e=C.c.de(a)
this.d=C.c.gD(a)
this.r=f
this.b=!1
this.c=!1},
$isa0:1,
$asa0:function(){return[L.ab]},
B:{
eL:function(a,b,c,d,e,f,g){var z=new L.ab(!1,null,null,null,null,e,null,d,g)
z.h3(a,!1,!1,d,e,f,g)
return z}}},eM:{"^":"fc;a,b",
gt:function(a){return this.b.length},
st:function(a,b){C.a.st(this.b,b)
return b},
h:function(a,b){return this.b[b]},
u:function(a,b,c){this.b[b]=c},
i4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
v=a[0]
if(v!=null&&!!J.o(v).$isbA)try{this.a=v.$0()}catch(u){z=H.C(u)
v=M.eF(J.J(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.P,P.ar]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aI(y,"string")!=null&&!!J.o(J.aI(y,"string")).$isbA)try{x=J.aI(y,"string").$0()}catch(u){w=H.C(u)
v=M.eF(J.J(w))
throw H.c(v)}else x=""
r=x
q=J.aI(y,"goto")
p=H.i0(J.aI(y,"script"),t)
o=new L.ab(!1,null,null,null,null,null,null,q,J.aI(y,"submenu"))
if(r==null)H.e(P.F("String given to choice cannot be null."))
o.e=J.bu(r).de(r)
o.d=C.c.gD(r)
o.r=p
o.b=!1
o.c=!1
C.a.v(v,o)}},
i0:function(a,b,c,d,e,f,g){if(b instanceof L.ab)C.a.v(this.b,b)
else if(typeof b==="string")C.a.v(this.b,L.eL(b,!1,!1,e,null,f,g))
else throw H.c(P.F("To add a choice to choices, one must provide either a new Choice element or a String."))},
v:function(a,b){return this.i0(a,b,!1,!1,null,null,null)},
jl:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.j(z,0)
x=P.O(new H.I(z,new L.jK(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.p(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Z(x,new L.jL(w))
return w},
dd:function(){return this.jl(null,null,null,null)},
i:function(a){var z=this.b
return new H.al(z,new L.jM(),[H.j(z,0),null]).cr(0,", ")},
$asfc:function(){return[L.ab]},
$asfl:function(){return[L.ab]},
$asM:function(){return[L.ab]},
$asac:function(){return[L.ab]}},jK:{"^":"a:0;a,b,c",
$1:function(a){return a.d_(this.b,this.a,this.c)}},jL:{"^":"a:0;a",
$1:function(a){H.b(a)
J.iF(this.a.b,a.jk())
a.a=!0}},jM:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cU:{"^":"d;a,bc:b<"},ol:{"^":"d;a",
m:function(a,b,c){this.a.u(0,b,c)},
K:function(){var z=new H.Q(0,null,null,null,null,null,0,[P.l,P.d])
this.a.Z(0,new Z.om(z))
return z},
Z:function(a,b){this.a.Z(0,b)}},om:{"^":"a:39;a",
$2:function(a,b){this.a.u(0,a,P.a1(["show",b.a,"string",b.b]))}},hh:{"^":"d;n:a<,bd:b<,c,e6:d<,e,f,bc:r<",B:{
hi:function(a){var z,y,x,w,v
z=H.m(new Array(a.length),[Z.hh])
for(y=a.length,x=0,w=0;w<a.length;a.length===y||(0,H.aw)(a),++w){v=a[w]
z[x]=new Z.hh(v.h(0,"name"),v.h(0,"description"),v.h(0,"color"),v.h(0,"priority"),v.h(0,"show"),v.h(0,"notifyOnChange"),v.h(0,"string"));++x}C.a.bN(z,new Z.pb())
return z}}},pb:{"^":"a:6;",
$2:function(a,b){return b.ge6()-a.ge6()}},as:{"^":"d;n:a<,bd:b<,c,d,e6:e<,f,r,x,i7:y<,f0:z<,$ti",
gal:function(){return this.f},
sal:function(a){if(!J.t(this.f,a)){this.f=a
this.y=!0
$.bL=!0}},
gbc:function(){return this.c.$1(this.f)},
K:function(){return P.a1(["name",this.a,"value",this.f,"show",this.r])},
fE:function(a){var z,y
this.sal(H.iq(a.h(0,"value"),H.j(this,0)))
z=a.h(0,"show")
y=this.r
if(y==null?z!=null:y!==z){this.r=z
this.y=!0
$.bL=!0}},
$isdS:1,
B:{
bJ:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cV()
y=z.aa(a)?H.aH(z.h(0,a),"$isas",[h],"$asas"):new Z.as(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.iq(e,h)
y.r=g
z.u(0,a,y)
return y},
oo:function(){var z,y
z=new Z.ol(new H.Q(0,null,null,null,null,null,0,[P.l,Z.cU]))
y=$.$get$cV().gc1()
new H.I(y,new Z.op(),[H.y(y,"x",0)]).Z(0,new Z.oq(z))
$.bL=!1
return z},
bK:function(){var z=H.m([],[[P.H,P.l,P.d]])
$.$get$cV().gc1().Z(0,new Z.on(z))
return z}}},op:{"^":"a:0;",
$1:function(a){return a.gi7()}},oq:{"^":"a:25;a",
$1:function(a){var z,y
z=a.r
y=a.f
y=a.c.$1(y)
a.y=!1
this.a.a.u(0,a.a,new Z.cU(z,y))}},on:{"^":"a:25;a",
$1:function(a){var z,y
z=new H.Q(0,null,null,null,null,null,0,[P.l,P.d])
z.u(0,"name",a.a)
z.u(0,"description",a.b)
z.u(0,"color",a.d)
z.u(0,"priority",a.e)
z.u(0,"show",a.r)
a.x
z.u(0,"notifyOnChange",!0)
y=a.f
z.u(0,"string",a.c.$1(y))
this.a.push(z)}}}],["","",,N,{"^":"",dA:{"^":"d;n:a<,b,c,d,e,f",
gf8:function(){var z,y,x
z=this.b
y=z==null||z.a===""
x=this.a
return y?x:z.gf8()+"."+x},
gfc:function(){if($.i8){var z=this.b
if(z!=null)return z.gfc()}return $.rc},
iR:function(a,b,c,d,e){var z,y,x,w,v,u
x=a.b
if(x>=this.gfc().b){if(!!J.o(b).$isbA)b=b.$0()
w=b
if(typeof w!=="string")b=J.J(b)
if(d==null&&x>=$.uQ.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.b(b)
throw H.c(x)}catch(v){z=H.C(v)
y=H.E(v)
d=y
if(c==null)c=z}this.gf8()
Date.now()
$.fd=$.fd+1
if($.i8)for(u=this;u!=null;)u=u.b
else $.$get$ff().f}},
U:function(a,b,c,d){return this.iR(a,b,c,d,null)},
B:{
bf:function(a){return $.$get$fe().j2(a,new N.t1(a))}}},t1:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.c.cG(z,"."))H.e(P.F("name shouldn't start with a '.'"))
y=C.c.iO(z,".")
if(y===-1)x=z!==""?N.bf(""):null
else{x=N.bf(C.c.aw(z,0,y))
z=C.c.bf(z,y+1)}w=new H.Q(0,null,null,null,null,null,0,[P.l,N.dA])
w=new N.dA(z,x,null,w,new P.hk(w,[null,null]),null)
if(x!=null)x.d.u(0,z,w)
return w}},aV:{"^":"d;n:a<,al:b<",
S:function(a,b){if(b==null)return!1
return b instanceof N.aV&&this.b===b.b},
bL:function(a,b){return C.i.bL(this.b,b.gal())},
cC:function(a,b){return C.i.cC(this.b,b.gal())},
by:function(a,b){return this.b-b.b},
gD:function(a){return this.b},
i:function(a){return this.a},
$isa0:1,
$asa0:function(){return[N.aV]}}}],["","",,X,{"^":"",
bv:function(a){return X.d3(J.iH(a,0,new X.ut()))},
aX:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d3:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
ut:{"^":"a:6;",
$2:function(a,b){return X.aX(a,J.f(b))}},
dI:{"^":"c4;a,$ti",
gal:function(){var z=this.a
if(z==null)throw H.c(new P.u("value called on absent Optional."))
return z},
aI:function(a){var z=this.a
return z==null?a:z},
ga1:function(a){var z=this.a
if(z!=null){z=H.m([z],this.$ti)
z=new J.b3(z,1,0,null,[H.j(z,0)])}else z=C.N
return z},
gD:function(a){return J.f(this.a)},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dI){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
i:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
h5:function(a,b){if(this.a==null)throw H.c(P.F("Must not be null."))},
B:{
fp:function(a,b){var z=new X.dI(a,[b])
z.h5(a,b)
return z}}}}],["","",,U,{"^":"",cP:{"^":"d;a,b",
i:function(a){return this.b}},ce:{"^":"d;a,jp:b<",
ge1:function(){return this.a===C.J},
i:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
S:function(a,b){var z,y
if(b==null)return!1
if(b instanceof U.ce)if(b.a===this.a){z=b.b
y=this.b
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z},
gD:function(a){return(this.b?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xq:[function(a,b){var z,y,x,w,v
z=new D.lO(b,null,null,null,null,null,null,null)
y=$.fA
$.fA=y+1
x=new H.cc(y,null,!1)
w=init.globalState.d
w.dq(y,x)
w.cg()
w=new H.ne(x,null)
w.h7(x)
z.b=w
w=w.b
w.toString
new P.cY(w,[H.j(w,0)]).bn(z.ghF(),null,null,null)
b.F(new H.ci(z.b.a,init.globalState.d.a))
v=N.nB()
z.c=v
v.Q=z},"$2","hW",4,0,36]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.f2.prototype
return J.lQ.prototype}if(typeof a=="string")return J.c7.prototype
if(a==null)return J.f3.prototype
if(typeof a=="boolean")return J.f1.prototype
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.z=function(a){if(a==null)return a
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.X=function(a){if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(a.constructor==Array)return J.c5.prototype
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.bV=function(a){if(typeof a=="number")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.em=function(a){if(typeof a=="number")return J.c6.prototype
if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.bu=function(a){if(typeof a=="string")return J.c7.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bm.prototype
return a}
J.iB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.em(a).aL(a,b)}
J.ct=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.bV(a).ei(a,b)}
J.t=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).S(a,b)}
J.aq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.bV(a).cC(a,b)}
J.iC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bV(a).bL(a,b)}
J.iD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.em(a).bt(a,b)}
J.iE=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.bV(a).c2(a,b)}
J.aI=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.X(a).h(a,b)}
J.iF=function(a,b){return J.z(a).v(a,b)}
J.bw=function(a,b,c){return J.z(a).l(a,b,c)}
J.iG=function(a,b,c){return J.bu(a).cT(a,b,c)}
J.bx=function(a,b){return J.em(a).by(a,b)}
J.bX=function(a,b){return J.X(a).ae(a,b)}
J.eA=function(a,b){return J.z(a).ar(a,b)}
J.iH=function(a,b,c){return J.z(a).b7(a,b,c)}
J.f=function(a){return J.o(a).gD(a)}
J.eB=function(a){return J.X(a).ga0(a)}
J.aj=function(a){return J.z(a).ga1(a)}
J.aT=function(a){return J.X(a).gt(a)}
J.iI=function(a){return J.o(a).gec(a)}
J.iJ=function(a,b){return J.X(a).b0(a,b)}
J.eC=function(a,b){return J.z(a).bo(a,b)}
J.iK=function(a,b,c){return J.bu(a).fe(a,b,c)}
J.iL=function(a,b,c){return J.bu(a).j6(a,b,c)}
J.iM=function(a){return J.bV(a).jf(a)}
J.iN=function(a,b){return J.z(a).dl(a,b)}
J.eD=function(a,b){return J.bu(a).cG(a,b)}
J.iO=function(a){return J.z(a).eg(a)}
J.J=function(a){return J.o(a).i(a)}
J.iP=function(a,b){return J.bV(a).ba(a,b)}
J.iQ=function(a,b){return J.z(a).bJ(a,b)}
I.aS=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.Q=J.aU.prototype
C.a=J.c5.prototype
C.R=J.f1.prototype
C.i=J.f2.prototype
C.S=J.f3.prototype
C.m=J.c6.prototype
C.c=J.c7.prototype
C.K=new A.ak(0,0,0)
C.L=new A.ak(-1/0,-1/0,-1/0)
C.M=new A.cv(-10,0,100)
C.N=new H.kQ([null])
C.O=new P.mI()
C.x=new P.q7()
C.P=new P.qp()
C.k=new P.qD()
C.E=new P.bz(0)
C.F=new U.bB(0,"ItemType.fist")
C.y=new U.bB(1,"ItemType.shield")
C.v=new U.bB(2,"ItemType.spear")
C.z=new U.bB(3,"ItemType.sword")
C.T=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.A=new P.lV(null,null)
C.U=new P.lX(null)
C.V=new P.lY(null,null)
C.W=new O.m5(0,"KnownToMode.all")
C.l=new N.aV("FINER",400)
C.j=new N.aV("FINEST",300)
C.q=new N.aV("FINE",500)
C.B=new N.aV("INFO",800)
C.X=new N.aV("OFF",2000)
C.C=new N.aV("SEVERE",1000)
C.D=new N.aV("WARNING",900)
C.J=new U.cP(0,"Result.success")
C.a5=new U.cP(1,"Result.failure")
C.a6=new U.cP(2,"Result.criticalSuccess")
C.a7=new U.cP(3,"Result.criticalFailure")
C.Y=I.aS([C.J,C.a5,C.a6,C.a7])
C.Z=I.aS(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a_=I.aS([C.F])
C.a0=I.aS([C.y])
C.G=I.aS([C.v])
C.r=I.aS([C.z])
C.h=I.aS([])
C.a1=I.aS(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol.\""])
C.a2=new H.jW(0,{},C.h,[null,null])
C.a3=new X.dI(null,[P.L])
C.d=new R.dL(0,"Pose.standing")
C.f=new R.dL(1,"Pose.offBalance")
C.b=new R.dL(2,"Pose.onGround")
C.n=new K.dM(0,"Predetermination.none")
C.t=new K.dM(1,"Predetermination.successGuaranteed")
C.o=new K.dM(2,"Predetermination.failureGuaranteed")
C.w=new Y.c9("he","him","his","himself")
C.p=new Y.c9("it","it","its","itself")
C.a4=new Y.c9("she","her","her","herself")
C.H=new Y.c9("they","them","their","themselves")
C.I=new Y.c9("you","you","your","yourself")
C.e=new Q.nj(0,"Resource.stamina")
C.a8=H.hV("ar")
C.u=H.hV("dynamic")
C.a9=new P.bO(null,2)
$.fA=1
$.fu="$cachedFunction"
$.fv="$cachedInvocation"
$.aJ=0
$.by=null
$.eH=null
$.bp=null
$.bR=null
$.bS=null
$.ec=!1
$.q=C.k
$.eU=0
$.ck=0
$.en=null
$.hC=!1
$.r4=null
$.hE=!1
$.i9=!0
$.bL=!1
$.i8=!1
$.uQ=C.X
$.rc=C.B
$.fd=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["eZ","$get$eZ",function(){return H.lM()},"f_","$get$f_",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eU
$.eU=z+1
z="expando$key$"+z}return new P.kW(null,z,[P.r])},"h6","$get$h6",function(){return H.aM(H.cX({
toString:function(){return"$receiver$"}}))},"h7","$get$h7",function(){return H.aM(H.cX({$method$:null,
toString:function(){return"$receiver$"}}))},"h8","$get$h8",function(){return H.aM(H.cX(null))},"h9","$get$h9",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hd","$get$hd",function(){return H.aM(H.cX(void 0))},"he","$get$he",function(){return H.aM(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hb","$get$hb",function(){return H.aM(H.hc(null))},"ha","$get$ha",function(){return H.aM(function(){try{null.$method$}catch(z){return z.message}}())},"hg","$get$hg",function(){return H.aM(H.hc(void 0))},"hf","$get$hf",function(){return H.aM(function(){try{(void 0).$method$}catch(z){return z.message}}())},"e0","$get$e0",function(){return P.pQ()},"be","$get$be",function(){var z,y
z=P.ar
y=new P.K(0,P.ps(),null,[z])
y.he(null,z)
return y},"bT","$get$bT",function(){return[]},"T","$get$T",function(){return new Y.rn()},"d7","$get$d7",function(){return new K.V("fist",P.az(C.a_,null))},"bF","$get$bF",function(){return N.bf("PlannerRecommendation")},"hY","$get$hY",function(){return new K.ro()},"ek","$get$ek",function(){var z=$.$get$hY()
return K.Y("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a9","$get$a9",function(){return P.dQ(null)},"bH","$get$bH",function(){return P.dQ(null)},"ib","$get$ib",function(){return N.bf("Storyline")},"fV","$get$fV",function(){return P.bh("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"bs","$get$bs",function(){return L.e_(new L.t0())},"aG","$get$aG",function(){return L.e_(new L.rr())},"da","$get$da",function(){return L.e_(new L.t_())},"dJ","$get$dJ",function(){return new F.mN("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"ei","$get$ei",function(){return Y.c0(!1,"balance",!0,C.p,$.$get$aG())},"ig","$get$ig",function(){return Y.c0(!1,"pounding",!1,C.p,$.$get$aG())},"fB","$get$fB",function(){return new B.nh("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fF","$get$fF",function(){return new O.nx(null,!1,!0,!1,null,null)},"fU","$get$fU",function(){return new Q.oh(null,!1,!0,!0,C.e,null)},"hj","$get$hj",function(){return new M.pc("",!0,C.e,!1,!0,null)},"hD","$get$hD",function(){return P.dQ(null)},"eG","$get$eG",function(){return new Z.jn(!1,!0,!1,null,null)},"it","$get$it",function(){return Y.c0(!1,"swing",!0,C.p,$.$get$aG())},"is","$get$is",function(){return Y.c0(!1,"swing",!0,C.p,$.$get$aG())},"ir","$get$ir",function(){return Y.c0(!1,"swing",!0,C.p,$.$get$aG())},"fr","$get$fr",function(){return X.fp(0,P.L)},"fs","$get$fs",function(){return X.fp(1,P.L)},"fO","$get$fO",function(){return new D.oc(!1,!1,!0,null,null)},"cp","$get$cp",function(){return G.oO(!1,!0,"Orcthorn",!0,2,2)},"eb","$get$eb",function(){return Z.og(!1,!1,"spear",!1,1)},"eh","$get$eh",function(){return new O.pe(1e4)},"hQ","$get$hQ",function(){return K.Y("cave_with_agruth_pre",new V.rV(),new V.rX(),null,null,H.m([new Q.n("cave_with_agruth","","You look around.",null)],[Q.n]),"ground")},"hP","$get$hP",function(){return K.Y("cave_with_agruth",new V.rT(),new V.rU(),null,null,H.m([new Q.n("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.n("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.n("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.n]),"ground")},"fG","$get$fG",function(){return new V.nX("Search Agruth","search_agruth",!0,null)},"hZ","$get$hZ",function(){return K.Y("exit_from_bloodrock",new V.rR(),new V.rS(),null,null,H.m([new Q.n("__END_OF_ROAM__","","N/A",null)],[Q.n]),"ground")},"i_","$get$i_",function(){return K.Y("forge_church_crevice",new V.rP(),new V.rQ(),null,null,H.m([new Q.n("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.n]),"ground")},"i7","$get$i7",function(){return K.Y("guardpost_above_church",new V.rN(),new V.rO(),null,null,H.m([new Q.n("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.n("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.n]),"ground")},"eW","$get$eW",function(){return new V.lp("Go to the Upper Gate","guardpost_above_church_enter_tunnel_with_cancel",!0,null)},"eY","$get$eY",function(){return new V.lq("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"ia","$get$ia",function(){return K.Y("just_after_agruth_fight",new V.rK(),new V.rM(),null,null,H.m([],[Q.n]),"ground")},"fi","$get$fi",function(){return new V.mo('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fj","$get$fj",function(){return new V.mp('"Savior"',"name_agruth_sword_redemption",!0,null)},"fh","$get$fh",function(){return new V.mn("No name","name_agruth_sword_nothing",!0,null)},"id","$get$id",function(){return K.Y("orcthorn_door",new V.rI(),new V.rJ(),null,null,H.m([new Q.n("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.n("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.n("orcthorn_room","Open the door","You open the door.",null)],[Q.n]),"ground")},"ie","$get$ie",function(){return K.Y("orcthorn_room",new V.rG(),new V.rH(),O.ww(),null,H.m([new Q.n("slave_quarters_passage","Exit the room","You leave through the door and find yourself back in the corridor of the slave quarters.",null)],[Q.n]),"ground")},"h_","$get$h_",function(){return new V.oW("Search for Orcthorn","take_orcthorn",!0,null)},"ih","$get$ih",function(){return K.Y("slave_quarters",new V.rE(),new V.rF(),null,null,H.m([new Q.n("slave_quarters_passage","Go back","You nod, and start carefully backing out through the passage.",null)],[Q.n]),"ground")},"fM","$get$fM",function(){return new V.o9("Continue","slave_quarters_continue",!0,null)},"ii","$get$ii",function(){return K.Y("slave_quarters_passage",new V.rC(),new V.rD(),O.wx(),null,H.m([new Q.n("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.n("slave_quarters","Go further towards the Gate of Screams","You start down the slope of the passage, towards the heart of the slave quarters and the Gate of Screams beyond. Briana tugs at your hand.",null),new Q.n("orcthorn_room","Open the door","You open the door.",null)],[Q.n]),"ground")},"fN","$get$fN",function(){return new V.ob("Examine the door","slave_quarters_passage_examine_door",!0,null)},"ij","$get$ij",function(){return K.Y("smelter",new V.rz(),new V.rB(),null,null,H.m([new Q.n("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.n("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.n]),"ground")},"fP","$get$fP",function(){return new V.oe("Look around","smelter_look_around",!0,null)},"fQ","$get$fQ",function(){return new V.of("Throw spear at the ogre","smelter_throw_spear",!0,null)},"ik","$get$ik",function(){return K.Y("start_adventure",new V.rx(),new V.ry(),O.wu(),null,H.m([new Q.n("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.n]),"ground")},"h1","$get$h1",function(){return new V.oY("Talk to Briana","talk_to_briana_1",!0,null)},"h2","$get$h2",function(){return new V.oZ("Ask Briana about her capture","talk_to_briana_2",!0,null)},"h3","$get$h3",function(){return new V.p_("Ask Briana about Orcthorn","talk_to_briana_3",!0,null)},"iu","$get$iu",function(){return K.Y("the_shafts",new V.rv(),new V.rw(),null,null,H.m([new Q.n("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.n]),"ground")},"iw","$get$iw",function(){return K.Y("tunnel",new V.tm(),new V.rq(),O.wv(),null,H.m([new Q.n("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.n]),"ground")},"ix","$get$ix",function(){return K.Y("tunnel_cancel_chance",new V.tk(),new V.tl(),null,null,H.m([new Q.n("tunnel","Continue","You shake your head and continue through the passage. Soon, you find yourself climbing a steep, poorly lit stairway. Briana catches up with you.",null),new Q.n("guardpost_above_church","Return","You nod, and step back into the circular room.",null)],[Q.n]),"ground")},"iy","$get$iy",function(){return K.Y("underground_church",new V.t6(),new V.th(),null,null,H.m([new Q.n("guardpost_above_church","Enter the upwards passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.n("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.n("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.n]),"ground")},"eT","$get$eT",function(){return new V.kV("Look around","examine_underground_church",!0,null)},"iz","$get$iz",function(){return K.Y("underground_church_altar",new V.rL(),new V.rW(),null,null,H.m([new Q.n("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.n]),"ground")},"hl","$get$hl",function(){return new V.pg("Wait","wait_for_ritual",!0,null)},"h0","$get$h0",function(){return new V.oX("Take the spear","take_spear_in_underground_church",!0,null)},"iA","$get$iA",function(){return K.Y("war_forge",new V.rp(),new V.rA(),null,null,H.m([new Q.n("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.n("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.n]),"ground")},"hm","$get$hm",function(){return new V.ph("Look around","war_forge_look_around",!0,null)},"hn","$get$hn",function(){return new V.pi("Watch the workers","war_forge_watch_workers",!0,null)},"hK","$get$hK",function(){return H.m([$.$get$hQ(),$.$get$hP(),$.$get$hZ(),$.$get$i_(),$.$get$i7(),$.$get$ia(),$.$get$id(),$.$get$ie(),$.$get$ih(),$.$get$ii(),$.$get$ij(),$.$get$ik(),$.$get$iu(),$.$get$iw(),$.$get$ix(),$.$get$iy(),$.$get$iz(),$.$get$iA()],[K.cd])},"hJ","$get$hJ",function(){return H.m([$.$get$fG(),$.$get$eW(),$.$get$eY(),$.$get$fi(),$.$get$fj(),$.$get$fh(),$.$get$h_(),$.$get$fM(),$.$get$fN(),$.$get$fP(),$.$get$fQ(),$.$get$h1(),$.$get$h2(),$.$get$h3(),$.$get$eT(),$.$get$hl(),$.$get$h0(),$.$get$hm(),$.$get$hn()],[A.R])},"dd","$get$dd",function(){return P.oM("")},"cm","$get$cm",function(){var z=new O.n_(0,null,"PointsCounter")
z.h6()
return z},"bU","$get$bU",function(){return new L.eM(null,H.m([],[L.ab]))},"cs","$get$cs",function(){return H.f7(P.l,P.d)},"cl","$get$cl",function(){return P.b7(null,{func:1,ret:[P.P,P.ar]})},"cB","$get$cB",function(){return P.bh("^\\s*<<<\\s*$",!0,!1)},"cV","$get$cV",function(){return H.f7(P.l,Z.as)},"ff","$get$ff",function(){return N.bf("")},"fe","$get$fe",function(){return P.dy(P.l,N.dA)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.l,args:[R.w,A.a4,Y.a3]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.v,args:[R.w]},{func:1,args:[R.w,A.a4,Y.a3]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.w,A.a4,Y.a3,R.w,S.ad]},{func:1,args:[P.r]},{func:1,ret:U.cG,args:[A.a4,F.G,[P.x,R.w]]},{func:1,ret:R.w,args:[A.a4]},{func:1,v:true,args:[R.w,A.a4,Y.a3,R.w,,]},{func:1,ret:P.l,args:[P.r]},{func:1,args:[U.b4]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d]},{func:1,ret:P.P},{func:1,ret:Y.ay,args:[P.r]},{func:1,ret:P.l,args:[P.l]},{func:1,args:[P.aY]},{func:1,args:[R.w]},{func:1,v:true,args:[P.d],opt:[P.bj]},{func:1,v:true,args:[P.l]},{func:1,ret:P.L,args:[A.ak]},{func:1,args:[Z.as]},{func:1,args:[,,,,]},{func:1,ret:Q.c3,args:[U.D]},{func:1,ret:P.af,args:[R.w,R.w]},{func:1,args:[,P.bj]},{func:1,args:[P.L,R.w]},{func:1,ret:P.af,args:[P.r]},{func:1,args:[P.l]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.r]},{func:1,ret:P.af,args:[L.ab]},{func:1,v:true,args:[[P.M,P.l],P.fH]},{func:1,args:[L.ab]},{func:1,args:[P.l,,]},{func:1,args:[P.l,Z.cU]},{func:1,v:true,args:[P.d,P.bj]},{func:1,ret:L.ab,args:[P.l],named:{deferToChoiceList:P.af,deferToEndOfPage:P.af,goto:P.l,helpMessage:P.l,script:{func:1,ret:[P.P,P.ar]},submenu:P.l}},{func:1,ret:P.r,args:[P.a0,P.a0]},{func:1,args:[P.bg]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,ret:P.r,args:[P.r,P.r]},{func:1,args:[P.r,,]},{func:1,ret:P.l,args:[U.bB,P.l]},{func:1,args:[[P.M,Y.ai],Y.ai]},{func:1,ret:P.L,args:[A.cv]},{func:1,ret:Q.c1,args:[Q.n]},{func:1,ret:P.l,args:[Q.ag]},{func:1,args:[,],opt:[,]},{func:1,args:[Y.ai]},{func:1,ret:[P.P,U.ce],args:[P.aY,P.l],named:{rerollEffectDescription:P.l,rerollable:P.af}}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.wq(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.aS=a.aS
Isolate.bb=a.bb
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.il(X.hW(),b)},[])
else (function(b){H.il(X.hW(),b)})([])})})()