/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "isHero" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "playstyle" TEXT NOT NULL DEFAULT 'Striker';

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
