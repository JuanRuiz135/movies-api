const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    // get all movies
    router.get("/", async function(req, res, next) {

        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({tags});

            res.status(200).json({
                data: movies,
                message: 'Movies listed'
            });

        } catch (err) {
            next(err);
        }
    });

    // get movie by id
    router.get("/:movieId", async function(req, res, next) {

        const { movieId } =  req.params;
        try {
            const movie = await moviesService.getMovies({ movieId });

            res.status(200).json({
                data: movie,
                message: 'Movie retrieved'
            });

        } catch (err) {
            next(err);
        }
    });

    // create movie
    router.post("/", async function(req, res, next) {

        const { body: movie } = req;

        try {
            const createMovieId = await moviesService.createMovie({ movie });

            res.status(200).json({
                data: createMovieId,
                message: 'Movie created'
            });

        } catch (err) {
            next(err);
        }
    });


    router.put("/:movieId", async function(req, res, next) {

        const { movieId } =  req.params;
        const { body: movie } = req;

        try {
            const updatedMovieId = await moviesService.updateMovie({movieId, movie});

            res.status(200).json({
                data: updatedMovieId,
                message: 'Movie updated'
            });

        } catch (err) {
            next(err);
        }
    });


    router.delete("/:movieId", async function(req, res, next) {

        const { movieId } =  req.params;

        try {
            const deleteMovieId = await moviesService.deleteMovie({movieId});

            res.status(200).json({
                data: deleteMovieId,
                message: 'Movie deleted'
            });

        } catch (err) {
            next(err);
        }
    });
}

module.exports = moviesApi;