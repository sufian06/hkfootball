-- CreateTable
CREATE TABLE "PlayerModel" (
    "id" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "playedMatches" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT,
    "coverImage" TEXT,

    CONSTRAINT "PlayerModel_pkey" PRIMARY KEY ("id")
);
