const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );
    
    // Verificar autenticacion
    if( !valido ) { return client.disconnect(); }

    // Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, 5f8f4c9a7d3b1a2d4c5e5b3b
    client.join( uid );

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async ( payload ) => {
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado( uid );
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
