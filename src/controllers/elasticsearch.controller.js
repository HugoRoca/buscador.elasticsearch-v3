const Elasticservice = require('../services/elasticsearch.service')
const service = new Elasticservice()

module.exports = class {
    async exec(ctx) {
        const params = ctx.request.body.data
        const data = await service.search(params)
        console.log(data)
        ctx.body = data
        /**
         * {
            hits: {
                hits: [
                    {
                        "_index": "producto_v3_cl_202006_sr",
                        "_type": "_doc",
                        "_id": "202006.168997.SR.0785576.0",
                        "_score": 1,
                        "_source": {
                            "activo": true,
                            "categorias": [
                                "Cuidado Personal",
                                "Maquillaje"
                            ],
                            "codigoCampania": "202006",
                            "codigoConsultora": "0785576",
                            "codigoEstrategia": 2003,
                            "codigoProducto": "200088586",
                            "codigoProductos": [
                                "200067116",
                                "200072538",
                                "200084504",
                                "200084505",
                                "200088564",
                                "200088570",
                                "200088574",
                                "200088577",
                                "200088580",
                                "200088586",
                                "200088588",
                                "200088592",
                                "200088595",
                                "200088600",
                                "200088604",
                                "200088606",
                                "200088617",
                                "200088630",
                                "200090627",
                                "200090645",
                                "200090646",
                                "200090647",
                                "200092172",
                                "200092174",
                                "200093862",
                                "200093863",
                                "200094221",
                                "200094223",
                                "200094224",
                                "200094225",
                                "200094227",
                                "200095052",
                                "200095053",
                                "200095054",
                                "200095055",
                                "200095056",
                                "200095058",
                                "200095059",
                                "200095060",
                                "200095625",
                                "200095629",
                                "200096705",
                                "200098508",
                                "200098664",
                                "200098672",
                                "200098820",
                                "200098821",
                                "210056391",
                                "210056392",
                                "210056393",
                                "210056434",
                                "210085606",
                                "210085608",
                                "210085609",
                                "210085610",
                                "210085611",
                                "210085612"
                            ],
                            "codigoTipoEstrategia": "030",
                            "codigoTipoOferta": "212",
                            "cuv": "168997",
                            "descripcion": "Delineador Lapiz para Ojos + Desodorante Roll On Esika + Studio Look Labial líquido",
                            "diaInicio": 0,
                            "disponible": true,
                            "esSubCampania": false,
                            "estrategiaId": 118773,
                            "flagFestival": 0,
                            "ganancia": 4780,
                            "grupoArticulos": [
                                "Cuidado Personal",
                                "Maquillaje"
                            ],
                            "imagen": "CL_202006_168997.jpg",
                            "imagenOrigen": "1",
                            "limiteVenta": 99,
                            "lineas": [
                                "AGUA DE COLONIA",
                                "ALOE",
                                "ALTHEUS",
                                "CARDIGAN",
                                "CLAUDIA",
                                "D'ORSAY/D'ARIEN CLASS",
                                "EARLY MASCULINA",
                                "EIA",
                                "EROS / EXUS / TESEO",
                                "ESIKA TOTAL SEC",
                                "EXPRESSION / DREAMS",
                                "FEMENINA P4 2015",
                                "FIORI / FLORAL",
                                "FLANKER EXPRESSION",
                                "FRAGANCIAS VARIOS DAMAS",
                                "KALOS SPORT / WINNER SPORT",
                                "MAGNAT",
                                "MOMENTOS / FANTASIA",
                                "ONIRYS",
                                "PULSO/INTENSE",
                                "SALVAJE",
                                "SECRET MUSK",
                                "STRONG MUSK",
                                "VANILLA SCENT",
                                "WINIMPACT/KALIMPACT/INSIMPACT",
                                "YOU / IT'S YOU"
                            ],
                            "marcaId": 2,
                            "marcas": [
                                "Cyzone",
                                "Ésika"
                            ],
                            "materialGanancia": false,
                            "ordenEstrategia": 3,
                            "orden": 8,
                            "precio": 6990,
                            "productoResumenId": "202006.168997.SR",
                            "revistaDigital": 0,
                            "seccion1": "Gana+ / Ofertas",
                            "textoBusqueda": "Delineador Lapiz para Ojos + Desodorante Roll On Esika + Studio Look Labial líquido  Labial líquido de color intenso. Trazo suave & Sin alcohol. Desodorante anti-transpirante roll-on femenino. masculino. Studio Look Líquido. Grape Mauve Burgundy Magenta Rose nude Strawberry Pink Raspberry Deep red Wine rose Dark Brown Peach Delineador en lápiz para ojos. Verde sidney Marrón café Vampy Turquesa magic Terracota Mocha Ruby Teddy Caramel Azul mediterráneo Negro lux Café intenso Plateado bacarat Kadia Sport Altheus Total Sec Unisex Eros Salvaje Mujer Magnat kalos impact Expression Strong musk Iluminas Cardigan Multicare. Aclarant protect Leyenda Absolut D'orsay Momentos libertad Fiori class sens Pulso Dual Secret Kalos sport Select You Live! Vanilla Scent",
                            "tipoEstrategiaId": 3023,
                            "tipoPersonalizacion": "SR",
                            "valorizado": 11770,
                            "zonasAgotadas": [],
                            "flagAgotado": false
                        }
                    }
                ]
            }
        }
         */
    }
}