import{r as u,d as h,a as d,c as m,w as ye,T as fe,o as n,b as i,e as a,f as g,g as y,h as w,t as v,n as H,i as he,j as ge,k as ve,v as _e,l as we,W as be,C as Te,m as ke,p as $e,q as xe,s as Ce,F as A,u as Se,x as Ne,y as Ae,z as Ie}from"./vendor.cb7e8a45.js";const Re=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerpolicy&&(l.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?l.credentials="include":o.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}};Re();const Ee={MAIN:{chainId:1,name:"Mainnet"},RINKEBY:{chainId:4,name:"Rinkeby",params:{chainId:`0x${4 .toString(16)}`,nativeCurrency:{name:"Ethereum",symbol:"ETH",decimals:18},rpcUrl:["https://rinkeby.arbitrum.io/rpc"],blockExplorerUrls:["https://rinkeby.etherscan.com/"]}},LOCALHOST:{chainId:[31337,1337],name:"Localhost",params:{chainId:`0x${1337 .toString(16)}`,nativeCurrency:{name:"Ethereum",symbol:"ETH",decimals:18},rpcUrl:["https://rinkeby.arbitrum.io/rpc"],blockExplorerUrls:["https://rinkeby.etherscan.com/"]}}},Q={REJECTED_BY_USER:4001,PENDING:-32002},x={MISSING_METAMASK:"Metamask is required.",TRANSACTION_FAILED:"The transaction has failed.",TRANSACTION_REJECTED_BY_USER:"Transaction rejected.",TRANSACTION_WAITING_FOR_APPOVAL:"Transaction waiting for aproval.",INVALID_NETWORK:"Invalid network",DEFAULT:"An error has happended."},Me={TRANSACTION_COMPLETED:"Transaction completed."};var p;(function(e){e[e.SUCCESS=0]="SUCCESS",e[e.ERROR=1]="ERROR",e[e.WARNING=2]="WARNING"})(p||(p={}));function Oe(e){const{code:t,error:r,data:s}=e;return t===Q.REJECTED_BY_USER?x.TRANSACTION_REJECTED_BY_USER:t===Q.PENDING?x.TRANSACTION_WAITING_FOR_APPOVAL:r?r.message:s?s.message:(console.error(e),x.TRANSACTION_FAILED)}const I=u(!1),R=u(null),_=u(p.ERROR);let F=null;function C(e=x.DEFAULT,t=p.ERROR){clearTimeout(F),R.value=e,_.value=t,I.value=!0,F=setTimeout(E,5e3)}function E(){clearTimeout(F),I.value=!1,_.value=p.ERROR,R.value=null}function b(e){const t=Oe(e);C(t,p.ERROR)}var Be=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",shown:I,message:R,type:_,show:C,hide:E,showTransactionError:b});var f=(e,t)=>{for(const[r,s]of t)e[r]=s;return e};const De=h({name:"Alert",setup(){return{shown:I,type:_,hide:E,message:R}},computed:{showError(){return _.value===p.ERROR},alertClasses(){return{"bg-red-500":_.value===p.ERROR,"bg-yellow-500":_.value===p.WARNING,"bg-green-500":_.value===p.SUCCESS}}}}),Fe={class:"text-xl inline-block mr-2 sm:mr-5 align-middle"},ze={class:"inline-block align-middle mr-4 sm:mr-8 text-sm sm:text-base overflow-ellipsis overflow-hidden flex-1"},Pe={key:0,class:"capitalize hidden sm:inline"},Ue=a("span",null,"\xD7",-1),We=[Ue];function je(e,t,r,s,o,l){const c=d("font-awesome-icon");return n(),m(fe,{name:"fade"},{default:ye(()=>[e.shown?(n(),i("div",{key:0,class:H(["flex flex-row items-center text-white px-3 sm:px-6 py-4 border-0 fixed bottom-0 left-0 right-0 z-50 m-1 sm:mb-4 sm:ml-2 sm:mr-2 rounded",e.alertClasses])},[a("span",Fe,[g(c,{icon:"bell"})]),a("span",ze,[e.showError?(n(),i("b",Pe,"Error:")):y("",!0),w(" "+v(e.message),1)]),a("button",{class:"bg-transparent text-2xl font-semibold leading-none mr-1 sm:mr-3 p-1 outline-none focus:outline-none pointer overflow-ellipsis overflow-hidden",onClick:t[0]||(t[0]=(...N)=>e.hide&&e.hide(...N))},We)],2)):y("",!0)]),_:1})}var Le=f(De,[["render",je]]);const Ve={},qe={class:"animate-spin",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},Ge=a("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1),Ye=a("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1),Ke=[Ge,Ye];function Je(e,t){return n(),i("svg",qe,Ke)}var z=f(Ve,[["render",Je]]);const He=h({name:"ButtonWithSpinner",components:{Spinner:z},props:{disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingText:{type:String,default:"Loading"},text:{type:String}}}),Qe=["disabled"];function Xe(e,t,r,s,o,l){const c=d("Spinner");return n(),i("button",{type:"button",class:H(["inline-flex items-center justify-center py-2 px-4 w-full md:w-auto text-center border border-transparent rounded-md text-white hover:shadow-md transition ease-in-out duration-150",{"cursor-not-allowed":e.loading||e.disabled}]),disabled:e.loading||e.disabled},[e.loading?(n(),m(c,{key:0,class:"text-white h-5 w-5 -ml-1 mr-3"})):y("",!0),w(" "+v(e.loading?e.loadingText:e.text),1)],10,Qe)}var M=f(He,[["render",Xe]]);const{ethereum:P}=window,T=Ee.RINKEBY,k=u(null),U=u(!1);async function Ze(){try{await P.request({method:"wallet_switchEthereumChain",params:[{chainId:T.params.chainId}]})}catch(e){if(e.code===4902)try{await P.request({method:"wallet_addEthereumChain",params:[T.params]})}catch(t){b(t)}b(e)}}async function et(){U.value=!0,await Ze(),U.value=!1}function X(){k.value=ge(parseInt(P.networkVersion,10))}const O=he(()=>k.value?Array.isArray(T.chainId)?T.chainId.includes(k.value.chainId):T.chainId===k.value.chainId:!1);var W=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",expected:T,current:k,switching:U,switchToValid:et,getCurrent:X,valid:O});const{ethereum:Z}=window,$=u(null),S=u(!1);async function tt(){try{const[e]=await Z.request({method:"eth_requestAccounts"});$.value=e}catch(e){b(e)}}async function nt(){S.value=!0,await tt(),S.value=!1}async function at(){try{const[e]=await Z.request({method:"eth_accounts"});$.value=e}catch(e){b(e)}}async function j(){S.value=!0,await at(),S.value=!1}var L=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",address:$,connecting:S,connect:nt,check:j});const ot=h({name:"Nav",components:{ButtonWithSpinner:M},setup(){return{network:W,wallet:L}},props:{appReady:{type:Boolean,default:!1}}}),st={class:"w-full py-3 md:py-4 px-3 md:px-4 shadow-md border flex justify-between text-sm"},rt={key:0,class:"bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow hover:shadow-md font-semibold max-w-xs mr-1 capitalize text-white"},it={key:2,class:"bg-green-500 hover:bg-green-600 px-4 py-2 rounded shadow hover:shadow-md font-semibold overflow-ellipsis overflow-hidden max-w-xs ml-1 text-white shadow-inner"};function lt(e,t,r,s,o,l){const c=d("ButtonWithSpinner");return n(),i("nav",st,[e.network.valid.value&&e.network.current.value?(n(),i("div",rt,v(e.network.current.value.name),1)):(n(),m(c,{key:1,class:"bg-blue-500 hover:bg-blue-600",loading:e.network.switching.value,loadingText:"Switching",onClick:e.network.switchToValid,text:`Switch to ${e.network.expected.name}`},null,8,["loading","onClick","text"])),e.wallet.address.value?(n(),i("div",it,v(e.wallet.address.value),1)):e.appReady?(n(),m(c,{key:3,class:"bg-green-500 hover:bg-green-600",loading:e.wallet.connecting.value,loadingText:"Connecting",onClick:e.wallet.connect,text:"Connect Wallet"},null,8,["loading","onClick"])):y("",!0)])}var ct=f(ot,[["render",lt]]),ee="/AwesomeCapybaraNFTCollection/logo.png";const dt=h({name:"InvalidNetworkMessage",components:{ButtonWithSpinner:M},setup(){return{network:W}}}),ut={class:"flex flex-col items-center"},pt=a("img",{src:ee,class:"w-40 my-5"},null,-1),mt={class:""};function yt(e,t,r,s,o,l){const c=d("ButtonWithSpinner");return n(),i("div",ut,[pt,a("p",mt," You need to switch to the "+v(e.network.expected.name)+" network ",1),g(c,{class:"bg-blue-500 hover:bg-blue-600 mt-5",loading:e.network.switching.value,loadingText:"Switching",onClick:e.network.switchToValid,text:`Switch to ${e.network.expected.name}`},null,8,["loading","onClick","text"])])}var ft=f(dt,[["render",yt]]),ht="/AwesomeCapybaraNFTCollection/sad.jpeg";const gt={class:"flex flex-col items-center text-center text-1xl flex-grow py-5 text-gray-600"},vt=a("p",{class:"py-2"},"Our capybara boss is sad :(.",-1),_t=a("p",{class:"py-2"},[w(" You need "),a("a",{href:"https://metamask.io",class:"underline text-blue-500 font-semibold"},"Metamask"),w(" to interact with this app. ")],-1),wt=w(" Please, install it and "),bt=w(" the page. "),Tt=a("div",{class:"max-w-md rounded-xl border my-4 p-4 shadow bg-white"},[a("img",{src:ht,alt:"Sad Capybara"})],-1),kt=h({setup(e){function t(){window.location.reload()}return(r,s)=>(n(),i("div",gt,[vt,_t,a("p",{class:"py-2"},[wt,a("button",{class:"underline",onClick:t},"refresh"),bt]),Tt]))}}),$t=h({name:"AddressNotConnected",components:{ButtonWithSpinner:M},setup(){return{wallet:L}}}),xt={class:"flex flex-col items-center"},Ct=a("img",{src:ee,class:"w-40 my-5"},null,-1),St=a("p",{class:""},"You need to connect your address to the app",-1);function Nt(e,t,r,s,o,l){const c=d("ButtonWithSpinner");return n(),i("div",xt,[Ct,St,g(c,{class:"bg-green-500 hover:bg-green-600 mt-5",loading:e.wallet.connecting.value,loadingText:"Connecting",onClick:e.wallet.connect,text:"Connect Wallet"},null,8,["loading","onClick"])])}var At=f($t,[["render",Nt]]);const It={},Rt={class:"w-full border-t bg-white flex justify-center py-4 shadow-lg text-gray-600"},Et=w(" You can find the source code\xA0 "),Mt=a("a",{class:"underline block",href:"https://github.com/nicobevilacqua/AwesomeCapybaraNFTCollection"},"here",-1),Ot=[Et,Mt];function Bt(e,t){return n(),i("footer",Rt,Ot)}var Dt=f(It,[["render",Bt]]);const Ft=h({name:"TokenPreview",components:{Spinner:z},props:{token:{type:Object,required:!0}},data:()=>({loading:!0,loaded:!1})}),zt={class:"w-full max-w-sm rounded-xl border px-4 py-6 md:p-10 shadow bg-white"},Pt={class:"text-center pb-5 uppercase font-semibold"},Ut={class:"w-full rounded bg-gray-100"},Wt=["src"],jt={key:0,class:"relative top-0 left-0 right-0 bottom-0 w-full p-24 rounded bg-gray-100 flex items-center justify-center"},Lt={key:0,class:"pt-1 text-gray-500"},Vt=a("div",{class:"pt-5 pb-1 font-semibold"},"Description:",-1),qt={class:"pb-5 pt-1"},Gt=["href"],Yt=a("p",{class:"mt-5 text-gray-500 text-xs"}," Note: It could take up to 10 minutes to be available on OpenSea. Please, be patience. ",-1);function Kt(e,t,r,s,o,l){const c=d("Spinner");return n(),i("div",zt,[a("div",Pt,v(e.token.name),1),a("div",Ut,[ve(a("img",{class:"w-full rounded relative",onLoad:t[0]||(t[0]=N=>{e.loading=!1,e.loaded=!0}),src:e.token.image},null,40,Wt),[[_e,e.loaded]]),e.loading?(n(),i("div",jt,[g(c,{class:"w-8"})])):y("",!0)]),e.loading?(n(),i("p",Lt," This can take a while. Please, wait. ")):y("",!0),Vt,a("div",qt,v(e.token.description),1),a("a",{href:e.token.openSeaUrl,class:"text-blue-400 underline"},"See on OpenSea",8,Gt),Yt])}var Jt=f(Ft,[["render",Kt]]);const Ht=h({name:"ProgressBar",props:{running:{type:Boolean,default:!1}},data:()=>({progress:0,interval:null}),watch:{running(){if(!this.running){clearInterval(this.interval),this.progress=0;return}this.progress=10,this.interval=setInterval(()=>{this.progress+10>=100||(this.progress=this.progress+10)},1500)}}}),Qt={key:0,id:"progress-bar",class:"overflow-hidden h-1 text-xs flex bg-red-200 animate-pulse"};function Xt(e,t,r,s,o,l){return e.progress>0&&e.progress<100?(n(),i("div",Qt,[a("div",{id:"current-progress",style:we({width:`${e.progress}%`}),class:"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all transition-slowest ease"},null,4)])):y("",!0)}var Zt=f(Ht,[["render",Xt]]);const en=[{inputs:[{internalType:"string",name:"_contractName",type:"string"},{internalType:"string",name:"_contractDescription",type:"string"},{internalType:"string",name:"_contractImage",type:"string"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"approved",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"string",name:"title",type:"string"},{indexed:!1,internalType:"string",name:"description",type:"string"},{indexed:!1,internalType:"string",name:"image",type:"string"},{indexed:!1,internalType:"uint256",name:"timestamp",type:"uint256"}],name:"ItemAdded",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"from",type:"address"},{indexed:!1,internalType:"uint256",name:"token",type:"uint256"},{indexed:!1,internalType:"uint256",name:"timestamp",type:"uint256"}],name:"TokenMinted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"description",type:"string"},{internalType:"string",name:"image",type:"string"}],name:"addItemToCollection",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"approve",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"availableItemsLength",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"collectionSize",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"contractURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"getApproved",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"mintNFT",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"ownerOf",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"},{internalType:"bytes",name:"_data",type:"bytes"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"operator",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"tokensData",outputs:[{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"description",type:"string"},{internalType:"string",name:"image",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"transferFrom",outputs:[],stateMutability:"nonpayable",type:"function"}],V="0x37888ca4bd1Ff89538778b30b85F58FDEBfB69CA",{ethereum:tn}=window;function te(){return new be(tn,"any")}function q(){const t=te().getSigner();return new Te(V,en,t)}const nn=u(null),G=u(!1);async function an(){try{const{data:e}=await ke.get(`https://rinkeby-api.opensea.io/api/v1/asset_contract/${V}`);window.location.href=`https://testnets.opensea.io/collection/${e.collection.slug}`}catch(e){C()}}async function on(){G.value=!0,await an(),G.value=!1}const ne=u(null),ae=u(null);async function B(){const e=q(),[t,r]=await Promise.all([e.availableItemsLength(),e.collectionSize()]);ne.value=r,ae.value=t}var sn=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",url:nn,redirecting:G,redirect:on,size:ne,available:ae,getData:B});const Y=u(!1),D=u(!1);async function rn(e){E();try{const t=await e;Y.value=!0;const r=await t.wait();return r.status===0?C(x.TRANSACTION_FAILED,p.ERROR):C(Me.TRANSACTION_COMPLETED,p.SUCCESS),r}catch(t){b(t)}finally{Y.value=!1}}async function oe(e){if(D.value)return;D.value=!0;const t=await rn(e);return D.value=!1,t}var ln=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",waiting:Y,running:D,doTransaction:oe});const se=u(null),K=u(!1);async function re(e){let s=(await q().tokenURI(e)).replace("data:application/json;base64,","");s=JSON.parse(atob(s)),s.openSeaUrl=`https://testnets.opensea.io/assets/${V}/${e}`,s.id=e,se.value=s}async function cn(){const e=q(),t=await oe(e.mintNFT());if(t){const[r,s]=t.events.find(o=>o.event==="TokenMinted").args;await re(s)}}async function dn(){K.value=!0;try{await cn()}catch(e){b(e)}K.value=!1}var un=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",token:se,claiming:K,getToken:re,claim:dn}),pn="/AwesomeCapybaraNFTCollection/hero.jpeg";const{ethereum:mn}=window,yn=h({name:"App",components:{Alert:Le,Nav:ct,ProgressBar:Zt,TokenPreview:Jt,InvalidNetworkMessage:ft,NoMetamaskMessage:kt,Footer:Dt,Spinner:z,ButtonWithSpinner:M,AddressNotConnected:At},data:()=>({metamaskDetected:!1,loading:!1}),setup(){return{network:W,wallet:L,alert:Be,collection:sn,token:un,transaction:ln}},computed:{appReady(){return this.metamaskDetected&&O.value}},async mounted(){this.loading=!0,await this.initApp(),this.loading=!1},methods:{async initApp(){this.metamaskDetected=!!await $e(),!!this.metamaskDetected&&(this.initEvents(),X(),!!O.value&&(await j(),$.value&&await B()))},initEvents(){if(!this.metamaskDetected)return;mn.on("accountsChanged",([t])=>{$.value=t,!!t&&B()}),te().on("network",t=>{k.value=t,!!O.value&&j().then(()=>{$.value&&B()})})}}}),fn={class:"flex flex-col bg-gray-50 justify-stretch h-screen"},hn={class:"w-full flex flex-col py-6 px-3 md:px-0 md:py-12 flex-grow items-center text-gray-600 flex-grow"},gn=a("h1",{class:"text-2xl md:text-3xl text-center font-semibold mb-3"}," Awesome Capybara NFT Collection ",-1),vn={key:0,src:pn,class:"w-80 my-5 rounded"},_n={key:1,class:"font-semibold mb-6"},wn=a("p",{class:"text-md text-blue-500"}," Claim your own Capybara NFT today! ",-1),bn={key:4},Tn=a("p",{class:"px-5 mt-4 text-center"}," You can see the whole collection on OpenSea ",-1);function kn(e,t,r,s,o,l){const c=d("ProgressBar"),N=d("Alert"),ie=d("Nav"),le=d("Spinner"),ce=d("NoMetamaskMessage"),de=d("InvalidNetworkMessage"),ue=d("AddressNotConnected"),pe=d("TokenPreview"),J=d("ButtonWithSpinner"),me=d("Footer");return n(),i(A,null,[g(c,{running:e.transaction.waiting.value},null,8,["running"]),g(N),a("div",fn,[e.metamaskDetected?(n(),m(ie,xe(Ce({key:0},{appReady:e.appReady})),null,16)):y("",!0),a("main",hn,[gn,e.loading?(n(),m(le,{key:0,class:"w-20 my-4"})):(n(),i(A,{key:1},[e.metamaskDetected?e.network.valid.value?e.wallet.address.value?(n(),i(A,{key:3},[e.token.token.value?y("",!0):(n(),i("img",vn)),e.collection.size.value?(n(),i("h2",_n," Total collection size: "+v(e.collection.size.value)+" items. ",1)):y("",!0),e.token.token.value?(n(),m(pe,{key:2,token:e.token.token.value},null,8,["token"])):e.collection.available&&e.collection.available.value&&e.collection.available.value>0?(n(),i(A,{key:3},[a("p",null," There are still "+v(e.collection.available.value)+" items available. ",1),wn,g(J,{class:"bg-blue-600 hover:bg-blue-700 active:bg-blue-700 focus:border-blue-700 my-4 px-10",loading:e.token.claiming.value,loadingText:"Claiming",onClick:e.token.claim,text:"Claim NFT"},null,8,["loading","onClick"])],64)):(n(),i("h3",bn,"All the collection items were claimed! :(")),Tn,g(J,{class:"bg-green-600 hover:bg-green-700 active:bg-green-700 focus:border-green-700 my-4 px-10",loading:e.collection.redirecting.value,loadingText:"Redirecting",onClick:e.collection.redirect,text:"View Collection"},null,8,["loading","onClick"])],64)):(n(),m(ue,{key:2})):(n(),m(de,{key:1})):(n(),m(ce,{key:0}))],64))]),g(me)])],64)}var $n=f(yn,[["render",kn]]);[Se].forEach(e=>{Ne.add(e)});Ie($n).component("font-awesome-icon",Ae).mount("#app");
