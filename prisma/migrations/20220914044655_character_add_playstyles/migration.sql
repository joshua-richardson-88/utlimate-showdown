/*
  Warnings:

  - You are about to drop the column `playstyle` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "playstyle",
ADD COLUMN     "style_1" TEXT NOT NULL DEFAULT 'Striker',
ADD COLUMN     "style_2" TEXT NOT NULL DEFAULT 'Striker';
