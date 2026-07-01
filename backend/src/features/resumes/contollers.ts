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
export const createResume = async function(req: Request, res: Response){
  try {
    const id = req.params.id as string;
    const { title, templateId, themeColor, personalInfo, summary, educationId, certificationId, experienceId, skillsId, LanguageId, socialLinksId} = req.body

    
    
    let finalEducationId = educationId
    let finalCertificationsId = certificationId
    let finalExperienceId = experienceId
    let finalSkillsId = skillsId
    let finalLangauagesId = LanguageId
    let finalSocialLinksId = socialLinksId


    if (!id) {
      return res.status(400).json({ error: "Missing user_id for resume creation." });
    }

    const user = await prisma.user.findUnique({
      where: { user_id: id },
      include: {educations: true, certifications: true, experiences: true, skills: true, socialLinks: true, languages: true}
    });

    if (!educationId || !certificationId || !experienceId || !skillsId || !LanguageId || !socialLinksId) {
      

      if (!educationId) finalEducationId = user?.educations.map(e => ({id: e.id}))
      if (!certificationId) finalCertificationsId = user?.certifications.map(e => ({id: e.id}))
      if (!experienceId) finalExperienceId = user?.experiences.map(e => ({id: e.id}))
      if (!skillsId) finalSkillsId = user?.skills.map(e => ({id: e.id}))
      if (!LanguageId) finalLangauagesId = user?.languages.map(e => ({id: e.id}))
      if (!socialLinksId) finalSocialLinksId = user?.socialLinks.map(e => ({id: e.id}))

    } else {
      finalEducationId = educationId.map((id: string) => ({id}))
      finalCertificationsId = certificationId.map((id: string) => ({id}))
      finalExperienceId = experienceId.map((id: string) => ({id}))
      finalSkillsId = skillsId.map((id: string) => ({id}))
      finalLangauagesId = LanguageId.map((id: string) => ({id}))
      finalSocialLinksId = socialLinksId.map((id: string) => ({id}))
    }

    const newResume = await prisma.resumes.create({
      data:  {
        title: title || 'Untitled Resume',
        userId: user?.user_id ?? null,
        templateId: templateId || 'modern',
        themeColor: themeColor || '#3b82f6',
        personalInfo: {
          create: { 
            fullName: user?.name ?? null, 
            email: user?.email ?? null, 
            phone: user?.phone ?? null, // ✅ Fixed logic bug (was user.email)
            location: user?.location ?? null, 
            website: user?.headline ?? null
           }
        },
        summary: summary,
        educations: {connect: finalEducationId},
        certifications: {connect: finalCertificationsId},
        experiences: {connect: finalExperienceId},
        skills: {connect: finalSkillsId},
        languages: {connect: finalLangauagesId},
        socialLinks: {connect: finalSocialLinksId},
      },
      include: {educations: true, certifications: true, experiences: true, skills: true, socialLinks: true, languages: true}


    })

    res.status(201).json(newResume)

    // const newResume = await prisma.resumes.create({
    //     userId?: user?.user_id,
    //     title: title || 'Untitled Resume',
    //     templateId: templateId || 'modern',
    //     themeColor: themeColor || '#3b82f6',
    //     personalInfo: { fullName: user?.name, email: user?.email, phone: user?.email, location: user?.location, website: user?.headline },
    //     summary: '',
    //     educations?: educations,
    //     certifications?: certifications,
    //     experiences?: experience,
    //     skills?: skills,
    //     languages?: Language,
    //     socialLinks?: socialLinks,
    //   })

    // Generate JWT Token
    // if (user?.user_id) {

    //   return res.status(201).json({
    //       status: "success",
    //       data: {
    //           resume: {
    //             title: newResume.title,
    //             templateId: newResume.templateId,
    //             themeColor: newResume.themeColor,
    //             personalInfo: newResume.personalInfo,
    //             summary: newResume.summary,
    //             educations?: newResume.educations,
    //             certifications?: certifications,
    //             experiences?: experience,
    //             skills?: skills,
    //             languages?: Language,
    //             socialLinks?: socialLinks,
    //           },
    //       },
    //    })
    //   };  
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

}


export {getResumes}