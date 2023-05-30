-- CreateTable
CREATE TABLE "InviteUser" (
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT DEFAULT 'WAITING',

    CONSTRAINT "InviteUser_pkey" PRIMARY KEY ("userId","groupId")
);

-- AddForeignKey
ALTER TABLE "InviteUser" ADD CONSTRAINT "InviteUser_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteUser" ADD CONSTRAINT "InviteUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
