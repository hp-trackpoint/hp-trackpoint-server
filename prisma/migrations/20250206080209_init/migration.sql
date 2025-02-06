/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventKey" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "environment" VARCHAR(20) NOT NULL,
    "eventId" INTEGER NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "cid" VARCHAR(50),
    "bid" VARCHAR(50),
    "os" VARCHAR(50),
    "osVersion" VARCHAR(50),
    "browser" VARCHAR(50),
    "browserVersion" VARCHAR(50),
    "deviceType" VARCHAR(50),
    "region" VARCHAR(50),
    "pageUrl" TEXT,
    "referrer" TEXT,
    "extraInfo" JSONB,
    "sdkVersion" VARCHAR(20) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventKey_key" ON "Event"("eventKey");

-- CreateIndex
CREATE INDEX "Track_eventId_idx" ON "Track"("eventId");

-- CreateIndex
CREATE INDEX "Track_userId_idx" ON "Track"("userId");

-- CreateIndex
CREATE INDEX "Track_eventTime_idx" ON "Track"("eventTime");

-- CreateIndex
CREATE INDEX "Track_environment_idx" ON "Track"("environment");

-- CreateIndex
CREATE INDEX "Track_cid_idx" ON "Track"("cid");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
