$(function () {

  // test_data = '[{"id": 1,"typedoctor": 1,"name": "Noris Yagua-Velasquez","type": "Doctor di Cas","location":"Pabow di brug", "city": "Noord 63","hospital": "Urgent Care Aruba ","phonenumber": "5860512" },{"id": 2,"typedoctor": 1,"name": "Jillian Jones","type": "Doctor di Cas","location":"Pariba di brug", "city": "De La Sallestraat 71 A","hospital": "Hospital Name","phonenumber": "5839919"},{"id": 3,"typedoctor": 2,"name": "Botica Aloe","type": "Botica","location":"Pariba di brug","city": "Pos Chiquito 83, Aruba","hospital": "","phonenumber": "75844606"},{"id": 3,"typedoctor": 2,"name": "Botica Di Servicio Noord","type": "Botica","location":"Pabow di brug","city": "Caya Frans Figaroa 82, Noord, Aruba","hospital": "","phonenumber": "76408443"}]';
  // azv_salud_doctor_list_ok(test_data);

  azv_salud_doctor_list();

  function azv_salud_doctor_list() {
    loader(true);
    $method = 'GET';
    $url = server + 'medicalsp';
    $.ajax({

      type: $method,
      url: $url,
      ContentType: "application/json",
      headers: {
      },
      success: function (data) {
        azv_salud_doctor_list_ok(data);
      },
      error: function (data) {
        azv_salud_doctor_list_error(data);
      },
      complete: function (data) {
        loader(false);
      }
    });
  }

  function azv_salud_doctor_list_ok(data) {
    loader(true);
    // data = jQuery.parseJSON(data);

    var dr = '';
    var botica = '';
    var dentist = '';

    var data_length = data.length;
    if (data_length > 0) {

      $.each(data, function (i, item) {
        if (item.typedoctor == 1) {
          $('#div_dr').removeClass('hidden');

          dr += '<div class="row">';
          dr += '<div class="col-xs-3 col-sm-3 col-md-3 home-text-left">';
          dr += '<b>' + item.location + '</b>';
          dr += '</div>';
          dr += '<div class="col-xs-5 col-sm-5 col-md-5 home-text-middle"><p class="location-name"><b>' + item.name + '</b></p><p class="location-name">' + item.city + '</p></div>';
          dr += '<div class="col-xs-3 col-sm-3 col-md-3 home-text-right">';
          dr += '<a  class="azv-telf"href="tel:+29' + item.phonenumber + '"><i class="glyphicon glyphicon-earphone"></i>&nbsp;&nbsp;' + item.phonenumber + '</a>';
          // dr += '<p>  <i class="glyphicon glyphicon-earphone"></i>&nbsp;&nbsp;' + item.phonenumber + '</p>';

          dr += '</div>';
          dr += '</div>';
          if (item.typedoctor == (data[i + 1].typedoctor)) {
            dr += '<hr>';
          }
        }
        else if (item.typedoctor == 2) {
          $('#div_botica').removeClass('hidden');

          botica += '<div class="row">';
          botica += '<div class="col-xs-3 col-sm-3 col-md-3 home-text-left">';
          botica += '<b>' + item.location + '</b>';
          botica += '</div>';
          botica += '<div class="col-xs-7 col-sm-7 col-md-7 home-text-middle"><p class="location-name"><b>' + item.name + '</b></p><p class="location-name">' + item.city + '</p></div>';
          // botica += '<div class="col-xs-3 col-sm-3 col-md-3 home-text-right">';
          // botica += '<a  class="azv-telf"href="tel:+29' + item.phonenumber + '"><i class="glyphicon glyphicon-earphone"></i>&nbsp;&nbsp;' + item.phonenumber + '</a>';
          // botica += '<p>  <i class="glyphicon glyphicon-earphone"></i>&nbsp;&nbsp;' + item.phonenumber + '</p>';
          // botica += '</div>';
          botica += '</div>';
          if (i != (data_length - 1)) {
            botica += '<hr>';
          }
        }
        else {
          $('#div_dentist').removeClass('hidden');

          dentist += '<div class="row">';
          dentist += '<div class="col-xs-3 col-sm-3 col-md-3 home-text-left">';
          dentist += '<b>' + item.location + '</b>';
          dentist += '</div>';
          dentist += '<div class="col-xs-5 col-sm-5 col-md-5 home-text-middle"><p class="location-name"><b>' + item.name + '</b></p><p class="location-name">' + item.city + '</p></div>';
          dentist += '<div class="col-xs-3 col-sm-3 col-md-3 home-text-right">';
          dentist += '<a  class="azv-telf"href="tel:+29' + item.phonenumber + '"><i class="glyphicon glyphicon-earphone"></i>&nbsp;&nbsp;' + item.phonenumber + '</a>';
          // dentist += '<p>  <i class="glyphicon glyphicon-earphone"></i>&nbsp;&nbsp;' + item.phonenumber + '</p>';
          dentist += '</div>';
          dentist += '</div>';
          if (i != (data_length - 1)) {
            dentist += '<hr>';
          }
        }
      });

      $('#doctor_content').append(dr);
      $('#botica_content').append(botica);
      $('#dentits_content').append(dentist);
      loader(false);
    }
  }

  function azv_salud_doctor_list_error(data) {
    console.log(data);
    $("body").overhang({
      type: "error",
      message: "Oeps! We have an error in the system, please try again in a few moments",
      duration: 3,
      overlay: true
    });
  }
});
