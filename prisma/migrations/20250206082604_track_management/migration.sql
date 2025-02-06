/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Track` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TrackType" AS ENUM ('PAGE', 'MODULE');

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_eventId_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Track";

-- CreateTable
CREATE TABLE "PageTrack" (
    "id" SERIAL NOT NULL,
    "cid" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "path" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleTrack" (
    "id" SERIAL NOT NULL,
    "bid" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "pageId" INTEGER NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageTrackRecord" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "environment" VARCHAR(20) NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "deviceInfo" JSONB,
    "url" TEXT,
    "referrer" TEXT,
    "extraInfo" JSONB,
    "sdkVersion" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageTrackRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleTrackRecord" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "environment" VARCHAR(20) NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "deviceInfo" JSONB,
    "moduleInfo" JSONB,
    "extraInfo" JSONB,
    "sdkVersion" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModuleTrackRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageTrack_cid_key" ON "PageTrack"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleTrack_bid_key" ON "ModuleTrack"("bid");

-- CreateIndex
CREATE INDEX "PageTrackRecord_pageId_idx" ON "PageTrackRecord"("pageId");

-- CreateIndex
CREATE INDEX "PageTrackRecord_userId_idx" ON "PageTrackRecord"("userId");

-- CreateIndex
CREATE INDEX "PageTrackRecord_eventTime_idx" ON "PageTrackRecord"("eventTime");

-- CreateIndex
CREATE INDEX "PageTrackRecord_environment_idx" ON "PageTrackRecord"("environment");

-- CreateIndex
CREATE INDEX "ModuleTrackRecord_moduleId_idx" ON "ModuleTrackRecord"("moduleId");

-- CreateIndex
CREATE INDEX "ModuleTrackRecord_userId_idx" ON "ModuleTrackRecord"("userId");

-- CreateIndex
CREATE INDEX "ModuleTrackRecord_eventTime_idx" ON "ModuleTrackRecord"("eventTime");

-- CreateIndex
CREATE INDEX "ModuleTrackRecord_environment_idx" ON "ModuleTrackRecord"("environment");

-- AddForeignKey
ALTER TABLE "ModuleTrack" ADD CONSTRAINT "ModuleTrack_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "PageTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTrackRecord" ADD CONSTRAINT "PageTrackRecord_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "PageTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleTrackRecord" ADD CONSTRAINT "ModuleTrackRecord_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "ModuleTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
