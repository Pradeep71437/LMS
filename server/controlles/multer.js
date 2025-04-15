const express = require("express")
const multer = require("multer")
const { catchAsync } = require('../cmn');




async function multer(req, res, next) {
    let Storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, "/public/images")
        },
        filename: (req, res, cb) => {
            cb(null, file.originalname)
        }
    })

    let maxsize = 2 * 1000 * 1000
    let upload = multer({
        storage: Storage,
        limits: {
            filesize: maxsize
        }
    })
}

let uploadhandler = upload.single("file")




