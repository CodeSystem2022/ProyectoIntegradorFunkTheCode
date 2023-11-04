import nodemailer from "nodemailer";

const emailCheckout = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {email, nombre, metodoDePago, carrito} = datos;

      // Crear una lista HTML de productos a partir del carrito
      const productosHTML = carrito.map((producto) => `
        <li><strong>Producto:</strong> ${producto.modelo}</li>
        <li><strong>Precio:</strong> $${producto.precio}</li>
        <li><strong>Cantidad:</strong> ${producto.cantidad}</li><br>
      `).join('');

      // Define el mensaje adicional según el método de pago
      let mensajeAdicional = null;
      if (metodoDePago === 'tarjeta') {
          mensajeAdicional = `<p>Al abonar con tarjeta, debe esperar a ser contactado por correo electrónico cuando se efectúe el pago.</p>`;
      } else if (metodoDePago === 'transferencia') {
          mensajeAdicional = `<p>Luego de realizar la transferencia bancaria, envíanos el comprobante a nuestro WhatsApp 1598761234.</p>`;
      }

      // Calcula el total del carrito
      const calcularTotalCarrito = () => {
        let total = 0;
        carrito.forEach((producto) => {
            total += (producto.precio * producto.cantidad);
        });
        return total;
      };

      const info = await transporter.sendMail({
        //Quien envia el email
        from: '"ItuiPhone - Venta de iPhones" <ituiphone@gmail.com>',
        //A quien se le envia
        to: email,
        //El asunto
        subject: "Pedido realizado",
        //El texto sin html
        text: "Pedido realizado",
        //Cuerpo del msg
        html: `
            <p>Hola ${nombre}, gracias por elegir ItuiPhone.</p>
            <p>Tu pedido se realizó con éxito. A continuación, te detallamos los productos:</p>
            <ul>
                ${productosHTML}
                <li><strong>Total a pagar:</strong> $${calcularTotalCarrito()}</li>
            </ul>
            ${mensajeAdicional}
            <p>Si tu no creaste el pedido, puedes ignorar este mensaje.</p>
            `
          });
          console.log("Mensaje enviado: %s", info.messageId);
        };
        
export default emailCheckout;