$(document).ready(function () {
    var dataLocal = [];
    localStorage.setItem("fields", JSON.stringify(dataLocal));
    $('[data-toggle="tooltip"]').tooltip();
    $("#add-new-field").click(function () {
        $(this).attr("disabled", "disabled");
        var index = $(".table-fields tbody tr:last-child").index();
        var row =
            "" +
            '<tr id="tr1">' +
            '<td class="tg-nrix" rowspan="3">' +
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
            '<td class="tg-nrix" rowspan="3">' +
            '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
            '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
            "</td>" +
            "</tr>" +
            '<tr id="tr2">' +
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
            '<tr id="tr3">' +
            "<td>" +
            '<div class="form-check form-check-inline">' +
            '<input class="form-check-input" type="checkbox" id="synonym" value="option3">' +
            '<label class="form-check-label" for="synonym">synonym</label>' +
            "</div>" +
            "</td>" +
            "<td>" +
            '<input class="form-control" type="number" id="importance_synonym" min="0" max="100" value="0">' +
            "</td>" +
            "</tr>";
        $(".table-fields").append(row);
        $(".table-fields tbody tr")
            .eq(index + 1)
            .find(".add")
            .toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(".table-fields").on("click", ".add", function () {
        var dataLocal = localStorage.getItem("fields");
        dataLocal =
            dataLocal === undefined || dataLocal === null
                ? []
                : JSON.parse(dataLocal);
        var field = $(this)
            .parents("tr")
            .find("#fields option:selected")
            .val();
        var analyzer_ngram = $('input[id="ngram"]').is(":checked");
        var analyzer_synonym = $('input[id="synonym"]').is(":checked");
        var analyzer_phonetic = $('input[id="phonetic"]').is(":checked");
        var importance_ngram = $('input[id="importance_ngram"]').val();
        var importance_synonym = $('input[id="importance_synonym"]').val();
        var importance_phonetic = $('input[id="importance_phonetic"]').val();
        var analyzers = [];

        if (dataLocal.length > 0) {
            for (let i = 0; i < dataLocal.length; i++) {
                const item = dataLocal[i];
                if (item.field === field) {
                    alert("this field: " + field + " is already exists");
                    return false;
                }
            }
        }

        if (analyzer_ngram)
            analyzers.push({ analyzer: "ngram", importance: importance_ngram });
        if (analyzer_synonym)
            analyzers.push({
                analyzer: "synonym",
                importance: importance_synonym,
            });
        if (analyzer_phonetic)
            analyzers.push({
                analyzer: "phonetic",
                importance: importance_phonetic,
            });

        var addField = { field, analyzers };

        dataLocal.push(addField);
        localStorage.setItem("fields", JSON.stringify(dataLocal));

        $('[data-toggle="tooltip"]').tooltip();
        var row =
            '<tr><td class="tg-nrix"><input id="id" type="hidden" value="' +
            field +
            '"/>' +
            field +
            '</td><td colspan="2">' +
            JSON.stringify(addField.analyzers) +
            '</td><td class="tg-nrix"><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td></tr>';
        $(".table-fields").append(row);
        $('[data-toggle="tooltip"]').tooltip();
        $("#add-new-field").removeAttr("disabled");
        $("#tr1,#tr2,#tr3,.tooltip").remove();
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
        $("#tr1,#tr2,#tr3,.tooltip").remove();
    });
});