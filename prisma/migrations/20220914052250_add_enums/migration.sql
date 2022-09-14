/*
  Warnings:

  - You are about to drop the column `type` on the `Character` table. All the data in the column will be lost.
  - Changed the type of `action_a` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `action_b` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `action_c` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `action_d` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `style_1` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `style_2` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Playstyle" AS ENUM ('defender', 'controller', 'Lleader', 'striker');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('damage', 'draw', 'energy', 'health', 'shield');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "action_a",
ADD COLUMN     "action_a" "Action" NOT NULL,
DROP COLUMN "action_b",
ADD COLUMN     "action_b" "Action" NOT NULL,
DROP COLUMN "action_c",
ADD COLUMN     "action_c" "Action" NOT NULL,
DROP COLUMN "action_d",
ADD COLUMN     "action_d" "Action" NOT NULL;

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "type",
DROP COLUMN "style_1",
ADD COLUMN     "style_1" "Playstyle" NOT NULL,
DROP COLUMN "style_2",
ADD COLUMN     "style_2" "Playstyle" NOT NULL;
