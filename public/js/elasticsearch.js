const elastic = (() => {
    const _element = {
        txtSearch: $("#txtSearch"),
        codigoConsultora: $("#codigoConsultora"),
        codigoZona: $("#codigoZona"),
        personalizaciones: $("#personalizaciones"),
        diaFacturacion: $("#diaFacturacion"),
        chkSociaEmpresaria: $("#sociaEmpresaria"),
        chkSuscripcionActiva: $("#suscripcionActiva"),
        chkMdo: $("#mdo"),
        chkRd: $("#rd"),
        chkRdi: $("#rdi"),
        chkRdr: $("#rdr"),
        btnSearch: $("#btnSearch"),
        tblLista: $('#tblListas')
    }

    const _util = {
        defecto: (val) => {
            _element.txtSearch.val();
            _element.codigoConsultora.val();
            _element.codigoZona.val();
            _element.personalizaciones.val();
            _element.diaFacturacion.val();
            _element.chkSociaEmpresaria.prop('checked', val);
            _element.chkSuscripcionActiva.prop('checked', val);
            _element.chkMdo.prop('checked', val);
            _element.chkRd.prop('checked', val);
            _element.chkRdi.prop('checked', val);
            _element.chkRdr.prop('checked', val);
        },
        pintar: (data) => {
            let tabla = ''
            for (let i = 0; i < data.length; i++) {
                const score = data[i]._score
                const item = data[i]._source
                tabla += '<tr>'
                tabla += '<td class="tg-nrix">' + item.tipoPersonalizacion + '</td>'
                tabla += '<td class="tg-nrix profitCol">' + score + '</td>'
                tabla += '<td class="tg-nrix">'+item.cuv+'</td>'
                tabla += '<td class="textSearch">' + item.textoBusqueda + '</td>'
                tabla += '<td>' + JSON.stringify(item.categorias) + '</td>'
                tabla += '<td>' + JSON.stringify(item.marcas) + '</td>'
                tabla += '<td class="textSearch">' + JSON.stringify(item.lineas) + '</td>'
                tabla += '<td>' + JSON.stringify(item.grupoArticulos) + '</td>'
                tabla += '<td class="tg-nrix">' + item.seccion1 + '</td>'
                tabla += '<td class="tg-nrix">' + item.precio + '</td>'
                tabla += '<td class="tg-nrix">' + item.ganancia + '</td>'
                tabla += '<td class="tg-nrix">' + item.ordenEstrategia + '</td>'
                tabla += '<td class="tg-nrix">' + item.orden + '</td>'
                tabla += '</tr>'
            }
            _element.tblLista.html(tabla)
        }
    }

    const _model = {
        option: () => {
            return {
                txtSearch: _element.txtSearch.val(),
                codigoConsultora: _element.codigoConsultora.val(),
                codigoZona: _element.codigoZona.val(),
                personalizaciones: _element.personalizaciones.val(),
                diaFacturacion: _element.diaFacturacion.val(),
                chkSociaEmpresaria: _element.chkSociaEmpresaria.is(':checked'),
                chkSuscripcionActiva: _element.chkSuscripcionActiva.is(':checked'),
                chkMdo: _element.chkMdo.is(':checked'),
                chkRd: _element.chkRd.is(':checked'),
                chkRdi: _element.chkRdi.is(':checked'),
                chkRdr: _element.chkRdr.is(':checked')
            }
        }
    }

    const _service = {
        elastic: (data) => {
            return $.ajax({
                url: '/elasticsearch',
                type: 'POST',
                data: data
            })
        }
    }

    const _evento = {
        buscar: () => {
            _element.btnSearch.click((e) => {
                e.preventDefault();

                cargando(true);
                let orders = localStorage.getItem('orders')
                orders = orders === undefined || orders === null ? [] : JSON.parse(orders)

                let fields = localStorage.getItem('fields')
                fields = fields === undefined || fields === null ? [] : JSON.parse(fields)

                if (orders.length === 0 || fields.length === 0) {
                    alert('Add fields and orders is required')
                    return false
                }

                if (_element.txtSearch.val() === '') {
                    alert('Search text is missing')
                    return false
                }

                let success = (r) => {
                    _util.pintar(r.hits.hits);
                    cargando(false);
                }
                let data = {
                    data: {
                        fields,
                        orders,
                        options: {
                            ..._model.option(),
                            country: 'CL',
                            campaign: '202006',
                            type: 'best_fields',
                            operator: 'and',
                            size: '20'
                        },
                    }
                }
                console.log(data);
                _service.elastic(data).then(success, (e) => {
                    cargando(false)
                    console.error(e)
                })
            })
        }
    }

    const init = (() => {
        _evento.buscar()
    })

    return {
        init: init
    }
})();

(() => {
    elastic.init()
})()