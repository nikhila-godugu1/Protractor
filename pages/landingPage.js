const { browser, ExpectedConditions } = require("protractor");

var landingPage = function () {
  this.giftsDropdown = $('li[class="redesign-header-nav-list-item dropdown"]');
  this.giftCardOptn = $('a[title="Gift Cards"]');
  this.eGiftCardIcon = $('[alt="E-Gift Card"]');
  this.giftCardIcon = $(
    'img[alt*="The right gift is right here. With a macy"]'
  );

  this.waitToBeVisible = (element, timeout, errMsg) => {
    browser.wait(ExpectedConditions.visibilityOf(element), timeout, errMsg);
  };
  this.waitToBeClickable = (element, timeout, errMsg) => {
    browser.wait(
      ExpectedConditions.elementToBeClickable(element),
      timeout,
      errMsg
    );
  };
};
module.exports = new landingPage();
