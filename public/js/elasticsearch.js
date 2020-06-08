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
        tblLista: $('#tblListas'),
        campaign: $('#Campaing'),
        country: $('#country'),
        size: $('#size'),
        type: $('#type'),
        operator: $('#operator')
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
                const item = data[i]._source
                tabla += '<tr>'
                tabla += '<td class="tg-nrix">' + item.tipoPersonalizacion + '</td>'
                tabla += '<td class="tg-nrix profitCol">' + item.cuv + '</td>'
                tabla += '<td>' + item.descripcion + '</td>'
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
                personalizationsDummy: _element.personalizaciones.val() === '' ? 'XYZ' : _element.personalizaciones.val(),
                billingDay: _element.diaFacturacion.val(),
                businessPartner: _element.chkSociaEmpresaria.is(':checked'),
                activeSubscription: _element.chkSuscripcionActiva.is(':checked'),
                mdo: _element.chkMdo.is(':checked'),
                rd: _element.chkRd.is(':checked'),
                rdi: _element.chkRdi.is(':checked'),
                rdr: _element.chkRdr.is(':checked'),
                campaign: _element.campaign.val(),
                country: _element.country.val(),
                size: _element.size.val(),
                type: _element.type.val(),
                operator: _element.operator.is(':checked') ? 'and' : undefined
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
                    alert('Configurar los campos de bpusqueda y ordenamiento son requeridos')
                    cargando(false)
                    return false
                }

                if (_element.txtSearch.val() === '') {
                    alert('Search text is missing')
                    cargando(false)
                    return false
                }

                let success = (r) => {
                    _util.pintar(r.hits.hits);
                    $('#query').val(r.query)
                    cargando(false);
                }
                let data = {
                    data: {
                        fields,
                        orders,
                        options: _model.option()
                    }
                }
                
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