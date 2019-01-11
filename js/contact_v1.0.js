$("#contact_us").submit(function (e) {
  e.preventDefault();
  loader(true);
  $("#contact-us-button").prop("disabled", true);

  if ($('#first_name').val() != '' && $('#last_name').val() != '' && $('#phone_number').val() != '' && $('#email').val() != '' && $('#subject').val() != '' && $('#message').val() != '') {

    var datastring = '{ "first_name": "' + $('#first_name').val() + '",';
    datastring += ' "last_name": "' + $('#last_name').val() + '",';
    datastring += ' "phone_number": "' + $('#phone_number').val() + '",';
    datastring += ' "email": "' + $('#email').val() + '",';
    datastring += ' "subject": "' + $('#subject').val() + '",';
    datastring += ' "message": "' + $('#message').val() + '"}';

    $.ajax({
      type: "POST",
      url: server + 'contact',
      data: datastring,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      async: true,
      headers: {
      },
      success: function (data) {
        loader(false);
        $("body").overhang({
          type: "success",
          message: "Thanks! Comments sent successfully.",
          duration: 3,
          primary: "#6EAF22",
          accent: "#3a5d12",
          overlay: true
        });
        setTimeout(function () {
          window.location.href = 'home.html';
        }, 3500);
      },
      error: function () {
        $("body").overhang({
          type: "error",
          message: "Oeps! We have an error in the system, please try again in a few moments",
          duration: 3,
          overlay: true
        });
        loader(false);
        $("#contact-us-button").prop("disabled", false);
      }
    });
  }
  else {
    $("body").overhang({
      type: "warn",
      message: "Please! fill in all fields",
      duration: 3,
      overlay: true
    });
    loader(false);
    $("#contact-us-button").prop("disabled", false);
  }
});