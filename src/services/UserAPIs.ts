"use server"
import { auth, currentUser } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";

 export async function clerkGetUser() {
    const { userId } = await auth();
    const user = await currentUser();

  const userName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.externalAccounts[0].emailAddress;
  const userImage = user?.imageUrl

    return {
        userId,
        userName,
        userEmail,
        userImage,
    };
}
 
export async function sanityuserPost(){
    const user = await clerkGetUser();

const userObject = {
    profileImage: user.userImage,
    username: user.userName,
    email: user.userEmail,
    _type: "userProfile",
    _id: `userId-${user.userId}`,
}
    const res = await client.createOrReplace(userObject);

   localStorage.setItem('username', res.username);
}