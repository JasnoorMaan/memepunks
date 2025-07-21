-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memes" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "auctionEndsAt" TIMESTAMP(3),
    "startingPrice" BIGINT NOT NULL DEFAULT 0,
    "currentPrice" BIGINT,
    "currentBidderId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSold" BOOLEAN NOT NULL DEFAULT false,
    "bidCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "memes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bidderId" TEXT NOT NULL,
    "memeId" TEXT NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "memes" ADD CONSTRAINT "memes_currentBidderId_fkey" FOREIGN KEY ("currentBidderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memes" ADD CONSTRAINT "memes_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "memes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
