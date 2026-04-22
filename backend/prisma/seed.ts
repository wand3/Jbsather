import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL; // MUST be a direct DB URL starting with postgresql://
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Use a direct postgresql:// URL when using the adapter.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ---------------------------
  // USER
  // ---------------------------
  const user = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      passwd: "hashedpassword123",
      isAuthenticated: true,
      bio: "Senior backend engineer with a focus on scalable systems.",
      headline: "Senior Backend Engineer",
      location: "Lagos, Nigeria",
      yearsOfExperience: 6,
      currentRole: "Backend Engineer",
      preferredWorkEnv: "remote",
      availability: "immediate",
    },
  });

  const userId = user.user_id ?? (user.user_id ?? null);
  console.log("Upserted user:", user);

  /// Helper: run a block only when userId exists
  const runIfUser = <T extends (...args: any[]) => Promise<any>>(fn: T) =>
    async (...args: Parameters<T>) => {
      if (!userId) {
        console.warn(`Skipping ${fn.name}: userId is not available.`);
        return null;
      }
      return fn(...args);
    };

  // Independent blocks (can run in parallel)
  const createCertifications = runIfUser(async () => {
    return prisma.certification.createMany({
      data: [
        {
          userId,
          name: "AWS Certified Developer",
          issuingOrganization: "Amazon",
          issueDate: new Date("2022-01-01"),
        },
      ],
      skipDuplicates: true,
    });
  });

  const createSkills = runIfUser(async () => {
    return prisma.skill.createMany({
      data: [
        {
          userId,
          name: "TypeScript",
          category: "technical",
          proficiency: "advanced",
          yearsOfExperience: 5,
        },
        {
          userId,
          name: "Leadership",
          category: "soft",
          proficiency: "intermediate",
        },
      ],
      skipDuplicates: true,
    });
  });

  const createLanguages = runIfUser(async () => {
    return prisma.language.createMany({
      data: [
        {
          userId,
          name: "English",
          proficiency: "native",
        },
      ],
      skipDuplicates: true,
    });
  });

  const createSocialLinks = runIfUser(async () => {
    return prisma.socialLink.createMany({
      data: [
        { userId, platform: "GitHub", url: "https://github.com/alice" },
        { userId, platform: "LinkedIn", url: "https://linkedin.com/in/alice" },
      ],
      skipDuplicates: true,
    });
  });

  const createPersonalityTraits = runIfUser(async () => {
    return prisma.personalityTrait.createMany({
      data: [
        {
          userId,
          trait: "Analytical",
          description: "Strong problem-solving mindset",
          source: "self-assessment",
          voice_tone: "Professional and direct",
          negative_constraints: ["passionate", "thrilled"],
          attitude: "driven, focused",
        },
      ],
      skipDuplicates: true,
    });
  });

  // Dependent blocks (experience -> experienceStory)
  const createExperienceAndStories = runIfUser(async () => {
    // create experience first
    const experience = await prisma.experience.create({
      data: {
        userId,
        role: "Backend Engineer",
        company: "TechCorp",
        startDate: new Date("2020-01-01"),
        current: true,
        contextTags: ["nodejs", "prisma", "system_design"],
      },
    });

    // then create stories referencing the experience id
    if (experience?.id) {
      await prisma.experienceStory.createMany({
        data: [
          {
            experienceId: experience.id,
            trigger: "Tell me about a challenge",
            storyText:
              "Scaled a failing API handling 1M+ requests/day by redesigning the database layer.",
          },
        ],
        skipDuplicates: true,
      });
    }
    return experience;
  });

  // Runner: parallelize independent blocks, keep dependent sequence
  try {
    // run independent blocks in parallel
    await Promise.all([
      createCertifications(),
      createSkills(),
      createLanguages(),
      createSocialLinks(),
      createPersonalityTraits(),
    ]);

    // run experience + stories sequentially
    await createExperienceAndStories();

    console.log("✅ Seed completed");
  } catch (err) {
    console.error("Seed error:", err);
    throw err;
  }

};

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
    console.log("Seeding finished.");
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });