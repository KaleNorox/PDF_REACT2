import { jsPDF } from "jspdf"
import './style.css';
import 'jspdf-autotable';
import qrcode from 'qrcode';

function Pdf2() {
    var i = 1;
    const cliente = {
        cli: 'Transportes Mr Logistik S.A.C',
        Ruc: 20610314644,
        Direct: 'Av.Primavera Mz. H Lote. 106d A. V. Los Gramadales',
        fecha: '2024/02/23'
    }
    const valor0 = {
        cant: 10,
        envio: 'Madre de dios,Tahuamanu',
        coste: 150.00,
        costex: 50.00,
        tt: 200.00,
    };

    const valor1 = { ...valor0 }
    valor1.cant = 5;
    valor1.coste = 80.00;
    valor1.costex = 20.00;
    valor1.tt = 100.00;

    const valor2 = { ...valor1 }
    valor2.cant = 3;
    valor2.coste = 100.00;
    valor2.costex = 0.00;
    valor2.tt = 100.00;

    const valor3 = { ...valor2 }
    valor3.cant = 2;
    valor3.coste = 30.00;
    valor3.costex = 0.00;
    valor3.Direct="Av.Primavera Mz. H Lote. 106d A. V. los";
    valor3.tt = 30.00;


    var ttl = valor0.tt + valor1.tt + valor2.tt + valor3.tt;
    var igv = ttl * 0.18;
    var neto = ttl + igv;

    const link=`https://www.youtube.com/watch?v=wvKqPPz7MOk`;


    const printPDF = () => {
        const doc = new jsPDF({
            unit:'cm',
            format:[18,6]
        });
        qrcode.toDataURL(`${link}`, function (err, url) {
            if (err) return console.error(err);

        const encabezado =
            [
                'Cant',
                'Descripción envio',
                'Costo envio',
                'Costo extra',
                'Valor Total'
            ];


        const cuerpo = [
            [`${valor0.cant}`,
            `${valor0.envio}`,
            `S/.${valor0.coste.toFixed(2)}`,
            `S/.${valor0.costex.toFixed(2)}`,
            `S/.${valor0.tt.toFixed(2)}`],

            [`${valor1.cant}`,
            `${valor1.envio}`,
            `S/.${valor1.coste.toFixed(2)}`,
            `S/.${valor1.costex.toFixed(2)}`,
            `S/.${valor1.tt.toFixed(2)}`
            ],

            [`${valor2.cant}`,
            `${valor2.envio}`,
            `S/.${valor2.coste.toFixed(2)}`,
            `S/.${valor2.costex.toFixed(2)}`,
            `S/.${valor2.tt.toFixed(2)}`
            ],

            [`${valor3.cant}`,
            `${valor3.envio}`,
            `S/.${valor3.coste.toFixed(2)}`,
            `S/.${valor3.costex.toFixed(2)}`,
            `S/.${valor3.tt.toFixed(2)}`
            ],
            [`${valor3.cant}`,
            `${valor3.envio}`,
            `S/.${valor3.coste.toFixed(2)}`,
            `S/.${valor3.costex.toFixed(2)}`,
            `S/.${valor3.tt.toFixed(2)}`
            ]

        ];

        const pie = [
            [{ content: '' },
            { content: 'IMPORTE' },
            { content: `S/.${ttl.toFixed(2)}` }

            ],
            ['',
                'IGV(18%)',
                `S/.${igv.toFixed(2)}`
            ],
            ['',
                'TOTAL',
                `S/.${neto.toFixed(2)}`
            ]
        ];

        


        doc.autoTable({
            startX:0,
            startY: 5.0, // Bajar la posición de la tabla
            theme: "plain",
            head: [encabezado],
            headStyles: {
                cellPadding: { bottom: 0.02 },
            },
            styles: {
                halign: 'center',
                textColor: [28, 65, 124],
                fontSize: 4, // Reducir el tamaño de fuente al mínimo
                 // Reducir el espaciado dentro de las celdas
                rowHeight: 0.01,
                cellWidth:0.5,
                
                
            },
            body: cuerpo,
            
        });

        doc.autoTable({
            startY: doc.autoTable.previous.finalY ,
            head: pie,
            theme: "plain",
            styles: {
                halign: "center",
                textColor: [28, 65, 124],
                fontSize:4,
                rowHeight:1,
                cellHeight:1,
                cellWidth:1
            }

        });
        doc.setTextColor(28, 65, 124);
        doc.setFont("Arial");
        doc.setFontSize(7);
        
        // Título
        doc.text('Transportes Mr Logistik S.A.C', 1.5, 1);
        
        // // Información de empresa
        doc.setFontSize(5);
        doc.text(`Ruc: ${cliente.Ruc}`, 2.5, 1.5);
        doc.text(`Direccion: ${valor3.Direct}`, 1.2, 1.8);
        doc.text(`Gramadales`, 2.5, 2.1);
        doc.text(`Cotizacion`, 2.5, 2.4);
        doc.text(`Electronica`, 2.5, 2.7);
        doc.text(`No: A-000${i}`, 2.5, 3.0);
        //cliente
        doc.text(`Cliente: ${cliente.cli}`, 0.5, 3.6);
        doc.text(`Ruc: ${cliente.Ruc}`, 0.5, 3.9);
        doc.text(`Direccion: ${cliente.Direct}`, 0.5, 4.2);
        doc.text(`Fecha emisión: ${cliente.fecha}`, 0.5, 4.5);
        
        // Parte inferior
        doc.text(`Consulta en: http://logistkmr.com`, 0.5, 11);
        doc.text(`Nuestra experiencia en logística garantiza`, 0.25, 11.2);
        doc.text(`que tus entregas sean eficientes y`, 0.6, 11.4);
        doc.text(`confiable.`, 1.3, 11.6);
        doc.text(`mrlogistik@hotmail.com`, 0.8, 12);
        doc.text(`(51) 976-037-013`, 1.0, 12.2);
        

        doc.addImage(url, 'PNG', 3.2, 10.7, 2.5, 2.5);
    });

        doc.save(`Reporte_${cliente.Ruc}`);
    }

    return (
        <body>
            <div id="contenedor">
                <div id="contenido0">
                    <h1 id="texto2">encabezado</h1>
                </div>
                <main id="contenido1">
                    <center id="texto2">
                        <button className="boton " onClick={printPDF}> imprimir</button>
                    </center>

                </main>
                <footer id="contenido2">
                    <h1 id="texto2">pie</h1>
                </footer>
            </div>
        </body>
    )
}
export default Pdf2;