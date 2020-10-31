import { resolve } from "path";
import { randomBytes } from "crypto";
import { S3 } from "aws-sdk";
import * as multerS3 from "multer-s3";
require("dotenv").config();

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;
console.log(process.env.BUCKET_NAME)
export default {
    dest: resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: multerS3({
        s3: new S3(),
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
    limits: {
        fileSize: MAX_SIZE_TWO_MEGABYTES,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    },
};