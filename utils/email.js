const nodemailer = require("nodemailer");
//const nodemailerSendgrid = require("nodemailer-sendgrid-transport");


const createTransport = () => {
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "henrypfg11@gmail.com",
          pass: "chirxatvtficaopa",
        },
        tls: {
            rejectUnauthorized: false
          }
        
      });
return transport;
}
const sendEmail=async(data)=>{
    const {email,name,clave}=data;
    const transport = createTransport();
    const info=await transport.sendMail({
        from:"athenssoport@gmail.com",
        to:email ,
        subject:"Welcome to our website",
        text:"Welcome to our website",
        
    });
    console.log("Message sent: %s", info.messageId);

     return
}

exports.sendEmail=()=>sendEmail();



module.exports = { sendEmail};


// const emailRegistro = async (data) => {
// //   console.log(`Data`, data);
//   const { name, email, token } = data;

//   const transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "henrypfg11@gmail.com",
//       pass: "chirxatvtficaopa",
//     },
//   });

//   const info = await transport.sendMail({
//     from: "PRO-ROPA - E-commerce",
//     to: email,
//     subject: "PRO-ROPA - Comprueba tu cuenta",
//     text: "Comprueba tu cuenta en PRO-ROPA",
//     html: `<p>Hola : ${name}, Comprueba tu cuenta de PRO-ROPA</p>
//     <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace: 
//         <a href="http://localhost:3000/confirmar/${token}">Confirmar cuenta</a>
//     </p>
//     `,
//   });
// };

// const emailOlvidePassword = async (data) => {
//   //   console.log(`Data`, data);
//     const { name, email, token } = data;
  
//     const transport = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "henrypfg11@gmail.com",
//         pass: "chirxatvtficaopa",
//       },
//     });
  
//     const info = await transport.sendMail({
//       from: "PRO-ROPA - E-commerce",
//       to: email,
//       subject: "PRO-ROPA - Reestablece tu Password",
//       text: "Comprueba tu cuenta en Meli-Ropa",
//       html: `<p>Hola : ${name}, has solicitado reestablecer tu password en PRO-ROPA</p>
//       <p> Sigue el siguiente enlace para generar un nuevo password: 
//           <a href="http://localhost:3000/olvide-password/${token}">Reestablecer Password</a>
//       </p>
//       `,
//     });
//   };

// module.exports = { emailRegistro, emailOlvidePassword };
