-- AlterTable
ALTER TABLE "Documentation" ADD COLUMN     "docBlockId" TEXT;

-- CreateTable
CREATE TABLE "docblocks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "docblocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Documentation" ADD CONSTRAINT "Documentation_docBlockId_fkey" FOREIGN KEY ("docBlockId") REFERENCES "docblocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
