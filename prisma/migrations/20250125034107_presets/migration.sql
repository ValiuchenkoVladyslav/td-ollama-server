-- CreateTable
CREATE TABLE "BotPreset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "model" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "systemPrompt" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "allowedIds" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "BotPreset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
