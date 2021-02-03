const express = require('express');
const MoviesService = require('../services/movies');

// schemas
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

// validation handler
const validationHandler = require('../utils/middleware/validationHandler');

// cache
const cacheResponse = require('../utils/cacheResponse');

const {
    FIVE_MINUTES_IN_SECONDS, 
    SIXTY_MINUTES_IN_SECONDS 
} = require('../utils/time');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    // get all movies
    router.get("/", async function(req, res, next) {

        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

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
    router.get("/:movieId", validationHandler({ movieId: movieIdSchema}, 'params'), async function(req, res, next) {

        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

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
    router.post("/", validationHandler(createMovieSchema), async function(req, res, next) {

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

    // Update movie
    router.put("/:movieId", validationHandler({ movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema) , async function(req, res, next) {

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


    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema}, 'params'), async function(req, res, next) {

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