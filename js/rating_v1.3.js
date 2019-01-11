  var test_data = "";
  var total_controls = 1;
  var answer_selected = 0;
  var valid_dates = false;

  azv_rating_list();

  $(document).ready(function () {

    if (localStorage.getItem("azvNr")) {
      $('#azvNr').val(localStorage.getItem("azvNr"));
      answer_selected++;

      $('#dob_day').val(localStorage.getItem("dob_day"));
      $('#dob_month').val(localStorage.getItem("dob_month"));
      $('#dob_year').val(localStorage.getItem("dob_year"));
    }
  });

  $('#btn_rating').click(function (e) {
    e.preventDefault();
    $("#btn_rating").prop("disabled", true);

    $(".date").each(function () {
      if ($.trim($(this).val()).length == 0) {
        valid_dates = false;
      }
    });

    if (valid_dates) {
      var json_general_value = '';
      var json_questions_value = '';
      var general_index = 0;

      json_general_value = '{ "azv_number": "' + $('#azvNr').val() + '", "azv_dob": "' + $('#dob').val() + '","azv_last_visit": "' + $('#azv_last_visit').val() + '",';
      json_questions_value = ' "azv_rating":{'

      $('.rating-control').each(function (index, value) {
        if (index != 0) {
          json_questions_value += ',';
        }
        json_questions_value += '"' + $(this).children().attr('question') + '": "' + $('#rating_' + (index+1)).text() + '"';
      });

      json_general_value += json_questions_value + '} } ';

      if ($('#azvNr').val() != '' && $('#dob').val() != '' && $('#azv_last_visit').val() != '') {

        if (isValidDate($('#dob').val()) && isValidDate($('#azv_last_visit').val())) {

          var GivenDate = $('#azv_last_visit').val();
          var CurrentDate = new Date();
          GivenDate = new Date(GivenDate);

          if (GivenDate < CurrentDate) {
            validate_AZV_DOB($('#azvNr').val(), $('#dob').val(), json_general_value);
          }
          else {
            $("body").overhang({
              type: "warn",
              message: "Please, select a valid date...",
              duration: 3,
              overlay: true
            });
            loader(false);
            $("#btn_rating").prop("disabled", false);
          }
        }
        else {
          $("body").overhang({
            type: "warn",
            message: "Please, select a valid date...",
            duration: 3,
            overlay: true
          });
          loader(false);
          $("#btn_rating").prop("disabled", false);
        }
      }
      else {
        $("body").overhang({
          type: "warn",
          message: "Please, fill all fields!",
          duration: 3,
          overlay: true
        });
        loader(false);
        $("#btn_rating").prop("disabled", false);
      }
    }
    else {
      $("body").overhang({
        type: "warn",
        message: "Please, fill all fields!",
        duration: 3,
        overlay: true
      });
      loader(false);
      $("#btn_rating").prop("disabled", false);
    }
  });

  function azv_rating_list() {
    loader(true);
    $method = 'GET';
    $url = server + 'ratingquestions';
    $.ajax({
      type: $method,
      url: $url,
      ContentType: "application/json",
      async: false,
      headers: {
      },
      success: function (data) {
        azv_rating_list_ok(data);
      },
      error: function (data) {
        rating_create_error(data);
      }
    });
  }

  function azv_rating_list_ok(data) {
    var html_questions = '';
    var data_length = data.length;

    if (data_length > 0) {
      $.each(data, function (i, item) {
        total_controls++;
        html_questions = '<div class="row azv-row">';

        switch (item.type) {
          case "radio":
            html_questions += '<div class="form-group">';
            html_questions += '<div class="text-center rating-radio rating-control">';
            html_questions += '<h5 question="Question ' + (i + 1) + '" id="' + (i + 1) + '" data_value=""><b>' + (i + 1) + '. ' + item.questions + '</b></h5>';

            $.each(item.extras.options, function (x, option) {
              html_questions += '<label class="radio-inline container">' + option + '<input type="radio" value ="' + option + '" control="opt_radio" name="question_' + (i + 1) + '"  question="' + (i + 1) + '"><span class="checkmark"></span></label>';
            });
            html_questions += '<label class="hidden" id="rating_' + (i + 1) + '" data_value=""></label>';
            html_questions += '</div>';
            html_questions += '</div>';
            break;

          case 'date':
            html_questions += '<div class="form-group">';
            html_questions += '<label class="control-label col-xs-12 text-center">' + (i + 1) + '. ' + item.questions + '?</label>';
            html_questions += '<div class="col-xs-8 col-xs-offset-2 date">';
            html_questions += '<div class="input-group input-append date datepicker rating-control">';
            html_questions += '<input type="text" class="form-control" name="question_' + (i + 1) + '" placeholder="12/29/2018" value="" />';
            html_questions += '<span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>';
            html_questions += '</div>';
            html_questions += '</div>';
            html_questions += '</div>';
            break;
          case 'text':
            html_questions += '<div class="form-group">';
            html_questions += '<label class="control-label col-xs-12 text-center">' + (i + 1) + '. ' + item.questions + '?</label>';
            html_questions += '<div class=" col-xs-offset-1 col-xs-10">';
            html_questions += '<div class="input-group input-append rating-control">';
            html_questions += '<textarea question="' + (i + 1) + '" data_value="" type="text" class="form-control" rows="3" cols="50" name="question_' + (i + 1) + '" placeholder="" value=""></textarea>';
            html_questions += '</div>';
            html_questions += '<input class="hidden" id="rating_' + (i + 1) + '" data_value=""></input>';
            html_questions += '</div>';
            html_questions += '</div>';

            break;
          case 'rating':
            var nr = (i + 1);
            html_questions += '<div class="form-group">';
            html_questions += '<div class="text-center">';
            html_questions += '<h5><b>' + (i + 1) + '. ' + item.questions + '</b></h5>';
            html_questions += '<div class="rating-stars text-center rating-control">';
            html_questions += '<ul id="stars" question="Question ' + (i + 1) + '" data_value="">';
            $.each(item.extras.options, function (x, option) {
              html_questions += '<li class="star" title="' + option + '" lnk="rating_' + (i + 1) + '" data-value="' + (x + 1) + '">';
              html_questions += '<i class="fa fa-star fa-fw"></i>';
              html_questions += '</li>';
            });
            html_questions += '</ul>';
            html_questions += '</div>';
            html_questions += '<label id="rating_' + (i + 1) + '"></label>';
            html_questions += '</div>';
            html_questions += '</div>';
            break;
        }

        html_questions += '</div>';
        html_questions += '<hr class="azv-hr">';
        $('#questions').append(html_questions);
        html_questions = '';
      });
    }
    loader(false);
  }

  function responseMessage(msg) {
    $('.success-box').fadeIn(200);
    $('.success-box div.text-message').html("<span>" + msg + "</span>");
  }

  function validate_AZV_DOB(azvNr, dob, json_value) {
    loader(true);
    $method = 'POST';
    $url = server + 'validateinsured';
    var datastring = '{ "azv_number": "' + azvNr + '",';
    datastring += ' "azv_dob": "' + dob + '"}';

    $.ajax({
      type: $method,
      url: $url,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: datastring,
      async: true,
      headers: {
      },
      success: function (data) {
        if (data.statuscode == 201) {
          rating_create(json_value);
        }
        else if (data.statuscode == 401) {
          $("body").overhang({
            type: "error",
            message: "Oops! The AZV number or date of birth are wrong, or user is not registered at AZV.",
            duration: 3,
            overlay: true
          });
        }
        else {
          $("body").overhang({
            type: "error",
            message: "Oops! We have an error in the system, please try again in a few moments.",
            duration: 3,
            overlay: true
          });
        }
        loader(false);
        $("#btn_rating").prop("disabled", false);
      },
      error: function (data) {
        rating_create_error(data);
      }
    });
  }

  function rating_create(json_value) {
    loader(true);
    $("#btn_rating").prop("disabled", true);
    $method = 'POST';
    $url = server + 'rating'
    $.ajax({
      type: $method,
      url: $url,
      ContentType: "application/json",
      data: json_value,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        rating_create_ok(data);
      },
      error: function (data) {
        rating_create_error(data);
      }
    });
  }

  function rating_create_ok(data) {
    if (data.statuscode == 201) {
      $('#confirm_modal').click();
    }
    else if (data.statuscode == 401) {
      $("body").overhang({
        type: "error",
        message: "Oops! The AZV number or date of birth are wrong, or user is not registered at AZV.",
        duration: 3,
        overlay: true
      });
    }
    else if (data.statuscode == 429) {
      $("body").overhang({
        type: "warn",
        message: "Rating not possible. You already sumitted a rating this month.",
        duration: 3,
        overlay: true
      });
    }
    else {
      $("body").overhang({
        type: "error",
        message: "Oops! We have an error in the system, please try again in a few moments.",
        duration: 3,
        overlay: true
      });
    }
    loader(false);
    $("#btn_rating").prop("disabled", false);
  }

  $('#modal_yes').click(function (e) {
    e.preventDefault();

    $('#modal_question').addClass('hidden');
    $('#modal_save_data').removeClass('hidden');
    $('#modal_footer').addClass('hidden');

    localStorage.setItem("azvNr", $('#azvNr').val());
    localStorage.setItem("dob_day", $('#dob_day').val());
    localStorage.setItem("dob_month", $('#dob_month').val());
    localStorage.setItem("dob_year", $('#dob_year').val());

    setTimeout(function () {
      window.location.href = 'home.html';
    }, 3500);
  });

  $('#modal_no').click(function (e) {
    e.preventDefault();

    $('#modal_question').addClass('hidden');
    $('#modal_save_data').removeClass('hidden');
    $('#modal_footer').addClass('hidden');

    localStorage.removeItem("azvNr");
    localStorage.removeItem("dob_day");
    localStorage.removeItem("dob_month");
    localStorage.removeItem("dob_year");

    setTimeout(function () {
      window.location.href = 'home.html';
    }, 3500);
  });
  $('#stars li').on('mouseover', function () {
    var onStar = parseInt($(this).data('value'), 10); 
    $(this).parent().children('li.star').each(function (e) {
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });

  }).on('mouseout', function () {
    $(this).parent().children('li.star').each(function (e) {
      $(this).removeClass('hover');
    });
  });

  $('#stars li').on('click', function () {

    var onStar = parseInt($(this).data('value'), 10);
    var stars = $(this).parent().children('li.star');

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }

    var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    var msg = "";
    if (ratingValue > 1) {
      msg = "Thanks! You rated this " + ratingValue + " stars.";
    }
    else {
      msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
    }
    responseMessage(msg);

    $('#' + $(this).attr('lnk') + '').text($(this).attr('Title'));

    if ($(this).parent().attr('data_value') == '') {
      answer_selected++;
    }

    $(this).parent().attr('data_value', onStar);

    if (answer_selected >= total_controls) {
      if ($('#dob').val() != '' && $('#azv_last_visit').val() != '') {
        $("#btn_rating").prop("disabled", false);
      }
    }
  });

  $('input[control="opt_radio"]').change(function () {

    $('#rating_' + $(this).attr('question') + '').text($(this).val());
    if ($('#rating_' + $(this).attr('question') + '').attr('data_value') == '') {
      answer_selected++;
    }
    $('#rating_' + $(this).attr('question') + '').attr('data_value', $(this).attr('question'));
    if (answer_selected >= total_controls) {
      if ($('#dob').val() != '' && $('#azv_last_visit').val() != '') {
        $("#btn_rating").prop("disabled", false);
      }
    }
  });

  $('textarea').change(function () {
    if ($(this).val() != '') {
      $('#rating_' + $(this).attr('question') + '').text($(this).val());

      if ($('#rating_' + $(this).attr('question') + '').attr('data_value') == '') {
        answer_selected++;
      }
      $('#rating_' + $(this).attr('question') + '').attr('data_value', $(this).attr('question'));

      if (answer_selected >= total_controls) {
        if ($('#dob').val() != '' && $('#azv_last_visit').val() != '') {
          $("#btn_rating").prop("disabled", false);
        }
      }
    }
    else {
      $('#rating_' + $(this).attr('question') + '').attr('data_value', '');
      answer_selected--;
    }

  });

  $('#azvNr').change(function () {
    if ($(this).val() != '') {
      answer_selected++;
    }
    else {
      answer_selected--;
    }
    if (answer_selected >= total_controls) {
      if ($('#dob').val() != '' && $('#azv_last_visit').val() != '') {
        $("#btn_rating").prop("disabled", false);
      }
    }
  });

  $('select').change(function () {
    valid_dates = true;
    $(".date").each(function () {
      if ($.trim($(this).val()).length == 0) {
        valid_dates = false;
      }
    });
    if (valid_dates) {
      $('#dob').val($('#dob_year').val() + '-' + $('#dob_month').val() + '-' + $('#dob_day').val());
      $('#azv_last_visit').val($('#azv_last_visit_year').val() + '-' + $('#azv_last_visit_month').val() + '-' + $('#azv_last_visit_day').val());

      if (answer_selected >= total_controls) {
        $("#btn_rating").prop("disabled", false);
      }
    }
  });

  function rating_create_error(data) {
    console.log(data);
    if (data.status == 401) {
      $("body").overhang({
        type: "error",
        message: "Oops! The AZV number or date of birth are wrong, or user is not registered at AZV.",
        duration: 3,
        overlay: true
      });
    }
    else if (data.status == 429) {
      $("body").overhang({
        type: "warn",
        message: "Rating not possible. You already sumitted a rating this month.",
        duration: 3,
        overlay: true
      });
    }
    else {
      $("body").overhang({
        type: "error",
        message: "Oops! We have an error in the system, please try again in a few moments.",
        duration: 3,
        overlay: true
      });
    }
    loader(false);
    $("#btn_rating").prop("disabled", false);
  }