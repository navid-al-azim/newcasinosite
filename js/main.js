console.log('hello');
const primeBgImg = new PrimeBgImg();
let LOCALE_COUNTRY;
LOCALE_COUNTRY = document
  .querySelector(`body`)
  .dataset.localeCountry.toLowerCase();
window.addEventListener("resize", () => {
  primeBgImg.detectMobileOrDesktopBg();
});
const headerMobBtn = document.querySelector(`#headerMobBtn`),
  localeSwitcher = document.querySelector(`#localeSwitcher`),
  localeSwitcherBtn = document.querySelector(`#localeSwitcherBtn`),
  localeSwitcherCloseBtn = document.querySelector(`#localeSwitcherCloseBtn`),
  headerMenu = document.querySelector(`#headerMenu`),
  headerMenuItems = document.querySelectorAll(`.header_menu-item`),
  headerMenuContentBlocks = document.querySelectorAll(
    `.header_menuContent-block`
  );
if (localeSwitcher) {
  localeSwitcherBtn.addEventListener(`click`, () => {
    localeSwitcher.classList.add(`active`);
    localeSwitcherCloseBtn.addEventListener(`click`, () =>
      localeSwitcher.classList.remove(`active`)
    );
  });
}
if (headerMobBtn) {
  headerMenuItems.forEach((item) => {
    if (window.innerWidth <= 992) {
        console.log('hello ok')
      item.addEventListener(`click`, (e) => {
        e.preventDefault();
        if (item.classList.contains(`active`)) {
          item.classList.remove(`active`);
        } else {
          if (item.nextElementSibling) item.classList.add(`active`);
          else document.location.href = item.href;
        }
      });
    }
  });
  headerMenuContentBlocks.forEach((item) => {
    item.querySelector(`.title`).addEventListener(`click`, (e) => {
      e.preventDefault();
      let activeItems = document.querySelectorAll(`.header_menu-item.active`);
      if (item.classList.contains(`active`)) {
        item.classList.remove(`active`);
      } else {
        activeItems.forEach((el) => el.classList.add("disabled"));
        item.classList.add(`active`);
      }
    });
  });
  headerMobBtn.addEventListener(`click`, () => {
    if (headerMobBtn.classList.contains(`active`)) {
      document.body.classList.remove(`overflow-hidden`);
      headerMobBtn.classList.remove(`active`);
      headerMenu.classList.remove(`active`);
      let activeItems = document.querySelectorAll(`.header_menu-item.active`);
      activeItems.forEach((item) => item.classList.remove(`active`));
      let activeItemsBlocks = document.querySelectorAll(
        `.header_menuContent-block.active`
      );
      activeItemsBlocks.forEach((item) => item.classList.remove(`active`));
      if (localeSwitcher) {
        localeSwitcher.classList.remove(`shown`);
        localeSwitcher.classList.remove(`active`);
      }
    } else {
      document.body.classList.add(`overflow-hidden`);
      headerMobBtn.classList.add(`active`);
      headerMenu.classList.add(`active`);
      localeSwitcher && localeSwitcher.classList.add(`shown`);
    }
  });
}
async function initOffers() {
  let clientLocation = document.body.dataset.geo;
  if (!clientLocation) clientLocation = await geoCloudflareLocation();
  localStorage.setItem("geo", clientLocation);
  fetch(`/api/offers?country=${clientLocation}`, { mode: "cors" })
    .then((res) => res.json())
    .then((t) => {
      if (t.length === 0 || !t) {
        t = [
          {
            offer_id: "947",
            offer_name: "True-Fortune",
            offer_bonus: "Exclusive Offer â‚¬25 Free Chip",
            offer_domain: "true-fortune.com",
            offer_games: "38",
            offer_established: "2016",
            offer_terms: "https://true-fortune.com/bonus_terms",
            offer_free_spins: "",
            offer_jurisdictions: "Curacao",
            offer_payment:
              "Bitcoin Cash, EcoPayz EcoCard, Maestro, MasterCard, Neteller, Skrill Moneybookers, Visa, Wire Transfer",
            offer_background: "000711",
          },
          {
            offer_id: "843",
            offer_name: "iWildCasino",
            offer_bonus:
              "Welcome Bonus Pack: 260% up to â‚¬3500 + 270 Free Spins!",
            offer_domain: "iwildcasino.com",
            offer_games: "6000",
            offer_established: "2021",
            offer_terms: "https://iwildcasino.com/en/page/terms-and-conditions",
            offer_free_spins: "",
            offer_jurisdictions: "Curacao",
            offer_payment: "Klarna, MasterCard, Visa",
            offer_background: "210C41",
          },
          {
            offer_id: "855",
            offer_name: "Shambala Casino",
            offer_bonus: "Welcome Package â‚¬500 + 180 Free Spins",
            offer_domain: "shambalacasino.com",
            offer_games: "4000",
            offer_established: "2021",
            offer_terms: "https://shambalacasino.com/terms-and-conditions",
            offer_free_spins: "",
            offer_jurisdictions: "Curacao",
            offer_payment: "Neteller, Bitcoin, Neosurf",
            offer_background: "0E0906",
          },
        ];
      }
      localStorage.setItem("keitaro", JSON.stringify(t));
      const footerBanner = new FooterBanner(
        t,
        clientLocation.toLowerCase(),
        LOCALE_COUNTRY
      );
      footerBanner.footerBannerInit();
      const exitPopup = new ExitPopup(
        t,
        clientLocation.toLowerCase(),
        LOCALE_COUNTRY
      );
      exitPopup.exitPopupInit();
      const affiliatePopup = new AffLinksPopup(
        t,
        clientLocation.toLowerCase(),
        LOCALE_COUNTRY
      );
      affiliatePopup.affLinksPopupInit();
      const cookiesBanner = new CookiesBanner();
      cookiesBanner.generateCookieBanner();
    });
  return clientLocation;
}
const checkIfAmplitudeAndAnalyticsLoaded = () => {
  if (window.amplitude && window.ga) {
    let trackers,
      clientId = "";
    ga(function () {
      trackers = ga.getAll();
      if (trackers.length) {
        clientId = trackers[0].get("clientId");
      }
    });
    if (
      amplitude.getInstance().getSessionId &&
      typeof amplitude.getInstance().getSessionId === `function`
    )
      return `&am_session_id=${amplitude
        .getInstance()
        .getSessionId()}&ga_client_id=${clientId}&am_device_id=${
        amplitude.getInstance().options.deviceId
      }`;
  } else {
    setTimeout(checkIfAmplitudeAndAnalyticsLoaded, 500);
  }
};
const getCookie = (name) => {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
if (getCookie("ca_admin")) {
  document.cookie = encodeURIComponent("is_test") + "=" + encodeURIComponent(1);
  let scriptEle = document.createElement("script");
  scriptEle.setAttribute("src", "/build/midori/assets/js/adminPanel.js");
  document.body.appendChild(scriptEle);
  scriptEle.addEventListener("load", () => {
    adminPanel();
  });
} else {
  document.cookie = encodeURIComponent("is_test") + "=" + encodeURIComponent(0);
}
appendStaticContentCarousel();
const footerDetection = () => {
  let widgetViewed = false;
  const eventID = [
    "p_bonus_spin_n",
    "p_bonus_amount",
    "p_bonus_casino",
    "p_bonus_category",
    "p_bonus_country",
    "p_bonus_percent",
    "p_casino_category",
    "p_casino_city",
    "p_casino_country",
    "p_casino_state_usa",
    "p_casino_currency",
    "p_casino_deposit_low",
    "p_casino_payment",
    "p_casino",
    "p_casino_slot_soft",
    "p_game_category",
    "p_slot_category",
    "p_slot",
    "p_slot_payline",
    "p_blog_category",
    "p_blog_article",
    "p_website_category",
    "p_similar_casions",
    "p_website_page",
    "p_home",
    "p_other",
  ];
  const ROUTE = document.body.dataset.routeBonus;
  const ROUTE__ID = document.body.dataset.routeId;
  const ROUTE__EXIST = eventID.findIndex((item) => item === ROUTE);
  const EVENT__ID = ROUTE__EXIST > -1 ? ROUTE__EXIST + 1 : eventID.length;
  const EVENT__CAT =
    ROUTE__EXIST > -1 ? eventID[ROUTE__EXIST] : eventID[eventID.length - 1];
  const PAGE__CURRENT__PATH = document.location.pathname;
  const PAGE__URL = document.location.origin + document.location.pathname;
  const PAGE__URL__FULL = document.location.href;
  const footerInView = () => {
    if (elementInViewport(document.querySelector(`.footer`))) {
      widgetViewed = true;
      dataLayer.push(
        Object.assign({
          event: `addEvents_showWidget`,
          event_id: `d-v1-e61`,
          event_cat: `w_website`,
          event_name: `footer`,
          page_current_path: JSON.stringify(PAGE__CURRENT__PATH),
          page_url: JSON.stringify(PAGE__URL),
          page_url_full: JSON.stringify(PAGE__URL__FULL),
          page_group: JSON.stringify(EVENT__CAT),
          page_route_id: JSON.stringify(ROUTE__ID),
        })
      );
      if (window.addEventListener) {
        removeEventListener("DOMContentLoaded", footerInView);
        removeEventListener("load", footerInView);
        removeEventListener("scroll", footerInView);
        removeEventListener("resize", footerInView);
      } else if (window.attachEvent) {
        detachEvent("onDOMContentLoaded", footerInView);
        detachEvent("onload", footerInView);
        detachEvent("onscroll", footerInView);
        detachEvent("onresize", footerInView);
      }
    }
  };
  if (window.addEventListener) {
    addEventListener("DOMContentLoaded", footerInView, false);
    addEventListener("load", footerInView, false);
    addEventListener("scroll", footerInView, false);
    addEventListener("resize", footerInView, false);
  } else if (window.attachEvent) {
    attachEvent("onDOMContentLoaded", footerInView);
    attachEvent("onload", footerInView);
    attachEvent("onscroll", footerInView);
    attachEvent("onresize", footerInView);
  }
};
footerDetection();
document.addEventListener("DOMContentLoaded", () => {
  if (getDomainName() === "casinosanalyzer.com") {
    isAuth().then((data) => !data.user && emailPopupFunc());
    auth.initAuth();
    authPopup.callPopupByBonusBannerClick();
  }
  const mapElement = document.getElementById("world-map-markers");
  if (mapElement) {
    (async () => {
      const mapModuleJs = "./worldMapMarkers.js";
      const mapModule = await import(mapModuleJs);
      const worldMap = new mapModule.default(mapElement);
      worldMap.generateWorldMap();
    })();
  }
  primeBgImg.detectMobileOrDesktopBg();
  let externalLinks = document.querySelectorAll("[data-name=external--link]");
  let internalLinks = document.querySelectorAll("[data-name=internal--link]");
  externalLinkClick(externalLinks);
  internalLinkClick(internalLinks);
  initOffers().then((r) => r);
});

import { geoCloudflareLocation as geoCloudflareLocationSearchForm } from "/build/midori/assets/js/api.js";
import { newCasinoBonusTable } from "/build/midori/assets/js/components/CasinoBonusTable.js";
import { navAff as navAffSearchForm } from "/build/midori/assets/js/globals.js";
const searchFormFuncSearchForm = () => {
  const searchFormInput = document.querySelector(
    `.frontSearch__form #form_domain`
  );
  const searchFormBtn = document.querySelector(`.frontSearch__form #form_save`);
  const headerSearchFront = document.querySelector(`.frontSearch`);
  const headerSearchForm = document.querySelector(`.frontSearch__form form`);
  const primeBlock = document.querySelector(`.prime-bg`);
  const frontSearchBtnClose = document.querySelector(
    `.frontSearch__btn--close`
  );
  const frontSearchFormBtn = document.querySelector(`.frontSearch__form__btn`);
  const COUNTRY_PL = document.location.host.includes(`kasynoanalyzer`);
  const COUNTRY_NAME =
    searchDropdownSearchForm.dataset.country === `Poland`
      ? `Polsce`
      : searchDropdownSearchForm.dataset.country;
  const TRANS_PL = {
    "I'm looking for": "Szukam",
    All: "Wszystko",
    Slots: "Sloty",
    Bonuses: "Bonusy",
    "Casino Reviews": "Recenzje Kasyn",
    "Popular search results in": "Najpopularniejsze Wyniki Wyszukiwania w",
    "Popular Casino Reviews in": "Najpopularniejsze Recenzje Kasyn w",
    "Popular Bonuses in": "Najpopularniejsze Bonusy w",
    "Popular Slots in": "Najpopularniejsze Sloty w",
    "Found in Slots": "Do znalezienia w Slotach",
    "In Slots": "W Slotach",
  };
  const getLoc = async () => {
    let loc = document.body.dataset.geo;
    if (!loc) loc = await geoCloudflareLocationSearchForm();
    localStorage.setItem("geo", loc);
    return loc;
  };
  const getOffers = async (limit = 6) => {
    let loc = await getLoc();
    let searchFormPopular = localStorage.getItem("searchFormPopular");
    if (!searchFormPopular) {
      searchFormPopular = await fetch(
        `/api/offers?country=${loc}&limit=${limit}&sort=true`,
        { mode: "cors" }
      )
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("searchFormPopular", JSON.stringify(data));
          return data;
        });
    } else
      searchFormPopular = JSON.parse(localStorage.getItem("searchFormPopular"));
    return searchFormPopular;
  };
  const getSlots = async (limit = 5) => {
    let loc = await getLoc();
    let searchFormSlots = localStorage.getItem("searchFormSlots");
    if (!searchFormSlots) {
      searchFormSlots = await fetch(
        `/api/slots?country=${loc}&limit=${limit}`,
        { mode: "cors" }
      )
        .then((res) => res.json())
        .then((data) =>
          data.map((item) => {
            return item;
          })
        )
        .then((data) => {
          localStorage.setItem("searchFormSlots", JSON.stringify(data));
          return data;
        });
    } else
      searchFormSlots = JSON.parse(localStorage.getItem("searchFormSlots"));
    return searchFormSlots;
  };
  const SEARCH_COUNT_ALL = 9;
  const SEARCH_COUNT = 5;
  const getSearch = async (value, type = `all`) =>
    await fetch(
      `/search-hint?search=${value}&limit=${
        type === `all` ? SEARCH_COUNT_ALL : SEARCH_COUNT
      }&type=${type}`
    ).then((data) => data.json());
  let renderedSearchDropdown = false;
  if (searchFormInput) {
    searchFormInput.setAttribute(`autocomplete`, `off`);
    searchFormInput.addEventListener(`click`, (e) => {
      e.stopPropagation();
    });
    searchFormInput.addEventListener(`focus`, (e) => {
      e.stopPropagation();
      showSearchDropdown();
    });
    let debounceTimer;
    let lastInputValue = "";
    searchFormInput.addEventListener(`input`, (e) => {
      e.stopPropagation();
      const inputValue = e.target.value;
      clearTimeout(debounceTimer);
      if (inputValue !== lastInputValue) {
        lastInputValue = inputValue;
        debounceTimer = setTimeout(() => {
          renderSearchResult(inputValue).then((r) => r);
        }, 1000);
      }
    });
    searchFormBtn.addEventListener(`click`, (e) => {
      e.stopPropagation();
      showSearchDropdown();
      let searchResult = document.querySelector(
        `.search__result--container .item`
      );
      searchResult && !headerSearchForm
        ? searchResult.click()
        : showSearchDropdown();
    });
    headerSearchForm &&
      headerSearchForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        let searchResult = document.querySelector(
          `.search__result--container .item`
        );
        searchResult && searchResult.click();
      });
    searchDropdownSearchForm.addEventListener(`click`, (e) => {
      e.stopPropagation();
    });
  }
  document.body.addEventListener(`click`, () => {
    if (document.body.classList.contains(`searchDropdown`)) {
      document.body.classList.remove(`searchDropdown`);
    }
  });
  const renderSearchResult = async (value) => {
    if (value.length) {
      const searchContainer = document.querySelector(
        `.search__result--container`
      );
      let type = document.querySelector(`.search__btns--items button.active`)
        .dataset.name;
      let result = await getSearch(value, type);
      searchContainer.innerHTML = ``;
      let casinos = result.filter((item) => item.group === `casino`),
        bonuses = result.filter((item) => item.group === `bonus`),
        slots = result.filter((item) => item.group === `slot`);
      switch (type) {
        case `all`:
          searchContainer.append(
            casinos.length ? await renderSearchReviews(casinos, 3) : ``,
            bonuses.length ? await renderSearchBonuses(bonuses, 3) : ``,
            slots.length ? await renderSearchSlots(slots, 3) : ``
          );
          break;
        case `casino`:
          casinos.length &&
            searchContainer.append(await renderSearchReviews(casinos, 5));
          break;
        case `bonus`:
          bonuses.length &&
            searchContainer.append(await renderSearchBonuses(bonuses, 5));
          break;
        case `slot`:
          slots.length &&
            searchContainer.append(await renderSearchSlots(slots, 5));
          break;
      }
    }
  };
  frontSearchFormBtn &&
    frontSearchFormBtn.addEventListener(`click`, (e) => {
      e.stopPropagation();
      let searchResult = document.querySelector(
        `.search__result--container .item`
      );
      searchResult ? searchResult.click() : showSearchDropdown();
    });
  frontSearchBtnClose &&
    frontSearchBtnClose.addEventListener(`click`, (e) => {
      e.stopPropagation();
      headerSearchFront.classList.remove(`show`);
      frontSearchBtnClose.classList.remove(`active`);
      if (primeBlock) primeBlock.style.overflow = `hidden`;
    });
  document.body.addEventListener(`click`, (e) => {
    if (headerSearchFront && headerSearchFront.classList.contains(`show`)) {
      headerSearchFront.classList.remove(`show`);
      frontSearchBtnClose.classList.remove(`active`);
      if (primeBlock) primeBlock.style.overflow = `hidden`;
    }
  });
  const showSearchDropdown = () => {
    if (!renderedSearchDropdown) renderSearchDropdown();
    headerSearchFront.classList.add(`show`);
    frontSearchBtnClose.classList.add(`active`);
    if (primeBlock) primeBlock.style.overflow = `inherit`;
  };
  const renderSearchDropdown = async () => {
    renderedSearchDropdown = true;
    const popularContainer = renderSearchPopularContainer();
    popularContainer.append(await renderSearchPopular(), renderSearchNav());
    const scrollContainer = document.createElement(`div`);
    scrollContainer.className = `search__scroll--container`;
    scrollContainer.append(renderSearchContainer(), popularContainer);
    searchDropdownSearchForm.append(renderSearchBtns(), scrollContainer);
    handleSearchBtns();
  };
  const renderSearchContainer = () => {
    let div = document.createElement(`div`);
    div.className = `search__result--container`;
    return div;
  };
  const handleSearchBtns = () => {
    const btns = document.querySelectorAll(`.search__btns--items button`);
    const popularContainer = document.querySelector(
      `.search__popular--container`
    );
    btns.forEach((btn) => {
      btn.addEventListener(`click`, async (e) => {
        e.stopPropagation();
        popularContainer.innerHTML = ``;
        document
          .querySelector(`.search__btns--items button.active`)
          .classList.remove(`active`);
        btn.classList.add(`active`);
        switch (btn.dataset.name) {
          case `all`:
            popularContainer.append(
              await renderSearchPopular(),
              renderSearchNav()
            );
            break;
          case `casino`:
            popularContainer.append(await renderSearchPopularCasinos());
            break;
          case `bonus`:
            popularContainer.append(await renderSearchPopularBonuses());
            break;
          case `slot`:
            popularContainer.append(
              await renderSearchPopular(),
              await renderSearchPopularSlots()
            );
            break;
        }
        renderSearchResult(searchFormInput.value);
      });
    });
  };
  const renderSearchBtns = () => {
    const casinoPath = searchDropdownSearchForm.dataset.casino;
    const bonusPath = searchDropdownSearchForm.dataset.bonus;
    const slotPath = searchDropdownSearchForm.dataset.slot;
    const block = document.createElement(`div`);
    block.className = `search__btns`;
    block.innerHTML = `<div class="search__btns--items">
	      <button type="button" data-name="all" class="active">${
          COUNTRY_PL && TRANS_PL["All"] ? TRANS_PL["All"] : "All"
        }</button>
	      ${
          casinoPath &&
          `<button type="button" data-name="casino">${
            COUNTRY_PL && TRANS_PL["Casino Reviews"]
              ? TRANS_PL["Casino Reviews"]
              : "Casino Reviews"
          }</button>`
        }
	      ${
          bonusPath &&
          `<button type="button" data-name="bonus">${
            COUNTRY_PL && TRANS_PL["Bonuses"] ? TRANS_PL["Bonuses"] : "Bonuses"
          }</button>`
        }
	      ${
          slotPath &&
          `<button type="button" data-name="slot">${
            COUNTRY_PL && TRANS_PL["Slots"] ? TRANS_PL["Slots"] : "Slots"
          }</button>`
        }
	  </div>`;
    return block;
  };
  const renderSearchNav = () => {
    const casinoPath = searchDropdownSearchForm.dataset.casino;
    const bonusPath = searchDropdownSearchForm.dataset.bonus;
    const slotPath = searchDropdownSearchForm.dataset.slot;
    const domainName = document.location.host
      .replace(`loc.`, ``)
      .replace(`dev.`, ``)
      .replace(`green.`, ``)
      .replace(`blue.`, ``);
    let data = [];
    if (domainName === `casinosanalyzer.com`)
      data.push({
        text: `Free spins no deposit`,
        path: `free-spins-no-deposit`,
      });
    if (bonusPath) data.push({ text: `Casino bonuses`, path: bonusPath });
    if (domainName === `casinosanalyzer.com`)
      data.push({ text: `New bonuses`, path: `free-spins-no-deposit/new` });
    if (casinoPath) data.push({ text: `Online casinos`, path: casinoPath });
    if (slotPath) data.push({ text: `Free slots`, path: slotPath });
    const block = document.createElement(`div`);
    block.className = `search__nav`;
    block.innerHTML = data
      .map(
        (item) => `<a href="/${item.path}">
      <img src="/build/casinosanalyzer/img/redesign/search.svg" alt="search">
      <span>${item.text}</span>
  </a>`
      )
      .join(``);
    return block;
  };
  const renderSearchPopularContainer = () => {
    const block = document.createElement(`div`);
    block.className = `search__popular--container`;
    return block;
  };
  const amplitudeDataset = (block, item, index) => {
    block.dataset.score = JSON.stringify(
      item.score ? item.score : item.rate ? item.rate : 4
    );
    block.dataset.titleShort = JSON.stringify(
      item.titleShort ? item.titleShort : null
    );
    block.dataset.titleLong = JSON.stringify(
      item.titleLong ? item.titleLong : null
    );
    block.dataset.affiliateUrl = JSON.stringify(
      item.affiliateUrl ? item.affiliateUrl : null
    );
    block.dataset.id = JSON.stringify(item.id ? item.id : null);
    block.dataset.amountMax = JSON.stringify(
      item.amountMax ? item.amountMax : null
    );
    block.dataset.percent = JSON.stringify(item.percent ? item.percent : null);
    block.dataset.exclusive = JSON.stringify(
      item.exclusive ? item.exclusive : null
    );
    block.dataset.cashable = JSON.stringify(
      item.cashable ? item.cashable : null
    );
    block.dataset.expired = JSON.stringify(
      item.expiredDate ? item.expiredDate : null
    );
    block.dataset.specialButtonTitle = JSON.stringify(
      item.specialButtonTitle ? item.specialButtonTitle : null
    );
    block.dataset.wageringRequirements = JSON.stringify(
      item.wageringRequirements ? item.wageringRequirements : null
    );
    block.dataset.depositMin = JSON.stringify(
      item.depositMin ? item.depositMin : null
    );
    block.dataset.code = JSON.stringify(item.code ? item.code : null);
    block.dataset.label = JSON.stringify(item.label ? item.label : null);
    block.dataset.bonusCategories = JSON.stringify(
      item.bonusCategories ? item.bonusCategories : null
    );
    block.dataset.bonusTypes = JSON.stringify(
      item.bonusTypes ? item.bonusTypes : null
    );
    block.dataset.freeSpins = JSON.stringify(
      item.freeSpins ? item.freeSpins : null
    );
    block.dataset.widget_list_index = JSON.stringify(index);
    if (item.casino) {
      block.dataset.casinoId = JSON.stringify(item.casino.casinoId);
      block.dataset.name = JSON.stringify(item.casino.name);
      block.dataset.domain = JSON.stringify(item.casino.domain);
    } else {
      block.dataset.casinoId = JSON.stringify(null);
      block.dataset.name = JSON.stringify(item.name ? item.name : null);
      block.dataset.domain = JSON.stringify(
        item.domain ? item.domain : item.slug ? item.slug : null
      );
    }
    return block;
  };
  const renderSearchPopular = async () => {
    let data = await getOffers(6);
    let items = data.slice(0, 5).map((item, index) => {
      let rating = [];
      for (let i = 1; i <= 5; i++) {
        rating.push(
          `<img src="/build/casinosanalyzer/img/redesign/${
            i <= Math.round(item.score) ? `star-full` : `star`
          }.svg" alt="star">`
        );
      }
      let block = document.createElement(`div`);
      block.className = `item`;
      block = amplitudeDataset(block, item, ++index);
      block.innerHTML = `<div class="item__logo" style="background-color: #${
        item.casino.background
      }">
          <img src="${item.casino.logo}" alt="${item.casino.name}">
      </div>
      <div class="item__rating">
          ${rating.join(``)}
      </div>
      <p class="item__title">${item.casino.name}</p>`;
      block.addEventListener(`click`, (e) => {
        e.stopPropagation();
        navAffSearchForm(
          `${item.casino.domain}?bonus=${item.id}`,
          true,
          {},
          false,
          item.affiliateUrl
        );
        searchAmplitudeClick(block);
      });
      return block;
    });
    const block = document.createElement(`div`);
    block.className = `search__popular`;
    block.innerHTML = `<p>${
      COUNTRY_PL && TRANS_PL["Popular search results in"]
        ? TRANS_PL["Popular search results in"]
        : "Popular search results in"
    } <span>${COUNTRY_NAME}</span></p>`;
    let blockItems = document.createElement(`div`);
    blockItems.className = `search__popular--items`;
    items.forEach((item) => blockItems.append(item));
    block.append(blockItems);
    return block;
  };
  const renderSearchPopularCasinos = async () => {
    let data = await getOffers(5);
    const casinoPath = searchDropdownSearchForm.dataset.casino;
    let items = data.slice(0, 4).map((item, index) => {
      let block = document.createElement(`div`);
      block.className = `item`;
      block = amplitudeDataset(block, item, ++index);
      block.innerHTML = `<div class="item__logo" style="background-color: #${
        item.casino.background
      }">
            <img src="${item.casino.logo}" alt="${item.casino.name}">
        </div>
				<div class="item__info">
					<p class="item__title">
						<span>${item.casino.name}</span>
						<img src="/build/casinosanalyzer/img/redesign/star-full.svg" alt="star">
	          ${item.score.toFixed(1)}
					</p>
					<p class="item__subtitle">In Casino reviews</p>
        </div>`;
      block.addEventListener(`click`, (e) => {
        e.stopPropagation();
        document.location.href = `/${casinoPath}/${item.casino.domain}`;
        searchAmplitudeClick(block);
      });
      return block;
    });
    const block = document.createElement(`div`);
    block.className = `search__popular search__popular--casinos`;
    block.innerHTML = `<p>${
      COUNTRY_PL && TRANS_PL["Popular Casino Reviews in"]
        ? TRANS_PL["Popular Casino Reviews in"]
        : "Popular Casino Reviews in"
    } <span>${COUNTRY_NAME}</span></p>`;
    let blockItems = document.createElement(`div`);
    blockItems.className = `search__popular--items`;
    items.forEach((item) => blockItems.append(item));
    block.append(blockItems);
    return block;
  };
  const renderSearchPopularBonuses = async () => {
    let data = await getOffers(5);
    let items = data.slice(0, 4).map((item, index) => {
      let block = document.createElement(`div`);
      block.className = `item`;
      block = amplitudeDataset(block, item, ++index);
      block.innerHTML = `<div class="item__logo" style="background-color: #${
        item.casino.background
      }">
            <img src="${item.casino.logo}" alt="${item.casino.name}">
        </div>
				<div class="item__info">
					<p class="item__title">
						<span>${item.title}</span>
						<img src="/build/casinosanalyzer/img/redesign/star-full.svg" alt="star">
	          ${item.score.toFixed(1)}
					</p>
					<p class="item__subtitle">In Bonuses</p>
        </div>`;
      block.addEventListener(`click`, (e) => {
        e.stopPropagation();
        navAffSearchForm(
          `${item.casino.domain}?bonus=${item.id}`,
          true,
          {},
          false,
          item.affiliateUrl
        );
        searchAmplitudeClick(block);
      });
      return block;
    });
    const block = document.createElement(`div`);
    block.className = `search__popular search__popular--bonuses`;
    block.innerHTML = `<p>${
      COUNTRY_PL && TRANS_PL["Popular Bonuses in"]
        ? TRANS_PL["Popular Bonuses in"]
        : "Popular Bonuses in"
    } <span>${COUNTRY_NAME}</span></p>`;
    let blockItems = document.createElement(`div`);
    blockItems.className = `search__popular--items`;
    items.forEach((item) => blockItems.append(item));
    block.append(blockItems);
    return block;
  };
  const renderSearchPopularSlots = async () => {
    const RANK_DEFAULT = 4;
    const slotPath = searchDropdownSearchForm.dataset.slot;
    let data = await getSlots(5);
    let items = data.slice(0, 4).map((item, index) => {
      let block = document.createElement(`div`);
      block.className = `item`;
      block = amplitudeDataset(block, item, ++index);
      block.innerHTML = `<div class="item__info">
					<p class="item__title">
						<span>${item.name}</span>
						<img src="/build/casinosanalyzer/img/redesign/star-full.svg" alt="star">
	          ${item.rank ? item.rank.toFixed(1) : RANK_DEFAULT.toFixed(1)}
					</p>
					<p class="item__subtitle">In ${
            COUNTRY_PL && TRANS_PL["Slots"] ? TRANS_PL["Slots"] : "Slots"
          }</p>
        </div>`;
      block.addEventListener(`click`, (e) => {
        e.stopPropagation();
        document.location.href = `/${slotPath}/${item.slug}`;
        searchAmplitudeClick(block);
      });
      return block;
    });
    const block = document.createElement(`div`);
    block.className = `search__popular search__popular--slots`;
    block.innerHTML = `<p>${
      COUNTRY_PL && TRANS_PL["Popular Slots in"]
        ? TRANS_PL["Popular Slots in"]
        : "Popular Slots in"
    } <span>${COUNTRY_NAME}</span></p>`;
    let blockItems = document.createElement(`div`);
    blockItems.className = `search__popular--items`;
    items.forEach((item) => blockItems.append(item));
    block.append(blockItems);
    return block;
  };
  const renderSearchReviews = async (data, limit) => {
    const SCORE_DEFAULT = 4;
    const SCORE_MAX = 5;
    let items = data.slice(0, limit).map((item, index) => {
      let block = document.createElement(`div`);
      block.className = `item`;
      block = amplitudeDataset(block, item, ++index);
      block.innerHTML = `<div class="item__logo" style="background-color: #${
        item.background
      }">
            <img src="${item.logo}" alt="${item.name}">
        </div>
				<div class="item__info">
					<p class="item__title">
						<span>${item.name}</span>
						<img src="/build/casinosanalyzer/img/redesign/star-full.svg" alt="star">
	          ${
              item.score
                ? item.score > SCORE_MAX
                  ? SCORE_DEFAULT.toFixed(1)
                  : item.score.toFixed(1)
                : SCORE_DEFAULT.toFixed(1)
            }
					</p>
					<p class="item__subtitle">In Casino reviews</p>
        </div>`;
      block.addEventListener(`click`, (e) => {
        e.stopPropagation();
        document.location.href = item.path;
        searchAmplitudeClick(block);
      });
      return block;
    });
    const block = document.createElement(`div`);
    block.className = `search__popular search__popular--casinos`;
    block.innerHTML = `<p>Found in ${
      COUNTRY_PL && TRANS_PL["Casino Reviews"]
        ? TRANS_PL["Casino Reviews"]
        : "Casino Reviews"
    }</p>`;
    let blockItems = document.createElement(`div`);
    blockItems.className = `search__popular--items`;
    items.forEach((item) => blockItems.append(item));
    block.append(blockItems);
    return block;
  };
  const renderSearchBonuses = async (data, limit) => {
    let items = data.slice(0, limit).map((item, index) => {
      let block = document.createElement(`div`);
      block.className = `item`;
      block = amplitudeDataset(block, item, ++index);
      block.innerHTML = `<div class="item__logo" style="background-color: #${
        item.background
      }">
            <img src="${item.logo}" alt="${item.name}">
        </div>
				<div class="item__info">
					<p class="item__title">
						<span>${item.alias}</span>
						<img src="/build/casinosanalyzer/img/redesign/star-full.svg" alt="star">
	          ${item.score.toFixed(1)}
					</p>
					<p class="item__subtitle">In Bonuses</p>
        </div>`;
      block.addEventListener(`click`, (e) => {
        e.stopPropagation();
        document.location.href = item.path;
        searchAmplitudeClick(block);
      });
      return block;
    });
    const block = document.createElement(`div`);
    block.className = `search__popular search__popular--bonuses`;
    block.innerHTML = `<p>Found in Bonuses</p>`;
    let blockItems = document.createElement(`div`);
    blockItems.className = `search__popular--items`;
    items.forEach((item) => blockItems.append(item));
    block.append(blockItems);
    return block;
  };
  const renderSearchSlots = async (data, limit) => {
    const RANK_DEFAULT = 4;
    const RANK_MAX = 4;
    let items = data.slice(0, limit).map((item, index) => {
      let block = document.createElement(`div`);
      block.className = `item`;
      block = amplitudeDataset(block, item, ++index);
      block.innerHTML = `<div class="item__info">
					<p class="item__title">
						<span>${item.name}</span>
						<img src="/build/casinosanalyzer/img/redesign/star-full.svg" alt="star">
	          ${
              item.rank
                ? item.rank > RANK_MAX
                  ? RANK_DEFAULT.toFixed(1)
                  : item.rank.toFixed(1)
                : RANK_DEFAULT.toFixed(1)
            }
					</p>
					<p class="item__subtitle">In ${
            COUNTRY_PL && TRANS_PL["Slots"] ? TRANS_PL["Slots"] : "Slots"
          }</p>
        </div>`;
      block.addEventListener(`click`, (e) => {
        e.stopPropagation();
        document.location.href = item.path;
        searchAmplitudeClick(block);
      });
      return block;
    });
    const block = document.createElement(`div`);
    block.className = `search__popular search__popular--slots`;
    block.innerHTML = `<p>${
      COUNTRY_PL && TRANS_PL["Found in Slots"]
        ? TRANS_PL["Found in Slots"]
        : "Found in Slots"
    }</p>`;
    let blockItems = document.createElement(`div`);
    blockItems.className = `search__popular--items`;
    items.forEach((item) => blockItems.append(item));
    block.append(blockItems);
    return block;
  };
};
let searchAffLinkClickIndex = 0;
const searchAmplitudeClick = (item) => {
  const searchForm = document.querySelector("#form_domain");
  const headerSearch = document.querySelector(`.header__search`);
  const container = headerSearch
    ? headerSearch
    : searchForm.closest(`.container-fluid`);
  const widgetId = container.dataset.widgetId;
  const widgetHandler = container.dataset.widgetHandler;
  const widgetPosition = container.dataset.widgetPosition;
  const casinoScoreGeoText = (value) => {
    let casino_score_geo_text = "";
    if (value === 5) {
      casino_score_geo_text = "A";
    } else if (value > 4.5 && value <= 4.9) {
      casino_score_geo_text = "B";
    } else if (value > 4 && value <= 4.5) {
      casino_score_geo_text = "C";
    } else if (value <= 4) {
      casino_score_geo_text = "D";
    }
    return casino_score_geo_text;
  };
  const eventID = [
    "p_bonus_spin_n",
    "p_bonus_amount",
    "p_bonus_casino",
    "p_bonus_category",
    "p_bonus_country",
    "p_bonus_percent",
    "p_casino_category",
    "p_casino_city",
    "p_casino_country",
    "p_casino_state_usa",
    "p_casino_currency",
    "p_casino_deposit_low",
    "p_casino_payment",
    "p_casino",
    "p_casino_slot_soft",
    "p_game_category",
    "p_slot_category",
    "p_slot",
    "p_slot_payline",
    "p_blog_category",
    "p_blog_article",
    "p_website_category",
    "p_similar_casinos",
    "p_website_page",
    "p_home",
    "p_other",
  ];
  const PAGE__CURRENT__PATH = document.location.pathname,
    PAGE__URL = document.location.origin + document.location.pathname,
    PAGE__URL__FULL = document.location.href,
    ROUTE = document.body.dataset.routeBonus,
    ROUTE__ID = document.body.dataset.routeId,
    ROUTE__EXIST = eventID.findIndex((item) => item === ROUTE),
    EVENT__ID = ROUTE__EXIST > -1 ? ROUTE__EXIST + 1 : eventID.length,
    EVENT__CAT =
      ROUTE__EXIST > -1 ? eventID[ROUTE__EXIST] : eventID[eventID.length - 1],
    LOCALE__LANG = document.body.dataset.localeLang,
    WEBSITE__ENVIRONMENT = document.body.dataset.websiteEnv,
    LOCALE__COUNTRY = document.body.dataset.localeCountry,
    COUNTRY__BACKEND = document.body.dataset.geo;
  let element = {
    widgetTitle: "Search form",
    widgetId: widgetId,
    widgetHandler: widgetHandler,
    widgetPosition: widgetPosition,
  };
  let pageAffLinkClickIndex = JSON.parse(
    localStorage.getItem(`pageAffLinkClickIndex`)
  );
  pageAffLinkClickIndex++;
  localStorage.setItem(
    `pageAffLinkClickIndex`,
    JSON.stringify(pageAffLinkClickIndex)
  );
  searchAffLinkClickIndex++;
  let btn = item.querySelector(`.item__link`);
  let btnName = btn ? btn.innerHTML : `Popular search result`;
  let data = {
    score: JSON.parse(item.dataset.score),
    titleShort: JSON.parse(item.dataset.titleShort),
    titleLong: JSON.parse(item.dataset.titleLong),
    casino: {
      casinoId: JSON.parse(item.dataset.casinoId),
      name: JSON.parse(item.dataset.name),
      domain: JSON.parse(item.dataset.domain),
    },
    affiliateUrl: JSON.parse(item.dataset.affiliateUrl),
    id: JSON.parse(item.dataset.id),
    amountMax: JSON.parse(item.dataset.amountMax),
    percent: JSON.parse(item.dataset.percent),
    exclusive: JSON.parse(item.dataset.exclusive),
    cashable: JSON.parse(item.dataset.cashable),
    expired: JSON.parse(item.dataset.expired),
    specialButtonTitle: JSON.parse(item.dataset.specialButtonTitle),
    wageringRequirements: JSON.parse(item.dataset.wageringRequirements),
    depositMin: JSON.parse(item.dataset.depositMin),
    code: JSON.parse(item.dataset.code),
    label: JSON.parse(item.dataset.label),
    bonusCategories: JSON.parse(item.dataset.bonusCategories),
    bonusTypes: JSON.parse(item.dataset.bonusTypes),
    freeSpins: JSON.parse(item.dataset.freeSpins),
  };
  dataLayer.push(
    Object.assign(
      {
        event: "addEvents_clickAffLink",
        event_cat: "w_website_search_form_widget_new",
        event_name: "casino_visit",
        casino_bonus_button_name: JSON.stringify(btnName),
        casino_user_country_allowed: JSON.stringify(true),
        page_afflink_click_index: JSON.stringify(pageAffLinkClickIndex),
        widget_afflink_click_index: JSON.stringify(searchAffLinkClickIndex),
        widget_list_index: JSON.stringify(item.dataset.widget_list_index),
      },
      {
        page_current_path: JSON.stringify(PAGE__CURRENT__PATH),
        page_url: JSON.stringify(PAGE__URL),
        page_url_full: JSON.stringify(PAGE__URL__FULL),
        page_group: JSON.stringify(EVENT__CAT),
        widget_title: JSON.stringify(element.widgetTitle),
        widget_id: JSON.stringify(element.widgetId),
        page_route_id: JSON.stringify(ROUTE__ID),
        widget_handler: JSON.stringify(element.widgetHandler),
        casino_bonus_short: JSON.stringify(
          element.widgetArguments && element.widgetArguments.shortTitle
            ? element.widgetArguments.shortTitle
            : ``
        ),
        casino_list_user_country: JSON.stringify(COUNTRY__BACKEND),
        casino_user_country: JSON.stringify(COUNTRY__BACKEND),
        casino_list_for_geo: JSON.stringify(
          element.widgetBonusCountry
            ? element.widgetBonusCountry
            : element.widgetCasinoCountry
            ? element.widgetCasinoCountry
            : false
        ),
      },
      {
        casino_bonus_title_long: JSON.stringify(
          data.titleLong ? data.titleLong : ""
        ),
        casino_bonus_title_short: JSON.stringify(
          data.titleShort ? data.titleShort : ""
        ),
        casino_bonus_title_long_strlen: JSON.stringify(
          data.titleLong ? data.titleLong.length : 0
        ),
        casino_bonus_title_short_strlen: JSON.stringify(
          data.titleShort ? data.titleShort.length : 0
        ),
        casino_id: JSON.stringify(data.casino.casinoId),
        casino_name: JSON.stringify(data.casino.name),
        casino_domain: JSON.stringify(data.casino.domain),
        casino_bonus_amount_max: JSON.stringify(data.amountMax),
        casino_bonus_percent: JSON.stringify(data.percent),
        casino_bonus_exclusive: JSON.stringify(!!data.exclusive),
        casino_bonus_cashable: JSON.stringify(!!data.cashable),
        casino_bonus_expired: JSON.stringify(!!data.expired),
        casino_bonus_special_button_title: JSON.stringify(
          data.specialButtonTitle
        ),
        casino_bonus_id: JSON.stringify(data.id),
        casino_domain_bonus_id: JSON.stringify(
          `${data.casino.domain}_${data.id}`
        ),
        casino_score_geo: JSON.stringify(data.score.toFixed(1)),
        casino_afflink_exist: JSON.stringify(!!data.affiliateUrl),
        casino_bonus_wagering_requirements: JSON.stringify(
          data.wageringRequirements
        ),
        casino_bonus_deposit_min: JSON.stringify(data.depositMin),
        casino_bonus_code_exist: JSON.stringify(!!data.code),
        casino_bonus_label_exist: JSON.stringify(!!data.label),
        casino_bonus_category: JSON.stringify(
          data.bonusCategories && Array.isArray(data.bonusCategories)
            ? data.bonusCategories.map((item) => item.name)
            : ""
        ),
        casino_bonus_label: JSON.stringify(data.label),
        casino_bonus_type: JSON.stringify(
          data.bonusTypes && Array.isArray(data.bonusTypes)
            ? data.bonusTypes.map((item) => item.name)
            : ""
        ),
        casino_bonus_free_spins: JSON.stringify(data.freeSpins),
        casino_score_geo_text: JSON.stringify(casinoScoreGeoText),
      }
    )
  );
};
const searchDropdownSearchForm = document.querySelector(
  `.frontSearch #searchDropdown`
);
searchDropdownSearchForm && searchFormFuncSearchForm();
window.addEventListener("load", newCasinoBonusTable);
const topSlotsSelector = document.querySelector(".topSlotsWidget");
const topSlotsCardsWrapper = topSlotsSelector.querySelector(
  ".topSlotsWidget__cards"
);
const topSlotsCards = Array.from(
  topSlotsSelector.querySelectorAll(".topSlotsWidget__card__wrapper")
);
const topSlotsCardsContent = Array.from(
  topSlotsSelector.querySelectorAll(".topSlotsWidget__main")
);
topSlotsCards.forEach((el, ind) => {
  el.addEventListener("click", (e) => {
    const { target } = e;
    if (target.closest(".topSlotsWidget__table__more")) {
      removeAllDropdowns([...topSlotsCards]);
      if (window.innerWidth >= 768) {
        topSlotCardsEqualItemsHeight(topSlotsCardsContent);
        el.closest(".topSlotsWidget__cards").classList.add("flex-row");
      }
      el.classList.add("dropdown-show");
    }
  });
});
const removeAllDropdowns = (items) => {
  items.forEach((el) => {
    if (el.classList.contains("dropdown-show")) {
      el.classList.remove("dropdown-show");
      topSlotsCardsWrapper.classList.remove("flex-row");
    }
  });
};
const topSlotCardsEqualItemsHeight = (items) => {
  const highest = Math.max(...items.map((item) => item.offsetHeight));
  items.forEach((el) => {
    el.style.minHeight = highest + "px";
  });
};
const showHidePlayBtn = (desktopWidth) => {
  if (window.innerWidth >= desktopWidth) {
    topSlotsCards.forEach((el) => {
      const imgWrapper = el.querySelector(".topSlotsWidget__card__img-wrapper");
      const playBtn = el.querySelector(".topSlotsWidget__play");
      el.addEventListener("mouseenter", (e) => {
        playBtn.classList.add("show");
        const imgWrapperHeight = imgWrapper.offsetHeight;
        const playBtnHeight = playBtn.offsetHeight;
        const playBtnPos = imgWrapperHeight / 2 - playBtnHeight / 2;
        playBtn.style.top = playBtnPos + "px";
      });
      el.addEventListener("mouseleave", (e) => {
        playBtn.classList.remove("show");
      });
    });
  }
};
showHidePlayBtn(1200);
const getAmplitudeCookieLockWidget = (name) => {
  let value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
const getDevicePlatformLockWidget = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mob";
  }
  return "web";
};
const appendLockScreen = (title, description) => {
  let div = document.createElement("div");
  div.setAttribute("id", "lockScreen");
  let options = document.createElement("div");
  let info = document.createElement("div");
  let icon = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.width = "100%";
  div.style.height = "100vh";
  div.style.background = "#1c3045";
  div.style.color = "#ffffff";
  div.style.zIndex = "999999999999";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.padding = "0 20px";
  info.style.fontSize = "19px";
  info.style.fontWeight = "600";
  info.style.color = "#ffffff";
  info.innerHTML = description;
  icon.style.marginBottom = "10px";
  icon.style.display = "flex";
  icon.style.alignItems = "center";
  icon.innerHTML = `
              <svg width="35" height="35"><use href="/build/casinosanalyzer/dist/img/header.svg#logo"></use></svg>
              <span style="font-weight: 600;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-size: 18px;
                          color: #fff;
                          margin-left: 8px;">${title}</span>
      `;
  div.appendChild(options);
  options.appendChild(icon);
  options.appendChild(info);
  document.documentElement.appendChild(div);
  setTimeout(() => {
    document.body.innerHTML = "";
  }, 500);
};
const getDomainName = () => {
  let domain = document.location.host;
  const prefix = [
    "loc.",
    "dev.",
    "dev1.",
    "dev2.",
    "dev3.",
    "green.",
    "blue.",
    "preprod.",
  ];
  for (let i = 0; i < prefix.length; i++) {
    domain = domain.replace(prefix[i], "");
  }
  return domain;
};
const checkDateIsWeekends = (date = new Date()) => {
  const WEEKENDS_DAYS = { saturday: 6, sunday: 0 };
  return (
    date.getDay() === WEEKENDS_DAYS["saturday"] ||
    date.getDay() === WEEKENDS_DAYS["sunday"]
  );
};
let activeCH = document.body.dataset.geoFact === `CH`;
let activePL = document.body.dataset.geoFact === `PL`;
let activeFR = document.body.dataset.geoFact === `FR`;
let activeNL = document.body.dataset.geoFact === `NL`;
let activeAU = document.body.dataset.geoFact === `AU`;
if (
  getDevicePlatformLockWidget() === "web" &&
  !getAmplitudeCookieLockWidget("ca_admin") &&
  activePL &&
  !checkDateIsWeekends()
) {
  appendLockScreen(
    getDomainName() === "kasynoanalyzer.com"
      ? "Kasyno Analyzer Polska"
      : "POLAND CASINOS ANALYZER",
    "Niestety nasza strona nie jest dostÄ™pna dla odwiedzajÄ…cych, ktÃ³rzy korzystajÄ… z polskiego adresu IP. Bardzo przepraszamy<br/> za niedogodnoÅ›ci."
  );
}
if (
  getDevicePlatformLockWidget() === "web" &&
  !getAmplitudeCookieLockWidget("ca_admin") &&
  activeCH &&
  !checkDateIsWeekends()
) {
  appendLockScreen(
    "Switzerland Casino Analyzer",
    "Due to legal restrictions, our website is not available to visitors using<br/> a Switzerland IP address. We are very sorry for the inconvenience."
  );
}
if (
  getDevicePlatformLockWidget() === "web" &&
  !getAmplitudeCookieLockWidget("ca_admin") &&
  activeFR
) {
  appendLockScreen(
    "FRANCE CASINOS ANALYZER",
    "Due to legal restrictions, our website is not available to visitors using a France IP address. We are very sorry for the inconvenience."
  );
}
if (
  getDevicePlatformLockWidget() === "web" &&
  !getAmplitudeCookieLockWidget("ca_admin") &&
  activeNL
) {
  appendLockScreen(
    "NETHERLANDS CASINOS ANALYZER",
    "Due to legal restrictions, our website is not available to visitors using a Netherlands IP address. We are very sorry for the inconvenience."
  );
}
if (
  getDevicePlatformLockWidget() === "web" &&
  !getAmplitudeCookieLockWidget("ca_admin") &&
  activeAU
) {
  appendLockScreen(
    "AUSTRALIA CASINOS ANALYZER",
    "Access Denied! We are currently unable to accept visitors from Australia. Sorry for the inconvenience!"
  );
}
