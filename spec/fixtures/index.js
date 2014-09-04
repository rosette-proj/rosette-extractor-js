// taken from forrager source code

(function() {

  Forrager.Pages || (Forrager.Pages = {});

  $(document).ready(function() {
    var current_page;
    Forrager.Pages.SalesPage = {
      hook_up_status_button_events: function() {
        $(".mark-btn").click(function(e) {
          return $(".spinner", $(this)).show();
        });
        return $("a").click(function(e) {
          if ($(this).attr("class").indexOf("btn") < 0) {
            return e.stopPropagation();
          }
        });
      }
    };
    current_page = Forrager.current_page = Forrager.Pages.SalesPage;
    $(".line-item-image").each(function(index, image) {
      var glance;
      glance = $(".line-item-glance", $(this).parent());
      return $(image).popover({
        html: true,
        trigger: "hover",
        title: _("At a Glance"),
        content: function() {
          return glance.html();
        }
      });
    });
    return current_page.hook_up_status_button_events();
  });

}).call(this);
