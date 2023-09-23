import React from "react";
import { Card } from "antd";

const infoData = [
  {
    title: "BUYING AND SELLING",
    content:
      "Trading in the stock market is a dynamic dance between buying and selling, where strategic moves can lead to financial gains. Whether you're an aspiring investor or a seasoned trader, understanding the intricacies of buying and selling is crucial for success in the ever-evolving world of finance.",
  },
  {
    title: "DEEP LEARNING",
    content:
      "Traditional trading strategies often relied on historical data and technical indicators. However, the stock market's inherent volatility to various factors made accurate predictions challenging. By harnessing the power of neural networks can uncover intricate patterns within vast amounts of data.",
  },
  {
    title: "CHANGE YOUR LIFE",
    content:
      "The stock market, often portrayed as a realm of financial opportunity, has the potential to profoundly impact lives. While not a guaranteed path to success, the stock market offers individuals the chance to change their lives through careful planning, strategic thinking, and disciplined execution.",
  },
  {
    title: "FORMULA",
    content:
      "As investors seek to unlock the stock market's secrets, they navigate the formula's ever-changing variables. Vigilant monitoring of market dynamics, understanding investor sentiment, and conducting thorough research into company fundamentals all contribute to making informed investment decisions.",
  },
  {
    title: "PROFIT",
    content:
      "The stock market, a bustling arena of financial opportunities, offers investors a platform to pursue profit through strategic decisions and well-timed actions. Achieving success in the stock market involves understanding key principles and employing shrewd tactics to harness the potential for profit.",
  },
];

const InfoCards = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "50px",
      }}
    >
      {infoData.map((info, index) => (
        <Card
          key={index}
          style={{
            width: "300px",
            border: "2px solid yellow",
            marginBottom: "16px",
            backgroundColor: "transparent",
            color: "white",
            position: "relative",
            borderRadius: "10px", // Adding rounded corners to the card
          }}
        >
          <div
            style={{
              backgroundColor: "yellow",
              color: "black",
              fontWeight: "500",
              position: "absolute",
              top: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "8px 16px", // Adjust padding to control box width
              textAlign: "center",
              borderRadius: "10px", // Adding rounded corners to the yellow box
              whiteSpace: "nowrap",
            }}
          >
            {info.title}
          </div>
          <div style={{ padding: "16px" }}>{info.content}</div>
        </Card>
      ))}
    </div>
  );
};

export default InfoCards;
