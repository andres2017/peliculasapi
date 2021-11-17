const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service'); 

/*
    GET -> OBTENER PELÍCULAS - OK 
    GET -> OBTENER PELÍCULA POR - OK 
    GET -> BUSCAR PELÍCULA POR TÍTULO - OK
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELIMINAR PELÍCULAS
*/

/**
 * BUSCAR TODAS LAS PELÍCULAS
 */
controladorPeliculas.get("/obtenerPeliculas", async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje" : "Listado de películas",
        "data" : peliculas
    });
});

/**
 * POR UNA PELÍCULA POR ID .
 */
controladorPeliculas.get("/obtenerPelicula/:id", async function(req, res){
    let id = req.params.id;
    let pelicula = await servicioPeliculas.obtenerPelicula(id);
    res.send({
        "mensaje": "Detalle película",
        "data" : pelicula
    });
})

/**
 * Obtener películas por el Título.
 */
controladorPeliculas.get("/buscarPeliculasTitulo/:titulo", async function(req, res){
    let titulo = req.params.titulo;
    let peliculas = await servicioPeliculas.buscarPeliculasTitulo(titulo);
    res.send({
        "mensaje": "Resultado búsqueda",
        "busqueda":titulo,
        "data": peliculas
    });
})

controladorPeliculas.post("/crearPelicula", async function(req, res){
    let peliculaNueva = req.body
    let respuesta = await servicioPeliculas.crearPelicula(peliculaNueva);
    res.send(respuesta);

});

controladorPeliculas.put("/actualizarPelicula/:id", async function(req, res){
    let id = req.params.id;
    let pelicula = req.body;
    let respuesta = await servicioPeliculas.actualizarPelicula(id, pelicula);
    res.send(respuesta);
})

module.exports = controladorPeliculas;