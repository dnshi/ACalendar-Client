define(["underscore","backbone","bongo"],function(e,t,n){n.db({name:"calendar",collections:["local"]}),t.sync=function(e,t,r){var i=t.toJSON(),s=n.db("calendar").collection("local"),o=function(){var e=null;s.find({}).toArray(function(e,t){e||r.success(t)})},u=function(e){s.save(i,function(t,n){t||(console.log(e+" event in db: "+n),r.success(i))})},a=function(){s.remove(i._id.toString(),function(e){e||console.log("delete event in db: "+i._id)})};switch(e){case"create":case"update":u(e);break;case"read":o();break;case"delete":a()}}});