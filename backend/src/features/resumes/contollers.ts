import type { NextFunction, Request, Response } from "express";
import { errorHandler } from "../../middlewares/errorHandler.js";
import { prisma } from "../../config/db.js";

const getResumes = async function (req: Request, res: Response) {
  try {
    // console.log("DATABASE_URL used by Prisma:", process.env.DATABASE_URL);
    const result = await prisma.user.findMany();
    res.json(result);
  } catch (error: any) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
};


// Resumes (CREATE / UPDATE / DELETE)
const createResume = async function(req: Request, res: Response){
  try {
    const id = req.params.id as string;
    const { title, templateId, themeColor, personalInfo, summary, educations, certifications, experience, skills, Language, socialLinks} = req.body

    const user = await prisma.user.findUnique({
        where: { user_id: id },
    });
    
    const newResume = await prisma.resumes.create({
        userId?: user?.user_id,
        title: title || 'Untitled Resume',
        templateId: templateId || 'modern',
        themeColor: themeColor || '#3b82f6',
        personalInfo: { fullName: user?.name, email: user?.email, phone: user?.email, location: user?.location, website: user?.headline },
        summary: '',
        educations?: educations,
        certifications?: certifications,
        experiences?: experience,
        skills?: skills,
        languages?: Language,
        socialLinks?: socialLinks,
      })

    // Generate JWT Token
    if (user?.user_id) {

      return res.status(201).json({
          status: "success",
          data: {
              resume: {
                title: newResume.title,
                templateId: newResume.templateId,
                themeColor: newResume.themeColor,
                personalInfo: newResume.personalInfo,
                summary: newResume.summary,
                educations?: newResume.educations,
                certifications?: certifications,
                experiences?: experience,
                skills?: skills,
                languages?: Language,
                socialLinks?: socialLinks,
              },
          },
       })
      };  
    } catch (e) {
      console.error(e);
    };

// Education (CREATE / UPDATE / DELETE)


// Experience (CREATE / UPDATE / DELETE)


// Experience Story (CREATE / UPDATE / DELETE)


// Language (CREATE / UPDATE / DELETE)


// Personality Trait (CREATE / UPDATE / DELETE)


// Skills (CREATE / UPDATE / DELETE)


// Social links (CREATE / UPDATE / DELETE)



export {getResumes, createResume};