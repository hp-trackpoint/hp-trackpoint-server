/*
  Warnings:

  - Added the required column `path` to the `PageTrack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PageTrack" ADD COLUMN     "path" VARCHAR(200) NOT NULL;
