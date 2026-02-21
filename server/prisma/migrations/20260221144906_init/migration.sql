-- CreateTable
CREATE TABLE "word" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "word_pkey" PRIMARY KEY ("id")
);
