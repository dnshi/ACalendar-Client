define("components/one/One",["jquery"],function(){return{name:"One"}}),require([],function(){require({paths:{jquery:"http://code.jquery.com/jquery-1.7.2.min"}},["components/one/One"],function(e){doh.register("nestedRequireConfig",[function(n){n.is("One",e.name),n.is(!0,!!jQuery)}]),doh.run()})}),define("nestedRequireConfig",[],function(){});