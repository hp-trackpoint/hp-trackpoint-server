/*
  Warnings:

  - Added the required column `eventName` to the `ModuleTrackRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `ModuleTrackRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `PageTrackRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `PageTrackRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModuleTrackRecord" ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PageTrackRecord" ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL;
