import config from "../../../configs";
import moment from "moment";

export default props => {
    // function(data) {
    // const data = this.setElement;
    var data = document.getElementById(props.divId).innerHTML;
    let mywindow = window.open("", "", "height=680,width=720");
    mywindow.document.write(
        `<link rel="stylesheet" href="${window.location.origin}/dist/css/adminlte.min.css" type="text/css" />`
    );
    mywindow.document.write(
        `<html><head><title>${
        props.title
        } | ${moment(new Date()).format("DD-MM-YYYY hh:mm:ss A")} | GN POS</title><style type="text/css" media="screen,print">
           
            
            
            @page 
            {
                size:  auto;   /* auto is the initial value */
                margin: 0mm;  /* this affects the margin in the printer settings */
            }
        
            html
            {
                background-color: #FFFFFF; 
                margin: 0px;  /* this affects the margin on the html before sending to printer */
            }
            .header, .header-space,
            .footer, .footer-space {
              height: 50px;
              padding:0px 10px;
            }
            .header-space {
              position: fixed;
              top: 0;
            }
            .footer-space {
              position: fixed;
              bottom: 0;
              text-align:center;
            }
            body
            {
                /* margin you want for the content */
                width: 96%;
                margin: 20px auto;
                
            }
            
          
          #pageFooter {
              display: table-footer-group;
          }
          
          #pageFooter:after {
              counter-increment: page;
              content: counter(page);
          }
            .heading{
              
            }
        @media print{
            ${props.printStyle}
          }
            </style>`
    );

    mywindow.document.write("</head><body className='bg-transparent'>  ");
    mywindow.document.write(`<h1 style="text-align:center">${config.name}</h1><div className="text-muted" style="text-align:center"><small >Date: ${moment(new Date()).format("DD-MM-YYYY hh:mm:ss A")}</small></div> `);
    mywindow.document.write(data);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10


    mywindow.print();
    // mywindow.close();


    return true;
};
