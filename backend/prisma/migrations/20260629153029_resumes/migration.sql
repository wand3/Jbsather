-- CreateTable
CREATE TABLE "Resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "template_id" TEXT NOT NULL DEFAULT 'modern',
    "theme_color" TEXT NOT NULL DEFAULT '#3b82f6',
    "summary" TEXT NOT NULL DEFAULT '',
    "personalInfo" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "Resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'none',
    "url" TEXT,
    "notes" TEXT,
    "date_applied" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Resumes_userId_idx" ON "Resumes"("userId");

-- CreateIndex
CREATE INDEX "Applications_userId_idx" ON "Applications"("userId");

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_id_fkey" FOREIGN KEY ("id") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_id_fkey" FOREIGN KEY ("id") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_id_fkey" FOREIGN KEY ("id") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_id_fkey" FOREIGN KEY ("id") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_id_fkey" FOREIGN KEY ("id") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_id_fkey" FOREIGN KEY ("id") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resumes" ADD CONSTRAINT "Resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
