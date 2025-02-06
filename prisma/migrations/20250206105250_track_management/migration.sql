/*
  Warnings:

  - You are about to drop the column `pageId` on the `ModuleTrack` table. All the data in the column will be lost.
  - Added the required column `pageCid` to the `ModuleTrack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ModuleTrack" DROP CONSTRAINT "ModuleTrack_pageId_fkey";

-- AlterTable
ALTER TABLE "ModuleTrack" DROP COLUMN "pageId",
ADD COLUMN     "pageCid" VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE "ModuleTrack" ADD CONSTRAINT "ModuleTrack_pageCid_fkey" FOREIGN KEY ("pageCid") REFERENCES "PageTrack"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;
