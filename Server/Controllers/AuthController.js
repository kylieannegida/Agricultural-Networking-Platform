import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// register new users
export const registerUser = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    // Validate required fields firstname and lastname
    if (!firstname || !lastname) {
        return res.status(400).json({ message: "Firstname and lastname are required!" });
    }

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "This User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password.toString(), salt);
        
        // Assign hashed password to request body before creating user
        req.body.password = hashedPass;

        // Create new user with all fields including firstname, lastname
        const newUser = new UserModel(req.body);
        const user = await newUser.save();

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login users
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                return res.status(400).json({ message: "Sorry, please enter the correct email or password!" });
            }

            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);

            res.status(200).json({ user, token });
        } else {
            res.status(404).json({ message: "Sorry, please enter the correct email or password!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
