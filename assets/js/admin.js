$(document).ready(function() {
    console.log("ready!");

    var token = undefined

    $("#authenticate").submit(function(e) {

        e.preventDefault(); //Prevent Default action.

        var formData = new FormData(this);
        $.ajax({
            url: "http://api.pawnsofgot.com/authenticate",
            type: 'POST',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data, textStatus, jqXHR) {
                var response = $.parseJSON(data)
                if (response.success) {
                    token = response.token
                    console.log(token)
                    loadAll()
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {}
        });

    });

    function loadPawns() {

        $("#pawns tbody").remove();

        $.get("http://api.pawnsofgot.com/pawn", function(data, status) {

            var sorted = data.data.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

            $.each(sorted, function(i, item) {
                var $tr = $('<tr>').append(
                    $('<td>').text(item._id),
                    $('<td>').text(item.name),
                    $('<td>').text(item.house),
                    $('<td>').text(item.quote),
                    $('<td>').text(item.location),
                    $('<td>').text(item.status)

                ).appendTo('#pawns');
            })
        });

    }

    function loadLocations() {

        $("#locations tbody").remove();

        $.get("http://api.pawnsofgot.com/location", function(data, status) {

            var sorted = data.data.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

            $.each(sorted, function(i, item) {
                var $tr = $('<tr>').append(
                    $('<td>').text(item._id),
                    $('<td>').text(item.name)
                ).appendTo('#locations');
            })
        });
    }

    function loadHouses() {

        $("#houses tbody").remove();

        $.get("http://api.pawnsofgot.com/house", function(data, status) {

            var sorted = data.data.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });

            $.each(sorted, function(i, item) {
                var $tr = $('<tr>').append(
                    $('<td>').text(item._id),
                    $('<td>').text(item.name)
                ).appendTo('#houses');
            })
        });

    }

    function loadLocationOptions() {
        $('.locationOptions').empty();
        $.get("http://api.pawnsofgot.com/location", function(data, status) {
            $.each(data.data, function(i, item) {
                $('.locationOptions').append(
                    $('<option></option>').val(item.name).html(item.name)
                )
            })
        });
    }

    function loadHouseOptions() {
        $('.houseOptions').empty();
        $.get("http://api.pawnsofgot.com/house", function(data, status) {
            $.each(data.data, function(i, item) {
                $('.houseOptions').append(
                    $('<option></option>').val(item.name).html(item.name)
                )
            })
        });
    }

    function loadAll() {

        loadPawns()
        loadLocations()
        loadHouses()
        loadLocationOptions()
        loadHouseOptions()

    }

    $("#newPawn").submit(function(e) {

        e.preventDefault(); //Prevent Default action.

        var formData = new FormData(this);
        $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('token', token);
            },
            url: "http://api.pawnsofgot.com/pawn",
            type: 'POST',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data, textStatus, jqXHR) {
                var response = $.parseJSON(data)
                if (response.success) {
                    token = response.token
                    console.log(token)
                    loadPawns()
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {}
        });

    });

    $("#editPawn").submit(function(e) {

        e.preventDefault(); //Prevent Default action.

        var pawnid = $('#pawnid').val();

        $(':input', this).each(function() {
            this.disabled = !($(this).val());
        });

        var formData = new FormData(this);
        console.log(formData)
        $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('token', token);
            },
            url: "http://api.pawnsofgot.com/pawn/" + pawnid,
            type: 'PUT',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data, textStatus, jqXHR) {

                $('input').each(function() {
                    console.log("testddddddd")
                    $(this).removeAttr("disabled")
                });

                loadPawns()
            },
            error: function(jqXHR, textStatus, errorThrown) {}
        });

    });

    $("#newLocation").submit(function(e) {

        e.preventDefault(); //Prevent Default action.

        var formData = new FormData(this);
        $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('token', token);
            },
            url: "http://api.pawnsofgot.com/location",
            type: 'POST',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data, textStatus, jqXHR) {
                var response = $.parseJSON(data)
                if (response.success) {
                    token = response.token
                    console.log(token)
                    loadLocations()
                    loadLocationOptions()
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {}
        });

    });

    $("#newHouse").submit(function(e) {

        e.preventDefault(); //Prevent Default action.

        var formData = new FormData(this);
        $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('token', token);
            },
            url: "http://api.pawnsofgot.com/house",
            type: 'POST',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data, textStatus, jqXHR) {
                var response = $.parseJSON(data)
                if (response.success) {
                    token = response.token
                    console.log(token)
                    loadHouses()
                    loadHouseOptions()
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {}
        });

    });
});
