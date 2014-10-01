define("planet-williams/app",["ember","ember/resolver","ember/load-initializers","planet-williams/config/environment","exports"],function(e,t,a,n,s){"use strict";var o=e["default"],i=t["default"],r=a["default"],l=n["default"];o.MODEL_FACTORY_INJECTIONS=!0;var p=o.Application.extend({modulePrefix:l.modulePrefix,podModulePrefix:l.podModulePrefix,Resolver:i});r(p,l.modulePrefix),s["default"]=p}),define("planet-williams/config/environment",["exports"],function(e){"use strict";e["default"]={modulePrefix:"planet-williams",environment:"production",baseURL:"/",locationType:"hash",EmberENV:{FEATURES:{}},APP:{SUPPORTED_LANGS:[{id:"en",name:"English"},{id:"fr",name:"Français"}]}}}),define("planet-williams/config/environments/production",["exports"],function(e){"use strict";e["default"]={modulePrefix:"planet-williams",environment:"production",baseURL:"/",locationType:"hash",EmberENV:{FEATURES:{}},APP:{SUPPORTED_LANGS:[{id:"en",name:"English"},{id:"fr",name:"Français"}]}}}),define("planet-williams/controllers/application",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.ObjectController.extend({langs:PlanetWilliams.SUPPORTED_LANGS,currentLang:function(){return localStorage.lang||"en"}.property(),currentLangChanged:function(){this.get("currentLang")!==localStorage.lang&&(localStorage.lang=this.get("currentLang"),location.reload())}.observes("currentLang")})}),define("planet-williams/controllers/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.ArrayController.extend({sortProperties:["displayCountry","displayTitle"]})}),define("planet-williams/initializers/lang",["exports"],function(e){"use strict";e["default"]={name:"lang",initialize:function(){if(void 0===localStorage.lang){var e=window.navigator.userLanguage||window.navigator.language;e&&(e=e.split(/\-/)[0],PlanetWilliams.SUPPORTED_LANGS.mapBy("id").contains(e)&&(localStorage.lang=e))}}}}),define("planet-williams/initializers/leaflet",["exports"],function(e){"use strict";e["default"]={name:"leaflet",initialize:function(){L.Icon.Default.imagePath="/images"}}}),define("planet-williams/models/pin",["ember","exports"],function(e,t){"use strict";var a=e["default"],n=a.Object.extend({displayTitle:function(){return this.get("title")||this.get("org")}.property("title","org"),displayDescription:function(){return this.get(a.isNone(this.get("title"))?"note":"org")}.property("note"),displayCountry:function(){return a.I18n.t("country."+this.get("adr.country-name"))}.property("adr.country-name"),gaEventLabel:function(){return this.get("adr.country-name")+" - "+this.get("displayTitle")}.property("adr.country-name","displayTitle")});n.reopenClass({all:function(){return a.$.getJSON("/pins.json").then(function(e){return e.map(function(e){return n.create(e)})})}}),t["default"]=n}),define("planet-williams/router",["ember","planet-williams/config/environment","exports"],function(e,t,a){"use strict";var n=e["default"],s=t["default"],o=n.Router.extend({location:s.locationType});o.map(function(){this.route("about")}),o.reopen({notifyGoogleAnalyticsPageView:function(){return window.ga?window.ga("send","pageview",{page:this.get("url"),title:this.get("url")}):void 0}.on("didTransition"),notifyGoogleAnalyticsEvent:function(e,t,a,n){window.ga&&window.ga("send","event",e,t,a,n)}}),a["default"]=o}),define("planet-williams/routes/application",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Route.extend({beforeModel:function(){var e=localStorage.lang||"en";return a.$.getScript("locale/"+e+".js").then(function(){a.I18n.translations=require("translations/"+e)["default"]})}})}),define("planet-williams/routes/index",["ember","planet-williams/models/pin","exports"],function(e,t,a){"use strict";var n=e["default"],s=t["default"];a["default"]=n.Route.extend({model:function(){return s.all()}})}),define("planet-williams/templates/about",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,n,s,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,a.Handlebars.helpers),o=o||{};var i,r,l="",p=n.helperMissing,u=this.escapeExpression;return o.buffer.push('<div class="container">\n  <div class="row">\n    <div class="col-md-8">\n      <h2>Planet Williams</h2>\n      '),o.buffer.push(u((i=n.t||t&&t.t,r={hash:{tagName:"p"},hashTypes:{tagName:"STRING"},hashContexts:{tagName:t},contexts:[t],types:["STRING"],data:o},i?i.call(t,"about.goal",r):p.call(t,"t","about.goal",r)))),o.buffer.push("\n      "),o.buffer.push(u((i=n.t||t&&t.t,r={hash:{tagName:"p"},hashTypes:{tagName:"STRING"},hashContexts:{tagName:t},contexts:[t],types:["STRING"],data:o},i?i.call(t,"about.built by",r):p.call(t,"t","about.built by",r)))),o.buffer.push("\n      "),o.buffer.push(u((i=n.t||t&&t.t,r={hash:{tagName:"p"},hashTypes:{tagName:"STRING"},hashContexts:{tagName:t},contexts:[t],types:["STRING"],data:o},i?i.call(t,"about.social",r):p.call(t,"t","about.social",r)))),o.buffer.push("\n      "),o.buffer.push(u((i=n.t||t&&t.t,r={hash:{tagName:"p"},hashTypes:{tagName:"STRING"},hashContexts:{tagName:t},contexts:[t],types:["STRING"],data:o},i?i.call(t,"about.contact",r):p.call(t,"t","about.contact",r)))),o.buffer.push("\n      "),o.buffer.push(u((i=n.t||t&&t.t,r={hash:{tagName:"p"},hashTypes:{tagName:"STRING"},hashContexts:{tagName:t},contexts:[t],types:["STRING"],data:o},i?i.call(t,"about.source code",r):p.call(t,"t","about.source code",r)))),o.buffer.push("\n    </div>\n  </div>\n</div>\n"),l})}),define("planet-williams/templates/application",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,n,s,o){function i(e,t){t.buffer.push('<img class="logo" src="/images/badge-464d5d0c40f8e2d769b46a08875091fd.png" alt="Planet Williams" /> Planet Williams')}function r(e,t){var a,s;t.buffer.push(f((a=n.t||e&&e.t,s={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t},a?a.call(e,"base.about",s):c.call(e,"t","base.about",s))))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,a.Handlebars.helpers),o=o||{};var l,p,u,h="",c=n.helperMissing,f=this.escapeExpression,d=this;return o.buffer.push('<nav class="navbar navbar-default navbar-static-top" role="navigation">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n\n      '),p=n["link-to"]||t&&t["link-to"],u={hash:{"class":"navbar-brand"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},inverse:d.noop,fn:d.program(1,i,o),contexts:[t],types:["STRING"],data:o},l=p?p.call(t,"index",u):c.call(t,"link-to","index",u),(l||0===l)&&o.buffer.push(l),o.buffer.push('\n    </div>\n\n    <div class="collapse navbar-collapse" id="navbar-collapse-1">\n      <ul class="nav navbar-nav pull-right">\n        <li>'),p=n["link-to"]||t&&t["link-to"],u={hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(3,r,o),contexts:[t],types:["STRING"],data:o},l=p?p.call(t,"about",u):c.call(t,"link-to","about",u),(l||0===l)&&o.buffer.push(l),o.buffer.push("</a></li>\n        <li><a href='https://www.facebook.com/planetwilliamssyndrome' target='_blank'>Facebook <span class=\"glyphicon glyphicon-new-window\"></span></a></li>\n        <li><a href='https://twitter.com/PlanetWilliams_' target='_blank'>Twitter <span class=\"glyphicon glyphicon-new-window\"></span></a></li>\n        <li>\n          <form class=\"navbar-form\">\n            "),o.buffer.push(f(n.view.call(t,"Ember.Select",{hash:{content:"langs",optionValuePath:"content.id",optionLabelPath:"content.name",value:"currentLang",classNames:"form-control"},hashTypes:{content:"ID",optionValuePath:"STRING",optionLabelPath:"STRING",value:"ID",classNames:"STRING"},hashContexts:{content:t,optionValuePath:t,optionLabelPath:t,value:t,classNames:t},contexts:[t],types:["ID"],data:o}))),o.buffer.push("\n          </form>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>\n\n"),l=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("\n"),h})}),define("planet-williams/templates/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,n,s,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,a.Handlebars.helpers),o=o||{};var i="",r=this.escapeExpression;return o.buffer.push(r(n.view.call(t,"pw-map",{hash:{id:"map"},hashTypes:{id:"STRING"},hashContexts:{id:t},contexts:[t],types:["STRING"],data:o}))),o.buffer.push("\n"),o.buffer.push(r(n.view.call(t,"pw-legend",{hash:{id:"legend"},hashTypes:{id:"STRING"},hashContexts:{id:t},contexts:[t],types:["STRING"],data:o}))),o.buffer.push("\n"),i})}),define("planet-williams/templates/views/pw-legend-item",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,n,s,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,a.Handlebars.helpers),o=o||{};var i,r="";return o.buffer.push('<span class="legendItemCountry">'),i=n._triageMustache.call(t,"view.content.displayCountry",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push('</span> - <span class="legendItemName">'),i=n._triageMustache.call(t,"view.content.displayTitle",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(i||0===i)&&o.buffer.push(i),o.buffer.push("</span>\n"),r})}),define("planet-williams/templates/views/pw-map-popup",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,n,s,o){function i(e,t){var a="";return t.buffer.push("<img "),t.buffer.push(b(n["bind-attr"].call(e,{hash:{src:"view.content.photo"},hashTypes:{src:"ID"},hashContexts:{src:e},contexts:[],types:[],data:t}))),t.buffer.push(' class="popup-photo" />'),a}function r(e,t){var a,s="";return t.buffer.push('<div class="popup-desc">'),a=n._triageMustache.call(e,"view.content.displayDescription",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</div>"),s}function l(e,t){var a,s,o="";return t.buffer.push('<a href="#" '),t.buffer.push(b(n.action.call(e,"externalClick","view.content.url",{hash:{target:"view"},hashTypes:{target:"STRING"},hashContexts:{target:e},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(' class="popup-url">'),t.buffer.push(b((a=n.t||e&&e.t,s={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t},a?a.call(e,"base.website",s):g.call(e,"t","base.website",s)))),t.buffer.push("</a>"),o}function p(e,t){var a="";return t.buffer.push('<a href="#" '),t.buffer.push(b(n.action.call(e,"externalClick","view.content.facebook",{hash:{target:"view"},hashTypes:{target:"STRING"},hashContexts:{target:e},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(' class="popup-facebook">facebook</a>'),a}function u(e,t){var a="";return t.buffer.push('<a href="#" '),t.buffer.push(b(n.action.call(e,"externalClick","view.content.twitter",{hash:{target:"view"},hashTypes:{target:"STRING"},hashContexts:{target:e},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(' class="popup-twitter">twitter</a>'),a}function h(e,t){var a="";return t.buffer.push('<a href="#" '),t.buffer.push(b(n.action.call(e,"externalClick","view.content.google",{hash:{target:"view"},hashTypes:{target:"STRING"},hashContexts:{target:e},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(' class="popup-google">google</a>'),a}function c(e,t){var a="";return t.buffer.push('<a href="#" '),t.buffer.push(b(n.action.call(e,"externalClick","view.content.yahoo",{hash:{target:"view"},hashTypes:{target:"STRING"},hashContexts:{target:e},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(' class="popup-yahoo">yahoo</a>'),a}function f(e,t){var a="";return t.buffer.push('<a href="#" '),t.buffer.push(b(n.action.call(e,"externalClick","view.content.youtube",{hash:{target:"view"},hashTypes:{target:"STRING"},hashContexts:{target:e},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(' class="popup-youtube">youtube</a>'),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,a.Handlebars.helpers),o=o||{};var d,m="",b=this.escapeExpression,g=n.helperMissing,y=this;return o.buffer.push('<div class="popup-custom-view">\n  '),d=n["if"].call(t,"view.content.photo",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(1,i,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push('\n  <span class="popup-title">'),d=n._triageMustache.call(t,"view.content.displayTitle",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("</span>\n  "),d=n["if"].call(t,"view.content.popupDescription",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(3,r,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push('\n  <div class="popup-country">'),d=n._triageMustache.call(t,"view.content.displayCountry",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("</div>\n  "),d=n["if"].call(t,"view.content.url",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(5,l,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("\n  "),d=n["if"].call(t,"view.content.facebook",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(7,p,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("\n  "),d=n["if"].call(t,"view.content.twitter",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(9,u,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("\n  "),d=n["if"].call(t,"view.content.google",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(11,h,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("\n  "),d=n["if"].call(t,"view.content.yahoo",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(13,c,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("\n  "),d=n["if"].call(t,"view.content.youtube",{hash:{},hashTypes:{},hashContexts:{},inverse:y.noop,fn:y.program(15,f,o),contexts:[t],types:["ID"],data:o}),(d||0===d)&&o.buffer.push(d),o.buffer.push("\n</div>\n"),m})}),define("planet-williams/views/pw-legend-item",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.View.extend({templateName:"views/pw-legend-item",classNames:["legendItem"],legendView:function(){return this.get("parentView")}.property(),containerView:function(){return this.get("legendView").get("parentView")}.property(),mapView:function(){return this.get("containerView").get("mapView")}.property(),mapMarkers:function(){var e=this.get("mapView").get("childLayers").find(function(e){return e instanceof EmberLeaflet.MarkerCollectionLayer});return e.get("childLayers")}.property(),panMapToMarker:function(){this.get("mapView")._layer.panTo(this.content.location,{animate:!0})},openMapMarkerPopup:function(){var e=this.get("mapMarkers").findBy("location",this.content.location);e._layer._map&&e.openPopup({latlng:this.content.location})},click:function(){this.panMapToMarker(),this.openMapMarkerPopup()}})}),define("planet-williams/views/pw-legend",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.CollectionView.extend({viewName:"legendView",contentBinding:"controller",itemViewClass:"pw-legend-item"})}),define("planet-williams/views/pw-map",["ember","exports"],function(e,t){"use strict";var a=e["default"],n=EmberLeaflet.TileLayer.extend({tileUrl:"https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png",options:{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',id:"examples.map-zr0njcqy"}}),s=a.View.extend({templateName:"views/pw-map-popup",actions:{externalClick:function(e){this.container.lookup("router:main").notifyGoogleAnalyticsEvent("map","externalClick",e),window.open(e,"_blank")}}}),o=EmberLeaflet.MarkerLayer.extend(EmberLeaflet.PopupMixin,{popupViewClass:s,locationBinding:"content.location",popupOptions:{closeButton:!1,minWidth:"200",maxWidth:"200",offset:L.point(0,-36)},didOpenPopup:function(){this.container.lookup("router:main").notifyGoogleAnalyticsEvent("map","openPopup",this.content.get("gaEventLabel"))}}),i=EmberLeaflet.MarkerCollectionLayer.extend({content:a.computed.alias("controller"),itemLayerClass:o});t["default"]=EmberLeaflet.MapView.extend({viewName:"mapView",childLayers:[n,i],center:L.latLng(37.76,-3.79),zoom:3,options:{maxZoom:18,minZoom:2},didCreateLayer:function(){this._super(),L.control.locate({locateOptions:{maxZoom:8}}).addTo(this._layer)}})});