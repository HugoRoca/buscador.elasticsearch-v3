$(document).ready(function () {
    var dataLocalOrders = [{"order":"orden","type":"asc","importance":"alta"},{"order":"ordenEstrategia","type":"asc","importance":"media"},{"order":"_score","type":"asc","importance":"baja"}];
    var dataLocalFields = [{"field":"textoBusqueda","analyzers":[{"analyzer":"ngram","importance":"12"},{"analyzer":"synonym","importance":"15"},{"analyzer":"phonetic","importance":"10"},{"analyzer":"","importance":"20"}]},{"field":"marcas","analyzers":[{"analyzer":"ngram","importance":"0"},{"analyzer":"synonym","importance":"6"},{"analyzer":"phonetic","importance":"4"},{"analyzer":"","importance":"8"}]},{"field":"categorias","analyzers":[{"analyzer":"ngram","importance":"0"},{"analyzer":"synonym","importance":"6"},{"analyzer":"phonetic","importance":"4"},{"analyzer":"","importance":"8"}]},{"field":"lineas","analyzers":[{"analyzer":"ngram","importance":"0"},{"analyzer":"synonym","importance":"6"},{"analyzer":"phonetic","importance":"2"},{"analyzer":"","importance":"8"}]},{"field":"grupoArticulos","analyzers":[{"analyzer":"ngram","importance":"0"},{"analyzer":"synonym","importance":"8"},{"analyzer":"phonetic","importance":"6"},{"analyzer":"","importance":"8"}]},{"field":"seccion1","analyzers":[{"analyzer":"ngram","importance":"0"},{"analyzer":"synonym","importance":"6"},{"analyzer":"phonetic","importance":"4"},{"analyzer":"","importance":"8"}]}];
    localStorage.setItem("fields", JSON.stringify(dataLocalFields));
    localStorage.setItem("orders", JSON.stringify(dataLocalOrders));

    $('[data-toggle="tooltip"]').tooltip();

    $("#add-new-field").click(function () {
        $(this).attr("disabled", "disabled");
        var index = $(".table-fields tbody tr:last-child").index();
        var row =
            '<tr id="tr1_field">' +
                '<td class="tg-nrix" rowspan="4">' +
                    '<select name="fields" id="fields" class="form-control">' +
                        '<option value="categorias">Categoría</option>' +
                        '<option value="textoBusqueda">Texto busqueda</option>' +
                        '<option value="marcas">Marcas</option>' +
                        '<option value="lineas">Lineas</option>' +
                        '<option value="grupoArticulos">Grupo articulos</option>' +
                        '<option value="seccion1">Sección</option>' +
                    "</select>" +
                "</td>" +
                "<td>" +
                    '<div class="form-check form-check-inline">' +
                        '<input class="form-check-input" type="checkbox" id="ngram" value="option1">' +
                        '<label class="form-check-label" for="ngram">ngram</label>' +
                    "</div>" +
                "</td>" +
                "<td>" +
                    '<input class="form-control" type="number" id="importance_ngram" min="0" max="100" value="0">' +
                "</td>" +
                '<td class="tg-nrix" rowspan="4">' +
                    '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
                    '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
                "</td>" +
            "</tr>" +
            '<tr id="tr2_field">' +
                "<td>" +
                    '<div class="form-check form-check-inline">' +
                        '<input class="form-check-input" type="checkbox" id="phonetic" value="option2">' +
                        '<label class="form-check-label" for="phonetic">phonetic</label>' +
                    "</div>" +
                "</td>" +
                "<td>" +
                    '<input class="form-control" type="number" id="importance_phonetic" min="0" max="100" value="0">' +
                "</td>" +
            "</tr>" +
            '<tr id="tr3_field">' +
                "<td>" +
                    '<div class="form-check form-check-inline">' +
                    '<input class="form-check-input" type="checkbox" id="synonym" value="option3">' +
                    '<label class="form-check-label" for="synonym">synonym</label>' +
                    "</div>" +
                "</td>" +
                "<td>" +
                    '<input class="form-control" type="number" id="importance_synonym" min="0" max="100" value="0">' +
                "</td>" +
            "</tr>" +
            '<tr id="tr4_field">' +
                "<td>" +
                    '<div class="form-check form-check-inline">' +
                    '<input class="form-check-input" type="checkbox" id="no_analyzers" value="option3">' +
                    '<label class="form-check-label" for="no_analyzers">Por defecto</label>' +
                    "</div>" +
                "</td>" +
                "<td>" +
                    '<input class="form-control" type="number" id="importance_no_analyzers" min="0" max="100" value="0">' +
                "</td>" +
            "</tr>";
        $(".table-fields").append(row);
        $(".table-fields tbody tr")
            .eq(index + 1)
            .find(".add")
            .toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('#add-new-order').click(function() {
        $(this).attr("disabled", "disabled");
        var index = $(".table-orders tbody tr:last-child").index();
        var row =
            '<tr id="tr1_order">' +
                '<td class="tg-nrix">' +
                    '<select name="order" id="order_field" class="form-control">' +
                    '<option value="ordenEstrategia">Orden estrategia</option>' +
                    '<option value="orden">Orden personalizado</option>' +
                    '<option value="_score">Score</option>' +
                    "</select>" +
                "</td>" +
                "<td>" +
                    '<form>'+
                        '<div class="form-check-inline">'+
                            '<label class="form-check-label">'+
                                '<input type="radio" class="form-check-input" name="chkOrder" id="order_asc" checked>asc'+
                            '</label>'+
                        '</div>'+
                        '<div class="form-check-inline">'+
                            '<label class="form-check-label">'+
                                '<input type="radio" class="form-check-input" name="chkOrder" id="order_desc">desc'+
                            '</label>'+
                        '</div>'+
                    '</form>'+
                "</td>" +
                "<td>" +
                    '<select name="order" id="order_importance" class="form-control">' +
                        '<option value="alta">Alta</option>' +
                        '<option value="media">Media</option>' +
                        '<option value="baja">Baja</option>' +
                    "</select>" +
                "</td>" +
                '<td class="tg-nrix">' +
                    '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
                    '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
                "</td>" +
            "</tr>";
        $(".table-orders").append(row);
        $(".table-orders tbody tr")
            .eq(index + 1)
            .find(".add")
            .toggle();
        $('[data-toggle="tooltip"]').tooltip();
    })

    $(".table-fields").on("click", ".add", function () {
        var dataLocal = localStorage.getItem("fields");
        dataLocal = dataLocal === undefined || dataLocal === null ? [] : JSON.parse(dataLocal);

        var fieldOpt = $(this).parents("tr").find("#fields option:selected");
        var field_name = fieldOpt.text()
        var field_value = fieldOpt.val()
        var analyzer_ngram = $('input[id="ngram"]').is(":checked");
        var analyzer_synonym = $('input[id="synonym"]').is(":checked");
        var analyzer_phonetic = $('input[id="phonetic"]').is(":checked");
        var no_analyzer = $('input[id="no_analyzers"]').is(":checked");
        var importance_ngram = $('input[id="importance_ngram"]').val();
        var importance_synonym = $('input[id="importance_synonym"]').val();
        var importance_phonetic = $('input[id="importance_phonetic"]').val();
        var importance_no_analyzer = $('input[id="importance_no_analyzers"]').val();
        var analyzers = [];

        if (dataLocal.length > 0) {
            for (let i = 0; i < dataLocal.length; i++) {
                const item = dataLocal[i];
                if (item.field === field_value) {
                    alert("this field: " + field_name + " is already exists");
                    return false;
                }
            }
        }

        if (analyzer_ngram) analyzers.push({ analyzer: "ngram", importance: importance_ngram });
        if (analyzer_synonym) analyzers.push({ analyzer: "synonym", importance: importance_synonym });
        if (analyzer_phonetic) analyzers.push({ analyzer: "phonetic", importance: importance_phonetic });
        if (no_analyzer) analyzers.push({ analyzer: "", importance: importance_no_analyzer });

        var addField = { field: field_value, analyzers };

        dataLocal.push(addField);
        localStorage.setItem("fields", JSON.stringify(dataLocal));

        $('[data-toggle="tooltip"]').tooltip();
        var row =
            '<tr>'+
                '<td class="tg-nrix"><input id="id" type="hidden" value="' + field_value + '"/>' + field_name + '</td>'+
                '<td colspan="2">' + JSON.stringify(addField.analyzers) + '</td>'+
                '<td class="tg-nrix">'+
                    '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
                '</td>'+
            '</tr>';
        $(".table-fields").append(row);
        $('[data-toggle="tooltip"]').tooltip();
        $("#add-new-field").removeAttr("disabled");
        $("#tr1_field,#tr2_field,#tr3_field,#tr4_field,.tooltip").remove();
    });

    $(".table-orders").on("click", ".add", function () {
        var dataLocal = localStorage.getItem("orders");
        dataLocal = dataLocal === undefined || dataLocal === null ? [] : JSON.parse(dataLocal);
        var order = $(this).parents("tr").find("#order_field option:selected");
        var order_name = order.text();
        var order_value = order.val();
        var order_importance = $(this).parents("tr").find("#order_importance option:selected");
        var order_importance_name = order_importance.text();
        var order_importance_value = order_importance.val();
        var asc_check = $('input[id="order_asc"]').is(":checked");

        if (dataLocal.length > 0) {
            for (let i = 0; i < dataLocal.length; i++) {
                const item = dataLocal[i];
                if (item.order === order_value) {
                    alert("this field: " + order_name + " is already exists");
                    return false;
                }
                if (item.importance === order_importance_value) {
                    alert("this field: " + order_importance_name + " is already exists");
                    return false;
                }
            }
        }

        var object = {
            order: order_value,
            type: asc_check ? 'asc' : 'desc',
            importance: order_importance_value
        }

        dataLocal.push(object);
        localStorage.setItem("orders", JSON.stringify(dataLocal));

        $('[data-toggle="tooltip"]').tooltip();

        var testTypeOrder = asc_check ? 'ascendente' : 'descendente';
        var row =
            '<tr>'+
                '<td><input id="id" type="hidden" value="' + order_value + '"/>' + order_name + '</td>'+
                '<td>' + testTypeOrder + '</td>'+
                '<td>' + order_importance_name + '</td>'+
                '<td>'+
                    '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
                '</td>'+
            '</tr>';
        
        $(".table-orders").append(row);
        $('[data-toggle="tooltip"]').tooltip();
        $("#add-new-order").removeAttr("disabled");
        $("#tr1_order,.tooltip").remove();
    });

    $(".table-fields").on("click", ".delete", function () {
        var dataLocal = localStorage.getItem("fields");
        dataLocal =
            dataLocal === undefined || dataLocal === null
                ? []
                : JSON.parse(dataLocal);
        var id = $(this).parents("tr").find('input[id="id"]').val();

        var newDataLocal = $.grep(dataLocal, (e) => {
            return e.field !== id;
        });

        localStorage.setItem("fields", JSON.stringify(newDataLocal));

        $(this).parents("tr").remove();

        $("#add-new-field").removeAttr("disabled");
        $("#tr1_field,#tr2_field,#tr3_field,.tooltip").remove();
    });

    $(".table-orders").on("click", ".delete", function () {
        var dataLocal = localStorage.getItem("orders");
        dataLocal = dataLocal === undefined || dataLocal === null ? [] : JSON.parse(dataLocal);
        var id = $(this).parents("tr").find('input[id="id"]').val();

        var newDataLocal = $.grep(dataLocal, (e) => {
            return e.order !== id;
        });

        localStorage.setItem("orders", JSON.stringify(newDataLocal));

        $(this).parents("tr").remove();

        $("#add-new-field").removeAttr("disabled");
        $("#tr1_order,.tooltip").remove();
    });
});