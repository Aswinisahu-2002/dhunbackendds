// const express = require("express")
// const { allsongs, addsong } = require("../../controllers/songs_controller/songs_controller")
// const uploader = require("../../config/multer/multer")

// const songs_route = express.Router()

// songs_route.get("/allsongs",allsongs)

// songs_route.post("/addsong",uploader.single("mysong"),addsong)

// module.exports = songs_route


const express = require("express");
const { allsongs, addsong, likesong, allLikedSongs } = require("../../controllers/songs_controller/songs_controller");
const uploader = require("../../config/multer/multer");

const songs_route = express.Router();


/**
 * @swagger
 * /allsongs:
 *   get:
 *     summary: Retrieve all songs
 *     description: Returns a list of all available songs in the database.
 *     tags:
 *       - songs
 *     responses:
 *       200:
 *         description: List of songs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 songs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The song ID
 *                         example: "64f8c1e9a7b9b2f2b0e5a1c2"
 *                       title:
 *                         type: string
 *                         description: Title of the song
 *                         example: "My Song Title"
 *                       artist:
 *                         type: string
 *                         description: Artist name
 *                         example: "Artist Name"
 *                       duration:
 *                         type: number
 *                         description: Duration of the song in seconds
 *                         example: 240
 *                       coverUrl:
 *                         type: string
 *                         description: URL of the song's cover image
 *                         example: "http://example.com/covers/song-cover.jpg"
 *                       audioUrl:
 *                         type: string
 *                         description: URL of the song's audio file
 *                         example: "http://example.com/audio/song.mp3"
 *                       isliked:
 *                         type: boolean
 *                         description: Whether the song is liked or not
 *                         example: false
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

songs_route.get("/allsongs", allsongs);

// Accept both 'mysong' (audio) and 'cover' (image)
songs_route.post("/addsong", uploader.fields([
    { name: "mysong", maxCount: 1 },
    { name: "cover", maxCount: 1 }
]), addsong);

songs_route.patch("/likesong",likesong)

songs_route.get("/alllikedsongs",allLikedSongs)

module.exports = songs_route;
