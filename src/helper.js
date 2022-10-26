import React from "react";
import ContentLoader from "react-content-loader";

const FormatNumber = (number) => {
  if (number < 1000) return number;
  else if (1000 <= number && number % 1000 >= 100) {
    const afterComma = `${(number % 1000) / 100}`.replace("0", "");
    const result = `${Math.floor(number / 1000)}${
      number % 1000 === 0 ? "" : ","
    }${Math.floor(afterComma)}B`;
    return result;
  } else if (number % 1000 < 100) {
    return `${Math.floor(number / 1000)}B`;
  } else return number + 1;
};

const AvatarLoader = (props) => (
  <ContentLoader
    speed={2}
    width={46}
    height={46}
    viewBox="0 0 46 38"
    backgroundColor="#333"
    foregroundColor="#444"
    {...props}
  >
    <rect x="527" y="188" rx="3" ry="3" width="88" height="6" />
    <rect x="531" y="189" rx="3" ry="3" width="52" height="6" />
    <rect x="362" y="201" rx="3" ry="3" width="380" height="6" />
    <rect x="467" y="196" rx="3" ry="3" width="178" height="6" />
    <circle cx="19" cy="19" r="19" />
  </ContentLoader>
);

export { AvatarLoader, FormatNumber };
