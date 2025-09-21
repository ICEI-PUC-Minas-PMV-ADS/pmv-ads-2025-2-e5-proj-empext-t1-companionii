-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "statusChangedAt" TIMESTAMP(3);
