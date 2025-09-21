/*
  Warnings:

  - You are about to drop the column `recurringId` on the `DailyTask` table. All the data in the column will be lost.
  - You are about to drop the `RecurringTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DailyTask" DROP CONSTRAINT "DailyTask_recurringId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecurringTask" DROP CONSTRAINT "RecurringTask_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecurringTask" DROP CONSTRAINT "RecurringTask_userId_fkey";

-- AlterTable
ALTER TABLE "public"."DailyTask" DROP COLUMN "recurringId";

-- DropTable
DROP TABLE "public"."RecurringTask";

-- DropEnum
DROP TYPE "public"."Frequency";
