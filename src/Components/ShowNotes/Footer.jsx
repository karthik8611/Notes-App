import React from "react";
import encrypted from "../../assets/encrypted.svg";
// karthik
const Footer = () => {
  return (
    <>
      <footer>
        <p>
          <img src={encrypted} alt="encrypted" />
          end-to-end encrypted
        </p>
      </footer>
    </>
  );
};

export default Footer;
