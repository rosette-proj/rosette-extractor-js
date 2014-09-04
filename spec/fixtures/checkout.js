// taken from forrager source code

(function() {

  Forrager.Pages || (Forrager.Pages = {});

  Forrager.Pages.OrderCheckoutPage = (function() {

    function OrderCheckoutPage(options) {
      this.grand_total = options.grand_total;
    }

    OrderCheckoutPage.prototype.update_summary = function() {
      var final_amount, summary, tip, tip_amount, tip_amount_text, tip_type;
      summary = "";
      tip_amount = parseFloat($("#hid-tip-amount").val().replace(/[^\d|\.]+/, "").trim()) || 0.0;
      if (tip_amount > 0) {
        tip_type = $("#tip-percentage-radio").attr("checked") ? "percentage" : "cash";
        if (tip_amount > 100 && tip_type === "percentage") {
          tip_amount = 100;
        }
        if (tip_type === "percentage") {
          tip = Math.round(((tip_amount / 100.0) * this.grand_total) * 100.0) / 100.0;
          tip_amount_text = tip_amount + "%";
          summary = _("A %{tip_amount} tip of $%{tip_calc} will be added to your order of $%{total} for a total of $%{grand_total}.");
        } else {
          tip = tip_amount;
          tip_amount_text = "$" + tip_amount;
          summary = _("A tip of $%{tip_calc} will be added to your order of $%{total} for a total of $%{grand_total}.");
        }
        final_amount = Math.round((this.grand_total + tip) * 100.0) / 100.0;
        summary = summary.replace("%{tip_amount}", tip_amount_text);
        summary = summary.replace("%{tip_calc}", tip.toFixed(2));
        summary = summary.replace("%{total}", this.grand_total.toFixed(2));
        summary = summary.replace("%{grand_total}", final_amount.toFixed(2));
      }
      return $("#tip-summary").text(summary);
    };

    OrderCheckoutPage.prototype.selected_percentage = function() {
      var elem;
      elem = $("li.active", $(".pag-percent"));
      if (elem.length === 0) {
        return $("#tip-custom-percent").val();
      } else {
        return elem.text();
      }
    };

    OrderCheckoutPage.prototype.selected_cash_amount = function() {
      var elem;
      elem = $("li.active", $(".pag-cash"));
      if (elem.length === 0) {
        return $("#tip-custom-cash").val();
      } else {
        return elem.text();
      }
    };

    return OrderCheckoutPage;

  })();

  $(document).ready(function() {
    var current_page;
    current_page = Forrager.current_page = new Forrager.Pages.OrderCheckoutPage({
      grand_total: $("#page-data").data("grand-total")
    });
    current_page.update_summary();
    current_page.tip_modal = new Forrager.PopForm($("#change-tip-modal"));
    $("li", $(".pag-percent")).click(function() {
      $("li", $(".pag-percent")).removeClass("active");
      $(this).addClass("active");
      $("#hid-tip-amount").val($(this).text());
      return current_page.update_summary();
    });
    $("li", $(".pag-cash")).click(function() {
      $("li", $(".pag-cash")).removeClass("active");
      $(this).addClass("active");
      $("#hid-tip-amount").val($(this).text());
      return current_page.update_summary();
    });
    $("#tip-percentage-radio").parent().click(function() {
      $(".pag-percent").slideDown();
      $(".pag-cash").slideUp();
      $("#hid_tip-amount").val(current_page.selected_percentage());
      return current_page.update_summary();
    });
    $("#tip-cash-radio").parent().click(function() {
      $(".pag-cash").slideDown('slow');
      $(".pag-percent").slideUp('slow');
      $("#hid-tip-amount").val(current_page.selected_cash_amount());
      return current_page.update_summary();
    });
    $("#tip-custom-percent, #tip-custom-cash").keyup(function() {
      $("li", $(".pag-cash")).removeClass("active");
      $("li", $(".pag-percent")).removeClass("active");
      $("#hid-tip-amount").val($(this).val());
      return current_page.update_summary();
    });
    $("#add-tip, .btn-tip-change").click(function() {
      return current_page.tip_modal.show();
    });
    return $("#no-thanks").click(function() {
      return $("#tip-consider").hide();
    });
  });

}).call(this);
