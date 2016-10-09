"use strict";
(function() {
  var w = $(window);
  var d = $(document);
  var b = $('body');


  var init = function() {
    setup_email_prompt();
  };

  var setup_email_prompt = function() {
    var open;
    var container;
    var content;
    var close;

    var is_active;
    var active_class;

    var submit;

    open = b.find(".js-email-open");

    if (!open.length) {
      if (container.length) container.remove();
      return;
    };

    container = b.find(".js-email-container");
    content = container.find(".js-email-content");
    close = container.find(".js-email-close");

    is_active = false;
    active_class = 'visible';

    submit = container.find(".js-email-submit");

    content.on("click", function(e) {
      e.stopPropagation();
    });

    open.on("click", function() {
      container.addClass(active_class);
      is_active = true;
      return false;
    });

    close.on("click", function() {
      container.removeClass(active_class);
      is_active = false;
      return false;
    });

    w.on("click", function(e) {
      if (is_active) {
        container.removeClass(active_class);
        is_active = false;
      }
    });
  };


  $(init);
})();
