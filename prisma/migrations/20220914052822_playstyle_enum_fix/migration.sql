/*
  Warnings:

  - The values [Lleader] on the enum `Playstyle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Playstyle_new" AS ENUM ('defender', 'controller', 'leader', 'striker');
ALTER TABLE "Character" ALTER COLUMN "style_1" TYPE "Playstyle_new" USING ("style_1"::text::"Playstyle_new");
ALTER TABLE "Character" ALTER COLUMN "style_2" TYPE "Playstyle_new" USING ("style_2"::text::"Playstyle_new");
ALTER TYPE "Playstyle" RENAME TO "Playstyle_old";
ALTER TYPE "Playstyle_new" RENAME TO "Playstyle";
DROP TYPE "Playstyle_old";
COMMIT;
