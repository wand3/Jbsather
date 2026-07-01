import type { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import { prisma } from "../config/db.js";

const allUsers = async function (req: Request, res: Response) {
  try {
    console.log("DATABASE_URL used by Prisma:", process.env.DATABASE_URL);
    const result = await prisma.user.findMany();
    res.json(result);
  } catch (error: any) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
};


// Update profile


// Certification (CREATE / UPDATE / DELETE)


// Education (CREATE / UPDATE / DELETE)
const addEducation = async function (req:Request , res: Response) {
  const { institution, degree, grade, description, endDate, startDate, fieldOfStudy} = req.body
  const id = req.params.id as string;

  try {
    const addEdu = prisma.education.create({
      data: {
          "userId": id,
          "institution": institution,
          "degree": degree,
          "fieldOfStudy": fieldOfStudy,
          "startDate": startDate,
          "endDate": endDate,
          "grade": grade,
          "description": description,
      }
    })
    res.status(201).json(addEdu)

    
   } catch (error) {
    
   }
}

// READ (Get all education records for a specific user)
const getUserEducation = async function (req: Request, res: Response) {
  const id = req.params.id as string
  try {
    const educations = await prisma.education.findMany({
      where: {
        userId: id 
      }
    });
    res.status(200).json(educations);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ error: "Failed to fetch education records" });
  }
}

// READ (Get a single education record by its own ID)
const getEducationById = async function (req: Request, res: Response) {
  const eduId = req.params.eduId as string; // The specific Education ID

  try {
    const education = await prisma.education.findUnique({
      where: {
        id: eduId
      }
    });

    if (!education) {
      return res.status(404).json({ error: "Education record not found" });
    }

    res.status(200).json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({ error: "Failed to fetch education record" });
  }
}

// UPDATE
const updateEducation = async function (req: Request, res: Response) {
  const { institution, degree, grade, description, endDate, startDate, fieldOfStudy } = req.body;
  const eduId = req.params.eduId as string; // The specific Education ID to update

  try {
    const updatedEdu = await prisma.education.update({
      where: {
        id: eduId
      },
      data: {
        institution,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
        description,
      }
    });
    res.status(200).json(updatedEdu);
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ error: "Failed to update education record" });
  }
}

// DELETE
const deleteEducation = async function (req: Request, res: Response) {
  const eduId = req.params.eduId as string; // The specific Education ID to delete

  try {
    const deletedEdu = await prisma.education.delete({
      where: {
        id: eduId
      }
    });
    res.status(200).json({ message: "Education record deleted successfully", deletedEdu });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ error: "Failed to delete education record" });
  }
}

// Experience (CREATE / UPDATE / DELETE)


// Experience Story (CREATE / UPDATE / DELETE)


// Language (CREATE / UPDATE / DELETE)


// Personality Trait (CREATE / UPDATE / DELETE)


// Skills (CREATE / UPDATE / DELETE)


// Social links (CREATE / UPDATE / DELETE)



export {allUsers,
  addEducation, 
  getUserEducation,
  getEducationById,
  updateEducation,
  deleteEducation};