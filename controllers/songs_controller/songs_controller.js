// const SONGS = require("../../models/song_model")
// const cloudinary = require("../../config/cloudinary/cloudinary")
// const allsongs = async (req,res)=>{
//     try {
//         const songs = await SONGS.find()
//         res.status(200).json({songs})
//     } catch (error) {
//         res.status(500).json({message:"Server error"})
//     }
// }

// const addsong = async (req,res)=>{
//     const { title, artist } = req.body;
//      try {
//         const result = await cloudinary.uploader.upload(req.file.path,{
//             resource_type: "video",
//             folder:"songs"
//         })

//         await SONGS.insertOne({title,artist,duration:20,coverUrl:"xyz",audioUrl:result.secure_url})

//         res.json({
//             message:"Song uploaded successfully",
//             cloudinaryUrl:result.secure_url // direct link to song
//         })

//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }
// }

// module.exports = {allsongs,addsong}




const SONGS = require("../../models/song_model");
const cloudinary = require("../../config/cloudinary/cloudinary");
const fs = require("fs")

const allsongs = async (req, res) => {
    try {
        const songs = await SONGS.find();
        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const addsong = async (req, res) => {
    const { title, artist } = req.body;

    try {
        if (!req.files || !req.files["mysong"] || !req.files["cover"]) {
            return res.status(400).json({ error: "Audio or cover image is missing" });
        }

        const audioFile = req.files["mysong"][0];
        const coverFile = req.files["cover"][0];

        // Upload the audio file to Cloudinary
        const audioResult = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video",
            folder: "songs/audio"
        });

        // Upload the cover image to Cloudinary
        const coverResult = await cloudinary.uploader.upload(coverFile.path, {
            resource_type: "image",
            folder: "songs/covers"
        });

        // Insert the song into the database
        await SONGS.insertOne({
            title,
            artist,
            duration: 20,
            coverUrl: coverResult.secure_url,
            audioUrl: audioResult.secure_url,
            isliked:false
        });
        //Delete the uploaders files
        fs.unlink(audioFile.path,(error)=>{
            if(error) console.error("Error to delete",error)
            console.log("Delted success")
        })
        fs.unlink(coverFile.path,(error)=>{
            if(error) console.error("Error to delete",error)
            console.log("Delted success")
        })

        res.json({
            message: "Song uploaded successfully",
            audioUrl: audioResult.secure_url,
            coverUrl: coverResult.secure_url
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//! Update liked section
const likesong = async (req,res)=>{
    const {songid,liked} = req.body
    try {
        const result = await SONGS.updateOne(
            {_id:songid},
            {$set:{isliked:liked}}
        )
        if(result.matchedCount === 0){
            res.status(404).json({message:"Song not found"})
        }
        res.status(200).json({message:"Liked successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//! All liked songs
const allLikedSongs = async(req,res)=>{
    try {
        const likedsongs = await SONGS.find({isliked:true})
        res.status(200).json({likedsongs})
    } catch (error) {
        res.status(500).json({message:"Server side error"})
    }
}

module.exports = { allsongs, addsong, likesong , allLikedSongs};


