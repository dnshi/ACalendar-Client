require({baseUrl:requirejs.isBrowser?"./":"./packages/",paths:{"alpha/replace":"replace"},packages:[{name:"alpha",location:"pkgs/alpha"},{name:"beta",location:"pkgs/beta/0.2/scripts",main:"beta"},{name:"dojox/chair",location:"pkgs/dojox/chair"},{name:"dojox/table",location:"pkgs/dojox/table",main:"table"},{name:"bar",location:"bar/0.4",main:"scripts/main"},{name:"foo",location:"foo/lib"},{name:"funky",main:"index.js"},{name:"baz",location:"baz/lib",main:"index"},{name:"dojox/window",location:"dojox/window",main:"window"}]},["require","alpha","alpha/replace","beta","beta/util","bar","baz","foo","foo/second","dojox/chair","dojox/table","dojox/door","dojox/window/pane","dojox/window","dojox/table/legs","funky"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v){var m=e.toUrl("foo/../data.html");doh.register("packages",[function(g){g.is("alpha",t.name),g.is("fake/alpha/replace",n.name),g.is("beta",r),g.is("beta/util",i.name),g.is("bar",s.name),g.is("0.4",s.version),g.is("baz",o.name),g.is("0.4",o.barDepVersion),g.is("foo",o.fooName),g.is("baz/helper",o.helperName),g.is("foo",u.name),g.is("alpha",u.alphaName),g.is("foo/second",a.name),g.is(requirejs.isBrowser?"./foo/lib/../data.html":"./packages/foo/lib/../data.html",m),g.is("dojox/chair",f.name),g.is("dojox/chair/legs",f.legsName),g.is("dojox/table",l.name),g.is("dojox/chair",l.chairName),g.is("dojox/table/legs",d.name),g.is("dojox/door",c.name),g.is("dojox/window/pane",h.name),g.is("dojox/window",p.name),g.is("dojox/window/pane",p.paneName),g.is("funky",v.name),g.is("monkey",v.monkeyName)}]),doh.run()});