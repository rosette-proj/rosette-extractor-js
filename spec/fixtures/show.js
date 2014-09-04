// taken from forrager source code

(function() {

  Forrager.Product || (Forrager.Product = {});

  Forrager.Product.IngredientTypeahead = (function() {

    function IngredientTypeahead(element, options) {
      var that;
      if (options == null) {
        options = {};
      }
      that = this;
      this.search_results = {};
      this.selected_result = null;
      this.options = options;
      this.typeahead = element.typeahead_with_delay({
        matcher: function(item) {
          return item;
        },
        highlighter: function(item) {
          return item;
        },
        updater: function(val) {
          var _ref;
          that.selected_result = that.search_results[$(val).data("ndb-no")];
          if (((_ref = that.options) != null ? _ref.onSelect : void 0) != null) {
            that.options.onSelect(that.selected_result);
          }
          return that.selected_result.value;
        },
        source: function(query, callback) {
          var url, _ref;
          if (((_ref = that.options) != null ? _ref.onSearchStart : void 0) != null) {
            that.options.onSearchStart();
          }
          url = Routes.api_search_foods_path("1", "json", {
            receiver: "jquery",
            query: query
          });
          return $.ajax({
            url: url,
            dataType: "json",
            success: function(data, status, xhr) {
              var item, key, _ref1;
              that.search_results = data;
              callback((function() {
                var _results;
                _results = [];
                for (key in data) {
                  item = data[key];
                  _results.push('<div data-ndb-no="' + key + '">' + item.value + '</div>');
                }
                return _results;
              })());
              if (((_ref1 = that.options) != null ? _ref1.onSearchSuccess : void 0) != null) {
                return that.options.onSearchSuccess(that.search_results);
              }
            },
            error: function(data, status, xhr) {
              var _ref1;
              if (((_ref1 = that.options) != null ? _ref1.onSearchFailure : void 0) != null) {
                return that.options.onSearchFailure(status);
              }
            },
            complete: function() {
              var _ref1;
              if (((_ref1 = that.options) != null ? _ref1.onSearchComplete : void 0) != null) {
                return that.options.onSearchComplete();
              }
            }
          });
        }
      });
    }

    return IngredientTypeahead;

  })();

}).call(this);
(function() {

  Forrager.Product || (Forrager.Product = {});

  Forrager.Product.FulfillmentSentence = (function() {

    function FulfillmentSentence() {}

    FulfillmentSentence.sentences = {
      "delivery": {
        "none": function() {
          return _("You don't offer delivery.");
        },
        "hours": [
          function() {
            return _("You deliver between %{start_time} and %{end_time} every day.");
          }, function() {
            return _("You deliver between %{start_time} and %{end_time} on %{day1}.");
          }, function() {
            return _("You deliver between %{start_time} and %{end_time} on %{day1} and %{day2}.");
          }, function() {
            return _("You deliver between %{start_time} and %{end_time} on %{day1}, %{day2}, and %{day3}.");
          }, function() {
            return _("You deliver between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, and %{day4}.");
          }, function() {
            return _("You deliver between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, %{day4}, and %{day5}.");
          }, function() {
            return _("You deliver between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, and %{day6}.");
          }, function() {
            return _("You deliver between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, %{day6}, and %{day7}.");
          }
        ],
        "days": [
          function() {
            return _("You deliver all day every day.");
          }, function() {
            return _("You deliver all day on %{day1}.");
          }, function() {
            return _("You deliver all day on %{day1} and %{day2}.");
          }, function() {
            return _("You deliver all day on %{day1}, %{day2}, and %{day3}.");
          }, function() {
            return _("You deliver all day on %{day1}, %{day2}, %{day3}, and %{day4}.");
          }, function() {
            return _("You deliver all day on %{day1}, %{day2}, %{day3}, %{day4}, and %{day5}.");
          }, function() {
            return _("You deliver all day on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, and %{day6}.");
          }, function() {
            return _("You deliver all day on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, %{day6}, and %{day7}.");
          }
        ]
      },
      "pickup": {
        "none": function() {
          return _("You don't offer pickup.");
        },
        "hours": [
          function() {
            return _("You offer pickup between %{start_time} and %{end_time} every day.");
          }, function() {
            return _("You offer pickup between %{start_time} and %{end_time} on %{day1}.");
          }, function() {
            return _("You offer pickup between %{start_time} and %{end_time} on %{day1} and %{day2}.");
          }, function() {
            return _("You offer pickup between %{start_time} and %{end_time} on %{day1}, %{day2}, and %{day3}.");
          }, function() {
            return _("You offer pickup between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, and %{day4}.");
          }, function() {
            return _("You offer pickup between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, %{day4}, and %{day5}.");
          }, function() {
            return _("You offer pickup between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, and %{day6}.");
          }, function() {
            return _("You offer pickup between %{start_time} and %{end_time} on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, %{day6}, and %{day7}.");
          }
        ],
        "days": [
          function() {
            return _("You offer pickup all day every day.");
          }, function() {
            return _("You offer pickup all day on %{day1}.");
          }, function() {
            return _("You offer pickup all day on %{day1} and %{day2}.");
          }, function() {
            return _("You offer pickup all day on %{day1}, %{day2}, and %{day3}.");
          }, function() {
            return _("You offer pickup all day on %{day1}, %{day2}, %{day3}, and %{day4}.");
          }, function() {
            return _("You offer pickup all day on %{day1}, %{day2}, %{day3}, %{day4}, and %{day5}.");
          }, function() {
            return _("You offer pickup all day on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, and %{day6}.");
          }, function() {
            return _("You offer pickup all day on %{day1}, %{day2}, %{day3}, %{day4}, %{day5}, %{day6}, and %{day7}.");
          }
        ]
      }
    };

    FulfillmentSentence.generate_shipping_sentence = function(options) {
      var index, key, result, sentence_pool, val, _ref;
      if (options == null) {
        options = {};
      }
      key = index = result = null;
      sentence_pool = this.sentences[options.type];
      if (options.hour_start === "") {
        key = "days";
      } else {
        if (options.hour_end !== "") {
          key = "hours";
        } else {
          key = "days";
        }
      }
      if ((options.weekdays.length > 0) && (options.weekdays.length < 7)) {
        index = options.weekdays.length;
      } else if (options.weekdays.length === 7) {
        index = 0;
      } else {
        key = "none";
      }
      if (key != null) {
        result = sentence_pool[key];
        if (index != null) {
          result = result[index]();
        } else {
          result = result();
        }
      }
      if (result != null) {
        _ref = options.weekdays;
        for (index in _ref) {
          val = _ref[index];
          result = result.replace("%{day" + (parseInt(index) + 1) + "}", val);
        }
        return result.replace("%{start_time}", options.hour_start).replace("%{end_time}", options.hour_end);
      } else {
        return "";
      }
    };

    return FulfillmentSentence;

  })();

}).call(this);
(function() {

  Forrager.Product || (Forrager.Product = {});

  Forrager.Product.CarrierConfigurationModal = (function() {

    function CarrierConfigurationModal(element, callbacks) {
      var _this = this;
      if (callbacks == null) {
        callbacks = {};
      }
      this.element = $(element);
      this.callbacks = callbacks;
      this.dropdowns = this.find(".services-dropdown");
      this.ok_button = this.find(".modal-footer .btn-success");
      this.cancel_button = this.find(".modal-footer .btn-cancel");
      this.pill_template = '<div data-service-code="{{service_code}}" class="pill"><span>{{service_name}}</span><a class="close">×</a></div>';
      this.dropdown_item_template = '<li data-code="{{service_code}}"><a>{{service_name}}</a></li>';
      this.services = {};
      if (callbacks.initial_services != null) {
        this.initial_services = callbacks.initial_services();
        this.reset(this.initial_services);
      } else {
        this.initial_services = {};
      }
      this.connect_dropdowns(this.dropdowns);
      this.services = this.initial_services;
      this.ok_button.click(function() {
        if (_this.callbacks.on_submit != null) {
          return _this.callbacks.on_submit(_this.services);
        }
      });
      this.cancel_button.click(function() {
        return _this.reset(_this.initial_services);
      });
    }

    CarrierConfigurationModal.prototype.connect_dropdowns = function(dropdowns) {
      var dropdown, item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = dropdowns.length; _i < _len; _i++) {
        dropdown = dropdowns[_i];
        _results.push((function() {
          var _j, _len1, _ref, _results1;
          _ref = $("li a", this.find(dropdown));
          _results1 = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            item = _ref[_j];
            _results1.push(this.connect_dropdown_item(item));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    CarrierConfigurationModal.prototype.connect_dropdown_item = function(item) {
      var that;
      that = this;
      return $(item).click(function() {
        that.add_service($(this).parent());
        return $(this).parent().remove();
      });
    };

    CarrierConfigurationModal.prototype.reset = function(initial_services) {
      var carrier_name, container, service, services, _results;
      _results = [];
      for (carrier_name in initial_services) {
        services = initial_services[carrier_name];
        container = this.find(".carrier-" + (carrier_name.toLowerCase()) + " .pill-container");
        container.html("");
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = services.length; _i < _len; _i++) {
            service = services[_i];
            _results1.push(container.append(this.create_pill({
              service_code: service.service_code,
              service_name: service.service_name
            })));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    CarrierConfigurationModal.prototype.add_service = function(element, dropdown) {
      var carrier_name, container, service_code, service_name, _base;
      service_code = $(element).data("code");
      service_name = $(element).text();
      carrier_name = $(element).parent().data("carrier-name");
      container = $(".carrier-" + carrier_name.toLowerCase() + " .pill-container");
      container.append(this.create_pill({
        service_code: service_code,
        service_name: service_name
      }));
      (_base = this.services)[carrier_name] || (_base[carrier_name] = []);
      return this.services[carrier_name].push({
        service_code: service_code,
        service_name: service_name
      });
    };

    CarrierConfigurationModal.prototype.remove_service = function(element) {
      var carrier_name, dropdown, dropdown_item, fields, found_index, index, rate, rate_index, _i, _len, _ref;
      dropdown = $(".dropdown-menu", $(element).parent().parent());
      carrier_name = $(dropdown).data("carrier-name");
      rate_index = -1;
      fields = {
        service_code: $(element).data("service-code").toString(),
        service_name: $("span", element).text()
      };
      found_index = -1;
      _ref = this.services[carrier_name];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        rate = _ref[index];
        if (rate.service_code === fields.service_code) {
          found_index = index;
          break;
        }
      }
      if (found_index > -1) {
        this.services[carrier_name].splice(found_index, 1);
      }
      dropdown_item = $(this.render_template(this.dropdown_item_template, fields));
      $(dropdown).append(dropdown_item);
      this.connect_dropdown_item($("a", dropdown_item));
      return element.remove();
    };

    CarrierConfigurationModal.prototype.create_pill = function(fields) {
      var pill, that;
      that = this;
      pill = $(this.render_template(this.pill_template, fields));
      $("a.close", pill).click(function() {
        return that.remove_service($(this).parent());
      });
      return pill;
    };

    CarrierConfigurationModal.prototype.render_template = function(template, fields) {
      var field, result, value;
      result = template;
      for (field in fields) {
        value = fields[field];
        result = result.replace("{{" + field + "}}", value);
      }
      return result;
    };

    CarrierConfigurationModal.prototype.find = function(selector) {
      return $(selector, this.element);
    };

    return CarrierConfigurationModal;

  })();

}).call(this);
(function() {

  Forrager.Pages || (Forrager.Pages = {});

  $(document).ready(function() {
    var current_page, navigate_away_ok, serialized_product_update_form;
    Forrager.Pages.ProductPage = {
      product_image_progressbar_interval: 0,
      product_image_progressbar_start_width: 45,
      upload_product_image_modal: new Forrager.PopForm($("#upload-product-image-modal")),
      add_address_modal: new Forrager.PopForm($("#add-address-modal")),
      carrier_configuration_modal: new Forrager.Product.CarrierConfigurationModal($("#carrier-configuration-modal"), {
        initial_services: function() {
          var carrier_name, element, services, _i, _len, _ref;
          services = {};
          _ref = $(".carrier-services input");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            element = _ref[_i];
            carrier_name = $(element).data("carrier-name");
            services[carrier_name] || (services[carrier_name] = []);
            services[carrier_name].push({
              service_name: $(element).data("service-name"),
              service_code: $(element).val()
            });
          }
          return services;
        },
        on_submit: function(chosen_services) {
          var carrier_name, container, service, services, _results;
          container = $(".carrier-services");
          container.html("");
          _results = [];
          for (carrier_name in chosen_services) {
            services = chosen_services[carrier_name];
            _results.push((function() {
              var _i, _len, _results1;
              _results1 = [];
              for (_i = 0, _len = services.length; _i < _len; _i++) {
                service = services[_i];
                _results1.push(container.append($("<input type='hidden' data-service-name='" + service.service_name + "' data-carrier-name='" + carrier_name + "' name='product[shipping_option][carrier_services][" + carrier_name + "][]' value='" + service.service_code + "' />")));
              }
              return _results1;
            })());
          }
          return _results;
        }
      }),
      add_ingredient_modal: new Forrager.PopForm($("#add-ingredient-modal"), {
        onClear: function(popform) {
          $(".ingredient-details", $(popform.base_form)).hide();
          $(".ingredient-select", $(popform.base_form)).show();
          $("input[name=ndb_no]", $(popform.base_form)).val("");
          return $("#no-search-results", $(popform.base_form)).hide();
        }
      }),
      select_ingredient: function(name, ndb_no, weights) {
        var parent_form, sel_units, select_html, weight;
        parent_form = $("#add-ingredient-modal");
        select_html = "";
        $(".ingredient-details", parent_form).show();
        $(".ingredient-select", parent_form).hide();
        $("input[name=ndb_no]", parent_form).val(ndb_no);
        $(".ingredient-name", parent_form).text(name);
        select_html = ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = weights.length; _i < _len; _i++) {
            weight = weights[_i];
            _results.push("<option>" + weight + "</option>");
          }
          return _results;
        })()).join("");
        sel_units = $(".sel_units", parent_form);
        sel_units.html(select_html);
        sel_units.selectBox("destroy");
        return sel_units.selectBox("create");
      },
      ingredient_typeahead: new Forrager.Product.IngredientTypeahead($("input.keywords"), {
        onSearchStart: function() {
          Forrager.current_page.add_ingredient_modal.spinner.show();
          return $("#no-search-results").hide();
        },
        onSearchComplete: function() {
          return Forrager.current_page.add_ingredient_modal.spinner.hide();
        },
        onSelect: function(selected_result) {
          return Forrager.current_page.select_ingredient(selected_result.value, selected_result.ndb_no, selected_result.weights);
        },
        onSearchSuccess: function(search_results) {
          var empty, key, val;
          empty = ((function() {
            var _results;
            _results = [];
            for (key in search_results) {
              val = search_results[key];
              _results.push(true);
            }
            return _results;
          })()).length === 0;
          if (empty) {
            $("#no-search-results").show();
            return $(".keywords_loader_container").hide();
          } else {
            return $("#no-search-results").hide();
          }
        },
        onSearchFailure: function(status) {
          $(".keywords_loader_container").hide();
          return $("#no-search-results").show();
        }
      }),
      reset_product_image_progressbar: function(popform) {
        var bar, progress_bar;
        progress_bar = $("div.progress", popform.form);
        bar = $("div.bar", progress_bar);
        progress_bar.hide();
        bar.css("width", this.product_image_progressbar_start_width);
        return window.clearInterval(this.product_image_progressbar_interval);
      },
      update_delivery_string: function() {
        var options, weekdays;
        weekdays = [];
        $("table#delivery_days td.check div.forrager-checkbox").each(function(index, element) {
          if ($("input[type=hidden]", $(element)).val() === "1") {
            weekdays.push($("input[type=checkbox]", $(element)).attr("text"));
          }
        });
        options = {
          type: "delivery",
          hour_start: $("#txt_delivery_hour_start").val(),
          hour_end: $("#txt_delivery_hour_end").val(),
          weekdays: weekdays
        };
        return $("#delivery_sentence").text(Forrager.Product.FulfillmentSentence.generate_shipping_sentence(options));
      },
      update_pickup_string: function() {
        var options, weekdays;
        weekdays = [];
        $("table#pickup_days td.check div.forrager-checkbox").each(function(index, element) {
          if ($("input[type=hidden]", $(element)).val() === "1") {
            weekdays.push($("input[type=checkbox]", $(element)).attr("text"));
          }
        });
        options = {
          type: "pickup",
          hour_start: $("#txt_pickup_hour_start").val(),
          hour_end: $("#txt_pickup_hour_end").val(),
          weekdays: weekdays
        };
        return $("#pickup_sentence").text(Forrager.Product.FulfillmentSentence.generate_shipping_sentence(options));
      },
      remove_unsaved_ingredient: function(delete_id) {
        if (confirm(_("Are you sure you want to remove this ingredient?"))) {
          $("tr[data-delete-id=" + delete_id + "]").remove();
          return $("input[data-delete-id=" + delete_id + "]").remove();
        }
      },
      select_all: function(checkboxes) {
        return $(checkboxes).each(function(index, item) {
          if (!$(item).hasClass("checked")) {
            return $(item).click();
          }
        });
      },
      select_none: function(checkboxes) {
        return $(checkboxes).each(function(index, item) {
          if ($(item).hasClass("checked")) {
            return $(item).click();
          }
        });
      },
      fetch_description_preview: function(text, callback) {
        return $.ajax({
          dataType: "json",
          url: Routes.product_description_preview_path("json"),
          data: {
            description: text
          },
          success: function(data, status, xhr) {
            return callback(data.preview);
          },
          error: function(xhr, status, error) {
            return alert("Something went wrong getting the description preview.");
          }
        });
      }
    };
    current_page = Forrager.current_page = Forrager.Pages.ProductPage;
    $('#product_image_carousel').carousel();
    $(".add_ingredient_btn").click(function() {
      return $("form#frm_add_ingredient input[name=recipe_id]").val($(this).attr("recipe-id"));
    });
    $("table#delivery_days td.check div.forrager-checkbox").each(function(index, element) {
      $(element).click(function() {
        current_page.update_delivery_string();
      });
    });
    $("table#pickup_days td.check div.forrager-checkbox").each(function(index, element) {
      $(element).click(function() {
        current_page.update_pickup_string();
      });
    });
    $("#txt_delivery_hour_start, #txt_delivery_hour_end").keyup(function() {
      current_page.update_delivery_string();
    });
    $("#txt_pickup_hour_start, #txt_pickup_hour_end").keyup(function() {
      current_page.update_pickup_string();
    });
    current_page.update_delivery_string();
    current_page.update_pickup_string();
    serialized_product_update_form = $("#frm_update_product").serialize();
    navigate_away_ok = false;
    window.onbeforeunload = function() {
      if (!navigate_away_ok) {
        if ($("#frm_update_product").serialize() !== serialized_product_update_form) {
          return _("You have made unsaved changes to your product!  Navigating away from this page will cause your changes to be lost.");
        }
      }
    };
    $("#frm_update_product").submit(function() {
      return navigate_away_ok = true;
    });
    $("#delivery_days_all").click(function() {
      return current_page.select_all($("table#delivery_days div.forrager-checkbox"));
    });
    $("#pickup_days_all").click(function() {
      return current_page.select_all($("table#pickup_days div.forrager-checkbox"));
    });
    $("#delivery_days_none").click(function() {
      return current_page.select_none($("table#delivery_days div.forrager-checkbox"));
    });
    $("#pickup_days_none").click(function() {
      return current_page.select_none($("table#pickup_days div.forrager-checkbox"));
    });
    $("#product_delivery_option_address_id, #product_pickup_option_address_id, #product_shipping_option_address_id").selectBox().change(function() {
      if ($(this).val() === "0") {
        $("#add-address-modal").modal("show");
        return $(this).selectBox("value", [null]);
      }
    });
    $(".description-preview-tab").click(function() {
      $(".description-preview-content").html("Loading...");
      $(".description-preview-content").show();
      $(".description-write-content").hide();
      $(this).addClass("active");
      $(".description-write-tab").removeClass("active");
      return current_page.fetch_description_preview($("#product_description").val(), function(preview) {
        return $(".description-preview-content").html(preview);
      });
    });
    $(".description-write-tab").click(function() {
      $(".description-preview-content").hide();
      $(".description-write-content").show();
      $(this).addClass("active");
      return $(".description-preview-tab").removeClass("active");
    });
    $(".common-ingredient").click(function() {
      $("#keywords").val("");
      return current_page.select_ingredient($(this).text(), $(this).data("ndb-no"), $(this).data("weights"));
    });
    return $(".ingredient-back-btn").click(function() {
      $(".ingredient-details", $("#add-ingredient-modal")).hide();
      return $(".ingredient-select", $("#add-ingredient-modal")).show();
    });
  });

}).call(this);
