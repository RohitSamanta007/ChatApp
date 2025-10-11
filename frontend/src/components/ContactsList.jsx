import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ContactsList() {
  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } =
    useChatStore();
    const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;
  // console.log("the value of All contacts is : ", allContacts);
  return (
    <div>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-3 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mb-2"
          onClick={()=> setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: fix this online status and make it work wiht socket  */}
            <div className={`avatar ${onlineUsers.includes(contact._id)? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactsList;
