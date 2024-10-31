import React from "react";

const InviteFriend = () => {
  const handleInviteClick = async (e) => {
    e.preventDefault();

    try {
      await navigator.share({
        title: "Join SnipSlip!",
        text: "Check this out! 😮",
        url: window.location.href
      });
      console.log("thanks for sharing");
    } catch (error) {
      console.log("erroor sharing", error);
    }
  };

  return (
    <a href="#" onClick={handleInviteClick} className="nav-link">
      Invite a Friend
    </a>
  );
};

export default InviteFriend;
