var moment = require("moment");

module.exports = {
  mergeName: (a, b) => a + " " + b,
  convertDate: (a) => moment(a).format("YYYY-MM-DD"),
  nonImage: (a) => (a == "undefined" ? "nonimage.png" : a),
  deleteSpace: (a) => a.trim(),
  emotionReact: (a) => {
    if (a == 3) {
      return "haha-react.png";
    } else if (a == 1) {
      return "red-heart_2764-fe0f.png";
    } else if (a == 2) {
      return "like-react.png";
    } else if (a == 3) {
      return "haha-react.png";
    } else if (a == 4) {
      return "angry-icon.png";
    } else if (a == 5) {
      return "lovelove-icon.png";
    } else if (a == 6) {
      return "cry-icon.png";
    } else {
      return "white-heart.png";
    }
  },
  converDateNewsfeed: (a) => moment(a).format("LLL"),
  iconRulePost: (a) => (a == 1 ? "world-icon.png" : "locked-icon.png"),
  sum: (a) => (a == a ? a + 1 : a), //create helpers
  convertGender: (a) => (a == 1 ? "Male" : "Female"),
  status: (a) => (a == 1 ? "Activity" : "Block"),
  followCustomer: (a) => (a == 1 ? "unfollow" : "follow"),
  followGroup: (a) => (a == 1 ? "leave" : "join"),
  btnStatus: (a) => (a == 0 ? "block" : "check"),
  btnStatusHidden: (a) => (a == 1 ? "btn-status--hidden" : ""),
  accType: (a) => (a == 1 ? "Admin " : "User"),
  sortable: (field, sort) => {
    const sortType = field == sort.column ? sort.type : "default";
    const icons = {
      default: "fas fa-sort",
      desc: "fas fa-sort-amount-down",
      asc: "fas fa-sort-amount-up",
    };

    const types = {
      default: "desc",
      asc: "desc",
      desc: "asc",
    };
    const icon = icons[sortType];
    const type = types[sortType];
    return `<a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>`;
  },
  formatCurrency: (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price));
  },

  formatLongString: (str) => {
    return str.length > 10 ? str.slice(0, 9).concat("...") : str;
  },

  emitCardTitle: (str) => {
    return str.length > 40 ? str.slice(0, 40).concat("...") : str;
  },

  displayPromotion: (per) => {
    return per != 0 ? per + "% off" : "";
  },

  displayStarNo: (starNo) => {
    let stars = "";
    for (let i = 0; i < starNo; i++) stars += "star ";
    return stars;
  },
  trueSelected: (value) => {
    return value === 1 ? "selected" : "";
  },
  falseSelected: (value) => {
    return value === 0 ? "selected" : "";
  },
};
