module("Component",{setup:function(){this.component=$('<div class="input-append date" id="datepicker"><input size="16" type="text" value="12-02-2012" readonly><span class="add-on"><i class="icon-th"></i></span></div>').appendTo("#qunit-fixture").datepicker({format:"dd-mm-yyyy"}),this.input=this.component.find("input"),this.addon=this.component.find(".add-on"),this.dp=this.component.data("datepicker"),this.picker=this.dp.picker},teardown:function(){this.picker.remove()}}),test("Component gets date/viewDate from input value",function(){datesEqual(this.dp.date,UTCDate(2012,1,12)),datesEqual(this.dp.viewDate,UTCDate(2012,1,12))}),test("Activation by component",function(){ok(!this.picker.is(":visible")),this.addon.click(),ok(this.picker.is(":visible"))}),test("simple keyboard nav test",function(){var e;this.input.removeAttr("readonly"),equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days thead th.datepicker-switch"),equal(e.text(),"February 2012",'Title is "February 2012"'),datesEqual(this.dp.date,UTCDate(2012,1,12)),datesEqual(this.dp.viewDate,UTCDate(2012,1,12)),this.addon.click(),this.input.trigger({type:"keydown",keyCode:37}),datesEqual(this.dp.viewDate,UTCDate(2012,1,11)),datesEqual(this.dp.date,UTCDate(2012,1,11)),e=this.picker.find(".datepicker-days thead th.datepicker-switch"),equal(e.text(),"February 2012",'Title is "February 2012"'),this.input.trigger({type:"keydown",keyCode:39,shiftKey:!0}),datesEqual(this.dp.viewDate,UTCDate(2012,2,11)),datesEqual(this.dp.date,UTCDate(2012,2,11)),e=this.picker.find(".datepicker-days thead th.datepicker-switch"),equal(e.text(),"March 2012",'Title is "March 2012"'),this.input.trigger({type:"keydown",keyCode:37,ctrlKey:!0}),datesEqual(this.dp.viewDate,UTCDate(2011,2,11)),datesEqual(this.dp.date,UTCDate(2011,2,11)),e=this.picker.find(".datepicker-days thead th.datepicker-switch"),equal(e.text(),"March 2011",'Title is "March 2011"')}),test("setValue",function(){this.dp.date=UTCDate(2012,2,13),this.dp.setValue(),datesEqual(this.dp.date,UTCDate(2012,2,13)),equal(this.input.val(),"13-03-2012")}),test("update",function(){this.input.val("13-03-2012"),this.dp.update(),datesEqual(this.dp.date,UTCDate(2012,2,13))}),test("Navigating to/from decade view",function(){var e;this.addon.click(),this.input.val("31-03-2012"),this.dp.update(),equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days thead th.datepicker-switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-months").is(":visible"),"Month picker is visible"),equal(this.dp.viewMode,1),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months thead th.datepicker-switch"),ok(e.is(":visible"),"View switcher is visible"),e.click(),ok(this.picker.find(".datepicker-years").is(":visible"),"Year picker is visible"),equal(this.dp.viewMode,2),datesEqual(this.dp.viewDate,UTCDate(2012,2,31)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-years tbody span:contains(2011)"),e.click(),equal(this.dp.viewMode,1),datesEqual(this.dp.viewDate,UTCDate(2011,2,1)),datesEqual(this.dp.date,UTCDate(2012,2,31)),e=this.picker.find(".datepicker-months tbody span:contains(Apr)"),e.click(),equal(this.dp.viewMode,0),datesEqual(this.dp.viewDate,UTCDate(2011,3,1)),datesEqual(this.dp.date,UTCDate(2012,2,31))}),test("Selecting date resets viewDate and date",function(){var e;this.addon.click(),this.input.val("31-03-2012"),this.dp.update(),equal(this.dp.viewMode,0),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"26"),e.click(),datesEqual(this.dp.viewDate,UTCDate(2012,1,26)),datesEqual(this.dp.date,UTCDate(2012,1,26)),e=this.picker.find(".datepicker-days tbody td:first"),equal(e.text(),"29")}),test('"remove" removes associated HTML',function(){var e=".datepicker";$("#datepicker").datepicker("show"),equal($(e).length,1),this.component.datepicker("remove"),equal($(e).length,0)}),test("Does not block events",function(){function t(){e++}var e=0;$("#qunit-fixture").on("click",".add-on",t),this.addon.click(),equal(e,1),$("#qunit-fixture").off("click",".add-on",t)}),test("date and viewDate must be between startDate and endDate when setStartDate called",function(){this.dp.setDate(new Date(2013,1,1)),this.dp.setStartDate(new Date(2013,5,6)),datesEqual(this.dp.viewDate,UTCDate(2013,5,6)),datesEqual(this.dp.date,UTCDate(2013,5,6))}),test("date and viewDate must be between startDate and endDate when setEndDate called",function(){this.dp.setDate(new Date(2013,12,1)),this.dp.setEndDate(new Date(2013,5,6)),datesEqual(this.dp.viewDate,UTCDate(2013,5,6)),datesEqual(this.dp.date,UTCDate(2013,5,6))});