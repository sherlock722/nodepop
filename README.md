# nodepop
Practica de Nodejs de KeepCoding

Informacion del API.

Arrancar el API: npm start
Lanzar fichero inicial de bbdd: npm run installDB
Lanzar jshints: npm run hints

Rutas definidas en el API
-Listado de anuncios :Metodo GET. Se muestran en la ruta http://localhost:3000/apiv1/anuncios?token=.....Los anuncios se pueden filtrar
por precio, inicial del nombre, tags y venta (true,false). Para obtener la lista de anuncios no s autenticaremos con jwt.
-Listado de tags:Metodo GET en la ruta http://localhost:3000/apiv1/tags
-ALta de usuario: Es un método POST en la ruta http://localhost:3000/altaUsuarios. Recibe los parametros de entrada del Body. 
Estos parametros son nombre, email y clave (encriptada con sha)
-Alta de pushToken: Es un método POST en la ruta http://localhost:3000/apiv1/pushToken. Recibe los parametros de entrada del Body. 
Estos parametros son el nombre del usuario, plataforma (sólo ios y android) y pushtoken.
-Fotos: Se muestran en las rutas http://localhost:3000/images/anuncios/iphone.jpg y http://localhost:3000/images/anuncios/bici.png.
-Consulta de usuarios: Es un método GET que se muestra en la ruta http://localhost:3000/consultaUsuarios

