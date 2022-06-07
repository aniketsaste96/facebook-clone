const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "first name is required"],
        trim: true,
        text: true
    },
    last_name: {
        type: String,
        required: [true, "last name is required"],
        trim: true,
        text: true
    },
    username: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
        text: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],

    },
    picture: {
        type: String,
        //use cloudinary link here
        default: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
    },
    cover: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        required: [true, "email is required"],
        trim: true
    },
    bYear: {
        type: Number,
        required: true,
        trim: true
    },
    bMonth: {
        type: Number,
        required: true,
        trim: true
    },
    bDay: {
        type: Number,
        required: true,
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    friends: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    requests: {
        type: Array,
        default: []
    },
    //search history of user
    search: [
        {
            user: {
                type: ObjectId,
                ref: "User"
            }
        }
    ],
    details: {
        bio: {
            type: String
        },
        otherName: {
            type: String
        },
        job: {
            type: String
        },
        workplace: {
            type: String
        },
        highschool: {
            type: String
        },
        collage: {
            type: String
        },
        currentCity: {
            type: String
        },
        hometown: {
            type: String
        },
        relationship: {
            type: String,
            enum: ["Single", "In a relationship", "Married", "Divorced", "It's Complicated"]
        },
        instagram: {
            type: String
        },
        savedPost: [
            {
                post: {
                    type: ObjectId,
                    ref: "Post"
                },
                savedAt: {
                    type: Date,
                    default: new Date()
                },
            },

        ]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);
