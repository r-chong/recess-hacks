import mongoose, { Schema, model } from 'mongoose';

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    favoriteChats: [{ type: Schema.ObjectId, ref: 'FavChat', required: false }],
    interests: {
        type: [String],
        required: false,
    },
    achievements: {
        type: [String],
        required: false,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    level: {
        type: Number,
        default: 0,
        required: false,
    },
    appointments: [
        {
            people: [
                {
                    type: String,
                    required: true,
                },
            ],
            date: {
                type: String, // You can use Date type if you want to store actual dates
                required: true,
            },
        },
    ],
    chats: [{ type: Schema.ObjectId, ref: 'Chat', required: false }],
});

const UserModel = mongoose.models.UserModel || model('UserModel', userSchema);
export default UserModel;
