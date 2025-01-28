-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotPreset" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "model" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "systemPrompt" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "allowedIds" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BotPreset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BotPreset" ADD CONSTRAINT "BotPreset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
