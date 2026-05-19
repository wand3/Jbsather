import type { Request, Response, NextFunction } from "express";
import { isValidCuid } from "../utils/validation.js";
import { prisma } from "../config/db.js";
import { verify } from "node:crypto";
import bcrypt from "bcryptjs";
import { error } from "node:console";
import { generateToken } from "../utils/generateToken.js";
// import { User } from "../schemas/user.js";

// get user
const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        // if (!id || !isValidCuid(id)) {
        //     return res.status(400).json({ error: 'Invalid user ID format' });
        // }
        
        // Added 'await' which was missing in the original code
        const user = await prisma.user.findUnique({
            where: { user_id: id },
            // Optional: Exclude password from the returned data
            // select: { id: true, email: true, name: true, created_at: true } 
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ data: user });

        } catch (error) {
        console.error('GET /users/:id error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

// Register user 
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password } = req.body

    // check if email exists 
    const user_exists = await prisma.user.findUnique({
        where: {email : email},
    })

    if (user_exists) {
        return res.status(400).json({error: 'Email already exist'})
    }

    // hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    // create user 
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwd: hashedPass,
        },
    })

    // Generate JWT Token
    const token = generateToken(user.user_id, res);

    return res.status(201).json({
        status: "success",
        data: {
            user: {
                id : user.user_id,
                name: user.name,
                email: user.email, 
            },
            token,
        },
        
    })
}

// Login user 
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

  // Check if user email exists in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.passwd);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate JWT Token
  const token = generateToken(user.user_id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.user_id,
        email: email,
      },
      token,
    },
  });

}

// Update user 
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    res.json({"Response":"update Callback"})
}

export {getUser, createUser, updateUser, loginUser};