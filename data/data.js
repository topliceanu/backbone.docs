var data = {
  "#":{
    "title":"Backbone.js (0.9.2)",
    "hash":"#",
    "sections":{
      "http://github.com/documentcloud/backbone":{
        "title":"GitHub Repository",
        "hash":"http://github.com/documentcloud/backbone",
        "content":{
          "header":"ttp://github.com/documentcloud/backbone",
          "body":""
        }
      },
      "docs/backbone.html":{
        "title":"Annotated Source",
        "hash":"docs/backbone.html",
        "content":{
          "header":"ocs/backbone.html",
          "body":""
        }
      }
    }
  },
  "#introduction":{
    "title":"Introduction",
    "hash":"#introduction",
    "content":{
      "header":"introduction",
      "body":"<h2 id=\"introduction\">Introduction</h2><p>\n      When working on a web application that involves a lot of JavaScript, one\n      of the first things you learn is to stop tying your data to the DOM. It's all\n      too easy to create JavaScript applications that end up as tangled piles of\n      jQuery selectors and callbacks, all trying frantically to keep data in\n      sync between the HTML UI, your JavaScript logic, and the database on your\n      server. For rich client-side applications, a more structured approach\n      is often helpful.\n    </p><p>\n      With Backbone, you represent your data as\n      <a href=\"#Model\">Models</a>, which can be created, validated, destroyed,\n      and saved to the server. Whenever a UI action causes an attribute of\n      a model to change, the model triggers a <i>\"change\"</i> event; all\n      the <a href=\"#View\">Views</a> that display the model's state can be notified of the\n      change, so that they are able to respond accordingly, re-rendering themselves with\n      the new information. In a finished Backbone app, you don't have to write the glue\n      code that looks into the DOM to find an element with a specific <i>id</i>,\n      and update the HTML manually\n      -; when the model changes, the views simply update themselves.\n    </p><p>\n      If you're new here, and aren't yet quite sure what Backbone is for, start by\n      browsing the <a href=\"#examples\">list of Backbone-based projects</a>.\n    </p><p>\n      Many of the examples that follow are runnable. Click the <i>play</i> button\n      to execute them.\n    </p>"
    },
    "sections":{

    }
  },
  "#upgrading":{
    "title":"Upgrading",
    "hash":"#upgrading",
    "content":{
      "header":"upgrading",
      "body":"<h2 id=\"upgrading\">Upgrading to 0.9</h2><p>\n      Backbone's <b>0.9</b> series should be considered as a release candidate\n      for an upcoming <b>1.0</b>. Some APIs have changed, and while there is a\n      <a href=\"#changelog\">change log</a> available, and many new features to\n      take advantage of, there are a few specific changes where you'll need\n      to take care:\n    </p><ul>\n      <li>\n        If you've ever manually set <tt>this.el</tt> in a Backbone View to be a\n        particular DOM element, you'll want to use\n        <a href=\"#View-setElement\">setElement</a> instead.\n      </li>\n      <li>\n        Creating and destroying models is now optimistic. Pass <tt>{wait: true}</tt>\n        if you need the previous behavior of waiting for the server to acknowledge\n        success. You can now also pass <tt>{wait: true}</tt> to <a href=\"#Model-save\">save</a> calls.\n      </li>\n      <li>\n        If you have been writing a fair amount of <tt>$(view.el)</tt>, there's now\n        a cached reference for that jQuery object: <a href=\"#View-$el\">$el</a>.\n      </li>\n      <li>\n        If you're upgrading, make sure you also upgrade your version of Underscore.js\n        to the latest -; 1.3.1 or greater.\n      </li>\n      <li>\n        <tt>model.set</tt> will no longer trigger change events when setting a value\n        with <tt>{silent: true}</tt> then setting it back to its original value.\n        Similarly, after changing an attribute silently, that <tt>change:attribute</tt>\n        event <i>will</i> fire during the next change.\n      </li>\n      <li>\n        Since <tt>view.$(selector)</tt> is now equivalent to <tt>view.$el.find(selector)</tt>\n        rather than <tt>$(selector, view.el)</tt> it can no longer be used when\n        <tt>selector</tt> is an HTML string or DOM element.\n      </li>\n    </ul>"
    },
    "sections":{

    }
  },
  "#Events":{
    "title":"Events",
    "hash":"#Events",
    "content":{
      "header":"Events",
      "body":"<h2 id=\"Events\">Backbone.Events</h2><p>\n      <b>Events</b> is a module that can be mixed in to any object, giving the\n      object the ability to bind and trigger custom named events. Events do not\n      have to be declared before they are bound, and may take passed arguments.\n      For example:\n    </p><pre class=\"runnable\">\nvar object = {};\n\n_.extend(object, Backbone.Events);\n\nobject.on(\"alert\", function(msg) {\n  alert(\"Triggered \" + msg);\n});\n\nobject.trigger(\"alert\", \"an event\");\n</pre><p>\n      For example, to make a handy event dispatcher that can coordinate events\n      among different areas of your application: <tt>var dispatcher = _.clone(Backbone.Events)</tt>\n    </p>"
    },
    "sections":{
      "#Events-on":{
        "title":"on",
        "hash":"#Events-on",
        "content":{
          "header":"Events.on",
          "body":"<p id=\"Events-on\">\n      <b class=\"header\">on</b><code>object.on(event, callback, [context])</code><span class=\"alias\">Alias: bind</span>\n      <br></br>\n      Bind a <b>callback</b> function to an object. The callback will be invoked\n      whenever the <b>event</b> is fired.\n      If you have a large number of different events on a page, the convention is to use colons to\n      namespace them: <tt>\"poll:start\"</tt>, or <tt>\"change:selection\"</tt>.\n      The event string may also be a space-delimited list of several events...\n    </p><pre>\nbook.on(\"change:title change:author\", ...);\n</pre><p>\n      To supply a <b>context</b> value for <tt>this</tt> when the callback is invoked,\n      pass the optional third argument: <tt>model.on('change', this.render, this)</tt>\n    </p><p>\n      Callbacks bound to the special\n      <tt>\"all\"</tt> event will be triggered when any event occurs, and are passed\n      the name of the event as the first argument. For example, to proxy all events\n      from one object to another:\n    </p><pre>\nproxy.on(\"all\", function(eventName) {\n  object.trigger(eventName);\n});\n</pre>"
        }
      },
      "#Events-off":{
        "title":"off",
        "hash":"#Events-off",
        "content":{
          "header":"Events.off",
          "body":"<p id=\"Events-off\">\n      <b class=\"header\">off</b><code>object.off([event], [callback], [context])</code><span class=\"alias\">Alias: unbind</span>\n      <br></br>\n      Remove a previously-bound <b>callback</b> function from an object. If no\n      <b>context</b> is specified, all of the versions of the callback with\n      different contexts will be removed. If no\n      callback is specified, all callbacks for the <b>event</b> will be\n      removed. If no event is specified, <i>all</i> event callbacks on the object\n      will be removed.\n    </p><pre>\n// Removes just the `onChange` callback.\nobject.off(\"change\", onChange);\n\n// Removes all \"change\" callbacks.\nobject.off(\"change\");\n\n// Removes the `onChange` callback for all events.\nobject.off(null, onChange);\n\n// Removes all callbacks for `context` for all events.\nobject.off(null, null, context);\n\n// Removes all callbacks on `object`.\nobject.off();\n</pre>"
        }
      },
      "#Events-trigger":{
        "title":"trigger",
        "hash":"#Events-trigger",
        "content":{
          "header":"Events.trigger",
          "body":"<p id=\"Events-trigger\">\n      <b class=\"header\">trigger</b><code>object.trigger(event, [*args])</code>\n      <br></br>\n      Trigger callbacks for the given <b>event</b>, or space-delimited list of events.\n      Subsequent arguments to <b>trigger</b> will be passed along to the\n      event callbacks.\n    </p>"
        }
      }
    }
  },
  "#Model":{
    "title":"Model",
    "hash":"#Model",
    "content":{
      "header":"Model",
      "body":"<h2 id=\"Model\">Backbone.Model</h2><p>\n      <b>Models</b> are the heart of any JavaScript application, containing\n      the interactive data as well as a large part of the logic surrounding it:\n      conversions, validations, computed properties, and access control. You\n      extend <b>Backbone.Model</b> with your domain-specific methods, and\n      <b>Model</b> provides a basic set of functionality for managing changes.\n    </p><p>\n      The following is a contrived example, but it demonstrates defining a model\n      with a custom method, setting an attribute, and firing an event keyed\n      to changes in that specific attribute.\n      After running this code once, <tt>sidebar</tt> will be\n      available in your browser's console, so you can play around with it.\n    </p><pre class=\"runnable\">\nvar Sidebar = Backbone.Model.extend({\n  promptColor: function() {\n    var cssColor = prompt(\"Please enter a CSS color:\");\n    this.set({color: cssColor});\n  }\n});\n\nwindow.sidebar = new Sidebar;\n\nsidebar.on('change:color', function(model, color) {\n  $('#sidebar').css({background: color});\n});\n\nsidebar.set({color: 'white'});\n\nsidebar.promptColor();\n</pre>"
    },
    "sections":{
      "#Model-extend":{
        "title":"extend",
        "hash":"#Model-extend",
        "content":{
          "header":"Model.extend",
          "body":"<p id=\"Model-extend\">\n      <b class=\"header\">extend</b><code>Backbone.Model.extend(properties, [classProperties])</code>\n      <br></br>\n      To create a <b>Model</b> class of your own, you extend <b>Backbone.Model</b>\n      and provide instance <b>properties</b>, as well as optional\n      <b>classProperties</b> to be attached directly to the constructor function.\n    </p><p>\n      <b>extend</b> correctly sets up the prototype chain, so subclasses created\n      with <b>extend</b> can be further extended and subclassed as far as you like.\n    </p><pre>\nvar Note = Backbone.Model.extend({\n\n  initialize: function() { ... },\n\n  author: function() { ... },\n\n  coordinates: function() { ... },\n\n  allowedToEdit: function(account) {\n    return true;\n  }\n\n});\n\nvar PrivateNote = Note.extend({\n\n  allowedToEdit: function(account) {\n    return account.owns(this);\n  }\n\n});\n</pre><p class=\"warning\">\n        Brief aside on <tt>super</tt>: JavaScript does not provide\n        a simple way to call super -; the function of the same name defined\n        higher on the prototype chain. If you override a core function like\n        <tt>set</tt>, or <tt>save</tt>, and you want to invoke the\n        parent object's implementation, you'll have to explicitly call it, along these lines:\n    </p><pre>\nvar Note = Backbone.Model.extend({\n  set: function(attributes, options) {\n    Backbone.Model.prototype.set.call(this, attributes, options);\n    ...\n  }\n});\n</pre>"
        }
      },
      "#Model-constructor":{
        "title":"constructor / initialize",
        "hash":"#Model-constructor",
        "content":{
          "header":"Model.constructor",
          "body":"<p id=\"Model-constructor\">\n      <b class=\"header\">constructor / initialize</b><code>new Model([attributes])</code>\n      <br></br>\n      When creating an instance of a model, you can pass in the initial values\n      of the <b>attributes</b>, which will be <a href=\"#Model-set\">set</a> on the\n      model. If you define an <b>initialize</b> function, it will be invoked when\n      the model is created.\n    </p><pre>\nnew Book({\n  title: \"One Thousand and One Nights\",\n  author: \"Scheherazade\"\n});\n</pre><p>\n      In rare cases, if you're looking to get fancy,\n      you may want to override <b>constructor</b>, which allows\n      you to replace the actual constructor function for your model.\n    </p>"
        }
      },
      "#Model-get":{
        "title":"get",
        "hash":"#Model-get",
        "content":{
          "header":"Model.get",
          "body":"<p id=\"Model-get\">\n      <b class=\"header\">get</b><code>model.get(attribute)</code>\n      <br></br>\n      Get the current value of an attribute from the model. For example:\n      <tt>note.get(\"title\")</tt>\n    </p>"
        }
      },
      "#Model-set":{
        "title":"set",
        "hash":"#Model-set",
        "content":{
          "header":"Model.set",
          "body":"<p id=\"Model-set\">\n      <b class=\"header\">set</b><code>model.set(attributes, [options])</code>\n      <br></br>\n      Set a hash of attributes (one or many) on the model. If any of the attributes\n      change the models state, a <tt>\"change\"</tt> event will be triggered, unless\n      <tt>{silent: true}</tt> is passed as an option. Change events for specific\n      attributes are also triggered, and you can bind to those as well, for example:\n      <tt>change:title</tt>, and <tt>change:content</tt>. You may also pass\n      individual keys and values.\n    </p><pre>\nnote.set({title: \"March 20\", content: \"In his eyes she eclipses...\"});\n\nbook.set(\"title\", \"A Scandal in Bohemia\");\n</pre><p>\n      If the model has a <a href=\"#Model-validate\">validate</a> method,\n      it will be validated before the attributes are set, no changes will\n      occur if the validation fails, and <b>set</b> will return <tt>false</tt>.\n      Otherwise, <b>set</b> returns a reference to the model.\n      You may also pass an <tt>error</tt>\n      callback in the options, which will be invoked instead of triggering an\n      <tt>\"error\"</tt> event, should validation fail.\n      If <tt>{silent: true}</tt> is passed as an option, the validation is deferred\n      until the next change.\n    </p>"
        }
      },
      "#Model-escape":{
        "title":"escape",
        "hash":"#Model-escape",
        "content":{
          "header":"Model.escape",
          "body":"<p id=\"Model-escape\">\n      <b class=\"header\">escape</b><code>model.escape(attribute)</code>\n      <br></br>\n      Similar to <a href=\"#Model-get\">get</a>, but returns the HTML-escaped version\n      of a model's attribute. If you're interpolating data from the model into\n      HTML, using <b>escape</b> to retrieve attributes will prevent\n      <a href=\"http://en.wikipedia.org/wiki/Cross-site_scripting\">XSS</a> attacks.\n    </p><pre class=\"runnable\">\nvar hacker = new Backbone.Model({\n  name: \"&lt;script&gt;alert('xss')&lt;/script&gt;\"\n});\n\nalert(hacker.escape('name'));\n</pre>"
        }
      },
      "#Model-has":{
        "title":"has",
        "hash":"#Model-has",
        "content":{
          "header":"Model.has",
          "body":"<p id=\"Model-has\">\n      <b class=\"header\">has</b><code>model.has(attribute)</code>\n      <br></br>\n      Returns <tt>true</tt> if the attribute is set to a non-null or non-undefined\n      value.\n    </p><pre>\nif (note.has(\"title\")) {\n  ...\n}\n</pre>"
        }
      },
      "#Model-unset":{
        "title":"unset",
        "hash":"#Model-unset",
        "content":{
          "header":"Model.unset",
          "body":"<p id=\"Model-unset\">\n      <b class=\"header\">unset</b><code>model.unset(attribute, [options])</code>\n      <br></br>\n      Remove an attribute by deleting it from the internal attributes hash.\n      Fires a <tt>\"change\"</tt> event unless <tt>silent</tt> is passed as an option.\n    </p>"
        }
      },
      "#Model-clear":{
        "title":"clear",
        "hash":"#Model-clear",
        "content":{
          "header":"Model.clear",
          "body":"<p id=\"Model-clear\">\n      <b class=\"header\">clear</b><code>model.clear([options])</code>\n      <br></br>\n      Removes all attributes from the model. Fires a <tt>\"change\"</tt> event unless\n      <tt>silent</tt> is passed as an option.\n    </p>"
        }
      },
      "#Model-id":{
        "title":"id",
        "hash":"#Model-id",
        "content":{
          "header":"Model.id",
          "body":"<p id=\"Model-id\">\n      <b class=\"header\">id</b><code>model.id</code>\n      <br></br>\n      A special property of models, the <b>id</b> is an arbitrary string\n      (integer id or UUID). If you set the <b>id</b> in the\n      attributes hash, it will be copied onto the model as a direct property.\n      Models can be retrieved by id from collections, and the id is used to generate\n      model URLs by default.\n    </p>"
        }
      },
      "#Model-idAttribute":{
        "title":"idAttribute",
        "hash":"#Model-idAttribute",
        "content":{
          "header":"Model.idAttribute",
          "body":"<p id=\"Model-idAttribute\">\n      <b class=\"header\">idAttribute</b><code>model.idAttribute</code>\n      <br></br>\n      A model's unique identifier is stored under the <tt>id</tt> attribute.\n      If you're directly communicating with a backend (CouchDB, MongoDB) that uses\n      a different unique key, you may set a Model's <tt>idAttribute</tt> to\n      transparently map from that key to <tt>id</tt>.\n\n<pre class=\"runnable\">\nvar Meal = Backbone.Model.extend({\n  idAttribute: \"_id\"\n});\n\nvar cake = new Meal({ _id: 1, name: \"Cake\" });\nalert(\"Cake id: \" + cake.id);\n</pre>\n    </p>"
        }
      },
      "#Model-cid":{
        "title":"cid",
        "hash":"#Model-cid",
        "content":{
          "header":"Model.cid",
          "body":"<p id=\"Model-cid\">\n      <b class=\"header\">cid</b><code>model.cid</code>\n      <br></br>\n      A special property of models, the <b>cid</b> or client id is a unique identifier\n      automatically assigned to all models when they're first created. Client ids\n      are handy when the model has not yet been saved to the server, and does not\n      yet have its eventual true <b>id</b>, but already needs to be visible in the UI.\n      Client ids take the form: <tt>c1, c2, c3 ...</tt>\n    </p>"
        }
      },
      "#Model-attributes":{
        "title":"attributes",
        "hash":"#Model-attributes",
        "content":{
          "header":"Model.attributes",
          "body":"<p id=\"Model-attributes\">\n      <b class=\"header\">attributes</b><code>model.attributes</code>\n      <br></br>\n      The <b>attributes</b> property is the internal hash containing the model's\n      state. Please use <a href=\"#Model-set\">set</a> to update the attributes instead of modifying\n      them directly. If you'd like to retrieve and munge a copy of the model's\n      attributes, use <a href=\"#Model-toJSON\">toJSON</a> instead.\n    </p>"
        }
      },
      "#Model-changed":{
        "title":"changed",
        "hash":"#Model-changed",
        "content":{
          "header":"Model.changed",
          "body":"<p id=\"Model-changed\">\n      <b class=\"header\">changed</b><code>model.changed</code>\n      <br></br>\n      The <b>changed</b> property is the internal hash containing all the attributes\n      that have changed since the last <tt>\"change\"</tt> event was triggered.\n      Please do not update <b>changed</b> directly.  Its state is maintained internally\n      by <a href=\"#Model-set\">set</a> and <a href=\"#Model-change\">change</a>.\n      A copy of <b>changed</b> can be acquired from\n      <a href=\"#Model-changedAttributes\">changedAttributes</a>.\n    </p>"
        }
      },
      "#Model-defaults":{
        "title":"defaults",
        "hash":"#Model-defaults",
        "content":{
          "header":"Model.defaults",
          "body":"<p id=\"Model-defaults\">\n      <b class=\"header\">defaults</b><code>model.defaults or model.defaults()</code>\n      <br></br>\n      The <b>defaults</b> hash (or function) can be used to specify the default\n      attributes for your model. When creating an instance of the model,\n      any unspecified attributes will be set to their default value.\n    </p><pre class=\"runnable\">\nvar Meal = Backbone.Model.extend({\n  defaults: {\n    \"appetizer\":  \"caesar salad\",\n    \"entree\":     \"ravioli\",\n    \"dessert\":    \"cheesecake\"\n  }\n});\n\nalert(\"Dessert will be \" + (new Meal).get('dessert'));\n</pre><p class=\"warning\">\n      Remember that in JavaScript, objects are passed by reference, so if you\n      include an object as a default value, it will be shared among all instances.\n    </p>"
        }
      },
      "#Model-toJSON":{
        "title":"toJSON",
        "hash":"#Model-toJSON",
        "content":{
          "header":"Model.toJSON",
          "body":"<p id=\"Model-toJSON\">\n      <b class=\"header\">toJSON</b><code>model.toJSON()</code>\n      <br></br>\n      Return a copy of the model's <a href=\"#Model-attributes\">attributes</a> for JSON stringification.\n      This can be used for persistence, serialization, or for augmentation before\n      being handed off to a view. The name of this method is a bit confusing, as\n      it doesn't actually return a JSON string -; but I'm afraid that it's\n      the way that the <a href=\"https://developer.mozilla.org/en/JSON#toJSON()_method\">JavaScript API for <b>JSON.stringify</b> works</a>.\n    </p><pre class=\"runnable\">\nvar artist = new Backbone.Model({\n  firstName: \"Wassily\",\n  lastName: \"Kandinsky\"\n});\n\nartist.set({birthday: \"December 16, 1866\"});\n\nalert(JSON.stringify(artist));\n</pre>"
        }
      },
      "#Model-fetch":{
        "title":"fetch",
        "hash":"#Model-fetch",
        "content":{
          "header":"Model.fetch",
          "body":"<p id=\"Model-fetch\">\n      <b class=\"header\">fetch</b><code>model.fetch([options])</code>\n      <br></br>\n      Resets the model's state from the server by delegating to\n      <a href=\"#Sync\">Backbone.sync</a>. Returns a\n      <a href=\"http://api.jquery.com/jQuery.ajax/#jqXHR\">jqXHR</a>.\n      Useful if the model has never\n      been populated with data, or if you'd like to ensure that you have the\n      latest server state. A <tt>\"change\"</tt> event will be triggered if the\n      server's state differs from the current attributes. Accepts\n      <tt>success</tt> and <tt>error</tt> callbacks in the options hash, which\n      are passed <tt>(model, response)</tt> as arguments.\n    </p><pre>\n// Poll every 10 seconds to keep the channel model up-to-date.\nsetInterval(function() {\n  channel.fetch();\n}, 10000);\n</pre>"
        }
      },
      "#Model-save":{
        "title":"save",
        "hash":"#Model-save",
        "content":{
          "header":"Model.save",
          "body":"<p id=\"Model-save\">\n      <b class=\"header\">save</b><code>model.save([attributes], [options])</code>\n      <br></br>\n      Save a model to your database (or alternative persistence layer),\n      by delegating to <a href=\"#Sync\">Backbone.sync</a>.  Returns a\n      <a href=\"http://api.jquery.com/jQuery.ajax/#jqXHR\">jqXHR</a> if\n      validation is successful and <tt>false</tt> otherwise. The <b>attributes</b>\n      hash (as in <a href=\"#Model-set\">set</a>) should contain the attributes\n      you'd like to change -; keys that aren't mentioned won't be altered -; but,\n      a <i>complete representation</i> of the resource will be sent to the server.\n      As with <tt>set</tt>, you may pass individual keys and values instead of a hash.\n      If the model has a <a href=\"#Model-validate\">validate</a>\n      method, and validation fails, the model will not be saved. If the model\n      <a href=\"#Model-isNew\">isNew</a>, the save will be a <tt>\"create\"</tt>\n      (HTTP <tt>POST</tt>), if the model already\n      exists on the server, the save will be an <tt>\"update\"</tt> (HTTP <tt>PUT</tt>).\n    </p><p>\n      Calling <tt>save</tt> with new attributes will cause a <tt>\"change\"</tt>\n      event immediately, and a <tt>\"sync\"</tt> event after the server has acknowledged\n      the successful change. Pass <tt>{wait: true}</tt> if you'd like to wait\n      for the server before setting the new attributes on the model.\n    </p><p>\n      In the following example, notice how our overridden version\n      of <tt>Backbone.sync</tt> receives a <tt>\"create\"</tt> request\n      the first time the model is saved and an <tt>\"update\"</tt>\n      request the second time.\n    </p><pre class=\"runnable\">\nBackbone.sync = function(method, model) {\n  alert(method + \": \" + JSON.stringify(model));\n  model.id = 1;\n};\n\nvar book = new Backbone.Model({\n  title: \"The Rough Riders\",\n  author: \"Theodore Roosevelt\"\n});\n\nbook.save();\n\nbook.save({author: \"Teddy\"});\n</pre><p>\n      <b>save</b> accepts <tt>success</tt> and <tt>error</tt> callbacks in the\n      options hash, which are passed <tt>(model, response)</tt> as arguments.\n      The <tt>error</tt> callback will also be invoked if the model has a\n      <tt>validate</tt> method, and validation fails. If a server-side\n      validation fails, return a non-<tt>200</tt> HTTP response code, along with\n      an error response in text or JSON.\n    </p><pre>\nbook.save(\"author\", \"F.D.R.\", {error: function(){ ... }});\n</pre>"
        }
      },
      "#Model-destroy":{
        "title":"destroy",
        "hash":"#Model-destroy",
        "content":{
          "header":"Model.destroy",
          "body":"<p id=\"Model-destroy\">\n      <b class=\"header\">destroy</b><code>model.destroy([options])</code>\n      <br></br>\n      Destroys the model on the server by delegating an HTTP <tt>DELETE</tt>\n      request to <a href=\"#Sync\">Backbone.sync</a>. Returns a\n      <a href=\"http://api.jquery.com/jQuery.ajax/#jqXHR\">jqXHR</a> object, or\n      <tt>false</tt> if the model <a href=\"#Model-isNew\">isNew</a>. Accepts\n      <tt>success</tt> and <tt>error</tt> callbacks in the options hash.\n      Triggers a <tt>\"destroy\"</tt> event on the model, which will bubble up\n      through any collections that contain it, and a <tt>\"sync\"</tt> event, after\n      the server has successfully acknowledged the model's deletion. Pass\n      <tt>{wait: true}</tt> if you'd like to wait for the server to respond\n      before removing the model from the collection.\n    </p><pre>\nbook.destroy({success: function(model, response) {\n  ...\n}});\n</pre>"
        }
      },
      "#Model-validate":{
        "title":"validate",
        "hash":"#Model-validate",
        "content":{
          "header":"Model.validate",
          "body":"<p id=\"Model-validate\">\n      <b class=\"header\">validate</b><code>model.validate(attributes)</code>\n      <br></br>\n      This method is left undefined, and you're encouraged to override it with\n      your custom validation logic, if you have any that can be performed\n      in JavaScript. <b>validate</b> is called before <tt>set</tt> and\n      <tt>save</tt>, and is passed the model attributes updated with the values\n      from <tt>set</tt> or <tt>save</tt>.\n      If the attributes are valid, don't return anything from <b>validate</b>;\n      if they are invalid, return an error of your choosing. It\n      can be as simple as a string error message to be displayed, or a complete\n      error object that describes the error programmatically. If <b>validate</b>\n      returns an error, <tt>set</tt> and <tt>save</tt> will not continue, and the\n      model attributes will not be modified.\n      Failed validations trigger an <tt>\"error\"</tt> event.\n    </p><pre class=\"runnable\">\nvar Chapter = Backbone.Model.extend({\n  validate: function(attrs) {\n    if (attrs.end &lt; attrs.start) {\n      return \"can't end before it starts\";\n    }\n  }\n});\n\nvar one = new Chapter({\n  title : \"Chapter One: The Beginning\"\n});\n\none.on(\"error\", function(model, error) {\n  alert(model.get(\"title\") + \" \" + error);\n});\n\none.set({\n  start: 15,\n  end:   10\n});\n</pre><p>\n      <tt>\"error\"</tt> events are useful for providing coarse-grained error\n      messages at the model or collection level, but if you have a specific view\n      that can better handle the error, you may override and suppress the event\n      by passing an <tt>error</tt> callback directly:\n    </p><pre>\naccount.set({access: \"unlimited\"}, {\n  error: function(model, error) {\n    alert(error);\n  }\n});\n</pre>"
        }
      },
      "#Model-isValid":{
        "title":"isValid",
        "hash":"#Model-isValid",
        "content":{
          "header":"Model.isValid",
          "body":"<p id=\"Model-isValid\">\n      <b class=\"header\">isValid</b><code>model.isValid()</code>\n      <br></br>\n      Models may enter an invalid state if you make changes to them silently\n      ... useful when dealing with form input. Call <tt>model.isValid()</tt>\n      to check if the model is currently in a valid state, according to your\n      <tt>validate</tt> function.\n    </p>"
        }
      },
      "#Model-url":{
        "title":"url",
        "hash":"#Model-url",
        "content":{
          "header":"Model.url",
          "body":"<p id=\"Model-url\">\n      <b class=\"header\">url</b><code>model.url()</code>\n      <br></br>\n      Returns the relative URL where the model's resource would be located on\n      the server. If your models are located somewhere else, override this method\n      with the correct logic. Generates URLs of the form: <tt>\"/[collection.url]/[id]\"</tt>,\n      falling back to <tt>\"/[urlRoot]/id\"</tt> if the model is not part of a collection.\n    </p><p>\n      Delegates to <a href=\"#Collection-url\">Collection#url</a> to generate the\n      URL, so make sure that you have it defined, or a <a href=\"#Model-urlRoot\">urlRoot</a>\n      property, if all models of this class share a common root URL.\n      A model with an id of <tt>101</tt>, stored in a\n      <a href=\"#Collection\">Backbone.Collection</a> with a <tt>url</tt> of <tt>\"/documents/7/notes\"</tt>,\n      would have this URL: <tt>\"/documents/7/notes/101\"</tt>\n    </p>"
        }
      },
      "#Model-urlRoot":{
        "title":"urlRoot",
        "hash":"#Model-urlRoot",
        "content":{
          "header":"Model.urlRoot",
          "body":"<p id=\"Model-urlRoot\">\n      <b class=\"header\">urlRoot</b><code>model.urlRoot or model.urlRoot()</code>\n      <br></br>\n      Specify a <tt>urlRoot</tt> if you're using a model outside of a collection,\n      to enable the default <a href=\"#Model-url\">url</a> function to generate\n      URLs based on the model id. <tt>\"/[urlRoot]/id\"</tt><br></br>\n      Note that <tt>urlRoot</tt> may also be defined as a function.\n    </p><pre class=\"runnable\">\nvar Book = Backbone.Model.extend({urlRoot : '/books'});\n\nvar solaris = new Book({id: \"1083-lem-solaris\"});\n\nalert(solaris.url());\n</pre>"
        }
      },
      "#Model-parse":{
        "title":"parse",
        "hash":"#Model-parse",
        "content":{
          "header":"Model.parse",
          "body":"<p id=\"Model-parse\">\n      <b class=\"header\">parse</b><code>model.parse(response)</code>\n      <br></br>\n      <b>parse</b> is called whenever a model's data is returned by the\n      server, in <a href=\"#Model-fetch\">fetch</a>, and <a href=\"#Model-save\">save</a>.\n      The function is passed the raw <tt>response</tt> object, and should return\n      the attributes hash to be <a href=\"#Model-set\">set</a> on the model. The\n      default implementation is a no-op, simply passing through the JSON response.\n      Override this if you need to work with a preexisting API, or better namespace\n      your responses.\n    </p><p>\n      If you're working with a Rails backend, you'll notice that Rails' default\n      <tt>to_json</tt> implementation includes a model's attributes under a\n      namespace. To disable this behavior for seamless Backbone integration, set:\n    </p><pre>\nActiveRecord::Base.include_root_in_json = false\n</pre>"
        }
      },
      "#Model-clone":{
        "title":"clone",
        "hash":"#Model-clone",
        "content":{
          "header":"Model.clone",
          "body":"<p id=\"Model-clone\">\n      <b class=\"header\">clone</b><code>model.clone()</code>\n      <br></br>\n      Returns a new instance of the model with identical attributes.\n    </p>"
        }
      },
      "#Model-isNew":{
        "title":"isNew",
        "hash":"#Model-isNew",
        "content":{
          "header":"Model.isNew",
          "body":"<p id=\"Model-isNew\">\n      <b class=\"header\">isNew</b><code>model.isNew()</code>\n      <br></br>\n      Has this model been saved to the server yet? If the model does not yet have\n      an <tt>id</tt>, it is considered to be new.\n    </p>"
        }
      },
      "#Model-change":{
        "title":"change",
        "hash":"#Model-change",
        "content":{
          "header":"Model.change",
          "body":"<p id=\"Model-change\">\n      <b class=\"header\">change</b><code>model.change()</code>\n      <br></br>\n      Manually trigger the <tt>\"change\"</tt> event and a <tt>\"change:attribute\"</tt>\n      event for each attribute that has changed. If you've been passing\n      <tt>{silent: true}</tt> to the <a href=\"#Model-set\">set</a> function in order to\n      aggregate rapid changes to a model, you'll want to call <tt>model.change()</tt>\n      when you're all finished.\n    </p>"
        }
      },
      "#Model-hasChanged":{
        "title":"hasChanged",
        "hash":"#Model-hasChanged",
        "content":{
          "header":"Model.hasChanged",
          "body":"<p id=\"Model-hasChanged\">\n      <b class=\"header\">hasChanged</b><code>model.hasChanged([attribute])</code>\n      <br></br>\n      Has the model changed since the last <tt>\"change\"</tt> event? If an <b>attribute</b>\n      is passed, returns <tt>true</tt> if that specific attribute has changed.\n    </p><p class=\"warning\">\n      Note that this method, and the following change-related ones,\n      are only useful during the course of a <tt>\"change\"</tt> event.\n    </p><pre>\nbook.on(\"change\", function() {\n  if (book.hasChanged(\"title\")) {\n    ...\n  }\n});\n</pre>"
        }
      },
      "#Model-changedAttributes":{
        "title":"changedAttributes",
        "hash":"#Model-changedAttributes",
        "content":{
          "header":"Model.changedAttributes",
          "body":"<p id=\"Model-changedAttributes\">\n      <b class=\"header\">changedAttributes</b><code>model.changedAttributes([attributes])</code>\n      <br></br>\n      Retrieve a hash of only the model's attributes that have changed. Optionally,\n      an external <b>attributes</b> hash can be passed in, returning\n      the attributes in that hash which differ from the model. This can be used\n      to figure out which portions of a view should be updated, or what calls\n      need to be made to sync the changes to the server.\n    </p>"
        }
      },
      "#Model-previous":{
        "title":"previous",
        "hash":"#Model-previous",
        "content":{
          "header":"Model.previous",
          "body":"<p id=\"Model-previous\">\n      <b class=\"header\">previous</b><code>model.previous(attribute)</code>\n      <br></br>\n      During a <tt>\"change\"</tt> event, this method can be used to get the\n      previous value of a changed attribute.\n    </p><pre class=\"runnable\">\nvar bill = new Backbone.Model({\n  name: \"Bill Smith\"\n});\n\nbill.on(\"change:name\", function(model, name) {\n  alert(\"Changed name from \" + bill.previous(\"name\") + \" to \" + name);\n});\n\nbill.set({name : \"Bill Jones\"});\n</pre>"
        }
      },
      "#Model-previousAttributes":{
        "title":"previousAttributes",
        "hash":"#Model-previousAttributes",
        "content":{
          "header":"Model.previousAttributes",
          "body":"<p id=\"Model-previousAttributes\">\n      <b class=\"header\">previousAttributes</b><code>model.previousAttributes()</code>\n      <br></br>\n      Return a copy of the model's previous attributes. Useful for getting a\n      diff between versions of a model, or getting back to a valid state after\n      an error occurs.\n    </p>"
        }
      }
    }
  },
  "#Collection":{
    "title":"Collection",
    "hash":"#Collection",
    "content":{
      "header":"Collection",
      "body":"<h2 id=\"Collection\">Backbone.Collection</h2><p>\n      Collections are ordered sets of models. You can bind <tt>\"change\"</tt> events\n      to be notified when any model in the collection has been modified,\n      listen for <tt>\"add\"</tt> and <tt>\"remove\"</tt> events, <tt>fetch</tt>\n      the collection from the server, and use a full suite of\n      <a href=\"#Collection-Underscore-Methods\">Underscore.js methods</a>.\n    </p><p>\n      Any event that is triggered on a model in a collection will also be\n      triggered on the collection directly, for convenience.\n      This allows you to listen for changes to specific attributes in any\n      model in a collection, for example:\n      <tt>Documents.on(\"change:selected\", ...)</tt>\n    </p>"
    },
    "sections":{
      "#Collection-extend":{
        "title":"extend",
        "hash":"#Collection-extend",
        "content":{
          "header":"Collection.extend",
          "body":"<p id=\"Collection-extend\">\n      <b class=\"header\">extend</b><code>Backbone.Collection.extend(properties, [classProperties])</code>\n      <br></br>\n      To create a <b>Collection</b> class of your own, extend <b>Backbone.Collection</b>,\n      providing instance <b>properties</b>, as well as optional <b>classProperties</b> to be attached\n      directly to the collection's constructor function.\n    </p>"
        }
      },
      "#Collection-model":{
        "title":"model",
        "hash":"#Collection-model",
        "content":{
          "header":"Collection.model",
          "body":"<p id=\"Collection-model\">\n      <b class=\"header\">model</b><code>collection.model</code>\n      <br></br>\n      Override this property to specify the model class that the collection\n      contains. If defined, you can pass raw attributes objects (and arrays) to\n      <a href=\"#Collection-add\">add</a>, <a href=\"#Collection-create\">create</a>,\n      and <a href=\"#Collection-reset\">reset</a>, and the attributes will be\n      converted into a model of the proper type.\n    </p><pre>\nvar Library = Backbone.Collection.extend({\n  model: Book\n});\n</pre>"
        }
      },
      "#Collection-constructor":{
        "title":"constructor / initialize",
        "hash":"#Collection-constructor",
        "content":{
          "header":"Collection.constructor",
          "body":"<p id=\"Collection-constructor\">\n      <b class=\"header\">constructor / initialize</b><code>new Collection([models], [options])</code>\n      <br></br>\n      When creating a Collection, you may choose to pass in the initial array of <b>models</b>.\n      The collection's <a href=\"#Collection-comparator\">comparator</a> function\n      may be included as an option. If you define an <b>initialize</b> function, it will be\n      invoked when the collection is created.\n    </p><pre>\nvar tabs = new TabSet([tab1, tab2, tab3]);\n</pre>"
        }
      },
      "#Collection-models":{
        "title":"models",
        "hash":"#Collection-models",
        "content":{
          "header":"Collection.models",
          "body":"<p id=\"Collection-models\">\n      <b class=\"header\">models</b><code>collection.models</code>\n      <br></br>\n      Raw access to the JavaScript array of models inside of the collection. Usually you'll\n      want to use <tt>get</tt>, <tt>at</tt>, or the <b>Underscore methods</b>\n      to access model objects, but occasionally a direct reference to the array\n      is desired.\n    </p>"
        }
      },
      "#Collection-toJSON":{
        "title":"toJSON",
        "hash":"#Collection-toJSON",
        "content":{
          "header":"Collection.toJSON",
          "body":"<p id=\"Collection-toJSON\">\n      <b class=\"header\">toJSON</b><code>collection.toJSON()</code>\n      <br></br>\n      Return an array containing the attributes hash of each model in the\n      collection. This can be used to serialize and persist the\n      collection as a whole. The name of this method is a bit confusing, because\n      it conforms to\n      <a href=\"https://developer.mozilla.org/en/JSON#toJSON()_method\">JavaScript's JSON API</a>.\n    </p><pre class=\"runnable\">\nvar collection = new Backbone.Collection([\n  {name: \"Tim\", age: 5},\n  {name: \"Ida\", age: 26},\n  {name: \"Rob\", age: 55}\n]);\n\nalert(JSON.stringify(collection));\n</pre>"
        }
      },
      "#Collection-Underscore-Methods":{
        "title":"Underscore Methods (28)",
        "hash":"#Collection-Underscore-Methods",
        "content":{
          "header":"Collection.Underscore-Methods",
          "body":"<p id=\"Collection-Underscore-Methods\">\n      <b class=\"header\">Underscore Methods (28)</b>\n      <br></br>\n      Backbone proxies to <b>Underscore.js</b> to provide 28 iteration functions\n      on <b>Backbone.Collection</b>. They aren't all documented here, but\n      you can take a look at the Underscore documentation for the full details...;\n    </p><ul class=\"small\">\n      <li><a href=\"http://documentcloud.github.com/underscore/#each\">forEach (each)</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#map\">map</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#reduce\">reduce (foldl, inject)</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#reduceRight\">reduceRight (foldr)</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#find\">find (detect)</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#filter\">filter (select)</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#reject\">reject</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#all\">every (all)</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#any\">some (any)</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#include\">include</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#invoke\">invoke</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#max\">max</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#min\">min</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#sortBy\">sortBy</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#groupBy\">groupBy</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#sortedIndex\">sortedIndex</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#shuffle\">shuffle</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#toArray\">toArray</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#size\">size</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#first\">first</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#initial\">initial</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#rest\">rest</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#last\">last</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#without\">without</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#indexOf\">indexOf</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#lastIndexOf\">lastIndexOf</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#isEmpty\">isEmpty</a></li>\n      <li><a href=\"http://documentcloud.github.com/underscore/#chain\">chain</a></li>\n    </ul><pre>\nBooks.each(function(book) {\n  book.publish();\n});\n\nvar titles = Books.map(function(book) {\n  return book.get(\"title\");\n});\n\nvar publishedBooks = Books.filter(function(book) {\n  return book.get(\"published\") === true;\n});\n\nvar alphabetical = Books.sortBy(function(book) {\n  return book.author.get(\"name\").toLowerCase();\n});\n</pre>"
        }
      },
      "#Collection-add":{
        "title":"add",
        "hash":"#Collection-add",
        "content":{
          "header":"Collection.add",
          "body":"<p id=\"Collection-add\">\n      <b class=\"header\">add</b><code>collection.add(models, [options])</code>\n      <br></br>\n      Add a model (or an array of models) to the collection. Fires an <tt>\"add\"</tt>\n      event, which you can pass <tt>{silent: true}</tt> to suppress. If a\n      <a href=\"#Collection-model\">model</a> property is defined, you may also pass\n      raw attributes objects, and have them be vivified as instances of the model.\n      Pass <tt>{at: index}</tt> to splice the model into the collection at the\n      specified <tt>index</tt>. Likewise, if you're a callback listening to a\n      collection's <tt>\"add\"</tt> event, <tt>options.index</tt> will tell you the\n      index at which the model is being added to the collection.\n    </p><pre class=\"runnable\">\nvar ships = new Backbone.Collection;\n\nships.on(\"add\", function(ship) {\n  alert(\"Ahoy \" + ship.get(\"name\") + \"!\");\n});\n\nships.add([\n  {name: \"Flying Dutchman\"},\n  {name: \"Black Pearl\"}\n]);\n</pre>"
        }
      },
      "#Collection-remove":{
        "title":"remove",
        "hash":"#Collection-remove",
        "content":{
          "header":"Collection.remove",
          "body":"<p id=\"Collection-remove\">\n      <b class=\"header\">remove</b><code>collection.remove(models, [options])</code>\n      <br></br>\n      Remove a model (or an array of models) from the collection. Fires a\n      <tt>\"remove\"</tt> event, which you can use <tt>silent</tt>\n      to suppress. If you're a callback listening to the <tt>\"remove\"</tt> event,\n      the index at which the model is being removed from the collection is available\n      as <tt>options.index</tt>.\n    </p>"
        }
      },
      "#Collection-get":{
        "title":"get",
        "hash":"#Collection-get",
        "content":{
          "header":"Collection.get",
          "body":"<p id=\"Collection-get\">\n      <b class=\"header\">get</b><code>collection.get(id)</code>\n      <br></br>\n      Get a model from a collection, specified by <b>id</b>.\n    </p><pre>\nvar book = Library.get(110);\n</pre>"
        }
      },
      "#Collection-getByCid":{
        "title":"getByCid",
        "hash":"#Collection-getByCid",
        "content":{
          "header":"Collection.getByCid",
          "body":"<p id=\"Collection-getByCid\">\n      <b class=\"header\">getByCid</b><code>collection.getByCid(cid)</code>\n      <br></br>\n      Get a model from a collection, specified by client id. The client id\n      is the <tt>.cid</tt> property of the model, automatically assigned whenever\n      a model is created. Useful for models which have not yet been saved to\n      the server, and do not yet have true ids.\n    </p>"
        }
      },
      "#Collection-at":{
        "title":"at",
        "hash":"#Collection-at",
        "content":{
          "header":"Collection.at",
          "body":"<p id=\"Collection-at\">\n      <b class=\"header\">at</b><code>collection.at(index)</code>\n      <br></br>\n      Get a model from a collection, specified by index. Useful if your collection\n      is sorted, and if your collection isn't sorted, <b>at</b> will still\n      retrieve models in insertion order.\n    </p>"
        }
      },
      "#Collection-push":{
        "title":"push",
        "hash":"#Collection-push",
        "content":{
          "header":"Collection.push",
          "body":"<p id=\"Collection-push\">\n      <b class=\"header\">push</b><code>collection.push(model, [options])</code>\n      <br></br>\n      Add a model at the end of a collection. Takes the same options as\n      <a href=\"#Collection-add\">add</a>.\n    </p>"
        }
      },
      "#Collection-pop":{
        "title":"pop",
        "hash":"#Collection-pop",
        "content":{
          "header":"Collection.pop",
          "body":"<p id=\"Collection-pop\">\n      <b class=\"header\">pop</b><code>collection.pop([options])</code>\n      <br></br>\n      Remove and return the last model from a collection. Takes the same options as\n      <a href=\"#Collection-remove\">remove</a>.\n    </p>"
        }
      },
      "#Collection-unshift":{
        "title":"unshift",
        "hash":"#Collection-unshift",
        "content":{
          "header":"Collection.unshift",
          "body":"<p id=\"Collection-unshift\">\n      <b class=\"header\">unshift</b><code>collection.unshift(model, [options])</code>\n      <br></br>\n      Add a model at the beginning of a collection. Takes the same options as\n      <a href=\"#Collection-add\">add</a>.\n    </p>"
        }
      },
      "#Collection-shift":{
        "title":"shift",
        "hash":"#Collection-shift",
        "content":{
          "header":"Collection.shift",
          "body":"<p id=\"Collection-shift\">\n      <b class=\"header\">shift</b><code>collection.shift([options])</code>\n      <br></br>\n      Remove and return the first model from a collection. Takes the same options as\n      <a href=\"#Collection-remove\">remove</a>.\n    </p>"
        }
      },
      "#Collection-length":{
        "title":"length",
        "hash":"#Collection-length",
        "content":{
          "header":"Collection.length",
          "body":"<p id=\"Collection-length\">\n      <b class=\"header\">length</b><code>collection.length</code>\n      <br></br>\n      Like an array, a Collection maintains a <tt>length</tt> property, counting\n      the number of models it contains.\n    </p>"
        }
      },
      "#Collection-comparator":{
        "title":"comparator",
        "hash":"#Collection-comparator",
        "content":{
          "header":"Collection.comparator",
          "body":"<p id=\"Collection-comparator\">\n      <b class=\"header\">comparator</b><code>collection.comparator</code>\n      <br></br>\n      By default there is no <b>comparator</b> function on a collection.\n      If you define a comparator, it will be used to maintain\n      the collection in sorted order. This means that as models are added,\n      they are inserted at the correct index in <tt>collection.models</tt>.\n      Comparator function can be defined as either a\n      <a href=\"http://underscorejs.org/#sortBy\">sortBy</a>\n      (pass a function that takes a single argument),\n      or as a\n      <a href=\"https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort\">sort</a>\n      (pass a comparator function that expects two arguments).\n    </p><p>\n      \"sortBy\" comparator functions take a model and return a numeric or string\n      value by which the model should be ordered relative to others.\n      \"sort\" comparator functions take two models, and return <tt>-1</tt> if\n      the first model should come before the second, <tt>0</tt> if they are of\n      the same rank and <tt>1</tt> if the first model should come after.\n    </p><p>\n      Note how even though all of the chapters in this example are added backwards,\n      they come out in the proper order:\n    </p><pre class=\"runnable\">\nvar Chapter  = Backbone.Model;\nvar chapters = new Backbone.Collection;\n\nchapters.comparator = function(chapter) {\n  return chapter.get(\"page\");\n};\n\nchapters.add(new Chapter({page: 9, title: \"The End\"}));\nchapters.add(new Chapter({page: 5, title: \"The Middle\"}));\nchapters.add(new Chapter({page: 1, title: \"The Beginning\"}));\n\nalert(chapters.pluck('title'));\n</pre><p class=\"warning\">\n      Collections with comparator functions will not automatically re-sort if you\n      later change model attributes, so you may wish to call <tt>sort</tt> after\n      changing model attributes that would affect the order.\n    </p>"
        }
      },
      "#Collection-sort":{
        "title":"sort",
        "hash":"#Collection-sort",
        "content":{
          "header":"Collection.sort",
          "body":"<p id=\"Collection-sort\">\n      <b class=\"header\">sort</b><code>collection.sort([options])</code>\n      <br></br>\n      Force a collection to re-sort itself. You don't need to call this under\n      normal circumstances, as a collection with a <a href=\"#Collection-comparator\">comparator</a> function\n      will maintain itself in proper sort order at all times. Calling <b>sort</b>\n      triggers the collection's <tt>\"reset\"</tt> event, unless silenced by passing\n      <tt>{silent: true}</tt>\n    </p>"
        }
      },
      "#Collection-pluck":{
        "title":"pluck",
        "hash":"#Collection-pluck",
        "content":{
          "header":"Collection.pluck",
          "body":"<p id=\"Collection-pluck\">\n      <b class=\"header\">pluck</b><code>collection.pluck(attribute)</code>\n      <br></br>\n      Pluck an attribute from each model in the collection. Equivalent to calling\n      <tt>map</tt>, and returning a single attribute from the iterator.\n    </p><pre class=\"runnable\">\nvar stooges = new Backbone.Collection([\n  {name: \"Curly\"},\n  {name: \"Larry\"},\n  {name: \"Moe\"}\n]);\n\nvar names = stooges.pluck(\"name\");\n\nalert(JSON.stringify(names));\n</pre>"
        }
      },
      "#Collection-where":{
        "title":"where",
        "hash":"#Collection-where",
        "content":{
          "header":"Collection.where",
          "body":"<p id=\"Collection-where\">\n      <b class=\"header\">where</b><code>collection.where(attributes)</code>\n      <br></br>\n      Return an array of all the models in a collection that match the\n      passed <b>attributes</b>. Useful for simple cases of <tt>filter</tt>.\n    </p><pre class=\"runnable\">\nvar friends = new Backbone.Collection([\n  {name: \"Athos\",      job: \"Musketeer\"},\n  {name: \"Porthos\",    job: \"Musketeer\"},\n  {name: \"Aramis\",     job: \"Musketeer\"},\n  {name: \"d'Artagnan\", job: \"Guard\"},\n]);\n\nvar musketeers = friends.where({job: \"Musketeer\"});\n\nalert(musketeers.length);\n</pre>"
        }
      },
      "#Collection-url":{
        "title":"url",
        "hash":"#Collection-url",
        "content":{
          "header":"Collection.url",
          "body":"<p id=\"Collection-url\">\n      <b class=\"header\">url</b><code>collection.url or collection.url()</code>\n      <br></br>\n      Set the <b>url</b> property (or function) on a collection to reference\n      its location on the server. Models within the collection will use <b>url</b>\n      to construct URLs of their own.\n    </p><pre>\nvar Notes = Backbone.Collection.extend({\n  url: '/notes'\n});\n\n// Or, something more sophisticated:\n\nvar Notes = Backbone.Collection.extend({\n  url: function() {\n    return this.document.url() + '/notes';\n  }\n});\n</pre>"
        }
      },
      "#Collection-parse":{
        "title":"parse",
        "hash":"#Collection-parse",
        "content":{
          "header":"Collection.parse",
          "body":"<p id=\"Collection-parse\">\n      <b class=\"header\">parse</b><code>collection.parse(response)</code>\n      <br></br>\n      <b>parse</b> is called by Backbone whenever a collection's models are\n      returned by the server, in <a href=\"#Collection-fetch\">fetch</a>.\n      The function is passed the raw <tt>response</tt> object, and should return\n      the array of model attributes to be <a href=\"#Collection-add\">added</a>\n      to the collection. The default implementation is a no-op, simply passing\n      through the JSON response. Override this if you need to work with a\n      preexisting API, or better namespace your responses. Note that afterwards,\n      if your model class already has a <tt>parse</tt> function, it will be\n      run against each fetched model.\n    </p><pre>\nvar Tweets = Backbone.Collection.extend({\n  // The Twitter Search API returns tweets under \"results\".\n  parse: function(response) {\n    return response.results;\n  }\n});\n</pre>"
        }
      },
      "#Collection-fetch":{
        "title":"fetch",
        "hash":"#Collection-fetch",
        "content":{
          "header":"Collection.fetch",
          "body":"<p id=\"Collection-fetch\">\n      <b class=\"header\">fetch</b><code>collection.fetch([options])</code>\n      <br></br>\n      Fetch the default set of models for this collection from the server,\n      resetting the collection when they arrive. The <b>options</b> hash takes\n      <tt>success</tt> and <tt>error</tt>\n      callbacks which will be passed <tt>(collection, response)</tt> as arguments.\n      When the model data returns from the server, the collection will\n      <a href=\"#Collection-reset\">reset</a>.\n      Delegates to <a href=\"#Sync\">Backbone.sync</a>\n      under the covers for custom persistence strategies and returns a\n      <a href=\"http://api.jquery.com/jQuery.ajax/#jqXHR\">jqXHR</a>.\n      The server handler for <b>fetch</b> requests should return a JSON array of\n      models.\n    </p><pre class=\"runnable\">\nBackbone.sync = function(method, model) {\n  alert(method + \": \" + model.url);\n};\n\nvar Accounts = new Backbone.Collection;\nAccounts.url = '/accounts';\n\nAccounts.fetch();\n</pre><p>\n      If you'd like to add the incoming models to the current collection, instead\n      of replacing the collection's contents, pass <tt>{add: true}</tt> as an\n      option to <b>fetch</b>.\n    </p><p>\n      <b>jQuery.ajax</b> options can also be passed directly as <b>fetch</b> options,\n      so to fetch a specific page of a paginated collection:\n      <tt>Documents.fetch({data: {page: 3}})</tt>\n    </p><p>\n      Note that <b>fetch</b> should not be used to populate collections on\n      page load -; all models needed at load time should already be\n      <a href=\"#FAQ-bootstrap\">bootstrapped</a> in to place. <b>fetch</b> is\n      intended for lazily-loading models for interfaces that are not needed\n      immediately: for example, documents with collections of notes that may be\n      toggled open and closed.\n    </p>"
        }
      },
      "#Collection-reset":{
        "title":"reset",
        "hash":"#Collection-reset",
        "content":{
          "header":"Collection.reset",
          "body":"<p id=\"Collection-reset\">\n      <b class=\"header\">reset</b><code>collection.reset(models, [options])</code>\n      <br></br>\n      Adding and removing models one at a time is all well and good, but sometimes\n      you have so many models to change that you'd rather just update the collection\n      in bulk. Use <b>reset</b> to replace a collection with a new list\n      of models (or attribute hashes), triggering a single <tt>\"reset\"</tt> event\n      at the end. Pass <tt>{silent: true}</tt> to suppress the <tt>\"reset\"</tt> event.\n      Using reset with no arguments is useful as a way to empty the collection.\n    </p><p>\n      Here's an example using <b>reset</b> to bootstrap a collection during initial page load,\n      in a Rails application.\n    </p><pre>\n&lt;script&gt;\n  var Accounts = new Backbone.Collection;\n  Accounts.reset(&lt;%= @accounts.to_json %&gt;);\n&lt;/script&gt;\n</pre><p>\n      Calling <tt>collection.reset()</tt> without passing any models as arguments\n      will empty the entire collection.\n    </p>"
        }
      },
      "#Collection-create":{
        "title":"create",
        "hash":"#Collection-create",
        "content":{
          "header":"Collection.create",
          "body":"<p id=\"Collection-create\">\n      <b class=\"header\">create</b><code>collection.create(attributes, [options])</code>\n      <br></br>\n      Convenience to create a new instance of a model within a collection.\n      Equivalent to instantiating a model with a hash of attributes,\n      saving the model to the server, and adding the model to the set after being\n      successfully created. Returns\n      the model, or <tt>false</tt> if a validation error prevented the\n      model from being created. In order for this to work, you should set the\n      <a href=\"#Collection-model\">model</a> property of the collection.\n      The <b>create</b> method can accept either an attributes hash or an\n      existing, unsaved model object.\n    </p><p>\n      Creating a model will cause an immediate <tt>\"add\"</tt> event to be\n      triggered on the collection, as well as a <tt>\"sync\"</tt> event, once the\n      model has been successfully created on the server. Pass <tt>{wait: true}</tt>\n      if you'd like to wait for the server before adding the new model to the collection.\n    </p><pre>\nvar Library = Backbone.Collection.extend({\n  model: Book\n});\n\nvar NYPL = new Library;\n\nvar othello = NYPL.create({\n  title: \"Othello\",\n  author: \"William Shakespeare\"\n});\n</pre>"
        }
      }
    }
  },
  "#Router":{
    "title":"Router",
    "hash":"#Router",
    "content":{
      "header":"Router",
      "body":"<h2 id=\"Router\">Backbone.Router</h2><p>\n      Web applications often provide linkable, bookmarkable, shareable URLs for\n      important locations in the app. Until recently, hash fragments\n      (<tt>#page</tt>) were used to provide these permalinks, but with the\n      arrival of the History API, it's now possible to use standard URLs (<tt>/page</tt>).\n      <b>Backbone.Router</b> provides methods for routing client-side pages, and\n      connecting them to actions and events. For browsers which don't yet support\n      the History API, the Router handles graceful fallback and transparent\n      translation to the fragment version of the URL.\n    </p><p>\n      During page load, after your application has finished creating all of its routers,\n      be sure to call <tt>Backbone.history.start()</tt>, or\n      <tt>Backbone.history.start({pushState: true})</tt> to route the initial URL.\n    </p>"
    },
    "sections":{
      "#Router-extend":{
        "title":"extend",
        "hash":"#Router-extend",
        "content":{
          "header":"Router.extend",
          "body":"<p id=\"Router-extend\">\n      <b class=\"header\">extend</b><code>Backbone.Router.extend(properties, [classProperties])</code>\n      <br></br>\n      Get started by creating a custom router class. Define actions that are\n      triggered when certain URL fragments are\n      matched, and provide a <a href=\"#Router-routes\">routes</a> hash\n      that pairs routes to actions. Note that you'll want to avoid using a\n      leading slash in your route definitions:\n    </p><pre>\nvar Workspace = Backbone.Router.extend({\n\n  routes: {\n    \"help\":                 \"help\",    // #help\n    \"search/:query\":        \"search\",  // #search/kiwis\n    \"search/:query/p:page\": \"search\"   // #search/kiwis/p7\n  },\n\n  help: function() {\n    ...\n  },\n\n  search: function(query, page) {\n    ...\n  }\n\n});\n</pre>"
        }
      },
      "#Router-routes":{
        "title":"routes",
        "hash":"#Router-routes",
        "content":{
          "header":"Router.routes",
          "body":"<p id=\"Router-routes\">\n      <b class=\"header\">routes</b><code>router.routes</code>\n      <br></br>\n      The routes hash maps URLs with parameters to functions on your router,\n      similar to the <a href=\"#View\">View</a>'s <a href=\"#View-delegateEvents\">events hash</a>.\n      Routes can contain parameter parts, <tt>:param</tt>, which match a single URL\n      component between slashes; and splat parts <tt>*splat</tt>, which can match\n      any number of URL components.\n    </p><p>\n      For example, a route of <tt>\"search/:query/p:page\"</tt> will match\n      a fragment of <tt>#search/obama/p2</tt>, passing <tt>\"obama\"</tt>\n      and <tt>\"2\"</tt> to the action. A route of <tt>\"file/*path\"</tt> will\n      match <tt>#file/nested/folder/file.txt</tt>,\n      passing <tt>\"nested/folder/file.txt\"</tt> to the action.\n    </p><p>\n      When the visitor presses the back button, or enters a URL, and a particular\n      route is matched, the name of the action will be fired as an\n      <a href=\"#Events\">event</a>, so that other objects can listen to the router,\n      and be notified. In the following example, visiting <tt>#help/uploading</tt>\n      will fire a <tt>route:help</tt> event from the router.\n    </p><pre>\nroutes: {\n  \"help/:page\":         \"help\",\n  \"download/*path\":     \"download\",\n  \"folder/:name\":       \"openFolder\",\n  \"folder/:name-:mode\": \"openFolder\"\n}\n</pre><pre>\nrouter.on(\"route:help\", function(page) {\n  ...\n});\n</pre>"
        }
      },
      "#Router-constructor":{
        "title":"constructor / initialize",
        "hash":"#Router-constructor",
        "content":{
          "header":"Router.constructor",
          "body":"<p id=\"Router-constructor\">\n      <b class=\"header\">constructor / initialize</b><code>new Router([options])</code>\n      <br></br>\n      When creating a new router, you may pass its\n      <a href=\"#Router-routes\">routes</a> hash directly as an option, if you\n      choose. All <tt>options</tt> will also be passed to your <tt>initialize</tt>\n      function, if defined.\n    </p>"
        }
      },
      "#Router-route":{
        "title":"route",
        "hash":"#Router-route",
        "content":{
          "header":"Router.route",
          "body":"<p id=\"Router-route\">\n      <b class=\"header\">route</b><code>router.route(route, name, [callback])</code>\n      <br></br>\n      Manually create a route for the router, The <tt>route</tt> argument may\n      be a <a href=\"#Router-routes\">routing string</a> or regular expression.\n      Each matching capture from the route or regular expression will be passed as\n      an argument to the callback. The <tt>name</tt> argument will be triggered as\n      a <tt>\"route:name\"</tt> event whenever the route is matched.  If the\n      <tt>callback</tt> argument is omitted <tt>router[name]</tt> will be used\n      instead.\n    </p><pre>\ninitialize: function(options) {\n\n  // Matches #page/10, passing \"10\"\n  this.route(\"page/:number\", \"page\", function(number){ ... });\n\n  // Matches /117-a/b/c/open, passing \"117-a/b/c\" to this.open\n  this.route(/^(.*?)\\/open$/, \"open\");\n\n},\n\nopen: function(id) { ... }\n</pre>"
        }
      },
      "#Router-navigate":{
        "title":"navigate",
        "hash":"#Router-navigate",
        "content":{
          "header":"Router.navigate",
          "body":"<p id=\"Router-navigate\">\n      <b class=\"header\">navigate</b><code>router.navigate(fragment, [options])</code>\n      <br></br>\n      Whenever you reach a point in your application that you'd like to save\n      as a URL, call <b>navigate</b> in order to update the URL.\n      If you wish to also call the route function, set the <b>trigger</b>\n      option to <tt>true</tt>.\n      To update the URL without creating an entry in the browser's history,\n      set the <b>replace</b> option to <tt>true</tt>.\n    </p><pre>\nopenPage: function(pageNumber) {\n  this.document.pages.at(pageNumber).open();\n  this.navigate(\"page/\" + pageNumber);\n}\n\n# Or ...\n\napp.navigate(\"help/troubleshooting\", {trigger: true});\n\n# Or ...\n\napp.navigate(\"help/troubleshooting\", {trigger: true, replace: true});\n</pre>"
        }
      }
    }
  },
  "#History":{
    "title":"History",
    "hash":"#History",
    "content":{
      "header":"History",
      "body":"<h2 id=\"History\">Backbone.history</h2><p>\n      <b>History</b> serves as a global router (per frame) to handle <tt>hashchange</tt>\n      events or <tt>pushState</tt>, match the appropriate route, and trigger callbacks. You shouldn't\n      ever have to create one of these yourself -; you should use the reference\n      to <tt>Backbone.history</tt> that will be created for you automatically if you make use\n      of <a href=\"#Router\">Routers</a> with <a href=\"#Router-routes\">routes</a>.\n    </p><p>\n      <b>pushState</b> support exists on a purely opt-in basis in Backbone.\n      Older browsers that don't support <tt>pushState</tt> will continue to use\n      hash-based URL fragments, and if a hash URL is visited by a\n      <tt>pushState</tt>-capable browser, it will be transparently upgraded to\n      the true URL. Note that using real URLs requires your web server to be\n      able to correctly render those pages, so back-end changes are required\n      as well. For example, if you have a route of <tt>/documents/100</tt>,\n      your web server must be able to serve that page, if the browser\n      visits that URL directly. For full search-engine crawlability, it's best to\n      have the server generate the complete HTML for the page ... but if it's a web\n      application, just rendering the same content you would have for the root URL,\n      and filling in the rest with Backbone Views and JavaScript works fine.\n    </p>"
    },
    "sections":{
      "#History-start":{
        "title":"start",
        "hash":"#History-start",
        "content":{
          "header":"History.start",
          "body":"<p id=\"History-start\">\n      <b class=\"header\">start</b><code>Backbone.history.start([options])</code>\n      <br></br>\n      When all of your <a href=\"#Router\">Routers</a> have been created,\n      and all of the routes are set up properly, call <tt>Backbone.history.start()</tt>\n      to begin monitoring <tt>hashchange</tt> events, and dispatching routes.\n    </p><p>\n      To indicate that you'd like to use HTML5 <tt>pushState</tt> support in\n      your application, use <tt>Backbone.history.start({pushState: true})</tt>.\n    </p><p>\n      If your application is not being served from the root url <tt>/</tt> of your\n      domain, be sure to tell History where the root really is, as an option:\n      <tt>Backbone.history.start({pushState: true, root: \"/public/search/\"})</tt>\n    </p><p>\n      When called, if a route succeeds with a match for the current URL,\n      <tt>Backbone.history.start()</tt> returns <tt>true</tt>. If no defined\n      route matches the current URL, it returns <tt>false</tt>.\n    </p><p>\n      If the server has already rendered the entire page, and you don't want the\n      initial route to trigger when starting History, pass <tt>silent: true</tt>.\n    </p><p>\n      Because hash-based history in Internet Explorer relies on an\n      <tt>&lt;iframe&gt;</tt>, be sure to only call <tt>start()</tt> after the DOM\n      is ready.\n    </p><pre>\n$(function(){\n  new WorkspaceRouter();\n  new HelpPaneRouter();\n  Backbone.history.start({pushState: true});\n});\n</pre>"
        }
      }
    }
  },
  "#Sync":{
    "title":"Sync",
    "hash":"#Sync",
    "content":{
      "header":"Sync",
      "body":"<h2 id=\"Sync\">Backbone.sync</h2><p>\n      <b>Backbone.sync</b> is the function that Backbone calls every time it\n      attempts to read or save a model to the server. By default, it uses\n      <tt>(jQuery/Zepto).ajax</tt> to make a RESTful JSON request and returns a\n      <a href=\"http://api.jquery.com/jQuery.ajax/#jqXHR\">jqXHR</a>. You can override\n      it in order to use a different persistence strategy, such as WebSockets,\n      XML transport, or Local Storage.\n    </p><p>\n      The method signature of <b>Backbone.sync</b> is <tt>sync(method, model, [options])</tt>\n    </p><ul>\n      <li><b>method</b> – the CRUD method (<tt>\"create\"</tt>, <tt>\"read\"</tt>, <tt>\"update\"</tt>, or <tt>\"delete\"</tt>)</li>\n      <li><b>model</b> – the model to be saved (or collection to be read)</li>\n      <li><b>options</b> – success and error callbacks, and all other jQuery request options</li>\n    </ul><p>\n      With the default implementation, when <b>Backbone.sync</b> sends up a request to save\n      a model, its attributes will be passed, serialized as JSON, and sent in the HTTP body\n      with content-type <tt>application/json</tt>. When returning a JSON response,\n      send down the attributes of the  model that have been changed by the server, and need\n      to be updated on the client. When responding to a <tt>\"read\"</tt> request from a collection\n      (<a href=\"#Collection#fetch\">Collection#fetch</a>), send down an array\n      of model attribute objects.\n    </p><p>\n      The <b>sync</b> function may be overriden globally as <tt>Backbone.sync</tt>,\n      or at a finer-grained level, by adding a <tt>sync</tt> function to a Backbone\n      collection or to an individual model.\n    </p><p>\n      The default <b>sync</b> handler maps CRUD to REST like so:\n    </p><ul>\n      <li><b>create - POST   </b><tt>/collection</tt></li>\n      <li><b>read - GET   </b><tt>/collection[/id]</tt></li>\n      <li><b>update - PUT   </b><tt>/collection/id</tt></li>\n      <li><b>delete - DELETE   </b><tt>/collection/id</tt></li>\n    </ul><p>\n      As an example, a Rails handler responding to an <tt>\"update\"</tt> call from\n      <tt>Backbone</tt> might look like this: <i>(In real code, never use\n      </i><tt>update_attributes</tt><i> blindly, and always whitelist the attributes\n      you allow to be changed.)</i>\n    </p><pre>\ndef update\n  account = Account.find params[:id]\n  account.update_attributes params\n  render :json =&gt; account\nend\n</pre><p>\n      One more tip for Rails integration is to disable the default namespacing for\n      <tt>to_json</tt> calls on models by setting <tt>ActiveRecord::Base.include_root_in_json = false</tt>\n    </p>"
    },
    "sections":{
      "#Sync":{
        "title":"Backbone.sync",
        "hash":"#Sync",
        "content":{
          "header":"Sync",
          "body":"<h2 id=\"Sync\">Backbone.sync</h2><p>\n      <b>Backbone.sync</b> is the function that Backbone calls every time it\n      attempts to read or save a model to the server. By default, it uses\n      <tt>(jQuery/Zepto).ajax</tt> to make a RESTful JSON request and returns a\n      <a href=\"http://api.jquery.com/jQuery.ajax/#jqXHR\">jqXHR</a>. You can override\n      it in order to use a different persistence strategy, such as WebSockets,\n      XML transport, or Local Storage.\n    </p><p>\n      The method signature of <b>Backbone.sync</b> is <tt>sync(method, model, [options])</tt>\n    </p><ul>\n      <li><b>method</b> – the CRUD method (<tt>\"create\"</tt>, <tt>\"read\"</tt>, <tt>\"update\"</tt>, or <tt>\"delete\"</tt>)</li>\n      <li><b>model</b> – the model to be saved (or collection to be read)</li>\n      <li><b>options</b> – success and error callbacks, and all other jQuery request options</li>\n    </ul><p>\n      With the default implementation, when <b>Backbone.sync</b> sends up a request to save\n      a model, its attributes will be passed, serialized as JSON, and sent in the HTTP body\n      with content-type <tt>application/json</tt>. When returning a JSON response,\n      send down the attributes of the  model that have been changed by the server, and need\n      to be updated on the client. When responding to a <tt>\"read\"</tt> request from a collection\n      (<a href=\"#Collection#fetch\">Collection#fetch</a>), send down an array\n      of model attribute objects.\n    </p><p>\n      The <b>sync</b> function may be overriden globally as <tt>Backbone.sync</tt>,\n      or at a finer-grained level, by adding a <tt>sync</tt> function to a Backbone\n      collection or to an individual model.\n    </p><p>\n      The default <b>sync</b> handler maps CRUD to REST like so:\n    </p><ul>\n      <li><b>create - POST   </b><tt>/collection</tt></li>\n      <li><b>read - GET   </b><tt>/collection[/id]</tt></li>\n      <li><b>update - PUT   </b><tt>/collection/id</tt></li>\n      <li><b>delete - DELETE   </b><tt>/collection/id</tt></li>\n    </ul><p>\n      As an example, a Rails handler responding to an <tt>\"update\"</tt> call from\n      <tt>Backbone</tt> might look like this: <i>(In real code, never use\n      </i><tt>update_attributes</tt><i> blindly, and always whitelist the attributes\n      you allow to be changed.)</i>\n    </p><pre>\ndef update\n  account = Account.find params[:id]\n  account.update_attributes params\n  render :json =&gt; account\nend\n</pre><p>\n      One more tip for Rails integration is to disable the default namespacing for\n      <tt>to_json</tt> calls on models by setting <tt>ActiveRecord::Base.include_root_in_json = false</tt>\n    </p>"
        }
      },
      "#Sync-emulateHTTP":{
        "title":"Backbone.emulateHTTP",
        "hash":"#Sync-emulateHTTP",
        "content":{
          "header":"Sync.emulateHTTP",
          "body":"<p id=\"Sync-emulateHTTP\">\n      <b class=\"header\">emulateHTTP</b><code>Backbone.emulateHTTP = true</code>\n      <br></br>\n      If you want to work with a legacy web server that doesn't support Backbones's\n      default REST/HTTP approach, you may choose to turn on <tt>Backbone.emulateHTTP</tt>.\n      Setting this option will fake <tt>PUT</tt> and <tt>DELETE</tt> requests with\n      a HTTP <tt>POST</tt>, setting the <tt>X-HTTP-Method-Override</tt> header\n      with the true method. If <tt>emulateJSON</tt> is also on, the true method\n      will be passed as an additional <tt>_method</tt> parameter.\n    </p><pre>\nBackbone.emulateHTTP = true;\n\nmodel.save();  // POST to \"/collection/id\", with \"_method=PUT\" + header.\n</pre>"
        }
      },
      "#Sync-emulateJSON":{
        "title":"Backbone.emulateJSON",
        "hash":"#Sync-emulateJSON",
        "content":{
          "header":"Sync.emulateJSON",
          "body":"<p id=\"Sync-emulateJSON\">\n      <b class=\"header\">emulateJSON</b><code>Backbone.emulateJSON = true</code>\n      <br></br>\n      If you're working with a legacy web server that can't handle requests\n      encoded as <tt>application/json</tt>, setting <tt>Backbone.emulateJSON = true;</tt>\n      will cause the JSON to be serialized under a <tt>model</tt> parameter, and\n      the request to be made with a <tt>application/x-www-form-urlencoded</tt>\n      mime type, as if from an HTML form.\n    </p>"
        }
      }
    }
  },
  "#View":{
    "title":"View",
    "hash":"#View",
    "content":{
      "header":"View",
      "body":"<h2 id=\"View\">Backbone.View</h2><p>\n      Backbone views are almost more convention than they are code -; they\n      don't determine anything about your HTML or CSS for you, and can be used\n      with any JavaScript templating library.\n      The general idea is to organize your interface into logical views,\n      backed by models, each of which can be updated independently when the\n      model changes, without having to redraw the page. Instead of digging into\n      a JSON object, looking up an element in the DOM, and updating the HTML by hand,\n      you can bind your view's <tt>render</tt> function to the model's <tt>\"change\"</tt>\n      event -; and now everywhere that\n      model data is displayed in the UI, it is always immediately up to date.\n    </p>"
    },
    "sections":{
      "#View-extend":{
        "title":"extend",
        "hash":"#View-extend",
        "content":{
          "header":"View.extend",
          "body":"<p id=\"View-extend\">\n      <b class=\"header\">extend</b><code>Backbone.View.extend(properties, [classProperties])</code>\n      <br></br>\n      Get started with views by creating a custom view class. You'll want to\n      override the <a href=\"#View-render\">render</a> function, specify your\n      declarative <a href=\"#View-delegateEvents\">events</a>, and perhaps the\n      <tt>tagName</tt>, <tt>className</tt>, or <tt>id</tt> of the View's root\n      element.\n    </p><pre>\nvar DocumentRow = Backbone.View.extend({\n\n  tagName: \"li\",\n\n  className: \"document-row\",\n\n  events: {\n    \"click .icon\":          \"open\",\n    \"click .button.edit\":   \"openEditDialog\",\n    \"click .button.delete\": \"destroy\"\n  },\n\n  render: function() {\n    ...\n  }\n\n});\n</pre>"
        }
      },
      "#View-constructor":{
        "title":"constructor / initialize",
        "hash":"#View-constructor",
        "content":{
          "header":"View.constructor",
          "body":"<p id=\"View-constructor\">\n      <b class=\"header\">constructor / initialize</b><code>new View([options])</code>\n      <br></br>\n      When creating a new View, the options you pass are attached to the view\n      as <tt>this.options</tt>, for future reference. There are several special\n      options that, if passed, will be attached directly to the view:\n      <tt>model</tt>, <tt>collection</tt>,\n      <tt>el</tt>, <tt>id</tt>, <tt>className</tt>, <tt>tagName</tt> and <tt>attributes</tt>.\n      If the view defines an <b>initialize</b> function, it will be called when\n      the view is first created. If you'd like to create a view that references\n      an element <i>already</i> in the DOM, pass in the element as an option:\n      <tt>new View({el: existingElement})</tt>\n    </p><pre>\nvar doc = Documents.first();\n\nnew DocumentRow({\n  model: doc,\n  id: \"document-row-\" + doc.id\n});\n</pre>"
        }
      },
      "#View-el":{
        "title":"el",
        "hash":"#View-el",
        "content":{
          "header":"View.el",
          "body":"<p id=\"View-el\">\n      <b class=\"header\">el</b><code>view.el</code>\n      <br></br>\n      All views have a DOM element at all times (the <b>el</b> property),\n      whether they've already been inserted into the page or not. In this\n      fashion, views can be rendered at any time, and inserted into the DOM all\n      at once, in order to get high-performance UI rendering with as few\n      reflows and repaints as possible. <tt>this.el</tt> is created from the\n      view's <tt>tagName</tt>, <tt>className</tt>, <tt>id</tt> and <tt>attributes</tt> properties,\n      if specified. If not, <b>el</b> is an empty <tt>div</tt>.\n    </p><pre class=\"runnable\">\nvar ItemView = Backbone.View.extend({\n  tagName: 'li'\n});\n\nvar BodyView = Backbone.View.extend({\n  el: 'body'\n});\n\nvar item = new ItemView();\nvar body = new BodyView();\n\nalert(item.el + ' ' + body.el);\n</pre>"
        }
      },
      "#View-$el":{
        "title":"$el",
        "hash":"#View-$el",
        "content":{
          "header":"View.$el",
          "body":""
        }
      },
      "#View-setElement":{
        "title":"setElement",
        "hash":"#View-setElement",
        "content":{
          "header":"View.setElement",
          "body":"<p id=\"View-setElement\">\n      <b class=\"header\">setElement</b><code>view.setElement(element)</code>\n      <br></br>\n      If you'd like to apply a Backbone view to a different DOM element, use\n      <b>setElement</b>, which will also create the cached <tt>$el</tt> reference\n      and move the view's delegated events from the old element to the new one.\n    </p>"
        }
      },
      "#View-attributes":{
        "title":"attributes",
        "hash":"#View-attributes",
        "content":{
          "header":"View.attributes",
          "body":"<p id=\"View-attributes\">\n      <b class=\"header\">attributes</b><code>view.attributes</code>\n      <br></br>\n      A hash of attributes that will be set as HTML DOM element attributes on the\n      view's <tt>el</tt> (id, class, data-properties, etc.), or a function that\n      returns such a hash.\n    </p>"
        }
      },
      "#View-dollar":{
        "title":"$ (jQuery or Zepto)",
        "hash":"#View-dollar",
        "content":{
          "header":"View.dollar",
          "body":"<p id=\"View-dollar\">\n      <b class=\"header\">$ (jQuery or Zepto)</b><code>view.$(selector)</code>\n      <br></br>\n      If jQuery or Zepto is included on the page, each view has a\n      <b>$</b> function that runs queries scoped within the view's element. If you use this\n      scoped jQuery function, you don't have to use model ids as part of your query\n      to pull out specific elements in a list, and can rely much more on HTML class\n      attributes. It's equivalent to running: <tt>view.$el.find(selector)</tt>\n    </p><pre>\nui.Chapter = Backbone.View.extend({\n  serialize : function() {\n    return {\n      title: this.$(\".title\").text(),\n      start: this.$(\".start-page\").text(),\n      end:   this.$(\".end-page\").text()\n    };\n  }\n});\n</pre>"
        }
      },
      "#View-render":{
        "title":"render",
        "hash":"#View-render",
        "content":{
          "header":"View.render",
          "body":"<p id=\"View-render\">\n      <b class=\"header\">render</b><code>view.render()</code>\n      <br></br>\n      The default implementation of <b>render</b> is a no-op. Override this\n      function with your code that renders the view template from model data,\n      and updates <tt>this.el</tt> with the new HTML. A good\n      convention is to <tt>return this</tt> at the end of <b>render</b> to\n      enable chained calls.\n    </p><pre>\nvar Bookmark = Backbone.View.extend({\n  render: function() {\n    $(this.el).html(this.template(this.model.toJSON()));\n    return this;\n  }\n});\n</pre><p>\n      Backbone is agnostic with respect to your preferred method of HTML templating.\n      Your <b>render</b> function could even munge together an HTML string, or use\n      <tt>document.createElement</tt> to generate a DOM tree. However, we suggest\n      choosing a nice JavaScript templating library.\n      <a href=\"http://github.com/janl/mustache.js\">Mustache.js</a>,\n      <a href=\"http://github.com/creationix/haml-js\">Haml-js</a>, and\n      <a href=\"http://github.com/sstephenson/eco\">Eco</a> are all fine alternatives.\n      Because <a href=\"http://documentcloud.github.com/underscore/\">Underscore.js</a> is already on the page,\n      <a href=\"http://documentcloud.github.com/underscore/#template\">_.template</a>\n      is available, and is an excellent choice if you've already XSS-sanitized\n      your interpolated data.\n    </p><p>\n      Whatever templating strategy you end up with, it's nice if you <i>never</i>\n      have to put strings of HTML in your JavaScript. At DocumentCloud, we\n      use <a href=\"http://documentcloud.github.com/jammit/\">Jammit</a> in order\n      to package up JavaScript templates stored in <tt>/app/views</tt> as part\n      of our main <tt>core.js</tt> asset package.\n    </p>"
        }
      },
      "#View-remove":{
        "title":"remove",
        "hash":"#View-remove",
        "content":{
          "header":"View.remove",
          "body":"<p id=\"View-remove\">\n      <b class=\"header\">remove</b><code>view.remove()</code>\n      <br></br>\n      Convenience function for removing the view from the DOM. Equivalent to calling\n      <tt>$(view.el).remove();</tt>\n    </p>"
        }
      },
      "#View-make":{
        "title":"make",
        "hash":"#View-make",
        "content":{
          "header":"View.make",
          "body":"<p id=\"View-make\">\n      <b class=\"header\">make</b><code>view.make(tagName, [attributes], [content])</code>\n      <br></br>\n      Convenience function for creating a DOM element of the given type (<b>tagName</b>),\n      with optional attributes and HTML content. Used internally to create the\n      initial <tt>view.el</tt>.\n    </p><pre class=\"runnable\">\nvar view = new Backbone.View;\n\nvar el = view.make(\"b\", {\"class\": \"bold\"}, \"Bold! \");\n\n$(\"#make-demo\").append(el);\n</pre>"
        }
      },
      "#View-delegateEvents":{
        "title":"delegateEvents",
        "hash":"#View-delegateEvents",
        "content":{
          "header":"View.delegateEvents",
          "body":"<p id=\"View-delegateEvents\">\n      <b class=\"header\">delegateEvents</b><code>delegateEvents([events])</code>\n      <br></br>\n      Uses jQuery's <tt>delegate</tt> function to provide declarative callbacks\n      for DOM events within a view.\n      If an <b>events</b> hash is not passed directly, uses <tt>this.events</tt>\n      as the source. Events are written in the format <tt>{\"event selector\": \"callback\"}</tt>.\n      The callback may be either the name of a method on the view, or a direct\n      function body.\n      Omitting the <tt>selector</tt> causes the event to be bound to the view's\n      root element (<tt>this.el</tt>). By default, <tt>delegateEvents</tt> is called\n      within the View's constructor for you, so if you have a simple <tt>events</tt>\n      hash, all of your DOM events will always already be connected, and you will\n      never have to call this function yourself.\n    </p><p>\n      The <tt>events</tt> property may also be defined as a function that returns\n      an <b>events</b> hash, to make it easier to programmatically define your\n      events, as well as inherit them from parent views.\n    </p><p>\n      Using <b>delegateEvents</b> provides a number of advantages over manually\n      using jQuery to bind events to child elements during <a href=\"#View-render\">render</a>. All attached\n      callbacks are bound to the view before being handed off to jQuery, so when\n      the callbacks are invoked, <tt>this</tt> continues to refer to the view object. When\n      <b>delegateEvents</b> is run again, perhaps with a different <tt>events</tt>\n      hash, all callbacks are removed and delegated afresh -; useful for\n      views which need to behave differently when in different modes.\n    </p><p>\n      A view that displays a document in a search result might look\n      something like this:\n    </p><pre>\nvar DocumentView = Backbone.View.extend({\n\n  events: {\n    \"dblclick\"                : \"open\",\n    \"click .icon.doc\"         : \"select\",\n    \"contextmenu .icon.doc\"   : \"showMenu\",\n    \"click .show_notes\"       : \"toggleNotes\",\n    \"click .title .lock\"      : \"editAccessLevel\",\n    \"mouseover .title .date\"  : \"showTooltip\"\n  },\n\n  render: function() {\n    $(this.el).html(this.template(this.model.toJSON()));\n    return this;\n  },\n\n  open: function() {\n    window.open(this.model.get(\"viewer_url\"));\n  },\n\n  select: function() {\n    this.model.set({selected: true});\n  },\n\n  ...\n\n});\n</pre>"
        }
      },
      "#View-undelegateEvents":{
        "title":"undelegateEvents",
        "hash":"#View-undelegateEvents",
        "content":{
          "header":"View.undelegateEvents",
          "body":"<p id=\"View-undelegateEvents\">\n      <b class=\"header\">undelegateEvents</b><code>undelegateEvents()</code>\n      <br></br>\n      Removes all of the view's delegated events. Useful if you want to disable\n      or remove a view from the DOM temporarily.\n    </p>"
        }
      }
    }
  },
  "#Utility":{
    "title":"Utility",
    "hash":"#Utility",
    "content":{
      "header":"Utility",
      "body":"<h2 id=\"Utility\">Utility Functions</h2>"
    },
    "sections":{
      "#Utility-noConflict":{
        "title":"noConflict",
        "hash":"#Utility-noConflict",
        "content":{
          "header":"Utility.noConflict",
          "body":"<p id=\"Utility-noConflict\">\n      <b class=\"header\">noConflict</b><code>var backbone = Backbone.noConflict();</code>\n      <br></br>\n      Returns the <tt>Backbone</tt> object back to its original value. You can\n      use the return value of <tt>Backbone.noConflict()</tt> to keep a local\n      reference to Backbone. Useful for embedding Backbone on third-party\n      websites, where you don't want to clobber the existing Backbone.\n    </p><pre>\nvar localBackbone = Backbone.noConflict();\nvar model = localBackbone.Model.extend(...);\n</pre>"
        }
      },
      "#Utility-setDomLibrary":{
        "title":"setDomLibrary",
        "hash":"#Utility-setDomLibrary",
        "content":{
          "header":"Utility.setDomLibrary",
          "body":"<p id=\"Utility-setDomLibrary\">\n      <b class=\"header\">setDomLibrary</b><code>Backbone.setDomLibrary(jQueryNew);</code>\n      <br></br>\n      If you have multiple copies of <tt>jQuery</tt> on the page, or simply want\n      to tell Backbone to use a particular object as its DOM / Ajax library,\n      this is the function for you.\n    </p>"
        }
      }
    }
  },
  "#examples":{
    "title":"Examples",
    "hash":"#examples",
    "content":{
      "header":"examples",
      "body":"<h2 id=\"examples\">Examples</h2><p>\n      The list of examples that follows, while long, is not exhaustive. If you've\n      worked on an app that uses Backbone, please add it to the\n      <a href=\"https://github.com/documentcloud/backbone/wiki/Projects-and-Companies-using-Backbone\">wiki page of Backbone apps</a>.\n    </p>"
    },
    "sections":{
      "#examples-todos":{
        "title":"Todos",
        "hash":"#examples-todos",
        "content":{
          "header":"examples.todos",
          "body":"<p id=\"examples-todos\">\n      <a href=\"http://jgn.me/\">Jérôme Gravel-Niquet</a> has contributed a\n      <a href=\"examples/todos/index.html\">Todo List application</a>\n      that is bundled in the repository as Backbone example. If you're wondering\n      where to get started with Backbone in general, take a moment to\n      <a href=\"docs/todos.html\">read through the annotated source</a>. The app uses a\n      <a href=\"docs/backbone-localstorage.html\">LocalStorage adapter</a>\n      to transparently save all of your todos within your browser, instead of\n      sending them to a server. Jérôme also has a version hosted at\n      <a href=\"http://localtodos.com/\">localtodos.com</a> that uses a\n      <a href=\"http://github.com/jeromegn/backbone-mootools\">MooTools-backed version of Backbone</a>\n      instead of jQuery.\n    </p><div style=\"text-align: center;\">\n      <a href=\"examples/todos/index.html\">\n        <img width=\"400\" height=\"427\" data-original=\"docs/images/todos.png\" alt=\"Todos\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-documentcloud":{
        "title":"DocumentCloud",
        "hash":"#examples-documentcloud",
        "content":{
          "header":"examples.documentcloud",
          "body":"<h2 id=\"examples-documentcloud\">DocumentCloud</h2><p>\n      The <a href=\"http://www.documentcloud.org/public/#search/\">DocumentCloud workspace</a>\n      is built on Backbone.js, with <i>Documents</i>, <i>Projects</i>,\n      <i>Notes</i>, and <i>Accounts</i> all as Backbone models and collections.\n      If you're interested in history -; both Underscore.js and Backbone.js\n      were originally extracted from the DocumentCloud codebase, and packaged\n      into standalone JS libraries.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.documentcloud.org/public/#search/\">\n        <img width=\"550\" height=\"453\" data-original=\"docs/images/dc-workspace.png\" alt=\"DocumentCloud Workspace\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-rdio":{
        "title":"Rdio",
        "hash":"#examples-rdio",
        "content":{
          "header":"examples.rdio",
          "body":"<h2 id=\"examples-rdio\">Rdio</h2><p>\n      <a href=\"http://rdio.com/new\">New Rdio</a> was developed from the ground \n      up with a component based framework based on Backbone.js. Every component \n      on the screen is dynamically loaded and rendered, with data provided by the \n      <a href=\"http://developer.rdio.com/\">Rdio API</a>. When changes are pushed, \n      every component can update itself without reloading the page or interrupting \n      the user's music. All of this relies on Backbone's views and models, \n      and all URL routing is handled by Backbone's Router. When data changes are \n      signaled in realtime, Backbone's Events notify the interested components \n      in the data changes. Backbone forms the core of the new, dynamic, realtime \n      Rdio web and <i>desktop</i> applications.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://rdio.com/new\">\n        <img width=\"550\" height=\"344\" data-original=\"docs/images/rdio.png\" alt=\"Rdio\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-linkedin":{
        "title":"LinkedIn Mobile",
        "hash":"#examples-linkedin",
        "content":{
          "header":"examples.linkedin",
          "body":"<h2 id=\"examples-linkedin\">LinkedIn Mobile</h2><p>\n      <a href=\"http://www.linkedin.com/\">LinkedIn</a> used Backbone.js to create\n      its <a href=\"http://www.linkedin.com/static?key=mobile\">next-generation HTML5 mobile web app</a>.\n      Backbone made it easy to keep the app modular, organized and extensible so\n      that it was possible to program the complexities of LinkedIn's user experience.\n      The app also uses <a href=\"http://zeptojs.com/\">Zepto</a>,\n      <a href=\"http://documentcloud.github.com/underscore/\">Underscore.js</a>,\n      <a href=\"http://sass-lang.com/\">SASS</a>, <a href=\"http://cubiq.org/iscroll\">iScroll</a>,\n      HTML5 LocalStorage and Canvas. The tech team blogged about \n      <a href=\"https://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps\">their experiences using LocalStorage</a>\n      to improve mobile performance.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.linkedin.com/static?key=mobile\">\n          <img width=\"550\" height=\"454\" data-original=\"docs/images/linkedin-mobile.png\" alt=\"LinkedIn Mobile\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-flow":{
        "title":"Flow",
        "hash":"#examples-flow",
        "content":{
          "header":"examples.flow",
          "body":"<h2 id=\"examples-flow\">Flow</h2><p>\n      <a href=\"http://www.metalabdesign.com/\">MetaLab</a> used Backbone.js to create\n      <a href=\"http://www.getflow.com/\">Flow</a>, a task management app for teams. The\n      workspace relies on Backbone.js to construct task views, activities, accounts,\n      folders, projects, and tags. You can see the internals under <tt>window.Flow</tt>.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.getflow.com/\">\n        <img width=\"550\" height=\"416\" data-original=\"docs/images/flow.png\" alt=\"Flow\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-wordpress":{
        "title":"WordPress.com",
        "hash":"#examples-wordpress",
        "content":{
          "header":"examples.wordpress",
          "body":"<h2 id=\"examples-wordpress\">WordPress.com</h2><p>\n  \t\t<a href=\"http://wordpress.com/\">WordPress.com</a> is the software-as-a-service \n  \t\tversion of <a href=\"http://wordpress.org\">WordPress</a>. It uses Backbone.js \n  \t\tModels, Collections, and Views in its \n  \t\t<a href=\"http://en.blog.wordpress.com/2012/05/25/notifications-refreshed/\">Notifications system</a>.  Backbone.js was selected\n  \t\tbecause it was easy to fit into the structure of the application, not the \n  \t\tother way around. <a href=\"http://automattic.com\">Automattic</a> \n  \t\t(the company behind WordPress.com) is integrating Backbone.js into the \n  \t\tStats tab and other features throughout the homepage.\n  \t</p><div style=\"text-align: center;\">\n      <a href=\"http://wordpress.com/\">\n        <img width=\"550\" height=\"387\" data-original=\"docs/images/wpcom-notifications.png\" alt=\"WordPress.com Notifications\" title=\"WordPress.com Notifications\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-foursquare":{
        "title":"Foursquare",
        "hash":"#examples-foursquare",
        "content":{
          "header":"examples.foursquare",
          "body":"<h2 id=\"examples-foursquare\">Foursquare</h2><p>\n      Foursquare is a fun little startup that helps you meet up with friends,\n      discover new places, and save money. Backbone Models are heavily used in\n      the core JavaScript API layer and Views power many popular features like\n      the <a href=\"https://foursquare.com\">homepage map</a> and\n      <a href=\"https://foursquare.com/seriouseats/list/the-best-doughnuts-in-ny\">lists</a>.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://foursquare.com\">\n        <img width=\"550\" height=\"427\" data-original=\"docs/images/foursquare.png\" alt=\"Foursquare\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-wunderkit":{
        "title":"Wunderkit",
        "hash":"#examples-wunderkit",
        "content":{
          "header":"examples.wunderkit",
          "body":"<h2 id=\"examples-wunderkit\">Wunderkit</h2><p>\n      <a href=\"http://get.wunderkit.com/\">Wunderkit</a> is a productivity and\n      social collaboration platform. It\n      uses Backbone.js as the foundation for the single-page application,\n      which is backed by a RESTful Rails API.\n      The freedom and agility that Backbone gives to developers\n      made it possible to build Wunderkit in a very short time and\n      extend it with custom features: a write-through cache using HTML5\n      localStorage, and a view hierarchy extension to easily manage trees of\n      sub-views. Aside from Backbone, Wunderkit also\n      depends on <a href=\"http://jquery.com/\">jQuery</a>, <a href=\"http://underscorejs.org/\">Underscore</a>, <a href=\"http://requirejs.org/\">Require.js</a>, <a href=\"http://lesscss.org/\">LESS</a> and doT.js templates.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://get.wunderkit.com/\">\n        <img width=\"543\" height=\"525\" data-original=\"docs/images/wunderkit.png\" alt=\"Wunderkit\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-disqus":{
        "title":"Disqus",
        "hash":"#examples-disqus",
        "content":{
          "header":"examples.disqus",
          "body":"<h2 id=\"examples-disqus\">Disqus</h2><p>\n      <a href=\"http://www.disqus.com\">Disqus</a> chose Backbone.js to power the \n      latest version of their commenting widget. Backbone's small \n      footprint and easy extensibility made it the right choice for Disqus' \n      distributed web application, which is hosted entirely inside an iframe and \n      served on thousands of large web properties, including IGN, Wired, CNN, MLB, and more.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.disqus.com\">\n        <img width=\"550\" height=\"454\" data-original=\"docs/images/disqus.png\" alt=\"Disqus\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-khan-academy":{
        "title":"Khan Academy",
        "hash":"#examples-khan-academy",
        "content":{
          "header":"examples.khan-academy",
          "body":"<h2 id=\"examples-khan-academy\">Khan Academy</h2><p>\n      <a href=\"http://www.khanacademy.org\">Khan Academy</a> is on a mission to\n      provide a free world-class education to anyone anywhere. With thousands of\n      videos, hundreds of JavaScript-driven exercises, and big plans for the\n      future, Khan Academy uses Backbone to keep frontend code modular and organized.\n      User profiles and goal setting are implemented with Backbone,\n      <a href=\"http://jquery.com/\">jQuery</a> and\n      <a href=\"http://handlebarsjs.com/\">Handlebars</a>, and most new feature\n      work is being pushed to the client side, greatly increasing the quality of\n      <a href=\"https://github.com/Khan/khan-api/\">the API</a>.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.khanacademy.org\">\n        <img width=\"550\" height=\"454\" data-original=\"docs/images/khan-academy.png\" alt=\"Khan Academy\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-do":{
        "title":"Do",
        "hash":"#examples-do",
        "content":{
          "header":"examples.do",
          "body":"<h2 id=\"examples-do\">Do</h2><p>\n      <a href=\"http://do.com\">Do</a> is a social productivity app that makes it\n      easy to work on tasks, track projects, and take notes with your team.\n      The <a href=\"http://do.com\">Do.com</a> web application was built from the\n      ground up to work seamlessly on your smartphone, tablet and computer. The\n      team used Backbone, <a href=\"http://coffeescript.org/\">CoffeeScript</a> and <a href=\"http://handlebarsjs.com/\">Handlebars</a> to build a full-featured\n      app in record time and rolled their own extensions for complex navigation\n      and model sync support.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://do.com\">\n        <img width=\"550\" height=\"425\" data-original=\"docs/images/do.png\" alt=\"Do\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-pitchfork":{
        "title":"Pitchfork",
        "hash":"#examples-pitchfork",
        "content":{
          "header":"examples.pitchfork",
          "body":"<h2 id=\"examples-pitchfork\">Pitchfork</h2><p>\n      <a href=\"http://pitchfork.com/\">Pitchfork</a> uses Backbone.js to power \n      its site-wide audio player, <a href=\"http://pitchfork.com/tv/\">Pitchfork.tv</a>, \n      location routing, a write-thru page fragment cache, and more. Backbone.js \n      (and <a href=\"http://underscorejs.org/\">Underscore.js</a>) helps the team \n      create clean and modular components, \n      move very quickly, and focus on the site, not the spaghetti.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://pitchfork.com/\">\n        <img width=\"550\" height=\"428\" data-original=\"docs/images/pitchfork.png\" alt=\"Pitchfork\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-spin":{
        "title":"Spin",
        "hash":"#examples-spin",
        "content":{
          "header":"examples.spin",
          "body":"<h2 id=\"examples-spin\">Spin</h2><p>\n      <a href=\"http://spin.com/\">Spin</a> pulls in the\n      <a href=\"http://www.spin.com/news\">latest news stories</a> from\n      their internal API onto their site using Backbone models and collections, and a\n      custom <tt>sync</tt> method. Because the music should never stop playing,\n      even as you click through to different \"pages\", Spin uses a Backbone router\n      for navigation within the site.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://spin.com/\">\n        <img width=\"550\" height=\"543\" data-original=\"docs/images/spin.png\" alt=\"Spin\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-walmart":{
        "title":"Walmart Mobile",
        "hash":"#examples-walmart",
        "content":{
          "header":"examples.walmart",
          "body":"<h2 id=\"examples-walmart\">Walmart Mobile</h2><p>\n      <a href=\"http://www.walmart.com/\">Walmart</a> used Backbone.js to create the new version\n      of <a href=\"http://mobile.walmart.com/r/phoenix\">their mobile web application</a> and\n      created two new frameworks in the process.\n      <a href=\"http://walmartlabs.github.com/thorax/\">Thorax</a> provides mixins, inheritable\n      events, as well as model and collection view bindings that integrate directly with\n      <a href=\"http://handlebarsjs.com/\">Handlebars</a> templates.\n      <a href=\"http://walmartlabs.github.com/lumbar/\">Lumbar</a> allows the application to be\n      split into modules which can be loaded on demand, and creates platform specific builds\n      for the portions of the web application that are embedded in Walmart's native Android\n      and iOS applications.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://mobile.walmart.com/r/phoenix\">\n        <img width=\"256\" height=\"500\" data-original=\"docs/images/walmart-mobile.png\" alt=\"Walmart Mobile\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-groupon":{
        "title":"Groupon Now!",
        "hash":"#examples-groupon",
        "content":{
          "header":"examples.groupon",
          "body":"<h2 id=\"examples-groupon\">Groupon Now!</h2><p>\n      <a href=\"http://www.groupon.com/now\">Groupon Now!</a> helps you find\n      local deals that you can buy and use right now. When first developing\n      the product, the team decided it would be AJAX heavy with smooth transitions\n      between sections instead of full refreshes, but still needed to be fully\n      linkable and shareable. Despite never having used Backbone before, the\n      learning curve was incredibly quick -; a prototype was hacked out in an\n      afternoon, and the team was able to ship the product in two weeks.\n      Because the source is minimal and understandable, it was easy to\n      add several Backbone extensions for Groupon Now!: changing the router\n      to handle URLs with querystring parameters, and adding a simple\n      in-memory store for caching repeated requests for the same data.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.groupon.com/now\">\n        <img width=\"550\" height=\"466\" data-original=\"docs/images/groupon.png\" alt=\"Groupon Now!\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-basecamp":{
        "title":"Basecamp Mobile",
        "hash":"#examples-basecamp",
        "content":{
          "header":"examples.basecamp",
          "body":"<h2 id=\"examples-basecamp\">Basecamp Mobile</h2><p>\n      <a href=\"http://37signals.com/\">37Signals</a> used Backbone.js to create\n      <a href=\"http://basecamphq.com/mobile\">Basecamp Mobile</a>, the mobile version\n      of their popular project management software. You can access all your Basecamp\n      projects, post new messages, and comment on milestones (all represented\n      internally as Backbone.js models).\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://basecamphq.com/mobile\">\n        <img width=\"530\" height=\"350\" data-original=\"docs/images/basecamp-mobile.png\" alt=\"Basecamp Mobile\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-slavery-footprint":{
        "title":"Slavery Footprint",
        "hash":"#examples-slavery-footprint",
        "content":{
          "header":"examples.slavery-footprint",
          "body":"<h2 id=\"examples-slavery-footprint\">Slavery Footprint</h2><p>\n      <a href=\"http://slaveryfootprint.org/survey\">Slavery Footprint</a>\n      allows consumers to visualize how their consumption habits are\n      connected to modern-day slavery and provides them with an opportunity\n      to have a deeper conversation with the companies that manufacture the\n      goods they purchased.\n      Based in Oakland, California, the Slavery Footprint team works to engage\n      individuals, groups, and businesses to build awareness for and create\n      deployable action against forced labor, human trafficking, and modern-day\n      slavery through online tools, as well as off-line community education and\n      mobilization programs.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://slaveryfootprint.org/survey\">\n        <img width=\"550\" height=\"394\" data-original=\"docs/images/slavery-footprint.png\" alt=\"Slavery Footprint\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-stripe":{
        "title":"Stripe",
        "hash":"#examples-stripe",
        "content":{
          "header":"examples.stripe",
          "body":"<h2 id=\"examples-stripe\">Stripe</h2><p>\n      <a href=\"https://stripe.com\">Stripe</a> provides an API for accepting\n      credit cards on the web. Stripe's\n      <a href=\"https://manage.stripe.com\">management interface</a> was recently\n      rewritten from scratch in Coffeescript using Backbone.js as the primary\n      framework, <a href=\"https://github.com/sstephenson/eco\">Eco</a> for templates, <a href=\"http://sass-lang.com/\">Sass</a> for stylesheets, and <a href=\"https://github.com/sstephenson/stitch\">Stitch</a> to package\n      everything together as <a href=\"http://commonjs.org/\">CommonJS</a> modulas. The new app uses\n      <a href=\"https://stripe.com/docs/api\">Stripe's API</a> directly for the\n      majority of its actions; Backbone.js models made it simple to map\n      client-side models to their corresponding RESTful resources.\n    </p><div style=\"text-align: center;\">\n      <a href=\"https://stripe.com\">\n        <img width=\"555\" height=\"372\" data-original=\"docs/images/stripe.png\" alt=\"Stripe\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-airbnb":{
        "title":"Airbnb",
        "hash":"#examples-airbnb",
        "content":{
          "header":"examples.airbnb",
          "body":"<h2 id=\"examples-airbnb\">Airbnb</h2><p>      \n      <a href=\"http://airbnb.com\">Airbnb</a> uses Backbone in many of its products. \n      It started with <a href=\"http://m.airbnb.com\">Airbnb Mobile Web</a> \n      (built in six weeks by a team of three) and has since grown to \n      <a href=\"https://www.airbnb.com/wishlists/popular\">Wish Lists</a>, \n      <a href=\"http://www.airbnb.com/match\">Match</a>, \n      <a href=\"http://www.airbnb.com/s/\">Search</a>, Communities, Payments, and \n      Internal Tools.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://m.airbnb.com/\">\n        <img width=\"500\" height=\"489\" data-original=\"docs/images/airbnb.png\" alt=\"Airbnb\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-diaspora":{
        "title":"Diaspora",
        "hash":"#examples-diaspora",
        "content":{
          "header":"examples.diaspora",
          "body":"<h2 id=\"examples-diaspora\">Diaspora</h2><p>\n      <a href=\"http://www.joindiaspora.com/\">Diaspora</a> is a distributed social\n      network, formed from a number of independently operated <i>pods</i>.\n      You own your personal data, and control with whom you share.\n      All of Diaspora is <a href=\"https://github.com/diaspora/diaspora\">open-source</a>\n      code, built with <a href=\"http://rubyonrails.org/\">Rails</a> and Backbone.js.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.joindiaspora.com/\">\n        <img width=\"550\" height=\"394\" data-original=\"docs/images/diaspora.png\" alt=\"Diaspora\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-soundcloud":{
        "title":"SoundCloud Mobile",
        "hash":"#examples-soundcloud",
        "content":{
          "header":"examples.soundcloud",
          "body":"<h2 id=\"examples-soundcloud\">SoundCloud Mobile</h2><p>\n      <a href=\"http://soundcloud.com\">SoundCloud</a> is the leading sound sharing\n      platform on the internet, and Backbone.js provides the foundation for\n      <a href=\"http://m.soundcloud.com\">SoundCloud Mobile</a>. The project uses\n      the public SoundCloud <a href=\"http://soundcloud.com/developers\">API</a>\n      as a data source (channeled through a nginx proxy),\n      <a href=\"http://api.jquery.com/category/plugins/templates/\">jQuery templates</a>\n      for the rendering, <a href=\"http://docs.jquery.com/Qunit\">Qunit\n      </a> and <a href=\"http://www.phantomjs.org/\">PhantomJS</a> for\n      the testing suite. The JS code, templates and CSS are built for the\n      production deployment with various Node.js tools like\n      <a href=\"https://github.com/dsimard/ready.js\">ready.js</a>,\n      <a href=\"https://github.com/mde/jake\">Jake</a>,\n      <a href=\"https://github.com/tmpvar/jsdom\">jsdom</a>.\n      The <b>Backbone.History</b> was modified to support the HTML5 <tt>history.pushState</tt>.\n      <b>Backbone.sync</b> was extended with an additional SessionStorage based cache\n      layer.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://m.soundcloud.com\">\n        <img width=\"266\" height=\"500\" data-original=\"docs/images/soundcloud.png\" alt=\"SoundCloud\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-artsy":{
        "title":"Art.sy",
        "hash":"#examples-artsy",
        "content":{
          "header":"examples.artsy",
          "body":"<h2 id=\"examples-artsy\">Art.sy</h2><p>\n      <a href=\"http://art.sy\">Art.sy</a> is a place to discover art you'll \n      love. Art.sy is built on Rails, using \n      <a href=\"https://github.com/intridea/grape\">Grape</a> to serve a robust \n      <a href=\"http://art.sy/api\">JSON API</a>. The main site is a single page \n      app written in Coffeescript and uses Backbone to provide structure around \n      this API. An admin panel and partner CMS have also been extracted into \n      their own API-consuming Backbone projects.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://art.sy\">\n        <img width=\"550\" height=\"550\" data-original=\"docs/images/artsy.png\" alt=\"Art.sy\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-pandora":{
        "title":"Pandora",
        "hash":"#examples-pandora",
        "content":{
          "header":"examples.pandora",
          "body":"<h2 id=\"examples-pandora\">Pandora</h2><p>\n      When <a href=\"http://www.pandora.com/newpandora\">Pandora</a> redesigned\n      their site in HTML5, they chose Backbone.js to help\n      manage the user interface and interactions. For example, there's a model\n      that represents the \"currently playing track\", and multiple views that\n      automatically update when the current track changes. The station list is a\n      collection, so that when stations are added or changed, the UI stays up to date.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.pandora.com/newpandora\">\n        <img width=\"476\" height=\"359\" data-original=\"docs/images/pandora.png\" alt=\"Pandora\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-inkling":{
        "title":"Inkling",
        "hash":"#examples-inkling",
        "content":{
          "header":"examples.inkling",
          "body":"<h2 id=\"examples-inkling\">Inkling</h2><p>\n      <a href=\"http://inkling.com\">Inkling</a> is a truly \n      cross-platform way to publish interactive learning content.<br></br> \n      <a href=\"https://www.inkling.com/read/\">Inkling for Web</a> uses Backbone.js \n      to make hundreds of complex books -; from textbooks to travel guides -; more \n      engaging on the web. Beyond your average EPUB eReader, Inkling supports \n      WebGL-enabled 3D graphics, interactive assessments, seamless social sharing, \n      and even a music player, all within a single page Backbone-driven app. \n      Early on, the team decided to keep the site lightweight by using only \n      Backbone.js and raw JavaScript. The result? Complete source code weighing \n      in at a mere 350kb with feature-parity across the iPad, iPhone and web \n      clients. The \n      <a href=\"https://www.inkling.com/read/biology-neil-campbell-and-jane-reece-9th/chapter-1/overview-inquiring-about-life\">free chapter</a> \n      in every book makes it easy for anyone to try it out and take a look.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://inkling.com\">\n        <img width=\"550\" height=\"361\" data-original=\"docs/images/inkling.png\" alt=\"Inkling\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-code-school":{
        "title":"Code School",
        "hash":"#examples-code-school",
        "content":{
          "header":"examples.code-school",
          "body":"<h2 id=\"examples-code-school\">Code School</h2><p>\n      <a href=\"http://www.codeschool.com\">Code School</a> courses teach people\n      about various programming topics like <a href=\"http://coffeescript.org\">CoffeeScript</a>, CSS, Ruby on Rails,\n      and more. The new Code School course\n      <a href=\"http://coffeescript.codeschool.com/levels/1/challenges/1\">challenge page</a>\n      is built from the ground up on Backbone.js, using\n      everything it has to offer: the router, collections, models, and complex\n      event handling. Before, the page was a mess of <a href=\"http://jquery.com/\">jQuery</a> DOM manipulation\n      and manual Ajax calls. Backbone.js helped introduce a new way to\n      think about developing an organized front-end application in Javascript.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.codeschool.com\">\n        <img width=\"550\" height=\"482\" data-original=\"docs/images/code-school.png\" alt=\"Code School\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-cloudapp":{
        "title":"CloudApp",
        "hash":"#examples-cloudapp",
        "content":{
          "header":"examples.cloudapp",
          "body":"<h2 id=\"examples-cloudapp\">CloudApp</h2><p>\n      <a href=\"http://getcloudapp.com\">CloudApp</a> is simple file and link\n      sharing for the Mac. Backbone.js powers the web tools\n      which consume the <a href=\"http://developer.getcloudapp.com\">documented API</a>\n      to manage Drops. Data is either pulled manually or pushed by\n      <a href=\"http://pusher.com\">Pusher</a> and fed to\n      <a href=\"http://github.com/janl/mustache.js\">Mustache</a> templates for\n      rendering. Check out the <a href=\"http://cloudapp.github.com/engine\">annotated source code</a>\n      to see the magic.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://getcloudapp.com\">\n        <img width=\"550\" height=\"426\" data-original=\"docs/images/cloudapp.png\" alt=\"CloudApp\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-seatgeek":{
        "title":"SeatGeek",
        "hash":"#examples-seatgeek",
        "content":{
          "header":"examples.seatgeek",
          "body":"<h2 id=\"examples-seatgeek\">SeatGeek</h2><p>\n      <a href=\"http://seatgeek.com\">SeatGeek</a>'s stadium ticket maps were originally\n      developed with <a href=\"http://prototypejs.org/\">Prototype.js</a>. Moving to Backbone.js and <a href=\"http://jquery.com/\">jQuery</a> helped organize\n      a lot of the UI code, and the increased structure has made adding features\n      a lot easier. SeatGeek is also in the process of building a mobile\n      interface that will be Backbone.js from top to bottom.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://seatgeek.com\">\n        <img width=\"550\" height=\"455\" data-original=\"docs/images/seatgeek.png\" alt=\"SeatGeek\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-easel":{
        "title":"Easel",
        "hash":"#examples-easel",
        "content":{
          "header":"examples.easel",
          "body":"<h2 id=\"examples-easel\">Easel</h2><p>\n      <a href=\"http://easel.io\">Easel</a> is an in-browser, high fidelity web \n      design tool that integrates with your design and development \n      process. The Easel team uses CoffeeScript, Underscore.js and Backbone.js for \n      their <a href=\"http://easel.io/demo\">rich visual editor</a> as well as other \n      management functions throughout the site. The structure of Backbone allowed \n      the team to break the complex problem of building a visual editor into \n      manageable components and still move quickly.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://easel.io\">\n        <img width=\"550\" height=\"395\" data-original=\"docs/images/easel.png\" alt=\"Easel\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-prose":{
        "title":"Prose",
        "hash":"#examples-prose",
        "content":{
          "header":"examples.prose",
          "body":"<h2 id=\"examples-prose\">Prose</h2><p>\n      <a href=\"http://prose.io\">Prose</a> is a content editor for GitHub, \n      optimized for managing websites built with \n      <a href=\"http://jekyllrb.com/\">Jekyll</a> and Github Pages. Prose is \n      itself implemented as a static Jekyll site, using Backbone.js to render \n      the views and handle the routes, as well as \n      <a href=\"http://github.com/michael/github\">Github.js</a>, a small data \n      abstraction layer for manipulating files directly on Github. Read more in the \n      <a href=\"http://developmentseed.org/blog/2012/june/25/prose-a-content-editor-for-github/\">official introduction post</a>,\n      or <a href=\"https://github.com/prose/prose\">take a look at the source code</a>.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://prose.io\">\n        <img width=\"550\" height=\"447\" data-original=\"docs/images/prose.png\" alt=\"Prose\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-grove":{
        "title":"Grove.io",
        "hash":"#examples-grove",
        "content":{
          "header":"examples.grove",
          "body":"<h2 id=\"examples-grove\">Grove.io</h2><p>\n      <a href=\"http://grove.io\">Grove.io</a> provides hosted IRC for teams.\n      Backbone.js powers Grove's web client together with <a href=\"http://handlebarsjs.com/\">Handlebars.js templating</a>.\n      Updates to chat stream are pulled in realtime using long-polling.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://grove.io\">\n        <img width=\"550\" height=\"415\" data-original=\"docs/images/grove.png\" alt=\"Grove.io\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-kanogames":{
        "title":"KANO/GAMES",
        "hash":"#examples-kanogames",
        "content":{
          "header":"examples.kanogames",
          "body":"<h2 id=\"examples-kanogames\">KANO/GAMES</h2><p>\n      <a href=\"http://www.kanoapps.com/\">KANO/APPS</a> used Backbone.js to create \n      <a href=\"http://www.kanogames.com/\">KANO/GAMES</a>, a social gaming website. \n      KANO/GAMES relies on Backbone.js for almost every aspect of the site: \n      for seamless page loading, to construct menus, game listings and game \n      canvases, to build interactive HTML5 avatars, and for \n      user and developer profiles, and live feeds.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.kanogames.com/\">\n        <img width=\"550\" height=\"361\" data-original=\"docs/images/kanogames.png\" alt=\"KANO/GAMES\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-shortmail":{
        "title":"Shortmail",
        "hash":"#examples-shortmail",
        "content":{
          "header":"examples.shortmail",
          "body":"<h2 id=\"examples-shortmail\">Shortmail</h2><p>\n      <a href=\"http://410labs.com/\">410 Labs</a> uses Backbone.js at\n      <a href=\"http://shortmail.com/\">Shortmail.com</a> to build a\n      fast and responsive inbox, driven by the <a href=\"#Router\">Router</a>.\n      Backbone works with a <a href=\"http://rubyonrails.org/\">Rails</a> backend to provide inbox rendering, archiving,\n      replying, composing, and even a changes feed. Using Backbone's event-driven\n      model and pushing the rendering and interaction logic to the front-end\n      has not only simplified the view code, it has also drastically reduced the\n      load on Shortmail's servers.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://shortmail.com\">\n        <img width=\"550\" height=\"429\" data-original=\"docs/images/shortmail.png\" alt=\"Shortmail\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-scrollkit":{
        "title":"scroll kit",
        "hash":"#examples-scrollkit",
        "content":{
          "header":"examples.scrollkit",
          "body":"<h2 id=\"examples-scrollkit\">scroll kit</h2><p>\n      <a href=\"http://scrollkit.com/\">scroll kit</a> is a new kind of website \n      builder that makes designing a web page feel more like drawing. \n      The workspace is a single-page web application built with Rails and Backbone.js. \n      In scroll kit, every DOM element is associated with a Backbone model, so that \n      style changes that are made to an element automatically update the model\n      and propagate the change across all its views.\n      <a href=\"http://scrollkit.com/demo\">Try it out</a>.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://scrollkit.com\">\n        <img width=\"550\" height=\"453\" data-original=\"docs/images/scrollkit.png\" alt=\"scroll kit\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-battlefield":{
        "title":"Battlefield Play4Free",
        "hash":"#examples-battlefield",
        "content":{
          "header":"examples.battlefield",
          "body":"<h2 id=\"examples-battlefield\">Battlefield Play4Free</h2><p>\n      <a href=\"http://battlefield.play4free.com/\">Battlefield Play4Free</a> is\n      the latest free-to-play first person shooter from the same team that\n      created Battlefield Heroes. The in-game HTML5 front-end for makes heavy use of\n      Backbone's views, models and collections to help keep the code modular\n      and structured.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://battlefield.play4free.com/\">\n        <img width=\"550\" height=\"435\" data-original=\"docs/images/battlefield.png\" alt=\"Battlefield Play4Free\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-salon":{
        "title":"Salon.io",
        "hash":"#examples-salon",
        "content":{
          "header":"examples.salon",
          "body":"<h2 id=\"examples-salon\">Salon.io</h2><p>\n      <a href=\"http://salon.io\">Salon.io</a> provides a space where photographers,\n      artists and designers freely arrange their visual art on virtual walls.\n      <a href=\"http://salon.io\">Salon.io</a> runs on <a href=\"http://rubyonrails.org/\">Rails</a>, but does not use\n      much of the traditional stack, as the entire frontend is designed as a\n      single page web app, using Backbone.js and\n      <a href=\"http://coffeescript.org\">CoffeeScript</a>.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://salon.io\">\n        <img width=\"550\" height=\"483\" data-original=\"docs/images/salon.png\" alt=\"Salon.io\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-tilemill":{
        "title":"TileMill",
        "hash":"#examples-tilemill",
        "content":{
          "header":"examples.tilemill",
          "body":"<h2 id=\"examples-tilemill\">TileMill</h2><p>\n      Our fellow\n      <a href=\"http://www.newschallenge.org/\">Knight Foundation News Challenge</a>\n      winners, <a href=\"http://mapbox.com/\">MapBox</a>, created an open-source\n      map design studio with Backbone.js:\n      <a href=\"http://mapbox.github.com/tilemill/\">TileMill</a>.\n      TileMill lets you manage map layers based on shapefiles and rasters, and\n      edit their appearance directly in the browser with the\n      <a href=\"https://github.com/mapbox/carto\">Carto styling language</a>.\n      Note that the gorgeous <a href=\"http://mapbox.com/\">MapBox</a> homepage\n      is also a Backbone.js app.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://mapbox.github.com/tilemill/\">\n        <img width=\"544\" height=\"375\" data-original=\"docs/images/tilemill.png\" alt=\"TileMill\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-blossom":{
        "title":"Blossom",
        "hash":"#examples-blossom",
        "content":{
          "header":"examples.blossom",
          "body":"<h2 id=\"examples-blossom\">Blossom</h2><p>\n      <a href=\"http://blossom.io\">Blossom</a> is a lightweight project management\n      tool for lean teams. Backbone.js is heavily used in combination with\n      <a href=\"http://coffeescript.org\">CoffeeScript</a> to provide a smooth\n      interaction experience. The RESTful backend is built\n      with <a href=\"http://flask.pocoo.org/\">Flask</a> on Google App Engine.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://blossom.io\">\n        <img width=\"550\" height=\"367\" data-original=\"docs/images/blossom.png\" alt=\"Blossom\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-decide":{
        "title":"Decide",
        "hash":"#examples-decide",
        "content":{
          "header":"examples.decide",
          "body":"<h2 id=\"examples-decide\">Decide</h2><p>\n      <a href=\"http://decide.com\">Decide.com</a> helps people decide when to buy\n      consumer electronics. It relies heavily on Backbone.js to render and\n      update its Search Results Page. An \"infinite scroll\" feature takes\n      advantage of a SearchResults model containing a collection of\n      Product models to fetch more results and render them on the fly\n      with <a href=\"http://mustache.github.com\">Mustache</a>. A SearchController keeps everything in sync and\n      maintains page state in the URL. Backbone also powers the user\n      accounts and settings management.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://decide.com\">\n        <img width=\"550\" height=\"449\" data-original=\"docs/images/decide.png\" alt=\"Decide\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-trello":{
        "title":"Trello",
        "hash":"#examples-trello",
        "content":{
          "header":"examples.trello",
          "body":"<h2 id=\"examples-trello\">Trello</h2><p>\n      <a href=\"http://trello.com\">Trello</a> is a collaboration tool that\n      organizes your projects into boards. A Trello board holds many lists of\n      cards, which can contain checklists, files and conversations, and may be\n      voted on and organized with labels. Updates on the board happen in\n      real time. The site was built ground up using Backbone.js for all the\n      models, views, and routes.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://trello.com\">\n        <img width=\"550\" height=\"416\" data-original=\"docs/images/trello.png\" alt=\"Trello\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-ducksboard":{
        "title":"Ducksboard",
        "hash":"#examples-ducksboard",
        "content":{
          "header":"examples.ducksboard",
          "body":"<h2 id=\"examples-ducksboard\">Ducksboard</h2><p>\n    <a href=\"http://ducksboard.com/\">Ducksboard</a> is an online dashboard\n      for your SaaS and business metrics, built with\n      <a href=\"http://twistedmatrix.com/\">Twisted</a> and\n      <a href=\"http://www.djangoproject.com/\">Django</a> and using WebSockets.\n      It can fetch data from popular providers or accept input through\n      a simple API.\n      Backbone is used throughout Ducksboard's interface, every widget,\n      dashboard and SaaS account is a Backbone model with several views\n      (data display, configuration view). A\n      <a href=\"https://public.ducksboard.com/BFVzKVPeOoWRsL0VZ8MZ/\">live demo</a>\n      is available.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://ducksboard.com/\">\n        <img width=\"550\" height=\"322\" data-original=\"docs/images/ducksboard.png\" alt=\"Ducksboard\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-quietwrite":{
        "title":"QuietWrite",
        "hash":"#examples-quietwrite",
        "content":{
          "header":"examples.quietwrite",
          "body":"<h2 id=\"examples-quietwrite\">QuietWrite</h2><p>\n      <a href=\"http://www.twitter.com/jamesjyu\">James Yu</a> used Backbone.js to\n      create <a href=\"http://www.quietwrite.com/\">QuietWrite</a>, an app\n      that gives writers a clean and quiet interface to concentrate on the text itself.\n      The editor relies on Backbone to persist document data to the server. He\n      followed up with a Backbone.js + <a href=\"http://rubyonrails.org/\">Rails</a> tutorial that describes how to implement\n      <a href=\"http://www.jamesyu.org/2011/01/27/cloudedit-a-backbone-js-tutorial-by-example/\">CloudEdit, a simple document editing app</a>.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.quietwrite.com/\">\n        <img width=\"550\" height=\"381\" data-original=\"docs/images/quietwrite.png\" alt=\"QuietWrite\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      },
      "#examples-tzigla":{
        "title":"Tzigla",
        "hash":"#examples-tzigla",
        "content":{
          "header":"examples.tzigla",
          "body":"<h2 id=\"examples-tzigla\">Tzigla</h2><p>\n      <a href=\"http://twitter.com/evilchelu\">Cristi Balan</a> and\n      <a href=\"http://dira.ro\">Irina Dumitrascu</a> created\n      <a href=\"http://tzigla.com\">Tzigla</a>, a collaborative drawing\n      application where artists make tiles that connect to each other to\n      create <a href=\"http://tzigla.com/boards/1\">surreal drawings</a>.\n      Backbone models help organize the code, routers provide\n      <a href=\"http://tzigla.com/boards/1#!/tiles/2-2\">bookmarkable deep links</a>,\n      and the views are rendered with\n      <a href=\"https://github.com/creationix/haml-js\">haml.js</a> and\n      <a href=\"http://zeptojs.com/\">Zepto</a>.\n      Tzigla is written in Ruby (<a href=\"http://rubyonrails.org/\">Rails</a>) on the backend, and\n      <a href=\"http://coffeescript.org\">CoffeeScript</a> on the frontend, with\n      <a href=\"http://documentcloud.github.com/jammit/\">Jammit</a>\n      prepackaging the static assets.\n    </p><div style=\"text-align: center;\">\n      <a href=\"http://www.tzigla.com/\">\n        <img width=\"550\" height=\"376\" data-original=\"docs/images/tzigla.png\" alt=\"Tzigla\" class=\"example_image\"></img>\n      </a>\n    </div>"
        }
      }
    }
  },
  "#faq":{
    "title":"F.A.Q.",
    "hash":"#faq",
    "content":{
      "header":"faq",
      "body":"<h2 id=\"faq\">F.A.Q.</h2>"
    },
    "sections":{
      "#FAQ-events":{
        "title":"Catalog of Events",
        "hash":"#FAQ-events",
        "content":{
          "header":"FAQ.events",
          "body":"<p id=\"FAQ-events\">\n      <b class=\"header\">Catalog of Events</b>\n      <br></br>\n      Here's a list of all of the built-in events that Backbone.js can fire.\n      You're also free to trigger your own events on Models and Views as you\n      see fit.\n    </p><ul class=\"small\">\n      <li><b>\"add\"</b> (model, collection) -; when a model is added to a collection. </li>\n      <li><b>\"remove\"</b> (model, collection) -; when a model is removed from a collection. </li>\n      <li><b>\"reset\"</b> (collection) -; when the collection's entire contents have been replaced. </li>\n      <li><b>\"change\"</b> (model, options) -; when a model's attributes have changed. </li>\n      <li><b>\"change:[attribute]\"</b> (model, value, options) -; when a specific attribute has been updated. </li>\n      <li><b>\"destroy\"</b> (model, collection) -; when a model is <a href=\"#Model-destroy\">destroyed</a>. </li>\n      <li><b>\"sync\"</b> (model, collection) -; triggers whenever a model has been successfully synced to the server. </li>\n      <li><b>\"error\"</b> (model, collection) -; when a model's validation fails, or a <a href=\"#Model-save\">save</a> call fails on the server. </li>\n      <li><b>\"route:[name]\"</b> (router) -; when one of a router's routes has matched. </li>\n      <li><b>\"all\"</b> -; this special event fires for <i>any</i> triggered event, passing the event name as the first argument. </li>\n    </ul>"
        }
      },
      "#FAQ-tim-toady":{
        "title":"More Than One Way To Do It",
        "hash":"#FAQ-tim-toady",
        "content":{
          "header":"FAQ.tim-toady",
          "body":"<p id=\"FAQ-tim-toady\">\n      <b class=\"header\">There's More Than One Way To Do It</b>\n      <br></br>\n      It's common for folks just getting started to treat the examples listed\n      on this page as some sort of gospel truth. In fact, Backbone.js is intended\n      to be fairly agnostic about many common patterns in client-side code.\n      For example...\n    </p><p>\n      <b>References between Models and Views</b> can be handled several ways.\n      Some people like to have direct pointers, where views correspond 1:1 with\n      models (<tt>model.view</tt> and <tt>view.model</tt>). Others prefer to have intermediate\n      \"controller\" objects that orchestrate the creation and organization of\n      views into a hierarchy. Others still prefer the evented approach, and always\n      fire events instead of calling methods directly. All of these styles work well.\n    </p><p>\n      <b>Batch operations</b> on Models are common, but often best handled differently\n      depending on your server-side setup. Some folks don't mind making individual\n      Ajax requests. Others create explicit resources for RESTful batch operations:\n      <tt>/notes/batch/destroy?ids=1,2,3,4</tt>. Others tunnel REST over JSON, with the\n      creation of \"changeset\" requests:\n    </p><pre>\n  {\n    \"create\":  [array of models to create]\n    \"update\":  [array of models to update]\n    \"destroy\": [array of model ids to destroy]\n  }\n</pre><p>\n      <b>Feel free to define your own events.</b> <a href=\"#Events\">Backbone.Events</a>\n      is designed so that you can mix it in to any JavaScript object or prototype.\n      Since you can use any string as an event, it's often handy to bind\n      and trigger your own custom events: <tt>model.on(\"selected:true\")</tt> or\n      <tt>model.on(\"editing\")</tt>\n    </p><p>\n      <b>Render the UI</b> as you see fit. Backbone is agnostic as to whether you\n      use <a href=\"http://documentcloud.github.com/underscore/#template\">Underscore templates</a>,\n      <a href=\"https://github.com/janl/mustache.js\">Mustache.js</a>, direct DOM\n      manipulation, server-side rendered snippets of HTML, or\n      <a href=\"http://jqueryui.com/\">jQuery UI</a> in your <tt>render</tt> function.\n      Sometimes you'll create a view for each model ... sometimes you'll have a\n      view that renders thousands of models at once, in a tight loop. Both can be\n      appropriate in the same app, depending on the quantity of data involved,\n      and the complexity of the UI.\n    </p>"
        }
      },
      "#FAQ-nested":{
        "title":"Nested Models and Collections",
        "hash":"#FAQ-nested",
        "content":{
          "header":"FAQ.nested",
          "body":"<p id=\"FAQ-nested\">\n      <b class=\"header\">Nested Models and Collections</b>\n      <br></br>\n      It's common to nest collections inside of models with Backbone. For example,\n      consider a <tt>Mailbox</tt> model that contains many <tt>Message</tt> models.\n      One nice pattern for handling this is have a <tt>this.messages</tt> collection\n      for each mailbox, enabling the lazy-loading of messages, when the mailbox\n      is first opened ... perhaps with <tt>MessageList</tt> views listening for\n      <tt>\"add\"</tt> and <tt>\"remove\"</tt> events.\n    </p><pre>\nvar Mailbox = Backbone.Model.extend({\n\n  initialize: function() {\n    this.messages = new Messages;\n    this.messages.url = '/mailbox/' + this.id + '/messages';\n    this.messages.on(\"reset\", this.updateCounts);\n  },\n\n  ...\n\n});\n\nvar Inbox = new Mailbox;\n\n// And then, when the Inbox is opened:\n\nInbox.messages.fetch();\n</pre><p>\n      If you're looking for something more opinionated, there are a number of\n      Backbone plugins that add sophisticated associations among models,\n      <a href=\"https://github.com/documentcloud/backbone/wiki/Extensions%2C-Plugins%2C-Resources\">available on the wiki</a>.\n    </p><p>\n      Backbone doesn't include direct support for nested models and collections\n      or \"has many\" associations because there are a number\n      of good patterns for modeling structured data on the client side, and\n      <i>Backbone should provide the foundation for implementing any of them.</i>\n      You may want to...\n    </p><ul>\n      <li>\n        Mirror an SQL database's structure, or the structure of a NoSQL database.\n      </li>\n      <li>\n        Use models with arrays of \"foreign key\" ids, and join to top level\n        collections (a-la tables).\n      </li>\n      <li>\n        For associations that are numerous, use a range of ids instead of an\n        explicit list.\n      </li>\n      <li>\n        Avoid ids, and use direct references, creating a partial object graph\n        representing your data set.\n      </li>\n      <li>\n        Lazily load joined models from the server, or lazily deserialize nested\n        models from JSON documents.\n      </li>\n    </ul>"
        }
      },
      "#FAQ-bootstrap":{
        "title":"Loading Bootstrapped Models",
        "hash":"#FAQ-bootstrap",
        "content":{
          "header":"FAQ.bootstrap",
          "body":"<p id=\"FAQ-bootstrap\">\n      <b class=\"header\">Loading Bootstrapped Models</b>\n      <br></br>\n      When your app first loads, it's common to have a set of initial models that\n      you know you're going to need, in order to render the page. Instead of\n      firing an extra AJAX request to <a href=\"#Collection-fetch\">fetch</a> them,\n      a nicer pattern is to have their data already bootstrapped into the page.\n      You can then use <a href=\"#Collection-reset\">reset</a> to populate your\n      collections with the initial data. At DocumentCloud, in the\n      <a href=\"http://en.wikipedia.org/wiki/ERuby\">ERB</a> template for the\n      workspace, we do something along these lines:\n    </p><pre>\n&lt;script&gt;\n  var Accounts = new Backbone.Collection;\n  Accounts.reset(&lt;%= @accounts.to_json %&gt;);\n  var Projects = new Backbone.Collection;\n  Projects.reset(&lt;%= @projects.to_json(:collaborators =&gt; true) %&gt;);\n&lt;/script&gt;\n</pre><p>You have to <a href=\"http://mathiasbynens.be/notes/etago\">escape</a></p><tt>&lt;/</tt>"
        }
      },
      "#FAQ-extending":{
        "title":"Extending Backbone",
        "hash":"#FAQ-extending",
        "content":{
          "header":"FAQ.extending",
          "body":"<p id=\"FAQ-extending\">\n      <b class=\"header\">Extending Backbone</b>\n      <br></br>\n      Many JavaScript libraries are meant to be insular and self-enclosed,\n      where you interact with them by calling their public API, but never peek\n      inside at the guts. Backbone.js is <i>not</i> that kind of library.\n    </p><p>\n      Because it serves as a foundation for your application, you're meant to\n      extend and enhance it in the ways you see fit -; the entire source\n      code is <a href=\"docs/backbone.html\">annotated</a> to make this easier\n      for you. You'll find that there's very little there apart from core\n      functions, and most of those can be overriden or augmented should you find\n      the need. If you catch yourself adding methods to <tt>Backbone.Model.prototype</tt>,\n      or creating your own base subclass, don't worry -; that's how things are\n      supposed to work.\n    </p>"
        }
      },
      "#FAQ-mvc":{
        "title":"Traditional MVC",
        "hash":"#FAQ-mvc",
        "content":{
          "header":"FAQ.mvc",
          "body":"<p id=\"FAQ-mvc\">\n      <b class=\"header\">How does Backbone relate to \"traditional\" MVC?</b>\n      <br></br>\n      Different implementations of the\n      <a href=\"http://en.wikipedia.org/wiki/Model–View–Controller\">Model-View-Controller</a>\n      pattern tend to disagree about the definition of a controller. If it helps any, in\n      Backbone, the <a href=\"#View\">View</a> class can also be thought of as a\n      kind of controller, dispatching events that originate from the UI, with\n      the HTML template serving as the true view. We call it a View because it\n      represents a logical chunk of UI, responsible for the contents of a single\n      DOM element.\n    </p><p>\n      Comparing the overall structure of Backbone to a server-side MVC framework\n      like <b>Rails</b>, the pieces line up like so:\n    </p><ul>\n      <li>\n        <b>Backbone.Model</b> - Like a Rails model minus the class\n        methods. Wraps a row of data in business logic.\n      </li>\n      <li>\n        <b>Backbone.Collection</b> - A group of models on the client-side,\n        with sorting/filtering/aggregation logic.\n      </li>\n      <li>\n        <b>Backbone.Router</b> - Rails <tt>routes.rb</tt> + Rails controller\n        actions. Maps URLs to functions.\n      </li>\n      <li>\n        <b>Backbone.View</b> - A logical, re-usable piece of UI. Often,\n        but not always, associated with a model.\n      </li>\n      <li>\n        <b>Client-side Templates</b> - Rails <tt>.html.erb</tt> views,\n        rendering a chunk of HTML.\n      </li>\n    </ul>"
        }
      },
      "#FAQ-this":{
        "title":"Binding \"this\"",
        "hash":"#FAQ-this",
        "content":{
          "header":"FAQ.this",
          "body":"<p id=\"FAQ-this\">\n      <b class=\"header\">Binding \"this\"</b>\n      <br></br>\n      Perhaps the single most common JavaScript \"gotcha\" is the fact that when\n      you pass a function as a callback, its value for <tt>this</tt> is lost. With\n      Backbone, when dealing with <a href=\"#Events\">events</a> and callbacks,\n      you'll often find it useful to rely on\n      <a href=\"http://documentcloud.github.com/underscore/#bind\">_.bind</a> and\n      <a href=\"http://documentcloud.github.com/underscore/#bindAll\">_.bindAll</a>\n      from Underscore.js.\n    </p><p>\n      When binding callbacks to Backbone events, you can choose to pass an optional\n      third argument to specify the <tt>this</tt> that will be used when the\n      callback is later invoked:\n    </p><pre>\nvar MessageList = Backbone.View.extend({\n\n  initialize: function() {\n    var messages = this.collection;\n    messages.on(\"reset\", this.render, this);\n    messages.on(\"add\", this.addMessage, this);\n    messages.on(\"remove\", this.removeMessage, this);\n  }\n\n});\n\n// Later, in the app...\n\nInbox.messages.add(newMessage);\n</pre>"
        }
      },
      "#FAQ-rails":{
        "title":"Working with Rails",
        "hash":"#FAQ-rails",
        "content":{
          "header":"FAQ.rails",
          "body":"<p id=\"FAQ-rails\">\n      <b class=\"header\">Working with Rails</b>\n      <br></br>\n      Backbone.js was originally extracted from\n      <a href=\"http://www.documentcloud.org\">a Rails application</a>; getting\n      your client-side (Backbone) Models to sync correctly with your server-side\n      (Rails) Models is painless, but there are still a few things to be aware of.\n    </p><p>\n      By default, Rails adds an extra layer of wrapping around the JSON representation\n      of models. You can disable this wrapping by setting:\n    </p><pre>\nActiveRecord::Base.include_root_in_json = false\n</pre><p>\n      ... in your configuration. Otherwise, override\n      <a href=\"#Model-parse\">parse</a> to pull model attributes out of the\n      wrapper. Similarly, Backbone PUTs and POSTs direct JSON representations\n      of models, where by default Rails expects namespaced attributes. You can\n      have your controllers filter attributes directly from <tt>params</tt>, or\n      you can override <a href=\"#Model-toJSON\">toJSON</a> in Backbone to add\n      the extra wrapping Rails expects.\n    </p>"
        }
      }
    }
  },
  "#changelog":{
    "title":"Change Log",
    "hash":"#changelog",
    "content":{
      "header":"changelog",
      "body":"<h2 id=\"changelog\">Change Log</h2><b class=\"header\">0.9.2</b><small><i>March 21, 2012</i></small><a href=\"https://github.com/documentcloud/backbone/compare/0.9.1...0.9.2\">Diff</a><br></br><ul style=\"margin-top: 5px;\">\n      <li>\n        Instead of throwing an error when adding duplicate models to a collection,\n        Backbone will now silently skip them instead.\n      </li>\n      <li>\n        Added <a href=\"#Collection-push\">push</a>,\n        <a href=\"#Collection-pop\">pop</a>,\n        <a href=\"#Collection-unshift\">unshift</a>, and\n        <a href=\"#Collection-shift\">shift</a> to collections.\n      </li>\n      <li>\n        A model's <a href=\"#Model-changed\">changed</a> hash is now exposed for\n        easy reading of the changed attribute delta, since the model's last\n        <tt>\"change\"</tt> event.\n      </li>\n      <li>\n        Added <a href=\"#Collection-where\">where</a> to collections for simple\n        filtering.\n      </li>\n      <li>\n        You can now use a single <a href=\"#Events-off\">off</a> call\n        to remove all callbacks bound to a specific object.\n      </li>\n      <li>\n        Bug fixes for nested individual change events, some of which may be\n        \"silent\".\n      </li>\n      <li>\n        Bug fixes for URL encoding in <tt>location.hash</tt> fragments.\n      </li>\n      <li>\n        Bug fix for client-side validation in advance of a <tt>save</tt> call\n        with <tt>{wait: true}</tt>.\n      </li>\n      <li>\n        Updated / refreshed the example\n        <a href=\"examples/todos/index.html\">Todo List</a> app.\n      </li>\n    </ul><b class=\"header\">0.9.1</b><small><i>Feb. 2, 2012</i></small><a href=\"https://github.com/documentcloud/backbone/compare/0.9.0...0.9.1\">Diff</a><br></br><ul style=\"margin-top: 5px;\">\n      <li>\n        Reverted to 0.5.3-esque behavior for validating models. Silent changes\n        no longer trigger validation (making it easier to work with forms).\n        Added an <tt>isValid</tt> function that you can use to check if a model\n        is currently in a valid state.\n      </li>\n      <li>\n        If you have multiple versions of jQuery on the page, you can now tell\n        Backbone which one to use with <tt>Backbone.setDomLibrary</tt>.\n      </li>\n      <li>\n        Fixes regressions in <b>0.9.0</b> for routing with \"root\", saving with\n        both \"wait\" and \"validate\", and the order of nested \"change\" events.\n      </li>\n    </ul><b class=\"header\">0.9.0</b><small><i>Jan. 30, 2012</i></small><a href=\"https://github.com/documentcloud/backbone/compare/0.5.3...0.9.0\">Diff</a><br></br><ul style=\"margin-top: 5px;\">\n      <li>\n        Creating and destroying models with <tt>create</tt> and <tt>destroy</tt>\n        are now optimistic by default. Pass <tt>{wait: true}</tt> as an option\n        if you'd like them to wait for a successful server response to proceed.\n      </li>\n      <li>\n        Two new properties on views: <tt>$el</tt> -; a cached jQuery (or Zepto)\n        reference to the view's element, and <tt>setElement</tt>, which should\n        be used instead of manually setting a view's <tt>el</tt>. It will\n        both set <tt>view.el</tt> and <tt>view.$el</tt> correctly, as well as\n        re-delegating events on the new DOM element.\n      </li>\n      <li>\n        You can now bind and trigger multiple spaced-delimited events at once.\n        For example: <tt>model.on(\"change:name change:age\", ...)</tt>\n      </li>\n      <li>\n        When you don't know the key in advance, you may now call\n        <tt>model.set(key, value)</tt> as well as <tt>save</tt>.\n      </li>\n      <li>\n        Multiple models with the same <tt>id</tt> are no longer allowed in a\n        single collection.\n      </li>\n      <li>\n        Added a <tt>\"sync\"</tt> event, which triggers whenever a model's state\n        has been successfully synced with the server (create, save, destroy).\n      </li>\n      <li>\n        <tt>bind</tt> and <tt>unbind</tt> have been renamed to <tt>on</tt>\n        and <tt>off</tt> for clarity, following jQuery's lead.\n        The old names are also still supported.\n      </li>\n      <li>\n        A Backbone collection's <tt>comparator</tt> function may now behave\n        either like a <a href=\"http://underscorejs.org/#sortBy\">sortBy</a>\n        (pass a function that takes a single argument),\n        or like a <a href=\"https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort\">sort</a>\n        (pass a comparator function that expects two arguments). The comparator\n        function is also now bound by default to the collection -; so you\n        can refer to <tt>this</tt> within it.\n      </li>\n      <li>\n        A view's <tt>events</tt> hash may now also contain direct function\n        values as well as the string names of existing view methods.\n      </li>\n      <li>\n        Validation has gotten an overhaul -; a model's <tt>validate</tt> function\n        will now be run even for silent changes, and you can no longer create\n        a model in an initially invalid state.\n      </li>\n      <li>\n        Added <tt>shuffle</tt> and <tt>initial</tt> to collections, proxied\n        from Underscore.\n      </li>\n      <li>\n        <tt>Model#urlRoot</tt> may now be defined as a function as well as a\n        value.\n      </li>\n      <li>\n        <tt>View#attributes</tt> may now be defined as a function as well as a\n        value.\n      </li>\n      <li>\n        Calling <tt>fetch</tt> on a collection will now cause all fetched JSON\n        to be run through the collection's model's <tt>parse</tt> function, if\n        one is defined.\n      </li>\n      <li>\n        You may now tell a router to <tt>navigate(fragment, {replace: true})</tt>,\n        which will either use <tt>history.replaceState</tt> or\n        <tt>location.hash.replace</tt>, in order to change the URL without adding\n        a history entry.\n      </li>\n      <li>\n        Within a collection's <tt>add</tt> and <tt>remove</tt> events, the index\n        of the model being added or removed is now available as <tt>options.index</tt>.\n      </li>\n      <li>\n        Added an <tt>undelegateEvents</tt> to views, allowing you to manually\n        remove all configured event delegations.\n      </li>\n      <li>\n        Although you shouldn't be writing your routes with them in any case -;\n        leading slashes (<tt>/</tt>) are now stripped from routes.\n      </li>\n      <li>\n        Calling <tt>clone</tt> on a model now only passes the attributes\n        for duplication, not a reference to the model itself.\n      </li>\n    </ul><p>\n      <b class=\"header\">0.5.3</b> -; <small><i>August 9, 2011</i></small><br></br>\n      A View's <tt>events</tt> property may now be defined as a function, as well\n      as an object literal, making it easier to programmatically define and inherit\n      events. <tt>groupBy</tt> is now proxied from Underscore as a method on Collections.\n      If the server has already rendered everything on page load, pass\n      <tt>Backbone.history.start({silent: true})</tt> to prevent the initial route\n      from triggering. Bugfix for pushState with encoded URLs.\n    </p><p>\n      <b class=\"header\">0.5.2</b> -; <small><i>July 26, 2011</i></small><br></br>\n      The <tt>bind</tt> function, can now take an optional third argument, to specify\n      the <tt>this</tt> of the callback function.\n      Multiple models with the same <tt>id</tt> are now allowed in a collection.\n      Fixed a bug where calling <tt>.fetch(jQueryOptions)</tt> could cause an\n      incorrect URL to be serialized.\n      Fixed a brief extra route fire before redirect, when degrading from\n      <tt>pushState</tt>.\n    </p><p>\n      <b class=\"header\">0.5.1</b> -; <small><i>July 5, 2011</i></small><br></br>\n      Cleanups from the 0.5.0 release, to wit: improved transparent upgrades from\n      hash-based URLs to pushState, and vice-versa. Fixed inconsistency with\n      non-modified attributes being passed to <tt>Model#initialize</tt>. Reverted\n      a <b>0.5.0</b> change that would strip leading hashbangs from routes.\n      Added <tt>contains</tt> as an alias for <tt>includes</tt>.\n    </p><p>\n      <b class=\"header\">0.5.0</b> -; <small><i>July 1, 2011</i></small><br></br>\n      A large number of tiny tweaks and micro bugfixes, best viewed by looking\n      at <a href=\"https://github.com/documentcloud/backbone/compare/0.3.3...0.5.0\">the commit diff</a>.\n      HTML5 <tt>pushState</tt> support, enabled by opting-in with:\n      <tt>Backbone.history.start({pushState: true})</tt>.\n      <tt>Controller</tt> was renamed to <tt>Router</tt>, for clarity.\n      <tt>Collection#refresh</tt> was renamed to <tt>Collection#reset</tt> to emphasize\n      its ability to both reset the collection with new models, as well as empty\n      out the collection when used with no parameters.\n      <tt>saveLocation</tt> was replaced with <tt>navigate</tt>.\n      RESTful persistence methods (save, fetch, etc.) now return the jQuery deferred\n      object for further success/error chaining and general convenience.\n      Improved XSS escaping for <tt>Model#escape</tt>.\n      Added a <tt>urlRoot</tt> option to allow specifying RESTful urls without\n      the use of a collection.\n      An error is thrown if <tt>Backbone.history.start</tt> is called multiple times.\n      <tt>Collection#create</tt> now validates before initializing the new model.\n      <tt>view.el</tt> can now be a jQuery string lookup.\n      Backbone Views can now also take an <tt>attributes</tt> parameter.\n      <tt>Model#defaults</tt> can now be a function as well as a literal attributes\n      object.\n    </p><p>\n      <b class=\"header\">0.3.3</b> -; <small><i>Dec 1, 2010</i></small><br></br>\n      Backbone.js now supports <a href=\"http://zeptojs.com\">Zepto</a>, alongside\n      jQuery, as a framework for DOM manipulation and Ajax support.\n      Implemented <a href=\"#Model-escape\">Model#escape</a>, to efficiently handle\n      attributes intended for HTML interpolation. When trying to persist a model,\n      failed requests will now trigger an <tt>\"error\"</tt> event. The\n      ubiquitous <tt>options</tt> argument is now passed as the final argument\n      to all <tt>\"change\"</tt> events.\n    </p><p>\n      <b class=\"header\">0.3.2</b> -; <small><i>Nov 23, 2010</i></small><br></br>\n      Bugfix for IE7 + iframe-based \"hashchange\" events. <tt>sync</tt> may now be\n      overridden on a per-model, or per-collection basis. Fixed recursion error\n      when calling <tt>save</tt> with no changed attributes, within a\n      <tt>\"change\"</tt> event.\n    </p><p>\n      <b class=\"header\">0.3.1</b> -; <small><i>Nov 15, 2010</i></small><br></br>\n      All <tt>\"add\"</tt> and <tt>\"remove\"</tt> events are now sent through the\n      model, so that views can listen for them without having to know about the\n      collection. Added a <tt>remove</tt> method to <a href=\"#View\">Backbone.View</a>.\n      <tt>toJSON</tt> is no longer called at all for <tt>'read'</tt> and <tt>'delete'</tt> requests.\n      Backbone routes are now able to load empty URL fragments.\n    </p><p>\n      <b class=\"header\">0.3.0</b> -; <small><i>Nov 9, 2010</i></small><br></br>\n      Backbone now has <a href=\"#Controller\">Controllers</a> and\n      <a href=\"#History\">History</a>, for doing client-side routing based on\n      URL fragments.\n      Added <tt>emulateHTTP</tt> to provide support for legacy servers that don't\n      do <tt>PUT</tt> and <tt>DELETE</tt>.\n      Added <tt>emulateJSON</tt> for servers that can't accept <tt>application/json</tt>\n      encoded requests.\n      Added <a href=\"#Model-clear\">Model#clear</a>, which removes all attributes\n      from a model.\n      All Backbone classes may now be seamlessly inherited by CoffeeScript classes.\n    </p><p>\n      <b class=\"header\">0.2.0</b> -; <small><i>Oct 25, 2010</i></small><br></br>\n      Instead of requiring server responses to be namespaced under a <tt>model</tt>\n      key, now you can define your own <a href=\"#Model-parse\">parse</a> method\n      to convert responses into attributes for Models and Collections.\n      The old <tt>handleEvents</tt> function is now named\n      <a href=\"#View-delegateEvents\">delegateEvents</a>, and is automatically\n      called as part of the View's constructor.\n      Added a <a href=\"#Collection-toJSON\">toJSON</a> function to Collections.\n      Added <a href=\"#Collection-chain\">Underscore's chain</a> to Collections.\n    </p><p>\n      <b class=\"header\">0.1.2</b> -; <small><i>Oct 19, 2010</i></small><br></br>\n      Added a <a href=\"#Model-fetch\">Model#fetch</a> method for refreshing the\n      attributes of single model from the server.\n      An <tt>error</tt> callback may now be passed to <tt>set</tt> and <tt>save</tt>\n      as an option, which will be invoked if validation fails, overriding the\n      <tt>\"error\"</tt> event.\n      You can now tell backbone to use the <tt>_method</tt> hack instead of HTTP\n      methods by setting <tt>Backbone.emulateHTTP = true</tt>.\n      Existing Model and Collection data is no longer sent up unnecessarily with\n      <tt>GET</tt> and <tt>DELETE</tt> requests. Added a <tt>rake lint</tt> task.\n      Backbone is now published as an <a href=\"http://npmjs.org\">NPM</a> module.\n    </p><p>\n      <b class=\"header\">0.1.1</b> -; <small><i>Oct 14, 2010</i></small><br></br>\n      Added a convention for <tt>initialize</tt> functions to be called\n      upon instance construction, if defined. Documentation tweaks.\n    </p><p>\n      <b class=\"header\">0.1.0</b> -; <small><i>Oct 13, 2010</i></small><br></br>\n      Initial Backbone release.\n    </p><p>\n      <br></br>\n      <a href=\"http://documentcloud.org/\" title=\"A DocumentCloud Project\" style=\"background:none;\">\n        <img src=\"http://jashkenas.s3.amazonaws.com/images/a_documentcloud_project.png\" alt=\"A DocumentCloud Project\" style=\"position:relative;left:-10px;\"></img>\n      </a>\n    </p>"
    },
    "sections":{

    }
  }
};
