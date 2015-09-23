define(["type/default"],function(a){"use strict";var b=function(a,b,c){a.find(".type-select").parent().removeClass("hidden"),Husky.start([{name:"select@husky",options:{el:a.find(".type-select"),instanceName:"change"+b.index,valueName:"title",selectCallback:c,data:this.types,defaultLabel:$.grep(this.types,function(a){return a.id===b.type})[0].title}}])},c=function(a){a.removeClass("collapsed"),$("#collapse-text-blocks-"+this.id).removeClass("hidden"),$("#expand-text-blocks-"+this.id).addClass("hidden")},d=function(a){a.hasClass("collapsed")||(e.call(this,a),a.addClass("collapsed"),0===this.$el.find("."+this.propertyName+'-element:not(".collapsed")').length&&($("#expand-text-blocks-"+this.id).removeClass("hidden"),$("#collapse-text-blocks-"+this.id).addClass("hidden")))},e=function(a){var b,c,d;b=c=d=!1,a.find(".collapsed-container .hidden").removeClass("hidden"),a.find(".collapsed-container").removeClass("empty"),this.iterateBlockFields([a],function(e){b||(b=f.call(this,e,a)),c||(c=g.call(this,e,a)),d||(d=h.call(this,e,a))}.bind(this)),d||a.find(".collapsed-container .text").addClass("hidden"),b||c||d||a.find(".collapsed-container").addClass("empty")},f=function(a,b){return a.is(":visible")&&a.is("input")&&a.data("element")&&a.data("element").getValue()?(b.find(".collapsed-container .title").html(a.data("element").getValue()),!0):(b.find(".collapsed-container .title").empty(),!1)},g=function(a,b){if(a.data("type")&&"media-selection"===a.data("type")){if(a.find("img").attr("src"))return b.find(".collapsed-container .image").html('<img src="'+a.find("img").attr("src")+'"/>'),!0;Husky.once("sulu.media-selection."+a.data("typeInstanceName")+".data-retrieved",function(a){a.length>0&&(b.find(".collapsed-container").removeClass("empty"),b.find(".collapsed-container .image").html('<img src="'+a[0].thumbnails["50x50"]+'"/>'))}.bind(this))}return b.find(".collapsed-container .image").empty(),!1},h=function(a,b){if(a.data("element")){if(a.data("element").getType&&"textEditor"===a.data("element").getType().name&&$(a.data("element").getValue()).text())return b.find(".collapsed-container .text").html($(a.data("element").getValue()).text()),!0;if(a.is("textarea")&&a.data("element").getValue())return b.find(".collapsed-container .text").html(a.data("element").getValue()),!0}return b.find(".collapsed-container .text").empty(),!1},i=function(a){this.iterateBlockFields([a],function(a){"textEditor"===a.data("type")&&(a.closest(".form-group").height(a.closest(".form-group").outerHeight()),Husky.emit("husky.ckeditor."+a.data("aura-instance-name")+".destroy"))}.bind(this))},j=function(a){this.iterateBlockFields([a],function(a){"textEditor"===a.data("type")&&(a.closest(".form-group").height(""),Husky.emit("husky.ckeditor."+a.data("aura-instance-name")+".start"))}.bind(this))};return function(e,f,g){var h={},k={initializeSub:function(){var a,b,c,d=[];for(this.templates={},a=0,b=this.options.config.length;b>a;a++)c=this.options.config[a],this.templates[c.data]=Husky.dom.find("#"+c.tpl,this.$el).html(),c.id=c.data,c.name=Husky.translate(c.title),d.push(c);this.id=this.$el.attr("id"),this.propertyName=Husky.dom.data(this.$el,"mapperProperty"),this.types=d,this.$addButton=$("#"+this.id+"-add"),this.getMinOccurs()!==this.getMaxOccurs()?this.initSelectComponent(d):Husky.dom.remove(this.$addButton),this.bindDomEvents(),this.checkSortable(),this.setValue([])},getChildren:function(){return this.$el.children()},getMinOccurs:function(){return this.options.min},getMaxOccurs:function(){return this.options.max},canAdd:function(){var a=this.getChildren().length;return null===this.getMaxOccurs()||a<this.getMaxOccurs()},canRemove:function(){var a=this.getChildren().length;return a>this.getMinOccurs()},initSelectComponent:function(a){Husky.start([{name:"select@husky",options:{el:this.$addButton,instanceName:this.id,defaultLabel:Husky.translate("sulu.content.add-type"),fixedLabel:!0,style:"action",icon:"plus-circle",data:a.length>1?a:[],repeatSelect:!0,selectCallback:function(a){this.addChild(a,{},!0,null,!0)}.bind(this),deselectCallback:function(a){this.addChild(a,{},!0,null,!0)}.bind(this),noItemsCallback:function(){this.addChild(this.types[0].data,{},!0,null,!0)}.bind(this)}}])},bindDomEvents:function(){this.$el.on("click",'*[data-mapper-remove="'+this.propertyName+'"]',this.removeBlockHandler.bind(this)),this.$el.on("click",".options-collapse",this.collapseBlockHandler.bind(this)),this.$el.on("click",".collapsed-container",this.expandBlockHandler.bind(this)),this.$el.on("sortstart",function(a,b){i.call(this,$(b.item))}.bind(this)),this.$el.on("sortstop",function(a,b){j.call(this,$(b.item))}.bind(this)),$("#collapse-text-blocks-"+this.id).on("click",this.collapseAll.bind(this)),$("#expand-text-blocks-"+this.id).on("click",this.expandAll.bind(this))},removeBlockHandler:function(a){Husky.sulu.showDeleteDialog(function(b){if(b){var c=$(a.target),d=c.closest("."+this.propertyName+"-element");this.canRemove()&&(this.form.removeFields(d),d.remove(),$(g.$el).trigger("form-remove",[this.propertyName]),this.checkFullAndEmpty())}}.bind(this))},collapseBlockHandler:function(a){var b=$(a.target).closest("."+this.propertyName+"-element");d.call(this,b)},expandBlockHandler:function(a){var b=$(a.target).closest("."+this.propertyName+"-element");c.call(this,b)},collapseAll:function(){this.getChildren().each(function(a,b){d.call(this,$(b))}.bind(this))},expandAll:function(){this.getChildren().each(function(a,b){c.call(this,$(b))}.bind(this))},checkSortable:function(){this.setSortable(this.getChildren().length<=1?!1:!0)},validate:function(){return!0},addChild:function(a,c,e,f,h){var i,j,k,l=Husky.data.deferred();return("undefined"==typeof f||null===f)&&(f=this.getChildren().length),this.templates.hasOwnProperty(a)||(a=this.options["default"]),this.canAdd()?(Husky.dom.remove(Husky.dom.find("> *:nth-child("+(f+1)+")",this.$el)),c.type=a,i=$.extend({},{index:f,translate:Husky.translate,type:a},c),j=_.template(this.templates[a],i,g.options.delimiter),k=$(j),Husky.dom.insertAt(f,"> *",this.$el,k),this.types.length>1&&b.call(this,k,i,function(a){var b=g.mapper.getData(k);Husky.stop(k.find("*")),this.addChild(a,b,!0,k.index(),!0)}.bind(this)),this.getMinOccurs()===this.getMaxOccurs()&&Husky.dom.remove(Husky.dom.find(".options-remove",k)),g.initFields(k).then(function(){g.mapper.setData(c,k).then(function(){h||d.call(this,k),l.resolve(),e&&$(g.$el).trigger("form-add",[this.propertyName,c,f])}.bind(this))}.bind(this)),this.checkFullAndEmpty()):l.resolve(),l.promise()},checkFullAndEmpty:function(){this.$addButton.removeClass("empty"),this.$addButton.removeClass("full"),this.$el.removeClass("empty"),this.$el.removeClass("full"),this.canAdd()?this.canRemove()||(this.$addButton.addClass("empty"),this.$el.addClass("empty")):(this.$addButton.addClass("full"),this.$el.addClass("full")),this.getChildren().size()<=1?$("#text-block-header-"+this.id).hide():$("#text-block-header-"+this.id).show()},internalSetValue:function(a){var b,c,d,e,f=Husky.data.deferred(),g=function(){d--,0>=d&&f.resolve()};if(this.form.removeFields(this.$el),Husky.dom.children(this.$el).remove(),c=a.length<this.getMinOccurs()?this.getMinOccurs():a.length,d=c,c>0)for(b=0;c>b;b++)e=a[b]||{},this.addChild(e.type||this.options["default"],e).then(function(){g()});else g();return f.promise()},setValue:function(a){return"object"!=typeof a||Husky.dom.isArray(a)||(a=[a]),this.internalSetValue(a)},getValue:function(){var a=[];return Husky.dom.children(this.$el).each(function(){a.push(g.mapper.getData($(this)))}),a},iterateBlockFields:function(a,b){a.length&&$.each(a,function(a,c){var d=$(c),e=d.find("[data-mapper-property]");e.size()&&$.each(e,function(a,c){{var e=$(c);e.data("property")||{}}(b||$.noop)(e,d)})})},setSortable:function(a){a?Husky.dom.hasClass(this.$el,"sortable")||Husky.dom.addClass(this.$el,"sortable"):(Husky.dom.removeClass(this.$el,"sortable"),Husky.dom.sortable(this.$el,"destroy")),$(g.$el).trigger("init-sortable")}};return new a(e,h,f,"block",k,g)}});