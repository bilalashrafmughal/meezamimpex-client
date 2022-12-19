import mission from "../images/mission.png";
import reliability from "../images/Reliability.png";
import certified from "../images/certified.jpg";
import catalogh from "../images/catalouge.png";
import complaints from "../images/complaints.png";

export const webText = {
  header: {
    mainHeading: "Lorem Ipsum is simply",
    subHeading: "Lorem Ipsum is simply dummy text of the",
  },
  aim: {
    subHeading: "Our Motive to work",
    heading: "Our Motive and passion arise us to do something new",

    aimBoxes: [
      {
        id: 1,
        icon: mission,
        heading: "Sampling & Pattern Making",
        details:
          "Proofing your design before bulk manufacturingis one of the first and most important steps. We will cut Patterns and make a pre-production Sample for your approval. Our team of skilled sampling and pattern making specialists will make sure you are satisfied with the look and feel of the garment before any further steps are taken.",
      },
      {
        id: 2,
        icon: reliability,
        heading: "Material & Fabric Sourcing",
        details:
          "We take away the headache of sourcing materials for you. We provide sourcing services as part of your Product manufacturing project and can help source high-quality fabrics, made specially to your specifics. Have your own fabrics and Materials – Great! If not – we will help solve this for you.",
      },
      {
        id: 3,
        icon: mission,
        heading: "Lowest Minimum Orders",
        details: `Our Flexible Minimum Order Quantities allow new Brands to manufacture in bulk without strict requirements to order thousands of items per style. The standard MOQ is just 100pcs per style (incl. sizes and colors) but we also accept smaller runs in cases you are producing more than one style combined.`,
      },
    ],
  },

  features: [
    {
      id: 1,
      heading: "Highest Quality Production",
      details: `No compromise when it comes to price or quality as we deliver both.
             With Pakistan based factory we manufacture garments, GYM wear, Gloves, 
             accessories to the highest standard. Our customers fall in love with the quality and our 
             reviews speak for themselves. 
            MEEZAM IMPEX also guarantees you are working with a Supplier directly, not an agent.`,
      img: certified,
      isActive: false,
      icon: complaints,
    },
    {
      id: 2,
      heading: "Delivery to your Doorstep",
      details: `Not many Manufacturers can offer this level of guidance when it comes to cost breakdown and explaining all the steps of production. We carefully clarify every aspect of manufacturing and work to build a long-lasting relationship. With MEEZAM IMPEX you will never experience the costs or charges that you did not approve.`,
      img: certified,
      isActive: false,
      icon: catalogh,
    },
    {
      id: 3,
      heading: "Delivery to your Doorstep",
      details: `We can deliver your order right to you doorstep 
            or any city or country in the world. All production and sampling deliveries come with 
            a tracking number as we work with the most reliable curriers to ensure the lowest shipping costs. `,
      img: certified,
      isActive: false,
      icon: complaints,
    },
  ],

  contactMethods: [
    {
      id: 1,
      category: "address",
      text1: "Jinnah Chowk Circular Road Daska ",
      text2: "Reading London Road Berkshire",
      icon: "fas fa-map-marker-alt",
    },
    {
      id: 2,
      category: "email",
      text1: "Email",
      text2: "meesamimpex@yahoo.com",
      icon: "fas fa-envelope",
    },
    {
      id: 3,
      category: "phone",
      text1: "Phone",
      text2: "00923034937104 ",
      icon: "fas fa-mobile",
    },
  ],

  footer: [
    {
      id: 1,
      heading: "Information",
      home: "home",
      aboutUs: "about us",
      contactUs: "contact us",
      newsEvents: "News and events",
      followUs: [
        { icon: "fas fa-facebook", link: "www.facebook.com" },
        { icon: "fas fa-twitter", link: "www.twitter.com" },
        { icon: "fas fa-instagram", link: "www.instagram.com" },
      ],
    },
    {
      id: 2,
      heading: "Catagories",
      general: "General Surgeries",
      dental: "Orthpetic",
      neoro: "Neorosurgery",
    },
    {
      id: 3,
      heading: "Newsletter",
      details: "desktop publishing software like Aldus",
    },
  ],
};
