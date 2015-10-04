# nodepop:Practica de Nodejs de KeepCoding

<u>Informacion del API.</u>

<b>Arrancar el API:</b> npm start.

<b>Lanzar fichero inicial de bbdd:</b> npm run installDB.

<b>Lanzar jshints:</b> npm run hints (control de código).

<u>Rutas definidas en el API:</u>

<b>-Listado de anuncios:</b> Metodo GET. Se muestran en la ruta http://localhost:3000/apiv1/anuncios?token=.....Los anuncios se pueden filtrar por precio, inicial del nombre, tags y venta (true,false). Para obtener la lista de anuncios nos autenticaremos con jwt.

<b>-Listado de tags:</b>Metodo GET en la ruta http://localhost:3000/apiv1/tags.

<b>-Alta de usuario:</b> Es un método POST en la ruta http://localhost:3000/altaUsuarios. Recibe los parametros de entrada del Body. Estos parametros son nombre, email y clave (encriptada con sha).

<b>-Alta de pushToken:</b> Es un método POST en la ruta http://localhost:3000/apiv1/pushToken. Recibe los parametros de entrada del Body. Estos parametros son el nombre del usuario, plataforma (sólo ios y android) y pushtoken.

<b>-Fotos: </b>Se muestran en las rutas http://localhost:3000/images/anuncios/iphone.jpg y http://localhost:3000/images/anuncios/bici.png.

<b>-Consulta de usuarios:</b> Es un método GET que se muestra en la ruta http://localhost:3000/consultaUsuarios.

<b>Internacionalizacion:</b> Para probar la internacionalización del error, esta sólamente se ha implementado en la consulta de anuncios cuando el token no es correcto. En la query-string se debe pasar el parametro idioma (con los valores en o es). En caso de no pasar ninguno de ellos o alguno distinto a los comentados por error, por defecto se muestra el error en español. Los valores de los errores en los distintos idiomas se encuentran en el archivo local_config.js. Se ha creado un modulo Error.js, que recibe como parametros la clave el error (parametro err) y el idioma (parametro idioma). 


