import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import{User} from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, email, username, password } = req.body;
    if ([
        fullName, email,
        username,
        password
    ].some((field) => field?.trim() === "")) {
        return next(new ApiError(400, "All fields are required"));
    }
});

const existedUser = await User.findOne({ $or: [{ email }, { username }] });
if (existedUser) {
    return next(new ApiError(409, "User with this email or username already exists"));
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if (!avatarLocalPath) {
    return next(new ApiError(400, "Avatar is required"));
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

if (!avatar) {
    return next(new ApiError(500, "Error while uploading avatar"));
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
});
 const createdUser = await user.findById(user._id).select("-password -refrehToken");
if (!createdUser) {
    return next(new ApiError(500, "User not found"));
}
return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));

export { registerUser };